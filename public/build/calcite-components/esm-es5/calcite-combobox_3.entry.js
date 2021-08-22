var __awaiter=this&&this.__awaiter||function(e,t,i,n){function o(e){return e instanceof i?e:new i((function(t){t(e)}))}return new(i||(i=Promise))((function(i,a){function r(e){try{c(n.next(e))}catch(e){a(e)}}function s(e){try{c(n["throw"](e))}catch(e){a(e)}}function c(e){e.done?i(e.value):o(e.value).then(r,s)}c((n=n.apply(e,t||[])).next())}))};var __generator=this&&this.__generator||function(e,t){var i={label:0,sent:function(){if(a[0]&1)throw a[1];return a[1]},trys:[],ops:[]},n,o,a,r;return r={next:s(0),throw:s(1),return:s(2)},typeof Symbol==="function"&&(r[Symbol.iterator]=function(){return this}),r;function s(e){return function(t){return c([e,t])}}function c(r){if(n)throw new TypeError("Generator is already executing.");while(i)try{if(n=1,o&&(a=r[0]&2?o["return"]:r[0]?o["throw"]||((a=o["return"])&&a.call(o),0):o.next)&&!(a=a.call(o,r[1])).done)return a;if(o=0,a)r=[r[0]&2,a.value];switch(r[0]){case 0:case 1:a=r;break;case 4:i.label++;return{value:r[1],done:false};case 5:i.label++;o=r[1];r=[0];continue;case 7:r=i.ops.pop();i.trys.pop();continue;default:if(!(a=i.trys,a=a.length>0&&a[a.length-1])&&(r[0]===6||r[0]===2)){i=0;continue}if(r[0]===3&&(!a||r[1]>a[0]&&r[1]<a[3])){i.label=r[1];break}if(r[0]===6&&i.label<a[1]){i.label=a[1];a=r;break}if(a&&i.label<a[2]){i.label=a[2];i.ops.push(r);break}if(a[2])i.ops.pop();i.trys.pop();continue}r=t.call(e,i)}catch(e){r=[6,e];o=0}finally{n=a=0}if(r[0]&5)throw r[1];return{value:r[0]?r[1]:void 0,done:true}}};var __spreadArray=this&&this.__spreadArray||function(e,t){for(var i=0,n=t.length,o=e.length;i<n;i++,o++)e[o]=t[i];return e};import{r as registerInstance,c as createEvent,h,H as Host,g as getElement}from"./index-b3673963.js";import{a as isSymbol,S as Symbol,d as debounce}from"./debounce-047e09f4.js";import{i as isArray,f as forIn}from"./forIn-d55260fc.js";import{n as nodeListToArray,g as getElementDir,d as getElementProp,C as CSS_UTILITY}from"./dom-7b4de04f.js";import{g as getKey}from"./key-ec82f942.js";import{u as updatePopper,c as createPopper,C as CSS$2}from"./popper-ec76b24f.js";import{g as guid}from"./guid-09142681.js";function arrayMap(e,t){var i=-1,n=e==null?0:e.length,o=Array(n);while(++i<n){o[i]=t(e[i],i,e)}return o}var INFINITY=1/0;var symbolProto=Symbol?Symbol.prototype:undefined,symbolToString=symbolProto?symbolProto.toString:undefined;function baseToString(e){if(typeof e=="string"){return e}if(isArray(e)){return arrayMap(e,baseToString)+""}if(isSymbol(e)){return symbolToString?symbolToString.call(e):""}var t=e+"";return t=="0"&&1/e==-INFINITY?"-0":t}function toString(e){return e==null?"":baseToString(e)}var reRegExpChar=/[\\^$.*+?()[\]{}|]/g,reHasRegExpChar=RegExp(reRegExpChar.source);function escapeRegExp(e){e=toString(e);return e&&reHasRegExpChar.test(e)?e.replace(reRegExpChar,"\\$&"):e}var filter=function(e,t){var i=escapeRegExp(t);var n=new RegExp(i,"ig");if(e.length===0){console.warn("No data was passed to the filter function.\n    The data argument should be an array of objects")}var o=function(e,t){var i;if((i=e)===null||i===void 0?void 0:i.constant){return true}var n=false;forIn(e,(function(e){if(typeof e==="function"){return}if(Array.isArray(e)||typeof e==="object"&&e!==null){if(o(e,t)){n=true}}else if(t.test(e)){n=true}}));return n};var a=e.filter((function(e){return o(e,n)}));return a};var ComboboxItem="CALCITE-COMBOBOX-ITEM";var ComboboxItemGroup="CALCITE-COMBOBOX-ITEM-GROUP";var ComboboxChildSelector=ComboboxItem+", "+ComboboxItemGroup;var ComboboxDefaultPlacement="bottom-leading";function getAncestors(e){var t,i;var n=(t=e.parentElement)===null||t===void 0?void 0:t.closest(ComboboxChildSelector);var o=(i=n===null||n===void 0?void 0:n.parentElement)===null||i===void 0?void 0:i.closest(ComboboxChildSelector);return[n,o].filter((function(e){return e}))}function getItemAncestors(e){var t;return((t=e.ancestors)===null||t===void 0?void 0:t.filter((function(e){return e.nodeName==="CALCITE-COMBOBOX-ITEM"})))||[]}function getItemChildren(e){return nodeListToArray(e.querySelectorAll("calcite-combobox-item"))}function hasActiveChildren(e){var t=nodeListToArray(e.querySelectorAll("calcite-combobox-item"));return t.filter((function(e){return e.selected})).length>0}function getDepth(e){var t=document.evaluate("ancestor::calcite-combobox-item | ancestor::calcite-combobox-item-group",e,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);return t.snapshotLength}var calciteComboboxCss="@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:block;position:relative}:host([disabled]){pointer-events:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;opacity:0.5}:host([scale=s]){font-size:var(--calcite-font-size--2);--calcite-combobox-item-spacing-unit-l:0.5rem;--calcite-combobox-item-spacing-unit-s:0.25rem;--calcite-combobox-input-height:1.5rem}:host([scale=m]){font-size:var(--calcite-font-size--1);--calcite-combobox-item-spacing-unit-l:0.75rem;--calcite-combobox-item-spacing-unit-s:0.5rem;--calcite-combobox-input-height:2rem}:host([scale=l]){font-size:var(--calcite-font-size-0);--calcite-combobox-item-spacing-unit-l:1rem;--calcite-combobox-item-spacing-unit-s:0.75rem;--calcite-combobox-input-height:2.75rem}.wrapper{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-1);outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;-webkit-box-shadow:inset 0 0 0 1px var(--calcite-ui-border-input);box-shadow:inset 0 0 0 1px var(--calcite-ui-border-input);padding:var(--calcite-combobox-item-spacing-unit-s) var(--calcite-combobox-item-spacing-unit-l) 0 var(--calcite-combobox-item-spacing-unit-l)}.wrapper--active{outline:2px solid var(--calcite-ui-brand);outline-offset:-2px}.wrapper--single{padding:0 var(--calcite-combobox-item-spacing-unit-l);cursor:pointer;-ms-flex-wrap:nowrap;flex-wrap:nowrap}.input{-ms-flex-positive:1;flex-grow:1;font-family:inherit;padding:0;background-color:transparent;border-style:none;color:var(--calcite-ui-text-1);-webkit-appearance:none;-moz-appearance:none;appearance:none;font-size:inherit;height:var(--calcite-combobox-input-height);line-height:var(--calcite-combobox-input-height);min-width:120px;margin-bottom:var(--calcite-combobox-item-spacing-unit-s)}.input:focus{outline:2px solid transparent;outline-offset:2px}.input--transparent{opacity:0}.input--single{margin-bottom:0;margin-top:0;padding:0}.wrapper--active .input-single{cursor:text}.input--hidden{width:0;min-width:0;opacity:0;pointer-events:none}.input--icon{padding:0 var(--calcite-combobox-item-spacing-unit-l)}.input-wrap{display:-ms-flexbox;display:flex}.input-wrap--single{-ms-flex:1 1 auto;flex:1 1 auto;overflow:hidden}.label{padding:0;display:block;-ms-flex:1 1 auto;flex:1 1 auto;pointer-events:none;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:100%;height:var(--calcite-combobox-input-height);line-height:var(--calcite-combobox-input-height)}.label--spaced{padding-top:0;padding-bottom:0;padding-left:var(--calcite-combobox-item-spacing-unit-l);padding-right:var(--calcite-combobox-item-spacing-unit-l)}.icon-end,.icon-start{cursor:pointer;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;width:1rem}.popper-container{width:100%;display:block;position:absolute;z-index:900;-webkit-transform:scale(0);transform:scale(0);visibility:hidden;pointer-events:none}.popper-container .calcite-popper-anim{position:relative;z-index:1;-webkit-transition:var(--calcite-popper-transition);transition:var(--calcite-popper-transition);visibility:hidden;-webkit-transition-property:visibility, opacity, -webkit-transform;transition-property:visibility, opacity, -webkit-transform;transition-property:transform, visibility, opacity;transition-property:transform, visibility, opacity, -webkit-transform;opacity:0;-webkit-box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);border-radius:0.25rem}.popper-container[data-popper-placement^=bottom] .calcite-popper-anim{-webkit-transform:translateY(-5px);transform:translateY(-5px)}.popper-container[data-popper-placement^=top] .calcite-popper-anim{-webkit-transform:translateY(5px);transform:translateY(5px)}.popper-container[data-popper-placement^=left] .calcite-popper-anim{-webkit-transform:translateX(5px);transform:translateX(5px)}.popper-container[data-popper-placement^=right] .calcite-popper-anim{-webkit-transform:translateX(-5px);transform:translateX(-5px)}.popper-container[data-popper-placement] .calcite-popper-anim--active{opacity:1;visibility:visible;-webkit-transform:translate(0);transform:translate(0)}.popper-container--active{pointer-events:initial;visibility:visible}.screen-readers-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border-width:0}.list-container{overflow-y:auto;max-height:100vh;background-color:var(--calcite-ui-foreground-1);width:var(--calcite-dropdown-width)}.list{display:block;margin:0;padding:0}.list--hide{height:0;overflow:hidden}.chip{margin-right:var(--calcite-combobox-item-spacing-unit-s);margin-bottom:var(--calcite-combobox-item-spacing-unit-s);max-width:100%}.chip--active{background-color:var(--calcite-ui-foreground-3)}.chip:last-child{margin-right:0}.chip--rtl{margin-right:unset;margin-left:var(--calcite-combobox-item-spacing-unit-l)}.chip--rtl:last-child{margin-left:0}.item{display:block}";var isGroup=function(e){return e.tagName===ComboboxItemGroup};var CalciteCombobox=function(){function e(e){var t=this;registerInstance(this,e);this.calciteLookupChange=createEvent(this,"calciteLookupChange",7);this.calciteComboboxChange=createEvent(this,"calciteComboboxChange",7);this.calciteComboboxFilterChange=createEvent(this,"calciteComboboxFilterChange",7);this.calciteComboboxChipDismiss=createEvent(this,"calciteComboboxChipDismiss",7);this.calciteComboboxOpen=createEvent(this,"calciteComboboxOpen",7);this.calciteComboboxClose=createEvent(this,"calciteComboboxClose",7);this.active=false;this.disabled=false;this.maxItems=0;this.overlayPositioning="absolute";this.selectionMode="multi";this.scale="m";this.items=[];this.groupItems=[];this.selectedItems=[];this.visibleItems=[];this.hideList=!this.active;this.activeItemIndex=-1;this.activeChipIndex=-1;this.activeDescendant="";this.text="";this.open=this.active;this.maxScrollerHeight=0;this.textInput=null;this.observer=null;this.guid=guid();this.inputHeight=0;this.ignoreSelectedEventsFlag=false;this.activeTransitionProp="opacity";this.keydownHandler=function(e){var i=getKey(e.key,getElementDir(t.el));switch(i){case"Tab":t.activeChipIndex=-1;t.activeItemIndex=-1;if(t.allowCustomValues&&t.text){t.addCustomChip(t.text,true);e.preventDefault()}else{t.active=false}break;case"ArrowLeft":t.previousChip();break;case"ArrowRight":t.nextChip();break;case"ArrowUp":e.preventDefault();t.active=true;t.shiftActiveItemIndex(-1);break;case"ArrowDown":e.preventDefault();t.active=true;t.shiftActiveItemIndex(1);break;case"Home":t.active=true;t.updateActiveItemIndex(0);break;case"End":t.active=true;t.updateActiveItemIndex(t.visibleItems.length-1);break;case"Escape":t.active=false;break;case"Enter":if(t.activeItemIndex>-1){t.toggleSelection(t.visibleItems[t.activeItemIndex])}else if(t.activeChipIndex>-1){t.removeActiveChip()}else if(t.allowCustomValues&&t.text){t.addCustomChip(t.text,true)}break;case"Delete":case"Backspace":if(t.activeChipIndex>-1){t.removeActiveChip()}else if(!t.text&&t.isMulti()){t.removeLastChip()}break;default:if(!t.active){t.setFocus()}break}};this.toggleCloseEnd=function(){t.hideList=true;t.el.removeEventListener("calciteComboboxClose",t.toggleCloseEnd)};this.toggleOpenEnd=function(){t.hideList=false;t.el.removeEventListener("calciteComboboxOpen",t.toggleOpenEnd)};this.transitionEnd=function(e){if(e.propertyName===t.activeTransitionProp){t.active?t.calciteComboboxOpen.emit():t.calciteComboboxClose.emit()}};this.setMaxScrollerHeight=function(){if(t.active){t.maxScrollerHeight=t.getMaxScrollerHeight(t.getCombinedItems())}};this.calciteChipDismissHandler=function(e,i){t.active=false;var n=t.items.find((function(e){return e===i}));if(n){t.toggleSelection(n,false)}t.calciteComboboxChipDismiss.emit(e.detail)};this.setFocusClick=function(){t.setFocus()};this.setInactiveIfNotContained=function(e){var i=e.composedPath();if(!t.active||i.includes(t.el)||i.includes(t.referenceEl)){return}if(t.allowCustomValues&&t.text){t.addCustomChip(t.text)}if(t.selectionMode==="single"){if(t.textInput){t.textInput.value=""}t.text="";t.filterItems("");t.updateActiveItemIndex(-1)}t.active=false};this.setMenuEl=function(e){t.menuEl=e};this.setListContainerEl=function(e){t.listContainerEl=e};this.setReferenceEl=function(e){t.referenceEl=e};this.inputHandler=function(e){var i=e.target.value;t.text=i;t.filterItems(i);if(i){t.activeChipIndex=-1}};this.filterItems=function(){var e=function(e,t){return e&&t.some((function(t){var i=t.label,n=t.value;if(isGroup(e)){return n===e.label||n===e.label}return n===e.textLabel||n===e.value||i===e.textLabel||i===e.value}))};return debounce((function(i){var n=filter(t.data,i);var o=t.getCombinedItems();o.forEach((function(t){var i=!e(t,n);t.hidden=i;var o=t.ancestors,a=o[0],r=o[1];if(e(a,n)||e(r,n)){t.hidden=false}if(!i){t.ancestors.forEach((function(e){return e.hidden=false}))}}));t.visibleItems=t.getVisibleItems();t.calciteComboboxFilterChange.emit({visibleItems:__spreadArray([],t.visibleItems),text:i})}),100)}();this.internalCalciteLookupChangeEvent=function(){t.calciteLookupChange.emit(t.selectedItems)};this.emitCalciteLookupChange=debounce(this.internalCalciteLookupChangeEvent,0);this.internalComboboxChangeEvent=function(){var e=t.selectedItems;t.calciteComboboxChange.emit({selectedItems:e})};this.emitComboboxChange=debounce(this.internalComboboxChangeEvent,0);this.updateItems=function(){t.items=t.getItems();t.groupItems=t.getGroupItems();t.data=t.getData();t.selectedItems=t.getSelectedItems();t.visibleItems=t.getVisibleItems();t.needsIcon=t.getNeedsIcon();if(!t.allowCustomValues){t.setMaxScrollerHeight()}};this.comboboxFocusHandler=function(){t.active=true;t.textInput.focus()};this.comboboxBlurHandler=function(e){t.setInactiveIfNotContained(e)}}e.prototype.activeHandler=function(e,t){var i=this;if(t&&!e){this.el.addEventListener("calciteComboboxClose",this.toggleCloseEnd);this.open=false}else if(!t&&e){this.el.addEventListener("calciteComboboxOpen",this.toggleOpenEnd);requestAnimationFrame((function(){i.reposition();i.setMaxScrollerHeight();i.open=true}))}this.reposition();this.setMaxScrollerHeight()};e.prototype.maxItemsHandler=function(){this.setMaxScrollerHeight()};e.prototype.documentClickHandler=function(e){this.setInactiveIfNotContained(e)};e.prototype.calciteComboboxItemChangeHandler=function(e){if(this.ignoreSelectedEventsFlag){return}var t=e.target;this.toggleSelection(t,t.selected)};e.prototype.reposition=function(){return __awaiter(this,void 0,void 0,(function(){var e,t,i,n;return __generator(this,(function(o){e=this,t=e.popper,i=e.menuEl;n=this.getModifiers();t?updatePopper({el:i,modifiers:n,placement:ComboboxDefaultPlacement,popper:t}):this.createPopper();return[2]}))}))};e.prototype.setFocus=function(){return __awaiter(this,void 0,void 0,(function(){var e;return __generator(this,(function(t){this.active=true;(e=this.textInput)===null||e===void 0?void 0:e.focus();this.activeChipIndex=-1;this.activeItemIndex=-1;return[2]}))}))};e.prototype.connectedCallback=function(){{this.observer=new MutationObserver(this.updateItems)}this.createPopper()};e.prototype.componentWillLoad=function(){this.updateItems()};e.prototype.componentDidLoad=function(){var e;(e=this.observer)===null||e===void 0?void 0:e.observe(this.el,{childList:true,subtree:true})};e.prototype.componentDidRender=function(){if(this.el.offsetHeight!==this.inputHeight){this.reposition();this.inputHeight=this.el.offsetHeight}};e.prototype.disconnectedCallback=function(){var e;(e=this.observer)===null||e===void 0?void 0:e.disconnect();this.destroyPopper()};e.prototype.textHandler=function(){this.updateActiveItemIndex(-1)};e.prototype.getModifiers=function(){var e={name:"flip",enabled:true};e.options={fallbackPlacements:["top-start","top","top-end","bottom-start","bottom","bottom-end"]};return[e]};e.prototype.createPopper=function(){this.destroyPopper();var e=this,t=e.menuEl,i=e.referenceEl,n=e.overlayPositioning;var o=this.getModifiers();this.popper=createPopper({el:t,modifiers:o,overlayPositioning:n,placement:ComboboxDefaultPlacement,referenceEl:i})};e.prototype.destroyPopper=function(){var e=this.popper;if(e){e.destroy()}this.popper=null};e.prototype.getMaxScrollerHeight=function(e){var t=this;var i=this.maxItems;var n=0;var o=0;e.forEach((function(e){if(n<i&&i>0){var a=t.calculateSingleItemHeight(e);if(a>0){o+=a;n++}}}));return o};e.prototype.calculateSingleItemHeight=function(e){var t=e.offsetHeight;var i=e.querySelectorAll(ComboboxChildSelector);i.forEach((function(e){t-=e.offsetHeight}));return t};e.prototype.getCombinedItems=function(){return __spreadArray(__spreadArray([],this.groupItems),this.items)};e.prototype.toggleSelection=function(e,t){if(t===void 0){t=!e.selected}if(!e){return}if(this.isMulti()){e.selected=t;this.updateAncestors(e);this.selectedItems=this.getSelectedItems();this.emitCalciteLookupChange();this.emitComboboxChange();this.resetText();this.textInput.focus();this.filterItems("")}else{this.ignoreSelectedEventsFlag=true;this.items.forEach((function(t){return t.selected=t===e}));this.ignoreSelectedEventsFlag=false;this.selectedItems=this.getSelectedItems();this.emitComboboxChange();this.textInput.value=e.textLabel;this.active=false;this.updateActiveItemIndex(-1);this.resetText();this.filterItems("")}};e.prototype.updateAncestors=function(e){if(this.selectionMode!=="ancestors"){return}var t=getItemAncestors(e);var i=getItemChildren(e);if(e.selected){t.forEach((function(e){e.selected=true}))}else{i.forEach((function(e){return e.selected=false}));__spreadArray([],t).forEach((function(e){if(!hasActiveChildren(e)){e.selected=false}}))}};e.prototype.getVisibleItems=function(){return this.items.filter((function(e){return!e.hidden}))};e.prototype.getSelectedItems=function(){var e=this;return!this.isMulti()?[this.items.find((function(e){return e.selected}))]:this.items.filter((function(t){return t.selected&&(e.selectionMode!=="ancestors"||!hasActiveChildren(t))})).sort((function(t,i){var n=e.selectedItems.indexOf(t);var o=e.selectedItems.indexOf(i);if(n>-1&&o>-1){return n-o}return o-n}))};e.prototype.getData=function(){return this.items.map((function(e){return{constant:e.constant,value:e.value,label:e.textLabel,guid:e.guid}}))};e.prototype.getNeedsIcon=function(){return this.selectionMode==="single"&&this.items.some((function(e){return e.icon}))};e.prototype.resetText=function(){this.textInput.value="";this.text=""};e.prototype.getItems=function(){var e=Array.from(this.el.querySelectorAll(ComboboxItem));return e.filter((function(e){return!e.disabled}))};e.prototype.getGroupItems=function(){return Array.from(this.el.querySelectorAll(ComboboxItemGroup))};e.prototype.addCustomChip=function(e,t){var i=this.items.find((function(t){return t.textLabel===e}));if(i){this.toggleSelection(i,true)}else{var n=document.createElement(ComboboxItem);n.value=e;n.textLabel=e;n.guid=guid();n.selected=true;this.el.appendChild(n);this.resetText();if(t){this.setFocus()}this.updateItems();this.filterItems("");this.emitCalciteLookupChange();this.emitComboboxChange()}};e.prototype.removeActiveChip=function(){this.toggleSelection(this.selectedItems[this.activeChipIndex],false);this.setFocus()};e.prototype.removeLastChip=function(){this.toggleSelection(this.selectedItems[this.selectedItems.length-1],false);this.setFocus()};e.prototype.previousChip=function(){if(this.text){return}var e=this.selectedItems.length-1;var t=this.activeChipIndex;this.activeChipIndex=t===-1?e:Math.max(t-1,0);this.updateActiveItemIndex(-1);this.focusChip()};e.prototype.nextChip=function(){if(this.text||this.activeChipIndex===-1){return}var e=this.selectedItems.length-1;var t=this.activeChipIndex+1;if(t>e){this.activeChipIndex=-1;this.setFocus()}else{this.activeChipIndex=t;this.focusChip()}this.updateActiveItemIndex(-1)};e.prototype.focusChip=function(){var e;var t=(e=this.selectedItems[this.activeChipIndex])===null||e===void 0?void 0:e.guid;var i=this.referenceEl.querySelector("#chip-"+t);i===null||i===void 0?void 0:i.setFocus()};e.prototype.shiftActiveItemIndex=function(e){var t=this.visibleItems.length;var i=(this.activeItemIndex+t+e)%t;this.updateActiveItemIndex(i);var n=this.visibleItems[this.activeItemIndex];var o=this.calculateSingleItemHeight(n);var a=this.listContainerEl,r=a.offsetHeight,s=a.scrollTop;if(r+s<n.offsetTop+o){this.listContainerEl.scrollTop=n.offsetTop-r+o}else if(n.offsetTop<s){this.listContainerEl.scrollTop=n.offsetTop}};e.prototype.updateActiveItemIndex=function(e){this.activeItemIndex=e;var t=null;this.visibleItems.forEach((function(i,n){if(n===e){i.active=true;t=i.guid}else{i.active=false}}));this.activeDescendant=t;if(this.activeItemIndex>-1){this.activeChipIndex=-1;this.textInput.focus()}};e.prototype.isMulti=function(){return this.selectionMode!=="single"};e.prototype.renderChips=function(){var e=this;var t=this,i=t.activeChipIndex,n=t.scale,o=t.selectionMode,a=t.el;var r=getElementDir(a);return this.selectedItems.map((function(t,a){var s={chip:true,"chip--active":i===a,"chip--rtl":r==="rtl"};var c=__spreadArray([],getItemAncestors(t)).reverse();var l=__spreadArray(__spreadArray([],c),[t]).map((function(e){return e.textLabel}));var m=o!=="ancestors"?t.textLabel:l.join(" / ");return h("calcite-chip",{"aria-label":m,class:s,dismissLabel:"remove tag",dismissible:true,icon:t.icon,id:"chip-"+t.guid,key:t.textLabel,onCalciteChipDismiss:function(i){return e.calciteChipDismissHandler(i,t)},scale:n,title:m,value:t.value},m)}))};e.prototype.renderInput=function(){var e=this;var t=this,i=t.active,n=t.disabled,o=t.placeholder,a=t.selectionMode,r=t.needsIcon,s=t.label,c=t.selectedItems;var l=a==="single";var m=c[0];var p=!i&&l&&!!m;return h("span",{class:{"input-wrap":true,"input-wrap--single":l}},p&&h("span",{class:{label:true,"label--spaced":r},key:"label",onFocus:this.comboboxFocusHandler,tabindex:"0"},m.textLabel),h("input",{"aria-activedescendant":this.activeDescendant,"aria-autocomplete":"list","aria-controls":guid,"aria-label":s,class:{input:true,"input--transparent":this.activeChipIndex>-1,"input--single":l,"input--hidden":p,"input--icon":l&&r},disabled:n,id:guid+"-input",key:"input",onBlur:this.comboboxBlurHandler,onFocus:this.comboboxFocusHandler,onInput:this.inputHandler,placeholder:o,ref:function(t){return e.textInput=t},type:"text"}))};e.prototype.renderListBoxOptions=function(){return this.visibleItems.map((function(e){return h("li",{"aria-selected":(!!e.selected).toString(),id:e.guid,role:"option",tabindex:"-1"},e.textLabel)}))};e.prototype.renderPopperContainer=function(){var e;var t=this,i=t.active,n=t.maxScrollerHeight,o=t.setMenuEl,a=t.setListContainerEl,r=t.hideList,s=t.open;var c=(e={"list-container":true},e[CSS$2.animation]=true,e[CSS$2.animationActive]=i,e);var l={maxHeight:n>0?n+"px":""};return h("div",{"aria-hidden":"true",class:{"popper-container":true,"popper-container--active":s},ref:o},h("div",{class:c,onTransitionEnd:this.transitionEnd,ref:a,style:l},h("ul",{class:{list:true,"list--hide":r}},h("slot",null))))};e.prototype.renderIconStart=function(){var e=this,t=e.selectionMode,i=e.needsIcon,n=e.selectedItems;var o=n[0];return t==="single"&&i&&h("span",{class:"icon-start"},(o===null||o===void 0?void 0:o.icon)&&h("calcite-icon",{class:"selected-icon",icon:o.icon,scale:"s"}))};e.prototype.renderIconEnd=function(){return this.selectionMode==="single"&&h("span",{class:"icon-end"},h("calcite-icon",{icon:"chevron-down",scale:"s"}))};e.prototype.render=function(){var e=this,t=e.guid,i=e.open,n=e.label;var o=this.selectionMode==="single";var a=t+"-label";return h(Host,{onKeyDown:this.keydownHandler},h("div",{"aria-autocomplete":"list","aria-expanded":i.toString(),"aria-haspopup":"listbox","aria-labelledby":a,"aria-owns":t,class:{wrapper:true,"wrapper--active":i,"wrapper--single":o},onClick:this.setFocusClick,ref:this.setReferenceEl,role:"combobox"},this.renderIconStart(),!o&&this.renderChips(),h("label",{class:"screen-readers-only",htmlFor:t+"-input",id:a},n),this.renderInput(),this.renderIconEnd()),h("ul",{"aria-labelledby":a,"aria-multiselectable":"true",class:"screen-readers-only",id:t,role:"listbox",tabIndex:-1},this.renderListBoxOptions()),this.renderPopperContainer())};Object.defineProperty(e.prototype,"el",{get:function(){return getElement(this)},enumerable:false,configurable:true});Object.defineProperty(e,"watchers",{get:function(){return{active:["activeHandler"],maxItems:["maxItemsHandler"],text:["textHandler"]}},enumerable:false,configurable:true});return e}();CalciteCombobox.style=calciteComboboxCss;var CSS$1={icon:"icon",iconActive:"icon--active",custom:"icon--custom",dot:"icon--dot",single:"label--single",label:"label",active:"label--active",selected:"label--selected",title:"title",textContainer:"text-container"};var calciteComboboxItemCss='@charset "UTF-8";@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}.scale--s{font-size:var(--calcite-font-size--2);line-height:1rem;--calcite-combobox-item-spacing-unit-l:0.5rem;--calcite-combobox-item-spacing-unit-s:0.25rem;--calcite-combobox-item-spacing-indent:0.5rem}.scale--m{font-size:var(--calcite-font-size--1);line-height:1rem;--calcite-combobox-item-spacing-unit-l:0.75rem;--calcite-combobox-item-spacing-unit-s:0.5rem;--calcite-combobox-item-spacing-indent:0.75rem}.scale--l{font-size:var(--calcite-font-size-0);line-height:1.25rem;--calcite-combobox-item-spacing-unit-l:1rem;--calcite-combobox-item-spacing-unit-s:0.75rem;--calcite-combobox-item-spacing-indent:1rem}.container{--calcite-combobox-item-indent-value:calc(\n    var(--calcite-combobox-item-spacing-indent) * var(--calcite-combobox-item-spacing-indent-multiplier)\n  );--calcite-combobox-item-indent-start:var(--calcite-combobox-item-indent-value);--calcite-combobox-item-indent-end:unset}.calcite--rtl{--calcite-combobox-item-indent-start:unset;--calcite-combobox-item-indent-end:var(--calcite-combobox-item-indent-value)}:host(:focus){-webkit-box-shadow:none;box-shadow:none}:host,ul{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;margin:0;padding:0;outline:2px solid transparent;outline-offset:2px}.label{display:-ms-flexbox;display:flex;-webkit-box-sizing:border-box;box-sizing:border-box;width:100%;min-width:100%;-ms-flex-align:center;align-items:center;color:var(--calcite-ui-text-3);cursor:pointer;position:relative;-webkit-transition-duration:150ms;transition-duration:150ms;-webkit-transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;text-decoration:none;padding:var(--calcite-combobox-item-spacing-unit-l)}:host([disabled]) .label{cursor:default}.label--selected{color:var(--calcite-ui-text-1);font-weight:var(--calcite-font-weight-medium)}.label--active{outline:2px solid var(--calcite-ui-brand);outline-offset:-2px}.label:hover,.label:active{color:var(--calcite-ui-text-1);background-color:var(--calcite-ui-foreground-2);-webkit-box-shadow:none;box-shadow:none;text-decoration:none}.title{padding:0 var(--calcite-combobox-item-spacing-unit-l)}.icon{display:-ms-inline-flexbox;display:inline-flex;opacity:0;-webkit-transition-duration:150ms;transition-duration:150ms;-webkit-transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);color:var(--calcite-ui-border-1)}.icon--indent{padding-left:var(--calcite-combobox-item-indent-start);padding-right:var(--calcite-combobox-item-indent-end)}.icon--custom{margin-top:-1px;color:var(--calcite-ui-text-3)}.icon--active{color:var(--calcite-ui-text-1)}.icon--dot{display:-ms-flexbox;display:flex;-ms-flex-pack:end;justify-content:flex-end;width:var(--calcite-combobox-item-spacing-unit-l)}.icon--dot:before{content:"•"}.calcite--rtl .icon--dot:before{text-align:right}.label--active .icon{opacity:1}.label--selected .icon{opacity:1;color:var(--calcite-ui-brand)}:host(:hover[disabled]) .icon{opacity:1}';var CalciteComboboxItem=function(){function e(e){var t=this;registerInstance(this,e);this.calciteComboboxItemChange=createEvent(this,"calciteComboboxItemChange",7);this.disabled=false;this.selected=false;this.active=false;this.guid=guid();this.scale="m";this.itemClickHandler=function(e){e.preventDefault();if(t.disabled){return}t.selected=!t.selected}}e.prototype.selectedWatchHandler=function(){this.calciteComboboxItemChange.emit(this.el)};e.prototype.connectedCallback=function(){this.ancestors=getAncestors(this.el);this.scale=getElementProp(this.el,"scale",this.scale)};e.prototype.componentWillLoad=function(){this.hasDefaultSlot=this.el.querySelector(":not([slot])")!==null};e.prototype.toggleSelected=function(e){return __awaiter(this,void 0,void 0,(function(){return __generator(this,(function(t){if(this.disabled){return[2]}this.selected=typeof e==="boolean"?e:!this.selected;return[2]}))}))};e.prototype.renderIcon=function(e){var t,i;var n=this,o=n.icon,a=n.disabled,r=n.selected;var s=CSS$1.icon+"--indent";var c=e?"dot":"check";var l=a?"circle-disallowed":c;var m=e&&!o&&!a;return m?h("span",{class:(t={},t[CSS$1.icon]=true,t[CSS$1.dot]=true,t[s]=true,t)}):h("calcite-icon",{class:(i={},i[CSS$1.icon]=!o,i[CSS$1.custom]=!!o,i[CSS$1.iconActive]=o&&r,i[s]=true,i),icon:o||l,scale:"s"})};e.prototype.renderChildren=function(){if(!this.hasDefaultSlot){return null}return h("ul",null,h("slot",null))};e.prototype.render=function(){var e;var t=getElementProp(this.el,"selection-mode","multi")==="single";var i=getElementDir(this.el);var n=(e={},e[CSS_UTILITY.rtl]=i==="rtl",e[CSS$1.label]=true,e[CSS$1.selected]=this.selected,e[CSS$1.active]=this.active,e[CSS$1.single]=t,e);var o=getDepth(this.el);return h(Host,{"aria-hidden":"true"},h("div",{class:"container scale--"+this.scale,style:{"--calcite-combobox-item-spacing-indent-multiplier":""+o}},h("li",{class:n,id:this.guid,onClick:this.itemClickHandler},this.renderIcon(t),h("span",{class:CSS$1.title},this.textLabel)),this.renderChildren()))};Object.defineProperty(e.prototype,"el",{get:function(){return getElement(this)},enumerable:false,configurable:true});Object.defineProperty(e,"watchers",{get:function(){return{selected:["selectedWatchHandler"]}},enumerable:false,configurable:true});return e}();CalciteComboboxItem.style=calciteComboboxItemCss;var CSS={list:"list",label:"label",title:"title"};var calciteComboboxItemGroupCss="@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{--calcite-combobox-item-indent-start-1:var(--calcite-combobox-item-spacing-indent-1);--calcite-combobox-item-indent-end-1:unset;--calcite-combobox-item-indent-start-2:var(--calcite-combobox-item-spacing-indent-2);--calcite-combobox-item-indent-end-2:unset}.scale--s{font-size:var(--calcite-font-size--2);line-height:1rem;--calcite-combobox-item-spacing-unit-l:0.5rem;--calcite-combobox-item-spacing-unit-s:0.25rem;--calcite-combobox-item-spacing-indent-1:0.5rem;--calcite-combobox-item-spacing-indent-2:1rem}.scale--m{font-size:var(--calcite-font-size--1);line-height:1rem;--calcite-combobox-item-spacing-unit-l:0.75rem;--calcite-combobox-item-spacing-unit-s:0.5rem;--calcite-combobox-item-spacing-indent-1:0.75rem;--calcite-combobox-item-spacing-indent-2:1.5rem}.scale--l{font-size:var(--calcite-font-size-0);line-height:1.25rem;--calcite-combobox-item-spacing-unit-l:1rem;--calcite-combobox-item-spacing-unit-s:0.75rem;--calcite-combobox-item-spacing-indent-1:1rem;--calcite-combobox-item-spacing-indent-2:2rem}.calcite--rtl{--calcite-combobox-item-indent-start-1:unset;--calcite-combobox-item-indent-end-1:var(--calcite-combobox-item-spacing-indent-1);--calcite-combobox-item-indent-start-2:unset;--calcite-combobox-item-indent-end-2:var(--calcite-combobox-item-spacing-indent-2)}:host,.list{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;margin:0;padding:0;outline:2px solid transparent;outline-offset:2px}.label{-webkit-box-sizing:border-box;box-sizing:border-box;width:100%;max-width:100%;min-width:0;color:var(--calcite-ui-text-3);display:-ms-flexbox;display:flex}.label--indent-1{padding-left:var(--calcite-combobox-item-indent-start-1);padding-right:var(--calcite-combobox-item-indent-end-1)}.label--indent-2{padding-left:var(--calcite-combobox-item-indent-start-2);padding-right:var(--calcite-combobox-item-indent-end-2)}.title{border:0 solid;display:block;-ms-flex:1 1 0%;flex:1 1 0%;border-bottom-color:var(--calcite-ui-border-3);border-bottom-width:1px;color:var(--calcite-ui-text-2);font-weight:var(--calcite-font-weight-bold);word-wrap:break-word;word-break:break-word;padding:var(--calcite-combobox-item-spacing-unit-l) 0;margin-left:var(--calcite-combobox-item-spacing-unit-s);margin-right:var(--calcite-combobox-item-spacing-unit-s)}";var CalciteComboboxItemGroup=function(){function e(e){registerInstance(this,e);this.guid=guid();this.scale="m"}e.prototype.connectedCallback=function(){this.ancestors=getAncestors(this.el);this.scale=getElementProp(this.el,"scale",this.scale)};e.prototype.render=function(){var e,t;var i=this,n=i.el,o=i.scale;var a=getElementDir(n);var r=CSS.label+"--indent-"+getDepth(n);return h("ul",{"aria-labelledby":this.guid,class:(e={},e[CSS.list]=true,e[CSS_UTILITY.rtl]=a==="rtl",e["scale--"+o]=true,e),role:"group"},h("li",{class:(t={},t[CSS.label]=true,t[r]=true,t),id:this.guid,role:"presentation"},h("span",{class:CSS.title},this.label)),h("slot",null))};Object.defineProperty(e.prototype,"el",{get:function(){return getElement(this)},enumerable:false,configurable:true});return e}();CalciteComboboxItemGroup.style=calciteComboboxItemGroupCss;export{CalciteCombobox as calcite_combobox,CalciteComboboxItem as calcite_combobox_item,CalciteComboboxItemGroup as calcite_combobox_item_group};