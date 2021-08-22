var __awaiter=this&&this.__awaiter||function(t,e,i,a){function n(t){return t instanceof i?t:new i((function(e){e(t)}))}return new(i||(i=Promise))((function(i,o){function r(t){try{l(a.next(t))}catch(t){o(t)}}function s(t){try{l(a["throw"](t))}catch(t){o(t)}}function l(t){t.done?i(t.value):n(t.value).then(r,s)}l((a=a.apply(t,e||[])).next())}))};var __generator=this&&this.__generator||function(t,e){var i={label:0,sent:function(){if(o[0]&1)throw o[1];return o[1]},trys:[],ops:[]},a,n,o,r;return r={next:s(0),throw:s(1),return:s(2)},typeof Symbol==="function"&&(r[Symbol.iterator]=function(){return this}),r;function s(t){return function(e){return l([t,e])}}function l(r){if(a)throw new TypeError("Generator is already executing.");while(i)try{if(a=1,n&&(o=r[0]&2?n["return"]:r[0]?n["throw"]||((o=n["return"])&&o.call(n),0):n.next)&&!(o=o.call(n,r[1])).done)return o;if(n=0,o)r=[r[0]&2,o.value];switch(r[0]){case 0:case 1:o=r;break;case 4:i.label++;return{value:r[1],done:false};case 5:i.label++;n=r[1];r=[0];continue;case 7:r=i.ops.pop();i.trys.pop();continue;default:if(!(o=i.trys,o=o.length>0&&o[o.length-1])&&(r[0]===6||r[0]===2)){i=0;continue}if(r[0]===3&&(!o||r[1]>o[0]&&r[1]<o[3])){i.label=r[1];break}if(r[0]===6&&i.label<o[1]){i.label=o[1];o=r;break}if(o&&i.label<o[2]){i.label=o[2];i.ops.push(r);break}if(o[2])i.ops.pop();i.trys.pop();continue}r=e.call(t,i)}catch(t){r=[6,t];n=0}finally{a=o=0}if(r[0]&5)throw r[1];return{value:r[0]?r[1]:void 0,done:true}}};import{r as registerInstance,c as createEvent,h,H as Host,g as getElement}from"./index-b3673963.js";import{h as hasLabel,g as getElementDir,d as getElementProp}from"./dom-7b4de04f.js";import{g as getKey}from"./key-ec82f942.js";import"./guid-09142681.js";var calciteRadioGroupCss="@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host([scale=s]){min-height:1.5rem}:host([scale=m]){min-height:2rem}:host([scale=l]){min-height:2.5rem}:host{display:-ms-flexbox;display:flex;background-color:var(--calcite-ui-foreground-1);width:-moz-fit-content;width:-webkit-fit-content;width:fit-content;outline:1px solid var(--calcite-ui-border-input);outline-offset:-1px}:host([layout=vertical]){-ms-flex-direction:column;flex-direction:column;-ms-flex-align:start;align-items:flex-start;-ms-flex-item-align:start;align-self:flex-start}:host([width=full]){width:100%;min-width:-moz-fit-content;min-width:-webkit-fit-content;min-width:fit-content}:host([width=full]) ::slotted(calcite-radio-group-item){-ms-flex:1 1 auto;flex:1 1 auto}:host([width=full][layout=vertical]) ::slotted(calcite-radio-group-item){-ms-flex-pack:start;justify-content:flex-start}::slotted(calcite-radio-group-item[checked]),::slotted(calcite-radio-group-item:focus){z-index:0}:host([disabled]){opacity:var(--calcite-ui-opacity-disabled);pointer-events:none}";var CalciteRadioGroup=function(){function t(t){var e=this;registerInstance(this,t);this.calciteRadioGroupChange=createEvent(this,"calciteRadioGroupChange",7);this.appearance="solid";this.layout="horizontal";this.scale="m";this.width="auto";this.hiddenInput=function(){var t=document.createElement("input");t.type="hidden";e.el.appendChild(t);return t}()}t.prototype.handleNameChange=function(t){this.hiddenInput.name=t};t.prototype.handleSelectedItemChange=function(t,e){if(t===e){return}var i=this.getItems();var a=Array.from(i).filter((function(e){return e===t})).pop();if(a){this.selectItem(a);this.calciteRadioGroupChange.emit(a.value)}else if(i[0]){i[0].tabIndex=0}};t.prototype.connectedCallback=function(){var t=this.getItems();var e=Array.from(t).filter((function(t){return t.checked})).pop();if(e){this.selectItem(e)}else if(t[0]){t[0].tabIndex=0}var i=this,a=i.hiddenInput,n=i.name;if(n){a.name=n}if(e){a.value=e.value}};t.prototype.componentDidLoad=function(){this.hasLoaded=true};t.prototype.render=function(){return h(Host,{role:"radiogroup",tabIndex:this.disabled?-1:null},h("slot",null))};t.prototype.handleLabelFocus=function(t){if(hasLabel(t.detail.labelEl,this.el)){this.setFocus()}};t.prototype.handleClick=function(t){if(t.target.localName==="calcite-radio-group-item"){this.selectItem(t.target)}};t.prototype.handleSelected=function(t){if(this.hasLoaded){t.stopPropagation();t.preventDefault();this.selectItem(t.target)}};t.prototype.handleKeyDown=function(t){var e=["ArrowLeft","ArrowUp","ArrowRight","ArrowDown"," "];var i=getKey(t.key);var a=this,n=a.el,o=a.selectedItem;if(e.indexOf(i)===-1){return}var r=i;if(getElementDir(n)==="rtl"){if(i==="ArrowRight"){r="ArrowLeft"}if(i==="ArrowLeft"){r="ArrowRight"}}var s=this.getItems();var l=-1;s.forEach((function(t,e){if(t===o){l=e}}));switch(r){case"ArrowLeft":case"ArrowUp":t.preventDefault();var c=l<1?s.item(s.length-1):s.item(l-1);this.selectItem(c);return;case"ArrowRight":case"ArrowDown":t.preventDefault();var u=l===-1?s.item(1):s.item(l+1)||s.item(0);this.selectItem(u);return;case" ":t.preventDefault();this.selectItem(t.target);return;default:return}};t.prototype.setFocus=function(){return __awaiter(this,void 0,void 0,(function(){var t;return __generator(this,(function(e){(t=this.selectedItem||this.getItems()[0])===null||t===void 0?void 0:t.focus();return[2]}))}))};t.prototype.getItems=function(){return this.el.querySelectorAll("calcite-radio-group-item")};t.prototype.selectItem=function(t){if(t===this.selectedItem){return}var e=this.getItems();var i=null;e.forEach((function(e){var a=e.value===t.value;if(a&&!e.checked||!a&&e.checked){e.checked=a}e.tabIndex=a?0:-1;if(a){i=e}}));this.selectedItem=i;this.syncWithInputProxy(i);if(i){i.focus()}};t.prototype.syncWithInputProxy=function(t){this.hiddenInput.value=t?t.value:""};Object.defineProperty(t.prototype,"el",{get:function(){return getElement(this)},enumerable:false,configurable:true});Object.defineProperty(t,"watchers",{get:function(){return{name:["handleNameChange"],selectedItem:["handleSelectedItemChange"]}},enumerable:false,configurable:true});return t}();CalciteRadioGroup.style=calciteRadioGroupCss;var calciteRadioGroupItemCss="@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:-ms-flexbox;display:flex;-ms-flex-item-align:stretch;align-self:stretch;cursor:pointer;-webkit-transition:background-color 0.1s ease-in-out, border-color 0.1s ease-in-out;transition:background-color 0.1s ease-in-out, border-color 0.1s ease-in-out}:host label{display:-ms-flexbox;display:flex;-ms-flex:1 1 0%;flex:1 1 0%;color:var(--calcite-ui-text-3);-webkit-box-sizing:border-box;box-sizing:border-box;pointer-events:none;-ms-flex-align:center;align-items:center;-webkit-transition:background-color 0.1s ease-in-out, border-color 0.1s ease-in-out;transition:background-color 0.1s ease-in-out, border-color 0.1s ease-in-out;margin:2px}.label--horizontal{-ms-flex-pack:center;justify-content:center}:host{outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}:host(:focus){outline:2px solid var(--calcite-ui-brand);outline-offset:-2px;outline-offset:-1px}.label--scale-s{font-size:var(--calcite-font-size--2);line-height:1rem;padding-left:0.5rem;padding-right:0.5rem;padding-top:0.125rem;padding-bottom:0.125rem}.label--scale-m{font-size:var(--calcite-font-size--1);line-height:1rem;padding-left:0.75rem;padding-right:0.75rem;padding-top:0.375rem;padding-bottom:0.375rem}.label--scale-l{font-size:var(--calcite-font-size-0);line-height:1.25rem;padding-left:1rem;padding-right:1rem;padding-top:0.5rem;padding-bottom:0.5rem}:host(:hover) label{background-color:var(--calcite-ui-foreground-2);color:var(--calcite-ui-text-1)}:host(:active) label{background-color:var(--calcite-ui-foreground-3)}:host([checked]) label{background-color:var(--calcite-ui-brand);border-color:var(--calcite-ui-brand);cursor:default;color:var(--calcite-ui-background)}:host([checked]) .label--outline{background-color:var(--calcite-ui-foreground-1);border-color:var(--calcite-ui-brand);-webkit-box-shadow:inset 0 0 0 1px var(--calcite-ui-brand);box-shadow:inset 0 0 0 1px var(--calcite-ui-brand);color:var(--calcite-ui-brand)}::slotted(input){display:none}.radio-group-item-icon{display:-ms-inline-flexbox;display:inline-flex;position:relative;margin:0;-webkit-transition-property:all;transition-property:all;-webkit-transition-duration:150ms;transition-duration:150ms;-webkit-transition-timing-function:ease-in-out;transition-timing-function:ease-in-out;-webkit-transition-delay:0s;transition-delay:0s;line-height:inherit}:host([icon-position=start]) .radio-group-item-icon{margin-right:0.5rem}:host([icon-position=start][dir=rtl]) .radio-group-item-icon{margin-right:0;margin-left:0.5rem}:host([icon-position=end]) .radio-group-item-icon{margin-left:0.5rem}:host([icon-position=end][dir=rtl]) .radio-group-item-icon{margin-left:0;margin-right:0.5rem}";var CalciteRadioGroupItem=function(){function t(t){registerInstance(this,t);this.calciteRadioGroupItemChange=createEvent(this,"calciteRadioGroupItemChange",7);this.checked=false;this.iconPosition="start";this.mutationObserver=this.getMutationObserver()}t.prototype.handleCheckedChange=function(){this.calciteRadioGroupItemChange.emit();this.syncToExternalInput()};t.prototype.connectedCallback=function(){var t=this.el.querySelector('input[slot="input"]');if(t){this.value=t.value;this.checked=t.checked;{this.mutationObserver.observe(t,{attributes:true})}}this.inputProxy=t};t.prototype.disconnectedCallback=function(){this.mutationObserver.disconnect()};t.prototype.componentWillLoad=function(){var t=this.el.querySelector("label");this.useFallback=!t||t.textContent===""};t.prototype.render=function(){var t=this,e=t.checked,i=t.useFallback,a=t.value;var n=getElementDir(this.el);var o=getElementProp(this.el,"scale","m");var r=getElementProp(this.el,"appearance","solid");var s=getElementProp(this.el,"layout","horizontal");var l=h("calcite-icon",{class:"radio-group-item-icon",dir:n,flipRtl:this.iconFlipRtl,icon:this.icon,scale:"s"});return h(Host,{"aria-checked":e.toString(),role:"radio"},h("label",{class:{"label--scale-s":o==="s","label--scale-m":o==="m","label--scale-l":o==="l","label--horizontal":s==="horizontal","label--outline":r==="outline"}},this.icon&&this.iconPosition==="start"?l:null,h("slot",null,i?a:""),h("slot",{name:"input"}),this.icon&&this.iconPosition==="end"?l:null))};t.prototype.getMutationObserver=function(){var t=this;return new MutationObserver((function(){return t.syncFromExternalInput()}))};t.prototype.syncFromExternalInput=function(){if(this.inputProxy){this.value=this.inputProxy.value;this.checked=this.inputProxy.checked}};t.prototype.syncToExternalInput=function(){if(!this.inputProxy){return}this.inputProxy.value=this.value;if(this.checked){this.inputProxy.setAttribute("checked","")}else{this.inputProxy.removeAttribute("checked")}};Object.defineProperty(t.prototype,"el",{get:function(){return getElement(this)},enumerable:false,configurable:true});Object.defineProperty(t,"watchers",{get:function(){return{checked:["handleCheckedChange"]}},enumerable:false,configurable:true});return t}();CalciteRadioGroupItem.style=calciteRadioGroupItemCss;export{CalciteRadioGroup as calcite_radio_group,CalciteRadioGroupItem as calcite_radio_group_item};