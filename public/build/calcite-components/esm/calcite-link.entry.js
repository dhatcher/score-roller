import { r as registerInstance, h, H as Host, g as getElement } from './index-b3673963.js';
import { g as getElementDir, C as CSS_UTILITY, f as focusElement } from './dom-7b4de04f.js';
import './guid-09142681.js';

const calciteLinkCss = "@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host a,:host span{display:-ms-flexbox;display:flex;position:relative;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;border-radius:0;border-style:none;font-family:inherit;cursor:pointer;-webkit-transition-property:all;transition-property:all;-webkit-transition-duration:150ms;transition-duration:150ms;-webkit-transition-timing-function:ease-in-out;transition-timing-function:ease-in-out;-webkit-transition-delay:0s;transition-delay:0s;text-decoration:none;line-height:inherit;font-size:inherit;-webkit-appearance:none}:host a:hover,:host span:hover{text-decoration:none}:host a,:host span{outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}:host a:focus,:host span:focus{outline:2px solid var(--calcite-ui-brand);outline-offset:-2px}calcite-icon{width:1em;height:1em;min-width:unset;min-height:unset}.calcite-link--icon{-webkit-transition-property:all;transition-property:all;-webkit-transition-duration:150ms;transition-duration:150ms;-webkit-transition-timing-function:ease-in-out;transition-timing-function:ease-in-out;-webkit-transition-delay:0s;transition-delay:0s;vertical-align:text-top;margin-top:0.125rem}:host([disabled]){pointer-events:none}:host([disabled]) span,:host([disabled]) a{pointer-events:none;opacity:var(--calcite-ui-opacity-disabled)}:host .calcite-link--icon.icon-start{margin-right:0.5rem}.calcite--rtl .calcite-link--icon.icon-start{margin-right:0;margin-left:0.5rem}:host .calcite-link--icon.icon-end{margin-left:0.5rem}.calcite--rtl .calcite-link--icon.icon-end{margin-left:0;margin-right:0.5rem}:host span,:host a{display:inline;padding:0;border-style:none;background-color:transparent;position:relative;color:var(--calcite-ui-text-link);line-height:inherit;white-space:initial;background-image:-webkit-gradient(linear, left top, left bottom, from(currentColor), to(currentColor)), -webkit-gradient(linear, left top, left bottom, from(var(--calcite-link-blue-underline)), to(var(--calcite-link-blue-underline)));background-image:linear-gradient(currentColor, currentColor), linear-gradient(var(--calcite-link-blue-underline), var(--calcite-link-blue-underline));background-position:0% 100%, 100% 100%;background-repeat:no-repeat, no-repeat;background-size:0% 1px, 100% 1px;-webkit-transition:all 0.15s ease-in-out, background-size 0.3s ease-in-out;transition:all 0.15s ease-in-out, background-size 0.3s ease-in-out}:host span:hover,:host span:focus,:host a:hover,:host a:focus{background-size:100% 1px, 100% 1px}:host span:active,:host a:active{background-size:100% 2px, 100% 2px}span.calcite--rtl,a.calcite--rtl{background-position:100% 100%, 100% 100%}";

const CalciteLink = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /** the node type of the rendered child element */
    this.childElType = "span";
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    this.storeTagRef = (el) => {
      this.childEl = el;
    };
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    this.childElType = this.href ? "a" : "span";
  }
  render() {
    const dir = getElementDir(this.el);
    const iconStartEl = (h("calcite-icon", { class: "calcite-link--icon icon-start", flipRtl: this.iconFlipRtl === "start" || this.iconFlipRtl === "both", icon: this.iconStart, scale: "s" }));
    const iconEndEl = (h("calcite-icon", { class: "calcite-link--icon icon-end", flipRtl: this.iconFlipRtl === "end" || this.iconFlipRtl === "both", icon: this.iconEnd, scale: "s" }));
    const Tag = this.childElType;
    const role = this.childElType === "span" ? "link" : null;
    const tabIndex = this.disabled ? -1 : this.childElType === "span" ? 0 : null;
    return (h(Host, { role: "presentation" }, h(Tag, { class: { [CSS_UTILITY.rtl]: dir === "rtl" }, dir: dir, href: Tag === "a" && this.href, ref: this.storeTagRef, rel: Tag === "a" && this.rel, role: role, tabIndex: tabIndex, target: Tag === "a" && this.target }, this.iconStart ? iconStartEl : null, h("slot", null), this.iconEnd ? iconEndEl : null)));
  }
  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  async setFocus() {
    focusElement(this.childEl);
  }
  get el() { return getElement(this); }
};
CalciteLink.style = calciteLinkCss;

export { CalciteLink as calcite_link };
