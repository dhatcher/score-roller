var __awaiter=this&&this.__awaiter||function(t,e,i,a){function n(t){return t instanceof i?t:new i((function(e){e(t)}))}return new(i||(i=Promise))((function(i,r){function o(t){try{l(a.next(t))}catch(t){r(t)}}function s(t){try{l(a["throw"](t))}catch(t){r(t)}}function l(t){t.done?i(t.value):n(t.value).then(o,s)}l((a=a.apply(t,e||[])).next())}))};var __generator=this&&this.__generator||function(t,e){var i={label:0,sent:function(){if(r[0]&1)throw r[1];return r[1]},trys:[],ops:[]},a,n,r,o;return o={next:s(0),throw:s(1),return:s(2)},typeof Symbol==="function"&&(o[Symbol.iterator]=function(){return this}),o;function s(t){return function(e){return l([t,e])}}function l(o){if(a)throw new TypeError("Generator is already executing.");while(i)try{if(a=1,n&&(r=o[0]&2?n["return"]:o[0]?n["throw"]||((r=n["return"])&&r.call(n),0):n.next)&&!(r=r.call(n,o[1])).done)return r;if(n=0,r)o=[o[0]&2,r.value];switch(o[0]){case 0:case 1:r=o;break;case 4:i.label++;return{value:o[1],done:false};case 5:i.label++;n=o[1];o=[0];continue;case 7:o=i.ops.pop();i.trys.pop();continue;default:if(!(r=i.trys,r=r.length>0&&r[r.length-1])&&(o[0]===6||o[0]===2)){i=0;continue}if(o[0]===3&&(!r||o[1]>r[0]&&o[1]<r[3])){i.label=o[1];break}if(o[0]===6&&i.label<r[1]){i.label=r[1];r=o;break}if(r&&i.label<r[2]){i.label=r[2];i.ops.push(o);break}if(r[2])i.ops.pop();i.trys.pop();continue}o=e.call(t,i)}catch(t){o=[6,t];n=0}finally{a=r=0}if(o[0]&5)throw o[1];return{value:o[0]?o[1]:void 0,done:true}}};var __spreadArray=this&&this.__spreadArray||function(t,e){for(var i=0,a=e.length,n=t.length;i<a;i++,n++)t[n]=e[i];return t};import{r as registerInstance,c as createEvent,h,H as Host,g as getElement,F as Fragment}from"./index-b3673963.js";import{g as guid}from"./guid-09142681.js";import{n as nodeListToArray,g as getElementDir,l as filterDirectChildren,d as getElementProp,C as CSS_UTILITY}from"./dom-7b4de04f.js";import{g as getKey}from"./key-ec82f942.js";var calciteTabCss="@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host([active]) section{display:block}:host{display:none;z-index:10;color:var(--calcite-ui-text-3)}:host([active]){display:block}section{height:100%;width:100%;display:none}:host([scale=s]){font-size:var(--calcite-font-size--2);line-height:1rem;padding-top:0.25rem;padding-bottom:0.25rem}:host([scale=m]){font-size:var(--calcite-font-size--1);line-height:1rem;padding-top:0.5rem;padding-bottom:0.5rem}:host([scale=l]){font-size:var(--calcite-font-size-0);line-height:1.25rem;padding-top:0.75rem;padding-bottom:0.75rem}";var CalciteTab=function(){function t(t){registerInstance(this,t);this.calciteTabRegister=createEvent(this,"calciteTabRegister",7);this.active=false;this.scale="m";this.guid="calcite-tab-title-"+guid()}t.prototype.render=function(){var t=this.el.id||this.guid;return h(Host,{"aria-expanded":this.active.toString(),"aria-labelledby":this.labeledBy,id:t,role:"tabpanel"},h("section",null,h("slot",null)))};t.prototype.componentDidLoad=function(){this.calciteTabRegister.emit()};t.prototype.componentWillRender=function(){var t;this.scale=(t=this.el.closest("calcite-tabs"))===null||t===void 0?void 0:t.scale};t.prototype.disconnectedCallback=function(){var t;(t=document.body)===null||t===void 0?void 0:t.dispatchEvent(new CustomEvent("calciteTabUnregister",{detail:this.el}))};t.prototype.tabChangeHandler=function(t){var e=this;if(t.target.closest("calcite-tabs")!==this.el.closest("calcite-tabs")){return}if(this.tab){this.active=this.tab===t.detail.tab}else{this.getTabIndex().then((function(i){e.active=i===t.detail.tab}))}};t.prototype.getTabIndex=function(){return __awaiter(this,void 0,void 0,(function(){return __generator(this,(function(t){return[2,Array.prototype.indexOf.call(nodeListToArray(this.el.parentElement.children).filter((function(t){return t.matches("calcite-tab")})),this.el)]}))}))};t.prototype.updateAriaInfo=function(t,e){if(t===void 0){t=[]}if(e===void 0){e=[]}return __awaiter(this,void 0,void 0,(function(){return __generator(this,(function(i){this.labeledBy=e[t.indexOf(this.el.id)]||null;return[2]}))}))};Object.defineProperty(t.prototype,"el",{get:function(){return getElement(this)},enumerable:false,configurable:true});return t}();CalciteTab.style=calciteTabCss;var calciteTabNavCss="@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{z-index:20;position:relative;display:-ms-flexbox;display:flex}:host([scale=s]){min-height:1.5rem}:host([scale=m]){min-height:2rem}:host([scale=l]){min-height:2.75rem}.tab-nav{display:-ms-flexbox;display:flex;width:100%;overflow:auto;-ms-flex-pack:start;justify-content:flex-start;-webkit-overflow-scrolling:touch;padding:0.25rem;margin:-0.25rem}:host([layout=center]) .tab-nav{-ms-flex-pack:center;justify-content:center}.tab-nav-active-indicator-container{width:100%;right:0;left:0;bottom:0;position:absolute;overflow:hidden;height:0.125rem}.tab-nav-active-indicator{position:absolute;bottom:0;display:block;-webkit-transition-property:all;transition-property:all;-webkit-transition-timing-function:cubic-bezier(0, 0, 0.2, 1);transition-timing-function:cubic-bezier(0, 0, 0.2, 1);background-color:var(--calcite-ui-brand);height:0.125rem}:host([position=below]) .tab-nav-active-indicator{bottom:unset;top:0}:host([position=below]) .tab-nav-active-indicator-container{bottom:unset;top:0}:host([bordered]) .tab-nav-active-indicator-container{bottom:unset}:host([bordered][position=below]) .tab-nav-active-indicator-container{bottom:0;top:unset}";var CalciteTabNav=function(){function t(t){var e=this;registerInstance(this,t);this.calciteTabChange=createEvent(this,"calciteTabChange",7);this.scale="m";this.layout="inline";this.position="below";this.bordered=false;this.animationActiveDuration=.3;this.handleContainerScroll=function(){e.activeIndicatorEl.style.transitionDuration="0s";e.updateOffsetPosition()}}t.prototype.selectedTabChanged=function(){return __awaiter(this,void 0,void 0,(function(){var t;return __generator(this,(function(e){switch(e.label){case 0:if(localStorage&&this.storageId&&this.selectedTab!==undefined&&this.selectedTab!==null){localStorage.setItem("calcite-tab-nav-"+this.storageId,JSON.stringify(this.selectedTab))}this.calciteTabChange.emit({tab:this.selectedTab});t=this;return[4,this.getTabTitleById(this.selectedTab)];case 1:t.selectedTabEl=e.sent();return[2]}}))}))};t.prototype.selectedTabElChanged=function(){this.updateOffsetPosition();this.updateActiveWidth();this.activeIndicatorEl.style.transitionDuration=this.animationActiveDuration+"s"};t.prototype.componentWillLoad=function(){var t="calcite-tab-nav-"+this.storageId;if(localStorage&&this.storageId&&localStorage.getItem(t)){var e=JSON.parse(localStorage.getItem(t));this.selectedTab=e;this.calciteTabChange.emit({tab:this.selectedTab})}};t.prototype.componentWillRender=function(){var t,e,i,a;this.layout=(t=this.el.closest("calcite-tabs"))===null||t===void 0?void 0:t.layout;this.position=(e=this.el.closest("calcite-tabs"))===null||e===void 0?void 0:e.position;this.scale=(i=this.el.closest("calcite-tabs"))===null||i===void 0?void 0:i.scale;this.bordered=(a=this.el.closest("calcite-tabs"))===null||a===void 0?void 0:a.bordered;if(this.selectedTabEl){this.updateOffsetPosition()}};t.prototype.componentDidRender=function(){var t=this;if(this.tabTitles.length&&this.tabTitles.every((function(t){return!t.active}))&&!this.selectedTab){this.tabTitles[0].getTabIdentifier().then((function(e){t.calciteTabChange.emit({tab:e})}))}};t.prototype.render=function(){var t=this;var e=getElementDir(this.el);var i=this.indicatorWidth+"px";var a=this.indicatorOffset+"px";var n=e!=="rtl"?{width:i,left:a}:{width:i,right:a};return h(Host,{role:"tablist"},h("div",{class:"tab-nav",onScroll:this.handleContainerScroll,ref:function(e){return t.tabNavEl=e}},h("div",{class:"tab-nav-active-indicator-container",ref:function(e){return t.activeIndicatorContainerEl=e}},h("div",{class:"tab-nav-active-indicator",ref:function(e){return t.activeIndicatorEl=e},style:n})),h("slot",null)))};t.prototype.resizeHandler=function(){this.activeIndicatorEl.style.transitionDuration="0s";this.updateActiveWidth();this.updateOffsetPosition()};t.prototype.focusPreviousTabHandler=function(t){var e=this.getIndexOfTabTitle(t.target,this.enabledTabTitles);var i=this.enabledTabTitles[e-1]||this.enabledTabTitles[this.enabledTabTitles.length-1];i.focus();t.stopPropagation();t.preventDefault()};t.prototype.focusNextTabHandler=function(t){var e=this.getIndexOfTabTitle(t.target,this.enabledTabTitles);var i=this.enabledTabTitles[e+1]||this.enabledTabTitles[0];i.focus();t.stopPropagation();t.preventDefault()};t.prototype.activateTabHandler=function(t){if(t.detail.tab){this.selectedTab=t.detail.tab}else{this.selectedTab=this.getIndexOfTabTitle(t.target)}t.stopPropagation();t.preventDefault()};t.prototype.updateTabTitles=function(t){if(t.target.active){this.selectedTab=t.detail}};t.prototype.globalTabChangeHandler=function(t){if(this.syncId&&t.target!==this.el&&t.target.syncId===this.syncId&&this.selectedTab!==t.detail.tab){this.selectedTab=t.detail.tab}};t.prototype.updateOffsetPosition=function(){var t,e,i,a,n;var r=getElementDir(this.el);var o=(t=this.activeIndicatorContainerEl)===null||t===void 0?void 0:t.offsetWidth;var s=(e=this.selectedTabEl)===null||e===void 0?void 0:e.offsetLeft;var l=(i=this.selectedTabEl)===null||i===void 0?void 0:i.offsetWidth;var c=o-(s+l);this.indicatorOffset=r!=="rtl"?s-((a=this.tabNavEl)===null||a===void 0?void 0:a.scrollLeft):c+((n=this.tabNavEl)===null||n===void 0?void 0:n.scrollLeft)};t.prototype.updateActiveWidth=function(){var t;this.indicatorWidth=(t=this.selectedTabEl)===null||t===void 0?void 0:t.offsetWidth};t.prototype.getIndexOfTabTitle=function(t,e){if(e===void 0){e=this.tabTitles}return e.indexOf(t)};t.prototype.getTabTitleById=function(t){return __awaiter(this,void 0,void 0,(function(){var e=this;return __generator(this,(function(i){return[2,Promise.all(this.tabTitles.map((function(t){return t.getTabIdentifier()}))).then((function(i){return e.tabTitles[i.indexOf(t)]}))]}))}))};Object.defineProperty(t.prototype,"tabTitles",{get:function(){return filterDirectChildren(this.el,"calcite-tab-title")},enumerable:false,configurable:true});Object.defineProperty(t.prototype,"enabledTabTitles",{get:function(){return filterDirectChildren(this.el,"calcite-tab-title:not([disabled])")},enumerable:false,configurable:true});Object.defineProperty(t.prototype,"el",{get:function(){return getElement(this)},enumerable:false,configurable:true});Object.defineProperty(t,"watchers",{get:function(){return{selectedTab:["selectedTabChanged"],selectedTabEl:["selectedTabElChanged"]}},enumerable:false,configurable:true});return t}();CalciteTabNav.style=calciteTabNavCss;var calciteTabTitleCss="@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:block;-ms-flex:0 1 auto;flex:0 1 auto;outline:2px solid transparent;outline-offset:2px;margin-right:1.25rem;-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:1.25rem;margin-inline-end:1.25rem}:host([layout=center]){text-align:center;margin-top:0;margin-bottom:0;margin-left:1.25rem;margin-right:1.25rem;-ms-flex-preferred-size:12rem;flex-basis:12rem}:host([position=below]) a{border-bottom-width:0;border-top-width:2px;border-top-color:transparent;border-top-style:solid}:host a{outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}:host(:focus) a{outline:2px solid var(--calcite-ui-brand);outline-offset:2px}:host(:active) a,:host(:focus) a,:host(:hover) a{text-decoration:none;color:var(--calcite-ui-text-1);border-color:var(--calcite-ui-border-2)}:host([active]) a{color:var(--calcite-ui-text-1);border-color:transparent}:host([disabled]){pointer-events:none}:host([disabled]) span,:host([disabled]) a{pointer-events:none;opacity:0.5}:host([scale=s]){-webkit-margin-end:1rem;margin-inline-end:1rem}:host([scale=s]) a,:host([scale=s]) span{font-size:var(--calcite-font-size--2);line-height:1rem;padding-top:0.25rem;padding-bottom:0.25rem}:host([scale=m]) a,:host([scale=m]) span{font-size:var(--calcite-font-size--1);line-height:1rem;padding-top:0.5rem;padding-bottom:0.5rem}:host([scale=l]){-webkit-margin-end:1.5rem;margin-inline-end:1.5rem}:host([scale=l]) a,:host([scale=l]) span{font-size:var(--calcite-font-size-0);line-height:1.25rem;padding-top:0.75rem;padding-bottom:0.75rem}a,span{-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-appearance:none;-moz-appearance:none;appearance:none;cursor:pointer;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;border-bottom-width:2px;border-bottom-color:transparent;width:100%;height:100%;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;color:var(--calcite-ui-text-3);font-size:var(--calcite-font-size--1);line-height:1rem;-webkit-transition-property:all;transition-property:all;-webkit-transition-duration:150ms;transition-duration:150ms;-webkit-transition-timing-function:ease-in-out;transition-timing-function:ease-in-out;-webkit-transition-delay:0s;transition-delay:0s;padding-left:0;padding-right:0;padding-top:0.5rem;padding-bottom:0.5rem;border-bottom-style:solid}span{cursor:default}.calcite-tab-title--icon{display:-ms-inline-flexbox;display:inline-flex;position:relative;margin:0;-ms-flex-item-align:center;align-self:center}.calcite-tab-title--icon svg{-webkit-transition-property:all;transition-property:all;-webkit-transition-duration:150ms;transition-duration:150ms;-webkit-transition-timing-function:ease-in-out;transition-timing-function:ease-in-out;-webkit-transition-delay:0s;transition-delay:0s}.container--has-text .calcite-tab-title--icon.icon-start{margin-right:0.5rem}.container--has-text .calcite-tab-title--icon.icon-end{margin-left:0.5rem}:host([icon-start][icon-end]) .calcite-tab-title--icon:first-child{margin-right:0.5rem}.container--has-text.calcite--rtl .calcite-tab-title--icon.icon-end{margin-left:0;margin-right:0.5rem}.container--has-text.calcite--rtl .calcite-tab-title--icon.icon-start{margin-left:0.5rem;margin-right:0}:host([icon-start][icon-end]) .calcite--rtl .calcite-tab-title--icon:first-child{margin-left:0.5rem;margin-right:0}:host([bordered]){-webkit-margin-end:0;margin-inline-end:0}:host([bordered][active]){-webkit-box-shadow:inset 0px -2px var(--calcite-ui-foreground-1);box-shadow:inset 0px -2px var(--calcite-ui-foreground-1)}:host([bordered][active][position=below]){-webkit-box-shadow:inset 0 2px 0 var(--calcite-ui-foreground-1);box-shadow:inset 0 2px 0 var(--calcite-ui-foreground-1)}:host([bordered]:hover) a,:host([bordered]:focus) a,:host([bordered]:active) a{position:relative}:host([bordered]:hover) a{background-color:var(--calcite-button-transparent-hover);-webkit-transition-property:all;transition-property:all;-webkit-transition-duration:150ms;transition-duration:150ms;-webkit-transition-timing-function:ease-in-out;transition-timing-function:ease-in-out;-webkit-transition-delay:0s;transition-delay:0s}:host([bordered]) a{border-bottom-style:unset}:host([bordered][position=below]) a{border-top-style:unset}:host([active][bordered]) a{border-left:1px solid var(--calcite-ui-border-1);border-right:1px solid var(--calcite-ui-border-1)}:host([bordered]) a,:host([bordered]) span{padding-left:0.75rem;padding-right:0.75rem}:host([bordered][scale=s]) a,:host([bordered][scale=s]) span{padding-left:0.5rem;padding-right:0.5rem}:host([bordered][scale=l]) a,:host([bordered][scale=l]) span{padding-left:1rem;padding-right:1rem}";var CalciteTabTitle=function(){function t(t){registerInstance(this,t);this.calciteTabsActivate=createEvent(this,"calciteTabsActivate",7);this.calciteTabsFocusNext=createEvent(this,"calciteTabsFocusNext",7);this.calciteTabsFocusPrevious=createEvent(this,"calciteTabsFocusPrevious",7);this.calciteTabTitleRegister=createEvent(this,"calciteTabTitleRegister",7);this.active=false;this.disabled=false;this.bordered=false;this.hasText=false;this.guid="calcite-tab-title-"+guid()}t.prototype.activeTabChanged=function(){if(this.active){this.emitActiveTab()}};t.prototype.connectedCallback=function(){this.setupTextContentObserver();this.parentTabNavEl=this.el.closest("calcite-tab-nav");this.parentTabsEl=this.el.closest("calcite-tabs")};t.prototype.disconnectedCallback=function(){var t;this.observer.disconnect();(t=document.body)===null||t===void 0?void 0:t.dispatchEvent(new CustomEvent("calciteTabTitleUnregister",{detail:this.el}))};t.prototype.componentWillLoad=function(){{this.updateHasText()}if(this.tab&&this.active){this.emitActiveTab()}};t.prototype.componentWillRender=function(){if(this.parentTabsEl){this.layout=this.parentTabsEl.layout;this.position=this.parentTabsEl.position;this.scale=this.parentTabsEl.scale;this.bordered=this.parentTabsEl.bordered}if(!this.parentTabsEl&&this.parentTabNavEl){this.position=getElementProp(this.parentTabNavEl,"position",this.position);this.scale=getElementProp(this.parentTabNavEl,"scale",this.scale)}};t.prototype.render=function(){var t;var e=getElementDir(this.el);var i=this.el.id||this.guid;var a=this.disabled?"span":"a";var n=this.bordered&&!this.disabled&&this.layout!=="center";var r=h("calcite-icon",{class:"calcite-tab-title--icon icon-start",dir:e,flipRtl:this.iconFlipRtl==="start"||this.iconFlipRtl==="both",icon:this.iconStart,scale:"s"});var o=h("calcite-icon",{class:"calcite-tab-title--icon icon-end",dir:e,flipRtl:this.iconFlipRtl==="end"||this.iconFlipRtl==="both",icon:this.iconEnd,scale:"s"});return h(Host,{"aria-controls":this.controls,"aria-expanded":this.active.toString(),id:i,role:"tab",tabindex:this.disabled?"-1":"0"},h(a,{class:(t={container:true,"container--has-text":this.hasText},t[CSS_UTILITY.rtl]=e==="rtl",t),style:n&&{width:this.parentTabNavEl.indicatorWidth+"px"}},this.iconStart?r:null,h("slot",null),this.iconEnd?o:null))};t.prototype.componentDidLoad=function(){return __awaiter(this,void 0,void 0,(function(){var t,e;return __generator(this,(function(i){switch(i.label){case 0:e=(t=this.calciteTabTitleRegister).emit;return[4,this.getTabIdentifier()];case 1:e.apply(t,[i.sent()]);return[2]}}))}))};t.prototype.tabChangeHandler=function(t){var e=this;if(this.parentTabNavEl===t.target){if(this.tab){this.active=this.tab===t.detail.tab}else{this.getTabIndex().then((function(i){e.active=i===t.detail.tab}))}}};t.prototype.onClick=function(){this.emitActiveTab()};t.prototype.keyDownHandler=function(t){switch(getKey(t.key)){case" ":case"Enter":this.emitActiveTab();t.preventDefault();break;case"ArrowRight":if(getElementDir(this.el)==="ltr"){this.calciteTabsFocusNext.emit()}else{this.calciteTabsFocusPrevious.emit()}break;case"ArrowLeft":if(getElementDir(this.el)==="ltr"){this.calciteTabsFocusPrevious.emit()}else{this.calciteTabsFocusNext.emit()}break}};t.prototype.getTabIndex=function(){return __awaiter(this,void 0,void 0,(function(){return __generator(this,(function(t){return[2,Array.prototype.indexOf.call(this.el.parentElement.querySelectorAll("calcite-tab-title"),this.el)]}))}))};t.prototype.getTabIdentifier=function(){return __awaiter(this,void 0,void 0,(function(){return __generator(this,(function(t){return[2,this.tab?this.tab:this.getTabIndex()]}))}))};t.prototype.updateAriaInfo=function(t,e){if(t===void 0){t=[]}if(e===void 0){e=[]}return __awaiter(this,void 0,void 0,(function(){return __generator(this,(function(i){this.controls=t[e.indexOf(this.el.id)]||null;return[2]}))}))};t.prototype.updateHasText=function(){this.hasText=this.el.textContent.trim().length>0};t.prototype.setupTextContentObserver=function(){var t=this;{this.observer=new MutationObserver((function(){t.updateHasText()}));this.observer.observe(this.el,{childList:true,subtree:true})}};t.prototype.emitActiveTab=function(){if(!this.disabled){this.calciteTabsActivate.emit({tab:this.tab})}};Object.defineProperty(t.prototype,"el",{get:function(){return getElement(this)},enumerable:false,configurable:true});Object.defineProperty(t,"watchers",{get:function(){return{active:["activeTabChanged"]}},enumerable:false,configurable:true});return t}();CalciteTabTitle.style=calciteTabTitleCss;var calciteTabsCss="@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}:host([bordered]){-webkit-box-shadow:inset 0 1px 0 var(--calcite-ui-border-1);box-shadow:inset 0 1px 0 var(--calcite-ui-border-1);background-color:var(--calcite-ui-foreground-1)}:host([bordered]:not([position=below])) ::slotted(calcite-tab-nav){margin-bottom:-1px}:host([bordered][position=below]) ::slotted(calcite-tab-nav){margin-top:-1px}:host([bordered][position=below]){-webkit-box-shadow:inset 0 1px 0 var(--calcite-ui-border-1), inset 0 -1px 0 var(--calcite-ui-border-1);box-shadow:inset 0 1px 0 var(--calcite-ui-border-1), inset 0 -1px 0 var(--calcite-ui-border-1)}:host([bordered]) section{border-width:1px;border-style:solid;border-color:var(--calcite-ui-border-1)}:host([bordered][scale=s]) section{padding:0.75rem}:host([bordered][scale=m]) section{padding:0.5rem}:host([bordered][scale=l]) section{padding:1rem}:host([position=below]){-ms-flex-direction:column-reverse;flex-direction:column-reverse}section{display:-ms-flexbox;display:flex;-ms-flex-positive:1;flex-grow:1;overflow:hidden;border-top-width:1px;border-top-color:var(--calcite-ui-border-1);border-top-style:solid}:host([position=below]) section{-ms-flex-direction:column-reverse;flex-direction:column-reverse;border-top-width:0;border-bottom-width:1px;border-bottom-color:var(--calcite-ui-border-1)}:host([position=below]:not([bordered])) section{border-bottom-style:solid}";var CalciteTabs=function(){function t(t){registerInstance(this,t);this.layout="inline";this.position="above";this.scale="m";this.bordered=false;this.titles=[];this.tabs=[]}t.prototype.connectedCallback=function(){if(this.layout==="center"){this.bordered=false}};t.prototype.render=function(){return h(Fragment,null,h("slot",{name:"tab-nav"}),h("section",null,h("slot",null)))};t.prototype.calciteTabTitleRegister=function(t){this.titles=__spreadArray(__spreadArray([],this.titles),[t.target]);this.registryHandler();t.stopPropagation()};t.prototype.calciteTabTitleUnregister=function(t){this.titles=this.titles.filter((function(e){return e!==t.detail}));this.registryHandler();t.stopPropagation()};t.prototype.calciteTabRegister=function(t){this.tabs=__spreadArray(__spreadArray([],this.tabs),[t.target]);this.registryHandler();t.stopPropagation()};t.prototype.calciteTabUnregister=function(t){this.tabs=this.tabs.filter((function(e){return e!==t.detail}));this.registryHandler();t.stopPropagation()};t.prototype.registryHandler=function(){return __awaiter(this,void 0,void 0,(function(){var t,e,i,a;var n=this;return __generator(this,(function(r){switch(r.label){case 0:if(!(this.tabs.some((function(t){return t.tab}))||this.titles.some((function(t){return t.tab}))))return[3,1];t=this.tabs.sort((function(t,e){return t.tab.localeCompare(e.tab)})).map((function(t){return t.id}));e=this.titles.sort((function(t,e){return t.tab.localeCompare(e.tab)})).map((function(t){return t.id}));return[3,4];case 1:return[4,Promise.all(this.tabs.map((function(t){return t.getTabIndex()})))];case 2:i=r.sent();return[4,Promise.all(this.titles.map((function(t){return t.getTabIndex()})))];case 3:a=r.sent();t=i.reduce((function(t,e,i){t[e]=n.tabs[i].id;return t}),[]);e=a.reduce((function(t,e,i){t[e]=n.titles[i].id;return t}),[]);r.label=4;case 4:this.tabs.forEach((function(i){return i.updateAriaInfo(t,e)}));this.titles.forEach((function(i){return i.updateAriaInfo(t,e)}));return[2]}}))}))};Object.defineProperty(t.prototype,"el",{get:function(){return getElement(this)},enumerable:false,configurable:true});return t}();CalciteTabs.style=calciteTabsCss;export{CalciteTab as calcite_tab,CalciteTabNav as calcite_tab_nav,CalciteTabTitle as calcite_tab_title,CalciteTabs as calcite_tabs};