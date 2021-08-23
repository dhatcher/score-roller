var __awaiter=this&&this.__awaiter||function(t,e,i,a){function o(t){return t instanceof i?t:new i((function(e){e(t)}))}return new(i||(i=Promise))((function(i,r){function n(t){try{l(a.next(t))}catch(t){r(t)}}function s(t){try{l(a["throw"](t))}catch(t){r(t)}}function l(t){t.done?i(t.value):o(t.value).then(n,s)}l((a=a.apply(t,e||[])).next())}))};var __generator=this&&this.__generator||function(t,e){var i={label:0,sent:function(){if(r[0]&1)throw r[1];return r[1]},trys:[],ops:[]},a,o,r,n;return n={next:s(0),throw:s(1),return:s(2)},typeof Symbol==="function"&&(n[Symbol.iterator]=function(){return this}),n;function s(t){return function(e){return l([t,e])}}function l(n){if(a)throw new TypeError("Generator is already executing.");while(i)try{if(a=1,o&&(r=n[0]&2?o["return"]:n[0]?o["throw"]||((r=o["return"])&&r.call(o),0):o.next)&&!(r=r.call(o,n[1])).done)return r;if(o=0,r)n=[n[0]&2,r.value];switch(n[0]){case 0:case 1:r=n;break;case 4:i.label++;return{value:n[1],done:false};case 5:i.label++;o=n[1];n=[0];continue;case 7:n=i.ops.pop();i.trys.pop();continue;default:if(!(r=i.trys,r=r.length>0&&r[r.length-1])&&(n[0]===6||n[0]===2)){i=0;continue}if(n[0]===3&&(!r||n[1]>r[0]&&n[1]<r[3])){i.label=n[1];break}if(n[0]===6&&i.label<r[1]){i.label=r[1];r=n;break}if(r&&i.label<r[2]){i.label=r[2];i.ops.push(n);break}if(r[2])i.ops.pop();i.trys.pop();continue}n=e.call(t,i)}catch(t){n=[6,t];o=0}finally{a=r=0}if(n[0]&5)throw n[1];return{value:n[0]?n[1]:void 0,done:true}}};import{r as registerInstance,h,H as Host,g as getElement}from"./index-b3673963.js";import{g as guid}from"./guid-09142681.js";import{d as defaultOffsetDistance,u as updatePopper,c as createPopper,C as CSS$1}from"./popper-ec76b24f.js";import{q as queryElementRoots}from"./dom-7b4de04f.js";import{g as getKey}from"./key-ec82f942.js";var CSS={container:"container",arrow:"arrow"};var TOOLTIP_DELAY_MS=500;var TOOLTIP_REFERENCE="data-calcite-tooltip-reference";var ARIA_DESCRIBED_BY="aria-describedby";var calciteTooltipCss='@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:block;position:absolute;z-index:999;-webkit-transform:scale(0);transform:scale(0)}.calcite-popper-anim{position:relative;z-index:1;-webkit-transition:var(--calcite-popper-transition);transition:var(--calcite-popper-transition);visibility:hidden;-webkit-transition-property:visibility, opacity, -webkit-transform;transition-property:visibility, opacity, -webkit-transform;transition-property:transform, visibility, opacity;transition-property:transform, visibility, opacity, -webkit-transform;opacity:0;-webkit-box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);border-radius:0.25rem}:host([data-popper-placement^=bottom]) .calcite-popper-anim{-webkit-transform:translateY(-5px);transform:translateY(-5px)}:host([data-popper-placement^=top]) .calcite-popper-anim{-webkit-transform:translateY(5px);transform:translateY(5px)}:host([data-popper-placement^=left]) .calcite-popper-anim{-webkit-transform:translateX(5px);transform:translateX(5px)}:host([data-popper-placement^=right]) .calcite-popper-anim{-webkit-transform:translateX(-5px);transform:translateX(-5px)}:host([data-popper-placement]) .calcite-popper-anim--active{opacity:1;visibility:visible;-webkit-transform:translate(0);transform:translate(0)}.arrow,.arrow::before{position:absolute;width:8px;height:8px;z-index:-1}.arrow::before{content:"";-webkit-box-shadow:0 4px 8px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04);box-shadow:0 4px 8px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04);-webkit-transform:rotate(45deg);transform:rotate(45deg);background:var(--calcite-ui-foreground-1)}:host([data-popper-placement^=top]) .arrow{bottom:-4px}:host([data-popper-placement^=bottom]) .arrow{top:-4px}:host([data-popper-placement^=left]) .arrow{right:-4px}:host([data-popper-placement^=right]) .arrow{left:-4px}.container{position:relative;background-color:var(--calcite-ui-foreground-1);display:-ms-flexbox;display:flex;-ms-flex-pack:start;justify-content:flex-start;-ms-flex-direction:column;flex-direction:column;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-ui-text-1);padding-top:0.75rem;padding-bottom:0.75rem;padding-left:1rem;padding-right:1rem;overflow:hidden;font-size:var(--calcite-font-size--2);line-height:1.375;border-radius:0.25rem;max-width:20rem;max-height:20rem}.calcite-popper-anim{background-color:var(--calcite-ui-foreground-1);border-width:1px;border-style:solid;border-color:var(--calcite-ui-border-3);border-radius:0.25rem}.arrow::before{outline:1px solid var(--calcite-ui-border-3)}';var CalciteTooltip=function(){function t(t){var e=this;registerInstance(this,t);this.offsetDistance=defaultOffsetDistance;this.offsetSkidding=0;this.open=false;this.overlayPositioning="absolute";this.placement="auto";this._referenceElement=this.getReferenceElement();this.guid="calcite-tooltip-"+guid();this.getId=function(){return e.el.id||e.guid};this.addReferences=function(){var t=e._referenceElement;if(!t){return}var i=e.getId();t.setAttribute(TOOLTIP_REFERENCE,i);t.setAttribute(ARIA_DESCRIBED_BY,i)};this.removeReferences=function(){var t=e._referenceElement;if(!t){return}t.removeAttribute(TOOLTIP_REFERENCE);t.removeAttribute(ARIA_DESCRIBED_BY)};this.show=function(){e.open=true};this.hide=function(){e.open=false}}t.prototype.offsetDistanceOffsetHandler=function(){this.reposition()};t.prototype.offsetSkiddingHandler=function(){this.reposition()};t.prototype.openHandler=function(){if(!this._referenceElement){this.referenceElementHandler()}this.reposition()};t.prototype.placementHandler=function(){this.reposition()};t.prototype.referenceElementHandler=function(){this.removeReferences();this._referenceElement=this.getReferenceElement();this.addReferences();this.createPopper()};t.prototype.componentDidLoad=function(){this.addReferences();this.createPopper()};t.prototype.disconnectedCallback=function(){this.removeReferences();this.destroyPopper()};t.prototype.reposition=function(){return __awaiter(this,void 0,void 0,(function(){var t,e,i,a,o;return __generator(this,(function(r){t=this,e=t.popper,i=t.el,a=t.placement;o=this.getModifiers();e?updatePopper({el:i,modifiers:o,placement:a,popper:e}):this.createPopper();return[2]}))}))};t.prototype.getReferenceElement=function(){var t=this,e=t.referenceElement,i=t.el;return(typeof e==="string"?queryElementRoots(i,"#"+e):e)||null};t.prototype.getModifiers=function(){var t=this,e=t.arrowEl,i=t.offsetDistance,a=t.offsetSkidding;var o={name:"arrow",enabled:true,options:{element:e}};var r={name:"offset",enabled:true,options:{offset:[a,i]}};return[o,r]};t.prototype.createPopper=function(){this.destroyPopper();var t=this,e=t.el,i=t.placement,a=t._referenceElement,o=t.overlayPositioning;var r=this.getModifiers();this.popper=createPopper({el:e,modifiers:r,placement:i,overlayPositioning:o,referenceEl:a})};t.prototype.destroyPopper=function(){var t=this.popper;if(t){t.destroy()}this.popper=null};t.prototype.render=function(){var t;var e=this;var i=this,a=i._referenceElement,o=i.label,r=i.open;var n=a&&r;var s=!n;return h(Host,{"aria-hidden":s.toString(),"aria-label":o,"calcite-hydrated-hidden":s,id:this.getId(),role:"tooltip"},h("div",{class:(t={},t[CSS$1.animation]=true,t[CSS$1.animationActive]=n,t)},h("div",{class:CSS.arrow,ref:function(t){return e.arrowEl=t}}),h("div",{class:CSS.container},h("slot",null))))};Object.defineProperty(t.prototype,"el",{get:function(){return getElement(this)},enumerable:false,configurable:true});Object.defineProperty(t,"watchers",{get:function(){return{offsetDistance:["offsetDistanceOffsetHandler"],offsetSkidding:["offsetSkiddingHandler"],open:["openHandler"],placement:["placementHandler"],referenceElement:["referenceElementHandler"]}},enumerable:false,configurable:true});return t}();CalciteTooltip.style=calciteTooltipCss;var calciteTooltipManagerCss="@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:block}";var CalciteTooltipManager=function(){function t(t){var e=this;registerInstance(this,t);this.hoverTimeouts=new WeakMap;this.selector="["+TOOLTIP_REFERENCE+"]";this.queryTooltip=function(t){var i;var a=e,o=a.selector,r=a.el;var n=(i=t.closest(o))===null||i===void 0?void 0:i.getAttribute(TOOLTIP_REFERENCE);return queryElementRoots(r,"#"+n)};this.clearHoverTimeout=function(t){var i=e.hoverTimeouts;if(i.has(t)){window.clearTimeout(i.get(t));i.delete(t)}};this.closeExistingTooltip=function(){var t=e.tooltipEl;if(t){e.toggleTooltip(t,false)}};this.focusTooltip=function(t){var i=t.tooltip,a=t.value;e.closeExistingTooltip();if(a){e.clearHoverTimeout(i)}e.toggleTooltip(i,a)};this.toggleTooltip=function(t,i){t.open=i;if(i){e.tooltipEl=t}};this.hoverToggle=function(t){var i=t.tooltip,a=t.value;var o=e.hoverTimeouts;o.delete(i);if(a){e.closeExistingTooltip()}e.toggleTooltip(i,a)};this.hoverTooltip=function(t){var i=t.tooltip,a=t.value;e.clearHoverTimeout(i);var o=e.hoverTimeouts;var r=window.setTimeout((function(){return e.hoverToggle({tooltip:i,value:a})}),TOOLTIP_DELAY_MS);o.set(i,r)};this.activeTooltipHover=function(t){var i=e,a=i.tooltipEl,o=i.hoverTimeouts;if(!a){return}if(t.composedPath().includes(a)){e.clearHoverTimeout(a)}else if(!o.has(a)){e.hoverTooltip({tooltip:a,value:false})}};this.hoverEvent=function(t,i){var a=e.queryTooltip(t.target);e.activeTooltipHover(t);if(!a){return}e.hoverTooltip({tooltip:a,value:i})};this.focusEvent=function(t,i){var a=e.queryTooltip(t.target);if(!a||a===e.clickedTooltip){e.clickedTooltip=null;return}e.focusTooltip({tooltip:a,value:i})}}t.prototype.render=function(){return h("slot",null)};t.prototype.keyUpHandler=function(t){if(getKey(t.key)==="Escape"){var e=this.tooltipEl;if(e){this.clearHoverTimeout(e);this.toggleTooltip(e,false)}}};t.prototype.mouseEnterShow=function(t){this.hoverEvent(t,true)};t.prototype.mouseLeaveHide=function(t){this.hoverEvent(t,false)};t.prototype.clickHandler=function(t){var e=this.queryTooltip(t.target);this.clickedTooltip=e;if(e){this.toggleTooltip(e,false)}};t.prototype.focusShow=function(t){this.focusEvent(t,true)};t.prototype.blurHide=function(t){this.focusEvent(t,false)};Object.defineProperty(t.prototype,"el",{get:function(){return getElement(this)},enumerable:false,configurable:true});return t}();CalciteTooltipManager.style=calciteTooltipManagerCss;export{CalciteTooltip as calcite_tooltip,CalciteTooltipManager as calcite_tooltip_manager};