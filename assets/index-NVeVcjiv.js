var Oe=Object.defineProperty;var Ce=(e,t,n)=>t in e?Oe(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var se=(e,t,n)=>(Ce(e,typeof t!="symbol"?t+"":t,n),n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))l(o);new MutationObserver(o=>{for(const u of o)if(u.type==="childList")for(const _ of u.addedNodes)_.tagName==="LINK"&&_.rel==="modulepreload"&&l(_)}).observe(document,{childList:!0,subtree:!0});function n(o){const u={};return o.integrity&&(u.integrity=o.integrity),o.referrerPolicy&&(u.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?u.credentials="include":o.crossOrigin==="anonymous"?u.credentials="omit":u.credentials="same-origin",u}function l(o){if(o.ep)return;o.ep=!0;const u=n(o);fetch(o.href,u)}})();function N(){}function $e(e){return e()}function ve(){return Object.create(null)}function te(e){e.forEach($e)}function pe(e){return typeof e=="function"}function Ee(e,t){return e!=e?t==t:e!==t||e&&typeof e=="object"||typeof e=="function"}let ie;function me(e,t){return e===t?!0:(ie||(ie=document.createElement("a")),ie.href=t,e===ie.href)}function Ie(e){return Object.keys(e).length===0}function Ue(e,...t){if(e==null){for(const l of t)l(void 0);return N}const n=e.subscribe(...t);return n.unsubscribe?()=>n.unsubscribe():n}function V(e,t,n){e.$$.on_destroy.push(Ue(t,n))}function Pe(e,t,n){return e.set(n),t}function s(e,t){e.appendChild(t)}function ne(e,t,n){e.insertBefore(t,n||null)}function H(e){e.parentNode&&e.parentNode.removeChild(e)}function re(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function h(e){return document.createElement(e)}function G(e){return document.createTextNode(e)}function I(){return G(" ")}function J(e,t,n,l){return e.addEventListener(t,n,l),()=>e.removeEventListener(t,n,l)}function g(e,t,n){n==null?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function De(e){return Array.from(e.childNodes)}function ce(e,t){t=""+t,e.data!==t&&(e.data=t)}function he(e,t){e.value=t??""}function Y(e,t,n){for(let l=0;l<e.options.length;l+=1){const o=e.options[l];if(o.__value===t){o.selected=!0;return}}(!n||t!==void 0)&&(e.selectedIndex=-1)}function fe(e){const t=e.querySelector(":checked");return t&&t.__value}function M(e,t,n){e.classList.toggle(t,!!n)}let _e;function le(e){_e=e}const X=[],we=[];let x=[];const Le=[],Ne=Promise.resolve();let ge=!1;function Fe(){ge||(ge=!0,Ne.then(Ae))}function ee(e){x.push(e)}const de=new Set;let Z=0;function Ae(){if(Z!==0)return;const e=_e;do{try{for(;Z<X.length;){const t=X[Z];Z++,le(t),je(t.$$)}}catch(t){throw X.length=0,Z=0,t}for(le(null),X.length=0,Z=0;we.length;)we.pop()();for(let t=0;t<x.length;t+=1){const n=x[t];de.has(n)||(de.add(n),n())}x.length=0}while(X.length);for(;Le.length;)Le.pop()();ge=!1,de.clear(),le(e)}function je(e){if(e.fragment!==null){e.update(),te(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(ee)}}function Be(e){const t=[],n=[];x.forEach(l=>e.indexOf(l)===-1?t.push(l):n.push(l)),n.forEach(l=>l()),x=t}const Te=new Set;function qe(e,t){e&&e.i&&(Te.delete(e),e.i(t))}function oe(e){return(e==null?void 0:e.length)!==void 0?e:Array.from(e)}function Me(e,t,n){const{fragment:l,after_update:o}=e.$$;l&&l.m(t,n),ee(()=>{const u=e.$$.on_mount.map($e).filter(pe);e.$$.on_destroy?e.$$.on_destroy.push(...u):te(u),e.$$.on_mount=[]}),o.forEach(ee)}function Je(e,t){const n=e.$$;n.fragment!==null&&(Be(n.after_update),te(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function Ke(e,t){e.$$.dirty[0]===-1&&(X.push(e),Fe(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function ze(e,t,n,l,o,u,_=null,c=[-1]){const w=_e;le(e);const i=e.$$={fragment:null,ctx:[],props:u,update:N,not_equal:o,bound:ve(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(w?w.$$.context:[])),callbacks:ve(),dirty:c,skip_bound:!1,root:t.target||w.$$.root};_&&_(i.root);let R=!1;if(i.ctx=n?n(e,t.props||{},(d,E,...k)=>{const A=k.length?k[0]:E;return i.ctx&&o(i.ctx[d],i.ctx[d]=A)&&(!i.skip_bound&&i.bound[d]&&i.bound[d](A),R&&Ke(e,d)),E}):[],i.update(),R=!0,te(i.before_update),i.fragment=l?l(i.ctx):!1,t.target){if(t.hydrate){const d=De(t.target);i.fragment&&i.fragment.l(d),d.forEach(H)}else i.fragment&&i.fragment.c();t.intro&&qe(e.$$.fragment),Me(e,t.target,t.anchor),Ae()}le(w)}class Ge{constructor(){se(this,"$$");se(this,"$$set")}$destroy(){Je(this,1),this.$destroy=N}$on(t,n){if(!pe(n))return N;const l=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return l.push(n),()=>{const o=l.indexOf(n);o!==-1&&l.splice(o,1)}}$set(t){this.$$set&&!Ie(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const He="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(He);const Q=[];function W(e,t=N){let n;const l=new Set;function o(c){if(Ee(e,c)&&(e=c,n)){const w=!Q.length;for(const i of l)i[1](),Q.push(i,e);if(w){for(let i=0;i<Q.length;i+=2)Q[i][0](Q[i+1]);Q.length=0}}}function u(c){o(c(e))}function _(c,w=N){const i=[c,w];return l.add(i),l.size===1&&(n=t(o,u)||N),c(e),()=>{l.delete(i),l.size===0&&n&&(n(),n=null)}}return{set:o,update:u,subscribe:_}}const Ve=[{label:"Juyoung"},{label:"Jessica"},{label:"Aditi"},{label:"Jane"}],Se=[{label:"Korean",value:"ko-KR"},{label:"English",value:"en-US"},{label:"Spanish",value:"es-ES"},{label:"French",value:"fr-FR"},{label:"Italian",value:"it-IT"},{label:"Hindi",value:"hi-IN"},{label:"Chinese",value:"zh-CN"},{label:"Dutch",value:"nl-NL"},{label:"Turkish",value:"tr-TR"},{label:"Swedish",value:"sv-SE"},{label:"Indonesian",value:"id-ID"},{label:"Filipino",value:"fil-PH"},{label:"Japanese",value:"ja-JP"},{label:"Ukrainian",value:"uk-UA"},{label:"Greek",value:"el-GR"},{label:"Czech",value:"cs-CZ"},{label:"Finnish",value:"fi-FI"},{label:"Romanian",value:"ro-RO"},{label:"Russian",value:"ru-RU"},{label:"Danish",value:"da-DK"},{label:"Bulgarian",value:"bg-BG"},{label:"Malay",value:"ms-MY"},{label:"Slovak",value:"sk-SK"},{label:"Croatian",value:"hr-HR"},{label:"Classic Arabic",value:"ar-SA"},{label:"Tamil",value:"ta-IN"},{label:"Polish",value:"pl-PL"},{label:"German",value:"de-DE"},{label:"Portuguese",value:"pt-BR"}];function ye(e,t,n){const l=e.slice();return l[27]=t[n][0],l[28]=t[n][1],l[29]=t,l[30]=n,l}function Ye(e,t,n){const l=e.slice();return l[31]=t[n],l}function Ze(e,t,n){const l=e.slice();return l[34]=t[n],l}function Qe(e,t,n){const l=e.slice();return l[34]=t[n],l}function We(e){let t;return{c(){t=h("option"),t.textContent=`${e[34].label}`,t.__value=e[34].value,he(t,t.__value)},m(n,l){ne(n,t,l)},p:N,d(n){n&&H(t)}}}function Xe(e){let t;return{c(){t=h("option"),t.textContent=`${e[34].label}`,t.__value=e[34].value,he(t,t.__value)},m(n,l){ne(n,t,l)},p:N,d(n){n&&H(t)}}}function xe(e){let t;return{c(){t=h("option"),t.textContent=`${e[31].label}`,t.__value=e[31].label,he(t,t.__value)},m(n,l){ne(n,t,l)},p:N,d(n){n&&H(t)}}}function Re(e){let t,n,l,o,u,_,c,w,i,R,d,E,k,A,v,$,B,C,b,T,U,q,y,j,K,P,m,L=oe(Se),p=[];for(let f=0;f<L.length;f+=1)p[f]=We(Qe(e,L,f));function a(){e[21].call(c,e[29],e[30])}let r=oe(Se),S=[];for(let f=0;f<r.length;f+=1)S[f]=Xe(Ze(e,r,f));function D(){e[22].call(v,e[29],e[30])}let ae=oe(Ve),z=[];for(let f=0;f<ae.length;f+=1)z[f]=xe(Ye(e,ae,f));function be(){e[23].call(y,e[29],e[30])}return{c(){t=h("div"),n=h("div"),l=h("label"),o=G("Input Language:"),_=I(),c=h("select");for(let f=0;f<p.length;f+=1)p[f].c();i=I(),R=h("div"),d=h("label"),E=G("Output Language:"),A=I(),v=h("select");for(let f=0;f<S.length;f+=1)S[f].c();B=I(),C=h("div"),b=h("label"),T=G("Voice:"),q=I(),y=h("select");for(let f=0;f<z.length;f+=1)z[f].c();K=I(),g(l,"for",u=`${e[27]}-inputLanguage`),g(c,"id",w=`${e[27]}-inputLanguage`),g(c,"class","svelte-1giwa6w"),e[28].inputLanguage===void 0&&ee(a),g(d,"for",k=`${e[27]}-outputLanguage`),g(v,"id",$=`${e[27]}-outputLanguage`),g(v,"class","svelte-1giwa6w"),e[28].outputLanguage===void 0&&ee(D),g(b,"for",U=`${e[27]}-voice`),g(y,"id",j=`${e[27]}-voice`),g(y,"class","svelte-1giwa6w"),e[28].voice===void 0&&ee(be),g(t,"class","column svelte-1giwa6w")},m(f,F){ne(f,t,F),s(t,n),s(n,l),s(l,o),s(n,_),s(n,c);for(let O=0;O<p.length;O+=1)p[O]&&p[O].m(c,null);Y(c,e[28].inputLanguage,!0),s(t,i),s(t,R),s(R,d),s(d,E),s(R,A),s(R,v);for(let O=0;O<S.length;O+=1)S[O]&&S[O].m(v,null);Y(v,e[28].outputLanguage,!0),s(t,B),s(t,C),s(C,b),s(b,T),s(C,q),s(C,y);for(let O=0;O<z.length;O+=1)z[O]&&z[O].m(y,null);Y(y,e[28].voice,!0),s(t,K),P||(m=[J(c,"change",a),J(v,"change",D),J(y,"change",be)],P=!0)},p(f,F){e=f,F[0]&4&&u!==(u=`${e[27]}-inputLanguage`)&&g(l,"for",u),F[0]&4&&w!==(w=`${e[27]}-inputLanguage`)&&g(c,"id",w),F[0]&4&&Y(c,e[28].inputLanguage),F[0]&4&&k!==(k=`${e[27]}-outputLanguage`)&&g(d,"for",k),F[0]&4&&$!==($=`${e[27]}-outputLanguage`)&&g(v,"id",$),F[0]&4&&Y(v,e[28].outputLanguage),F[0]&4&&U!==(U=`${e[27]}-voice`)&&g(b,"for",U),F[0]&4&&j!==(j=`${e[27]}-voice`)&&g(y,"id",j),F[0]&4&&Y(y,e[28].voice)},d(f){f&&H(t),re(p,f),re(S,f),re(z,f),P=!1,te(m)}}}function ke(e){let t,n,l,o,u;return{c(){t=h("div"),n=h("audio"),me(n.src,l=e[8])||g(n,"src",l),n.controls=!0,g(t,"class","audio-player svelte-1giwa6w")},m(_,c){ne(_,t,c),s(t,n),o||(u=J(n,"loadedmetadata",nt),o=!0)},p(_,c){c[0]&256&&!me(n.src,l=_[8])&&g(n,"src",l)},d(_){_&&H(t),o=!1,u()}}}function et(e){let t,n,l,o,u,_,c,w,i,R,d,E=e[1]?"Stop Recording":"Start Recording",k,A,v,$=e[5]?`Recording... ${e[6]} seconds left`:"Please begin recording",B,C,b,T=e[7]||e[4]?"Loading...":(e[5],"Submit"),U,q,y,j,K,P=oe(Object.entries(e[2])),m=[];for(let p=0;p<P.length;p+=1)m[p]=Re(ye(e,P,p));let L=e[8]&&ke(e);return{c(){t=h("div"),n=h("h1"),n.textContent="Audio Translation App",l=I(),o=h("div"),u=h("button"),u.textContent="Doctor",_=I(),c=h("button"),c.textContent="Patient",w=I(),i=h("div");for(let p=0;p<m.length;p+=1)m[p].c();R=I(),d=h("button"),k=G(E),A=I(),v=h("p"),B=G($),C=I(),b=h("button"),U=G(T),y=I(),L&&L.c(),g(n,"class","svelte-1giwa6w"),g(u,"class","svelte-1giwa6w"),M(u,"active",e[3]==="person1"),g(c,"class","svelte-1giwa6w"),M(c,"active",e[3]==="person2"),g(o,"class","mode-selector svelte-1giwa6w"),g(i,"class","settings svelte-1giwa6w"),d.disabled=e[4],g(d,"class","svelte-1giwa6w"),M(d,"record-button",!0),M(d,"red",e[1]),g(v,"class","svelte-1giwa6w"),b.disabled=q=!e[0]||e[4]||e[1],g(b,"class","svelte-1giwa6w"),M(b,"loading",e[7]||e[4]),g(t,"class","container svelte-1giwa6w")},m(p,a){ne(p,t,a),s(t,n),s(t,l),s(t,o),s(o,u),s(o,_),s(o,c),s(t,w),s(t,i);for(let r=0;r<m.length;r+=1)m[r]&&m[r].m(i,null);s(t,R),s(t,d),s(d,k),s(t,A),s(t,v),s(v,B),s(t,C),s(t,b),s(b,U),s(t,y),L&&L.m(t,null),j||(K=[J(u,"click",e[19]),J(c,"click",e[20]),J(d,"click",function(){pe(e[1]?e[17]:e[16])&&(e[1]?e[17]:e[16]).apply(this,arguments)}),J(b,"click",e[18])],j=!0)},p(p,a){if(e=p,a[0]&8&&M(u,"active",e[3]==="person1"),a[0]&8&&M(c,"active",e[3]==="person2"),a[0]&4){P=oe(Object.entries(e[2]));let r;for(r=0;r<P.length;r+=1){const S=ye(e,P,r);m[r]?m[r].p(S,a):(m[r]=Re(S),m[r].c(),m[r].m(i,null))}for(;r<m.length;r+=1)m[r].d(1);m.length=P.length}a[0]&2&&E!==(E=e[1]?"Stop Recording":"Start Recording")&&ce(k,E),a[0]&16&&(d.disabled=e[4]),a[0]&2&&M(d,"red",e[1]),a[0]&96&&$!==($=e[5]?`Recording... ${e[6]} seconds left`:"Please begin recording")&&ce(B,$),a[0]&176&&T!==(T=e[7]||e[4]?"Loading...":(e[5],"Submit"))&&ce(U,T),a[0]&19&&q!==(q=!e[0]||e[4]||e[1])&&(b.disabled=q),a[0]&144&&M(b,"loading",e[7]||e[4]),e[8]?L?L.p(e,a):(L=ke(e),L.c(),L.m(t,null)):L&&(L.d(1),L=null)},i:N,o:N,d(p){p&&H(t),re(m,p),L&&L.d(),j=!1,te(K)}}}let tt="https://api.thevoicetranslator.com/process-audio",ue=30;function nt(e){e.target.getAttribute("data-playable")==="true"&&e.target.play().catch(t=>{console.error("Error playing audio:",t.message)})}function lt(e,t,n){let l,o,u,_,c,w,i,R=W(!1);V(e,R,a=>n(4,o=a));let d=!1,E,k=W("person1");V(e,k,a=>n(3,l=a));let A=W("");V(e,A,a=>n(8,w=a));let v=W(!1);V(e,v,a=>n(7,c=a));let $=W(ue);V(e,$,a=>n(6,_=a));let B,C=W(!1);V(e,C,a=>n(5,u=a));let b={person1:{inputLanguage:"en-US",outputLanguage:"es",voice:""},person2:{inputLanguage:"en-US",outputLanguage:"es",voice:""}};function T(){n(0,i=void 0),A.set(""),C.set(!1),d&&y()}function U(a){!d&&l!==a&&(T(),Pe(k,l=a,l))}async function q(){if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){console.error("Recording not supported");return}const a=await navigator.mediaDevices.getUserMedia({audio:!0}),r=new MediaRecorder(a);E=r,r.start();let S=[];r.addEventListener("dataavailable",D=>{S.push(D.data)}),r.addEventListener("stop",()=>{const D=new Blob(S);n(0,i=new File([D],"recordedAudio.wav",{type:"audio/wav"})),A.set(URL.createObjectURL(D))}),n(1,d=!0),C.set(!0),$.set(ue),B=setInterval(()=>{$.update(D=>D>0?D-1:0)},1e3),setTimeout(()=>{d&&y()},ue*1e3)}function y(){E&&(E.stop(),clearInterval(B),n(1,d=!1),$.set(ue))}async function j(){R.set(!0),v.set(!0);let a=l==="person1"?b.person1:b.person2;const r=new FormData;r.append("audio",i),r.append("input_lang",a.inputLanguage),r.append("output_lang",a.outputLanguage.substring(0,2)),r.append("voice",a.voice);try{const S=await fetch(tt,{method:"POST",body:r});if(S.ok){const D=await S.blob(),ae=URL.createObjectURL(D);A.set(ae),document.querySelector(".audio-player audio").setAttribute("data-playable","true")}else console.error("Server error:",S)}catch(S){console.error("Failed to submit audio:",S)}R.set(!1),v.set(!1)}const K=()=>U("person1"),P=()=>U("person2");function m(a,r){a[r][1].inputLanguage=fe(this),n(2,b)}function L(a,r){a[r][1].outputLanguage=fe(this),n(2,b)}function p(a,r){a[r][1].voice=fe(this),n(2,b)}return[i,d,b,l,o,u,_,c,w,R,k,A,v,$,C,U,q,y,j,K,P,m,L,p]}class ot extends Ge{constructor(t){super(),ze(this,t,lt,et,Ee,{},null,[-1,-1])}}new ot({target:document.getElementById("app")});