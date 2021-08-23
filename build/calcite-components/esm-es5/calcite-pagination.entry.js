var __awaiter=this&&this.__awaiter||function(t,e,i,a){function n(t){return t instanceof i?t:new i((function(e){e(t)}))}return new(i||(i=Promise))((function(i,r){function s(t){try{l(a.next(t))}catch(t){r(t)}}function o(t){try{l(a["throw"](t))}catch(t){r(t)}}function l(t){t.done?i(t.value):n(t.value).then(s,o)}l((a=a.apply(t,e||[])).next())}))};var __generator=this&&this.__generator||function(t,e){var i={label:0,sent:function(){if(r[0]&1)throw r[1];return r[1]},trys:[],ops:[]},a,n,r,s;return s={next:o(0),throw:o(1),return:o(2)},typeof Symbol==="function"&&(s[Symbol.iterator]=function(){return this}),s;function o(t){return function(e){return l([t,e])}}function l(s){if(a)throw new TypeError("Generator is already executing.");while(i)try{if(a=1,n&&(r=s[0]&2?n["return"]:s[0]?n["throw"]||((r=n["return"])&&r.call(n),0):n.next)&&!(r=r.call(n,s[1])).done)return r;if(n=0,r)s=[s[0]&2,r.value];switch(s[0]){case 0:case 1:r=s;break;case 4:i.label++;return{value:s[1],done:false};case 5:i.label++;n=s[1];s=[0];continue;case 7:s=i.ops.pop();i.trys.pop();continue;default:if(!(r=i.trys,r=r.length>0&&r[r.length-1])&&(s[0]===6||s[0]===2)){i=0;continue}if(s[0]===3&&(!r||s[1]>r[0]&&s[1]<r[3])){i.label=s[1];break}if(s[0]===6&&i.label<r[1]){i.label=r[1];r=s;break}if(r&&i.label<r[2]){i.label=r[2];i.ops.push(s);break}if(r[2])i.ops.pop();i.trys.pop();continue}s=e.call(t,i)}catch(t){s=[6,t];n=0}finally{a=r=0}if(s[0]&5)throw s[1];return{value:s[0]?s[1]:void 0,done:true}}};import{r as registerInstance,c as createEvent,h,F as Fragment,g as getElement}from"./index-b3673963.js";import{g as getElementDir}from"./dom-7b4de04f.js";import"./guid-09142681.js";var CSS={page:"page",selected:"is-selected",previous:"previous",next:"next",disabled:"is-disabled",ellipsis:"ellipsis",ellipsisStart:"ellipsis--start",ellipsisEnd:"ellipsis--end"};var TEXT={nextLabel:"next",previousLabel:"previous"};var calcitePaginationCss="@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host([scale=s]){--calcite-pagination-spacing:0.25rem 0.5rem}:host([scale=s]) .previous,:host([scale=s]) .next,:host([scale=s]) .page{font-size:var(--calcite-font-size--2);line-height:1rem;height:1.5rem}:host([scale=s]) .previous,:host([scale=s]) .next{padding-left:0.25rem;padding-right:0.25rem}:host([scale=m]){--calcite-pagination-spacing:0.5rem 0.75rem}:host([scale=m]) .previous,:host([scale=m]) .next,:host([scale=m]) .page{font-size:var(--calcite-font-size--1);line-height:1rem;height:2rem}:host([scale=m]) .previous,:host([scale=m]) .next{padding-left:0.5rem;padding-right:0.5rem}:host([scale=l]){--calcite-pagination-spacing:0.75rem 1rem}:host([scale=l]) .previous,:host([scale=l]) .next,:host([scale=l]) .page{font-size:var(--calcite-font-size-0);line-height:1.25rem;height:2.75rem}:host([scale=l]) .previous,:host([scale=l]) .next{padding-left:1rem;padding-right:1rem}:host{display:-ms-flexbox;display:flex;-webkit-writing-mode:horizontal-tb;-ms-writing-mode:lr-tb;writing-mode:horizontal-tb}:host button{outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}:host button:focus{outline:2px solid var(--calcite-ui-brand);outline-offset:-2px}.previous,.next,.page{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;background-color:transparent;border-style:none;--border-opacity:0;font-size:var(--calcite-font-size-0);line-height:1.25rem;color:var(--calcite-ui-text-3);cursor:pointer;font-family:inherit;-webkit-box-sizing:border-box;box-sizing:border-box;border-top:2px solid transparent;border-bottom:2px solid transparent}.previous:hover,.next:hover,.page:hover{color:var(--calcite-ui-text-1);-webkit-transition-property:all;transition-property:all;-webkit-transition-duration:150ms;transition-duration:150ms;-webkit-transition-timing-function:ease-in-out;transition-timing-function:ease-in-out;-webkit-transition-delay:0s;transition-delay:0s}.page:hover{border-bottom-color:var(--calcite-ui-border-2)}.page.is-selected{font-weight:var(--calcite-font-weight-medium);color:var(--calcite-ui-text-1);border-bottom-color:var(--calcite-ui-brand)}.previous:hover,.next:hover{background-color:var(--calcite-ui-foreground-2);color:var(--calcite-ui-brand)}.previous:active,.next:active{background-color:var(--calcite-ui-foreground-3)}.previous.is-disabled,.next.is-disabled{background-color:transparent;pointer-events:none}.previous.is-disabled>calcite-icon,.next.is-disabled>calcite-icon{opacity:var(--calcite-ui-opacity-disabled)}.next{margin-right:0}.page,.ellipsis{padding:var(--calcite-pagination-spacing)}.ellipsis{display:-ms-flexbox;display:flex;-ms-flex-align:end;align-items:flex-end;color:var(--calcite-ui-text-3)}";var maxPagesDisplayed=5;var CalcitePagination=function(){function t(t){var e=this;registerInstance(this,t);this.calcitePaginationUpdate=createEvent(this,"calcitePaginationUpdate",7);this.calcitePaginationChange=createEvent(this,"calcitePaginationChange",7);this.num=20;this.start=1;this.total=0;this.textLabelNext=TEXT.nextLabel;this.textLabelPrevious=TEXT.previousLabel;this.scale="m";this.previousClicked=function(){e.previousPage().then();e.emitUpdate()};this.nextClicked=function(){e.nextPage();e.emitUpdate()}}t.prototype.nextPage=function(){return __awaiter(this,void 0,void 0,(function(){return __generator(this,(function(t){this.start=Math.min(this.getLastStart(),this.start+this.num);return[2]}))}))};t.prototype.previousPage=function(){return __awaiter(this,void 0,void 0,(function(){return __generator(this,(function(t){this.start=Math.max(1,this.start-this.num);return[2]}))}))};t.prototype.getLastStart=function(){var t=this,e=t.total,i=t.num;var a=e%i===0?e-i:Math.floor(e/i)*i;return a+1};t.prototype.showLeftEllipsis=function(){return Math.floor(this.start/this.num)>3};t.prototype.showRightEllipsis=function(){return(this.total-this.start)/this.num>3};t.prototype.emitUpdate=function(){var t={start:this.start,total:this.total,num:this.num};this.calcitePaginationChange.emit(t);this.calcitePaginationUpdate.emit(t)};t.prototype.renderPages=function(){var t=this;var e=this.getLastStart();var i;var a;if(this.total/this.num<=maxPagesDisplayed){a=1+this.num;i=e-this.num}else{if(this.start/this.num<maxPagesDisplayed-1){a=1+this.num;i=1+4*this.num}else{if(this.start+3*this.num>=this.total){a=e-4*this.num;i=e-this.num}else{a=this.start-this.num;i=this.start+this.num}}}var n=[];while(a<=i){n.push(a);a=a+this.num}return n.map((function(e){return t.renderPage(e)}))};t.prototype.renderPage=function(t){var e;var i=this;var a=Math.floor(t/this.num)+(this.num===1?0:1);return h("button",{class:(e={},e[CSS.page]=true,e[CSS.selected]=t===this.start,e),onClick:function(){i.start=t;i.emitUpdate()}},a)};t.prototype.renderLeftEllipsis=function(){if(this.total/this.num>maxPagesDisplayed&&this.showLeftEllipsis()){return h("span",{class:CSS.ellipsis+" "+CSS.ellipsisStart},"…")}};t.prototype.renderRightEllipsis=function(){if(this.total/this.num>maxPagesDisplayed&&this.showRightEllipsis()){return h("span",{class:CSS.ellipsis+" "+CSS.ellipsisEnd},"…")}};t.prototype.render=function(){var t,e;var i=getElementDir(this.el);var a=this,n=a.total,r=a.num,s=a.start;var o=r===1?s<=r:s<r;var l=r===1?s+r>n:s+r>n;return h(Fragment,null,h("button",{"aria-label":this.textLabelPrevious,class:(t={},t[CSS.previous]=true,t[CSS.disabled]=o,t),disabled:o,onClick:this.previousClicked},h("calcite-icon",{dir:i,flipRtl:true,icon:"chevronLeft",scale:"s"})),n>r?this.renderPage(1):null,this.renderLeftEllipsis(),this.renderPages(),this.renderRightEllipsis(),this.renderPage(this.getLastStart()),h("button",{"aria-label":this.textLabelNext,class:(e={},e[CSS.next]=true,e[CSS.disabled]=l,e),disabled:l,onClick:this.nextClicked},h("calcite-icon",{dir:i,flipRtl:true,icon:"chevronRight",scale:"s"})))};Object.defineProperty(t.prototype,"el",{get:function(){return getElement(this)},enumerable:false,configurable:true});return t}();CalcitePagination.style=calcitePaginationCss;export{CalcitePagination as calcite_pagination};