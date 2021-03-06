'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-318f3d91.js');
const sortable_esm = require('./sortable.esm-bcce1d94.js');
const resources = require('./resources-6ff7d41a.js');
const array = require('./array-4fc5abfa.js');
const guid = require('./guid-4637ad8f.js');
const dom = require('./dom-57231db9.js');
require('./debounce-11980960.js');

const CSS = {
  container: "container",
  handle: "handle"
};
var ICON_TYPES;
(function (ICON_TYPES) {
  ICON_TYPES["grip"] = "grip";
})(ICON_TYPES || (ICON_TYPES = {}));

const calciteValueListCss = "@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:host{-webkit-box-sizing:border-box;box-sizing:border-box;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-2);font-size:var(--calcite-font-size--1)}:host *{-webkit-box-sizing:border-box;box-sizing:border-box}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{-ms-flex-align:stretch;align-items:stretch;background-color:transparent;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;position:relative;-ms-flex-negative:0;flex-shrink:0;-ms-flex-positive:0;flex-grow:0}calcite-value-list-item:last-of-type{-webkit-box-shadow:none;box-shadow:none}:host([filter-enabled]) header{background-color:var(--calcite-ui-foreground-1);display:-ms-flexbox;display:flex;-ms-flex-pack:end;justify-content:flex-end;-ms-flex-align:center;align-items:center;margin-bottom:0.25rem;-webkit-box-shadow:0 1px 0 var(--calcite-ui-border-3);box-shadow:0 1px 0 var(--calcite-ui-border-3)}:host([filter-enabled]) header.sticky{position:-webkit-sticky;position:sticky;top:0;z-index:10}calcite-filter{margin-bottom:1px}";

const CalciteValueList = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.calciteListChange = index.createEvent(this, "calciteListChange", 7);
    this.calciteListOrderChange = index.createEvent(this, "calciteListOrderChange", 7);
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
     * When true, the items will be sortable via drag and drop.
     */
    this.dragEnabled = false;
    /**
     * When true, an input appears at the top of the list that can be used by end users to filter items in the list.
     */
    this.filterEnabled = false;
    /**
     * When true, content is waiting to be loaded. This state shows a busy indicator.
     */
    this.loading = false;
    /**
     * Multiple Works similar to standard radio buttons and checkboxes.
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
    this.keyDownHandler = (event) => {
      const handleElement = event
        .composedPath()
        .find((item) => { var _a; return ((_a = item.dataset) === null || _a === void 0 ? void 0 : _a.jsHandle) !== undefined; });
      const item = event
        .composedPath()
        .find((item) => { var _a; return ((_a = item.tagName) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === "calcite-value-list-item"; });
      // Only trigger keyboard sorting when the internal drag handle is focused and activated
      if (!handleElement || !item.handleActivated) {
        resources.keyDownHandler.call(this, event);
        return;
      }
      if (event.key !== "ArrowUp" && event.key !== "ArrowDown") {
        return;
      }
      event.preventDefault();
      const { el, items } = this;
      const moveOffset = event.key === "ArrowDown" ? 1 : -1;
      const currentIndex = items.indexOf(item);
      const nextIndex = array.getRoundRobinIndex(currentIndex + moveOffset, items.length);
      if (nextIndex === items.length - 1) {
        el.appendChild(item);
      }
      else {
        const itemAtNextIndex = el.children[nextIndex];
        const insertionReferenceItem = itemAtNextIndex === item.nextElementSibling
          ? itemAtNextIndex.nextElementSibling
          : itemAtNextIndex;
        el.insertBefore(item, insertionReferenceItem);
      }
      requestAnimationFrame(() => handleElement.focus());
      item.handleActivated = true;
    };
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
  componentDidLoad() {
    this.setUpDragAndDrop();
  }
  disconnectedCallback() {
    resources.cleanUpObserver.call(this);
    this.cleanUpDragAndDrop();
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
  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------
  setUpItems() {
    resources.setUpItems.call(this, "calcite-value-list-item");
  }
  setUpFilter() {
    if (this.filterEnabled) {
      this.dataForFilter = this.getItemData();
    }
  }
  setUpDragAndDrop() {
    this.cleanUpDragAndDrop();
    if (!this.dragEnabled) {
      return;
    }
    this.sortable = sortable_esm.Sortable.create(this.el, {
      dataIdAttr: "id",
      handle: `.${CSS.handle}`,
      draggable: "calcite-value-list-item",
      group: this.group,
      onSort: () => {
        this.items = Array.from(this.el.querySelectorAll("calcite-value-list-item"));
        const values = this.items.map((item) => item.value);
        this.calciteListOrderChange.emit(values);
      }
    });
  }
  cleanUpDragAndDrop() {
    var _a;
    (_a = this.sortable) === null || _a === void 0 ? void 0 : _a.destroy();
    this.sortable = null;
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
    let type = null;
    if (this.dragEnabled) {
      type = ICON_TYPES.grip;
    }
    return type;
  }
  render() {
    return index.h(resources.List, { onKeyDown: this.keyDownHandler, props: this });
  }
  get el() { return index.getElement(this); }
};
CalciteValueList.style = calciteValueListCss;

const ICONS = {
  drag: "drag"
};
const SLOTS = {
  actionsEnd: "actions-end",
  actionsStart: "actions-start"
};

const calciteValueListItemCss = "@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:host{-webkit-box-sizing:border-box;box-sizing:border-box;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-2);font-size:var(--calcite-font-size--1)}:host *{-webkit-box-sizing:border-box;box-sizing:border-box}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{margin-bottom:1px;display:-ms-flexbox;display:flex;-webkit-box-shadow:0 1px 0 var(--calcite-ui-border-3);box-shadow:0 1px 0 var(--calcite-ui-border-3);-webkit-transition:background-color 150ms ease-in-out, -webkit-box-shadow 150ms ease-in-out;transition:background-color 150ms ease-in-out, -webkit-box-shadow 150ms ease-in-out;transition:background-color 150ms ease-in-out, box-shadow 150ms ease-in-out;transition:background-color 150ms ease-in-out, box-shadow 150ms ease-in-out, -webkit-box-shadow 150ms ease-in-out}calcite-pick-list-item{-webkit-box-shadow:none;box-shadow:none;-ms-flex-positive:1;flex-grow:1;position:relative;margin:0}:host([active]),:host([selected]){-webkit-box-shadow:0 0 0 1px var(--calcite-ui-brand);box-shadow:0 0 0 1px var(--calcite-ui-brand)}.handle{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;padding-top:0;padding-bottom:0;padding-left:0.25rem;padding-right:0.25rem;background-color:transparent;border-style:none;color:var(--calcite-ui-text-1);cursor:move;color:var(--calcite-ui-border-1);outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}.handle:hover{background-color:var(--calcite-ui-foreground-2);color:var(--calcite-ui-text-1)}.handle:focus{outline:2px solid var(--calcite-ui-brand);outline-offset:-2px}.handle--activated{background-color:var(--calcite-ui-foreground-3);color:var(--calcite-ui-text-1)}.handle calcite-icon{color:inherit}";

const CalciteValueListItem = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.calciteListItemRemove = index.createEvent(this, "calciteListItemRemove", 7);
    /**
     * When true, the item cannot be clicked and is visually muted
     */
    this.disabled = false;
    /**
     * @internal When false, the item cannot be deselected by user interaction.
     */
    this.disableDeselect = false;
    /**
     * When true, prevents the content of the list item from user interaction.
     */
    this.nonInteractive = false;
    /**
     * @internal - stores the activated state of the drag handle.
     */
    this.handleActivated = false;
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
    this.pickListItem = null;
    this.guid = `calcite-value-list-item-${guid.guid()}`;
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    this.getPickListRef = (el) => (this.pickListItem = el);
    this.handleKeyDown = (event) => {
      if (event.key === " ") {
        this.handleActivated = !this.handleActivated;
      }
    };
    this.handleBlur = () => {
      this.handleActivated = false;
    };
    this.handleSelectChange = (event) => {
      this.selected = event.detail.selected;
    };
  }
  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------
  async toggleSelected(coerce) {
    this.pickListItem.toggleSelected(coerce);
  }
  async setFocus() {
    var _a;
    (_a = this.pickListItem) === null || _a === void 0 ? void 0 : _a.setFocus();
  }
  calciteListItemChangeHandler(event) {
    // adjust item payload from wrapped item before bubbling
    event.detail.item = this.el;
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  renderActionsEnd() {
    const { el } = this;
    const hasActionsEnd = dom.getSlotted(el, SLOTS.actionsEnd);
    return hasActionsEnd ? (index.h("slot", { name: SLOTS.actionsEnd, slot: resources.SLOTS.actionsEnd })) : null;
  }
  renderActionsStart() {
    const { el } = this;
    const hasActionsStart = dom.getSlotted(el, SLOTS.actionsStart);
    return hasActionsStart ? (index.h("slot", { name: SLOTS.actionsStart, slot: resources.SLOTS.actionsStart })) : null;
  }
  renderHandle() {
    const { icon } = this;
    if (icon === resources.ICON_TYPES.grip) {
      return (index.h("span", { "aria-pressed": this.handleActivated.toString(), class: {
          [resources.CSS.handle]: true,
          [resources.CSS.handleActivated]: this.handleActivated
        }, "data-js-handle": true, onBlur: this.handleBlur, onKeyDown: this.handleKeyDown, role: "button", tabindex: "0" }, index.h("calcite-icon", { icon: ICONS.drag, scale: "s" })));
    }
  }
  render() {
    return (index.h(index.Host, { id: this.el.id || this.guid }, this.renderHandle(), index.h("calcite-pick-list-item", { description: this.description, disableDeselect: this.disableDeselect, nonInteractive: this.nonInteractive, disabled: this.disabled, label: this.label, metadata: this.metadata, onCalciteListItemChange: this.handleSelectChange, ref: this.getPickListRef, removable: this.removable, selected: this.selected, value: this.value }, this.renderActionsStart(), this.renderActionsEnd())));
  }
  get el() { return index.getElement(this); }
};
CalciteValueListItem.style = calciteValueListItemCss;

exports.calcite_value_list = CalciteValueList;
exports.calcite_value_list_item = CalciteValueListItem;
