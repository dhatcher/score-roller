var __awaiter=this&&this.__awaiter||function(t,e,a,o){function n(t){return t instanceof a?t:new a((function(e){e(t)}))}return new(a||(a=Promise))((function(a,r){function c(t){try{l(o.next(t))}catch(t){r(t)}}function i(t){try{l(o["throw"](t))}catch(t){r(t)}}function l(t){t.done?a(t.value):n(t.value).then(c,i)}l((o=o.apply(t,e||[])).next())}))};var __generator=this&&this.__generator||function(t,e){var a={label:0,sent:function(){if(r[0]&1)throw r[1];return r[1]},trys:[],ops:[]},o,n,r,c;return c={next:i(0),throw:i(1),return:i(2)},typeof Symbol==="function"&&(c[Symbol.iterator]=function(){return this}),c;function i(t){return function(e){return l([t,e])}}function l(c){if(o)throw new TypeError("Generator is already executing.");while(a)try{if(o=1,n&&(r=c[0]&2?n["return"]:c[0]?n["throw"]||((r=n["return"])&&r.call(n),0):n.next)&&!(r=r.call(n,c[1])).done)return r;if(n=0,r)c=[c[0]&2,r.value];switch(c[0]){case 0:case 1:r=c;break;case 4:a.label++;return{value:c[1],done:false};case 5:a.label++;n=c[1];c=[0];continue;case 7:c=a.ops.pop();a.trys.pop();continue;default:if(!(r=a.trys,r=r.length>0&&r[r.length-1])&&(c[0]===6||c[0]===2)){a=0;continue}if(c[0]===3&&(!r||c[1]>r[0]&&c[1]<r[3])){a.label=c[1];break}if(c[0]===6&&a.label<r[1]){a.label=r[1];r=c;break}if(r&&a.label<r[2]){a.label=r[2];a.ops.push(c);break}if(r[2])a.ops.pop();a.trys.pop();continue}c=e.call(t,a)}catch(t){c=[6,t];n=0}finally{o=r=0}if(c[0]&5)throw c[1];return{value:c[0]?c[1]:void 0,done:true}}};import{r as registerInstance,h,g as getElement}from"./index-b3673963.js";import{q as queryElementRoots,c as closestElementCrossShadowBoundary,g as getElementDir,C as CSS_UTILITY}from"./dom-7b4de04f.js";import"./guid-09142681.js";var CSS={buttonLoader:"calcite-button--loader",content:"content",contentSlotted:"content--slotted",icon:"icon",iconStart:"icon--start",iconEnd:"icon--end",loadingIn:"loading-in",loadingOut:"loading-out"};var TEXT={loading:"Loading"};var calciteButtonCss="@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:inline-block;width:auto;vertical-align:middle}:host([round]){border-radius:50px}:host([round]) a,:host([round]) button{border-radius:50px}:host button,:host a{outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}:host button:focus,:host a:focus{outline:2px solid var(--calcite-ui-brand);outline-offset:2px}:host button,:host a{--calcite-button-padding-x:0;--calcite-button-padding-y:0;padding:var(--calcite-button-padding-y) var(--calcite-button-padding-x) var(--calcite-button-padding-y) var(--calcite-button-padding-x);position:relative;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;text-decoration:none;width:100%;height:100%;border-radius:0;border-style:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;cursor:pointer;text-align:center;-webkit-box-sizing:border-box;box-sizing:border-box;font-family:inherit;-webkit-transition:background-color 0.15s ease-in-out, border 0.15s ease-in-out, outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out, -webkit-box-shadow 0.15s ease-in-out;transition:background-color 0.15s ease-in-out, border 0.15s ease-in-out, outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out, -webkit-box-shadow 0.15s ease-in-out;transition:background-color 0.15s ease-in-out, border 0.15s ease-in-out, box-shadow 0.15s ease-in-out, outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:background-color 0.15s ease-in-out, border 0.15s ease-in-out, box-shadow 0.15s ease-in-out, outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out, -webkit-box-shadow 0.15s ease-in-out}:host button:hover,:host a:hover{text-decoration:none}.content{display:-ms-flexbox;display:flex;margin-left:0.5rem;margin-right:0.5rem;-ms-flex-preferred-size:auto;flex-basis:auto}:host(:not([icon-start])) .content{margin-left:unset}:host(:not([icon-end])) .content{margin-right:unset}:host([icon-start]:not([icon-end])) .calcite--rtl .content{margin-left:unset;margin-right:0.5rem}:host([icon-end]:not([icon-start])) .calcite--rtl .content{margin-right:unset;margin-left:0.5rem}:host([width=auto]){width:auto}:host([width=half]){width:50%}:host([width=full]){width:100%}:host([alignment=center]:not([width=auto])) a,:host([alignment=center]:not([width=auto])) button{-ms-flex-pack:center;justify-content:center}:host([alignment=start]:not([width=auto])) a,:host([alignment=start]:not([width=auto])) button{-ms-flex-pack:start;justify-content:flex-start}:host([alignment=end]:not([width=auto])) a,:host([alignment=end]:not([width=auto])) button{-ms-flex-pack:end;justify-content:flex-end}:host([alignment*=space-between]:not([width=auto])) a,:host([alignment*=space-between]:not([width=auto])) button{-ms-flex-pack:justify;justify-content:space-between}:host([alignment=icon-start-space-between]:not([width=auto])) .icon--start{margin-right:auto}:host([alignment=icon-start-space-between]:not([width=auto])) a,:host([alignment=icon-start-space-between]:not([width=auto])) button{text-align:unset}:host([alignment=icon-end-space-between]:not([width=auto])) .icon--end{margin-left:auto}:host([alignment=icon-end-space-between]:not([width=auto])) a,:host([alignment=icon-end-space-between]:not([width=auto])) button{text-align:unset}:host([alignment=icon-start-space-between]:not([width=auto])) .calcite--rtl .icon--start{margin-right:unset;margin-left:auto}:host([alignment=icon-end-space-between]:not([width=auto])) .calcite--rtl .icon--end{margin-left:unset;margin-right:auto}:host([alignment=center]) a:not(.content--slotted) .icon--start+.icon--end,:host([alignment=center]) button:not(.content--slotted) .icon--start+.icon--end{margin-left:0.5rem}:host([alignment=center]) a.calcite--rtl:not(.content--slotted) .icon--start+.icon--end,:host([alignment=center]) button.calcite--rtl:not(.content--slotted) .icon--start+.icon--end{margin-left:unset;margin-right:0.5rem}.icon{display:-ms-inline-flexbox;display:inline-flex;position:relative;margin:0;-webkit-transition-property:all;transition-property:all;-webkit-transition-duration:150ms;transition-duration:150ms;-webkit-transition-timing-function:ease-in-out;transition-timing-function:ease-in-out;-webkit-transition-delay:0s;transition-delay:0s;line-height:inherit}:host([loading]),:host([disabled]){pointer-events:none}:host([loading]) button,:host([loading]) a,:host([disabled]) button,:host([disabled]) a{pointer-events:none;opacity:var(--calcite-ui-opacity-disabled)}@-webkit-keyframes loader-in{0%{width:0;opacity:0;-webkit-transform:scale(0.5);transform:scale(0.5)}100%{width:1rem;opacity:1;-webkit-transform:scale(1);transform:scale(1)}}@keyframes loader-in{0%{width:0;opacity:0;-webkit-transform:scale(0.5);transform:scale(0.5)}100%{width:1rem;opacity:1;-webkit-transform:scale(1);transform:scale(1)}}@-webkit-keyframes loader-out{0%{width:1rem;opacity:1;-webkit-transform:scale(1);transform:scale(1)}100%{width:0;opacity:0;-webkit-transform:scale(0.5);transform:scale(0.5)}}@keyframes loader-out{0%{width:1rem;opacity:1;-webkit-transform:scale(1);transform:scale(1)}100%{width:0;opacity:0;-webkit-transform:scale(0.5);transform:scale(0.5)}}.calcite-button--loader{display:-ms-flexbox;display:flex}.calcite-button--loader calcite-loader{margin:0;-webkit-transition:width 300ms ease-in-out, opacity 300ms ease-in-out, -webkit-transform 300ms ease-in-out;transition:width 300ms ease-in-out, opacity 300ms ease-in-out, -webkit-transform 300ms ease-in-out;transition:width 300ms ease-in-out, opacity 300ms ease-in-out, transform 300ms ease-in-out;transition:width 300ms ease-in-out, opacity 300ms ease-in-out, transform 300ms ease-in-out, -webkit-transform 300ms ease-in-out}.calcite-button--loader calcite-loader.loading-in{-webkit-animation-name:loader-in;animation-name:loader-in;-webkit-animation-duration:310ms;animation-duration:310ms}.calcite-button--loader calcite-loader.loading-out{-webkit-animation-name:loader-out;animation-name:loader-out;-webkit-animation-duration:310ms;animation-duration:310ms}:host([loading]) button.content--slotted .calcite-button--loader calcite-loader,:host([loading]) a.content--slotted .calcite-button--loader calcite-loader{-webkit-margin-end:0.5rem;margin-inline-end:0.5rem}:host([loading]) button:not(.content--slotted) .icon--start,:host([loading]) button:not(.content--slotted) .icon--end,:host([loading]) a:not(.content--slotted) .icon--start,:host([loading]) a:not(.content--slotted) .icon--end{display:none}:host([appearance=solid][color=blue]) button,:host([appearance=solid][color=blue]) a{color:var(--calcite-ui-foreground-1);background-color:var(--calcite-ui-brand);border:1px solid transparent}:host([appearance=solid][color=blue]) button:hover,:host([appearance=solid][color=blue]) button:focus,:host([appearance=solid][color=blue]) a:hover,:host([appearance=solid][color=blue]) a:focus{background-color:var(--calcite-ui-brand-hover)}:host([appearance=solid][color=blue]) button:active,:host([appearance=solid][color=blue]) a:active{background-color:var(--calcite-ui-brand)}:host([appearance=solid][color=blue]) button .calcite-button--icon,:host([appearance=solid][color=blue]) a .calcite-button--icon{fill:var(--calcite-ui-foreground-1)}:host([appearance=solid][color=blue]) button calcite-loader,:host([appearance=solid][color=blue]) a calcite-loader{color:var(--calcite-ui-foreground-1)}:host([appearance=solid][color=red]) button,:host([appearance=solid][color=red]) a{color:var(--calcite-ui-foreground-1);background-color:var(--calcite-ui-danger);border:1px solid transparent}:host([appearance=solid][color=red]) button:hover,:host([appearance=solid][color=red]) button:focus,:host([appearance=solid][color=red]) a:hover,:host([appearance=solid][color=red]) a:focus{background-color:var(--calcite-ui-danger-hover)}:host([appearance=solid][color=red]) button:active,:host([appearance=solid][color=red]) a:active{background-color:var(--calcite-ui-danger)}:host([appearance=solid][color=red]) button .calcite-button--icon,:host([appearance=solid][color=red]) a .calcite-button--icon{fill:var(--calcite-ui-foreground-1)}:host([appearance=solid][color=red]) button calcite-loader,:host([appearance=solid][color=red]) a calcite-loader{color:var(--calcite-ui-foreground-1)}:host([appearance=solid][color=neutral]) button,:host([appearance=solid][color=neutral]) a{color:var(--calcite-ui-text-1);background-color:var(--calcite-ui-foreground-3);border:1px solid transparent}:host([appearance=solid][color=neutral]) button:hover,:host([appearance=solid][color=neutral]) button:focus,:host([appearance=solid][color=neutral]) a:hover,:host([appearance=solid][color=neutral]) a:focus{background-color:var(--calcite-ui-foreground-2)}:host([appearance=solid][color=neutral]) button:active,:host([appearance=solid][color=neutral]) a:active{background-color:var(--calcite-ui-foreground-3)}:host([appearance=solid][color=neutral]) button .calcite-button--icon,:host([appearance=solid][color=neutral]) a .calcite-button--icon{fill:var(--calcite-ui-text-1)}:host([appearance=solid][color=neutral]) button calcite-loader,:host([appearance=solid][color=neutral]) a calcite-loader{color:var(--calcite-ui-text-1)}:host([appearance=solid][color=inverse]) button,:host([appearance=solid][color=inverse]) a{color:#ffffff;background-color:var(--calcite-ui-inverse);border:1px solid transparent}:host([appearance=solid][color=inverse]) button:hover,:host([appearance=solid][color=inverse]) button:focus,:host([appearance=solid][color=inverse]) a:hover,:host([appearance=solid][color=inverse]) a:focus{background-color:var(--calcite-ui-inverse-hover)}:host([appearance=solid][color=inverse]) button:active,:host([appearance=solid][color=inverse]) a:active{background-color:var(--calcite-ui-inverse)}:host([appearance=solid][color=inverse]) button .calcite-button--icon,:host([appearance=solid][color=inverse]) a .calcite-button--icon{fill:#ffffff}:host([appearance=solid][color=inverse]) button calcite-loader,:host([appearance=solid][color=inverse]) a calcite-loader{color:#ffffff}:host([appearance=outline][color=blue]) button,:host([appearance=outline][color=blue]) a{color:var(--calcite-ui-brand);background-color:var(--calcite-ui-foreground-1);border:1px solid var(--calcite-ui-brand);-webkit-box-shadow:inset 0 0 0 1px transparent;box-shadow:inset 0 0 0 1px transparent}:host([appearance=outline][color=blue]) button:hover,:host([appearance=outline][color=blue]) a:hover{border-color:var(--calcite-ui-brand);-webkit-box-shadow:inset 0 0 0 1px var(--calcite-ui-brand);box-shadow:inset 0 0 0 1px var(--calcite-ui-brand)}:host([appearance=outline][color=blue]) button:active,:host([appearance=outline][color=blue]) button:focus,:host([appearance=outline][color=blue]) a:active,:host([appearance=outline][color=blue]) a:focus{color:var(--calcite-ui-brand-press);border-color:var(--calcite-ui-brand-press);-webkit-box-shadow:inset 0 0 0 2px var(--calcite-ui-brand-press);box-shadow:inset 0 0 0 2px var(--calcite-ui-brand-press)}:host([appearance=outline][color=blue]) button:active .calcite-button--icon,:host([appearance=outline][color=blue]) button:focus .calcite-button--icon,:host([appearance=outline][color=blue]) a:active .calcite-button--icon,:host([appearance=outline][color=blue]) a:focus .calcite-button--icon{fill:var(--calcite-ui-brand-press)}:host([appearance=outline][color=blue]) button .calcite-button--icon,:host([appearance=outline][color=blue]) a .calcite-button--icon{fill:var(--calcite-ui-brand)}:host([appearance=outline][color=blue]) button calcite-loader,:host([appearance=outline][color=blue]) a calcite-loader{color:var(--calcite-ui-brand)}:host([appearance=outline][color=red]) button,:host([appearance=outline][color=red]) a{color:var(--calcite-ui-danger);background-color:var(--calcite-ui-foreground-1);border:1px solid var(--calcite-ui-danger);-webkit-box-shadow:inset 0 0 0 1px transparent;box-shadow:inset 0 0 0 1px transparent}:host([appearance=outline][color=red]) button:hover,:host([appearance=outline][color=red]) a:hover{border-color:var(--calcite-ui-danger);-webkit-box-shadow:inset 0 0 0 1px var(--calcite-ui-danger);box-shadow:inset 0 0 0 1px var(--calcite-ui-danger)}:host([appearance=outline][color=red]) button:active,:host([appearance=outline][color=red]) button:focus,:host([appearance=outline][color=red]) a:active,:host([appearance=outline][color=red]) a:focus{color:var(--calcite-ui-danger-press);border-color:var(--calcite-ui-danger-press);-webkit-box-shadow:inset 0 0 0 2px var(--calcite-ui-danger-press);box-shadow:inset 0 0 0 2px var(--calcite-ui-danger-press)}:host([appearance=outline][color=red]) button:active .calcite-button--icon,:host([appearance=outline][color=red]) button:focus .calcite-button--icon,:host([appearance=outline][color=red]) a:active .calcite-button--icon,:host([appearance=outline][color=red]) a:focus .calcite-button--icon{fill:var(--calcite-ui-danger-press)}:host([appearance=outline][color=red]) button .calcite-button--icon,:host([appearance=outline][color=red]) a .calcite-button--icon{fill:var(--calcite-ui-danger)}:host([appearance=outline][color=red]) button calcite-loader,:host([appearance=outline][color=red]) a calcite-loader{color:var(--calcite-ui-danger)}:host([appearance=outline][color=neutral]) button,:host([appearance=outline][color=neutral]) a{color:var(--calcite-ui-text-1);background-color:var(--calcite-ui-foreground-1);border:1px solid var(--calcite-ui-foreground-3);-webkit-box-shadow:inset 0 0 0 1px transparent;box-shadow:inset 0 0 0 1px transparent}:host([appearance=outline][color=neutral]) button:hover,:host([appearance=outline][color=neutral]) a:hover{border-color:var(--calcite-ui-foreground-3);-webkit-box-shadow:inset 0 0 0 1px var(--calcite-ui-foreground-3);box-shadow:inset 0 0 0 1px var(--calcite-ui-foreground-3)}:host([appearance=outline][color=neutral]) button:active,:host([appearance=outline][color=neutral]) button:focus,:host([appearance=outline][color=neutral]) a:active,:host([appearance=outline][color=neutral]) a:focus{color:var(--calcite-ui-text-1);border-color:var(--calcite-ui-border-2);-webkit-box-shadow:inset 0 0 0 2px var(--calcite-ui-border-2);box-shadow:inset 0 0 0 2px var(--calcite-ui-border-2)}:host([appearance=outline][color=neutral]) button:active .calcite-button--icon,:host([appearance=outline][color=neutral]) button:focus .calcite-button--icon,:host([appearance=outline][color=neutral]) a:active .calcite-button--icon,:host([appearance=outline][color=neutral]) a:focus .calcite-button--icon{fill:var(--calcite-ui-text-1)}:host([appearance=outline][color=neutral]) button .calcite-button--icon,:host([appearance=outline][color=neutral]) a .calcite-button--icon{fill:var(--calcite-ui-text-1)}:host([appearance=outline][color=neutral]) button calcite-loader,:host([appearance=outline][color=neutral]) a calcite-loader{color:var(--calcite-ui-text-1)}:host([appearance=outline][color=inverse]) button,:host([appearance=outline][color=inverse]) a{color:var(--calcite-ui-text-1);background-color:var(--calcite-ui-foreground-1);border:1px solid var(--calcite-ui-inverse);-webkit-box-shadow:inset 0 0 0 1px transparent;box-shadow:inset 0 0 0 1px transparent}:host([appearance=outline][color=inverse]) button:hover,:host([appearance=outline][color=inverse]) a:hover{border-color:var(--calcite-ui-inverse);-webkit-box-shadow:inset 0 0 0 1px var(--calcite-ui-inverse);box-shadow:inset 0 0 0 1px var(--calcite-ui-inverse)}:host([appearance=outline][color=inverse]) button:active,:host([appearance=outline][color=inverse]) button:focus,:host([appearance=outline][color=inverse]) a:active,:host([appearance=outline][color=inverse]) a:focus{color:var(--calcite-ui-text-1);border-color:var(--calcite-ui-inverse-hover);-webkit-box-shadow:inset 0 0 0 2px var(--calcite-ui-inverse-hover);box-shadow:inset 0 0 0 2px var(--calcite-ui-inverse-hover)}:host([appearance=outline][color=inverse]) button:active .calcite-button--icon,:host([appearance=outline][color=inverse]) button:focus .calcite-button--icon,:host([appearance=outline][color=inverse]) a:active .calcite-button--icon,:host([appearance=outline][color=inverse]) a:focus .calcite-button--icon{fill:var(--calcite-ui-text-1)}:host([appearance=outline][color=inverse]) button .calcite-button--icon,:host([appearance=outline][color=inverse]) a .calcite-button--icon{fill:var(--calcite-ui-text-1)}:host([appearance=outline][color=inverse]) button calcite-loader,:host([appearance=outline][color=inverse]) a calcite-loader{color:var(--calcite-ui-text-1)}:host([appearance=clear][color=blue]) button,:host([appearance=clear][color=blue]) a{color:var(--calcite-ui-brand);background-color:transparent;border:1px solid var(--calcite-ui-brand);-webkit-box-shadow:inset 0 0 0 1px transparent;box-shadow:inset 0 0 0 1px transparent}:host([appearance=clear][color=blue]) button:hover,:host([appearance=clear][color=blue]) a:hover{border-color:var(--calcite-ui-brand);-webkit-box-shadow:inset 0 0 0 1px var(--calcite-ui-brand);box-shadow:inset 0 0 0 1px var(--calcite-ui-brand)}:host([appearance=clear][color=blue]) button:active,:host([appearance=clear][color=blue]) button:focus,:host([appearance=clear][color=blue]) a:active,:host([appearance=clear][color=blue]) a:focus{color:var(--calcite-ui-brand-press);border-color:var(--calcite-ui-brand-press);-webkit-box-shadow:inset 0 0 0 2px var(--calcite-ui-brand-press);box-shadow:inset 0 0 0 2px var(--calcite-ui-brand-press)}:host([appearance=clear][color=blue]) button:active .calcite-button--icon,:host([appearance=clear][color=blue]) button:focus .calcite-button--icon,:host([appearance=clear][color=blue]) a:active .calcite-button--icon,:host([appearance=clear][color=blue]) a:focus .calcite-button--icon{fill:var(--calcite-ui-brand-press)}:host([appearance=clear][color=blue]) button .calcite-button--icon,:host([appearance=clear][color=blue]) a .calcite-button--icon{fill:var(--calcite-ui-brand)}:host([appearance=clear][color=blue]) button calcite-loader,:host([appearance=clear][color=blue]) a calcite-loader{color:var(--calcite-ui-brand)}:host([appearance=clear][color=red]) button,:host([appearance=clear][color=red]) a{color:var(--calcite-ui-danger);background-color:transparent;border:1px solid var(--calcite-ui-danger);-webkit-box-shadow:inset 0 0 0 1px transparent;box-shadow:inset 0 0 0 1px transparent}:host([appearance=clear][color=red]) button:hover,:host([appearance=clear][color=red]) a:hover{border-color:var(--calcite-ui-danger);-webkit-box-shadow:inset 0 0 0 1px var(--calcite-ui-danger);box-shadow:inset 0 0 0 1px var(--calcite-ui-danger)}:host([appearance=clear][color=red]) button:active,:host([appearance=clear][color=red]) button:focus,:host([appearance=clear][color=red]) a:active,:host([appearance=clear][color=red]) a:focus{color:var(--calcite-ui-danger-press);border-color:var(--calcite-ui-danger-press);-webkit-box-shadow:inset 0 0 0 2px var(--calcite-ui-danger-press);box-shadow:inset 0 0 0 2px var(--calcite-ui-danger-press)}:host([appearance=clear][color=red]) button:active .calcite-button--icon,:host([appearance=clear][color=red]) button:focus .calcite-button--icon,:host([appearance=clear][color=red]) a:active .calcite-button--icon,:host([appearance=clear][color=red]) a:focus .calcite-button--icon{fill:var(--calcite-ui-danger-press)}:host([appearance=clear][color=red]) button .calcite-button--icon,:host([appearance=clear][color=red]) a .calcite-button--icon{fill:var(--calcite-ui-danger)}:host([appearance=clear][color=red]) button calcite-loader,:host([appearance=clear][color=red]) a calcite-loader{color:var(--calcite-ui-danger)}:host([appearance=clear][color=neutral]) button,:host([appearance=clear][color=neutral]) a{color:var(--calcite-ui-text-1);background-color:transparent;border:1px solid var(--calcite-ui-foreground-3);-webkit-box-shadow:inset 0 0 0 1px transparent;box-shadow:inset 0 0 0 1px transparent}:host([appearance=clear][color=neutral]) button:hover,:host([appearance=clear][color=neutral]) a:hover{border-color:var(--calcite-ui-foreground-3);-webkit-box-shadow:inset 0 0 0 1px var(--calcite-ui-foreground-3);box-shadow:inset 0 0 0 1px var(--calcite-ui-foreground-3)}:host([appearance=clear][color=neutral]) button:active,:host([appearance=clear][color=neutral]) button:focus,:host([appearance=clear][color=neutral]) a:active,:host([appearance=clear][color=neutral]) a:focus{color:var(--calcite-ui-text-1);border-color:var(--calcite-ui-border-2);-webkit-box-shadow:inset 0 0 0 2px var(--calcite-ui-border-2);box-shadow:inset 0 0 0 2px var(--calcite-ui-border-2)}:host([appearance=clear][color=neutral]) button:active .calcite-button--icon,:host([appearance=clear][color=neutral]) button:focus .calcite-button--icon,:host([appearance=clear][color=neutral]) a:active .calcite-button--icon,:host([appearance=clear][color=neutral]) a:focus .calcite-button--icon{fill:var(--calcite-ui-text-1)}:host([appearance=clear][color=neutral]) button .calcite-button--icon,:host([appearance=clear][color=neutral]) a .calcite-button--icon{fill:var(--calcite-ui-text-1)}:host([appearance=clear][color=neutral]) button calcite-loader,:host([appearance=clear][color=neutral]) a calcite-loader{color:var(--calcite-ui-text-1)}:host([appearance=clear][color=inverse]) button,:host([appearance=clear][color=inverse]) a{color:var(--calcite-ui-text-1);background-color:transparent;border:1px solid var(--calcite-ui-inverse);-webkit-box-shadow:inset 0 0 0 1px transparent;box-shadow:inset 0 0 0 1px transparent}:host([appearance=clear][color=inverse]) button:hover,:host([appearance=clear][color=inverse]) a:hover{border-color:var(--calcite-ui-inverse);-webkit-box-shadow:inset 0 0 0 1px var(--calcite-ui-inverse);box-shadow:inset 0 0 0 1px var(--calcite-ui-inverse)}:host([appearance=clear][color=inverse]) button:active,:host([appearance=clear][color=inverse]) button:focus,:host([appearance=clear][color=inverse]) a:active,:host([appearance=clear][color=inverse]) a:focus{color:var(--calcite-ui-text-1);border-color:var(--calcite-ui-inverse-hover);-webkit-box-shadow:inset 0 0 0 2px var(--calcite-ui-inverse-hover);box-shadow:inset 0 0 0 2px var(--calcite-ui-inverse-hover)}:host([appearance=clear][color=inverse]) button:active .calcite-button--icon,:host([appearance=clear][color=inverse]) button:focus .calcite-button--icon,:host([appearance=clear][color=inverse]) a:active .calcite-button--icon,:host([appearance=clear][color=inverse]) a:focus .calcite-button--icon{fill:var(--calcite-ui-text-1)}:host([appearance=clear][color=inverse]) button .calcite-button--icon,:host([appearance=clear][color=inverse]) a .calcite-button--icon{fill:var(--calcite-ui-text-1)}:host([appearance=clear][color=inverse]) button calcite-loader,:host([appearance=clear][color=inverse]) a calcite-loader{color:var(--calcite-ui-text-1)}:host([appearance=outline][split-child=primary]) button,:host([appearance=clear][split-child=primary]) button{border-right-width:0;border-left-width:1px}:host([appearance=outline][split-child=primary]) button.calcite--rtl,:host([appearance=clear][split-child=primary]) button.calcite--rtl{border-left-width:0;border-right-width:1px}:host([appearance=outline][split-child=secondary]) button,:host([appearance=clear][split-child=secondary]) button{border-left-width:0;border-right-width:1px}:host([appearance=outline][split-child=secondary]) button.calcite--rtl,:host([appearance=clear][split-child=secondary]) button.calcite--rtl{border-right-width:0;border-left-width:1px}:host([appearance=transparent][color=blue]) button,:host([appearance=transparent][color=blue]) a{color:var(--calcite-ui-text-link);background-color:transparent}:host([appearance=transparent][color=blue]) button:hover,:host([appearance=transparent][color=blue]) button:focus,:host([appearance=transparent][color=blue]) a:hover,:host([appearance=transparent][color=blue]) a:focus{background-color:var(--calcite-button-transparent-hover)}:host([appearance=transparent][color=blue]) button:active,:host([appearance=transparent][color=blue]) a:active{background-color:var(--calcite-button-transparent-press)}:host([appearance=transparent][color=blue]) button calcite-loader,:host([appearance=transparent][color=blue]) a calcite-loader{color:var(--calcite-ui-text-link)}:host([appearance=transparent][color=red]) button,:host([appearance=transparent][color=red]) a{color:var(--calcite-ui-danger-press);background-color:transparent}:host([appearance=transparent][color=red]) button:hover,:host([appearance=transparent][color=red]) button:focus,:host([appearance=transparent][color=red]) a:hover,:host([appearance=transparent][color=red]) a:focus{background-color:var(--calcite-button-transparent-hover)}:host([appearance=transparent][color=red]) button:active,:host([appearance=transparent][color=red]) a:active{background-color:var(--calcite-button-transparent-press)}:host([appearance=transparent][color=red]) button calcite-loader,:host([appearance=transparent][color=red]) a calcite-loader{color:var(--calcite-ui-danger-press)}:host([appearance=transparent][color=neutral]) button,:host([appearance=transparent][color=neutral]) a{color:var(--calcite-ui-text-1);background-color:transparent}:host([appearance=transparent][color=neutral]) button:hover,:host([appearance=transparent][color=neutral]) button:focus,:host([appearance=transparent][color=neutral]) a:hover,:host([appearance=transparent][color=neutral]) a:focus{background-color:var(--calcite-button-transparent-hover)}:host([appearance=transparent][color=neutral]) button:active,:host([appearance=transparent][color=neutral]) a:active{background-color:var(--calcite-button-transparent-press)}:host([appearance=transparent][color=neutral]) button calcite-loader,:host([appearance=transparent][color=neutral]) a calcite-loader{color:var(--calcite-ui-text-1)}:host([appearance=transparent][color=inverse]) button,:host([appearance=transparent][color=inverse]) a{color:var(--calcite-ui-foreground-1);background-color:transparent}:host([appearance=transparent][color=inverse]) button:hover,:host([appearance=transparent][color=inverse]) button:focus,:host([appearance=transparent][color=inverse]) a:hover,:host([appearance=transparent][color=inverse]) a:focus{background-color:var(--calcite-button-transparent-hover)}:host([appearance=transparent][color=inverse]) button:active,:host([appearance=transparent][color=inverse]) a:active{background-color:var(--calcite-button-transparent-press)}:host([appearance=transparent][color=inverse]) button calcite-loader,:host([appearance=transparent][color=inverse]) a calcite-loader{color:var(--calcite-ui-foreground-1)}:host([scale=s]) button.content--slotted,:host([scale=s]) a.content--slotted{--calcite-button-padding-x:7px;font-size:var(--calcite-font-size--2);line-height:1rem}:host([scale=s]:not([appearance=transparent])) button.content--slotted,:host([scale=s]:not([appearance=transparent])) a.content--slotted{--calcite-button-padding-y:3px}:host([scale=s][appearance=transparent]) button.content--slotted,:host([scale=s][appearance=transparent]) a.content--slotted{--calcite-button-padding-x:0.5rem;--calcite-button-padding-y:0.25rem}:host([scale=m]) button.content--slotted,:host([scale=m]) a.content--slotted{--calcite-button-padding-x:11px;font-size:var(--calcite-font-size--1);line-height:1rem}:host([scale=m]:not([appearance=transparent])) button.content--slotted,:host([scale=m]:not([appearance=transparent])) a.content--slotted{--calcite-button-padding-y:7px}:host([scale=m][appearance=transparent]) button.content--slotted,:host([scale=m][appearance=transparent]) a.content--slotted{--calcite-button-padding-x:0.75rem;--calcite-button-padding-y:0.5rem}:host([scale=l]) button.content--slotted,:host([scale=l]) a.content--slotted{--calcite-button-padding-x:15px;font-size:var(--calcite-font-size-0);line-height:1.25rem}:host([scale=l]:not([appearance=transparent])) button.content--slotted,:host([scale=l]:not([appearance=transparent])) a.content--slotted{--calcite-button-padding-y:11px}:host([scale=l][appearance=transparent]) button.content--slotted,:host([scale=l][appearance=transparent]) a.content--slotted{--calcite-button-padding-x:1rem;--calcite-button-padding-y:0.75rem}:host([scale=s]) button:not(.content--slotted),:host([scale=s]) a:not(.content--slotted){--calcite-button-padding-x:0.125rem;--calcite-button-padding-y:3px;font-size:var(--calcite-font-size-0);line-height:1.25rem;width:1.5rem;min-height:1.5rem}:host([scale=s][appearance=transparent]) button:not(.content--slotted),:host([scale=s][appearance=transparent]) a:not(.content--slotted){--calcite-button-padding-y:0.25rem}:host([scale=m]) button:not(.content--slotted),:host([scale=m]) a:not(.content--slotted){--calcite-button-padding-x:0.125rem;--calcite-button-padding-y:7px;font-size:var(--calcite-font-size-0);line-height:1.25rem;width:2rem;min-height:2rem}:host([scale=m][appearance=transparent]) button:not(.content--slotted),:host([scale=m][appearance=transparent]) a:not(.content--slotted){--calcite-button-padding-y:0.5rem}:host([scale=l]) button:not(.content--slotted),:host([scale=l]) a:not(.content--slotted){--calcite-button-padding-x:0.125rem;--calcite-button-padding-y:9px;font-size:var(--calcite-font-size-0);line-height:1.25rem;width:2.75rem;min-height:2.75rem}:host([scale=l][appearance=transparent]) button:not(.content--slotted),:host([scale=l][appearance=transparent]) a:not(.content--slotted){--calcite-button-padding-y:0.625rem}:host([scale=s][icon-start][icon-end]) button:not(.content--slotted),:host([scale=s][icon-start][icon-end]) a:not(.content--slotted){--calcite-button-padding-x:23px;font-size:var(--calcite-font-size-0);line-height:1.25rem;height:1.5rem}:host([scale=s][icon-start][icon-end][appearance=transparent]) button:not(.content--slotted),:host([scale=s][icon-start][icon-end][appearance=transparent]) a:not(.content--slotted){--calcite-button-padding-x:1.5rem}:host([scale=m][icon-start][icon-end]) button:not(.content--slotted),:host([scale=m][icon-start][icon-end]) a:not(.content--slotted){--calcite-button-padding-x:2rem;font-size:var(--calcite-font-size-0);line-height:1.25rem;height:2rem}:host([scale=m][icon-start][icon-end][appearance=transparent]) button:not(.content--slotted),:host([scale=m][icon-start][icon-end][appearance=transparent]) a:not(.content--slotted){--calcite-button-padding-x:33px}:host([scale=l][icon-start][icon-end]) button:not(.content--slotted),:host([scale=l][icon-start][icon-end]) a:not(.content--slotted){--calcite-button-padding-x:43px;font-size:var(--calcite-font-size-0);line-height:1.25rem;height:2.75rem}:host([scale=l][icon-start][icon-end]) button:not(.content--slotted) .icon--start+.icon--end,:host([scale=l][icon-start][icon-end]) a:not(.content--slotted) .icon--start+.icon--end{-webkit-margin-start:1rem;margin-inline-start:1rem}:host([scale=l][icon-start][icon-end][appearance=transparent]) button:not(.content--slotted),:host([scale=l][icon-start][icon-end][appearance=transparent]) a:not(.content--slotted){--calcite-button-padding-x:2.75rem}";var CalciteButton=function(){function t(t){var e=this;registerInstance(this,t);this.alignment="center";this.appearance="solid";this.color="blue";this.intlLoading=TEXT.loading;this.loading=false;this.round=false;this.scale="m";this.splitChild=false;this.width="auto";this.childElType="button";this.hasContent=false;this.hasLoader=false;this.handleClick=function(t){var a=e,o=a.childElType,n=a.form,r=a.el,c=a.type;if(o==="button"&&c!=="button"){var i=n?queryElementRoots(r,"#"+n):closestElementCrossShadowBoundary(r,"form");if(i){var l=i.onsubmit;switch(c){case"submit":if(l){l()}else if(i.checkValidity()){i.submit()}else{i.reportValidity()}break;case"reset":i.reset();break}}t.preventDefault()}}}t.prototype.loadingChanged=function(t,e){var a=this;if(!!t&&!e){this.hasLoader=true}if(!t&&!!e){window.setTimeout((function(){a.hasLoader=false}),300)}};t.prototype.connectedCallback=function(){this.childElType=this.href?"a":"button";this.hasLoader=this.loading;this.setupTextContentObserver()};t.prototype.disconnectedCallback=function(){this.observer.disconnect()};t.prototype.componentWillLoad=function(){{this.updateHasContent();if(this.childElType==="button"&&!this.type){this.type="submit"}}};t.prototype.render=function(){var t,e,a;var o=this;var n=getElementDir(this.el);var r=this.childElType;var c=h("div",{class:CSS.buttonLoader},this.hasLoader?h("calcite-loader",{active:true,class:this.loading?CSS.loadingIn:CSS.loadingOut,inline:true,label:this.intlLoading}):null);var i=h("calcite-icon",{class:(t={},t[CSS.icon]=true,t[CSS.iconStart]=true,t),flipRtl:this.iconFlipRtl==="start"||this.iconFlipRtl==="both",icon:this.iconStart,scale:"s"});var l=h("calcite-icon",{class:(e={},e[CSS.icon]=true,e[CSS.iconEnd]=true,e),flipRtl:this.iconFlipRtl==="end"||this.iconFlipRtl==="both",icon:this.iconEnd,scale:"s"});var s=h("span",{class:CSS.content},h("slot",null));return h(r,{"aria-label":this.label,class:(a={},a[CSS_UTILITY.rtl]=n==="rtl",a[CSS.contentSlotted]=this.hasContent,a),disabled:this.disabled||this.loading,href:this.childElType==="a"&&this.href,name:this.childElType==="button"&&this.name,onClick:this.handleClick,ref:function(t){return o.childEl=t},rel:this.childElType==="a"&&this.rel,tabIndex:this.disabled||this.loading?-1:null,target:this.childElType==="a"&&this.target,type:this.childElType==="button"&&this.type},c,this.iconStart?i:null,this.hasContent?s:null,this.iconEnd?l:null)};t.prototype.setFocus=function(){return __awaiter(this,void 0,void 0,(function(){return __generator(this,(function(t){this.childEl.focus();return[2]}))}))};t.prototype.updateHasContent=function(){var t,e;var a=this.el.textContent.trim().length>0||this.el.childNodes.length>0;this.hasContent=this.el.childNodes.length===1&&((t=this.el.childNodes[0])===null||t===void 0?void 0:t.nodeName)==="#text"?((e=this.el.textContent)===null||e===void 0?void 0:e.trim().length)>0:a};t.prototype.setupTextContentObserver=function(){var t=this;{this.observer=new MutationObserver((function(){t.updateHasContent()}));this.observer.observe(this.el,{childList:true,subtree:true})}};Object.defineProperty(t.prototype,"el",{get:function(){return getElement(this)},enumerable:false,configurable:true});Object.defineProperty(t,"watchers",{get:function(){return{loading:["loadingChanged"]}},enumerable:false,configurable:true});return t}();CalciteButton.style=calciteButtonCss;export{CalciteButton as calcite_button};