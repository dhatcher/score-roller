var __awaiter=this&&this.__awaiter||function(t,e,n,i){function a(t){return t instanceof n?t:new n((function(e){e(t)}))}return new(n||(n=Promise))((function(n,r){function o(t){try{c(i.next(t))}catch(t){r(t)}}function s(t){try{c(i["throw"](t))}catch(t){r(t)}}function c(t){t.done?n(t.value):a(t.value).then(o,s)}c((i=i.apply(t,e||[])).next())}))};var __generator=this&&this.__generator||function(t,e){var n={label:0,sent:function(){if(r[0]&1)throw r[1];return r[1]},trys:[],ops:[]},i,a,r,o;return o={next:s(0),throw:s(1),return:s(2)},typeof Symbol==="function"&&(o[Symbol.iterator]=function(){return this}),o;function s(t){return function(e){return c([t,e])}}function c(o){if(i)throw new TypeError("Generator is already executing.");while(n)try{if(i=1,a&&(r=o[0]&2?a["return"]:o[0]?a["throw"]||((r=a["return"])&&r.call(a),0):a.next)&&!(r=r.call(a,o[1])).done)return r;if(a=0,r)o=[o[0]&2,r.value];switch(o[0]){case 0:case 1:r=o;break;case 4:n.label++;return{value:o[1],done:false};case 5:n.label++;a=o[1];o=[0];continue;case 7:o=n.ops.pop();n.trys.pop();continue;default:if(!(r=n.trys,r=r.length>0&&r[r.length-1])&&(o[0]===6||o[0]===2)){n=0;continue}if(o[0]===3&&(!r||o[1]>r[0]&&o[1]<r[3])){n.label=o[1];break}if(o[0]===6&&n.label<r[1]){n.label=r[1];r=o;break}if(r&&n.label<r[2]){n.label=r[2];n.ops.push(o);break}if(r[2])n.ops.pop();n.trys.pop();continue}o=e.call(t,n)}catch(t){o=[6,t];a=0}finally{i=r=0}if(o[0]&5)throw o[1];return{value:o[0]?o[1]:void 0,done:true}}};import{a as getAssetPath,r as registerInstance,h,H as Host,g as getElement}from"./index-b3673963.js";import{g as getElementDir}from"./dom-7b4de04f.js";import"./guid-09142681.js";var CSS={icon:"icon",flipRtl:"flip-rtl"};var iconCache={};var requestCache={};var scaleToPx={s:16,m:24,l:32};function fetchIcon(t){var e=t.icon,n=t.scale;return __awaiter(this,void 0,void 0,(function(){var t,i,a,r,o,s;return __generator(this,(function(c){switch(c.label){case 0:t=scaleToPx[n];i=normalizeIconName(e);a=i.charAt(i.length-1)==="F";r=a?i.substring(0,i.length-1):i;o=""+r+t+(a?"F":"");if(iconCache[o]){return[2,iconCache[o]]}if(!requestCache[o]){requestCache[o]=fetch(getAssetPath("./assets/calcite-icon/"+o+".json")).then((function(t){return t.json()})).catch((function(){console.error('"'+o+'" is not a valid calcite-ui-icon name');return""}))}return[4,requestCache[o]];case 1:s=c.sent();iconCache[o]=s;return[2,s]}}))}))}function normalizeIconName(t){var e=!isNaN(Number(t.charAt(0)));var n=t.split("-");if(n.length===1){return e?"i"+t:t}return n.map((function(t,n){if(n===0){return e?"i"+t.toUpperCase():t}return t.charAt(0).toUpperCase()+t.slice(1)})).join("")}var calciteIconCss="@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:-ms-inline-flexbox;display:inline-flex}:host([scale=s]){width:1rem;height:1rem;min-width:1rem;min-height:1rem}:host([scale=m]){width:1.5rem;height:1.5rem;min-width:1.5rem;min-height:1.5rem}:host([scale=l]){width:2rem;height:2rem;min-width:2rem;min-height:2rem}.flip-rtl{-webkit-transform:scaleX(-1);transform:scaleX(-1)}.svg{display:block}";var CalciteIcon=function(){function t(t){registerInstance(this,t);this.icon=null;this.flipRtl=false;this.scale="m";this.visible=false}t.prototype.connectedCallback=function(){var t=this;this.waitUntilVisible((function(){t.visible=true;t.loadIconPathData()}))};t.prototype.disconnectedCallback=function(){if(this.intersectionObserver){this.intersectionObserver.disconnect();this.intersectionObserver=null}};t.prototype.componentWillLoad=function(){return __awaiter(this,void 0,void 0,(function(){return __generator(this,(function(t){this.loadIconPathData();return[2]}))}))};t.prototype.render=function(){var t;var e=this,n=e.el,i=e.flipRtl,a=e.pathData,r=e.scale,o=e.textLabel;var s=getElementDir(n);var c=scaleToPx[r];var l=!!o;var f=[].concat(a||"");return h(Host,{"aria-hidden":(!l).toString(),"aria-label":l?o:null,role:l?"img":null},h("svg",{class:(t={},t[CSS.flipRtl]=s==="rtl"&&i,t.svg=true,t),fill:"currentColor",height:"100%",viewBox:"0 0 "+c+" "+c,width:"100%",xmlns:"http://www.w3.org/2000/svg"},f.map((function(t){return typeof t==="string"?h("path",{d:t}):h("path",{d:t.d,opacity:"opacity"in t?t.opacity:1})}))))};t.prototype.loadIconPathData=function(){return __awaiter(this,void 0,void 0,(function(){var t,e,n,i,a;return __generator(this,(function(r){switch(r.label){case 0:t=this,e=t.icon,n=t.scale,i=t.visible;if(!e||!i){return[2]}a=this;return[4,fetchIcon({icon:e,scale:n})];case 1:a.pathData=r.sent();return[2]}}))}))};t.prototype.waitUntilVisible=function(t){var e=this;if(typeof window==="undefined"||!window.IntersectionObserver){t();return}this.intersectionObserver=new IntersectionObserver((function(n){n.forEach((function(n){if(n.isIntersecting){e.intersectionObserver.disconnect();e.intersectionObserver=null;t()}}))}),{rootMargin:"50px"});this.intersectionObserver.observe(this.el)};Object.defineProperty(t,"assetsDirs",{get:function(){return["assets"]},enumerable:false,configurable:true});Object.defineProperty(t.prototype,"el",{get:function(){return getElement(this)},enumerable:false,configurable:true});Object.defineProperty(t,"watchers",{get:function(){return{icon:["loadIconPathData"],scale:["loadIconPathData"]}},enumerable:false,configurable:true});return t}();CalciteIcon.style=calciteIconCss;export{CalciteIcon as calcite_icon};