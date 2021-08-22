var __awaiter=this&&this.__awaiter||function(r,t,e,n){function u(r){return r instanceof e?r:new e((function(t){t(r)}))}return new(e||(e=Promise))((function(e,i){function o(r){try{l(n.next(r))}catch(r){i(r)}}function a(r){try{l(n["throw"](r))}catch(r){i(r)}}function l(r){r.done?e(r.value):u(r.value).then(o,a)}l((n=n.apply(r,t||[])).next())}))};var __generator=this&&this.__generator||function(r,t){var e={label:0,sent:function(){if(i[0]&1)throw i[1];return i[1]},trys:[],ops:[]},n,u,i,o;return o={next:a(0),throw:a(1),return:a(2)},typeof Symbol==="function"&&(o[Symbol.iterator]=function(){return this}),o;function a(r){return function(t){return l([r,t])}}function l(o){if(n)throw new TypeError("Generator is already executing.");while(e)try{if(n=1,u&&(i=o[0]&2?u["return"]:o[0]?u["throw"]||((i=u["return"])&&i.call(u),0):u.next)&&!(i=i.call(u,o[1])).done)return i;if(u=0,i)o=[o[0]&2,i.value];switch(o[0]){case 0:case 1:i=o;break;case 4:e.label++;return{value:o[1],done:false};case 5:e.label++;u=o[1];o=[0];continue;case 7:o=e.ops.pop();e.trys.pop();continue;default:if(!(i=e.trys,i=i.length>0&&i[i.length-1])&&(o[0]===6||o[0]===2)){e=0;continue}if(o[0]===3&&(!i||o[1]>i[0]&&o[1]<i[3])){e.label=o[1];break}if(o[0]===6&&e.label<i[1]){e.label=i[1];i=o;break}if(i&&e.label<i[2]){e.label=i[2];e.ops.push(o);break}if(i[2])e.ops.pop();e.trys.pop();continue}o=t.call(r,e)}catch(r){o=[6,r];u=0}finally{n=i=0}if(o[0]&5)throw o[1];return{value:o[0]?o[1]:void 0,done:true}}};var __spreadArray=this&&this.__spreadArray||function(r,t){for(var e=0,n=t.length,u=r.length;e<n;e++,u++)r[u]=t[e];return r};System.register(["./p-2c235db8.system.js"],(function(r){"use strict";var t;return{setters:[function(r){t=r.g}],execute:function(){r({a:o,b:p,c:v,d:l,e:u,f:y,g:a,h:b,i:h,j:s,k:w,l:_,n:i,q:d,s:A});var e=r("C",{autoTheme:"calcite-theme-auto",darkTheme:"calcite-theme-dark",lightTheme:"calcite-theme-light",rtl:"calcite--rtl"});var n=r("T",{loading:"Loading"});function u(r){if(!r){return""}return r.id=r.id||r.tagName.toLowerCase()+"-"+t()}function i(r){return Array.isArray(r)?r:Array.from(r)}function o(r){return v(r,"."+e.darkTheme)?"dark":"light"}function a(r){var t="dir";var e="["+t+"]";var n=v(r,e);return n?n.getAttribute(t):"ltr"}function l(r,t,e){var n="["+t+"]";var u=r.closest(n);return u?u.getAttribute(t):e}function c(r){return r.getRootNode()}function f(r){return r.host||null}function s(r,t){function e(r,n){if(!r){return n}if(r.assignedSlot){r=r.assignedSlot}var u=c(r);var i=Array.from(u.querySelectorAll(t));var o=i.filter((function(r){return!n.includes(r)}));n=__spreadArray(__spreadArray([],n),o);var a=f(u);return a?e(a,n):n}return e(r,[])}function d(r,t){function e(r){if(!r){return null}if(r.assignedSlot){r=r.assignedSlot}var n=c(r);var u=n.querySelector(t);var i=f(n);return u?u:i?e(i):null}return e(r)}function v(r,t){function e(r){return r?r.closest(t)||e(f(c(r))):null}return e(r)}function h(r){return typeof(r===null||r===void 0?void 0:r.setFocus)==="function"}function y(r){return __awaiter(this,void 0,void 0,(function(){return __generator(this,(function(t){if(!r){return[2]}return[2,h(r)?r.setFocus():r.focus()]}))}))}function p(r,t,e){var n='[slot="'+t+'"]';if(e===null||e===void 0?void 0:e.all){return g(r,n,e)}return m(r,n,e)}function g(r,t,e){var n=Array.from(r.querySelectorAll(t));n=e&&e.direct===false?n:n.filter((function(t){return t.parentElement===r}));var u=e===null||e===void 0?void 0:e.selector;return u?n.map((function(r){return Array.from(r.querySelectorAll(u))})).reduce((function(r,t){return __spreadArray(__spreadArray([],r),t)}),[]).filter((function(r){return!!r})):n}function m(r,t,e){var n=r.querySelector(t);n=e&&e.direct===false?n:(n===null||n===void 0?void 0:n.parentElement)===r?n:null;var u=e===null||e===void 0?void 0:e.selector;return u?n.querySelector(u):n}function _(r,t){return Array.from(r.children).filter((function(r){return r.matches(t)}))}function b(r,t){return r.contains(t)}function A(r,t,e){if(typeof t==="string"&&t!==""){return t}else if(t===""){return r[e]}}function w(r,t){return!(t.left>r.right||t.right<r.left||t.top>r.bottom||t.bottom<r.top)}}}}));