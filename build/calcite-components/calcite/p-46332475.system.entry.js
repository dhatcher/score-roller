System.register(["./p-50b64705.system.js"],(function(t){"use strict";var a,e,i;return{setters:[function(t){a=t.r;e=t.h;i=t.g}],execute:function(){var n="@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{position:relative;display:block;width:100%}.track,.bar{position:absolute;top:0;height:2px}.track{z-index:0;width:100%;overflow:hidden;background:var(--calcite-ui-border-3)}.bar{background-color:var(--calcite-ui-brand);z-index:0}.indeterminate{width:20%;-webkit-animation:looping-progress-bar-ani 2200ms linear infinite;animation:looping-progress-bar-ani 2200ms linear infinite}.reversed{animation-direction:reverse}.text{padding-top:1rem;padding-bottom:0;padding-left:0;padding-right:0;text-align:center;font-size:var(--calcite-font-size--2);line-height:1rem;font-weight:var(--calcite-font-weight-medium)}@-webkit-keyframes looping-progress-bar-ani{0%{-webkit-transform:translate3d(-100%, 0, 0);transform:translate3d(-100%, 0, 0)}50%{width:40%}100%{-webkit-transform:translate3d(600%, 0, 0);transform:translate3d(600%, 0, 0)}}@keyframes looping-progress-bar-ani{0%{-webkit-transform:translate3d(-100%, 0, 0);transform:translate3d(-100%, 0, 0)}50%{width:40%}100%{-webkit-transform:translate3d(600%, 0, 0);transform:translate3d(600%, 0, 0)}}";var r=t("calcite_progress",function(){function t(t){a(this,t);this.type="determinate";this.value=0;this.reversed=false}t.prototype.render=function(){var t=this.type==="determinate";var a=t?{width:this.value*100+"%"}:{};return e("div",{"aria-label":this.label||this.text,"aria-valuemax":1,"aria-valuemin":0,"aria-valuenow":this.value,role:"progressbar"},e("div",{class:"track"},e("div",{class:{bar:true,indeterminate:this.type==="indeterminate",reversed:this.reversed},style:a})),this.text?e("div",{class:"text"},this.text):null)};Object.defineProperty(t.prototype,"el",{get:function(){return i(this)},enumerable:false,configurable:true});return t}());r.style=n}}}));