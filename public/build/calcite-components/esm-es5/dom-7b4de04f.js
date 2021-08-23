var __awaiter=this&&this.__awaiter||function(e,t,r,n){function o(e){return e instanceof r?e:new r((function(t){t(e)}))}return new(r||(r=Promise))((function(r,i){function u(e){try{l(n.next(e))}catch(e){i(e)}}function a(e){try{l(n["throw"](e))}catch(e){i(e)}}function l(e){e.done?r(e.value):o(e.value).then(u,a)}l((n=n.apply(e,t||[])).next())}))};var __generator=this&&this.__generator||function(e,t){var r={label:0,sent:function(){if(i[0]&1)throw i[1];return i[1]},trys:[],ops:[]},n,o,i,u;return u={next:a(0),throw:a(1),return:a(2)},typeof Symbol==="function"&&(u[Symbol.iterator]=function(){return this}),u;function a(e){return function(t){return l([e,t])}}function l(u){if(n)throw new TypeError("Generator is already executing.");while(r)try{if(n=1,o&&(i=u[0]&2?o["return"]:u[0]?o["throw"]||((i=o["return"])&&i.call(o),0):o.next)&&!(i=i.call(o,u[1])).done)return i;if(o=0,i)u=[u[0]&2,i.value];switch(u[0]){case 0:case 1:i=u;break;case 4:r.label++;return{value:u[1],done:false};case 5:r.label++;o=u[1];u=[0];continue;case 7:u=r.ops.pop();r.trys.pop();continue;default:if(!(i=r.trys,i=i.length>0&&i[i.length-1])&&(u[0]===6||u[0]===2)){r=0;continue}if(u[0]===3&&(!i||u[1]>i[0]&&u[1]<i[3])){r.label=u[1];break}if(u[0]===6&&r.label<i[1]){r.label=i[1];i=u;break}if(i&&r.label<i[2]){r.label=i[2];r.ops.push(u);break}if(i[2])r.ops.pop();r.trys.pop();continue}u=t.call(e,r)}catch(e){u=[6,e];o=0}finally{n=i=0}if(u[0]&5)throw u[1];return{value:u[0]?u[1]:void 0,done:true}}};var __spreadArray=this&&this.__spreadArray||function(e,t){for(var r=0,n=t.length,o=e.length;r<n;r++,o++)e[o]=t[r];return e};import{g as guid}from"./guid-09142681.js";var CSS_UTILITY={autoTheme:"calcite-theme-auto",darkTheme:"calcite-theme-dark",lightTheme:"calcite-theme-light",rtl:"calcite--rtl"};var TEXT={loading:"Loading"};function ensureId(e){if(!e){return""}return e.id=e.id||e.tagName.toLowerCase()+"-"+guid()}function nodeListToArray(e){return Array.isArray(e)?e:Array.from(e)}function getThemeName(e){return closestElementCrossShadowBoundary(e,"."+CSS_UTILITY.darkTheme)?"dark":"light"}function getElementDir(e){var t="dir";var r="["+t+"]";var n=closestElementCrossShadowBoundary(e,r);return n?n.getAttribute(t):"ltr"}function getElementProp(e,t,r){var n="["+t+"]";var o=e.closest(n);return o?o.getAttribute(t):r}function getRootNode(e){return e.getRootNode()}function getHost(e){return e.host||null}function queryElementsRoots(e,t){function r(e,n){if(!e){return n}if(e.assignedSlot){e=e.assignedSlot}var o=getRootNode(e);var i=Array.from(o.querySelectorAll(t));var u=i.filter((function(e){return!n.includes(e)}));n=__spreadArray(__spreadArray([],n),u);var a=getHost(o);return a?r(a,n):n}return r(e,[])}function queryElementRoots(e,t){function r(e){if(!e){return null}if(e.assignedSlot){e=e.assignedSlot}var n=getRootNode(e);var o=n.querySelector(t);var i=getHost(n);return o?o:i?r(i):null}return r(e)}function closestElementCrossShadowBoundary(e,t){function r(e){return e?e.closest(t)||r(getHost(getRootNode(e))):null}return r(e)}function isCalciteFocusable(e){return typeof(e===null||e===void 0?void 0:e.setFocus)==="function"}function focusElement(e){return __awaiter(this,void 0,void 0,(function(){return __generator(this,(function(t){if(!e){return[2]}return[2,isCalciteFocusable(e)?e.setFocus():e.focus()]}))}))}function getSlotted(e,t,r){var n='[slot="'+t+'"]';if(r===null||r===void 0?void 0:r.all){return queryMultiple(e,n,r)}return querySingle(e,n,r)}function queryMultiple(e,t,r){var n=Array.from(e.querySelectorAll(t));n=r&&r.direct===false?n:n.filter((function(t){return t.parentElement===e}));var o=r===null||r===void 0?void 0:r.selector;return o?n.map((function(e){return Array.from(e.querySelectorAll(o))})).reduce((function(e,t){return __spreadArray(__spreadArray([],e),t)}),[]).filter((function(e){return!!e})):n}function querySingle(e,t,r){var n=e.querySelector(t);n=r&&r.direct===false?n:(n===null||n===void 0?void 0:n.parentElement)===e?n:null;var o=r===null||r===void 0?void 0:r.selector;return o?n.querySelector(o):n}function filterDirectChildren(e,t){return Array.from(e.children).filter((function(e){return e.matches(t)}))}function hasLabel(e,t){return e.contains(t)}function setRequestedIcon(e,t,r){if(typeof t==="string"&&t!==""){return t}else if(t===""){return e[r]}}function intersects(e,t){return!(t.left>e.right||t.right<e.left||t.top>e.bottom||t.bottom<e.top)}export{CSS_UTILITY as C,TEXT as T,getThemeName as a,getSlotted as b,closestElementCrossShadowBoundary as c,getElementProp as d,ensureId as e,focusElement as f,getElementDir as g,hasLabel as h,isCalciteFocusable as i,queryElementsRoots as j,intersects as k,filterDirectChildren as l,nodeListToArray as n,queryElementRoots as q,setRequestedIcon as s};