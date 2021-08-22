import { r as registerInstance, h, F as Fragment, g as getElement, c as createEvent } from './index-b3673963.js';
import { b as getSlotted, g as getElementDir, C as CSS_UTILITY } from './dom-7b4de04f.js';
import './guid-09142681.js';

const CSS$2 = {
  main: "main",
  mainReversed: "main--reversed",
  content: "content",
  contentBehind: "content--behind",
  footer: "footer"
};
const SLOTS$2 = {
  centerRow: "center-row",
  primaryPanel: "primary-panel",
  contextualPanel: "contextual-panel",
  header: "header",
  footer: "footer"
};

const calciteShellCss = "@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:host{-webkit-box-sizing:border-box;box-sizing:border-box;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-2);font-size:var(--calcite-font-size--1)}:host *{-webkit-box-sizing:border-box;box-sizing:border-box}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{width:100%;height:100%;position:absolute;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;overflow:hidden;top:0;right:0;bottom:0;left:0;--calcite-shell-tip-spacing:26vw}.main{height:100%;width:100%;-ms-flex:1 1 auto;flex:1 1 auto;display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;position:relative;border-width:0;border-top-width:1px;border-bottom-width:1px;border-style:solid;border-color:var(--calcite-ui-border-3);-ms-flex-pack:justify;justify-content:space-between;overflow:hidden}.main--reversed{-ms-flex-direction:row-reverse;flex-direction:row-reverse}.content{display:-ms-flexbox;display:flex;height:100%;overflow:auto;width:100%;border-width:0;border-left-width:1px;border-right-width:1px;border-style:solid;border-color:var(--calcite-ui-border-3);-ms-flex-flow:column nowrap;flex-flow:column nowrap}.content ::slotted(calcite-shell-center-row),.content ::slotted(calcite-panel),.content ::slotted(calcite-flow){-ms-flex-item-align:stretch;align-self:stretch;-ms-flex:1 1 auto;flex:1 1 auto;max-height:unset}.content--behind{border-width:0;position:absolute;top:0;right:0;bottom:0;left:0;z-index:0;display:initial}::slotted(calcite-shell-center-row){width:unset}::slotted(.header .heading){font-weight:var(--calcite-font-weight-normal);font-size:var(--calcite-font-size--2);line-height:1.375}::slotted(calcite-shell-panel),::slotted(calcite-shell-center-row){position:relative;z-index:1}slot[name=center-row]::slotted(calcite-shell-center-row:not([detached])){border-left-width:1px;border-right-width:1px;border-color:var(--calcite-ui-border-3)}::slotted(calcite-tip-manager){border-radius:0.25rem;-webkit-box-shadow:0 6px 20px -4px rgba(0, 0, 0, 0.1), 0 4px 12px -2px rgba(0, 0, 0, 0.08);box-shadow:0 6px 20px -4px rgba(0, 0, 0, 0.1), 0 4px 12px -2px rgba(0, 0, 0, 0.08);position:absolute;-webkit-animation:in-up var(--calcite-animation-timing) ease-in-out;animation:in-up var(--calcite-animation-timing) ease-in-out;-webkit-box-sizing:border-box;box-sizing:border-box;bottom:0.5rem;left:var(--calcite-shell-tip-spacing);right:var(--calcite-shell-tip-spacing);z-index:2}";

const CalciteShell = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  renderHeader() {
    const hasHeader = !!getSlotted(this.el, SLOTS$2.header);
    return hasHeader ? h("slot", { name: SLOTS$2.header }) : null;
  }
  renderContent() {
    const content = !!this.contentBehind
      ? [
        h("div", { class: {
            [CSS$2.content]: true,
            [CSS$2.contentBehind]: !!this.contentBehind
          } }, h("slot", null)),
        h("slot", { name: "center-row" })
      ]
      : [
        h("div", { class: CSS$2.content }, h("slot", null), h("slot", { name: "center-row" }))
      ];
    return content;
  }
  renderFooter() {
    const hasFooter = !!getSlotted(this.el, SLOTS$2.footer);
    return hasFooter ? (h("div", { class: CSS$2.footer }, h("slot", { name: SLOTS$2.footer }))) : null;
  }
  renderMain() {
    const primaryPanel = getSlotted(this.el, SLOTS$2.primaryPanel);
    const mainClasses = {
      [CSS$2.main]: true,
      [CSS$2.mainReversed]: (primaryPanel === null || primaryPanel === void 0 ? void 0 : primaryPanel.position) === "end"
    };
    return (h("div", { class: mainClasses }, h("slot", { name: SLOTS$2.primaryPanel }), this.renderContent(), h("slot", { name: SLOTS$2.contextualPanel })));
  }
  render() {
    return (h(Fragment, null, this.renderHeader(), this.renderMain(), this.renderFooter()));
  }
  get el() { return getElement(this); }
};
CalciteShell.style = calciteShellCss;

const CSS$1 = {
  actionBarContainer: "action-bar-container",
  content: "content"
};
const SLOTS$1 = {
  actionBar: "action-bar"
};

const calciteShellCenterRowCss = "@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:host{-webkit-box-sizing:border-box;box-sizing:border-box;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-2);font-size:var(--calcite-font-size--1)}:host *{-webkit-box-sizing:border-box;box-sizing:border-box}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:-ms-flexbox;display:flex;-ms-flex:1 1 auto;flex:1 1 auto;overflow:hidden;background-color:transparent}.content{display:-ms-flexbox;display:flex;height:100%;margin:0;overflow:hidden;width:100%;-ms-flex:1 0 0px;flex:1 0 0}.action-bar-container{display:-ms-flexbox;display:flex}:host([detached]){border-width:0;border-radius:0.25rem;-webkit-box-shadow:0 4px 8px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04);box-shadow:0 4px 8px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04);margin-top:0.5rem;margin-bottom:1.5rem;margin-left:0.5rem;margin-right:0.5rem;-webkit-animation:in-up var(--calcite-animation-timing) ease-in-out;animation:in-up var(--calcite-animation-timing) ease-in-out}:host([position=end]){-ms-flex-item-align:end;align-self:flex-end}:host([position=start]){-ms-flex-item-align:start;align-self:flex-start}:host([height-scale=s]){height:33.333333%}:host([height-scale=m]){height:70%}:host([height-scale=l]){height:100%}:host([height-scale=l][detached]){height:calc(100% - 2rem)}::slotted(calcite-panel){width:100%;height:100%}::slotted(calcite-action-bar){border-right-width:1px;border-style:solid;border-color:var(--calcite-ui-border-3)}::slotted(calcite-action-bar[position=end]){border-left-width:0;border-right-width:1px;border-style:solid;border-color:var(--calcite-ui-border-3)}.calcite--rtl ::slotted(calcite-action-bar){border-right-width:0;border-left-width:1px;border-style:solid;border-color:var(--calcite-ui-border-3)}.calcite--rtl ::slotted(calcite-action-bar[position=end]){border-left-width:0;border-right-width:1px;border-style:solid;border-color:var(--calcite-ui-border-3)}";

const CalciteShellCenterRow = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------
    /**
     * This property makes the content area appear like a "floating" panel.
     */
    this.detached = false;
    /**
     * Specifies the maxiumum height of the row.
     */
    this.heightScale = "s";
    /**
     * Arranges the component depending on the elements 'dir' property.
     */
    this.position = "end";
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  render() {
    const { el } = this;
    const rtl = getElementDir(el) === "rtl";
    const contentNode = (h("div", { class: { [CSS$1.content]: true, [CSS_UTILITY.rtl]: rtl } }, h("slot", null)));
    const actionBar = getSlotted(el, SLOTS$1.actionBar);
    const actionBarNode = actionBar ? (h("div", { class: { [CSS$1.actionBarContainer]: true, [CSS_UTILITY.rtl]: rtl } }, h("slot", { name: SLOTS$1.actionBar }))) : null;
    const children = [actionBarNode, contentNode];
    if ((actionBar === null || actionBar === void 0 ? void 0 : actionBar.position) === "end") {
      children.reverse();
    }
    return h(Fragment, null, children);
  }
  get el() { return getElement(this); }
};
CalciteShellCenterRow.style = calciteShellCenterRowCss;

const CSS = {
  content: "content",
  contentHeader: "content__header",
  contentBody: "content__body",
  contentDetached: "content--detached"
};
const SLOTS = {
  actionBar: "action-bar",
  header: "header"
};

const calciteShellPanelCss = "@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:host{-webkit-box-sizing:border-box;box-sizing:border-box;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-2);font-size:var(--calcite-font-size--1)}:host *{-webkit-box-sizing:border-box;box-sizing:border-box}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:-ms-flexbox;display:flex;-ms-flex-align:stretch;align-items:stretch;background-color:transparent;pointer-events:none;--calcite-shell-panel-detached-max-height:unset}::slotted(calcite-panel),::slotted(calcite-flow){-ms-flex:1 1 auto;flex:1 1 auto;height:100%;width:100%;max-height:unset;max-width:unset}::slotted(.calcite-match-height){display:-ms-flexbox;display:flex;-ms-flex:1 1 auto;flex:1 1 auto;overflow:hidden}.content{-ms-flex-align:stretch;align-items:stretch;-ms-flex-item-align:stretch;align-self:stretch;background-color:var(--calcite-ui-background);display:-ms-flexbox;display:flex;padding:0;pointer-events:auto;-ms-flex-direction:column;flex-direction:column;-ms-flex-wrap:nowrap;flex-wrap:nowrap;width:var(--calcite-shell-panel-width);max-width:var(--calcite-shell-panel-max-width);min-width:var(--calcite-shell-panel-min-width);-webkit-transition:max-height 150ms ease-in-out, max-width 150ms ease-in-out;transition:max-height 150ms ease-in-out, max-width 150ms ease-in-out}.content__header{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex:0 1 auto;flex:0 1 auto;-ms-flex-wrap:nowrap;flex-wrap:nowrap;-ms-flex-align:stretch;align-items:stretch}.content__body{display:-ms-flexbox;display:flex;-ms-flex:1 1 auto;flex:1 1 auto;-ms-flex-direction:column;flex-direction:column;overflow:hidden}:host([width-scale=s]) .content{--calcite-shell-panel-width:calc(var(--calcite-panel-width-multiplier) * 12vw);--calcite-shell-panel-max-width:calc(var(--calcite-panel-width-multiplier) * 300px);--calcite-shell-panel-min-width:calc(var(--calcite-panel-width-multiplier) * 150px)}:host([width-scale=m]) .content{--calcite-shell-panel-width:calc(var(--calcite-panel-width-multiplier) * 20vw);--calcite-shell-panel-max-width:calc(var(--calcite-panel-width-multiplier) * 420px);--calcite-shell-panel-min-width:calc(var(--calcite-panel-width-multiplier) * 240px)}:host([width-scale=l]) .content{--calcite-shell-panel-width:calc(var(--calcite-panel-width-multiplier) * 45vw);--calcite-shell-panel-max-width:calc(var(--calcite-panel-width-multiplier) * 680px);--calcite-shell-panel-min-width:calc(var(--calcite-panel-width-multiplier) * 340px)}:host([detached-height-scale=s]) .content--detached{--calcite-shell-panel-detached-max-height:40vh}:host([detached-height-scale=m]) .content--detached{--calcite-shell-panel-detached-max-height:60vh}:host([detached-height-scale=l]) .content--detached{--calcite-shell-panel-detached-max-height:80vh}.content--detached{border-radius:0.25rem;-webkit-box-shadow:0 4px 8px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04);box-shadow:0 4px 8px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04);height:auto;overflow:hidden;margin-top:0.5rem;margin-bottom:auto;margin-left:0.5rem;margin-right:0.5rem;max-height:var(--calcite-shell-panel-detached-max-height)}.content--detached ::slotted(calcite-panel),.content--detached ::slotted(calcite-flow){max-height:unset}.content[hidden]{display:none}:host([position=start]) slot[name=action-bar]::slotted(calcite-action-bar){border-right-width:1px;border-right-color:var(--calcite-ui-border-3);border-right-style:solid}:host([position=end]) slot[name=action-bar]::slotted(calcite-action-bar){border-left-width:1px;border-left-color:var(--calcite-ui-border-3);border-left-style:solid}";

const CalciteShellPanel = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteShellPanelToggle = createEvent(this, "calciteShellPanelToggle", 7);
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------
    /**
     * Hide the content panel.
     */
    this.collapsed = false;
    /**
     * This property makes the content area appear like a "floating" panel.
     */
    this.detached = false;
    /**
     * Specifies the maxiumum height of the contents when detached.
     */
    this.detachedHeightScale = "l";
    /**
     * This sets width of the content area.
     */
    this.widthScale = "m";
  }
  watchHandler() {
    this.calciteShellPanelToggle.emit();
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  renderHeader() {
    const { el } = this;
    const hasHeader = getSlotted(el, SLOTS.header);
    return hasHeader ? (h("div", { class: CSS.contentHeader }, h("slot", { name: SLOTS.header }))) : null;
  }
  render() {
    const { collapsed, detached, position } = this;
    const contentNode = (h("div", { class: { [CSS.content]: true, [CSS.contentDetached]: detached }, hidden: collapsed }, this.renderHeader(), h("div", { class: CSS.contentBody }, h("slot", null))));
    const actionBarNode = h("slot", { name: SLOTS.actionBar });
    const mainNodes = [actionBarNode, contentNode];
    if (position === "end") {
      mainNodes.reverse();
    }
    return h(Fragment, null, mainNodes);
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "collapsed": ["watchHandler"]
  }; }
};
CalciteShellPanel.style = calciteShellPanelCss;

export { CalciteShell as calcite_shell, CalciteShellCenterRow as calcite_shell_center_row, CalciteShellPanel as calcite_shell_panel };
