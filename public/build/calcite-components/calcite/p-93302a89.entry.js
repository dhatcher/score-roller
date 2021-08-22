import{r as t,c as e,h as i,F as a,g as n}from"./p-6b8b45ed.js";import{g as o,b as l,C as r}from"./p-f1686cee.js";import{C as s}from"./p-13fbc1a8.js";import{S as c}from"./p-4fda49e6.js";import"./p-a4e6e35b.js";const d=class{constructor(i){t(this,i),this.calcitePanelDismissedChange=e(this,"calcitePanelDismissedChange",7),this.calcitePanelScroll=e(this,"calcitePanelScroll",7),this.calcitePanelBackClick=e(this,"calcitePanelBackClick",7),this.dismissed=!1,this.disabled=!1,this.dismissible=!1,this.showBackButton=!1,this.loading=!1,this.menuOpen=!1,this.setContainerRef=t=>{this.containerEl=t},this.setDismissRef=t=>{this.dismissButtonEl=t},this.setBackRef=t=>{this.backButtonEl=t},this.panelKeyUpHandler=t=>{"Escape"===t.key&&this.dismiss()},this.dismiss=()=>{this.dismissed=!0},this.panelScrollHandler=()=>{this.calcitePanelScroll.emit()},this.backButtonClick=()=>{this.calcitePanelBackClick.emit()}}dismissedHandler(){this.calcitePanelDismissedChange.emit()}async setFocus(t){var e,i,a;"dismiss-button"!==t?"back-button"!==t?null===(a=this.containerEl)||void 0===a||a.focus():null===(i=this.backButtonEl)||void 0===i||i.setFocus():null===(e=this.dismissButtonEl)||void 0===e||e.setFocus()}renderBackButton(){const{el:t}=this,e="rtl"===o(t),{showBackButton:a,intlBack:n,backButtonClick:l}=this,r=n||"Back";return a?i("calcite-action",{"aria-label":r,class:"back-button",icon:e?"chevron-right":"chevron-left",key:"back-button",onClick:l,ref:this.setBackRef,scale:"s",slot:"header-actions-start",text:r}):null}renderHeaderContent(){const{heading:t,headingLevel:e,summary:a}=this,n=t?i(s,{class:"heading",level:e||3},t):null,o=a?i("span",{class:"summary"},a):null;return n||o?i("div",{class:"header-content",key:"header-content"},n,o):null}renderHeaderSlottedContent(){return i("div",{class:"header-content",key:"header-content"},i("slot",{name:"header-content"}))}renderHeaderStartActions(){const{el:t}=this;return l(t,"header-actions-start")?i("div",{class:{"header-actions--start":!0,"header-actions":!0},key:"header-actions-start"},i("slot",{name:"header-actions-start"})):null}renderHeaderActionsEnd(){const{dismiss:t,dismissible:e,el:a,intlClose:n}=this,o=n||"Close",r=e?i("calcite-action",{"aria-label":o,icon:"x",onClick:t,ref:this.setDismissRef,text:o}):null,s=i("slot",{name:"header-actions-end"});return l(a,"header-actions-end")||r?i("div",{class:{"header-actions--end":!0,"header-actions":!0},key:"header-actions-end"},s,r):null}renderMenu(){const{el:t,intlOptions:e,menuOpen:a}=this;return l(t,"header-menu-actions")?i("calcite-action-menu",{flipPlacements:["top","bottom"],label:e||"Options",open:a,placement:"bottom-end"},i("calcite-action",{icon:"ellipsis",slot:c.trigger,text:e||"Options"}),i("slot",{name:"header-menu-actions"})):null}renderHeaderNode(){const{el:t,showBackButton:e}=this,a=this.renderBackButton(),n=l(t,"header-content")?this.renderHeaderSlottedContent():this.renderHeaderContent(),o=this.renderHeaderStartActions(),r=this.renderHeaderActionsEnd(),s=this.renderMenu();return o||n||r||s||e?i("header",{class:"header"},a,o,n,r,s):null}renderFooterSlottedContent(){const{el:t}=this;return l(t,"footer")?i("footer",{class:"footer"},i("slot",{name:"footer"})):null}renderFooterActions(){const{el:t}=this;return l(t,"footer-actions")?i("footer",{class:"footer"},i("slot",{name:"footer-actions"})):null}renderContent(){return i("section",{class:"content-container",onScroll:this.panelScrollHandler,tabIndex:0},i("slot",null),this.renderFab())}renderFab(){const{el:t}=this;return l(t,"fab")?i("div",{class:"fab-container"},i("slot",{name:"fab"})):null}render(){const{dismissed:t,disabled:e,dismissible:n,el:l,loading:s,panelKeyUpHandler:c}=this,d="rtl"===o(l),h=i("article",{"aria-busy":s.toString(),class:{container:!0,[r.rtl]:d},hidden:n&&t,onKeyUp:c,ref:this.setContainerRef,tabIndex:n?0:-1},this.renderHeaderNode(),this.renderContent(),this.renderFooterSlottedContent()||this.renderFooterActions());return i(a,null,s||e?i("calcite-scrim",{loading:s}):null,h)}get el(){return n(this)}static get watchers(){return{dismissed:["dismissedHandler"]}}};d.style="@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:host{-webkit-box-sizing:border-box;box-sizing:border-box;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-2);font-size:var(--calcite-font-size--1)}:host *{-webkit-box-sizing:border-box;box-sizing:border-box}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:-ms-flexbox;display:flex;-ms-flex:1 1 auto;flex:1 1 auto;overflow:hidden;position:relative;width:100%;--calcite-min-header-height:calc(var(--calcite-icon-size) * 3);--calcite-panel-max-height:unset;--calcite-panel-width:100%;--calcite-panel-min-width:unset;--calcite-panel-max-width:unset}.header{margin:0;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;color:var(--calcite-ui-text-2);fill:var(--calcite-ui-text-2)}.heading{padding:0;margin:0;font-weight:var(--calcite-font-weight-medium);line-height:1.5}.header .heading{-ms-flex:1 0 auto;flex:1 0 auto;padding:var(--calcite-spacing-half) var(--calcite-spacing-half)}h1.heading{font-size:var(--calcite-font-size-2)}h2.heading{font-size:var(--calcite-font-size-1)}h3.heading{font-size:var(--calcite-font-size-0)}h4.heading,h5.heading{font-size:var(--calcite-font-size--1)}.container{display:-ms-flexbox;display:flex;-ms-flex:1 1 auto;flex:1 1 auto;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:stretch;align-items:stretch;background-color:var(--calcite-ui-background);width:100%;padding:0;margin:0;max-height:var(--calcite-panel-max-height);width:var(--calcite-panel-width);max-width:var(--calcite-panel-max-width);min-width:var(--calcite-panel-min-width);-webkit-transition:max-height 150ms ease-in-out, width 150ms ease-in-out;transition:max-height 150ms ease-in-out, width 150ms ease-in-out}:host([height-scale=s]){--calcite-panel-max-height:40vh}:host([height-scale=m]){--calcite-panel-max-height:60vh}:host([height-scale=l]){--calcite-panel-max-height:80vh}:host([width-scale=s]){--calcite-panel-width:calc(var(--calcite-panel-width-multiplier) * 12vw);--calcite-panel-max-width:calc(var(--calcite-panel-width-multiplier) * 300px);--calcite-panel-min-width:calc(var(--calcite-panel-width-multiplier) * 150px)}:host([width-scale=m]){--calcite-panel-width:calc(var(--calcite-panel-width-multiplier) * 20vw);--calcite-panel-max-width:calc(var(--calcite-panel-width-multiplier) * 420px);--calcite-panel-min-width:calc(var(--calcite-panel-width-multiplier) * 240px)}:host([width-scale=l]){--calcite-panel-width:calc(var(--calcite-panel-width-multiplier) * 45vw);--calcite-panel-max-width:calc(var(--calcite-panel-width-multiplier) * 680px);--calcite-panel-min-width:calc(var(--calcite-panel-width-multiplier) * 340px)}.container[hidden]{display:none}:host([loading]) .container,:host([disabled]) .container{position:relative;z-index:1}.header{border-bottom:1px solid;-ms-flex-align:stretch;align-items:stretch;background-color:var(--calcite-ui-foreground-1);-ms-flex-pack:start;justify-content:flex-start;position:-webkit-sticky;position:sticky;top:0;border-bottom-color:var(--calcite-ui-border-3);width:100%;-ms-flex:0 0 auto;flex:0 0 auto;min-height:3rem;z-index:2;width:100%}.header-content{display:block;overflow:hidden;margin-right:auto;padding-top:1rem;padding-bottom:1rem;padding-left:0.75rem;padding-right:0.75rem}.header-content .heading,.header-content .summary{padding:0;display:block;overflow:hidden;white-space:nowrap;width:100%;text-overflow:ellipsis}.header-content .heading{font-weight:var(--calcite-font-weight-medium);margin-top:0;margin-left:0;margin-right:0;margin-bottom:0.25rem;font-size:var(--calcite-font-size-0);line-height:1.25rem}.header-content .heading:only-child{margin-bottom:0}.header-content .summary{color:var(--calcite-ui-text-2);font-size:var(--calcite-font-size--1);line-height:1rem}.back-button{border-color:var(--calcite-ui-border-3);border-style:solid;border-width:0;border-right-width:1px}.calcite--rtl .back-button{border-right-width:0;border-left-width:1px}.header-actions{display:-ms-flexbox;display:flex;-ms-flex-align:stretch;align-items:stretch;-ms-flex-direction:row;flex-direction:row;-ms-flex-wrap:nowrap;flex-wrap:nowrap}.header-actions--end{margin-left:auto}.menu-container:only-child{margin-left:auto}.menu-button{-ms-flex-item-align:stretch;align-self:stretch;-ms-flex:0 1 auto;flex:0 1 auto;height:100%;position:relative}.menu{min-width:10rem;-ms-flex-flow:column nowrap;flex-flow:column nowrap}.content-container{-ms-flex-align:stretch;align-items:stretch;background-color:var(--calcite-ui-background);display:-ms-flexbox;display:flex;-ms-flex:1 1 auto;flex:1 1 auto;overflow:auto;-ms-flex-wrap:nowrap;flex-wrap:nowrap;-ms-flex-direction:column;flex-direction:column}.footer{border-top:1px solid;background-color:var(--calcite-ui-foreground-1);border-top-color:var(--calcite-ui-border-3);display:-ms-flexbox;display:flex;-ms-flex-pack:space-evenly;justify-content:space-evenly;position:-webkit-sticky;position:sticky;bottom:0;width:100%;-ms-flex:0 0 auto;flex:0 0 auto;min-height:3rem;padding:0.5rem}.calcite--rtl .header-content{margin-left:auto;margin-right:unset}.calcite--rtl .header-actions--end{margin-right:auto;margin-left:unset}.calcite--rtl .menu-container:only-child{margin-right:auto;margin-left:unset}.fab-container{display:inline-block;position:-webkit-sticky;position:sticky;margin-top:0;margin-bottom:0;margin-left:auto;margin-right:auto;padding:0.5rem;bottom:0;left:0;right:0;z-index:1}";export{d as calcite_panel}