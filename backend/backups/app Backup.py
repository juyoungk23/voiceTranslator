from flask import Flask, request, jsonify, send_file
import os
import json
import requests
from google.cloud import speech
from google.cloud import translate_v2 as translate
from flask_cors import CORS
from pydub.utils import mediainfo
from pydub import AudioSegment 
import logging
from logging.handlers import RotatingFileHandler
from pydub.exceptions import CouldntDecodeError

app = Flask(__name__)
CORS(app)  # This enables CORS for all routes

# Configure logging
if not app.debug:
    file_handler = RotatingFileHandler('development.log', maxBytes=10240, backupCount=10)
    file_handler.setFormatter(logging.Formatter(
        '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'
    ))
    file_handler.setLevel(logging.DEBUG)
    app.logger.addHandler(file_handler)
    app.logger.setLevel(logging.DEBUG)

@app.errorhandler(Exception)
def handle_exception(e):
    # Log the error including the stack trace
    app.logger.error(f"Unhandled Exception: {e}", exc_info=True)
    return jsonify({"error": "An internal server error occurred"}), 500


# Load configuration from JSON file
with open('config.json') as json_file:
    data = json.load(json_file)
    api_key = data['elevenLabsAPIKey']
    voices = data['voices']
    translate_from = data['translateFrom']
    translate_to = data['translateTo']

# Set the path to your Google Cloud credentials
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'serviceAccount.json'

def transcribe_audio(speech_file, lang):
    app.logger.debug(f"Transcribing audio file. Original language: {lang}")
    client = speech.SpeechClient()

    try:
        audio_info = mediainfo(speech_file)
        audio_format = audio_info.get('format_name', '').split(',')[0].lower()
        sample_rate = int(audio_info.get('sample_rate', '16000'))
    except Exception as e:
        app.logger.error(f"Error in getting audio file info: {e}", exc_info=True)
        sample_rate = 16000
        audio_format = 'unknown'

    try:
        if audio_format in ['matroska', 'webm', 'mov']:
            speech_file = convert_audio_to_wav(speech_file)
            if speech_file is None:
                return None
            audio_format = 'wav'
    except Exception as e:
        app.logger.error(f"Error in converting audio file: {e}", exc_info=True)
        return None

    try:
        if audio_format in ['wav', 'wave'] and audio_info.get('bits_per_sample', '16') != '16':
            speech_file = convert_audio_to_16_bit(speech_file)
            if speech_file is None:
                return None
        if audio_format == 'mp3':
            encoding = speech.RecognitionConfig.AudioEncoding.MP3
        elif audio_format in ['wav', 'wave']:
            encoding = speech.RecognitionConfig.AudioEncoding.LINEAR16
        else:
            app.logger.error(f"Unsupported audio format: {audio_format}")
            return None
    except Exception as e:
        app.logger.error(f"Error in handling audio encoding: {e}", exc_info=True)
        return None

    try:
        with open(speech_file, 'rb') as audio_file:
            content = audio_file.read()
    except Exception as e:
        app.logger.error(f"Error in reading audio file: {e}", exc_info=True)
        return None

    try:
        audio = speech.RecognitionAudio(content=content)
        config = speech.RecognitionConfig(
            encoding=encoding,
            sample_rate_hertz=sample_rate,
            language_code=lang,
        )
    except Exception as e:
        app.logger.error(f"Error in setting up recognition config: {e}", exc_info=True)
        return None

    try:
        response = client.recognize(config=config, audio=audio)
        if not response.results:
            app.logger.error("No transcription results returned from Google Speech-to-Text API")
            return "No text was given"
        return response.results[0].alternatives[0].transcript
    except Exception as e:
        app.logger.error(f"Error in transcribing audio: {e}", exc_info=True)
        return None


def convert_audio_to_16_bit(input_file):
    output_file = os.path.splitext(input_file)[0] + '_16bit.wav'

    try:
        audio = AudioSegment.from_file(input_file)
        audio = audio.set_sample_width(2)
        audio.export(output_file, format='wav')
    except CouldntDecodeError as e:
        app.logger.error(f"Could not decode the input file: {e}")
        return None
    except Exception as e:
        app.logger.error(f"Error in converting audio file to 16-bit: {e}", exc_info=True)
        return None

    return output_file

def convert_audio_to_wav(input_file):
    """Converts an audio file to WAV format with 16-bit samples and trims it to 30 seconds."""
    output_file = os.path.splitext(input_file)[0] + '.wav'

    try:
        # Load the input file with pydub, which automatically extracts the audio
        audio = AudioSegment.from_file(input_file)

        # Ensure the audio is 16-bit, mono, and at the desired frame rate
        audio = audio.set_sample_width(2)  # 2 bytes (16 bits)
        audio = audio.set_frame_rate(16000)  # 16 kHz
        audio = audio.set_channels(1)  # Mono

        # Trim the audio to 30 seconds if it's longer
        if len(audio) > 30000:
            audio = audio[:30000]  # Keep only the first 30 seconds

        audio.export(output_file, format='wav')
    except CouldntDecodeError as e:
        app.logger.error(f"Could not decode the input file: {e}")
        return None
    except Exception as e:
        app.logger.error(f"Error in converting audio file: {e}", exc_info=True)
        return None

    return output_file

def translate_text(text, target_language):
    """Translate the given text to the target language using Google Cloud Translation."""
    translate_client = translate.Client()

    try:
        result = translate_client.translate(text, target_language=target_language)
        return result['translatedText']
    except Exception as e:
        app.logger.error(f"Error in translating text: {e}")
        return None

def generate_voice_file(text, voice_id, api_key, output_file="output_voice.mp3"):
    """Generate a voice file using Eleven Labs API."""
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}"

    payload = {
        "model_id": "eleven_multilingual_v2",
        "text": text,
        "voice_settings": {
            "similarity_boost": 0.75,
            "stability": 0.50
        }
    }
    headers = {
        "Content-Type": "application/json",
        "xi-api-key": api_key
    }

    try:
        response = requests.post(url, json=payload, headers=headers)
        response.raise_for_status()
        with open(output_file, 'wb') as file:
            file.write(response.content)
        return output_file
    except Exception as e:
        app.logger.error(f"Error in generating voice file: {e}")
        return None

@app.route('/process-audio', methods=['POST'])
def process_audio():
    
    if 'audio' not in request.files:
        return jsonify({"error": "No audio file part"}), 400

    audio_file = request.files['audio']
    if audio_file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    # Extract language codes from the request form data
    input_lang = request.form.get('input_lang', 'en-US')  # Default to 'en-US' if not provided
    output_lang = request.form.get('output_lang', 'es')  # Default to 'es' if not provided
    
    # Extract voice label from the request form data
    voice_label = request.form.get('voice', 'Juyoung')  # Default to a default voice label if not provided

    # Get the corresponding voice ID from the config
    voice_id = voices.get(voice_label, 'w0FTld3VgsXqUaNGNRnY')  # Use a default voice ID if the label is not found
    
    app.logger.debug(f"------------------------------------------")
    app.logger.debug(f"Received Request! Form data: ")
    app.logger.debug(f"Input Lang: {input_lang}")
    app.logger.debug(f"Output Lang: {output_lang}")
    app.logger.debug(f"Voice: {voice_label}")

    try:
        # Define the path for saving the audio file
        audio_file_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'uploaded_audio.wav')

        # Save the audio file
        audio_file.save(audio_file_path)
        
        # Load and trim the audio file to 30 seconds
        audio = AudioSegment.from_file(audio_file_path)
        trimmed_audio = audio[:30000]  # Trim to first 30 seconds
        trimmed_audio_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'trimmed_audio.wav')
        trimmed_audio.export(trimmed_audio_path, format="wav")

        # Use the provided input language for transcription
        transcribed_text = transcribe_audio(trimmed_audio_path, input_lang)
        if transcribed_text is None:
            return jsonify({"error": "Transcription failed"}), 500

        # Use the provided output language for translation
        translated_text = translate_text(transcribed_text, output_lang)
        if translated_text is None:
            return jsonify({"error": "Translation failed"}), 500

        voice_file_path = generate_voice_file(translated_text, voice_id, api_key)
        if voice_file_path is None:
            return jsonify({"error": "Voice generation failed"}), 500

        return send_file(voice_file_path, as_attachment=True)
    except Exception as e:
        app.logger.error(f"Unhandled exception: {e}")
        return jsonify({"error": "An error occurred"}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')