'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-318f3d91.js');
const guid = require('./guid-4637ad8f.js');
const dom = require('./dom-57231db9.js');
const form = require('./form-432ae178.js');

const calciteRadioCss = "@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:inline-block}:host .radio{border-radius:9999px;cursor:pointer;-webkit-transition-property:all;transition-property:all;-webkit-transition-duration:150ms;transition-duration:150ms;-webkit-transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);-webkit-box-shadow:inset 0 0 0 1px var(--calcite-ui-border-input);box-shadow:inset 0 0 0 1px var(--calcite-ui-border-input)}:host([hovered]) .radio,:host(:not([checked])[focused]) .radio{-webkit-box-shadow:inset 0 0 0 2px var(--calcite-ui-brand);box-shadow:inset 0 0 0 2px var(--calcite-ui-brand)}:host([disabled]) .radio{cursor:default;opacity:var(--calcite-ui-opacity-disabled)}:host([hovered][disabled]) .radio{-webkit-box-shadow:inset 0 0 0 1px var(--calcite-ui-border-input);box-shadow:inset 0 0 0 1px var(--calcite-ui-border-input)}:host([scale=s]){--calcite-radio-size:var(--calcite-font-size--2)}:host([scale=m]){--calcite-radio-size:var(--calcite-font-size--1)}:host([scale=l]){--calcite-radio-size:var(--calcite-font-size-0)}.radio{height:var(--calcite-radio-size);max-width:var(--calcite-radio-size);min-width:var(--calcite-radio-size)}:host([scale=s][checked]) .radio,:host([hovered][scale=s][checked][disabled]) .radio{-webkit-box-shadow:inset 0 0 0 4px var(--calcite-ui-brand);box-shadow:inset 0 0 0 4px var(--calcite-ui-brand)}:host([scale=s][focused][checked]) .radio{-webkit-box-shadow:inset 0 0 0 4px var(--calcite-ui-brand), 0 0 0 2px var(--calcite-ui-foreground-1), 0 0 0 4px var(--calcite-ui-brand);box-shadow:inset 0 0 0 4px var(--calcite-ui-brand), 0 0 0 2px var(--calcite-ui-foreground-1), 0 0 0 4px var(--calcite-ui-brand)}:host([scale=m][checked]) .radio,:host([hovered][scale=m][checked][disabled]) .radio{-webkit-box-shadow:inset 0 0 0 5px var(--calcite-ui-brand);box-shadow:inset 0 0 0 5px var(--calcite-ui-brand)}:host([scale=m][focused][checked]) .radio{-webkit-box-shadow:inset 0 0 0 5px var(--calcite-ui-brand), 0 0 0 2px var(--calcite-ui-foreground-1), 0 0 0 4px var(--calcite-ui-brand);box-shadow:inset 0 0 0 5px var(--calcite-ui-brand), 0 0 0 2px var(--calcite-ui-foreground-1), 0 0 0 4px var(--calcite-ui-brand)}:host([scale=l][checked]) .radio,:host([hovered][scale=l][checked][disabled]) .radio{-webkit-box-shadow:inset 0 0 0 6px var(--calcite-ui-brand);box-shadow:inset 0 0 0 6px var(--calcite-ui-brand)}:host([scale=l][focused][checked]) .radio{-webkit-box-shadow:inset 0 0 0 6px var(--calcite-ui-brand), 0 0 0 2px var(--calcite-ui-foreground-1), 0 0 0 4px var(--calcite-ui-brand);box-shadow:inset 0 0 0 6px var(--calcite-ui-brand), 0 0 0 2px var(--calcite-ui-foreground-1), 0 0 0 4px var(--calcite-ui-brand)}:host([hidden]){display:none}";

const CalciteRadio = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------
    /** The checked state of the radio. */
    this.checked = false;
    /** The disabled state of the radio. */
    this.disabled = false;
    /**
     * The focused state of the radio.
     * @private
     */
    this.focused = false;
    /** The radio's hidden status. */
    this.hidden = false;
    /**
     * The hovered state of the radio.
     * @private
     */
    this.hovered = false;
    /** The scale (size) of the radio. */
    this.scale = "m";
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  render() {
    return index.h("div", { class: "radio" });
  }
};
CalciteRadio.style = calciteRadioCss;

const CSS = {
  container: "calcite-radio-button__container"
};

const calciteRadioButtonCss = "@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}.sc-calcite-radio-button:root{--calcite-animation-timing:300ms}.calcite-animate.sc-calcite-radio-button{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in.sc-calcite-radio-button{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down.sc-calcite-radio-button{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up.sc-calcite-radio-button{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale.sc-calcite-radio-button{-webkit-animation-name:in-scale;animation-name:in-scale}.sc-calcite-radio-button:root{--calcite-popper-transition:150ms ease-in-out}[hidden].sc-calcite-radio-button-h{display:none}.sc-calcite-radio-button-h{cursor:pointer;display:inline-block}.sc-calcite-radio-button-h .calcite-radio-button__container.sc-calcite-radio-button{position:relative}[disabled].sc-calcite-radio-button-h{cursor:pointer}";

const CalciteRadioButton = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.calciteRadioButtonChange = index.createEvent(this, "calciteRadioButtonChange", 7);
    this.calciteRadioButtonCheckedChange = index.createEvent(this, "calciteRadioButtonCheckedChange", 7);
    this.calciteRadioButtonFocusedChange = index.createEvent(this, "calciteRadioButtonFocusedChange", 7);
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------
    /** The checked state of the radio button. */
    this.checked = false;
    /** The disabled state of the radio button. */
    this.disabled = false;
    /**
     * The focused state of the radio button.
     * @private
     */
    this.focused = false;
    /** The radio button's hidden status.  When a radio button is hidden it is not focusable or checkable. */
    this.hidden = false;
    /**
     * The hovered state of the radio button.
     * @private
     */
    this.hovered = false;
    /** Requires that a value is selected for the radio button group before the parent form will submit. */
    this.required = false;
    /** The scale (size) of the radio button. `scale` is passed as a property automatically from `calcite-radio-button-group`. */
    this.scale = "m";
    this.setInputEl = (el) => {
      this.inputEl = el;
    };
    this.formResetHandler = () => {
      var _a;
      this.checked = this.initialChecked;
      this.initialChecked && ((_a = this.inputEl) === null || _a === void 0 ? void 0 : _a.setAttribute("checked", ""));
    };
    this.hideInputEl = () => {
      this.inputEl.style.cssText = form.hiddenInputStyle;
    };
    this.onInputBlur = () => {
      this.focused = false;
      this.calciteRadioButtonFocusedChange.emit();
    };
    this.onInputFocus = () => {
      this.focused = true;
      this.calciteRadioButtonFocusedChange.emit();
    };
  }
  checkedChanged(newChecked) {
    if (newChecked) {
      this.uncheckOtherRadioButtonsInGroup();
    }
    if (this.inputEl) {
      this.inputEl.checked = newChecked;
    }
    this.calciteRadioButtonCheckedChange.emit(newChecked);
  }
  disabledChanged(disabled) {
    this.inputEl.disabled = disabled;
  }
  focusedChanged(focused) {
    if (!this.inputEl) {
      return;
    }
    if (focused && !this.el.hasAttribute("hidden")) {
      this.inputEl.focus();
    }
    else {
      this.inputEl.blur();
    }
  }
  hiddenChanged(newHidden) {
    this.inputEl.hidden = newHidden;
  }
  nameChanged(newName) {
    if (this.name === newName) {
      return;
    }
    if (this.inputEl) {
      this.inputEl.name = newName;
    }
    this.checkLastRadioButton();
    const currentValue = this.rootNode.querySelector(`input[name="${this.name}"]:checked`);
    if (!(currentValue === null || currentValue === void 0 ? void 0 : currentValue.value)) {
      this.uncheckAllRadioButtonsInGroup();
    }
  }
  requiredChanged(required) {
    this.inputEl.required = required;
  }
  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  async setFocus() {
    dom.focusElement(this.inputEl);
  }
  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  checkLastRadioButton() {
    const radioButtons = Array.from(this.rootNode.querySelectorAll("calcite-radio-button")).filter((radioButton) => radioButton.name === this.name);
    const checkedRadioButtons = radioButtons.filter((radioButton) => radioButton.checked);
    if ((checkedRadioButtons === null || checkedRadioButtons === void 0 ? void 0 : checkedRadioButtons.length) > 1) {
      const lastCheckedRadioButton = checkedRadioButtons[checkedRadioButtons.length - 1];
      checkedRadioButtons
        .filter((checkedRadioButton) => checkedRadioButton !== lastCheckedRadioButton)
        .forEach((checkedRadioButton) => {
        checkedRadioButton.checked = false;
        checkedRadioButton.emitCheckedChange();
      });
    }
  }
  /** @internal */
  async emitCheckedChange() {
    this.calciteRadioButtonCheckedChange.emit();
  }
  uncheckAllRadioButtonsInGroup() {
    const otherRadioButtons = Array.from(this.rootNode.querySelectorAll("calcite-radio-button")).filter((radioButton) => radioButton.name === this.name);
    otherRadioButtons.forEach((otherRadioButton) => {
      if (otherRadioButton.checked) {
        otherRadioButton.checked = false;
        otherRadioButton.focused = false;
      }
    });
  }
  uncheckOtherRadioButtonsInGroup() {
    const otherRadioButtons = Array.from(this.rootNode.querySelectorAll("calcite-radio-button")).filter((radioButton) => radioButton.name === this.name && radioButton.guid !== this.guid);
    otherRadioButtons.forEach((otherRadioButton) => {
      if (otherRadioButton.checked) {
        otherRadioButton.checked = false;
        otherRadioButton.focused = false;
      }
    });
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  check(event) {
    // Prevent parent label from clicking the first radio when calcite-radio-button is clicked
    if (this.el.closest("label") && event.composedPath().includes(this.el)) {
      event.preventDefault();
    }
    if (!this.disabled && !this.hidden) {
      this.uncheckOtherRadioButtonsInGroup();
      this.checked = true;
      this.focused = true;
      this.calciteRadioButtonChange.emit();
    }
  }
  mouseenter() {
    this.hovered = true;
  }
  mouseleave() {
    this.hovered = false;
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    this.rootNode = this.el.getRootNode();
    this.guid = this.el.id || `calcite-radio-button-${guid.guid()}`;
    this.initialChecked = this.checked;
    if (this.name) {
      this.checkLastRadioButton();
    }
    const form = dom.closestElementCrossShadowBoundary(this.el, "form");
    if (form) {
      form.addEventListener("reset", this.formResetHandler);
    }
  }
  componentDidLoad() {
    this.hideInputEl();
    if (this.focused) {
      this.inputEl.focus();
    }
  }
  disconnectedCallback() {
    const form = dom.closestElementCrossShadowBoundary(this.el, "form");
    if (form) {
      form.removeEventListener("reset", this.formResetHandler);
    }
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  render() {
    var _a;
    const value = (_a = this.value) === null || _a === void 0 ? void 0 : _a.toString();
    return (index.h("div", { class: CSS.container }, index.h("input", { "aria-label": this.label || null, checked: this.checked, disabled: this.disabled, hidden: this.hidden, id: `${this.guid}-input`, name: this.name, onBlur: this.onInputBlur, onFocus: this.onInputFocus, ref: this.setInputEl, required: this.required, type: "radio", value: value }), index.h("calcite-radio", { checked: this.checked, disabled: this.disabled, focused: this.focused, hidden: this.hidden, hovered: this.hovered, scale: this.scale })));
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "checked": ["checkedChanged"],
    "disabled": ["disabledChanged"],
    "focused": ["focusedChanged"],
    "hidden": ["hiddenChanged"],
    "name": ["nameChanged"],
    "required": ["requiredChanged"]
  }; }
};
CalciteRadioButton.style = calciteRadioButtonCss;

exports.calcite_radio = CalciteRadio;
exports.calcite_radio_button = CalciteRadioButton;
