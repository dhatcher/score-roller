import{r as t,c as i,h as a,g as e}from"./p-6b8b45ed.js";import{g as o}from"./p-f1686cee.js";import"./p-a4e6e35b.js";const r=class{constructor(a){t(this,a),this.calciteSplitButtonPrimaryClick=i(this,"calciteSplitButtonPrimaryClick",7),this.calciteSplitButtonSecondaryClick=i(this,"calciteSplitButtonSecondaryClick",7),this.appearance="solid",this.color="blue",this.dropdownIconType="chevron",this.loading=!1,this.scale="m",this.width="auto",this.calciteSplitButtonPrimaryClickHandler=t=>this.calciteSplitButtonPrimaryClick.emit(t),this.calciteSplitButtonSecondaryClickHandler=t=>this.calciteSplitButtonSecondaryClick.emit(t)}render(){const t=o(this.el);return a("div",{class:{"split-button__container":!0,"width-auto":"auto"===this.width,"width-half":"half"===this.width,"width-full":"full"===this.width},dir:t},a("calcite-button",{appearance:this.appearance,color:this.color,dir:t,disabled:this.disabled,"icon-end":this.primaryIconEnd?this.primaryIconEnd:null,"icon-start":this.primaryIconStart?this.primaryIconStart:null,iconFlipRtl:this.primaryIconFlipRtl?this.primaryIconFlipRtl:null,label:this.primaryLabel,loading:this.loading,onClick:this.calciteSplitButtonPrimaryClickHandler,scale:this.scale,splitChild:"primary",width:"auto"===this.width?"auto":"full"},this.primaryText),a("div",{class:"split-button__divider-container"},a("div",{class:"split-button__divider"})),a("calcite-dropdown",{active:this.active,dir:t,onClick:this.calciteSplitButtonSecondaryClickHandler,placement:"bottom-trailing",scale:this.scale,width:this.scale},a("calcite-button",{appearance:this.appearance,color:this.color,dir:t,disabled:this.disabled,"icon-start":this.dropdownIcon,label:this.dropdownLabel,scale:this.scale,slot:"dropdown-trigger",splitChild:"secondary"}),a("slot",null)))}get dropdownIcon(){return"chevron"===this.dropdownIconType?"chevronDown":"caret"===this.dropdownIconType?"caretDown":"ellipsis"===this.dropdownIconType?"ellipsis":"handle-vertical"}get el(){return e(this)}};r.style="@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host .split-button__container{display:-ms-flexbox;display:flex;-ms-flex-align:stretch;align-items:stretch}:host .split-button__container>calcite-dropdown>calcite-button{height:100%;vertical-align:top}:host([appearance=solid]):host([color=blue]){--calcite-split-button-background:var(--calcite-ui-brand);--calcite-split-button-divider:var(--calcite-ui-foreground-1)}:host([appearance=solid]):host([color=red]){--calcite-split-button-background:var(--calcite-ui-danger);--calcite-split-button-divider:var(--calcite-ui-foreground-1)}:host([appearance=solid]):host([color=neutral]){--calcite-split-button-background:var(--calcite-ui-foreground-3);--calcite-split-button-divider:var(--calcite-ui-text-1)}:host([appearance=solid]):host([color=inverse]){--calcite-split-button-background:var(--calcite-ui-inverse);--calcite-split-button-divider:var(--calcite-ui-foreground-1)}:host([appearance=transparent]):host([color=blue]){--calcite-split-button-divider:var(--calcite-ui-brand)}:host([appearance=transparent]):host([color=red]){--calcite-split-button-divider:var(--calcite-ui-danger)}:host([appearance=transparent]):host([color=neutral]){--calcite-split-button-divider:var(--calcite-ui-text-1)}:host([appearance=transparent]):host([color=inverse]){--calcite-split-button-divider:var(--calcite-ui-foreground-1)}:host([appearance=clear]),:host([appearance=transparent]){--calcite-split-button-background:transparent}:host([appearance=outline]){--calcite-split-button-background:var(--calcite-ui-foreground-1)}:host([appearance=clear]):host([color=blue]),:host([appearance=outline]):host([color=blue]){--calcite-split-button-divider:var(--calcite-ui-brand)}:host([appearance=clear]):host([color=red]),:host([appearance=outline]):host([color=red]){--calcite-split-button-divider:var(--calcite-ui-danger)}:host([appearance=clear]):host([color=neutral]),:host([appearance=outline]):host([color=neutral]){--calcite-split-button-divider:var(--calcite-ui-foreground-3)}:host([appearance=clear]):host([color=inverse]),:host([appearance=outline]):host([color=inverse]){--calcite-split-button-divider:var(--calcite-ui-inverse)}.width-auto{width:auto}.width-half{width:50%}.width-full{width:100%}.split-button__divider-container{width:1px;display:-ms-flexbox;display:flex;-ms-flex-align:stretch;align-items:stretch;-webkit-transition:0.15s ease-in-out;transition:0.15s ease-in-out;background-color:var(--calcite-split-button-background)}.split-button__divider{width:1px;margin-top:0.25rem;margin-bottom:0.25rem;display:inline-block;background-color:var(--calcite-split-button-divider)}:host([appearance=outline]) .split-button__divider-container,:host([appearance=clear]) .split-button__divider-container{border-top:1px solid var(--calcite-split-button-divider);border-bottom:1px solid var(--calcite-split-button-divider)}:host([appearance=outline]):hover .split-button__divider-container,:host([appearance=clear]):hover .split-button__divider-container{background-color:var(--calcite-split-button-divider)}:host([appearance=outline]:hover) .split-button__divider-container,:host([appearance=clear]:hover) .split-button__divider-container{background-color:var(--calcite-split-button-divider)}:host([appearance=outline]:focus-within):host([color=blue]),:host([appearance=clear]:focus-within):host([color=blue]){--calcite-split-button-divider:var(--calcite-ui-brand-press)}:host([appearance=outline]:focus-within):host([color=red]),:host([appearance=clear]:focus-within):host([color=red]){--calcite-split-button-divider:var(--calcite-ui-danger-press)}:host([appearance=outline]:focus-within) .split-button__divider-container,:host([appearance=clear]:focus-within) .split-button__divider-container{background-color:var(--calcite-split-button-divider)}:host([disabled]) .split-button__divider-container{opacity:var(--calcite-ui-opacity-disabled)}:host([disabled]) calcite-dropdown>calcite-button{pointer-events:none}";export{r as calcite_split_button}