'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-318f3d91.js');
const dom = require('./dom-57231db9.js');
const resources = require('./resources-76637167.js');
const array = require('./array-4fc5abfa.js');
const guid = require('./guid-4637ad8f.js');

const CSS$2 = {
  button: "button",
  buttonTextVisible: "button--text-visible",
  buttonCompact: "button--compact",
  iconContainer: "icon-container",
  slotContainer: "slot-container",
  slotContainerHidden: "slot-container--hidden",
  textContainer: "text-container",
  textContainerVisible: "text-container--visible"
};
const TEXT$3 = {
  loading: "Loading"
};

const calciteActionCss = "@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:host{-webkit-box-sizing:border-box;box-sizing:border-box;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-2);font-size:var(--calcite-font-size--1)}:host *{-webkit-box-sizing:border-box;box-sizing:border-box}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:-ms-flexbox;display:flex;background-color:transparent}:host([disabled]){pointer-events:none}.button{background-color:var(--calcite-ui-foreground-1);border-style:none;cursor:pointer;fill:var(--calcite-ui-text-3);display:-ms-flexbox;display:flex;outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;-ms-flex-align:center;align-items:center;-ms-flex-pack:start;justify-content:flex-start;margin:0;position:relative;font-size:var(--calcite-font-size--2);line-height:1rem;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-ui-text-3);width:auto;font-family:inherit;text-align:unset}.button:hover{background-color:var(--calcite-ui-foreground-2);color:var(--calcite-ui-text-1);fill:var(--calcite-ui-text-1)}.button:focus{background-color:var(--calcite-ui-foreground-2);color:var(--calcite-ui-text-1);fill:var(--calcite-ui-text-1);outline:2px solid var(--calcite-ui-brand);outline-offset:-2px}.button:active{background-color:var(--calcite-ui-foreground-3)}.button .icon-container{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;margin:0;pointer-events:none;min-width:1rem;min-height:1rem}.button .text-container{line-height:1rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin:0;width:0;opacity:0;-webkit-transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);-webkit-transition-duration:150ms;transition-duration:150ms;-webkit-transition-property:opacity;transition-property:opacity;-webkit-transition-property:margin;transition-property:margin;-webkit-transition-property:width;transition-property:width}.button .text-container--visible{-ms-flex:1 1 auto;flex:1 1 auto;opacity:1;width:auto}:host([scale=s]) .button{padding:0.5rem}:host([scale=m]) .button{padding:1rem}:host([scale=l]) .button{padding:1.25rem;font-size:var(--calcite-font-size--1);line-height:1rem}:host([alignment=center]) .button{-ms-flex-pack:center;justify-content:center;width:100%}:host([alignment=end]) .button{-ms-flex-pack:end;justify-content:flex-end}:host([alignment=end]) .button .text-container--visible{-ms-flex:0 1 auto;flex:0 1 auto}:host([scale=s][compact]) .button,:host([scale=m][compact]) .button,:host([scale=l][compact]) .button{padding-left:0;padding-right:0}.slot-container{display:-ms-flexbox;display:flex}.slot-container--hidden{display:none}.button--text-visible{width:100%}.button--text-visible .icon-container{margin:0;margin-right:0.75rem}.button--text-visible .text-container--visible{margin:0;margin-right:0.5rem}.button--text-visible.calcite--rtl .icon-container{margin:0;margin-left:0.75rem}.button--text-visible.calcite--rtl .text-container--visible{margin:0;margin-left:0.5rem}:host([active]) .button,:host([active]) .button:hover,:host([active]) .button:focus,:host([active][loading]) .button{color:var(--calcite-ui-text-1);fill:var(--calcite-ui-text-1);background-color:var(--calcite-ui-foreground-3)}:host([appearance=clear]) .button{background-color:transparent;-webkit-transition-property:-webkit-box-shadow;transition-property:-webkit-box-shadow;transition-property:box-shadow;transition-property:box-shadow, -webkit-box-shadow;-webkit-transition-duration:150ms;transition-duration:150ms;-webkit-transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1)}:host([appearance=clear]) .button:hover,:host([appearance=clear]) .button:focus{background-color:transparent;-webkit-box-shadow:0 0 0 2px var(--calcite-ui-border-1) inset;box-shadow:0 0 0 2px var(--calcite-ui-border-1) inset}:host([active][appearance=clear]) .button,:host([active][appearance=clear]) .button:hover,:host([active][appearance=clear]) .button:focus{color:var(--calcite-ui-text-1);fill:var(--calcite-ui-text-1);background-color:var(--calcite-ui-foreground-3)}:host([appearance=clear][loading]) .button,:host([appearance=clear][disabled]) .button{background-color:transparent}:host([loading]) .button,:host([loading]) .button:hover,:host([loading]) .button:focus{background-color:var(--calcite-ui-foreground-1)}:host([loading]) .button .text-container,:host([loading]) .button:hover .text-container,:host([loading]) .button:focus .text-container{opacity:var(--calcite-ui-opacity-disabled)}:host([loading]) calcite-loader[inline]{margin-right:0;color:var(--calcite-ui-text-3)}:host([disabled]) .button,:host([disabled]) .button:hover,:host([disabled]) .button:focus{cursor:default;opacity:var(--calcite-ui-opacity-disabled);background-color:var(--calcite-ui-foreground-1)}:host([disabled][active]) .button,:host([disabled][active]) .button:hover,:host([disabled][active]) .button:focus{opacity:var(--calcite-ui-opacity-disabled);background-color:var(--calcite-ui-foreground-3)}:host([indicator]) .button--text-visible,:host([indicator][scale=s]) .button--text-visible,:host([indicator][scale=l]) .button--text-visible{padding-right:1rem}:host([indicator]) .button::after{content:\"\";position:absolute;border-width:2px;background-color:var(--calcite-ui-brand);border-radius:9999px;height:0.5rem;width:0.5rem;z-index:10;border-color:var(--calcite-ui-foreground-1);bottom:0.5rem;right:0.5rem}:host([indicator][scale=s]) .button::after{bottom:0.25rem;right:0.25rem}:host([indicator][scale=l]) .button::after{bottom:0.5rem;right:0.5rem}:host([indicator]) .calcite--rtl::after{right:auto;left:0.25rem}:host([indicator]) .button--text-visible.calcite--rtl{padding-right:0.75rem;padding-left:1rem}:host([indicator]) .button:hover::after,:host([indicator]) .button:focus::after{border-color:var(--calcite-ui-foreground-1)}:host([indicator][active]) .button::after{border-color:var(--calcite-ui-foreground-3)}:host([indicator]) .button--text-visible::after,:host([indicator][scale=s]) .button--text-visible::after,:host([indicator][scale=l]) .button--text-visible::after{bottom:auto;right:0.5rem}:host([indicator]) .button--text-visible.calcite--rtl::after,:host([indicator][scale=s]) .button--text-visible.calcite--rtl::after,:host([indicator][scale=l]) .button--text-visible.calcite--rtl::after{right:auto;left:0.5rem}";

const CalciteAction = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.calciteActionClick = index.createEvent(this, "calciteActionClick", 7);
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------
    /** Specify the appearance style of the action, defaults to solid. */
    this.appearance = "solid";
    /**
     * Indicates whether the action is highlighted.
     */
    this.active = false;
    /**
     * Compact mode is used internally by components to reduce side padding, e.g. calcite-block-section.
     */
    this.compact = false;
    /**
     * When true, disabled prevents interaction. This state shows items with lower opacity/grayed.
     */
    this.disabled = false;
    /**
     * Indicates unread changes.
     */
    this.indicator = false;
    /** string to override English loading text
     * @default "Loading"
     */
    this.intlLoading = TEXT$3.loading;
    /**
     * When true, content is waiting to be loaded. This state shows a busy indicator.
     */
    this.loading = false;
    /**
     * Specifies the size of the action.
     */
    this.scale = "m";
    /**
     * Indicates whether the text is displayed.
     */
    this.textEnabled = false;
    this.observer = new MutationObserver(() => index.forceUpdate(this));
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    this.calciteActionClickHandler = () => {
      if (!this.disabled) {
        this.calciteActionClick.emit();
      }
    };
  }
  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------
  connectedCallback() {
    this.observer.observe(this.el, { childList: true, subtree: true });
  }
  disconnectedCallback() {
    this.observer.disconnect();
  }
  // --------------------------------------------------------------------------
  //
  //  Methods
  //
  // --------------------------------------------------------------------------
  async setFocus() {
    this.buttonEl.focus();
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  renderTextContainer() {
    const { text, textEnabled } = this;
    const textContainerClasses = {
      [CSS$2.textContainer]: true,
      [CSS$2.textContainerVisible]: textEnabled
    };
    return text ? (index.h("div", { class: textContainerClasses, key: "text-container" }, text)) : null;
  }
  renderIconContainer() {
    var _a;
    const { loading, icon, scale, el, intlLoading } = this;
    const iconScale = scale === "l" ? "m" : "s";
    const calciteLoaderNode = loading ? (index.h("calcite-loader", { active: true, inline: true, label: intlLoading, scale: iconScale })) : null;
    const calciteIconNode = icon ? index.h("calcite-icon", { icon: icon, scale: iconScale }) : null;
    const iconNode = calciteLoaderNode || calciteIconNode;
    const hasIconToDisplay = iconNode || ((_a = el.children) === null || _a === void 0 ? void 0 : _a.length);
    const slotContainerNode = (index.h("div", { class: {
        [CSS$2.slotContainer]: true,
        [CSS$2.slotContainerHidden]: loading
      } }, index.h("slot", null)));
    return hasIconToDisplay ? (index.h("div", { "aria-hidden": "true", class: CSS$2.iconContainer, key: "icon-container" }, iconNode, slotContainerNode)) : null;
  }
  render() {
    const { compact, disabled, loading, el, textEnabled, label, text } = this;
    const ariaLabel = label || text;
    const rtl = dom.getElementDir(el) === "rtl";
    const buttonClasses = {
      [CSS$2.button]: true,
      [CSS$2.buttonTextVisible]: textEnabled,
      [CSS$2.buttonCompact]: compact,
      [dom.CSS_UTILITY.rtl]: rtl
    };
    return (index.h(index.Host, { onClick: this.calciteActionClickHandler }, index.h("button", { "aria-busy": loading.toString(), "aria-disabled": disabled.toString(), "aria-label": ariaLabel, class: buttonClasses, disabled: disabled, ref: (buttonEl) => (this.buttonEl = buttonEl) }, this.renderIconContainer(), this.renderTextContainer())));
  }
  get el() { return index.getElement(this); }
};
CalciteAction.style = calciteActionCss;

const ICONS$1 = {
  chevronsLeft: "chevrons-left",
  chevronsRight: "chevrons-right"
};
function getCalcitePosition(position, el) {
  var _a;
  return position || ((_a = el.closest("calcite-shell-panel")) === null || _a === void 0 ? void 0 : _a.position) || "start";
}
function toggleChildActionText({ parent, expanded }) {
  Array.from(parent.querySelectorAll("calcite-action"))
    .filter((el) => el.slot !== "menu-actions")
    .forEach((action) => (action.textEnabled = expanded));
  parent.querySelectorAll("calcite-action-group").forEach((group) => (group.expanded = expanded));
}
const setTooltipReference = ({ tooltip, referenceElement, expanded, ref }) => {
  if (tooltip) {
    tooltip.referenceElement = !expanded && referenceElement;
  }
  if (ref) {
    ref(referenceElement);
  }
  return referenceElement;
};
const CalciteExpandToggle = ({ expanded, intlExpand, intlCollapse, toggle, el, position, tooltip, ref }) => {
  const rtl = dom.getElementDir(el) === "rtl";
  const expandText = expanded ? intlCollapse : intlExpand;
  const icons = [ICONS$1.chevronsLeft, ICONS$1.chevronsRight];
  if (rtl) {
    icons.reverse();
  }
  const end = getCalcitePosition(position, el) === "end";
  const expandIcon = end ? icons[1] : icons[0];
  const collapseIcon = end ? icons[0] : icons[1];
  const actionNode = (index.h("calcite-action", { dir: rtl ? "rtl" : "ltr", icon: expanded ? expandIcon : collapseIcon, onClick: toggle, ref: (referenceElement) => setTooltipReference({ tooltip, referenceElement, expanded, ref }), text: expandText, textEnabled: expanded }));
  return tooltip ? index.h("calcite-tooltip-manager", null, actionNode) : actionNode;
};

const CSS$1 = {
  actionGroupBottom: "action-group--bottom"
};
const SLOTS$2 = {
  bottomActions: "bottom-actions",
  expandTooltip: "expand-tooltip"
};
const TEXT$2 = {
  expand: "Expand",
  collapse: "Collapse"
};

const SLOTS$1 = {
  menuActions: "menu-actions",
  menuTooltip: "menu-tooltip"
};
const TEXT$1 = {
  more: "More"
};
const ICONS = {
  menu: "ellipsis"
};

const actionHeight = 50;
const groupMargin = 18;
const getMaxActionCount = ({ height, groupCount }) => {
  return Math.floor((height - groupCount * groupMargin) / actionHeight);
};
const getOverflowCount = ({ actionCount, height, groupCount }) => {
  return Math.max(actionCount - getMaxActionCount({ height, groupCount }), 0);
};
const queryActions = (el) => {
  return Array.from(el.querySelectorAll("calcite-action")).filter((action) => action.closest("calcite-action-menu") ? action.slot === resources.SLOTS.trigger : true);
};
const overflowActions = ({ actionGroups, expanded, overflowCount }) => {
  let needToSlotCount = overflowCount;
  actionGroups.reverse().forEach((group) => {
    let slottedWithinGroupCount = 0;
    const groupActions = queryActions(group).reverse();
    groupActions.forEach((groupAction) => {
      if (groupAction.slot === SLOTS$1.menuActions) {
        groupAction.removeAttribute("slot");
        groupAction.textEnabled = expanded;
      }
    });
    if (needToSlotCount > 0) {
      groupActions.some((groupAction) => {
        const unslottedActions = groupActions.filter((action) => !action.slot);
        if (unslottedActions.length > 1 && groupActions.length > 2 && !groupAction.closest("calcite-action-menu")) {
          groupAction.textEnabled = true;
          groupAction.setAttribute("slot", SLOTS$1.menuActions);
          slottedWithinGroupCount++;
          if (slottedWithinGroupCount > 1) {
            needToSlotCount--;
          }
        }
        return needToSlotCount < 1;
      });
    }
    index.forceUpdate(group);
  });
};

const calciteActionBarCss = "@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:host{-webkit-box-sizing:border-box;box-sizing:border-box;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-2);font-size:var(--calcite-font-size--1)}:host *{-webkit-box-sizing:border-box;box-sizing:border-box}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{-ms-flex-item-align:stretch;align-self:stretch;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-direction:column;flex-direction:column;pointer-events:auto;max-width:15vw}:host([overflow-actions-disabled]){overflow-y:auto}:host([expanded]){max-width:20vw}::slotted(calcite-action-group){border-width:0;border-bottom-width:1px;border-style:solid;border-color:var(--calcite-ui-border-2)}::slotted(calcite-action-group:last-child){border-bottom-width:0}.action-group--bottom{padding-bottom:0;-ms-flex-positive:1;flex-grow:1;-ms-flex-pack:end;justify-content:flex-end}";

const CalciteActionBar = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.calciteActionBarToggle = index.createEvent(this, "calciteActionBarToggle", 7);
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------
    /**
     * When set to true, the expand-toggling behavior will be disabled.
     */
    this.expandDisabled = false;
    /**
     * Indicates whether widget is expanded.
     */
    this.expanded = false;
    this.mutationObserver = new MutationObserver(() => {
      const { el, expanded } = this;
      toggleChildActionText({ parent: el, expanded });
      this.resize(el.clientHeight);
    });
    this.resizeObserver = new ResizeObserver((entries) => this.resizeHandlerEntries(entries));
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    this.actionMenuOpenChangeHandler = (event) => {
      if (event.detail) {
        const composedPath = event.composedPath();
        Array.from(this.el.querySelectorAll("calcite-action-group")).forEach((group) => {
          if (!composedPath.includes(group)) {
            group.menuOpen = false;
          }
        });
      }
    };
    this.resizeHandlerEntries = (entries) => {
      entries.forEach(this.resizeHandler);
    };
    this.resizeHandler = (entry) => {
      const { height } = entry.contentRect;
      this.resize(height);
    };
    this.resize = (height) => {
      const { el, expanded, expandDisabled, lastActionCount, lastGroupCount, lastResizeHeight, overflowActionsDisabled } = this;
      if (typeof height !== "number" || overflowActionsDisabled) {
        return;
      }
      const actions = queryActions(el);
      const actionCount = expandDisabled ? actions.length : actions.length + 1;
      const actionGroups = Array.from(el.querySelectorAll("calcite-action-group"));
      const groupCount = dom.getSlotted(el, SLOTS$2.bottomActions) || !expandDisabled
        ? actionGroups.length + 1
        : actionGroups.length;
      if (lastResizeHeight === height &&
        lastActionCount === actionCount &&
        lastGroupCount === groupCount) {
        return;
      }
      this.lastActionCount = actionCount;
      this.lastGroupCount = groupCount;
      this.lastResizeHeight = height;
      const overflowCount = getOverflowCount({ actionCount, height, groupCount });
      overflowActions({
        actionGroups,
        expanded,
        overflowCount
      });
    };
    this.toggleExpand = () => {
      this.expanded = !this.expanded;
    };
    this.setExpandToggleRef = (el) => {
      this.expandToggleEl = el;
    };
  }
  expandHandler(expandDisabled) {
    if (!expandDisabled) {
      toggleChildActionText({ parent: this.el, expanded: this.expanded });
    }
    this.resize(this.el.clientHeight);
  }
  expandedHandler(expanded) {
    if (!this.expandDisabled) {
      toggleChildActionText({ parent: this.el, expanded });
    }
    this.calciteActionBarToggle.emit();
  }
  overflowDisabledHandler(overflowActionsDisabled) {
    overflowActionsDisabled
      ? this.resizeObserver.disconnect()
      : this.resizeObserver.observe(this.el);
  }
  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------
  componentWillLoad() {
    const { el, expandDisabled, expanded } = this;
    if (!expandDisabled) {
      toggleChildActionText({ parent: el, expanded });
    }
    this.mutationObserver.observe(el, { childList: true });
    if (!this.overflowActionsDisabled) {
      this.resizeObserver.observe(el);
    }
  }
  componentDidLoad() {
    this.resize(this.el.clientHeight);
  }
  disconnectedCallback() {
    this.mutationObserver.disconnect();
    this.resizeObserver.disconnect();
  }
  // --------------------------------------------------------------------------
  //
  //  Methods
  //
  // --------------------------------------------------------------------------
  async setFocus(focusId) {
    if (focusId === "expand-toggle") {
      await dom.focusElement(this.expandToggleEl);
      return;
    }
    this.el.focus();
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  renderBottomActionGroup() {
    const { expanded, expandDisabled, intlExpand, intlCollapse, el, position, toggleExpand } = this;
    const tooltip = dom.getSlotted(el, SLOTS$2.expandTooltip);
    const expandLabel = intlExpand || TEXT$2.expand;
    const collapseLabel = intlCollapse || TEXT$2.collapse;
    const expandToggleNode = !expandDisabled ? (index.h(CalciteExpandToggle, { el: el, expanded: expanded, intlCollapse: collapseLabel, intlExpand: expandLabel, position: position, ref: this.setExpandToggleRef, toggle: toggleExpand, tooltip: tooltip })) : null;
    return dom.getSlotted(el, SLOTS$2.bottomActions) || expandToggleNode ? (index.h("calcite-action-group", { class: CSS$1.actionGroupBottom }, index.h("slot", { name: SLOTS$2.bottomActions }), index.h("slot", { name: SLOTS$2.expandTooltip }), expandToggleNode)) : null;
  }
  render() {
    return (index.h(index.Host, { onCalciteActionMenuOpenChange: this.actionMenuOpenChangeHandler }, index.h("slot", null), this.renderBottomActionGroup()));
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "expandDisabled": ["expandHandler"],
    "expanded": ["expandedHandler"],
    "overflowActionsDisabled": ["overflowDisabledHandler"]
  }; }
};
CalciteActionBar.style = calciteActionBarCss;

const calciteActionGroupCss = "@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:host{-webkit-box-sizing:border-box;box-sizing:border-box;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-2);font-size:var(--calcite-font-size--1)}:host *{-webkit-box-sizing:border-box;box-sizing:border-box}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;padding:0;--calcite-action-group-columns:3}:host([columns=\"1\"]){--calcite-action-group-columns:1}:host([columns=\"2\"]){--calcite-action-group-columns:2}:host([columns=\"3\"]){--calcite-action-group-columns:3}:host([columns=\"4\"]){--calcite-action-group-columns:4}:host([columns=\"5\"]){--calcite-action-group-columns:5}:host([columns=\"6\"]){--calcite-action-group-columns:6}:host(:first-child){padding-top:0}:host([layout=horizontal]){-ms-flex-direction:row;flex-direction:row}:host([layout=grid]){background-color:var(--calcite-ui-background);display:grid;grid-gap:1px;gap:1px;place-content:stretch;padding:1px;grid-template-columns:repeat(var(--calcite-action-group-columns), auto)}";

const CalciteActionGroup = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------
    /**
     * Indicates whether widget is expanded.
     */
    this.expanded = false;
    /**
     * Indicates the horizontal, vertical, or grid layout of the component.
     */
    this.layout = "vertical";
    /**
     * Opens the action menu.
     */
    this.menuOpen = false;
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    this.setMenuOpen = (event) => {
      this.menuOpen = !!event.detail;
    };
  }
  expandedHandler() {
    this.menuOpen = false;
  }
  // --------------------------------------------------------------------------
  //
  //  Component Methods
  //
  // --------------------------------------------------------------------------
  renderTooltip() {
    const { el } = this;
    const hasTooltip = dom.getSlotted(el, SLOTS$1.menuTooltip);
    return hasTooltip ? index.h("slot", { name: SLOTS$1.menuTooltip, slot: resources.SLOTS.tooltip }) : null;
  }
  renderMenu() {
    const { el, expanded, intlMore, menuOpen } = this;
    const hasMenuItems = dom.getSlotted(el, SLOTS$1.menuActions);
    return hasMenuItems ? (index.h("calcite-action-menu", { expanded: expanded, flipPlacements: ["left", "right"], label: intlMore || TEXT$1.more, onCalciteActionMenuOpenChange: this.setMenuOpen, open: menuOpen, placement: "leading-start" }, index.h("calcite-action", { icon: ICONS.menu, slot: resources.SLOTS.trigger, text: intlMore || TEXT$1.more, textEnabled: expanded }), index.h("slot", { name: SLOTS$1.menuActions }), this.renderTooltip())) : null;
  }
  render() {
    return (index.h(index.Fragment, null, index.h("slot", null), this.renderMenu()));
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "expanded": ["expandedHandler"]
  }; }
};
CalciteActionGroup.style = calciteActionGroupCss;

const calciteActionMenuCss = "@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-webkit-box-sizing:border-box;box-sizing:border-box;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-2);font-size:var(--calcite-font-size-1)}.menu ::slotted(calcite-action){display:-ms-flexbox;display:flex;outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;margin:0.125rem}::slotted(calcite-action[active]){outline:2px solid var(--calcite-ui-brand);outline-offset:2px;outline-offset:0px}.default-trigger{-ms-flex-item-align:stretch;align-self:stretch;-ms-flex:0 1 auto;flex:0 1 auto;height:100%;position:relative}slot[name=trigger]::slotted(calcite-action),calcite-action::slotted([slot=trigger]){-ms-flex-item-align:stretch;align-self:stretch;-ms-flex:0 1 auto;flex:0 1 auto;height:100%;position:relative}.menu{-ms-flex-direction:column;flex-direction:column;-ms-flex-wrap:nowrap;flex-wrap:nowrap;outline:2px solid transparent;outline-offset:2px}";

const SUPPORTED_BUTTON_NAV_KEYS = ["ArrowUp", "ArrowDown"];
const SUPPORTED_MENU_NAV_KEYS = ["ArrowUp", "ArrowDown", "End", "Home"];
const CalciteActionMenu = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.calciteActionMenuOpenChange = index.createEvent(this, "calciteActionMenuOpenChange", 7);
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------
    /**
     * Indicates whether widget is expanded.
     */
    this.expanded = false;
    /**
     * Opens the action menu.
     */
    this.open = false;
    /** Describes the type of positioning to use for the overlaid content. If your element is in a fixed container, use the 'fixed' value. */
    this.overlayPositioning = "absolute";
    /**
     * Determines where the component will be positioned relative to the referenceElement.
     * @see [PopperPlacement](https://github.com/Esri/calcite-components/blob/master/src/utils/popper.ts#L25)
     */
    this.placement = "auto";
    this.actionElements = [];
    this.mutationObserver = new MutationObserver(() => this.getActions());
    this.guid = `calcite-action-menu-${guid.guid()}`;
    this.menuId = `${this.guid}-menu`;
    this.menuButtonId = `${this.guid}-menu-button`;
    this.activeMenuItemIndex = -1;
    // --------------------------------------------------------------------------
    //
    //  Component Methods
    //
    // --------------------------------------------------------------------------
    this.connectMenuButtonEl = () => {
      const { el, menuButtonId, menuId, open, label } = this;
      const menuButtonEl = dom.getSlotted(el, resources.SLOTS.trigger) || this.defaultMenuButtonEl;
      if (this.menuButtonEl === menuButtonEl) {
        return;
      }
      this.disconnectMenuButtonEl();
      this.menuButtonEl = menuButtonEl;
      this.setTooltipReferenceElement();
      if (!menuButtonEl) {
        return;
      }
      menuButtonEl.active = open;
      menuButtonEl.setAttribute("aria-controls", menuId);
      menuButtonEl.setAttribute("aria-expanded", open.toString());
      menuButtonEl.setAttribute("aria-haspopup", "true");
      if (!menuButtonEl.id) {
        menuButtonEl.id = menuButtonId;
      }
      if (!menuButtonEl.label) {
        menuButtonEl.label = label;
      }
      if (!menuButtonEl.text) {
        menuButtonEl.text = label;
      }
      menuButtonEl.addEventListener("click", this.menuButtonClick);
      menuButtonEl.addEventListener("keydown", this.menuButtonKeyDown);
      menuButtonEl.addEventListener("keyup", this.menuButtonKeyUp);
    };
    this.disconnectMenuButtonEl = () => {
      const { menuButtonEl } = this;
      if (!menuButtonEl) {
        return;
      }
      menuButtonEl.removeEventListener("click", this.menuButtonClick);
      menuButtonEl.removeEventListener("keydown", this.menuButtonKeyDown);
      menuButtonEl.removeEventListener("keyup", this.menuButtonKeyUp);
    };
    this.setDefaultMenuButtonEl = (el) => {
      this.defaultMenuButtonEl = el;
      this.connectMenuButtonEl();
    };
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    this.handleCalciteActionClick = () => {
      this.open = false;
      this.setFocus();
    };
    this.menuButtonClick = () => {
      this.toggleOpen();
    };
    this.setTooltipReferenceElement = () => {
      const { el, expanded, menuButtonEl } = this;
      const slotted = dom.getSlotted(el, resources.SLOTS.tooltip);
      const tooltip = (slotted === null || slotted === void 0 ? void 0 : slotted.tagName) === "SLOT" ? slotted.assignedElements()[0] : slotted;
      if ((tooltip === null || tooltip === void 0 ? void 0 : tooltip.tagName) === "CALCITE-TOOLTIP") {
        tooltip.referenceElement = !expanded ? menuButtonEl : null;
      }
    };
    this.updateAction = (action, index) => {
      const { guid, activeMenuItemIndex } = this;
      const id = `${guid}-action-${index}`;
      action.tabIndex = -1;
      action.setAttribute("role", "menuitem");
      if (!action.id) {
        action.id = id;
      }
      action.active = index === activeMenuItemIndex;
    };
    this.updateActions = (actions) => {
      actions === null || actions === void 0 ? void 0 : actions.forEach(this.updateAction);
    };
    this.getActions = () => {
      const { el } = this;
      const assignedActions = this.getAssignedElements().filter((element) => element.tagName === "CALCITE-ACTION" && element.slot !== "trigger");
      const actionElements = assignedActions.length
        ? assignedActions
        : Array.from(el.querySelectorAll("calcite-action:not([slot=trigger])"));
      this.updateActions(actionElements);
      this.actionElements = actionElements;
      this.connectMenuButtonEl();
    };
    this.menuButtonKeyUp = (event) => {
      const { key } = event;
      const { actionElements } = this;
      if (!this.isValidKey(key, SUPPORTED_BUTTON_NAV_KEYS)) {
        return;
      }
      event.preventDefault();
      if (!actionElements.length) {
        return;
      }
      this.toggleOpen(true);
      this.handleActionNavigation(key, actionElements);
    };
    this.menuButtonKeyDown = (event) => {
      const { key } = event;
      if (!this.isValidKey(key, SUPPORTED_BUTTON_NAV_KEYS)) {
        return;
      }
      event.preventDefault();
    };
    this.menuActionsContainerKeyDown = (event) => {
      const { key } = event;
      const { actionElements, activeMenuItemIndex } = this;
      if (key === "Tab") {
        this.open = false;
        return;
      }
      if (key === " " || key === "Enter") {
        event.preventDefault();
        const action = actionElements[activeMenuItemIndex];
        action ? action.click() : this.toggleOpen(false);
        return;
      }
      if (this.isValidKey(key, SUPPORTED_MENU_NAV_KEYS)) {
        event.preventDefault();
      }
    };
    this.menuActionsContainerKeyUp = (event) => {
      const { key } = event;
      const { actionElements } = this;
      if (key === "Escape") {
        this.toggleOpen(false);
        return;
      }
      if (!this.isValidKey(key, SUPPORTED_MENU_NAV_KEYS)) {
        return;
      }
      event.preventDefault();
      if (!actionElements.length) {
        return;
      }
      this.handleActionNavigation(key, actionElements);
    };
    this.handleActionNavigation = (key, actions) => {
      const currentIndex = this.activeMenuItemIndex;
      if (key === "Home") {
        this.activeMenuItemIndex = 0;
      }
      if (key === "End") {
        this.activeMenuItemIndex = actions.length - 1;
      }
      if (key === "ArrowUp") {
        this.activeMenuItemIndex = array.getRoundRobinIndex(Math.max(currentIndex - 1, -1), actions.length);
      }
      if (key === "ArrowDown") {
        this.activeMenuItemIndex = array.getRoundRobinIndex(currentIndex + 1, actions.length);
      }
    };
    this.toggleOpenEnd = () => {
      this.setFocus();
      this.el.removeEventListener("calcitePopoverOpen", this.toggleOpenEnd);
    };
    this.toggleOpen = (value = !this.open) => {
      this.el.addEventListener("calcitePopoverOpen", this.toggleOpenEnd);
      this.open = value;
    };
  }
  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------
  connectedCallback() {
    this.mutationObserver.observe(this.el, { childList: true, subtree: true });
    this.getActions();
  }
  disconnectedCallback() {
    this.mutationObserver.disconnect();
    this.disconnectMenuButtonEl();
  }
  expandedHandler() {
    this.open = false;
    this.setTooltipReferenceElement();
  }
  openHandler(open) {
    this.activeMenuItemIndex = this.open ? 0 : -1;
    if (this.menuButtonEl) {
      this.menuButtonEl.active = open;
    }
    this.calciteActionMenuOpenChange.emit(open);
  }
  closeCalciteActionMenuOnClick(event) {
    const composedPath = event.composedPath();
    if (composedPath.includes(this.el)) {
      return;
    }
    this.open = false;
  }
  activeMenuItemIndexHandler() {
    this.updateActions(this.actionElements);
  }
  // --------------------------------------------------------------------------
  //
  //  Methods
  //
  // --------------------------------------------------------------------------
  async setFocus() {
    dom.focusElement(this.open ? this.menuEl : this.menuButtonEl);
  }
  renderMenuButton() {
    const { el, label } = this;
    const menuButtonSlot = (index.h("slot", { name: resources.SLOTS.trigger }, index.h("calcite-action", { class: resources.CSS.defaultTrigger, icon: resources.ICONS.menu, ref: this.setDefaultMenuButtonEl, text: label })));
    return dom.getSlotted(el, resources.SLOTS.tooltip) ? (index.h("calcite-tooltip-manager", null, menuButtonSlot)) : (menuButtonSlot);
  }
  renderMenuItems() {
    const { actionElements, activeMenuItemIndex, open, menuId, menuButtonEl, label, placement, overlayPositioning } = this;
    const activeAction = actionElements[activeMenuItemIndex];
    const activeDescendantId = (activeAction === null || activeAction === void 0 ? void 0 : activeAction.id) || null;
    return (index.h("calcite-popover", { disablePointer: true, label: label, offsetDistance: 0, open: open, overlayPositioning: overlayPositioning, placement: placement, referenceElement: menuButtonEl }, index.h("div", { "aria-activedescendant": activeDescendantId, "aria-labelledby": menuButtonEl === null || menuButtonEl === void 0 ? void 0 : menuButtonEl.id, class: resources.CSS.menu, id: menuId, onClick: this.handleCalciteActionClick, onKeyDown: this.menuActionsContainerKeyDown, onKeyUp: this.menuActionsContainerKeyUp, ref: (el) => (this.menuEl = el), role: "menu", tabIndex: -1 }, index.h("slot", null))));
  }
  render() {
    return (index.h(index.Fragment, null, this.renderMenuButton(), this.renderMenuItems(), index.h("slot", { name: resources.SLOTS.tooltip })));
  }
  getAssignedElements() {
    return Array.from(this.el.querySelectorAll("slot"))
      .map((slot) => slot.assignedElements({ flatten: true }))
      .reduce((ar, val) => ar.concat(val), []);
  }
  isValidKey(key, supportedKeys) {
    return !!supportedKeys.find((k) => k === key);
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "expanded": ["expandedHandler"],
    "open": ["openHandler"],
    "activeMenuItemIndex": ["activeMenuItemIndexHandler"]
  }; }
};
CalciteActionMenu.style = calciteActionMenuCss;

const CSS = {
  actionGroupBottom: "action-group--bottom",
  container: "container"
};
const TEXT = {
  expand: "Expand",
  collapse: "Collapse"
};
const SLOTS = {
  expandTooltip: "expand-tooltip"
};

const calciteActionPadCss = "@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:host{-webkit-box-sizing:border-box;box-sizing:border-box;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-2);font-size:var(--calcite-font-size--1)}:host *{-webkit-box-sizing:border-box;box-sizing:border-box}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:block;-webkit-animation:in var(--calcite-animation-timing) ease-in-out;animation:in var(--calcite-animation-timing) ease-in-out;border-radius:0.125rem}:host([expanded]){max-width:20vw}::slotted(calcite-action-group){border-width:0;border-bottom-width:1px;border-color:var(--calcite-ui-border-3);border-style:solid;padding-bottom:0;padding-top:0}.container{-ms-flex-direction:column;flex-direction:column;display:-ms-inline-flexbox;display:inline-flex;overflow-y:auto;border-radius:0.25rem;background-color:var(--calcite-ui-background);-webkit-box-shadow:0 6px 20px -4px rgba(0, 0, 0, 0.1), 0 4px 12px -2px rgba(0, 0, 0, 0.08);box-shadow:0 6px 20px -4px rgba(0, 0, 0, 0.1), 0 4px 12px -2px rgba(0, 0, 0, 0.08);max-width:15vw}.action-group--bottom{-ms-flex-positive:1;flex-grow:1;-ms-flex-pack:end;justify-content:flex-end;padding-bottom:0}:host([layout=horizontal]) .container{-ms-flex-direction:row;flex-direction:row;max-width:unset}:host([layout=horizontal]) .container .action-group--bottom{padding:0}:host([layout=horizontal]) .container ::slotted(calcite-action-group){border-width:0;border-right-width:1px;padding:0}:host([layout=horizontal]) .container.calcite--rtl ::slotted(calcite-action-group){border-width:0;border-left-width:1px}::slotted(calcite-action-group:last-child){border-bottom-width:0}";

const CalciteActionPad = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.calciteActionPadToggle = index.createEvent(this, "calciteActionPadToggle", 7);
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------
    /**
     * When set to true, the expand-toggling behavior will be disabled.
     */
    this.expandDisabled = false;
    /**
     * Indicates whether widget is expanded.
     */
    this.expanded = false;
    /**
     * Indicates the horizontal or vertical layout of the component.
     */
    this.layout = "vertical";
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    this.actionMenuOpenChangeHandler = (event) => {
      if (event.detail) {
        const composedPath = event.composedPath();
        Array.from(this.el.querySelectorAll("calcite-action-group")).forEach((group) => {
          if (!composedPath.includes(group)) {
            group.menuOpen = false;
          }
        });
      }
    };
    this.toggleExpand = () => {
      this.expanded = !this.expanded;
    };
    this.setExpandToggleRef = (el) => {
      this.expandToggleEl = el;
    };
  }
  expandHandler(expandDisabled) {
    if (!expandDisabled) {
      toggleChildActionText({ parent: this.el, expanded: this.expanded });
    }
  }
  expandedHandler(expanded) {
    if (!this.expandDisabled) {
      toggleChildActionText({ parent: this.el, expanded });
    }
    this.calciteActionPadToggle.emit();
  }
  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------
  componentWillLoad() {
    const { el, expandDisabled, expanded } = this;
    if (!expandDisabled) {
      toggleChildActionText({ parent: el, expanded });
    }
  }
  // --------------------------------------------------------------------------
  //
  //  Methods
  //
  // --------------------------------------------------------------------------
  async setFocus(focusId) {
    if (focusId === "expand-toggle") {
      await dom.focusElement(this.expandToggleEl);
      return;
    }
    this.el.focus();
  }
  // --------------------------------------------------------------------------
  //
  //  Component Methods
  //
  // --------------------------------------------------------------------------
  renderBottomActionGroup() {
    const { expanded, expandDisabled, intlExpand, intlCollapse, el, position, toggleExpand } = this;
    const tooltip = dom.getSlotted(el, SLOTS.expandTooltip);
    const expandLabel = intlExpand || TEXT.expand;
    const collapseLabel = intlCollapse || TEXT.collapse;
    const expandToggleNode = !expandDisabled ? (index.h(CalciteExpandToggle, { el: el, expanded: expanded, intlCollapse: collapseLabel, intlExpand: expandLabel, position: position, ref: this.setExpandToggleRef, toggle: toggleExpand, tooltip: tooltip })) : null;
    return expandToggleNode ? (index.h("calcite-action-group", { class: CSS.actionGroupBottom }, index.h("slot", { name: SLOTS.expandTooltip }), expandToggleNode)) : null;
  }
  render() {
    const rtl = dom.getElementDir(this.el) === "rtl";
    const containerClasses = {
      [CSS.container]: true,
      [dom.CSS_UTILITY.rtl]: rtl
    };
    return (index.h(index.Host, { onCalciteActionMenuOpenChange: this.actionMenuOpenChangeHandler }, index.h("div", { class: containerClasses }, index.h("slot", null), this.renderBottomActionGroup())));
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "expandDisabled": ["expandHandler"],
    "expanded": ["expandedHandler"]
  }; }
};
CalciteActionPad.style = calciteActionPadCss;

exports.calcite_action = CalciteAction;
exports.calcite_action_bar = CalciteActionBar;
exports.calcite_action_group = CalciteActionGroup;
exports.calcite_action_menu = CalciteActionMenu;
exports.calcite_action_pad = CalciteActionPad;
