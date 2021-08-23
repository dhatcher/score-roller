import{r as t,c as a,h as i,g as n}from"./p-6b8b45ed.js";import{S as s}from"./p-a57a7f49.js";const e=class{constructor(i){t(this,i),this.calciteListOrderChange=a(this,"calciteListOrderChange",7),this.handleSelector="calcite-handle",this.disabled=!1,this.loading=!1,this.handleActivated=!1,this.items=[],this.observer=new MutationObserver((()=>{this.items=Array.from(this.el.children),this.setUpDragAndDrop()}))}connectedCallback(){this.items=Array.from(this.el.children),this.setUpDragAndDrop(),this.beginObserving()}disconnectedCallback(){this.observer.disconnect(),this.cleanUpDragAndDrop()}calciteHandleNudgeHandler(t){const a=this.items.find((a=>a.contains(t.detail.handle)||t.composedPath().includes(a))),i=this.items.length-1,n=this.items.indexOf(a);let s,e=!1;switch(t.detail.direction){case"up":t.preventDefault(),0===n?e=!0:s=n-1;break;case"down":t.preventDefault(),n===i?s=0:n===i-1?e=!0:s=n+2;break;default:return}this.observer.disconnect(),e?a.parentElement.appendChild(a):a.parentElement.insertBefore(a,this.items[s]),this.items=Array.from(this.el.children),t.detail.handle.activated=!0,t.detail.handle.setFocus(),this.beginObserving()}setUpDragAndDrop(){this.cleanUpDragAndDrop();const t={dataIdAttr:"id",group:this.group,handle:this.handleSelector,onUpdate:()=>{this.items=Array.from(this.el.children),this.calciteListOrderChange.emit()},onStart:()=>{this.observer.disconnect()},onEnd:()=>{this.beginObserving()}};this.dragSelector&&(t.draggable=this.dragSelector),this.sortable=s.create(this.el,t)}cleanUpDragAndDrop(){var t;null===(t=this.sortable)||void 0===t||t.destroy(),this.sortable=null}beginObserving(){this.observer.observe(this.el,{childList:!0,subtree:!0})}render(){return i("slot",null)}get el(){return n(this)}};e.style="@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:-ms-flexbox;display:flex}";export{e as calcite_sortable_list}