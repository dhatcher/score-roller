var __awaiter=this&&this.__awaiter||function(t,e,i,r){function a(t){return t instanceof i?t:new i((function(e){e(t)}))}return new(i||(i=Promise))((function(i,o){function n(t){try{l(r.next(t))}catch(t){o(t)}}function s(t){try{l(r["throw"](t))}catch(t){o(t)}}function l(t){t.done?i(t.value):a(t.value).then(n,s)}l((r=r.apply(t,e||[])).next())}))};var __generator=this&&this.__generator||function(t,e){var i={label:0,sent:function(){if(o[0]&1)throw o[1];return o[1]},trys:[],ops:[]},r,a,o,n;return n={next:s(0),throw:s(1),return:s(2)},typeof Symbol==="function"&&(n[Symbol.iterator]=function(){return this}),n;function s(t){return function(e){return l([t,e])}}function l(n){if(r)throw new TypeError("Generator is already executing.");while(i)try{if(r=1,a&&(o=n[0]&2?a["return"]:n[0]?a["throw"]||((o=a["return"])&&o.call(a),0):a.next)&&!(o=o.call(a,n[1])).done)return o;if(a=0,o)n=[n[0]&2,o.value];switch(n[0]){case 0:case 1:o=n;break;case 4:i.label++;return{value:n[1],done:false};case 5:i.label++;a=n[1];n=[0];continue;case 7:n=i.ops.pop();i.trys.pop();continue;default:if(!(o=i.trys,o=o.length>0&&o[o.length-1])&&(n[0]===6||n[0]===2)){i=0;continue}if(n[0]===3&&(!o||n[1]>o[0]&&n[1]<o[3])){i.label=n[1];break}if(n[0]===6&&i.label<o[1]){i.label=o[1];o=n;break}if(o&&i.label<o[2]){i.label=o[2];i.ops.push(n);break}if(o[2])i.ops.pop();i.trys.pop();continue}n=e.call(t,i)}catch(t){n=[6,t];a=0}finally{r=o=0}if(n[0]&5)throw n[1];return{value:n[0]?n[1]:void 0,done:true}}};System.register(["./p-50b64705.system.js","./p-2c235db8.system.js","./p-1994c005.system.js","./p-8f07cd77.system.js","./p-95dfb659.system.js"],(function(t){"use strict";var e,i,r,a,o,n,s,l,c,p,f;return{setters:[function(t){e=t.r;i=t.h;r=t.H;a=t.g},function(t){o=t.g},function(t){n=t.d;s=t.u;l=t.c;c=t.C},function(t){p=t.q},function(t){f=t.g}],execute:function(){var m={container:"container",arrow:"arrow"};var u=500;var d="data-calcite-tooltip-reference";var h="aria-describedby";var b='@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:block;position:absolute;z-index:999;-webkit-transform:scale(0);transform:scale(0)}.calcite-popper-anim{position:relative;z-index:1;-webkit-transition:var(--calcite-popper-transition);transition:var(--calcite-popper-transition);visibility:hidden;-webkit-transition-property:visibility, opacity, -webkit-transform;transition-property:visibility, opacity, -webkit-transform;transition-property:transform, visibility, opacity;transition-property:transform, visibility, opacity, -webkit-transform;opacity:0;-webkit-box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);border-radius:0.25rem}:host([data-popper-placement^=bottom]) .calcite-popper-anim{-webkit-transform:translateY(-5px);transform:translateY(-5px)}:host([data-popper-placement^=top]) .calcite-popper-anim{-webkit-transform:translateY(5px);transform:translateY(5px)}:host([data-popper-placement^=left]) .calcite-popper-anim{-webkit-transform:translateX(5px);transform:translateX(5px)}:host([data-popper-placement^=right]) .calcite-popper-anim{-webkit-transform:translateX(-5px);transform:translateX(-5px)}:host([data-popper-placement]) .calcite-popper-anim--active{opacity:1;visibility:visible;-webkit-transform:translate(0);transform:translate(0)}.arrow,.arrow::before{position:absolute;width:8px;height:8px;z-index:-1}.arrow::before{content:"";-webkit-box-shadow:0 4px 8px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04);box-shadow:0 4px 8px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04);-webkit-transform:rotate(45deg);transform:rotate(45deg);background:var(--calcite-ui-foreground-1)}:host([data-popper-placement^=top]) .arrow{bottom:-4px}:host([data-popper-placement^=bottom]) .arrow{top:-4px}:host([data-popper-placement^=left]) .arrow{right:-4px}:host([data-popper-placement^=right]) .arrow{left:-4px}.container{position:relative;background-color:var(--calcite-ui-foreground-1);display:-ms-flexbox;display:flex;-ms-flex-pack:start;justify-content:flex-start;-ms-flex-direction:column;flex-direction:column;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-ui-text-1);padding-top:0.75rem;padding-bottom:0.75rem;padding-left:1rem;padding-right:1rem;overflow:hidden;font-size:var(--calcite-font-size--2);line-height:1.375;border-radius:0.25rem;max-width:20rem;max-height:20rem}.calcite-popper-anim{background-color:var(--calcite-ui-foreground-1);border-width:1px;border-style:solid;border-color:var(--calcite-ui-border-3);border-radius:0.25rem}.arrow::before{outline:1px solid var(--calcite-ui-border-3)}';var y=t("calcite_tooltip",function(){function t(t){var i=this;e(this,t);this.offsetDistance=n;this.offsetSkidding=0;this.open=false;this.overlayPositioning="absolute";this.placement="auto";this._referenceElement=this.getReferenceElement();this.guid="calcite-tooltip-"+o();this.getId=function(){return i.el.id||i.guid};this.addReferences=function(){var t=i._referenceElement;if(!t){return}var e=i.getId();t.setAttribute(d,e);t.setAttribute(h,e)};this.removeReferences=function(){var t=i._referenceElement;if(!t){return}t.removeAttribute(d);t.removeAttribute(h)};this.show=function(){i.open=true};this.hide=function(){i.open=false}}t.prototype.offsetDistanceOffsetHandler=function(){this.reposition()};t.prototype.offsetSkiddingHandler=function(){this.reposition()};t.prototype.openHandler=function(){if(!this._referenceElement){this.referenceElementHandler()}this.reposition()};t.prototype.placementHandler=function(){this.reposition()};t.prototype.referenceElementHandler=function(){this.removeReferences();this._referenceElement=this.getReferenceElement();this.addReferences();this.createPopper()};t.prototype.componentDidLoad=function(){this.addReferences();this.createPopper()};t.prototype.disconnectedCallback=function(){this.removeReferences();this.destroyPopper()};t.prototype.reposition=function(){return __awaiter(this,void 0,void 0,(function(){var t,e,i,r,a;return __generator(this,(function(o){t=this,e=t.popper,i=t.el,r=t.placement;a=this.getModifiers();e?s({el:i,modifiers:a,placement:r,popper:e}):this.createPopper();return[2]}))}))};t.prototype.getReferenceElement=function(){var t=this,e=t.referenceElement,i=t.el;return(typeof e==="string"?p(i,"#"+e):e)||null};t.prototype.getModifiers=function(){var t=this,e=t.arrowEl,i=t.offsetDistance,r=t.offsetSkidding;var a={name:"arrow",enabled:true,options:{element:e}};var o={name:"offset",enabled:true,options:{offset:[r,i]}};return[a,o]};t.prototype.createPopper=function(){this.destroyPopper();var t=this,e=t.el,i=t.placement,r=t._referenceElement,a=t.overlayPositioning;var o=this.getModifiers();this.popper=l({el:e,modifiers:o,placement:i,overlayPositioning:a,referenceEl:r})};t.prototype.destroyPopper=function(){var t=this.popper;if(t){t.destroy()}this.popper=null};t.prototype.render=function(){var t;var e=this;var a=this,o=a._referenceElement,n=a.label,s=a.open;var l=o&&s;var p=!l;return i(r,{"aria-hidden":p.toString(),"aria-label":n,"calcite-hydrated-hidden":p,id:this.getId(),role:"tooltip"},i("div",{class:(t={},t[c.animation]=true,t[c.animationActive]=l,t)},i("div",{class:m.arrow,ref:function(t){return e.arrowEl=t}}),i("div",{class:m.container},i("slot",null))))};Object.defineProperty(t.prototype,"el",{get:function(){return a(this)},enumerable:false,configurable:true});Object.defineProperty(t,"watchers",{get:function(){return{offsetDistance:["offsetDistanceOffsetHandler"],offsetSkidding:["offsetSkiddingHandler"],open:["openHandler"],placement:["placementHandler"],referenceElement:["referenceElementHandler"]}},enumerable:false,configurable:true});return t}());y.style=b;var v="@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:block}";var w=t("calcite_tooltip_manager",function(){function t(t){var i=this;e(this,t);this.hoverTimeouts=new WeakMap;this.selector="["+d+"]";this.queryTooltip=function(t){var e;var r=i,a=r.selector,o=r.el;var n=(e=t.closest(a))===null||e===void 0?void 0:e.getAttribute(d);return p(o,"#"+n)};this.clearHoverTimeout=function(t){var e=i.hoverTimeouts;if(e.has(t)){window.clearTimeout(e.get(t));e.delete(t)}};this.closeExistingTooltip=function(){var t=i.tooltipEl;if(t){i.toggleTooltip(t,false)}};this.focusTooltip=function(t){var e=t.tooltip,r=t.value;i.closeExistingTooltip();if(r){i.clearHoverTimeout(e)}i.toggleTooltip(e,r)};this.toggleTooltip=function(t,e){t.open=e;if(e){i.tooltipEl=t}};this.hoverToggle=function(t){var e=t.tooltip,r=t.value;var a=i.hoverTimeouts;a.delete(e);if(r){i.closeExistingTooltip()}i.toggleTooltip(e,r)};this.hoverTooltip=function(t){var e=t.tooltip,r=t.value;i.clearHoverTimeout(e);var a=i.hoverTimeouts;var o=window.setTimeout((function(){return i.hoverToggle({tooltip:e,value:r})}),u);a.set(e,o)};this.activeTooltipHover=function(t){var e=i,r=e.tooltipEl,a=e.hoverTimeouts;if(!r){return}if(t.composedPath().includes(r)){i.clearHoverTimeout(r)}else if(!a.has(r)){i.hoverTooltip({tooltip:r,value:false})}};this.hoverEvent=function(t,e){var r=i.queryTooltip(t.target);i.activeTooltipHover(t);if(!r){return}i.hoverTooltip({tooltip:r,value:e})};this.focusEvent=function(t,e){var r=i.queryTooltip(t.target);if(!r||r===i.clickedTooltip){i.clickedTooltip=null;return}i.focusTooltip({tooltip:r,value:e})}}t.prototype.render=function(){return i("slot",null)};t.prototype.keyUpHandler=function(t){if(f(t.key)==="Escape"){var e=this.tooltipEl;if(e){this.clearHoverTimeout(e);this.toggleTooltip(e,false)}}};t.prototype.mouseEnterShow=function(t){this.hoverEvent(t,true)};t.prototype.mouseLeaveHide=function(t){this.hoverEvent(t,false)};t.prototype.clickHandler=function(t){var e=this.queryTooltip(t.target);this.clickedTooltip=e;if(e){this.toggleTooltip(e,false)}};t.prototype.focusShow=function(t){this.focusEvent(t,true)};t.prototype.blurHide=function(t){this.focusEvent(t,false)};Object.defineProperty(t.prototype,"el",{get:function(){return a(this)},enumerable:false,configurable:true});return t}());w.style=v}}}));