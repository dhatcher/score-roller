var __awaiter=this&&this.__awaiter||function(t,a,e,i){function n(t){return t instanceof e?t:new e((function(a){a(t)}))}return new(e||(e=Promise))((function(e,r){function s(t){try{o(i.next(t))}catch(t){r(t)}}function l(t){try{o(i["throw"](t))}catch(t){r(t)}}function o(t){t.done?e(t.value):n(t.value).then(s,l)}o((i=i.apply(t,a||[])).next())}))};var __generator=this&&this.__generator||function(t,a){var e={label:0,sent:function(){if(r[0]&1)throw r[1];return r[1]},trys:[],ops:[]},i,n,r,s;return s={next:l(0),throw:l(1),return:l(2)},typeof Symbol==="function"&&(s[Symbol.iterator]=function(){return this}),s;function l(t){return function(a){return o([t,a])}}function o(s){if(i)throw new TypeError("Generator is already executing.");while(e)try{if(i=1,n&&(r=s[0]&2?n["return"]:s[0]?n["throw"]||((r=n["return"])&&r.call(n),0):n.next)&&!(r=r.call(n,s[1])).done)return r;if(n=0,r)s=[s[0]&2,r.value];switch(s[0]){case 0:case 1:r=s;break;case 4:e.label++;return{value:s[1],done:false};case 5:e.label++;n=s[1];s=[0];continue;case 7:s=e.ops.pop();e.trys.pop();continue;default:if(!(r=e.trys,r=r.length>0&&r[r.length-1])&&(s[0]===6||s[0]===2)){e=0;continue}if(s[0]===3&&(!r||s[1]>r[0]&&s[1]<r[3])){e.label=s[1];break}if(s[0]===6&&e.label<r[1]){e.label=r[1];r=s;break}if(r&&e.label<r[2]){e.label=r[2];e.ops.push(s);break}if(r[2])e.ops.pop();e.trys.pop();continue}s=a.call(t,e)}catch(t){s=[6,t];n=0}finally{i=r=0}if(s[0]&5)throw s[1];return{value:s[0]?s[1]:void 0,done:true}}};System.register(["./p-50b64705.system.js","./p-2c235db8.system.js","./p-95dfb659.system.js","./p-8f07cd77.system.js","./p-a8650c17.system.js"],(function(t){"use strict";var a,e,i,n,r,s,l,o,h,u;return{setters:[function(t){a=t.r;e=t.h;i=t.g;n=t.c;r=t.H},function(t){s=t.g},function(t){l=t.g},function(t){o=t.h;h=t.k},function(t){u=t.c}],execute:function(){function c(t,a,e){var i=a[0]-t[0];var n=e[0]-a[0];var r=a[1]-t[1];var s=e[1]-a[1];var l=r/(i||n<0&&0);var o=s/(n||i<0&&0);var h=(l*n+o*i)/(i+n);return(Math.sign(l)+Math.sign(o))*Math.min(Math.abs(l),Math.abs(o),.5*Math.abs(h))||0}function m(t,a,e){var i=a[0]-t[0];var n=a[1]-t[1];return i?(3*n/i-e)/2:e}function d(t,a,e,i,n){var r=t[0],s=t[1];var l=a[0],o=a[1];var h=(l-r)/3;var u=n([r+h,s+h*e]).join(",");var c=n([l-h,o-h*i]).join(",");var m=n([l,o]).join(",");return"C "+u+" "+c+" "+m}function p(t){var a=t.width,e=t.height,i=t.min,n=t.max;var r=n[0]-i[0];var s=n[1]-i[1];return function(t){var i=t[0]/r*a;var n=e-t[1]/s*e;return[i,n]}}function b(t){var a=t[0],e=a[0],i=a[1];var n=[e,i];var r=[e,i];return t.reduce((function(t,a){var e=t.min,i=t.max;var n=a[0],r=a[1];return{min:[Math.min(e[0],n),Math.min(e[1],r)],max:[Math.max(i[0],n),Math.max(i[1],r)]}}),{min:n,max:r})}function f(t){var a=t.data,e=t.min,i=t.max,n=t.t;if(a.length===0){return""}var r=n(a[0]),s=r[0],l=r[1];var o=n(e),h=o[0],u=o[1];var p=n(i)[0];var b;var f;var g;var v=a.reduce((function(t,e,i){f=a[i-2];g=a[i-1];if(i>1){var r=c(f,g,e);var s=b===undefined?m(f,g,r):b;var l=d(f,g,s,r,n);b=r;return t+" "+l}return t}),"M "+h+","+u+" L "+h+","+l+" L "+s+","+l);var x=a[a.length-1];var y=d(g,x,b,m(g,x,b),n);return v+" "+y+" L "+p+","+u+" Z"}var g="@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:block}.svg{fill:currentColor;stroke:transparent;margin:0;padding:0;display:block}";var v=t("calcite_graph",function(){function t(t){a(this,t);this.data=[];this.width=300;this.height=100;this.graphId="calcite-graph-"+s()}t.prototype.render=function(){var t=this,a=t.data,i=t.colorStops,n=t.width,r=t.height,s=t.highlightMax,l=t.highlightMin;var o=this.graphId;if(!a||a.length===0){return e("svg",{class:"svg",height:r,preserveAspectRatio:"none",viewBox:"0 0 "+n+" "+r,width:n})}var h=b(a),u=h.min,c=h.max;var m=p({min:u,max:c,width:n,height:r});var d=m([l,c[1]])[0];var g=m([s,c[1]])[0];var v=f({data:a,min:u,max:c,t:m});var x=i?"url(#linear-gradient-"+o+")":undefined;return e("svg",{class:"svg",height:r,preserveAspectRatio:"none",viewBox:"0 0 "+n+" "+r,width:n},i?e("defs",null,e("linearGradient",{id:"linear-gradient-"+o,x1:"0",x2:"1",y1:"0",y2:"0"},i.map((function(t){var a=t.offset,i=t.color,n=t.opacity;return e("stop",{offset:a*100+"%","stop-color":i,"stop-opacity":n})})))):null,l!==undefined?[e("mask",{height:"100%",id:o+"1",width:"100%",x:"0%",y:"0%"},e("path",{d:"\n            M 0,0\n            L "+(d-1)+",0\n            L "+(d-1)+","+r+"\n            L 0,"+r+"\n            Z\n          ",fill:"white"})),e("mask",{height:"100%",id:o+"2",width:"100%",x:"0%",y:"0%"},e("path",{d:"\n            M "+(d+1)+",0\n            L "+(g-1)+",0\n            L "+(g-1)+","+r+"\n            L "+(d+1)+", "+r+"\n            Z\n          ",fill:"white"})),e("mask",{height:"100%",id:o+"3",width:"100%",x:"0%",y:"0%"},e("path",{d:"\n                M "+(g+1)+",0\n                L "+n+",0\n                L "+n+","+r+"\n                L "+(g+1)+", "+r+"\n                Z\n              ",fill:"white"})),e("path",{class:"graph-path",d:v,fill:x,mask:"url(#"+o+"1)"}),e("path",{class:"graph-path--highlight",d:v,fill:x,mask:"url(#"+o+"2)"}),e("path",{class:"graph-path",d:v,fill:x,mask:"url(#"+o+"3)"})]:e("path",{class:"graph-path",d:v,fill:x}))};Object.defineProperty(t.prototype,"el",{get:function(){return i(this)},enumerable:false,configurable:true});return t}());v.style=g;var x='@charset "UTF-8";@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:block}.container{display:block;padding:7px 0;margin:7px 0;position:relative}:host([disabled]){opacity:var(--calcite-ui-opacity-disabled);pointer-events:none}:host([disabled]) .track__range,:host([disabled]) .tick--active{background-color:var(--calcite-ui-text-3)}:host([disabled]) .graph .graph-path--highlight{fill:var(--calcite-ui-text-3)}:host([label-handles]) .container,:host([precise]:not([precise=false])) .container{margin-top:21px}:host([label-ticks]),:host([precise]:not([precise=false])) .container--range{margin-bottom:21px}:host([precise]:not([precise=false])[label-handles]) .container{margin-top:35px}:host([precise]:not([precise=false])[label-handles]) .container--range{margin-bottom:35px}.thumb{position:absolute;border:none;background:transparent;cursor:pointer;font-family:inherit;z-index:2;outline:none;padding:0;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:center;align-items:center;-webkit-transform:translate(7px, -8px);transform:translate(7px, -8px)}.thumb .handle__label{font-size:0.75rem;line-height:1.5;font-weight:500;line-height:1;color:var(--calcite-ui-text-2);margin-bottom:5px}.thumb .handle__label.static,.thumb .handle__label.transformed{opacity:0;position:absolute;top:0;bottom:0}.thumb .handle__label.hyphen::after{content:"—";display:inline-block;width:1em}.thumb .handle{outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;height:14px;width:14px;-webkit-box-sizing:border-box;box-sizing:border-box;border-radius:100%;background-color:var(--calcite-ui-foreground-1);-webkit-box-shadow:0 0 0 2px var(--calcite-ui-text-3) inset;box-shadow:0 0 0 2px var(--calcite-ui-text-3) inset;-webkit-transition:border 0.25s ease, background-color 0.25s ease, -webkit-box-shadow 0.25s ease;transition:border 0.25s ease, background-color 0.25s ease, -webkit-box-shadow 0.25s ease;transition:border 0.25s ease, background-color 0.25s ease, box-shadow 0.25s ease;transition:border 0.25s ease, background-color 0.25s ease, box-shadow 0.25s ease, -webkit-box-shadow 0.25s ease}.thumb .handle-extension{width:2px;height:7px;background-color:var(--calcite-ui-text-3)}.thumb:hover .handle{-webkit-box-shadow:0 0 0 3px var(--calcite-ui-brand) inset;box-shadow:0 0 0 3px var(--calcite-ui-brand) inset}.thumb:hover .handle-extension{background-color:var(--calcite-ui-brand)}.thumb:focus .handle{outline:2px solid var(--calcite-ui-brand);outline-offset:2px;outline-offset:2px}.thumb:focus .handle-extension{background-color:var(--calcite-ui-brand)}.thumb--minValue{-webkit-transform:translate(-7px, -8px);transform:translate(-7px, -8px)}:host([label-handles]) .thumb{-webkit-transform:translate(50%, -25px);transform:translate(50%, -25px)}:host([label-handles]) .thumb--minValue{-webkit-transform:translate(-50%, -25px);transform:translate(-50%, -25px)}:host([has-histogram][label-handles]) .thumb{-webkit-transform:translate(50%, -8px);transform:translate(50%, -8px)}:host([has-histogram][label-handles]) .thumb .handle__label{margin-bottom:unset;margin-top:5px}:host([has-histogram][label-handles]) .thumb--minValue{-webkit-transform:translate(-50%, -8px);transform:translate(-50%, -8px)}:host([precise]:not([precise=false])) .thumb{-webkit-transform:translate(7px, -21px);transform:translate(7px, -21px)}:host([precise]:not([precise=false])) .thumb--minValue{-webkit-transform:translate(-7px, -2px);transform:translate(-7px, -2px)}:host([precise]:not([precise=false])) .thumb--minValue .handle__label{margin-bottom:unset;margin-top:5px}:host([has-histogram][precise]:not([precise=false])) .thumb{-webkit-transform:translate(7px, -2px);transform:translate(7px, -2px)}:host([has-histogram][precise]:not([precise=false])) .thumb--minValue{-webkit-transform:translate(-50%, -2px);transform:translate(-50%, -2px)}:host([ticks][precise]:not([precise=false])) .thumb{-webkit-transform:translate(7px, -20px);transform:translate(7px, -20px)}:host([ticks][precise]:not([precise=false])) .thumb--minValue{-webkit-transform:translate(-7px, -3px);transform:translate(-7px, -3px)}:host([has-histogram][ticks][precise]:not([precise=false])) .thumb{-webkit-transform:translate(7px, -3px);transform:translate(7px, -3px)}:host([has-histogram][ticks][precise]:not([precise=false])) .thumb--minValue{-webkit-transform:translate(-50%, -3px);transform:translate(-50%, -3px)}:host([label-handles][precise]:not([precise=false])) .thumb{-webkit-transform:translate(50%, -38px);transform:translate(50%, -38px)}:host([label-handles][precise]:not([precise=false])) .thumb--minValue{-webkit-transform:translate(-50%, -2px);transform:translate(-50%, -2px)}:host([has-histogram][label-handles][precise]:not([precise=false])) .thumb{-webkit-transform:translate(50%, -2px);transform:translate(50%, -2px)}:host([has-histogram][label-handles][precise]:not([precise=false])) .thumb--minValue{-webkit-transform:translate(-50%, -2px);transform:translate(-50%, -2px)}:host([ticks][label-handles][precise]:not([precise=false])) .thumb{-webkit-transform:translate(50%, -37px);transform:translate(50%, -37px)}:host([ticks][label-handles][precise]:not([precise=false])) .thumb--minValue{-webkit-transform:translate(-50%, -3px);transform:translate(-50%, -3px)}:host([has-histogram][ticks][label-handles][precise]:not([precise=false])) .thumb{-webkit-transform:translate(50%, -3px);transform:translate(50%, -3px)}:host([has-histogram][ticks][label-handles][precise]:not([precise=false])) .thumb--minValue{-webkit-transform:translate(-50%, -3px);transform:translate(-50%, -3px)}.thumb:focus,.thumb--active{z-index:3}.thumb:focus .handle,.thumb--active .handle{background-color:var(--calcite-ui-brand);-webkit-box-shadow:0 0 8px 0 rgba(0, 0, 0, 0.16);box-shadow:0 0 8px 0 rgba(0, 0, 0, 0.16)}.thumb:hover.thumb--precise:after,.thumb:focus.thumb--precise:after,.thumb--active.thumb--precise:after{background-color:var(--calcite-ui-brand)}.track{height:2px;border-radius:0;z-index:1;background-color:var(--calcite-ui-border-2);-webkit-transition:all 250ms ease-in;transition:all 250ms ease-in;position:relative}.track__range{position:absolute;top:0;height:2px;background-color:var(--calcite-ui-brand)}.container--range .track__range:hover{cursor:ew-resize}.container--range .track__range:after{content:"";position:absolute;top:-5px;width:100%;height:14px}.tick{position:absolute;top:-2px;width:2px;height:4px;left:var(--calcite-ui-border-1-offset);margin-left:-2px;border:1px solid var(--calcite-ui-foreground-1);background-color:var(--calcite-ui-border-1)}.tick--active{background-color:var(--calcite-ui-brand)}.tick__label{position:absolute;font-size:0.75rem;line-height:1.5;font-weight:500;color:var(--calcite-ui-text-2);width:4em;margin:14px -2em;text-align:center;display:block;pointer-events:none}.tick__label--min{left:0;margin:14px -3px;text-align:left;-webkit-transition:opacity 150ms;transition:opacity 150ms}.tick__label--max{left:unset;right:0;margin:14px -3px;text-align:right;-webkit-transition:opacity 50ms;transition:opacity 50ms}:host([has-histogram][label-handles]) .tick__label--min,:host([has-histogram][label-handles]) .tick__label--max{margin:6px -3px;font-weight:300;color:var(--calcite-ui-text-3)}:host([has-histogram][precise]:not([precise=false])) .tick__label--min,:host([has-histogram][precise]:not([precise=false])) .tick__label--max{margin:6px -3px;font-weight:300;color:var(--calcite-ui-text-3)}.graph{width:100%;height:48px;position:relative;color:var(--calcite-ui-foreground-2)}.graph svg{position:absolute;width:100%;height:48px}.graph .graph-path--highlight{fill:var(--calcite-ui-brand);opacity:0.25}:host([mirrored]:not([has-histogram])) .tick__label--min{right:0;left:unset;text-align:right}:host([mirrored]:not([has-histogram])) .tick__label--max{right:unset;left:0;text-align:left}';var y=t("calcite_slider",function(){function t(t){var e=this;a(this,t);this.calciteSliderChange=n(this,"calciteSliderChange",7);this.calciteSliderUpdate=n(this,"calciteSliderUpdate",7);this.disabled=false;this.hasHistogram=false;this.max=100;this.min=0;this.mirrored=false;this.snap=false;this.step=1;this.value=null;this.guid="calcite-slider-"+s();this.isRange=false;this.activeProp="value";this.minMaxValueRange=null;this.minValueDragRange=null;this.maxValueDragRange=null;this.tickValues=[];this.dragUpdate=function(t){t.preventDefault();if(e.dragProp){var a=e.translate(t.clientX||t.pageX);if(e.isRange&&e.dragProp==="minMaxValue"){if(e.minValueDragRange&&e.maxValueDragRange&&e.minMaxValueRange){var i=a-e.minValueDragRange;var n=a+e.maxValueDragRange;if(n<=e.max&&i>=e.min&&n-i===e.minMaxValueRange){e.minValue=e.clamp(i,"minValue");e.maxValue=e.clamp(n,"maxValue")}}else{e.minValueDragRange=a-e.minValue;e.maxValueDragRange=e.maxValue-a;e.minMaxValueRange=e.maxValue-e.minValue}}else{e[e.dragProp]=e.clamp(a,e.dragProp)}e.emitChange()}};this.dragEnd=function(){document.removeEventListener("pointermove",e.dragUpdate);document.removeEventListener("pointerup",e.dragEnd);document.removeEventListener("pointercancel",e.dragEnd);e.emitChange();e.focusActiveHandle();e.dragProp=null;e.minValueDragRange=null;e.maxValueDragRange=null;e.minMaxValueRange=null}}t.prototype.histogramWatcher=function(t){this.hasHistogram=!!t};t.prototype.componentWillLoad=function(){this.isRange=!!(this.maxValue||this.maxValue===0);this.tickValues=this.generateTickValues();this.value=this.clamp(this.value);if(this.snap){this.value=this.getClosestStep(this.value)}if(this.histogram){this.hasHistogram=true}this.emitChange()};t.prototype.componentDidRender=function(){if(this.labelHandles){this.adjustHostObscuredHandleLabel("value");if(this.isRange){this.adjustHostObscuredHandleLabel("minValue");if(!(this.precise&&this.isRange&&!this.hasHistogram)){this.hyphenateCollidingRangeHandleLabels()}}}this.hideObscuredBoundingTickLabels()};t.prototype.render=function(){var t=this;var a=this.el.id||this.guid;var i=this.minValue||this.min;var n=this.maxValue||this.value;var s=this.isRange?"maxValue":"value";var l=this[s];var o=this.getUnitInterval(i)*100;var h=this.getUnitInterval(n)*100;var u=this.shouldMirror();var c=(u?100-o:o)+"%";var m=(u?h:100-h)+"%";var d=e("button",{"aria-label":this.isRange?this.maxLabel:this.minLabel,"aria-orientation":"horizontal","aria-valuemax":this.max,"aria-valuemin":this.min,"aria-valuenow":l,class:{thumb:true,"thumb--value":true,"thumb--active":this.lastDragProp!=="minMaxValue"&&this.dragProp===s},disabled:this.disabled,onBlur:function(){return t.activeProp=null},onFocus:function(){return t.activeProp=s},onPointerDown:function(){return t.dragStart(s)},ref:function(a){return t.maxHandle=a},role:"slider",style:{right:m}},e("div",{class:"handle"}));var p=e("button",{"aria-label":this.isRange?this.maxLabel:this.minLabel,"aria-orientation":"horizontal","aria-valuemax":this.max,"aria-valuemin":this.min,"aria-valuenow":l,class:{thumb:true,"thumb--value":true,"thumb--active":this.lastDragProp!=="minMaxValue"&&this.dragProp===s},disabled:this.disabled,onBlur:function(){return t.activeProp=null},onFocus:function(){return t.activeProp=s},onPointerDown:function(){return t.dragStart(s)},ref:function(a){return t.maxHandle=a},role:"slider",style:{right:m}},e("span",{"aria-hidden":"true",class:"handle__label handle__label--value"},l?l.toLocaleString():l),e("span",{"aria-hidden":"true",class:"handle__label handle__label--value static"},l?l.toLocaleString():l),e("span",{"aria-hidden":"true",class:"handle__label handle__label--value transformed"},l?l.toLocaleString():l),e("div",{class:"handle"}));var b=e("button",{"aria-label":this.isRange?this.maxLabel:this.minLabel,"aria-orientation":"horizontal","aria-valuemax":this.max,"aria-valuemin":this.min,"aria-valuenow":l,class:{thumb:true,"thumb--value":true,"thumb--active":this.lastDragProp!=="minMaxValue"&&this.dragProp===s},disabled:this.disabled,onBlur:function(){return t.activeProp=null},onFocus:function(){return t.activeProp=s},onPointerDown:function(){return t.dragStart(s)},ref:function(a){return t.maxHandle=a},role:"slider",style:{right:m}},e("div",{class:"handle"}),e("span",{"aria-hidden":"true",class:"handle__label handle__label--value"},l?l.toLocaleString():l),e("span",{"aria-hidden":"true",class:"handle__label handle__label--value static"},l?l.toLocaleString():l),e("span",{"aria-hidden":"true",class:"handle__label handle__label--value transformed"},l?l.toLocaleString():l));var f=e("button",{"aria-label":this.isRange?this.maxLabel:this.minLabel,"aria-orientation":"horizontal","aria-valuemax":this.max,"aria-valuemin":this.min,"aria-valuenow":l,class:{thumb:true,"thumb--value":true,"thumb--active":this.lastDragProp!=="minMaxValue"&&this.dragProp===s,"thumb--precise":true},disabled:this.disabled,onBlur:function(){return t.activeProp=null},onFocus:function(){return t.activeProp=s},onPointerDown:function(){return t.dragStart(s)},ref:function(a){return t.maxHandle=a},role:"slider",style:{right:m}},e("div",{class:"handle"}),e("div",{class:"handle-extension"}));var g=e("button",{"aria-label":this.isRange?this.maxLabel:this.minLabel,"aria-orientation":"horizontal","aria-valuemax":this.max,"aria-valuemin":this.min,"aria-valuenow":l,class:{thumb:true,"thumb--value":true,"thumb--active":this.lastDragProp!=="minMaxValue"&&this.dragProp===s,"thumb--precise":true},disabled:this.disabled,onBlur:function(){return t.activeProp=null},onFocus:function(){return t.activeProp=s},onPointerDown:function(){return t.dragStart(s)},ref:function(a){return t.maxHandle=a},role:"slider",style:{right:m}},e("div",{class:"handle-extension"}),e("div",{class:"handle"}));var v=e("button",{"aria-label":this.isRange?this.maxLabel:this.minLabel,"aria-orientation":"horizontal","aria-valuemax":this.max,"aria-valuemin":this.min,"aria-valuenow":l,class:{thumb:true,"thumb--value":true,"thumb--active":this.lastDragProp!=="minMaxValue"&&this.dragProp===s,"thumb--precise":true},disabled:this.disabled,onBlur:function(){return t.activeProp=null},onFocus:function(){return t.activeProp=s},onPointerDown:function(){return t.dragStart(s)},ref:function(a){return t.maxHandle=a},role:"slider",style:{right:m}},e("span",{"aria-hidden":"true",class:"handle__label handle__label--value"},l?l.toLocaleString():l),e("span",{"aria-hidden":"true",class:"handle__label handle__label--value static"},l?l.toLocaleString():l),e("span",{"aria-hidden":"true",class:"handle__label handle__label--value transformed"},l?l.toLocaleString():l),e("div",{class:"handle"}),e("div",{class:"handle-extension"}));var x=e("button",{"aria-label":this.isRange?this.maxLabel:this.minLabel,"aria-orientation":"horizontal","aria-valuemax":this.max,"aria-valuemin":this.min,"aria-valuenow":l,class:{thumb:true,"thumb--value":true,"thumb--active":this.lastDragProp!=="minMaxValue"&&this.dragProp===s,"thumb--precise":true},disabled:this.disabled,onBlur:function(){return t.activeProp=null},onFocus:function(){return t.activeProp=s},onPointerDown:function(){return t.dragStart(s)},ref:function(a){return t.maxHandle=a},role:"slider",style:{right:m}},e("div",{class:"handle-extension"}),e("div",{class:"handle"}),e("span",{"aria-hidden":"true",class:"handle__label handle__label--value"},l?l.toLocaleString():l),e("span",{"aria-hidden":"true",class:"handle__label handle__label--value static"},l?l.toLocaleString():l),e("span",{"aria-hidden":"true",class:"handle__label handle__label--value transformed"},l?l.toLocaleString():l));var y=e("button",{"aria-label":this.minLabel,"aria-orientation":"horizontal","aria-valuemax":this.max,"aria-valuemin":this.min,"aria-valuenow":this.minValue,class:{thumb:true,"thumb--minValue":true,"thumb--active":this.dragProp==="minValue"},disabled:this.disabled,onBlur:function(){return t.activeProp=null},onFocus:function(){return t.activeProp="minValue"},onPointerDown:function(){return t.dragStart("minValue")},ref:function(a){return t.minHandle=a},role:"slider",style:{left:c}},e("div",{class:"handle"}));var k=e("button",{"aria-label":this.minLabel,"aria-orientation":"horizontal","aria-valuemax":this.max,"aria-valuemin":this.min,"aria-valuenow":this.minValue,class:{thumb:true,"thumb--minValue":true,"thumb--active":this.dragProp==="minValue"},disabled:this.disabled,onBlur:function(){return t.activeProp=null},onFocus:function(){return t.activeProp="minValue"},onPointerDown:function(){return t.dragStart("minValue")},ref:function(a){return t.minHandle=a},role:"slider",style:{left:c}},e("span",{"aria-hidden":"true",class:"handle__label handle__label--minValue"},this.minValue&&this.minValue.toLocaleString()),e("span",{"aria-hidden":"true",class:"handle__label handle__label--minValue static"},this.minValue&&this.minValue.toLocaleString()),e("span",{"aria-hidden":"true",class:"handle__label handle__label--minValue transformed"},this.minValue&&this.minValue.toLocaleString()),e("div",{class:"handle"}));var w=e("button",{"aria-label":this.minLabel,"aria-orientation":"horizontal","aria-valuemax":this.max,"aria-valuemin":this.min,"aria-valuenow":this.minValue,class:{thumb:true,"thumb--minValue":true,"thumb--active":this.dragProp==="minValue"},disabled:this.disabled,onBlur:function(){return t.activeProp=null},onFocus:function(){return t.activeProp="minValue"},onPointerDown:function(){return t.dragStart("minValue")},ref:function(a){return t.minHandle=a},role:"slider",style:{left:c}},e("div",{class:"handle"}),e("span",{"aria-hidden":"true",class:"handle__label handle__label--minValue"},this.minValue&&this.minValue.toLocaleString()),e("span",{"aria-hidden":"true",class:"handle__label handle__label--minValue static"},this.minValue&&this.minValue.toLocaleString()),e("span",{"aria-hidden":"true",class:"handle__label handle__label--minValue transformed"},this.minValue&&this.minValue.toLocaleString()));var _=e("button",{"aria-label":this.minLabel,"aria-orientation":"horizontal","aria-valuemax":this.max,"aria-valuemin":this.min,"aria-valuenow":this.minValue,class:{thumb:true,"thumb--minValue":true,"thumb--active":this.dragProp==="minValue","thumb--precise":true},disabled:this.disabled,onBlur:function(){return t.activeProp=null},onFocus:function(){return t.activeProp="minValue"},onPointerDown:function(){return t.dragStart("minValue")},ref:function(a){return t.minHandle=a},role:"slider",style:{left:c}},e("div",{class:"handle-extension"}),e("div",{class:"handle"}));var V=e("button",{"aria-label":this.minLabel,"aria-orientation":"horizontal","aria-valuemax":this.max,"aria-valuemin":this.min,"aria-valuenow":this.minValue,class:{thumb:true,"thumb--minValue":true,"thumb--active":this.dragProp==="minValue","thumb--precise":true},disabled:this.disabled,onBlur:function(){return t.activeProp=null},onFocus:function(){return t.activeProp="minValue"},onPointerDown:function(){return t.dragStart("minValue")},ref:function(a){return t.minHandle=a},role:"slider",style:{left:c}},e("div",{class:"handle-extension"}),e("div",{class:"handle"}),e("span",{"aria-hidden":"true",class:"handle__label handle__label--minValue"},this.minValue&&this.minValue.toLocaleString()),e("span",{"aria-hidden":"true",class:"handle__label handle__label--minValue static"},this.minValue&&this.minValue.toLocaleString()),e("span",{"aria-hidden":"true",class:"handle__label handle__label--minValue transformed"},this.minValue&&this.minValue.toLocaleString()));return e(r,{id:a,onTouchStart:this.handleTouchStart},e("div",{class:{container:true,"container--range":this.isRange}},this.renderGraph(),e("div",{class:"track"},e("div",{class:"track__range",onPointerDown:function(){return t.dragStart("minMaxValue")},style:{left:(u?100-h:o)+"%",right:(u?o:100-h)+"%"}}),e("div",{class:"ticks"},this.tickValues.map((function(a){var r=t.getUnitInterval(a)*100+"%";return e("span",{class:{tick:true,"tick--active":a>=i&&a<=n},style:{left:u?"":r,right:u?r:""}},t.renderTickLabel(a))})))),!this.precise&&!this.labelHandles&&this.isRange&&y,!this.hasHistogram&&!this.precise&&this.labelHandles&&this.isRange&&k,this.precise&&!this.labelHandles&&this.isRange&&_,this.precise&&this.labelHandles&&this.isRange&&V,this.hasHistogram&&!this.precise&&this.labelHandles&&this.isRange&&w,!this.precise&&!this.labelHandles&&d,!this.hasHistogram&&!this.precise&&this.labelHandles&&p,!this.hasHistogram&&this.precise&&!this.labelHandles&&f,this.hasHistogram&&this.precise&&!this.labelHandles&&g,!this.hasHistogram&&this.precise&&this.labelHandles&&v,this.hasHistogram&&!this.precise&&this.labelHandles&&b,this.hasHistogram&&this.precise&&this.labelHandles&&x))};t.prototype.renderGraph=function(){return this.histogram?e("div",{class:"graph"},e("calcite-graph",{colorStops:this.histogramStops,data:this.histogram,height:48,highlightMax:this.isRange?this.maxValue:this.value,highlightMin:this.isRange?this.minValue:this.min,width:300})):null};t.prototype.renderTickLabel=function(t){var a=t===this.min;var i=t===this.max;var n=e("span",{class:{tick__label:true,"tick__label--min":a,"tick__label--max":i}},t.toLocaleString());if(this.labelTicks&&!this.hasHistogram&&!this.isRange){return n}if(this.labelTicks&&!this.hasHistogram&&this.isRange&&!this.precise&&!this.labelHandles){return n}if(this.labelTicks&&!this.hasHistogram&&this.isRange&&!this.precise&&this.labelHandles){return n}if(this.labelTicks&&!this.hasHistogram&&this.isRange&&this.precise&&(a||i)){return n}if(this.labelTicks&&this.hasHistogram&&!this.precise&&!this.labelHandles){return n}if(this.labelTicks&&this.hasHistogram&&this.precise&&!this.labelHandles&&(a||i)){return n}if(this.labelTicks&&this.hasHistogram&&!this.precise&&this.labelHandles&&(a||i)){return n}if(this.labelTicks&&this.hasHistogram&&this.precise&&this.labelHandles&&(a||i)){return n}return null};t.prototype.handleLabelFocus=function(t){if(t.detail.interactedEl!==this.el&&o(t.detail.labelEl,this.el)){this.setFocus()}};t.prototype.keyDownHandler=function(t){var a=this.shouldMirror();var e=this,i=e.activeProp,n=e.max,r=e.min,s=e.pageStep,o=e.step;var h=this[i];var u=l(t.key);if(u==="Enter"||u===" "){t.preventDefault();return}var c;if(u==="ArrowUp"||u==="ArrowRight"){var m=a&&u==="ArrowRight"?-1:1;c=h+o*m}else if(u==="ArrowDown"||u==="ArrowLeft"){var m=a&&u==="ArrowLeft"?-1:1;c=h-o*m}else if(u==="PageUp"){if(s){c=h+s}}else if(u==="PageDown"){if(s){c=h-s}}else if(u==="Home"){c=r}else if(u==="End"){c=n}if(isNaN(c)){return}t.preventDefault();this[i]=this.clamp(c,i);this.emitChange()};t.prototype.clickHandler=function(){this.focusActiveHandle()};t.prototype.pointerDownHandler=function(t){var a=t.clientX||t.pageX;var e=this.translate(a);var i="value";if(this.isRange){var n=e>=this.minValue&&e<=this.maxValue;if(n&&this.lastDragProp==="minMaxValue"){i="minMaxValue"}else{var r=Math.abs(this.maxValue-e)<Math.abs(this.minValue-e);i=r?"maxValue":"minValue"}}this[i]=this.clamp(e,i);this.dragStart(i)};t.prototype.handleTouchStart=function(t){t.preventDefault()};t.prototype.setFocus=function(){return __awaiter(this,void 0,void 0,(function(){var t;return __generator(this,(function(a){t=this.minHandle?this.minHandle:this.maxHandle;t.focus();return[2]}))}))};t.prototype.shouldMirror=function(){return this.mirrored&&!this.hasHistogram};t.prototype.generateTickValues=function(){var t=[];var a=this.min;while(this.ticks&&a<this.max+this.ticks){t.push(a);a=a+this.ticks}return t};t.prototype.dragStart=function(t){this.dragProp=t;this.lastDragProp=this.dragProp;this.activeProp=t;document.addEventListener("pointermove",this.dragUpdate);document.addEventListener("pointerup",this.dragEnd);document.addEventListener("pointercancel",this.dragEnd)};t.prototype.focusActiveHandle=function(){switch(this.dragProp){default:case"maxValue":this.maxHandle.focus();break;case"minValue":this.minHandle.focus();break;case"minMaxValue":break}};t.prototype.emitChange=function(){this.calciteSliderChange.emit();this.calciteSliderUpdate.emit()};t.prototype.clamp=function(t,a){t=u(t,this.min,this.max);if(a==="maxValue"){t=Math.max(t,this.minValue)}if(a==="minValue"){t=Math.min(t,this.maxValue)}return t};t.prototype.translate=function(t){var a=this.max-this.min;var e=this.el.getBoundingClientRect(),i=e.left,n=e.width;var r=(t-i)/n;var s=this.shouldMirror();var l=this.clamp(this.min+a*(s?1-r:r));if(this.snap&&this.step){l=this.getClosestStep(l)}return l};t.prototype.getClosestStep=function(t){t=this.clamp(t);if(this.step){var a=Math.round(t/this.step)*this.step;t=this.clamp(a)}return t};t.prototype.getFontSizeForElement=function(t){return Number(window.getComputedStyle(t).getPropertyValue("font-size").match(/\d+/)[0])};t.prototype.getUnitInterval=function(t){t=this.clamp(t);var a=this.max-this.min;return(t-this.min)/a};t.prototype.adjustHostObscuredHandleLabel=function(t){var a=this.el.shadowRoot.querySelector(".handle__label--"+t);var e=this.el.shadowRoot.querySelector(".handle__label--"+t+".static");var i=this.el.shadowRoot.querySelector(".handle__label--"+t+".transformed");var n=e.getBoundingClientRect();var r=this.getHostOffset(n.left,n.right);a.style.transform="translateX("+r+"px)";i.style.transform="translateX("+r+"px)"};t.prototype.hyphenateCollidingRangeHandleLabels=function(){var t=this.el.shadowRoot;var a=this.shouldMirror();var e=a?"value":"minValue";var i=a?"minValue":"value";var n=t.querySelector(".handle__label--"+e);var r=t.querySelector(".handle__label--"+e+".static");var s=t.querySelector(".handle__label--"+e+".transformed");var l=this.getHostOffset(r.getBoundingClientRect().left,r.getBoundingClientRect().right);var o=t.querySelector(".handle__label--"+i);var h=t.querySelector(".handle__label--"+i+".static");var u=t.querySelector(".handle__label--"+i+".transformed");var c=this.getHostOffset(h.getBoundingClientRect().left,h.getBoundingClientRect().right);var m=this.getFontSizeForElement(n);var d=this.getRangeLabelOverlap(s,u);var p=n;var b=m/2;if(d>0){p.classList.add("hyphen");if(c===0&&l===0){var f=d/2-b;if(Math.sign(f)===-1){f=Math.abs(f)}else{f=-f}var g=this.getHostOffset(s.getBoundingClientRect().left+f-b,s.getBoundingClientRect().right+f-b);var v=d/2;var x=this.getHostOffset(u.getBoundingClientRect().left+v,u.getBoundingClientRect().right+v);if(g!==0){f+=g;v+=g}if(x!==0){f+=x;v+=x}n.style.transform="translateX("+f+"px)";s.style.transform="translateX("+(f-b)+"px)";o.style.transform="translateX("+v+"px)";u.style.transform="translateX("+v+"px)"}else if(l>0||c>0){n.style.transform="translateX("+(l+b)+"px)";o.style.transform="translateX("+(d+c)+"px)";u.style.transform="translateX("+(d+c)+"px)"}else if(l<0||c<0){var f=Math.abs(l)+d-b;if(Math.sign(f)===-1){f=Math.abs(f)}else{f=-f}n.style.transform="translateX("+f+"px)";s.style.transform="translateX("+(f-b)+"px)"}}else{p.classList.remove("hyphen");n.style.transform="translateX("+l+"px)";s.style.transform="translateX("+l+"px)";o.style.transform="translateX("+c+"px)";u.style.transform="translateX("+c+"px)"}};t.prototype.hideObscuredBoundingTickLabels=function(){if(!this.hasHistogram&&!this.isRange&&!this.labelHandles&&!this.precise){return}if(!this.hasHistogram&&!this.isRange&&this.labelHandles&&!this.precise){return}if(!this.hasHistogram&&!this.isRange&&!this.labelHandles&&this.precise){return}if(!this.hasHistogram&&!this.isRange&&this.labelHandles&&this.precise){return}if(!this.hasHistogram&&this.isRange&&!this.precise){return}if(this.hasHistogram&&!this.precise&&!this.labelHandles){return}var t=this.el.shadowRoot.querySelector(".thumb--minValue");var a=this.el.shadowRoot.querySelector(".thumb--value");var e=this.el.shadowRoot.querySelector(".tick__label--min");var i=this.el.shadowRoot.querySelector(".tick__label--max");if(!t&&a&&e&&i){if(this.isMinTickLabelObscured(e,a)){e.style.opacity="0"}else{e.style.opacity="1"}if(this.isMaxTickLabelObscured(i,a)){i.style.opacity="0"}else{i.style.opacity="1"}}if(t&&a&&e&&i){if(this.isMinTickLabelObscured(e,t)||this.isMinTickLabelObscured(e,a)){e.style.opacity="0"}else{e.style.opacity="1"}if(this.isMaxTickLabelObscured(i,t)||this.isMaxTickLabelObscured(i,a)&&this.hasHistogram){i.style.opacity="0"}else{i.style.opacity="1"}}};t.prototype.getHostOffset=function(t,a){var e=this.el.getBoundingClientRect();var i=7;if(t+i<e.left){return e.left-t-i}if(a-i>e.right){return-(a-e.right)+i}return 0};t.prototype.getRangeLabelOverlap=function(t,a){var e=t.getBoundingClientRect();var i=a.getBoundingClientRect();var n=this.getFontSizeForElement(t);var r=e.right+n-i.left;return Math.max(r,0)};t.prototype.isMinTickLabelObscured=function(t,a){var e=t.getBoundingClientRect();var i=a.getBoundingClientRect();return h(e,i)};t.prototype.isMaxTickLabelObscured=function(t,a){var e=t.getBoundingClientRect();var i=a.getBoundingClientRect();return h(e,i)};Object.defineProperty(t.prototype,"el",{get:function(){return i(this)},enumerable:false,configurable:true});Object.defineProperty(t,"watchers",{get:function(){return{histogram:["histogramWatcher"]}},enumerable:false,configurable:true});return t}());y.style=x}}}));