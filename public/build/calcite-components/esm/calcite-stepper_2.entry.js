import { r as registerInstance, c as createEvent, h, g as getElement, H as Host } from './index-b3673963.js';
import { g as getKey } from './key-ec82f942.js';
import { d as getElementProp, g as getElementDir, C as CSS_UTILITY } from './dom-7b4de04f.js';
import './guid-09142681.js';

const calciteStepperCss = "@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;-ms-flex-wrap:wrap;flex-wrap:wrap;position:relative;-ms-flex-pack:justify;justify-content:space-between;-ms-flex-align:stretch;align-items:stretch;width:100%;min-width:100%}:host([layout=vertical]){-ms-flex-direction:column;flex-direction:column;-ms-flex:1 1 auto;flex:1 1 auto}:host ::slotted(.calcite-stepper-content){display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-wrap:wrap;flex-wrap:wrap;width:100%;min-width:100%}";

const CalciteStepper = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteStepperItemChange = createEvent(this, "calciteStepperItemChange", 7);
    //--------------------------------------------------------------------------
    //
    //  Public Properties
    //
    //--------------------------------------------------------------------------
    /** optionally display a status icon next to the step title */
    this.icon = false;
    /** specify the layout of stepper, defaults to horizontal */
    this.layout = "horizontal";
    /** optionally display the number next to the step title */
    this.numbered = false;
    /** specify the scale of stepper, defaults to m */
    this.scale = "m";
    //--------------------------------------------------------------------------
    //
    //  Private State/Props
    //
    //--------------------------------------------------------------------------
    /** created list of Stepper items */
    this.items = [];
    /** sorted list of Stepper items */
    this.sortedItems = [];
  }
  // watch for removal of disabled to register step
  contentWatcher() {
    if (this.layout === "horizontal") {
      if (!this.stepperContentContainer && this.requestedContent) {
        this.addHorizontalContentContainer();
      }
      this.updateContent(this.requestedContent);
    }
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  componentDidLoad() {
    // if no stepper items are set as active, default to the first one
    if (!this.currentPosition) {
      this.calciteStepperItemChange.emit({
        position: 0
      });
    }
  }
  componentWillLoad() {
    if (this.layout === "horizontal" && !this.stepperContentContainer) {
      this.addHorizontalContentContainer();
    }
  }
  render() {
    return h("slot", null);
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  calciteStepperItemKeyEvent(e) {
    const item = e.detail.item;
    const itemToFocus = e.target;
    const isFirstItem = this.itemIndex(itemToFocus) === 0;
    const isLastItem = this.itemIndex(itemToFocus) === this.sortedItems.length - 1;
    switch (getKey(item.key)) {
      case "ArrowDown":
      case "ArrowRight":
        if (isLastItem) {
          this.focusFirstItem();
        }
        else {
          this.focusNextItem(itemToFocus);
        }
        break;
      case "ArrowUp":
      case "ArrowLeft":
        if (isFirstItem) {
          this.focusLastItem();
        }
        else {
          this.focusPrevItem(itemToFocus);
        }
        break;
      case "Home":
        this.focusFirstItem();
        break;
      case "End":
        this.focusLastItem();
        break;
    }
  }
  registerItem(event) {
    const item = {
      item: event.target,
      position: event.detail.position,
      content: event.detail.content
    };
    if (item.content && item.item.active) {
      this.requestedContent = item.content;
    }
    if (!this.items.includes(item)) {
      this.items.push(item);
    }
    this.sortedItems = this.sortItems();
  }
  updateItem(event) {
    if (event.detail.content) {
      this.requestedContent = event.detail.content;
    }
    this.currentPosition = event.detail.position;
    this.calciteStepperItemChange.emit({
      position: this.currentPosition
    });
  }
  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  /** set the next step as active */
  async nextStep() {
    this.currentPosition =
      this.currentPosition + 1 < this.items.length
        ? this.currentPosition + 1
        : this.currentPosition;
    this.emitChangedItem();
  }
  /** set the previous step as active */
  async prevStep() {
    this.currentPosition =
      this.currentPosition - 1 >= 0 ? this.currentPosition - 1 : this.currentPosition;
    this.emitChangedItem();
  }
  /** set the requested step as active */
  async goToStep(num) {
    this.currentPosition = num - 1;
    this.emitChangedItem();
  }
  /** set the first step as active */
  async startStep() {
    this.currentPosition = 0;
    this.emitChangedItem();
  }
  /** set the last step as active */
  async endStep() {
    this.currentPosition = this.items.length - 1;
    this.emitChangedItem();
  }
  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  addHorizontalContentContainer() {
    this.stepperContentContainer = document.createElement("div");
    this.stepperContentContainer.classList.add("calcite-stepper-content");
    this.el.insertAdjacentElement("beforeend", this.stepperContentContainer);
  }
  emitChangedItem() {
    this.calciteStepperItemChange.emit({
      position: this.currentPosition
    });
  }
  focusFirstItem() {
    const firstItem = this.sortedItems[0];
    this.focusElement(firstItem);
  }
  focusLastItem() {
    const lastItem = this.sortedItems[this.sortedItems.length - 1];
    this.focusElement(lastItem);
  }
  focusNextItem(e) {
    const index = this.itemIndex(e);
    const nextItem = this.sortedItems[index + 1] || this.sortedItems[0];
    this.focusElement(nextItem);
  }
  focusPrevItem(e) {
    const index = this.itemIndex(e);
    const prevItem = this.sortedItems[index - 1] || this.sortedItems[this.sortedItems.length - 1];
    this.focusElement(prevItem);
  }
  itemIndex(e) {
    return this.sortedItems.indexOf(e);
  }
  focusElement(item) {
    const target = item;
    target.focus();
  }
  sortItems() {
    const items = Array.from(this.items)
      .filter((a) => !a.item.disabled)
      .sort((a, b) => a.position - b.position)
      .map((a) => a.item);
    return [...Array.from(new Set(items))];
  }
  updateContent(content) {
    this.stepperContentContainer.innerHTML = "";
    this.stepperContentContainer.append(...content);
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "requestedContent": ["contentWatcher"]
  }; }
};
CalciteStepper.style = calciteStepperCss;

const calciteStepperItemCss = "@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host([scale=s]){--calcite-stepper-item-spacing-unit-s:0.25rem;--calcite-stepper-item-spacing-unit-m:0.75rem;--calcite-stepper-item-spacing-unit-l:1rem;font-size:var(--calcite-font-size--1);line-height:1.375;margin-right:0.25rem}:host([scale=s]) .stepper-item-subtitle{font-size:var(--calcite-font-size--2);line-height:1.375}:host([scale=m]){--calcite-stepper-item-spacing-unit-s:0.5rem;--calcite-stepper-item-spacing-unit-m:1rem;--calcite-stepper-item-spacing-unit-l:1.25rem;font-size:var(--calcite-font-size-0);line-height:1.375;margin-right:0.5rem}:host([scale=m]) .stepper-item-subtitle{font-size:var(--calcite-font-size--1);line-height:1.375}:host([scale=l]){--calcite-stepper-item-spacing-unit-s:0.75rem;--calcite-stepper-item-spacing-unit-m:1.25rem;--calcite-stepper-item-spacing-unit-l:1.5rem;font-size:var(--calcite-font-size-1);line-height:1.375;margin-right:0.75rem}:host([scale=l]) .stepper-item-subtitle{font-size:var(--calcite-font-size-0);line-height:1.375}:host{display:-ms-flexbox;display:flex;-ms-flex-positive:1;flex-grow:1;-ms-flex-direction:column;flex-direction:column;position:relative}:host .container{display:-ms-flexbox;display:flex;-ms-flex-positive:1;flex-grow:1;-ms-flex-direction:column;flex-direction:column;color:var(--calcite-ui-text-3);text-decoration:none;outline:2px solid transparent;outline-offset:2px;position:relative;border-width:0;border-top-width:2px;border-style:solid;border-color:var(--calcite-ui-border-3);cursor:pointer;-webkit-transition-duration:150ms;transition-duration:150ms;-webkit-transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1)}.calcite--rtl{margin-left:var(--calcite-stepper-item-spacing-unit-l);margin-right:0}:host{outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}:host(:focus){outline:2px solid var(--calcite-ui-brand);outline-offset:2px}:host .stepper-item-header{display:-ms-flexbox;display:flex;-ms-flex-align:start;align-items:flex-start;cursor:pointer}:host .stepper-item-content,:host .stepper-item-header{padding:var(--calcite-stepper-item-spacing-unit-l) var(--calcite-stepper-item-spacing-unit-m);padding-left:0;text-align:left;-webkit-transition-duration:150ms;transition-duration:150ms;-webkit-transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1)}.calcite--rtl .stepper-item-content,.calcite--rtl .stepper-item-header{padding-right:0;text-align:right;-webkit-transition-duration:150ms;transition-duration:150ms;-webkit-transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);padding-left:initial}:host .stepper-item-header *{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;-webkit-transition-duration:150ms;transition-duration:150ms;-webkit-transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1)}:host .stepper-item-content{-ms-flex-direction:column;flex-direction:column;width:100%;display:none;font-size:var(--calcite-font-size--2);line-height:1.375}:host .stepper-item-icon{margin-right:var(--calcite-stepper-item-spacing-unit-m);color:var(--calcite-ui-text-3);margin-top:1px;opacity:var(--calcite-ui-opacity-disabled);display:-ms-inline-flexbox;display:inline-flex;-ms-flex-negative:0;flex-shrink:0;-ms-flex-item-align:start;align-self:flex-start;height:0.75rem;-webkit-transition-duration:150ms;transition-duration:150ms;-webkit-transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1)}.calcite--rtl .stepper-item-icon{margin-left:var(--calcite-stepper-item-spacing-unit-l);margin-right:0}:host .stepper-item-header-text{margin-right:auto;-ms-flex-direction:column;flex-direction:column;text-align:initial}.calcite--rtl .stepper-item-header-text{margin-left:auto;margin-right:0}:host .stepper-item-title,:host .stepper-item-subtitle{display:-ms-flexbox;display:flex;width:100%}:host .stepper-item-title{color:var(--calcite-ui-text-2);font-weight:var(--calcite-font-weight-medium);margin-bottom:0.25rem}:host .stepper-item-subtitle{color:var(--calcite-ui-text-3)}.calcite--rtl .stepper-item-title{margin-right:0;margin-left:auto}:host .stepper-item-number{font-weight:var(--calcite-font-weight-medium);color:var(--calcite-ui-text-3);-webkit-transition-duration:150ms;transition-duration:150ms;-webkit-transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);margin-right:var(--calcite-stepper-item-spacing-unit-m)}.calcite--rtl .stepper-item-number{margin-left:var(--calcite-stepper-item-spacing-unit-m);margin-right:initial}:host([disabled]){opacity:var(--calcite-ui-opacity-disabled)}:host([disabled]),:host([disabled]) *{cursor:not-allowed;pointer-events:auto}:host([complete]) .container{border-color:rgba(0, 122, 194, 0.5)}:host([complete]) .container .stepper-item-icon{color:var(--calcite-ui-brand)}:host([error]) .container{border-top-color:var(--calcite-ui-danger)}:host([error]) .container .stepper-item-number{color:var(--calcite-ui-danger)}:host([error]) .container .stepper-item-icon{opacity:1;color:var(--calcite-ui-danger)}:host(:hover:not([disabled]):not([active])) .container,:host(:focus:not([disabled]):not([active])) .container{border-top-color:var(--calcite-ui-brand)}:host(:hover:not([disabled]):not([active])) .container .stepper-item-title,:host(:focus:not([disabled]):not([active])) .container .stepper-item-title{color:var(--calcite-ui-text-1)}:host(:hover:not([disabled]):not([active])) .container .stepper-item-subtitle,:host(:focus:not([disabled]):not([active])) .container .stepper-item-subtitle{color:var(--calcite-ui-text-2)}:host([error]:hover:not([disabled]):not([active])) .container,:host([error]:focus:not([disabled]):not([active])) .container{border-top-color:var(--calcite-ui-danger-hover)}:host([active]) .container{border-top-color:var(--calcite-ui-brand)}:host([active]) .container .stepper-item-title{color:var(--calcite-ui-text-1)}:host([active]) .container .stepper-item-subtitle{color:var(--calcite-ui-text-2)}:host([active]) .container .stepper-item-number{color:var(--calcite-ui-brand)}:host([active]) .container .stepper-item-icon{color:var(--calcite-ui-brand);opacity:1}:host([layout=vertical]) .container{-ms-flex:1 1 auto;flex:1 1 auto;border-top-width:0;border-left-width:2px;border-style:solid;border-color:var(--calcite-ui-border-3);padding-top:0;padding-bottom:0;padding-right:0;margin-left:0;margin-right:0;margin-top:0;padding-left:var(--calcite-stepper-item-spacing-unit-l);margin-bottom:var(--calcite-stepper-item-spacing-unit-s)}:host([layout=vertical]) .container .stepper-item-icon{margin-top:1px;margin-right:0;margin-bottom:0;margin-left:auto;-ms-flex-order:3;order:3;padding-left:var(--calcite-stepper-item-spacing-unit-s)}:host([layout=vertical]) .container .stepper-item-header{padding-right:0}:host([layout=vertical]) .container .stepper-item-content{padding:0}:host([layout=vertical][active]) .container .stepper-item-content{display:-ms-flexbox;display:flex}:host([layout=vertical][active]) .container .stepper-item-content ::slotted(:last-child){margin-bottom:var(--calcite-stepper-item-spacing-unit-l)}:host([layout=vertical]) .calcite--rtl{border-left-width:0;border-right-width:2px;border-color:var(--calcite-ui-border-3);padding-top:0;padding-bottom:0;padding-left:0;padding-right:var(--calcite-stepper-item-spacing-unit-l)}:host([layout=vertical]) .calcite--rtl .stepper-item-icon{margin-bottom:0;margin-left:0;padding-left:0;padding-right:var(--calcite-stepper-item-spacing-unit-l)}:host([layout=vertical]) .calcite--rtl .stepper-item-header{padding-left:0;padding-right:intial}:host([layout=vertical][complete]) .container{border-color:rgba(0, 122, 194, 0.5)}:host([layout=vertical][complete]:hover:not([disabled]):not([active])) .container,:host([layout=vertical][complete]:focus:not([disabled]):not([active])) .container{border-color:var(--calcite-ui-brand)}:host([layout=vertical][error]) .container{border-color:var(--calcite-ui-danger)}:host([layout=vertical][active]) .container{border-color:var(--calcite-ui-brand)}:host([layout=vertical]:hover:not([disabled]):not([active])) .container,:host([layout=vertical]:focus:not([disabled]):not([active])) .container{border-color:rgba(0, 122, 194, 0.5)}:host([layout=vertical][error]:hover:not([disabled]):not([active])) .container,:host([layout=vertical][error]:focus:not([disabled]):not([active])) .container{border-color:var(--calcite-ui-danger-hover)}";

const CalciteStepperItem = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteStepperItemKeyEvent = createEvent(this, "calciteStepperItemKeyEvent", 7);
    this.calciteStepperItemSelect = createEvent(this, "calciteStepperItemSelect", 7);
    this.calciteStepperItemRegister = createEvent(this, "calciteStepperItemRegister", 7);
    //--------------------------------------------------------------------------
    //
    //  Public Properties
    //
    //--------------------------------------------------------------------------
    /** is the step active */
    this.active = false;
    /** has the step been completed */
    this.complete = false;
    /** does the step contain an error that needs to be resolved by the user */
    this.error = false;
    /** is the step disabled and not navigable to by a user */
    this.disabled = false;
    /** should the items display an icon based on status */
    /** @internal */
    this.icon = false;
    /** optionally display the step number next to the title and subtitle */
    /** @internal */
    this.numbered = false;
    /** the scale of the item */
    /** @internal */
    this.scale = "m";
  }
  // watch for removal of disabled to register step
  disabledWatcher() {
    this.registerStepperItem();
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  componentWillLoad() {
    this.icon = getElementProp(this.el, "icon", false);
    this.numbered = getElementProp(this.el, "numbered", false);
    this.layout = getElementProp(this.el, "layout", false);
    this.scale = getElementProp(this.el, "scale", "m");
    this.parentStepperEl = this.el.parentElement;
  }
  componentDidLoad() {
    this.itemPosition = this.getItemPosition();
    this.itemContent = this.getItemContent();
    this.registerStepperItem();
    if (this.active) {
      this.emitRequestedItem();
    }
  }
  componentDidUpdate() {
    if (this.active) {
      this.emitRequestedItem();
    }
  }
  render() {
    const dir = getElementDir(this.el);
    return (h(Host, { "aria-expanded": this.active.toString(), onClick: () => this.emitRequestedItem(), tabindex: this.disabled ? null : 0 }, h("div", { class: { container: true, [CSS_UTILITY.rtl]: dir === "rtl" } }, h("div", { class: "stepper-item-header" }, this.icon ? this.renderIcon() : null, this.numbered ? (h("div", { class: "stepper-item-number" }, this.getItemPosition() + 1, ".")) : null, h("div", { class: "stepper-item-header-text" }, h("span", { class: "stepper-item-title" }, this.itemTitle), h("span", { class: "stepper-item-subtitle" }, this.itemSubtitle))), h("div", { class: "stepper-item-content" }, h("slot", null)))));
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  keyDownHandler(e) {
    if (!this.disabled && e.target === this.el) {
      switch (getKey(e.key)) {
        case " ":
        case "Enter":
          this.emitRequestedItem();
          e.preventDefault();
          break;
        case "ArrowUp":
        case "ArrowDown":
        case "ArrowLeft":
        case "ArrowRight":
        case "Home":
        case "End":
          this.calciteStepperItemKeyEvent.emit({ item: e });
          e.preventDefault();
          break;
      }
    }
  }
  updateActiveItemOnChange(event) {
    if (event.target === this.parentStepperEl) {
      this.activePosition = event.detail.position;
      this.determineActiveItem();
    }
  }
  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  renderIcon() {
    const path = this.active
      ? "circleF"
      : this.error
        ? "exclamationMarkCircleF"
        : this.complete
          ? "checkCircleF"
          : "circle";
    return h("calcite-icon", { class: "stepper-item-icon", icon: path, scale: "s" });
  }
  determineActiveItem() {
    this.active = !this.disabled && this.itemPosition === this.activePosition;
  }
  registerStepperItem() {
    this.calciteStepperItemRegister.emit({
      position: this.itemPosition,
      content: this.itemContent
    });
  }
  emitRequestedItem() {
    if (!this.disabled) {
      this.calciteStepperItemSelect.emit({
        position: this.itemPosition,
        content: this.itemContent
      });
    }
  }
  getItemContent() {
    var _a;
    // todo: Remove IE/Edge specific code.
    return ((_a = this.el.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector("slot"))
      ? this.el.shadowRoot.querySelector("slot").assignedNodes({ flatten: true })
      : this.el.querySelector(".stepper-item-content")
        ? this.el.querySelector(".stepper-item-content").childNodes
        : null;
  }
  getItemPosition() {
    return Array.prototype.indexOf.call(this.parentStepperEl.querySelectorAll("calcite-stepper-item"), this.el);
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "disabled": ["disabledWatcher"]
  }; }
};
CalciteStepperItem.style = calciteStepperItemCss;

export { CalciteStepper as calcite_stepper, CalciteStepperItem as calcite_stepper_item };
