import{r as registerInstance,c as createEvent,h,g as getElement}from"./index-b3673963.js";import{q as queryElementRoots,g as getElementDir,C as CSS_UTILITY}from"./dom-7b4de04f.js";import"./guid-09142681.js";var calciteLabelCss="@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}.sc-calcite-label:root{--calcite-animation-timing:300ms}.calcite-animate.sc-calcite-label{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in.sc-calcite-label{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down.sc-calcite-label{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up.sc-calcite-label{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale.sc-calcite-label{-webkit-animation-name:in-scale;animation-name:in-scale}.sc-calcite-label:root{--calcite-popper-transition:150ms ease-in-out}[hidden].sc-calcite-label-h{display:none}[alignment=start].sc-calcite-label-h,[alignment=end].sc-calcite-label-h .calcite--rtl.sc-calcite-label{text-align:left}[alignment=end].sc-calcite-label-h,[alignment=start].sc-calcite-label-h .calcite--rtl.sc-calcite-label{text-align:right}[alignment=center].sc-calcite-label-h{text-align:center}[scale=s].sc-calcite-label-h label.sc-calcite-label{font-size:var(--calcite-font-size--2);line-height:1rem;margin-bottom:0.5rem}[scale=m].sc-calcite-label-h label.sc-calcite-label{font-size:var(--calcite-font-size--1);line-height:1rem;margin-bottom:0.75rem}[scale=l].sc-calcite-label-h label.sc-calcite-label{font-size:var(--calcite-font-size-0);line-height:1.25rem;margin-bottom:1rem}.sc-calcite-label-h label.sc-calcite-label{color:var(--calcite-ui-text-1);cursor:pointer;width:100%;margin-top:0;margin-right:0;margin-left:0;line-height:1.375}[layout=default].sc-calcite-label-h label.sc-calcite-label{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;grid-gap:0.25rem;gap:0.25rem}[layout=inline].sc-calcite-label-h label.sc-calcite-label,[layout=inline-space-between].sc-calcite-label-h label.sc-calcite-label{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-direction:row;flex-direction:row;grid-gap:0.5rem;gap:0.5rem}[layout=inline][scale=l].sc-calcite-label-h label.sc-calcite-label{grid-gap:0.75rem;gap:0.75rem}[layout=inline-space-between].sc-calcite-label-h label.sc-calcite-label{-ms-flex-pack:justify;justify-content:space-between}[disabled].sc-calcite-label-h>label.sc-calcite-label{pointer-events:none;opacity:var(--calcite-ui-opacity-disabled)}.sc-calcite-label-h[disabled] .sc-calcite-label-s>*{pointer-events:none}.sc-calcite-label-h[disabled] .sc-calcite-label-s>*[disabled],.sc-calcite-label-h[disabled] .sc-calcite-label-s>*[disabled] *{--bg-opacity:1}.sc-calcite-label-h[disabled] .sc-calcite-label-s>calcite-input-message:not([active]){--bg-opacity:0}[disable-spacing].sc-calcite-label-h label.sc-calcite-label{grid-gap:0;gap:0;margin:0}";var CalciteLabel=function(){function e(e){var a=this;registerInstance(this,e);this.calciteLabelFocus=createEvent(this,"calciteLabelFocus",7);this.alignment="start";this.status="idle";this.scale="m";this.layout="default";this.handleCalciteHtmlForClicks=function(e){if(!a.for){return}var t=queryElementRoots(a.el,"#"+a.for);if(!t){return}if(!t.localName.startsWith("calcite")){return}if(e===t){return}var l=["button","input","meter","output","progress","select","textarea"];if(l.includes(e.localName)){return}var i=["calcite-button","calcite-checkbox","calcite-date","calcite-inline-editable","calcite-input","calcite-radio","calcite-radio-button","calcite-radio-button-group","calcite-radio-group","calcite-rating","calcite-select","calcite-slider","calcite-switch"];if(i.includes(e.localName)){return}for(var c=0;c<i.length;c++){if(e.closest(i[c])){return}}t.click()}}e.prototype.onClick=function(e){var a=e.target;this.calciteLabelFocus.emit({labelEl:this.el,interactedEl:a,requestedInput:this.for});this.handleCalciteHtmlForClicks(a)};e.prototype.render=function(){var e;var a=getElementDir(this.el);return h("label",{class:(e={},e[CSS_UTILITY.rtl]=a==="rtl",e),htmlFor:this.for},h("slot",null))};Object.defineProperty(e.prototype,"el",{get:function(){return getElement(this)},enumerable:false,configurable:true});return e}();CalciteLabel.style=calciteLabelCss;export{CalciteLabel as calcite_label};