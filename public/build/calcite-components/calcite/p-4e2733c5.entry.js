import{r as t,c as i,h as e,H as a,g as n}from"./p-6b8b45ed.js";import{a as s,S as o,d as c}from"./p-58421494.js";import{i as r,f as l}from"./p-caf80cd7.js";import{n as m,g as h,d as p,C as b}from"./p-f1686cee.js";import{g as d}from"./p-cebd4de5.js";import{u,c as f,C as x}from"./p-df97b40a.js";import{g}from"./p-a4e6e35b.js";var w=o?o.prototype:void 0,v=w?w.toString:void 0;function y(t){if("string"==typeof t)return t;if(r(t))return function(t,i){for(var e=-1,a=null==t?0:t.length,n=Array(a);++e<a;)n[e]=i(t[e],e,t);return n}(t,y)+"";if(s(t))return v?v.call(t):"";var i=t+"";return"0"==i&&1/t==-1/0?"-0":i}var k=/[\\^$.*+?()[\]{}|]/g,D=RegExp(k.source);const C="CALCITE-COMBOBOX-ITEM, CALCITE-COMBOBOX-ITEM-GROUP";function I(t){var i,e;const a=null===(i=t.parentElement)||void 0===i?void 0:i.closest(C);return[a,null===(e=null==a?void 0:a.parentElement)||void 0===e?void 0:e.closest(C)].filter((t=>t))}function z(t){var i;return(null===(i=t.ancestors)||void 0===i?void 0:i.filter((t=>"CALCITE-COMBOBOX-ITEM"===t.nodeName)))||[]}function _(t){return m(t.querySelectorAll("calcite-combobox-item")).filter((t=>t.selected)).length>0}function O(t){return document.evaluate("ancestor::calcite-combobox-item | ancestor::calcite-combobox-item-group",t,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotLength}const E=class{constructor(e){t(this,e),this.calciteLookupChange=i(this,"calciteLookupChange",7),this.calciteComboboxChange=i(this,"calciteComboboxChange",7),this.calciteComboboxFilterChange=i(this,"calciteComboboxFilterChange",7),this.calciteComboboxChipDismiss=i(this,"calciteComboboxChipDismiss",7),this.calciteComboboxOpen=i(this,"calciteComboboxOpen",7),this.calciteComboboxClose=i(this,"calciteComboboxClose",7),this.active=!1,this.disabled=!1,this.maxItems=0,this.overlayPositioning="absolute",this.selectionMode="multi",this.scale="m",this.items=[],this.groupItems=[],this.selectedItems=[],this.visibleItems=[],this.hideList=!this.active,this.activeItemIndex=-1,this.activeChipIndex=-1,this.activeDescendant="",this.text="",this.open=this.active,this.maxScrollerHeight=0,this.textInput=null,this.observer=null,this.guid=g(),this.inputHeight=0,this.ignoreSelectedEventsFlag=!1,this.activeTransitionProp="opacity",this.keydownHandler=t=>{switch(d(t.key,h(this.el))){case"Tab":this.activeChipIndex=-1,this.activeItemIndex=-1,this.allowCustomValues&&this.text?(this.addCustomChip(this.text,!0),t.preventDefault()):this.active=!1;break;case"ArrowLeft":this.previousChip();break;case"ArrowRight":this.nextChip();break;case"ArrowUp":t.preventDefault(),this.active=!0,this.shiftActiveItemIndex(-1);break;case"ArrowDown":t.preventDefault(),this.active=!0,this.shiftActiveItemIndex(1);break;case"Home":this.active=!0,this.updateActiveItemIndex(0);break;case"End":this.active=!0,this.updateActiveItemIndex(this.visibleItems.length-1);break;case"Escape":this.active=!1;break;case"Enter":this.activeItemIndex>-1?this.toggleSelection(this.visibleItems[this.activeItemIndex]):this.activeChipIndex>-1?this.removeActiveChip():this.allowCustomValues&&this.text&&this.addCustomChip(this.text,!0);break;case"Delete":case"Backspace":this.activeChipIndex>-1?this.removeActiveChip():!this.text&&this.isMulti()&&this.removeLastChip();break;default:this.active||this.setFocus()}},this.toggleCloseEnd=()=>{this.hideList=!0,this.el.removeEventListener("calciteComboboxClose",this.toggleCloseEnd)},this.toggleOpenEnd=()=>{this.hideList=!1,this.el.removeEventListener("calciteComboboxOpen",this.toggleOpenEnd)},this.transitionEnd=t=>{t.propertyName===this.activeTransitionProp&&(this.active?this.calciteComboboxOpen.emit():this.calciteComboboxClose.emit())},this.setMaxScrollerHeight=()=>{this.active&&(this.maxScrollerHeight=this.getMaxScrollerHeight(this.getCombinedItems()))},this.calciteChipDismissHandler=(t,i)=>{this.active=!1;const e=this.items.find((t=>t===i));e&&this.toggleSelection(e,!1),this.calciteComboboxChipDismiss.emit(t.detail)},this.setFocusClick=()=>{this.setFocus()},this.setInactiveIfNotContained=t=>{const i=t.composedPath();!this.active||i.includes(this.el)||i.includes(this.referenceEl)||(this.allowCustomValues&&this.text&&this.addCustomChip(this.text),"single"===this.selectionMode&&(this.textInput&&(this.textInput.value=""),this.text="",this.filterItems(""),this.updateActiveItemIndex(-1)),this.active=!1)},this.setMenuEl=t=>{this.menuEl=t},this.setListContainerEl=t=>{this.listContainerEl=t},this.setReferenceEl=t=>{this.referenceEl=t},this.inputHandler=t=>{const i=t.target.value;this.text=i,this.filterItems(i),i&&(this.activeChipIndex=-1)},this.filterItems=(()=>{const t=(t,i)=>t&&i.some((({label:i,value:e})=>"CALCITE-COMBOBOX-ITEM-GROUP"===t.tagName?e===t.label||e===t.label:e===t.textLabel||e===t.value||i===t.textLabel||i===t.value));return c((i=>{const e=((t,i)=>{const e=function(t){var i;return(t=null==(i=t)?"":y(i))&&D.test(t)?t.replace(k,"\\$&"):t}(i),a=new RegExp(e,"ig");0===t.length&&console.warn("No data was passed to the filter function.\n    The data argument should be an array of objects");const n=(t,i)=>{var e;if(null===(e=t)||void 0===e?void 0:e.constant)return!0;let a=!1;return l(t,(t=>{"function"!=typeof t&&(Array.isArray(t)||"object"==typeof t&&null!==t?n(t,i)&&(a=!0):i.test(t)&&(a=!0))})),a};return t.filter((t=>n(t,a)))})(this.data,i);this.getCombinedItems().forEach((i=>{const a=!t(i,e);i.hidden=a;const[n,s]=i.ancestors;(t(n,e)||t(s,e))&&(i.hidden=!1),a||i.ancestors.forEach((t=>t.hidden=!1))})),this.visibleItems=this.getVisibleItems(),this.calciteComboboxFilterChange.emit({visibleItems:[...this.visibleItems],text:i})}),100)})(),this.internalCalciteLookupChangeEvent=()=>{this.calciteLookupChange.emit(this.selectedItems)},this.emitCalciteLookupChange=c(this.internalCalciteLookupChangeEvent,0),this.internalComboboxChangeEvent=()=>{const{selectedItems:t}=this;this.calciteComboboxChange.emit({selectedItems:t})},this.emitComboboxChange=c(this.internalComboboxChangeEvent,0),this.updateItems=()=>{this.items=this.getItems(),this.groupItems=this.getGroupItems(),this.data=this.getData(),this.selectedItems=this.getSelectedItems(),this.visibleItems=this.getVisibleItems(),this.needsIcon=this.getNeedsIcon(),this.allowCustomValues||this.setMaxScrollerHeight()},this.comboboxFocusHandler=()=>{this.active=!0,this.textInput.focus()},this.comboboxBlurHandler=t=>{this.setInactiveIfNotContained(t)}}activeHandler(t,i){i&&!t?(this.el.addEventListener("calciteComboboxClose",this.toggleCloseEnd),this.open=!1):!i&&t&&(this.el.addEventListener("calciteComboboxOpen",this.toggleOpenEnd),requestAnimationFrame((()=>{this.reposition(),this.setMaxScrollerHeight(),this.open=!0}))),this.reposition(),this.setMaxScrollerHeight()}maxItemsHandler(){this.setMaxScrollerHeight()}documentClickHandler(t){this.setInactiveIfNotContained(t)}calciteComboboxItemChangeHandler(t){if(this.ignoreSelectedEventsFlag)return;const i=t.target;this.toggleSelection(i,i.selected)}async reposition(){const{popper:t,menuEl:i}=this,e=this.getModifiers();t?u({el:i,modifiers:e,placement:"bottom-leading",popper:t}):this.createPopper()}async setFocus(){var t;this.active=!0,null===(t=this.textInput)||void 0===t||t.focus(),this.activeChipIndex=-1,this.activeItemIndex=-1}connectedCallback(){this.observer=new MutationObserver(this.updateItems),this.createPopper()}componentWillLoad(){this.updateItems()}componentDidLoad(){var t;null===(t=this.observer)||void 0===t||t.observe(this.el,{childList:!0,subtree:!0})}componentDidRender(){this.el.offsetHeight!==this.inputHeight&&(this.reposition(),this.inputHeight=this.el.offsetHeight)}disconnectedCallback(){var t;null===(t=this.observer)||void 0===t||t.disconnect(),this.destroyPopper()}textHandler(){this.updateActiveItemIndex(-1)}getModifiers(){return[{name:"flip",enabled:!0,options:{fallbackPlacements:["top-start","top","top-end","bottom-start","bottom","bottom-end"]}}]}createPopper(){this.destroyPopper();const{menuEl:t,referenceEl:i,overlayPositioning:e}=this,a=this.getModifiers();this.popper=f({el:t,modifiers:a,overlayPositioning:e,placement:"bottom-leading",referenceEl:i})}destroyPopper(){const{popper:t}=this;t&&t.destroy(),this.popper=null}getMaxScrollerHeight(t){const{maxItems:i}=this;let e=0,a=0;return t.forEach((t=>{if(e<i&&i>0){const i=this.calculateSingleItemHeight(t);i>0&&(a+=i,e++)}})),a}calculateSingleItemHeight(t){let i=t.offsetHeight;return t.querySelectorAll(C).forEach((t=>{i-=t.offsetHeight})),i}getCombinedItems(){return[...this.groupItems,...this.items]}toggleSelection(t,i=!t.selected){t&&(this.isMulti()?(t.selected=i,this.updateAncestors(t),this.selectedItems=this.getSelectedItems(),this.emitCalciteLookupChange(),this.emitComboboxChange(),this.resetText(),this.textInput.focus(),this.filterItems("")):(this.ignoreSelectedEventsFlag=!0,this.items.forEach((i=>i.selected=i===t)),this.ignoreSelectedEventsFlag=!1,this.selectedItems=this.getSelectedItems(),this.emitComboboxChange(),this.textInput.value=t.textLabel,this.active=!1,this.updateActiveItemIndex(-1),this.resetText(),this.filterItems("")))}updateAncestors(t){if("ancestors"!==this.selectionMode)return;const i=z(t),e=function(t){return m(t.querySelectorAll("calcite-combobox-item"))}(t);t.selected?i.forEach((t=>{t.selected=!0})):(e.forEach((t=>t.selected=!1)),[...i].forEach((t=>{_(t)||(t.selected=!1)})))}getVisibleItems(){return this.items.filter((t=>!t.hidden))}getSelectedItems(){return this.isMulti()?this.items.filter((t=>t.selected&&("ancestors"!==this.selectionMode||!_(t)))).sort(((t,i)=>{const e=this.selectedItems.indexOf(t),a=this.selectedItems.indexOf(i);return e>-1&&a>-1?e-a:a-e})):[this.items.find((t=>t.selected))]}getData(){return this.items.map((t=>({constant:t.constant,value:t.value,label:t.textLabel,guid:t.guid})))}getNeedsIcon(){return"single"===this.selectionMode&&this.items.some((t=>t.icon))}resetText(){this.textInput.value="",this.text=""}getItems(){return Array.from(this.el.querySelectorAll("CALCITE-COMBOBOX-ITEM")).filter((t=>!t.disabled))}getGroupItems(){return Array.from(this.el.querySelectorAll("CALCITE-COMBOBOX-ITEM-GROUP"))}addCustomChip(t,i){const e=this.items.find((i=>i.textLabel===t));if(e)this.toggleSelection(e,!0);else{const e=document.createElement("CALCITE-COMBOBOX-ITEM");e.value=t,e.textLabel=t,e.guid=g(),e.selected=!0,this.el.appendChild(e),this.resetText(),i&&this.setFocus(),this.updateItems(),this.filterItems(""),this.emitCalciteLookupChange(),this.emitComboboxChange()}}removeActiveChip(){this.toggleSelection(this.selectedItems[this.activeChipIndex],!1),this.setFocus()}removeLastChip(){this.toggleSelection(this.selectedItems[this.selectedItems.length-1],!1),this.setFocus()}previousChip(){if(this.text)return;const t=this.activeChipIndex;this.activeChipIndex=-1===t?this.selectedItems.length-1:Math.max(t-1,0),this.updateActiveItemIndex(-1),this.focusChip()}nextChip(){if(this.text||-1===this.activeChipIndex)return;const t=this.activeChipIndex+1;t>this.selectedItems.length-1?(this.activeChipIndex=-1,this.setFocus()):(this.activeChipIndex=t,this.focusChip()),this.updateActiveItemIndex(-1)}focusChip(){var t;const i=null===(t=this.selectedItems[this.activeChipIndex])||void 0===t?void 0:t.guid,e=this.referenceEl.querySelector(`#chip-${i}`);null==e||e.setFocus()}shiftActiveItemIndex(t){const i=this.visibleItems.length;this.updateActiveItemIndex((this.activeItemIndex+i+t)%i);const e=this.visibleItems[this.activeItemIndex],a=this.calculateSingleItemHeight(e),{offsetHeight:n,scrollTop:s}=this.listContainerEl;n+s<e.offsetTop+a?this.listContainerEl.scrollTop=e.offsetTop-n+a:e.offsetTop<s&&(this.listContainerEl.scrollTop=e.offsetTop)}updateActiveItemIndex(t){this.activeItemIndex=t;let i=null;this.visibleItems.forEach(((e,a)=>{a===t?(e.active=!0,i=e.guid):e.active=!1})),this.activeDescendant=i,this.activeItemIndex>-1&&(this.activeChipIndex=-1,this.textInput.focus())}isMulti(){return"single"!==this.selectionMode}renderChips(){const{activeChipIndex:t,scale:i,selectionMode:a,el:n}=this,s=h(n);return this.selectedItems.map(((n,o)=>{const c={chip:!0,"chip--active":t===o,"chip--rtl":"rtl"===s},r=[...[...z(n)].reverse(),n].map((t=>t.textLabel)),l="ancestors"!==a?n.textLabel:r.join(" / ");return e("calcite-chip",{"aria-label":l,class:c,dismissLabel:"remove tag",dismissible:!0,icon:n.icon,id:`chip-${n.guid}`,key:n.textLabel,onCalciteChipDismiss:t=>this.calciteChipDismissHandler(t,n),scale:i,title:l,value:n.value},l)}))}renderInput(){const{active:t,disabled:i,placeholder:a,selectionMode:n,needsIcon:s,label:o,selectedItems:c}=this,r="single"===n,l=c[0],m=!t&&r&&!!l;return e("span",{class:{"input-wrap":!0,"input-wrap--single":r}},m&&e("span",{class:{label:!0,"label--spaced":s},key:"label",onFocus:this.comboboxFocusHandler,tabindex:"0"},l.textLabel),e("input",{"aria-activedescendant":this.activeDescendant,"aria-autocomplete":"list","aria-controls":g,"aria-label":o,class:{input:!0,"input--transparent":this.activeChipIndex>-1,"input--single":r,"input--hidden":m,"input--icon":r&&s},disabled:i,id:`${g}-input`,key:"input",onBlur:this.comboboxBlurHandler,onFocus:this.comboboxFocusHandler,onInput:this.inputHandler,placeholder:a,ref:t=>this.textInput=t,type:"text"}))}renderListBoxOptions(){return this.visibleItems.map((t=>e("li",{"aria-selected":(!!t.selected).toString(),id:t.guid,role:"option",tabindex:"-1"},t.textLabel)))}renderPopperContainer(){const{active:t,maxScrollerHeight:i,setMenuEl:a,setListContainerEl:n,hideList:s,open:o}=this;return e("div",{"aria-hidden":"true",class:{"popper-container":!0,"popper-container--active":o},ref:a},e("div",{class:{"list-container":!0,[x.animation]:!0,[x.animationActive]:t},onTransitionEnd:this.transitionEnd,ref:n,style:{maxHeight:i>0?`${i}px`:""}},e("ul",{class:{list:!0,"list--hide":s}},e("slot",null))))}renderIconStart(){const{selectionMode:t,needsIcon:i,selectedItems:a}=this,n=a[0];return"single"===t&&i&&e("span",{class:"icon-start"},(null==n?void 0:n.icon)&&e("calcite-icon",{class:"selected-icon",icon:n.icon,scale:"s"}))}renderIconEnd(){return"single"===this.selectionMode&&e("span",{class:"icon-end"},e("calcite-icon",{icon:"chevron-down",scale:"s"}))}render(){const{guid:t,open:i,label:n}=this,s="single"===this.selectionMode,o=`${t}-label`;return e(a,{onKeyDown:this.keydownHandler},e("div",{"aria-autocomplete":"list","aria-expanded":i.toString(),"aria-haspopup":"listbox","aria-labelledby":o,"aria-owns":t,class:{wrapper:!0,"wrapper--active":i,"wrapper--single":s},onClick:this.setFocusClick,ref:this.setReferenceEl,role:"combobox"},this.renderIconStart(),!s&&this.renderChips(),e("label",{class:"screen-readers-only",htmlFor:`${t}-input`,id:o},n),this.renderInput(),this.renderIconEnd()),e("ul",{"aria-labelledby":o,"aria-multiselectable":"true",class:"screen-readers-only",id:t,role:"listbox",tabIndex:-1},this.renderListBoxOptions()),this.renderPopperContainer())}get el(){return n(this)}static get watchers(){return{active:["activeHandler"],maxItems:["maxItemsHandler"],text:["textHandler"]}}};E.style="@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:block;position:relative}:host([disabled]){pointer-events:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;opacity:0.5}:host([scale=s]){font-size:var(--calcite-font-size--2);--calcite-combobox-item-spacing-unit-l:0.5rem;--calcite-combobox-item-spacing-unit-s:0.25rem;--calcite-combobox-input-height:1.5rem}:host([scale=m]){font-size:var(--calcite-font-size--1);--calcite-combobox-item-spacing-unit-l:0.75rem;--calcite-combobox-item-spacing-unit-s:0.5rem;--calcite-combobox-input-height:2rem}:host([scale=l]){font-size:var(--calcite-font-size-0);--calcite-combobox-item-spacing-unit-l:1rem;--calcite-combobox-item-spacing-unit-s:0.75rem;--calcite-combobox-input-height:2.75rem}.wrapper{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-1);outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;-webkit-box-shadow:inset 0 0 0 1px var(--calcite-ui-border-input);box-shadow:inset 0 0 0 1px var(--calcite-ui-border-input);padding:var(--calcite-combobox-item-spacing-unit-s) var(--calcite-combobox-item-spacing-unit-l) 0 var(--calcite-combobox-item-spacing-unit-l)}.wrapper--active{outline:2px solid var(--calcite-ui-brand);outline-offset:-2px}.wrapper--single{padding:0 var(--calcite-combobox-item-spacing-unit-l);cursor:pointer;-ms-flex-wrap:nowrap;flex-wrap:nowrap}.input{-ms-flex-positive:1;flex-grow:1;font-family:inherit;padding:0;background-color:transparent;border-style:none;color:var(--calcite-ui-text-1);-webkit-appearance:none;-moz-appearance:none;appearance:none;font-size:inherit;height:var(--calcite-combobox-input-height);line-height:var(--calcite-combobox-input-height);min-width:120px;margin-bottom:var(--calcite-combobox-item-spacing-unit-s)}.input:focus{outline:2px solid transparent;outline-offset:2px}.input--transparent{opacity:0}.input--single{margin-bottom:0;margin-top:0;padding:0}.wrapper--active .input-single{cursor:text}.input--hidden{width:0;min-width:0;opacity:0;pointer-events:none}.input--icon{padding:0 var(--calcite-combobox-item-spacing-unit-l)}.input-wrap{display:-ms-flexbox;display:flex}.input-wrap--single{-ms-flex:1 1 auto;flex:1 1 auto;overflow:hidden}.label{padding:0;display:block;-ms-flex:1 1 auto;flex:1 1 auto;pointer-events:none;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:100%;height:var(--calcite-combobox-input-height);line-height:var(--calcite-combobox-input-height)}.label--spaced{padding-top:0;padding-bottom:0;padding-left:var(--calcite-combobox-item-spacing-unit-l);padding-right:var(--calcite-combobox-item-spacing-unit-l)}.icon-end,.icon-start{cursor:pointer;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;width:1rem}.popper-container{width:100%;display:block;position:absolute;z-index:900;-webkit-transform:scale(0);transform:scale(0);visibility:hidden;pointer-events:none}.popper-container .calcite-popper-anim{position:relative;z-index:1;-webkit-transition:var(--calcite-popper-transition);transition:var(--calcite-popper-transition);visibility:hidden;-webkit-transition-property:visibility, opacity, -webkit-transform;transition-property:visibility, opacity, -webkit-transform;transition-property:transform, visibility, opacity;transition-property:transform, visibility, opacity, -webkit-transform;opacity:0;-webkit-box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);border-radius:0.25rem}.popper-container[data-popper-placement^=bottom] .calcite-popper-anim{-webkit-transform:translateY(-5px);transform:translateY(-5px)}.popper-container[data-popper-placement^=top] .calcite-popper-anim{-webkit-transform:translateY(5px);transform:translateY(5px)}.popper-container[data-popper-placement^=left] .calcite-popper-anim{-webkit-transform:translateX(5px);transform:translateX(5px)}.popper-container[data-popper-placement^=right] .calcite-popper-anim{-webkit-transform:translateX(-5px);transform:translateX(-5px)}.popper-container[data-popper-placement] .calcite-popper-anim--active{opacity:1;visibility:visible;-webkit-transform:translate(0);transform:translate(0)}.popper-container--active{pointer-events:initial;visibility:visible}.screen-readers-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border-width:0}.list-container{overflow-y:auto;max-height:100vh;background-color:var(--calcite-ui-foreground-1);width:var(--calcite-dropdown-width)}.list{display:block;margin:0;padding:0}.list--hide{height:0;overflow:hidden}.chip{margin-right:var(--calcite-combobox-item-spacing-unit-s);margin-bottom:var(--calcite-combobox-item-spacing-unit-s);max-width:100%}.chip--active{background-color:var(--calcite-ui-foreground-3)}.chip:last-child{margin-right:0}.chip--rtl{margin-right:unset;margin-left:var(--calcite-combobox-item-spacing-unit-l)}.chip--rtl:last-child{margin-left:0}.item{display:block}";const M=class{constructor(e){t(this,e),this.calciteComboboxItemChange=i(this,"calciteComboboxItemChange",7),this.disabled=!1,this.selected=!1,this.active=!1,this.guid=g(),this.scale="m",this.itemClickHandler=t=>{t.preventDefault(),this.disabled||(this.selected=!this.selected)}}selectedWatchHandler(){this.calciteComboboxItemChange.emit(this.el)}connectedCallback(){this.ancestors=I(this.el),this.scale=p(this.el,"scale",this.scale)}componentWillLoad(){this.hasDefaultSlot=null!==this.el.querySelector(":not([slot])")}async toggleSelected(t){this.disabled||(this.selected="boolean"==typeof t?t:!this.selected)}renderIcon(t){const{icon:i,disabled:a,selected:n}=this,s="icon--indent";return!t||i||a?e("calcite-icon",{class:{icon:!i,"icon--custom":!!i,"icon--active":i&&n,[s]:!0},icon:i||(a?"circle-disallowed":t?"dot":"check"),scale:"s"}):e("span",{class:{icon:!0,"icon--dot":!0,[s]:!0}})}renderChildren(){return this.hasDefaultSlot?e("ul",null,e("slot",null)):null}render(){const t="single"===p(this.el,"selection-mode","multi"),i=h(this.el),n={[b.rtl]:"rtl"===i,label:!0,"label--selected":this.selected,"label--active":this.active,"label--single":t},s=O(this.el);return e(a,{"aria-hidden":"true"},e("div",{class:`container scale--${this.scale}`,style:{"--calcite-combobox-item-spacing-indent-multiplier":`${s}`}},e("li",{class:n,id:this.guid,onClick:this.itemClickHandler},this.renderIcon(t),e("span",{class:"title"},this.textLabel)),this.renderChildren()))}get el(){return n(this)}static get watchers(){return{selected:["selectedWatchHandler"]}}};M.style='@charset "UTF-8";@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}.scale--s{font-size:var(--calcite-font-size--2);line-height:1rem;--calcite-combobox-item-spacing-unit-l:0.5rem;--calcite-combobox-item-spacing-unit-s:0.25rem;--calcite-combobox-item-spacing-indent:0.5rem}.scale--m{font-size:var(--calcite-font-size--1);line-height:1rem;--calcite-combobox-item-spacing-unit-l:0.75rem;--calcite-combobox-item-spacing-unit-s:0.5rem;--calcite-combobox-item-spacing-indent:0.75rem}.scale--l{font-size:var(--calcite-font-size-0);line-height:1.25rem;--calcite-combobox-item-spacing-unit-l:1rem;--calcite-combobox-item-spacing-unit-s:0.75rem;--calcite-combobox-item-spacing-indent:1rem}.container{--calcite-combobox-item-indent-value:calc(\n    var(--calcite-combobox-item-spacing-indent) * var(--calcite-combobox-item-spacing-indent-multiplier)\n  );--calcite-combobox-item-indent-start:var(--calcite-combobox-item-indent-value);--calcite-combobox-item-indent-end:unset}.calcite--rtl{--calcite-combobox-item-indent-start:unset;--calcite-combobox-item-indent-end:var(--calcite-combobox-item-indent-value)}:host(:focus){-webkit-box-shadow:none;box-shadow:none}:host,ul{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;margin:0;padding:0;outline:2px solid transparent;outline-offset:2px}.label{display:-ms-flexbox;display:flex;-webkit-box-sizing:border-box;box-sizing:border-box;width:100%;min-width:100%;-ms-flex-align:center;align-items:center;color:var(--calcite-ui-text-3);cursor:pointer;position:relative;-webkit-transition-duration:150ms;transition-duration:150ms;-webkit-transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;text-decoration:none;padding:var(--calcite-combobox-item-spacing-unit-l)}:host([disabled]) .label{cursor:default}.label--selected{color:var(--calcite-ui-text-1);font-weight:var(--calcite-font-weight-medium)}.label--active{outline:2px solid var(--calcite-ui-brand);outline-offset:-2px}.label:hover,.label:active{color:var(--calcite-ui-text-1);background-color:var(--calcite-ui-foreground-2);-webkit-box-shadow:none;box-shadow:none;text-decoration:none}.title{padding:0 var(--calcite-combobox-item-spacing-unit-l)}.icon{display:-ms-inline-flexbox;display:inline-flex;opacity:0;-webkit-transition-duration:150ms;transition-duration:150ms;-webkit-transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);color:var(--calcite-ui-border-1)}.icon--indent{padding-left:var(--calcite-combobox-item-indent-start);padding-right:var(--calcite-combobox-item-indent-end)}.icon--custom{margin-top:-1px;color:var(--calcite-ui-text-3)}.icon--active{color:var(--calcite-ui-text-1)}.icon--dot{display:-ms-flexbox;display:flex;-ms-flex-pack:end;justify-content:flex-end;width:var(--calcite-combobox-item-spacing-unit-l)}.icon--dot:before{content:"•"}.calcite--rtl .icon--dot:before{text-align:right}.label--active .icon{opacity:1}.label--selected .icon{opacity:1;color:var(--calcite-ui-brand)}:host(:hover[disabled]) .icon{opacity:1}';const A=class{constructor(i){t(this,i),this.guid=g(),this.scale="m"}connectedCallback(){this.ancestors=I(this.el),this.scale=p(this.el,"scale",this.scale)}render(){const{el:t,scale:i}=this,a=h(t),n=`label--indent-${O(t)}`;return e("ul",{"aria-labelledby":this.guid,class:{list:!0,[b.rtl]:"rtl"===a,[`scale--${i}`]:!0},role:"group"},e("li",{class:{label:!0,[n]:!0},id:this.guid,role:"presentation"},e("span",{class:"title"},this.label)),e("slot",null))}get el(){return n(this)}};A.style="@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{--calcite-combobox-item-indent-start-1:var(--calcite-combobox-item-spacing-indent-1);--calcite-combobox-item-indent-end-1:unset;--calcite-combobox-item-indent-start-2:var(--calcite-combobox-item-spacing-indent-2);--calcite-combobox-item-indent-end-2:unset}.scale--s{font-size:var(--calcite-font-size--2);line-height:1rem;--calcite-combobox-item-spacing-unit-l:0.5rem;--calcite-combobox-item-spacing-unit-s:0.25rem;--calcite-combobox-item-spacing-indent-1:0.5rem;--calcite-combobox-item-spacing-indent-2:1rem}.scale--m{font-size:var(--calcite-font-size--1);line-height:1rem;--calcite-combobox-item-spacing-unit-l:0.75rem;--calcite-combobox-item-spacing-unit-s:0.5rem;--calcite-combobox-item-spacing-indent-1:0.75rem;--calcite-combobox-item-spacing-indent-2:1.5rem}.scale--l{font-size:var(--calcite-font-size-0);line-height:1.25rem;--calcite-combobox-item-spacing-unit-l:1rem;--calcite-combobox-item-spacing-unit-s:0.75rem;--calcite-combobox-item-spacing-indent-1:1rem;--calcite-combobox-item-spacing-indent-2:2rem}.calcite--rtl{--calcite-combobox-item-indent-start-1:unset;--calcite-combobox-item-indent-end-1:var(--calcite-combobox-item-spacing-indent-1);--calcite-combobox-item-indent-start-2:unset;--calcite-combobox-item-indent-end-2:var(--calcite-combobox-item-spacing-indent-2)}:host,.list{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;margin:0;padding:0;outline:2px solid transparent;outline-offset:2px}.label{-webkit-box-sizing:border-box;box-sizing:border-box;width:100%;max-width:100%;min-width:0;color:var(--calcite-ui-text-3);display:-ms-flexbox;display:flex}.label--indent-1{padding-left:var(--calcite-combobox-item-indent-start-1);padding-right:var(--calcite-combobox-item-indent-end-1)}.label--indent-2{padding-left:var(--calcite-combobox-item-indent-start-2);padding-right:var(--calcite-combobox-item-indent-end-2)}.title{border:0 solid;display:block;-ms-flex:1 1 0%;flex:1 1 0%;border-bottom-color:var(--calcite-ui-border-3);border-bottom-width:1px;color:var(--calcite-ui-text-2);font-weight:var(--calcite-font-weight-bold);word-wrap:break-word;word-break:break-word;padding:var(--calcite-combobox-item-spacing-unit-l) 0;margin-left:var(--calcite-combobox-item-spacing-unit-s);margin-right:var(--calcite-combobox-item-spacing-unit-s)}";export{E as calcite_combobox,M as calcite_combobox_item,A as calcite_combobox_item_group}