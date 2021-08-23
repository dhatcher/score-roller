var __awaiter=this&&this.__awaiter||function(e,t,i,n){function a(e){return e instanceof i?e:new i((function(t){t(e)}))}return new(i||(i=Promise))((function(i,r){function l(e){try{o(n.next(e))}catch(e){r(e)}}function s(e){try{o(n["throw"](e))}catch(e){r(e)}}function o(e){e.done?i(e.value):a(e.value).then(l,s)}o((n=n.apply(e,t||[])).next())}))};var __generator=this&&this.__generator||function(e,t){var i={label:0,sent:function(){if(r[0]&1)throw r[1];return r[1]},trys:[],ops:[]},n,a,r,l;return l={next:s(0),throw:s(1),return:s(2)},typeof Symbol==="function"&&(l[Symbol.iterator]=function(){return this}),l;function s(e){return function(t){return o([e,t])}}function o(l){if(n)throw new TypeError("Generator is already executing.");while(i)try{if(n=1,a&&(r=l[0]&2?a["return"]:l[0]?a["throw"]||((r=a["return"])&&r.call(a),0):a.next)&&!(r=r.call(a,l[1])).done)return r;if(a=0,r)l=[l[0]&2,r.value];switch(l[0]){case 0:case 1:r=l;break;case 4:i.label++;return{value:l[1],done:false};case 5:i.label++;a=l[1];l=[0];continue;case 7:l=i.ops.pop();i.trys.pop();continue;default:if(!(r=i.trys,r=r.length>0&&r[r.length-1])&&(l[0]===6||l[0]===2)){i=0;continue}if(l[0]===3&&(!r||l[1]>r[0]&&l[1]<r[3])){i.label=l[1];break}if(l[0]===6&&i.label<r[1]){i.label=r[1];r=l;break}if(r&&i.label<r[2]){i.label=r[2];i.ops.push(l);break}if(r[2])i.ops.pop();i.trys.pop();continue}l=t.call(e,i)}catch(e){l=[6,e];a=0}finally{n=r=0}if(l[0]&5)throw l[1];return{value:l[0]?l[1]:void 0,done:true}}};import{f as focusElement,b as getSlotted,g as getElementDir}from"./dom-7b4de04f.js";import{g as getRoundRobinIndex}from"./array-af19adb2.js";import{d as debounce}from"./debounce-047e09f4.js";import{h,H as Host}from"./index-b3673963.js";function mutationObserverCallback(){this.setUpItems();this.setUpFilter()}var SUPPORTED_ARROW_KEYS=["ArrowUp","ArrowDown"];function initialize(){this.setUpItems();this.setUpFilter();this.emitCalciteListChange=debounce(internalCalciteListChangeEvent.bind(this),0)}function initializeObserver(){this.observer.observe(this.el,{childList:true,subtree:true})}function cleanUpObserver(){this.observer.disconnect()}function calciteListItemChangeHandler(e){var t=this.selectedValues;var i=e.detail,n=i.item,a=i.value,r=i.selected,l=i.shiftPressed;if(r){if(this.multiple&&l){this.selectSiblings(n)}if(!this.multiple){this.deselectSiblingItems(n)}t.set(a,n)}else{t.delete(a);if(this.multiple&&l){this.selectSiblings(n,true)}}if(!this.multiple){toggleSingleSelectItemTabbing(n,r);if(r){focusElement(n)}}this.lastSelectedItem=n;this.emitCalciteListChange()}function calciteListItemValueChangeHandler(e){e.stopPropagation();var t=e.detail.oldValue;var i=this.selectedValues;if(i.has(t)){var n=i.get(t);i.delete(t);i.set(e.detail.newValue,n)}}function isValidNavigationKey(e){return!!SUPPORTED_ARROW_KEYS.find((function(t){return t===e}))}function calciteListFocusOutHandler(e){var t=this,i=t.el,n=t.items,a=t.multiple,r=t.selectedValues;if(a){return}var l=!!i.contains(e.relatedTarget);if(l){toggleSingleSelectItemTabbing(e.target,false);return}n.forEach((function(t){return toggleSingleSelectItemTabbing(t,r.size===0?e.target===t:t.selected)}))}function keyDownHandler(e){var t=e.key,i=e.target;if(!isValidNavigationKey(t)){return}var n=this,a=n.items,r=n.multiple,l=n.selectionFollowsFocus;var s=a.length;var o=a.indexOf(i);if(!s||o===-1){return}e.preventDefault();var c=getRoundRobinIndex(o+(t==="ArrowUp"?-1:1),s);var u=a[c];a.forEach((function(e){return toggleSingleSelectItemTabbing(e,e===u)}));if(!r&&l){u.selected=true}focusElement(u)}function internalCalciteListChangeEvent(){this.calciteListChange.emit(this.selectedValues)}function removeItem(e){if(e.defaultPrevented){return}var t=e.target;var i=this.selectedValues;if(t.parentElement.tagName==="CALCITE-PICK-LIST-GROUP"){t.parentElement.remove();Array.from(t.parentElement.children).forEach((function(e){return i.delete(e.value)}))}else{t.remove();i.delete(t.value)}this.emitCalciteListChange()}function toggleSingleSelectItemTabbing(e,t){if(t){e.removeAttribute("tabindex")}else{e.setAttribute("tabindex","-1")}}function setFocus(e){return __awaiter(this,void 0,void 0,(function(){var t,i,n,a,r;return __generator(this,(function(l){switch(l.label){case 0:if(!(this.filterEnabled&&e==="filter"))return[3,2];return[4,focusElement(this.filterEl)];case 1:l.sent();return[2];case 2:t=this,i=t.items,n=t.multiple,a=t.selectionFollowsFocus;if(i.length===0){return[2]}if(n){return[2,i[0].setFocus()]}r=i.find((function(e){return e.selected}))||i[0];if(a){r.selected=true}return[2,r.setFocus()]}}))}))}function setUpItems(e){var t=this;this.items=Array.from(this.el.querySelectorAll(e));var i=false;var n=this.items;n.forEach((function(e){e.icon=t.getIconType();if(!t.multiple){e.disableDeselect=true;toggleSingleSelectItemTabbing(e,false)}if(e.selected){i=true;toggleSingleSelectItemTabbing(e,true);t.selectedValues.set(e.value,e)}}));var a=n[0];if(!i&&a){toggleSingleSelectItemTabbing(a,true)}}function deselectSiblingItems(e){var t=this;this.items.forEach((function(i){if(i.value!==e.value){i.toggleSelected(false);if(t.selectedValues.has(i.value)){t.selectedValues.delete(i.value)}}}))}function selectSiblings(e,t){var i=this;if(t===void 0){t=false}if(!this.lastSelectedItem){return}var n=this.items;var a=n.findIndex((function(e){return e.value===i.lastSelectedItem.value}));var r=n.findIndex((function(t){return t.value===e.value}));n.slice(Math.min(a,r),Math.max(a,r)).forEach((function(e){e.toggleSelected(!t);if(!t){i.selectedValues.set(e.value,e)}else{i.selectedValues.delete(e.value)}}))}var groups;function handleFilter(e){var t=e.detail;var i=t.map((function(e){return e.value}));var n=false;if(!groups){groups=new Set}var a=this.items.filter((function(e){var t=e.parentElement;var a=t.matches("calcite-pick-list-group");if(a){groups.add(t)}var r=i.includes(e.value);e.hidden=!r;if(!n){n=r&&e.selected}return r}));groups.forEach((function(e){var t=a.some((function(t){return e.contains(t)}));e.hidden=!t;if(!t){return}var i=getSlotted(e,"parent-item");if(i){i.hidden=false;if(a.includes(i)){Array.from(e.children).forEach((function(e){return e.hidden=false}))}}}));groups.clear();if(a.length>0&&!n&&!this.multiple){toggleSingleSelectItemTabbing(a[0],true)}}function getItemData(){return this.items.map((function(e){return{label:e.label,description:e.description,metadata:e.metadata,value:e.value}}))}var CSS$1={sticky:"sticky"};var ICON_TYPES;(function(e){e["circle"]="circle";e["square"]="square";e["grip"]="grip"})(ICON_TYPES||(ICON_TYPES={}));var __rest=undefined&&undefined.__rest||function(e,t){var i={};for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0)i[n]=e[n];if(e!=null&&typeof Object.getOwnPropertySymbols==="function")for(var a=0,n=Object.getOwnPropertySymbols(e);a<n.length;a++){if(t.indexOf(n[a])<0&&Object.prototype.propertyIsEnumerable.call(e,n[a]))i[n[a]]=e[n[a]]}return i};var List=function(e){var t;var i=e.props,n=i.disabled,a=i.loading,r=i.filterEnabled,l=i.dataForFilter,s=i.handleFilter,o=i.filterPlaceholder,c=i.el,u=i.setFilterEl,f=__rest(e,["props"]);var d=h("slot",null);return h(Host,Object.assign({"aria-busy":a.toString(),"aria-disabled":n.toString(),role:"menu"},f),h("section",null,h("header",{class:(t={},t[CSS$1.sticky]=true,t)},r?h("calcite-filter",{"aria-label":o,data:l,dir:getElementDir(c),disabled:a||n,onCalciteFilterChange:s,placeholder:o,ref:u}):null,h("slot",{name:"menu-actions"})),a||n?h("calcite-scrim",{loading:a}):null,d))};var CSS={actions:"actions",actionsEnd:"actions--end",actionsStart:"actions--start",description:"description",handle:"handle",handleActivated:"handle--activated",highlight:"highlight",icon:"icon",iconDot:"icon-dot",label:"label",remove:"remove",title:"title",textContainer:"text-container"};var ICONS={checked:"check",remove:"x"};var SLOTS={actionsEnd:"actions-end",actionsStart:"actions-start"};var TEXT={remove:"remove"};export{CSS as C,ICON_TYPES as I,List as L,SLOTS as S,TEXT as T,initializeObserver as a,calciteListItemChangeHandler as b,cleanUpObserver as c,deselectSiblingItems as d,calciteListItemValueChangeHandler as e,setUpItems as f,getItemData as g,handleFilter as h,initialize as i,setFocus as j,keyDownHandler as k,calciteListFocusOutHandler as l,mutationObserverCallback as m,ICONS as n,removeItem as r,selectSiblings as s};