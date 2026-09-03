/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),i=new WeakMap;let r=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const s=this.t;if(e&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=i.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&i.set(s,t))}return t}toString(){return this.cssText}};const o=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1],t[0]);return new r(i,t,s)},n=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:a,defineProperty:c,getOwnPropertyDescriptor:h,getOwnPropertyNames:l,getOwnPropertySymbols:d,getPrototypeOf:p}=Object,u=globalThis,g=u.trustedTypes,f=g?g.emptyScript:"",m=u.reactiveElementPolyfillSupport,y=(t,e)=>t,$={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},v=(t,e)=>!a(t,e),_={attribute:!0,type:String,converter:$,reflect:!1,useDefault:!1,hasChanged:v};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let b=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=_){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);void 0!==i&&c(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:r}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const o=i?.call(this);r?.call(this,e),this.requestUpdate(t,o,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??_}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const t=this.properties,e=[...l(t),...d(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const s=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((s,i)=>{if(e)s.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of i){const i=document.createElement("style"),r=t.litNonce;void 0!==r&&i.setAttribute("nonce",r),i.textContent=e.cssText,s.appendChild(i)}})(s,this.constructor.elementStyles),s}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(void 0!==i&&!0===s.reflect){const r=(void 0!==s.converter?.toAttribute?s.converter:$).toAttribute(e,s.type);this._$Em=t,null==r?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=s.getPropertyOptions(i),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:$;this._$Em=i;const o=r.fromAttribute(e,t.type);this[i]=o??this._$Ej?.get(i)??o,this._$Em=null}}requestUpdate(t,e,s,i=!1,r){if(void 0!==t){const o=this.constructor;if(!1===i&&(r=this[t]),s??=o.getPropertyOptions(t),!((s.hasChanged??v)(r,e)||s.useDefault&&s.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:r},o){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==r||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,s,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[y("elementProperties")]=new Map,b[y("finalized")]=new Map,m?.({ReactiveElement:b}),(u.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w=globalThis,x=t=>t,A=w.trustedTypes,S=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,k="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+E,P=`<${C}>`,M=document,O=()=>M.createComment(""),T=t=>null===t||"object"!=typeof t&&"function"!=typeof t,U=Array.isArray,N="[ \t\n\f\r]",R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,D=/-->/g,j=/>/g,H=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),z=/'/g,F=/"/g,I=/^(?:script|style|textarea|title)$/i,L=t=>(e,...s)=>({_$litType$:t,strings:e,values:s}),B=L(1),W=L(2),q=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),Y=new WeakMap,G=M.createTreeWalker(M,129);function J(t,e){if(!U(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const K=(t,e)=>{const s=t.length-1,i=[];let r,o=2===e?"<svg>":3===e?"<math>":"",n=R;for(let e=0;e<s;e++){const s=t[e];let a,c,h=-1,l=0;for(;l<s.length&&(n.lastIndex=l,c=n.exec(s),null!==c);)l=n.lastIndex,n===R?"!--"===c[1]?n=D:void 0!==c[1]?n=j:void 0!==c[2]?(I.test(c[2])&&(r=RegExp("</"+c[2],"g")),n=H):void 0!==c[3]&&(n=H):n===H?">"===c[0]?(n=r??R,h=-1):void 0===c[1]?h=-2:(h=n.lastIndex-c[2].length,a=c[1],n=void 0===c[3]?H:'"'===c[3]?F:z):n===F||n===z?n=H:n===D||n===j?n=R:(n=H,r=void 0);const d=n===H&&t[e+1].startsWith("/>")?" ":"";o+=n===R?s+P:h>=0?(i.push(a),s.slice(0,h)+k+s.slice(h)+E+d):s+E+(-2===h?e:d)}return[J(t,o+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class Z{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let r=0,o=0;const n=t.length-1,a=this.parts,[c,h]=K(t,e);if(this.el=Z.createElement(c,s),G.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=G.nextNode())&&a.length<n;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(k)){const e=h[o++],s=i.getAttribute(t).split(E),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:r,name:n[2],strings:s,ctor:"."===n[1]?st:"?"===n[1]?it:"@"===n[1]?rt:et}),i.removeAttribute(t)}else t.startsWith(E)&&(a.push({type:6,index:r}),i.removeAttribute(t));if(I.test(i.tagName)){const t=i.textContent.split(E),e=t.length-1;if(e>0){i.textContent=A?A.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],O()),G.nextNode(),a.push({type:2,index:++r});i.append(t[e],O())}}}else if(8===i.nodeType)if(i.data===C)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=i.data.indexOf(E,t+1));)a.push({type:7,index:r}),t+=E.length-1}r++}}static createElement(t,e){const s=M.createElement("template");return s.innerHTML=t,s}}function Q(t,e,s=t,i){if(e===q)return e;let r=void 0!==i?s._$Co?.[i]:s._$Cl;const o=T(e)?void 0:e._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),void 0===o?r=void 0:(r=new o(t),r._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=r:s._$Cl=r),void 0!==r&&(e=Q(t,r._$AS(t,e.values),r,i)),e}class X{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??M).importNode(e,!0);G.currentNode=i;let r=G.nextNode(),o=0,n=0,a=s[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new tt(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new ot(r,this,t)),this._$AV.push(e),a=s[++n]}o!==a?.index&&(r=G.nextNode(),o++)}return G.currentNode=M,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class tt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),T(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==q&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>U(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==V&&T(this._$AH)?this._$AA.nextSibling.data=t:this.T(M.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=Z.createElement(J(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new X(i,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=Y.get(t.strings);return void 0===e&&Y.set(t.strings,e=new Z(t)),e}k(t){U(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const r of t)i===e.length?e.push(s=new tt(this.O(O()),this.O(O()),this,this.options)):s=e[i],s._$AI(r),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=x(t).nextSibling;x(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class et{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,r){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=V}_$AI(t,e=this,s,i){const r=this.strings;let o=!1;if(void 0===r)t=Q(this,t,e,0),o=!T(t)||t!==this._$AH&&t!==q,o&&(this._$AH=t);else{const i=t;let n,a;for(t=r[0],n=0;n<r.length-1;n++)a=Q(this,i[s+n],e,n),a===q&&(a=this._$AH[n]),o||=!T(a)||a!==this._$AH[n],a===V?t=V:t!==V&&(t+=(a??"")+r[n+1]),this._$AH[n]=a}o&&!i&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class st extends et{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}}class it extends et{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==V)}}class rt extends et{constructor(t,e,s,i,r){super(t,e,s,i,r),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??V)===q)return;const s=this._$AH,i=t===V&&s!==V||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==V&&(s===V||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ot{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const nt=w.litHtmlPolyfillSupport;nt?.(Z,tt),(w.litHtmlVersions??=[]).push("3.3.3");const at=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ct extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const i=s?.renderBefore??e;let r=i._$litPart$;if(void 0===r){const t=s?.renderBefore??null;i._$litPart$=r=new tt(e.insertBefore(O(),t),t,void 0,s??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}}ct._$litElement$=!0,ct.finalized=!0,at.litElementHydrateSupport?.({LitElement:ct});const ht=at.litElementPolyfillSupport;ht?.({LitElement:ct}),(at.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const lt=t=>(e,s)=>{void 0!==s?s.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},dt={attribute:!0,type:String,converter:$,reflect:!1,hasChanged:v},pt=(t=dt,e,s)=>{const{kind:i,metadata:r}=s;let o=globalThis.litPropertyMetadata.get(r);if(void 0===o&&globalThis.litPropertyMetadata.set(r,o=new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),o.set(s.name,t),"accessor"===i){const{name:i}=s;return{set(s){const r=e.get.call(this);e.set.call(this,s),this.requestUpdate(i,r,t,!0,s)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===i){const{name:i}=s;return function(s){const r=this[i];e.call(this,s),this.requestUpdate(i,r,t,!0,s)}}throw Error("Unsupported decorator location: "+i)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ut(t){return(e,s)=>"object"==typeof s?pt(t,e,s):((t,e,s)=>{const i=e.hasOwnProperty(s);return e.constructor.createProperty(s,t),i?Object.getOwnPropertyDescriptor(e,s):void 0})(t,e,s)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function gt(t){return ut({...t,state:!0,attribute:!1})}const ft="weight-tracker-cm-card",mt="weight-tracker-cm-card-editor",yt=["7d","1m","6m","1y"];class $t extends Error{}class vt{constructor(t,e){this.hass=t,this.options=e}async fetchPoints(t){const e=await this.resolveValueField();if("raw"===t.bucket){return(await this.hass.connection.sendMessagePromise({type:"custom_metrics/list_records",record_type:this.options.recordType,start:t.start.toISOString(),end:t.end.toISOString(),limit:500,filter:this.options.filter})??[]).map(t=>({x:Date.parse(t.timestamp),y:Number(t[e])})).filter(t=>Number.isFinite(t.x)&&Number.isFinite(t.y)).sort((t,e)=>t.x-e.x)}const s=await this.hass.connection.sendMessagePromise({type:"custom_metrics/aggregate_records",record_type:this.options.recordType,op:"avg",bucket:t.bucket,field:e,start:t.start.toISOString(),end:t.end.toISOString(),filter:this.options.filter,format:"apexcharts"});return(s?.series?.[0]?.data??[]).map(t=>({x:Number(t.x),y:Number(t.y)})).filter(t=>Number.isFinite(t.x)&&Number.isFinite(t.y)).sort((t,e)=>t.x-e.x)}async addRecord(t,e){await this.hass.connection.sendMessagePromise({type:"custom_metrics/add_record",record_type:this.options.recordType,fields:t,...e?{timestamp:e.toISOString()}:{}})}async getRecordType(){if(this.recordTypeCache)return this.recordTypeCache;const t=await this.hass.connection.sendMessagePromise({type:"custom_metrics/list_record_types"}),e=Array.isArray(t)?t:t?.record_types??[];return this.recordTypeCache=e.find(t=>t.key===this.options.recordType),this.recordTypeCache}async subscribeUpdates(t){return this.hass.connection.subscribeEvents(()=>t(),"custom_metrics_updated")}async resolveValueField(){if(this.options.valueField)return this.options.valueField;const t=await this.getRecordType(),e=t?.fields?.find(t=>"number"===t.type);if(!e)throw new Error('Could not determine a numeric field to plot. Set "value_field" in the card config.');return e.key}}const _t={"7d":7,"1m":30,"6m":182,"1y":365},bt={"7d":"raw","1m":"day","6m":"week","1y":"week"};const wt=225;function xt(t,e,s,i){const r=i*Math.PI/180;return{x:t+s*Math.sin(r),y:e-s*Math.cos(r)}}function At(t,e,s,i,r){const o=xt(t,e,s,i),n=xt(t,e,s,r),a=r-i>180?1:0;return`M ${o.x} ${o.y} A ${s} ${s} 0 ${a} 1 ${n.x} ${n.y}`}var St=Object.defineProperty,kt=Object.getOwnPropertyDescriptor,Et=(t,e,s,i)=>{for(var r,o=i>1?void 0:i?kt(e,s):e,n=t.length-1;n>=0;n--)(r=t[n])&&(o=(i?r(e,s,o):r(o))||o);return i&&o&&St(e,s,o),o};const Ct=100;let Pt=class extends ct{constructor(){super(...arguments),this.progress=0,this.unit="kg",this.label="REMAIN"}render(){const t=void 0===this.value?"—":Math.abs(this.value).toLocaleString(void 0,{maximumFractionDigits:1}),e=function(t,e,s,i){const r=Math.max(0,Math.min(1,i));return r<=0?"":At(t,e,s,wt,wt+270*r)}(Ct,Ct,89,this.progress);return B`
      <svg viewBox="0 0 ${200} ${200}" role="img" aria-label="${this.label} ${t} ${this.unit}">
        <path class="track" style="stroke-width:${18}" d="${function(t,e,s){return At(t,e,s,wt,495)}(Ct,Ct,89)}" />
        ${e?W`<path class="progress" style="stroke-width:${18}" d="${e}" />`:V}
        <text class="value" x="${Ct}" y="${94}">
          ${t}<tspan class="unit"> ${this.unit}</tspan>
        </text>
        <text class="label" x="${Ct}" y="${130}">${this.label}</text>
      </svg>
    `}};Pt.styles=o`
    :host {
      display: block;
    }
    svg {
      width: 100%;
      height: auto;
      max-width: 220px;
      margin: 0 auto;
      display: block;
    }
    .track {
      fill: none;
      stroke: var(--wtc-gauge-track, var(--divider-color, #e0e0e0));
      stroke-linecap: round;
    }
    .progress {
      fill: none;
      stroke: var(--wtc-gauge-progress, var(--primary-color, #03a9f4));
      stroke-linecap: round;
      transition: stroke-dasharray 0.3s ease;
    }
    .value {
      fill: var(--primary-text-color, #212121);
      font-size: 42px;
      font-weight: 500;
      text-anchor: middle;
      dominant-baseline: central;
    }
    .unit {
      fill: var(--secondary-text-color, #727272);
      font-size: 18px;
    }
    .label {
      fill: var(--secondary-text-color, #727272);
      font-size: 13px;
      letter-spacing: 1px;
      text-anchor: middle;
    }
  `,Et([ut({type:Number})],Pt.prototype,"value",2),Et([ut({type:Number})],Pt.prototype,"progress",2),Et([ut({type:String})],Pt.prototype,"unit",2),Et([ut({type:String})],Pt.prototype,"label",2),Pt=Et([lt("weight-tracker-cm-gauge")],Pt);var Mt=Object.defineProperty,Ot=Object.getOwnPropertyDescriptor,Tt=(t,e,s,i)=>{for(var r,o=i>1?void 0:i?Ot(e,s):e,n=t.length-1;n>=0;n--)(r=t[n])&&(o=(i?r(e,s,o):r(o))||o);return i&&o&&Mt(e,s,o),o};const Ut=400,Nt=200,Rt={top:12,right:12,bottom:22,left:36};let Dt=class extends ct{constructor(){super(...arguments),this.points=[],this.unit="kg"}render(){const t=function({points:t,target:e,width:s,height:i,padding:r,tickCount:o=4}){const n=s-r.left-r.right,a=i-r.top-r.bottom;if(0===t.length)return{width:s,height:i,points:[],polyline:"",yTicks:[],hasData:!1};const c=t.map(t=>t.x),h=t.map(t=>t.y);let l=Math.min(...h),d=Math.max(...h);void 0!==e&&(l=Math.min(l,e),d=Math.max(d,e));const[p,u]=function(t,e){if(t===e)return[t-1,e+1];const s=.1*(e-t);return[t-s,e+s]}(l,d),g=Math.min(...c),f=Math.max(...c),m=f-g||1,y=u-p||1,$=t=>f===g?r.left+n/2:r.left+(t-g)/m*n,v=t=>r.top+(u-t)/y*a,_=t.map(t=>({x:$(t.x),y:v(t.y),value:t.y,time:t.x})),b=_.map(t=>`${t.x},${t.y}`).join(" "),w=[];for(let t=0;t<o;t++){const e=p+y*t/(o-1);w.push({value:e,y:v(e)})}return{width:s,height:i,points:_,polyline:b,targetY:void 0!==e&&e>=p&&e<=u?v(e):void 0,yTicks:w,hasData:!0}}({points:this.points,target:this.target,width:Ut,height:Nt,padding:Rt});return t.hasData?B`
      <svg viewBox="0 0 ${Ut} ${Nt}" preserveAspectRatio="none">
        ${t.yTicks.map(t=>W`
            <line class="grid" x1="${Rt.left}" y1="${t.y}" x2="${Ut-Rt.right}" y2="${t.y}" />
            <text class="axis-label" x="4" y="${t.y+3}">${t.value.toFixed(0)}</text>
          `)}
        ${void 0!==t.targetY?W`<line class="target" x1="${Rt.left}" y1="${t.targetY}" x2="${Ut-Rt.right}" y2="${t.targetY}" />`:V}
        <polyline class="line" points="${t.polyline}" />
        ${t.points.map(t=>W`<circle class="point" cx="${t.x}" cy="${t.y}" r="2.5" />`)}
      </svg>
    `:B`<svg viewBox="0 0 ${Ut} ${Nt}">
        <text class="empty" x="${200}" y="${100}">No data for this period</text>
      </svg>`}};Dt.styles=o`
    :host {
      display: block;
    }
    svg {
      width: 100%;
      height: auto;
      display: block;
    }
    .grid {
      stroke: var(--divider-color, #e0e0e0);
      stroke-width: 1;
      opacity: 0.5;
    }
    .axis-label {
      fill: var(--secondary-text-color, #727272);
      font-size: 10px;
    }
    .line {
      fill: none;
      stroke: var(--wtc-line, var(--primary-color, #03a9f4));
      stroke-width: 2.5;
      stroke-linejoin: round;
      stroke-linecap: round;
    }
    .point {
      fill: var(--wtc-point, var(--wtc-line, var(--primary-color, #03a9f4)));
    }
    .target {
      stroke: var(--wtc-target-line, var(--error-color, #db4437));
      stroke-width: 2;
      stroke-dasharray: 5 4;
    }
    .empty {
      fill: var(--secondary-text-color, #727272);
      font-size: 12px;
      text-anchor: middle;
    }
  `,Tt([ut({attribute:!1})],Dt.prototype,"points",2),Tt([ut({type:Number})],Dt.prototype,"target",2),Tt([ut({type:String})],Dt.prototype,"unit",2),Dt=Tt([lt("weight-tracker-cm-chart")],Dt);var jt=Object.defineProperty,Ht=Object.getOwnPropertyDescriptor,zt=(t,e,s,i)=>{for(var r,o=i>1?void 0:i?Ht(e,s):e,n=t.length-1;n>=0;n--)(r=t[n])&&(o=(i?r(e,s,o):r(o))||o);return i&&o&&jt(e,s,o),o};let Ft=class extends ct{constructor(){super(...arguments),this.open=!1,this.fields=[],this.prefill={},this.heading="Add record",this.values={},this.onBackdrop=()=>this.close(),this.close=()=>{this.dispatchEvent(new CustomEvent("closed",{bubbles:!0,composed:!0}))},this.onSubmit=t=>{t.preventDefault();const e={};for(const t of this.fields){const s=this.values[t.key];void 0!==s&&""!==s&&(e[t.key]="number"===t.type?Number(s):s)}this.dispatchEvent(new CustomEvent("submit-record",{detail:{fields:e},bubbles:!0,composed:!0}))}}willUpdate(t){if(t.has("open")&&this.open){const t={};for(const e of this.fields)void 0!==this.prefill[e.key]?t[e.key]=this.prefill[e.key]:void 0!==e.default&&(t[e.key]=e.default);this.values=t}}render(){return this.open?B`
      <div class="backdrop" @click=${this.onBackdrop}>
        <div class="dialog" @click=${t=>t.stopPropagation()}>
          <h2>${this.heading}</h2>
          <form @submit=${this.onSubmit}>
            ${this.fields.map(t=>this.renderField(t))}
            <div class="actions">
              <button type="button" class="cancel" @click=${this.close}>Cancel</button>
              <button type="submit" class="submit">Add</button>
            </div>
          </form>
        </div>
      </div>
    `:V}renderField(t){const e=B`${t.name??t.key}${t.required?B`<span class="required"> *</span>`:V}`,s=this.values[t.key],i=e=>{this.values={...this.values,[t.key]:e}};let r;switch(t.type){case"number":r=B`<input
          type="number"
          step="any"
          .value=${s??""}
          @input=${t=>i(t.target.value)}
        />`;break;case"boolean":r=B`<input
          type="checkbox"
          .checked=${Boolean(s)}
          @change=${t=>i(t.target.checked)}
        />`;break;case"datetime":r=B`<input
          type="datetime-local"
          .value=${s??""}
          @input=${t=>i(t.target.value)}
        />`;break;case"long_text":r=B`<textarea
          rows="3"
          .value=${s??""}
          @input=${t=>i(t.target.value)}
        ></textarea>`;break;case"single_select":r=B`<select
          @change=${t=>i(t.target.value)}
        >
          <option value="" ?selected=${!s}></option>
          ${(t.options??[]).map(t=>B`<option value=${t} ?selected=${s===t}>${t}</option>`)}
        </select>`;break;default:r=B`<input
          type="text"
          .value=${s??""}
          @input=${t=>i(t.target.value)}
        />`}return B`<div class="field"><label>${e}</label>${r}</div>`}};Ft.styles=o`
    .backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10;
    }
    .dialog {
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color, #212121);
      border-radius: var(--ha-card-border-radius, 12px);
      padding: 20px;
      width: min(90vw, 360px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    }
    h2 {
      margin: 0 0 12px;
      font-size: 1.2rem;
    }
    .field {
      display: flex;
      flex-direction: column;
      margin-bottom: 12px;
    }
    label {
      font-size: 0.85rem;
      color: var(--secondary-text-color, #727272);
      margin-bottom: 4px;
    }
    input,
    select,
    textarea {
      font: inherit;
      padding: 8px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 6px;
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color, #212121);
    }
    .actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      margin-top: 8px;
    }
    button {
      font: inherit;
      cursor: pointer;
      border: none;
      border-radius: 6px;
      padding: 8px 16px;
    }
    .cancel {
      background: transparent;
      color: var(--primary-text-color, #212121);
    }
    .submit {
      background: var(--primary-color, #03a9f4);
      color: var(--text-primary-color, #fff);
    }
    .required {
      color: var(--error-color, #db4437);
    }
  `,zt([ut({type:Boolean})],Ft.prototype,"open",2),zt([ut({attribute:!1})],Ft.prototype,"fields",2),zt([ut({attribute:!1})],Ft.prototype,"prefill",2),zt([ut({type:String})],Ft.prototype,"heading",2),zt([gt()],Ft.prototype,"values",2),Ft=zt([lt("weight-tracker-cm-add-dialog")],Ft);var It=Object.defineProperty,Lt=Object.getOwnPropertyDescriptor,Bt=(t,e,s,i)=>{for(var r,o=i>1?void 0:i?Lt(e,s):e,n=t.length-1;n>=0;n--)(r=t[n])&&(o=(i?r(e,s,o):r(o))||o);return i&&o&&It(e,s,o),o};const Wt={"7d":"7D","1m":"1M","6m":"6M","1y":"1Y"},qt={gauge_progress:"--wtc-gauge-progress",gauge_track:"--wtc-gauge-track",line:"--wtc-line",point:"--wtc-point",target_line:"--wtc-target-line"};let Vt=class extends ct{constructor(){super(...arguments),this.points=[],this.stats={},this.period="1m",this.dialogOpen=!1,this.recordFields=[]}static async getConfigElement(){return await Promise.resolve().then(function(){return te}),document.createElement(mt)}static getStubConfig(){return{type:`custom:${ft}`,data_source:"custom_metrics",record_type:"body_weight",target:80,unit:"kg"}}setConfig(t){try{this.config=function(t){if(!t)throw new $t("Missing configuration");const e=t.data_source??"custom_metrics";if("custom_metrics"!==e)throw new $t(`Unsupported data_source "${e}". Only "custom_metrics" is supported for now.`);if(!t.record_type)throw new $t('You must set "record_type" (the Custom Metrics record type key).');const s=t.default_period;if(void 0!==s&&!yt.includes(s))throw new $t(`Invalid default_period "${s}". Use one of: ${yt.join(", ")}.`);return{...t,data_source:e,unit:t.unit??"kg",default_period:s??"1m",show_gauge:t.show_gauge??!0,show_stats:t.show_stats??!0,show_graph:t.show_graph??!0,show_add_record:t.show_add_record??!0}}(t),this.errorMessage=void 0,this.period=this.config.default_period,this.dataSource=void 0,this.recordFields=[],this._hass&&this.setupDataSource()}catch(t){if(!(t instanceof $t))throw t;this.errorMessage=t.message}}set hass(t){const e=!this._hass;this._hass=t,!this.config||!e&&this.dataSource||this.setupDataSource()}get hass(){return this._hass}getCardSize(){let t=1;return this.config?.show_gauge&&(t+=3),this.config?.show_graph&&(t+=3),t}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribe?.(),this.unsubscribe=void 0}setupDataSource(){if(this._hass&&this.config){try{this.dataSource=function(t,e){if("custom_metrics"===e.data_source)return new vt(t,{recordType:e.record_type,valueField:e.value_field,filter:e.filter});throw new Error(`Unsupported data_source: ${e.data_source}`)}(this._hass,this.config)}catch(t){return void(this.errorMessage=t instanceof Error?t.message:String(t))}this.unsubscribe?.(),this.dataSource.subscribeUpdates(()=>this.scheduleRefresh()).then(t=>{this.unsubscribe=t}).catch(()=>{}),this.loadRecordFields(),this.fetchData()}}scheduleRefresh(){clearTimeout(this.refreshTimer),this.refreshTimer=setTimeout(()=>{this.fetchData()},300)}async loadRecordFields(){if(this.dataSource)try{const t=await this.dataSource.getRecordType();this.recordFields=t?.fields??[]}catch{this.recordFields=[]}}async fetchData(){if(this.dataSource&&this.config)try{const t=function(t,e=new Date){const s=_t[t],i=e;return{period:t,start:new Date(e.getTime()-864e5*s),end:i,bucket:bt[t]}}(this.period),e=await this.dataSource.fetchPoints(t);this.points=e,this.stats=function({points:t,target:e,startWeight:s}){const i=[...t].sort((t,e)=>t.x-e.x),r=i[0]?.y,o=i[i.length-1]?.y,n=s??r,a={start:n,current:o,target:e};var c;return void 0!==o&&void 0!==e&&(a.remaining=o-e),void 0!==n&&void 0!==o&&void 0!==e&&n!==e&&(a.progress=(c=(n-o)/(n-e))<0?0:c>1?1:c),a}({points:e,target:this.config.target,startWeight:this.config.start_weight}),this.errorMessage=void 0}catch(t){this.errorMessage=t instanceof Error?t.message:String(t)}}onPeriodClick(t){t!==this.period&&(this.period=t,this.fetchData())}async onSubmitRecord(t){if(this.dataSource)try{await this.dataSource.addRecord(t.detail.fields),this.dialogOpen=!1,await this.fetchData()}catch(t){this.errorMessage=t instanceof Error?t.message:String(t)}}hostStyle(){const t=this.config?.colors;return t?Object.entries(t).filter(([,t])=>t).map(([t,e])=>`${qt[t]}:${e}`).join(";"):""}render(){if(this.errorMessage)return B`<ha-card>
        <div class="error">
          <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
          <span>${this.errorMessage}</span>
        </div>
      </ha-card>`;if(!this.config)return B`<ha-card></ha-card>`;const t=this.config,e={};for(const s of t.filter??[])for(const[t,i]of Object.entries(s))e[t]=i;return B`
      <ha-card style=${this.hostStyle()}>
        <div class="header">
          <span class="title">${t.title??""}</span>
          ${t.show_add_record?B`<button
                class="add-btn"
                title="Add record"
                @click=${()=>this.dialogOpen=!0}
              >
                +
              </button>`:V}
        </div>

        <div class="content">
          ${t.show_gauge?this.renderGauge():V}
          ${t.show_stats?this.renderStats():V}
          ${t.show_graph?this.renderGraph():V}
        </div>

        <weight-tracker-cm-add-dialog
          .open=${this.dialogOpen}
          .fields=${this.recordFields}
          .prefill=${e}
          .heading=${"Add "+(t.title??"record")}
          @closed=${()=>this.dialogOpen=!1}
          @submit-record=${this.onSubmitRecord}
        ></weight-tracker-cm-add-dialog>
      </ha-card>
    `}renderGauge(){return B`<div class="gauge-wrap">
      <weight-tracker-cm-gauge
        .value=${this.stats.remaining}
        .progress=${this.stats.progress??0}
        .unit=${this.config?.unit??"kg"}
      ></weight-tracker-cm-gauge>
    </div>`}renderStats(){const t=this.config?.unit??"kg",e=e=>void 0===e?"—":`${e.toLocaleString(void 0,{maximumFractionDigits:1})} ${t}`;return B`<div class="stats">
      <div class="stat"><span>Starting Weight</span><b>${e(this.stats.start)}</b></div>
      <div class="stat"><span>Current Weight</span><b>${e(this.stats.current)}</b></div>
      <div class="stat"><span>Weight Goal</span><b>${e(this.stats.target)}</b></div>
    </div>`}renderGraph(){return B`<div class="graph">
      <div class="periods">
        ${yt.map(t=>B`<button
            class=${t===this.period?"period active":"period"}
            @click=${()=>this.onPeriodClick(t)}
          >
            ${Wt[t]}
          </button>`)}
      </div>
      <weight-tracker-cm-chart
        .points=${this.points}
        .target=${this.config?.target}
        .unit=${this.config?.unit??"kg"}
      ></weight-tracker-cm-chart>
    </div>`}};Vt.styles=o`
    ha-card {
      padding: 16px;
      position: relative;
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 24px;
    }
    .title {
      font-size: 1.4rem;
      font-weight: 500;
    }
    .add-btn {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: none;
      cursor: pointer;
      font-size: 1.4rem;
      line-height: 1;
      color: var(--text-primary-color, #fff);
      background: var(--wtc-line, var(--primary-color, #03a9f4));
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
    }
    .content {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-top: 8px;
    }
    .gauge-wrap {
      display: flex;
      justify-content: center;
    }
    .stats {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .stat {
      display: flex;
      justify-content: space-between;
      font-size: 1rem;
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
      padding-bottom: 4px;
    }
    .stat span {
      color: var(--secondary-text-color, #727272);
    }
    .periods {
      display: flex;
      justify-content: space-around;
      margin-bottom: 8px;
    }
    .period {
      background: transparent;
      border: none;
      cursor: pointer;
      font: inherit;
      font-weight: 600;
      color: var(--secondary-text-color, #727272);
      padding: 6px 12px;
      border-radius: 6px;
    }
    .period.active {
      color: var(--primary-text-color, #212121);
      background: var(--secondary-background-color, #f0f0f0);
    }
    .error {
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--error-color, #db4437);
      padding: 8px 0;
    }
  `,Bt([gt()],Vt.prototype,"config",2),Bt([gt()],Vt.prototype,"points",2),Bt([gt()],Vt.prototype,"stats",2),Bt([gt()],Vt.prototype,"period",2),Bt([gt()],Vt.prototype,"errorMessage",2),Bt([gt()],Vt.prototype,"dialogOpen",2),Bt([gt()],Vt.prototype,"recordFields",2),Vt=Bt([lt(ft)],Vt);const Yt=window;Yt.customCards=Yt.customCards||[],Yt.customCards.push({type:ft,name:"Weight Tracker (Custom Metrics)",preview:!0,description:"Track weight progress toward a target using the Custom Metrics integration"}),console.info(`%c ${ft} %c 0.0.0 `,"color:#fff;background:#03a9f4;font-weight:700;","color:#03a9f4;background:#fff;font-weight:700;");var Gt=Object.defineProperty,Jt=Object.getOwnPropertyDescriptor,Kt=(t,e,s,i)=>{for(var r,o=i>1?void 0:i?Jt(e,s):e,n=t.length-1;n>=0;n--)(r=t[n])&&(o=(i?r(e,s,o):r(o))||o);return i&&o&&Gt(e,s,o),o};const Zt=[{name:"title",selector:{text:{}}},{name:"record_type",required:!0,selector:{text:{}}},{name:"value_field",selector:{text:{}}},{name:"",type:"grid",schema:[{name:"target",selector:{number:{mode:"box",step:.1}}},{name:"start_weight",selector:{number:{mode:"box",step:.1}}},{name:"unit",selector:{text:{}}},{name:"default_period",selector:{select:{mode:"dropdown",options:[{value:"7d",label:"7 days"},{value:"1m",label:"1 month"},{value:"6m",label:"6 months"},{value:"1y",label:"1 year"}]}}}]},{name:"",type:"grid",schema:[{name:"show_gauge",selector:{boolean:{}}},{name:"show_stats",selector:{boolean:{}}},{name:"show_graph",selector:{boolean:{}}},{name:"show_add_record",selector:{boolean:{}}}]}],Qt={title:"Title",record_type:"Record type (required)",value_field:"Value field (optional)",target:"Target weight",start_weight:"Starting weight (optional)",unit:"Unit",default_period:"Default period",show_gauge:"Show gauge",show_stats:"Show stats",show_graph:"Show graph",show_add_record:"Show add button"};let Xt=class extends ct{constructor(){super(...arguments),this.config={type:""},this.computeLabel=t=>Qt[t.name]??t.name,this.onValueChanged=t=>{t.stopPropagation();const e=t.detail.value;this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}}setConfig(t){this.config=t}render(){return this.hass?B`
      <ha-form
        .hass=${this.hass}
        .data=${this.config}
        .schema=${Zt}
        .computeLabel=${this.computeLabel}
        @value-changed=${this.onValueChanged}
      ></ha-form>
      <p class="hint">
        This card currently reads from the <b>Custom Metrics</b> integration. Filters and colour
        overrides can be set in YAML.
      </p>
    `:B``}};Xt.styles=o`
    .hint {
      color: var(--secondary-text-color, #727272);
      font-size: 0.85rem;
      margin: 12px 4px 0;
    }
  `,Kt([ut({attribute:!1})],Xt.prototype,"hass",2),Kt([gt()],Xt.prototype,"config",2),Xt=Kt([lt(mt)],Xt);var te=Object.freeze({__proto__:null,get WeightTrackerCardEditor(){return Xt}});
