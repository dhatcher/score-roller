import{r as t,h as n,H as a,g as e}from"./p-6b8b45ed.js";import{b as i}from"./p-f1686cee.js";import"./p-a4e6e35b.js";const o=class{constructor(n){t(this,n)}render(){return n(a,{role:"list"},n("div",{class:"container"},n("slot",null)))}};o.style="@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:-ms-flexbox;display:flex}.container{background-color:transparent;-webkit-box-sizing:border-box;box-sizing:border-box;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}.container *{-webkit-box-sizing:border-box;box-sizing:border-box}::slotted(calcite-list-item){margin-bottom:1px;-webkit-box-shadow:0 1px 0 var(--calcite-ui-border-3);box-shadow:0 1px 0 var(--calcite-ui-border-3)}::slotted(calcite-list-item:last-child){-webkit-box-shadow:none;box-shadow:none}";const r=class{constructor(n){t(this,n),this.nonInteractive=!1,this.disabled=!1}renderActionsStart(){const{el:t}=this;return i(t,"actions-start")?n("div",{class:"actions-start"},n("slot",{name:"actions-start"})):null}renderActionsEnd(){const{el:t}=this;return i(t,"actions-end")?n("div",{class:"actions-end"},n("slot",{name:"actions-end"})):null}renderContentStart(){const{el:t}=this;return i(t,"content-start")?n("div",{class:"content-start"},n("slot",{name:"content-start"})):null}renderContentEnd(){const{el:t}=this;return i(t,"content-end")?n("div",{class:"content-end"},n("slot",{name:"content-end"})):null}renderContent(){const{label:t,description:a}=this;return t||a?n("div",{class:"content"},t?n("div",{class:"label"},t):null,a?n("div",{class:"description"},a):null):null}renderContentContainer(){const{disabled:t,nonInteractive:a}=this,e=[this.renderContentStart(),this.renderContent(),this.renderContentEnd()];return a?n("div",{class:"content-container"},e):n("button",{class:{"content-container":!0,"content-container--button":!0},disabled:t},e)}render(){return n(a,{role:"listitem"},n("div",{class:"container"},this.renderActionsStart(),this.renderContentContainer(),this.renderActionsEnd()))}get el(){return e(this)}};r.style="@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:block}:host([disabled]){pointer-events:none;cursor:default}.container{background-color:var(--calcite-ui-foreground-1);-webkit-box-sizing:border-box;box-sizing:border-box;font-family:var(--calcite-sans-family);display:-ms-flexbox;display:flex}.container *{-webkit-box-sizing:border-box;box-sizing:border-box}.content-container{display:-ms-flexbox;display:flex;-ms-flex:1 1 auto;flex:1 1 auto;outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;-ms-flex-align:stretch;align-items:stretch;padding:0;color:var(--calcite-ui-text-2)}.content-container--button{background-color:var(--calcite-ui-foreground-1);border-style:none;cursor:pointer;outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;text-align:initial}.content-container--button:hover{background-color:var(--calcite-ui-foreground-2)}.content-container--button:hover .label,.content-container--button:hover .description{color:var(--calcite-ui-text-1)}.content-container--button:focus{outline:2px solid var(--calcite-ui-brand);outline-offset:-2px}.content{-ms-flex-pack:center;justify-content:center;display:-ms-flexbox;display:flex;-ms-flex:1 1 auto;flex:1 1 auto;-ms-flex-direction:column;flex-direction:column;padding-left:0.75rem;padding-right:0.75rem;padding-top:0.5rem;padding-bottom:0.5rem}.label,.description{font-weight:var(--calcite-font-weight-normal);font-family:var(--calcite-sans-family);font-size:var(--calcite-font-size--2);word-wrap:break-word;word-break:break-word}.label{color:var(--calcite-ui-text-1)}.description{color:var(--calcite-ui-text-3);margin-top:0.125rem}.content-start,.content-end{-ms-flex:0 1 auto;flex:0 1 auto;pointer-events:none}.actions-start,.actions-end,.content-start,.content-end{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}.content-start ::slotted(calcite-icon),.content-end ::slotted(calcite-icon){-ms-flex-item-align:center;align-self:center;padding-left:0.75rem;padding-right:0.75rem}.actions-start ::slotted(calcite-action),.actions-end ::slotted(calcite-action){-ms-flex-item-align:stretch;align-self:stretch;color:inherit}";export{o as calcite_list,r as calcite_list_item}