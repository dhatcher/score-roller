'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-318f3d91.js');
const dom = require('./dom-57231db9.js');
const key = require('./key-f470de4c.js');
require('./guid-4637ad8f.js');

const calciteRadioGroupCss = "@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host([scale=s]){min-height:1.5rem}:host([scale=m]){min-height:2rem}:host([scale=l]){min-height:2.5rem}:host{display:-ms-flexbox;display:flex;background-color:var(--calcite-ui-foreground-1);width:-moz-fit-content;width:-webkit-fit-content;width:fit-content;outline:1px solid var(--calcite-ui-border-input);outline-offset:-1px}:host([layout=vertical]){-ms-flex-direction:column;flex-direction:column;-ms-flex-align:start;align-items:flex-start;-ms-flex-item-align:start;align-self:flex-start}:host([width=full]){width:100%;min-width:-moz-fit-content;min-width:-webkit-fit-content;min-width:fit-content}:host([width=full]) ::slotted(calcite-radio-group-item){-ms-flex:1 1 auto;flex:1 1 auto}:host([width=full][layout=vertical]) ::slotted(calcite-radio-group-item){-ms-flex-pack:start;justify-content:flex-start}::slotted(calcite-radio-group-item[checked]),::slotted(calcite-radio-group-item:focus){z-index:0}:host([disabled]){opacity:var(--calcite-ui-opacity-disabled);pointer-events:none}";

const CalciteRadioGroup = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.calciteRadioGroupChange = index.createEvent(this, "calciteRadioGroupChange", 7);
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------
    /** specify the appearance style of the radio group, defaults to solid. */
    this.appearance = "solid";
    /** specify the layout of the radio group, defaults to horizontal */
    this.layout = "horizontal";
    /** The scale of the radio group */
    this.scale = "m";
    /** specify the width of the group, defaults to auto */
    this.width = "auto";
    //--------------------------------------------------------------------------
    //
    //  Private State/Props
    //
    //--------------------------------------------------------------------------
    this.hiddenInput = (() => {
      const input = document.createElement("input");
      input.type = "hidden";
      this.el.appendChild(input);
      return input;
    })();
  }
  handleNameChange(value) {
    this.hiddenInput.name = value;
  }
  handleSelectedItemChange(newItem, oldItem) {
    if (newItem === oldItem) {
      return;
    }
    const items = this.getItems();
    const match = Array.from(items)
      .filter((item) => item === newItem)
      .pop();
    if (match) {
      this.selectItem(match);
      this.calciteRadioGroupChange.emit(match.value);
    }
    else if (items[0]) {
      items[0].tabIndex = 0;
    }
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    const items = this.getItems();
    const lastChecked = Array.from(items)
      .filter((item) => item.checked)
      .pop();
    if (lastChecked) {
      this.selectItem(lastChecked);
    }
    else if (items[0]) {
      items[0].tabIndex = 0;
    }
    const { hiddenInput, name } = this;
    if (name) {
      hiddenInput.name = name;
    }
    if (lastChecked) {
      hiddenInput.value = lastChecked.value;
    }
  }
  componentDidLoad() {
    this.hasLoaded = true;
  }
  render() {
    return (index.h(index.Host, { role: "radiogroup", tabIndex: this.disabled ? -1 : null }, index.h("slot", null)));
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  handleLabelFocus(e) {
    if (dom.hasLabel(e.detail.labelEl, this.el)) {
      this.setFocus();
    }
  }
  handleClick(event) {
    if (event.target.localName === "calcite-radio-group-item") {
      this.selectItem(event.target);
    }
  }
  handleSelected(event) {
    // only fire after initial setup to prevent semi-infinite loops
    if (this.hasLoaded) {
      event.stopPropagation();
      event.preventDefault();
      this.selectItem(event.target);
    }
  }
  handleKeyDown(event) {
    const keys = ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown", " "];
    const key$1 = key.getKey(event.key);
    const { el, selectedItem } = this;
    if (keys.indexOf(key$1) === -1) {
      return;
    }
    let adjustedKey = key$1;
    if (dom.getElementDir(el) === "rtl") {
      if (key$1 === "ArrowRight") {
        adjustedKey = "ArrowLeft";
      }
      if (key$1 === "ArrowLeft") {
        adjustedKey = "ArrowRight";
      }
    }
    const items = this.getItems();
    let selectedIndex = -1;
    items.forEach((item, index) => {
      if (item === selectedItem) {
        selectedIndex = index;
      }
    });
    switch (adjustedKey) {
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        const previous = selectedIndex < 1 ? items.item(items.length - 1) : items.item(selectedIndex - 1);
        this.selectItem(previous);
        return;
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        const next = selectedIndex === -1 ? items.item(1) : items.item(selectedIndex + 1) || items.item(0);
        this.selectItem(next);
        return;
      case " ":
        event.preventDefault();
        this.selectItem(event.target);
        return;
      default:
        return;
    }
  }
  // --------------------------------------------------------------------------
  //
  //  Methods
  //
  // --------------------------------------------------------------------------
  /** Focuses the selected item. If there is no selection, it focuses the first item. */
  async setFocus() {
    var _a;
    (_a = (this.selectedItem || this.getItems()[0])) === null || _a === void 0 ? void 0 : _a.focus();
  }
  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  getItems() {
    return this.el.querySelectorAll("calcite-radio-group-item");
  }
  selectItem(selected) {
    if (selected === this.selectedItem) {
      return;
    }
    const items = this.getItems();
    let match = null;
    items.forEach((item) => {
      const matches = item.value === selected.value;
      if ((matches && !item.checked) || (!matches && item.checked)) {
        item.checked = matches;
      }
      item.tabIndex = matches ? 0 : -1;
      if (matches) {
        match = item;
      }
    });
    this.selectedItem = match;
    this.syncWithInputProxy(match);
    if (match) {
      match.focus();
    }
  }
  syncWithInputProxy(item) {
    this.hiddenInput.value = item ? item.value : "";
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "name": ["handleNameChange"],
    "selectedItem": ["handleSelectedItemChange"]
  }; }
};
CalciteRadioGroup.style = calciteRadioGroupCss;

const calciteRadioGroupItemCss = "@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:-ms-flexbox;display:flex;-ms-flex-item-align:stretch;align-self:stretch;cursor:pointer;-webkit-transition:background-color 0.1s ease-in-out, border-color 0.1s ease-in-out;transition:background-color 0.1s ease-in-out, border-color 0.1s ease-in-out}:host label{display:-ms-flexbox;display:flex;-ms-flex:1 1 0%;flex:1 1 0%;color:var(--calcite-ui-text-3);-webkit-box-sizing:border-box;box-sizing:border-box;pointer-events:none;-ms-flex-align:center;align-items:center;-webkit-transition:background-color 0.1s ease-in-out, border-color 0.1s ease-in-out;transition:background-color 0.1s ease-in-out, border-color 0.1s ease-in-out;margin:2px}.label--horizontal{-ms-flex-pack:center;justify-content:center}:host{outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}:host(:focus){outline:2px solid var(--calcite-ui-brand);outline-offset:-2px;outline-offset:-1px}.label--scale-s{font-size:var(--calcite-font-size--2);line-height:1rem;padding-left:0.5rem;padding-right:0.5rem;padding-top:0.125rem;padding-bottom:0.125rem}.label--scale-m{font-size:var(--calcite-font-size--1);line-height:1rem;padding-left:0.75rem;padding-right:0.75rem;padding-top:0.375rem;padding-bottom:0.375rem}.label--scale-l{font-size:var(--calcite-font-size-0);line-height:1.25rem;padding-left:1rem;padding-right:1rem;padding-top:0.5rem;padding-bottom:0.5rem}:host(:hover) label{background-color:var(--calcite-ui-foreground-2);color:var(--calcite-ui-text-1)}:host(:active) label{background-color:var(--calcite-ui-foreground-3)}:host([checked]) label{background-color:var(--calcite-ui-brand);border-color:var(--calcite-ui-brand);cursor:default;color:var(--calcite-ui-background)}:host([checked]) .label--outline{background-color:var(--calcite-ui-foreground-1);border-color:var(--calcite-ui-brand);-webkit-box-shadow:inset 0 0 0 1px var(--calcite-ui-brand);box-shadow:inset 0 0 0 1px var(--calcite-ui-brand);color:var(--calcite-ui-brand)}::slotted(input){display:none}.radio-group-item-icon{display:-ms-inline-flexbox;display:inline-flex;position:relative;margin:0;-webkit-transition-property:all;transition-property:all;-webkit-transition-duration:150ms;transition-duration:150ms;-webkit-transition-timing-function:ease-in-out;transition-timing-function:ease-in-out;-webkit-transition-delay:0s;transition-delay:0s;line-height:inherit}:host([icon-position=start]) .radio-group-item-icon{margin-right:0.5rem}:host([icon-position=start][dir=rtl]) .radio-group-item-icon{margin-right:0;margin-left:0.5rem}:host([icon-position=end]) .radio-group-item-icon{margin-left:0.5rem}:host([icon-position=end][dir=rtl]) .radio-group-item-icon{margin-left:0;margin-right:0.5rem}";

const CalciteRadioGroupItem = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.calciteRadioGroupItemChange = index.createEvent(this, "calciteRadioGroupItemChange", 7);
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------
    /** Indicates whether the control is checked. */
    this.checked = false;
    /** optionally used with icon, select where to position the icon */
    this.iconPosition = "start";
    this.mutationObserver = this.getMutationObserver();
  }
  handleCheckedChange() {
    this.calciteRadioGroupItemChange.emit();
    this.syncToExternalInput();
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    const inputProxy = this.el.querySelector(`input[slot="input"]`);
    if (inputProxy) {
      this.value = inputProxy.value;
      this.checked = inputProxy.checked;
      {
        this.mutationObserver.observe(inputProxy, { attributes: true });
      }
    }
    this.inputProxy = inputProxy;
  }
  disconnectedCallback() {
    this.mutationObserver.disconnect();
  }
  componentWillLoad() {
    // only use default slot content in browsers that support shadow dom
    // or if ie11 has no label provided (#374)
    const label = this.el.querySelector("label");
    this.useFallback = !label || label.textContent === "";
  }
  render() {
    const { checked, useFallback, value } = this;
    const dir = dom.getElementDir(this.el);
    const scale = dom.getElementProp(this.el, "scale", "m");
    const appearance = dom.getElementProp(this.el, "appearance", "solid");
    const layout = dom.getElementProp(this.el, "layout", "horizontal");
    const iconEl = (index.h("calcite-icon", { class: "radio-group-item-icon", dir: dir, flipRtl: this.iconFlipRtl, icon: this.icon, scale: "s" }));
    return (index.h(index.Host, { "aria-checked": checked.toString(), role: "radio" }, index.h("label", { class: {
        "label--scale-s": scale === "s",
        "label--scale-m": scale === "m",
        "label--scale-l": scale === "l",
        "label--horizontal": layout === "horizontal",
        "label--outline": appearance === "outline"
      } }, this.icon && this.iconPosition === "start" ? iconEl : null, index.h("slot", null, useFallback ? value : ""), index.h("slot", { name: "input" }), this.icon && this.iconPosition === "end" ? iconEl : null)));
  }
  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  getMutationObserver() {
    return new MutationObserver(() => this.syncFromExternalInput());
  }
  syncFromExternalInput() {
    if (this.inputProxy) {
      this.value = this.inputProxy.value;
      this.checked = this.inputProxy.checked;
    }
  }
  syncToExternalInput() {
    if (!this.inputProxy) {
      return;
    }
    this.inputProxy.value = this.value;
    if (this.checked) {
      this.inputProxy.setAttribute("checked", "");
    }
    else {
      this.inputProxy.removeAttribute("checked");
    }
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "checked": ["handleCheckedChange"]
  }; }
};
CalciteRadioGroupItem.style = calciteRadioGroupItemCss;

exports.calcite_radio_group = CalciteRadioGroup;
exports.calcite_radio_group_item = CalciteRadioGroupItem;
