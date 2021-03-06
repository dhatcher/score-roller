'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-318f3d91.js');
const resources = require('./resources-6ff7d41a.js');
const dom = require('./dom-57231db9.js');
const CalciteHeading = require('./CalciteHeading-97c17897.js');
require('./array-4fc5abfa.js');
require('./debounce-11980960.js');
require('./guid-4637ad8f.js');

const calcitePickListCss = "@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:host{-webkit-box-sizing:border-box;box-sizing:border-box;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-2);font-size:var(--calcite-font-size--1)}:host *{-webkit-box-sizing:border-box;box-sizing:border-box}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{-ms-flex-align:stretch;align-items:stretch;background-color:transparent;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;position:relative;padding-bottom:0;-ms-flex-positive:1;flex-grow:1;-ms-flex-negative:0;flex-shrink:0}:host([filter-enabled]) header{background-color:var(--calcite-ui-foreground-1);display:-ms-flexbox;display:flex;-ms-flex-pack:end;justify-content:flex-end;-ms-flex-align:stretch;align-items:stretch;margin-bottom:0.25rem;-webkit-box-shadow:0 1px 0 var(--calcite-ui-border-3);box-shadow:0 1px 0 var(--calcite-ui-border-3)}:host([filter-enabled]) header.sticky{position:-webkit-sticky;position:sticky;top:0;z-index:1}calcite-filter{margin-bottom:1px}:host([loading][disabled]){min-height:2rem}";

const CalcitePickList = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.calciteListChange = index.createEvent(this, "calciteListChange", 7);
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------
    /**
     * When true, disabled prevents interaction. This state shows items with lower opacity/grayed.
     */
    this.disabled = false;
    /**
     * When true, an input appears at the top of the list that can be used by end users to filter items in the list.
     */
    this.filterEnabled = false;
    /**
     * When true, content is waiting to be loaded. This state shows a busy indicator.
     */
    this.loading = false;
    /**
     * Multiple works similar to standard radio buttons and checkboxes.
     * When true, a user can select multiple items at a time.
     * When false, only a single item can be selected at a time
     * and selecting a new item will deselect any other selected items.
     */
    this.multiple = false;
    /**
     * When true and single-selection is enabled, the selection will change when navigating items via the keyboard.
     */
    this.selectionFollowsFocus = false;
    // --------------------------------------------------------------------------
    //
    //  Private Properties
    //
    // --------------------------------------------------------------------------
    this.selectedValues = new Map();
    this.dataForFilter = [];
    this.lastSelectedItem = null;
    this.observer = new MutationObserver(resources.mutationObserverCallback.bind(this));
    this.setFilterEl = (el) => {
      this.filterEl = el;
    };
    this.deselectSiblingItems = resources.deselectSiblingItems.bind(this);
    this.selectSiblings = resources.selectSiblings.bind(this);
    this.handleFilter = resources.handleFilter.bind(this);
    this.getItemData = resources.getItemData.bind(this);
    this.keyDownHandler = resources.keyDownHandler.bind(this);
  }
  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------
  connectedCallback() {
    resources.initialize.call(this);
    resources.initializeObserver.call(this);
  }
  disconnectedCallback() {
    resources.cleanUpObserver.call(this);
  }
  calciteListItemRemoveHandler(event) {
    resources.removeItem.call(this, event);
  }
  calciteListItemChangeHandler(event) {
    resources.calciteListItemChangeHandler.call(this, event);
  }
  calciteListItemPropsChangeHandler(event) {
    event.stopPropagation();
    this.setUpFilter();
  }
  calciteListItemValueChangeHandler(event) {
    resources.calciteListItemValueChangeHandler.call(this, event);
  }
  calciteListFocusOutHandler(event) {
    resources.calciteListFocusOutHandler.call(this, event);
  }
  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------
  setUpItems() {
    resources.setUpItems.call(this, "calcite-pick-list-item");
  }
  setUpFilter() {
    if (this.filterEnabled) {
      this.dataForFilter = this.getItemData();
    }
  }
  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------
  async getSelectedItems() {
    return this.selectedValues;
  }
  async setFocus(focusId) {
    return resources.setFocus.call(this, focusId);
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  getIconType() {
    return this.multiple ? resources.ICON_TYPES.square : resources.ICON_TYPES.circle;
  }
  render() {
    return index.h(resources.List, { onKeyDown: this.keyDownHandler, props: this });
  }
  get el() { return index.getElement(this); }
};
CalcitePickList.style = calcitePickListCss;

const CSS = {
  heading: "heading",
  container: "container",
  indented: "container--indented"
};
const SLOTS = {
  parentItem: "parent-item"
};
const HEADING_LEVEL = 3;

const calcitePickListGroupCss = "@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:host{-webkit-box-sizing:border-box;box-sizing:border-box;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-2);font-size:var(--calcite-font-size--1)}:host *{-webkit-box-sizing:border-box;box-sizing:border-box}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{background-color:transparent;display:block;margin-bottom:0.25rem}:host(:last-child){margin-bottom:0}.header{margin:0;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;color:var(--calcite-ui-text-2);fill:var(--calcite-ui-text-2)}.heading{padding:0;margin:0;font-weight:var(--calcite-font-weight-medium);line-height:1.5}.header .heading{-ms-flex:1 0 auto;flex:1 0 auto;padding:var(--calcite-spacing-half) var(--calcite-spacing-half)}h1.heading{font-size:var(--calcite-font-size-2)}h2.heading{font-size:var(--calcite-font-size-1)}h3.heading{font-size:var(--calcite-font-size-0)}h4.heading,h5.heading{font-size:var(--calcite-font-size--1)}h3.heading{font-size:var(--calcite-font-size--1);line-height:1.375;color:var(--calcite-ui-text-3);margin:0.5rem 1rem}.container--indented{margin-left:1.5rem}.calcite--rtl.container--indented{margin-left:0;margin-right:1.5rem}";

const CalcitePickListGroup = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  render() {
    var _a;
    const { el, groupTitle, headingLevel } = this;
    const rtl = dom.getElementDir(el) === "rtl";
    const hasParentItem = dom.getSlotted(el, SLOTS.parentItem) !== null;
    const sectionClasses = {
      [CSS.container]: true,
      [CSS.indented]: hasParentItem,
      [dom.CSS_UTILITY.rtl]: rtl
    };
    const title = groupTitle;
    const parentLevel = (_a = el.closest("calcite-pick-list")) === null || _a === void 0 ? void 0 : _a.headingLevel;
    const relativeLevel = parentLevel ? CalciteHeading.constrainHeadingLevel(parentLevel + 1) : null;
    const level = headingLevel || relativeLevel || HEADING_LEVEL;
    return (index.h(index.Fragment, null, title ? (index.h(CalciteHeading.CalciteHeading, { class: CSS.heading, level: level }, title)) : null, index.h("slot", { name: SLOTS.parentItem }), index.h("section", { class: sectionClasses }, index.h("slot", null))));
  }
  get el() { return index.getElement(this); }
};
CalcitePickListGroup.style = calcitePickListGroupCss;

const calcitePickListItemCss = "@charset \"UTF-8\";@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:host{-webkit-box-sizing:border-box;box-sizing:border-box;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-2);font-size:var(--calcite-font-size--1)}:host *{-webkit-box-sizing:border-box;box-sizing:border-box}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{-ms-flex-align:stretch;align-items:stretch;display:-ms-flexbox;display:flex;color:var(--calcite-ui-text-1);-webkit-box-shadow:0 1px 0 var(--calcite-ui-border-3);box-shadow:0 1px 0 var(--calcite-ui-border-3);margin:0;margin-bottom:1px;-webkit-transition:background-color 150ms ease-in-out;transition:background-color 150ms ease-in-out;-webkit-animation:calcite-fade-in 150ms ease-in-out;animation:calcite-fade-in 150ms ease-in-out}:host(:hover){background-color:var(--calcite-ui-foreground-2)}:host([non-interactive]:hover){background-color:var(--calcite-ui-foreground-1)}:host([non-interactive]) .label,:host([non-interactive]) .icon{pointer-events:none}.icon{-ms-flex-align:center;align-items:center;display:-ms-flexbox;display:flex;margin-top:0;margin-bottom:0;margin-left:0.5rem;margin-right:0.5rem;opacity:0;cursor:pointer;color:var(--calcite-ui-brand);-ms-flex:0 0 auto;flex:0 0 auto;line-height:0}.icon-dot{width:0.5rem;margin:0.5rem}.icon-dot:before{content:\"???\"}:host([selected]) .icon{-webkit-transition:opacity 150ms ease-in-out;transition:opacity 150ms ease-in-out;opacity:1}.label{background-color:transparent;display:-ms-flexbox;display:flex;-ms-flex:1 1 auto;flex:1 1 auto;padding-left:0.75rem;padding-right:0.75rem;padding-top:0.5rem;padding-bottom:0.5rem;-ms-flex-align:center;align-items:center;cursor:pointer;outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}.label:focus{outline:2px solid var(--calcite-ui-brand);outline-offset:-2px}.text-container{display:-ms-flexbox;display:flex;overflow:hidden;pointer-events:none;padding-top:0;padding-bottom:0;padding-left:0.25rem;padding-right:0.25rem;font-size:var(--calcite-font-size--2);line-height:1.375;word-wrap:break-word;word-break:break-word;-ms-flex-flow:column nowrap;flex-flow:column nowrap}.title{color:var(--calcite-ui-text-1)}.description{margin-top:0.125rem;color:var(--calcite-ui-text-3)}.actions{-ms-flex-align:stretch;align-items:stretch;display:-ms-flexbox;display:flex;-ms-flex-pack:end;justify-content:flex-end;margin:0;-ms-flex:0 0 auto;flex:0 0 auto}.actions--start~.label{padding-left:0.25rem}.calcite--rtl .actions--start~.label{padding-left:unset;padding-right:0.25rem}";

const CalcitePickListItem = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.calciteListItemChange = index.createEvent(this, "calciteListItemChange", 7);
    this.calciteListItemRemove = index.createEvent(this, "calciteListItemRemove", 7);
    this.calciteListItemPropsChange = index.createEvent(this, "calciteListItemPropsChange", 7);
    this.calciteListItemValueChange = index.createEvent(this, "calciteListItemValueChange", 7);
    /**
     * When true, the item cannot be clicked and is visually muted.
     */
    this.disabled = false;
    /**
     * When false, the item cannot be deselected by user interaction.
     */
    this.disableDeselect = false;
    /**
     * @internal When true, the item cannot be selected by user interaction.
     */
    this.nonInteractive = false;
    /**
     * Determines the icon SVG symbol that will be shown. Options are circle, square, grip or null.
     * @see [ICON_TYPES](https://github.com/Esri/calcite-components/blob/master/src/components/calcite-pick-list/resources.ts#L5)
     */
    this.icon = null;
    /**
     * Set this to true to display a remove action that removes the item from the list.
     */
    this.removable = false;
    /**
     * Set this to true to pre-select an item. Toggles when an item is checked/unchecked.
     */
    this.selected = false;
    /**
     * The text for the remove item buttons. Only applicable if removable is true.
     * @default "remove"
     */
    this.intlRemove = resources.TEXT.remove;
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    this.pickListClickHandler = (event) => {
      if (this.disabled || (this.disableDeselect && this.selected) || this.nonInteractive) {
        return;
      }
      this.shiftPressed = event.shiftKey;
      this.selected = !this.selected;
    };
    this.pickListKeyDownHandler = (event) => {
      if (event.key === " ") {
        event.preventDefault();
        if (this.disableDeselect && this.selected || this.nonInteractive) {
          return;
        }
        this.selected = !this.selected;
      }
    };
    this.removeClickHandler = () => {
      this.calciteListItemRemove.emit();
    };
  }
  descriptionWatchHandler() {
    this.calciteListItemPropsChange.emit();
  }
  labelWatchHandler() {
    this.calciteListItemPropsChange.emit();
  }
  metadataWatchHandler() {
    this.calciteListItemPropsChange.emit();
  }
  selectedWatchHandler() {
    this.calciteListItemChange.emit({
      item: this.el,
      value: this.value,
      selected: this.selected,
      shiftPressed: this.shiftPressed
    });
    this.shiftPressed = false;
  }
  valueWatchHandler(newValue, oldValue) {
    this.calciteListItemValueChange.emit({ oldValue, newValue });
  }
  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------
  /**
   * Used to toggle the selection state. By default this won't trigger an event.
   * The first argument allows the value to be coerced, rather than swapping values.
   */
  async toggleSelected(coerce) {
    if (this.disabled) {
      return;
    }
    this.selected = typeof coerce === "boolean" ? coerce : !this.selected;
  }
  async setFocus() {
    var _a;
    (_a = this.focusEl) === null || _a === void 0 ? void 0 : _a.focus();
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  renderIcon() {
    const { icon } = this;
    if (!icon) {
      return null;
    }
    return (index.h("span", { class: {
        [resources.CSS.icon]: true,
        [resources.CSS.iconDot]: icon === resources.ICON_TYPES.circle
      }, onClick: this.pickListClickHandler }, icon === resources.ICON_TYPES.square ? index.h("calcite-icon", { icon: resources.ICONS.checked, scale: "s" }) : null));
  }
  renderRemoveAction() {
    return this.removable ? (index.h("calcite-action", { class: resources.CSS.remove, icon: resources.ICONS.remove, onCalciteActionClick: this.removeClickHandler, slot: resources.SLOTS.actionsEnd, text: this.intlRemove })) : null;
  }
  renderActionsStart() {
    const { el } = this;
    const hasActionsStart = dom.getSlotted(el, resources.SLOTS.actionsStart);
    return hasActionsStart ? (index.h("div", { class: { [resources.CSS.actions]: true, [resources.CSS.actionsStart]: true } }, index.h("slot", { name: resources.SLOTS.actionsStart }))) : null;
  }
  renderActionsEnd() {
    const { el, removable } = this;
    const hasActionsEnd = dom.getSlotted(el, resources.SLOTS.actionsEnd);
    return hasActionsEnd || removable ? (index.h("div", { class: { [resources.CSS.actions]: true, [resources.CSS.actionsEnd]: true } }, index.h("slot", { name: resources.SLOTS.actionsEnd }), this.renderRemoveAction())) : null;
  }
  render() {
    const { description, label } = this;
    return (index.h(index.Fragment, null, this.renderIcon(), this.renderActionsStart(), index.h("label", { "aria-label": label, class: resources.CSS.label, onClick: this.pickListClickHandler, onKeyDown: this.pickListKeyDownHandler, ref: (focusEl) => (this.focusEl = focusEl), tabIndex: 0 }, index.h("div", { "aria-checked": this.selected.toString(), class: resources.CSS.textContainer, role: "menuitemcheckbox" }, index.h("span", { class: resources.CSS.title }, label), description ? index.h("span", { class: resources.CSS.description }, description) : null)), this.renderActionsEnd()));
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "description": ["descriptionWatchHandler"],
    "label": ["labelWatchHandler"],
    "metadata": ["metadataWatchHandler"],
    "selected": ["selectedWatchHandler"],
    "value": ["valueWatchHandler"]
  }; }
};
CalcitePickListItem.style = calcitePickListItemCss;

exports.calcite_pick_list = CalcitePickList;
exports.calcite_pick_list_group = CalcitePickListGroup;
exports.calcite_pick_list_item = CalcitePickListItem;
