'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-318f3d91.js');

const calciteTileCss = "@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{background-color:var(--calcite-ui-foreground-1);-webkit-box-sizing:border-box;box-sizing:border-box;color:var(--calcite-ui-text-3);display:inline-block;-webkit-transition-duration:150ms;transition-duration:150ms;-webkit-transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}:host(:not([embed])){padding:0.75rem;-webkit-box-shadow:0 0 0 1px var(--calcite-ui-border-2);box-shadow:0 0 0 1px var(--calcite-ui-border-2)}:host(:not([embed])[href]:hover){cursor:pointer;-webkit-box-shadow:0 0 0 2px var(--calcite-ui-brand);box-shadow:0 0 0 2px var(--calcite-ui-brand)}:host(:not([embed])[href]:active){-webkit-box-shadow:0 0 0 3px var(--calcite-ui-brand);box-shadow:0 0 0 3px var(--calcite-ui-brand)}:host([icon][heading]:not([description]):not([embed])){padding:0}:host([disabled]){opacity:var(--calcite-ui-opacity-disabled);pointer-events:none}.tile{display:grid;grid-template-columns:repeat(1, minmax(0, 1fr));grid-gap:0.5rem;gap:0.5rem;pointer-events:none}.heading{font-size:var(--calcite-font-size--1);line-height:1.375;color:var(--calcite-ui-text-2);-webkit-transition-duration:150ms;transition-duration:150ms;-webkit-transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);font-weight:var(--calcite-font-weight-medium);pointer-events:none}.large-visual{-ms-flex-align:center;align-items:center;min-height:12rem}.large-visual .icon{-ms-flex-item-align:end;align-self:flex-end}.large-visual .heading{-ms-flex-item-align:center;align-self:center}.description{font-size:var(--calcite-font-size--2);line-height:1.375;color:var(--calcite-ui-text-3);-webkit-transition-duration:150ms;transition-duration:150ms;-webkit-transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);pointer-events:none}:host(:hover) .heading,:host([active]) .heading{color:var(--calcite-ui-text-1)}:host(:hover) .description,:host([active]) .description{color:var(--calcite-ui-text-2)}";

const CalciteTile = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    /**
     * When true, prevents interaction.
     */
    this.disabled = false;
    /** The embed mode of the tile.  When true, renders without a border and padding for use by other components. */
    this.embed = false;
    /**
     * The focused state of the tile.
     * @private
     */
    this.focused = false;
    /** The hidden state of the tile. */
    this.hidden = false;
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  renderTile() {
    const isLargeVisual = this.heading && this.icon && !this.description;
    const iconStyle = isLargeVisual
      ? {
        height: "64px",
        width: "64px"
      }
      : undefined;
    return (index.h("div", { class: { "large-visual": isLargeVisual, tile: true } }, this.icon && (index.h("div", { class: "icon" }, index.h("calcite-icon", { icon: this.icon, scale: "l", style: iconStyle }))), this.heading && index.h("div", { class: "heading" }, this.heading), this.description && index.h("div", { class: "description" }, this.description)));
  }
  render() {
    return (index.h(index.Fragment, null, this.href ? (index.h("calcite-link", { disabled: this.disabled, href: this.href }, this.renderTile())) : (this.renderTile())));
  }
};
CalciteTile.style = calciteTileCss;

exports.calcite_tile = CalciteTile;
