import { Component, Element, Event, h, Host, Listen, Method, Prop, State, Watch } from "@stencil/core";
import { getElementDir, getElementProp, setRequestedIcon, closestElementCrossShadowBoundary } from "../../utils/dom";
import { getKey } from "../../utils/key";
import { CSS, INPUT_TYPE_ICONS, SLOTS } from "./calcite-input.resources";
import { getDecimalSeparator, delocalizeNumberString, localizeNumberString } from "../../utils/locale";
import { numberKeys } from "../../utils/key";
import { hiddenInputStyle } from "../../utils/form";
import { isValidDecimal, isValidNumber, parseNumberString, sanitizeNumberString } from "../../utils/number";
import { CSS_UTILITY, TEXT } from "../../utils/resources";
/**
 * @slot action - A slot for positioning a button next to an input
 */
export class CalciteInput {
  constructor() {
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------
    /** specify the alignment of the value of the input */
    this.alignment = "start";
    /** should the input autofocus */
    this.autofocus = false;
    /** for number values, displays the locale's group separator */
    this.groupSeparator = false;
    /**
     * string to override English loading text
     * @default "Loading"
     */
    this.intlLoading = TEXT.loading;
    /** specify if the input is in loading state */
    this.loading = false;
    /** BCP 47 language tag for desired language and country format */
    this.locale = document.documentElement.lang || "en";
    /**
     * Toggles locale formatting for numbers.
     * @internal
     */
    this.localeFormat = false;
    /** specify the placement of the number buttons */
    this.numberButtonType = "vertical";
    /** is the input required */
    this.required = false;
    /** specify the scale of the input, defaults to m */
    this.scale = "m";
    /** specify the status of the input field, determines message and icons */
    this.status = "idle";
    /**
     * specify the input type
     *
     * Note that the following types add type-specific icons by default: `date`, `email`, `password`, `search`, `tel`, `time`
     */
    this.type = "text";
    /** keep track of the rendered child type */
    this.childElType = "input";
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    this.clearInputValue = (nativeEvent) => {
      this.setValue(null, nativeEvent, true);
    };
    this.inputBlurHandler = () => {
      if (this.type === "number") {
        this.setLocalizedValue(this.value);
      }
      this.calciteInputBlur.emit({
        element: this.childEl,
        value: this.value
      });
      if (this.preFocusValue !== this.value) {
        this.calciteInputChange.emit();
      }
    };
    this.inputFocusHandler = (event) => {
      if (event.target !== this.slottedActionEl) {
        this.setFocus();
      }
      this.calciteInputFocus.emit({
        element: this.childEl,
        value: this.value
      });
      this.preFocusValue = this.value;
    };
    this.inputInputHandler = (nativeEvent) => {
      this.setValue(nativeEvent.target.value, nativeEvent);
    };
    this.inputKeyDownHandler = (event) => {
      if (event.key === "Enter") {
        this.calciteInputChange.emit();
      }
    };
    this.inputNumberInputHandler = (nativeEvent) => {
      const value = nativeEvent.target.value;
      const delocalizedValue = delocalizeNumberString(value, this.locale);
      if (nativeEvent.inputType === "insertFromPaste") {
        if (!isValidNumber(delocalizedValue)) {
          nativeEvent.preventDefault();
        }
        this.setValue(parseNumberString(delocalizedValue), nativeEvent);
        this.childNumberEl.value = this.localizedValue;
      }
      else {
        this.setValue(delocalizeNumberString(value, this.locale), nativeEvent);
      }
    };
    this.inputNumberKeyDownHandler = (event) => {
      if (this.type !== "number") {
        return;
      }
      if (event.key === "ArrowUp") {
        this.nudgeNumberValue("up", event);
        return;
      }
      if (event.key === "ArrowDown") {
        this.nudgeNumberValue("down", event);
        return;
      }
      const supportedKeys = [
        ...numberKeys,
        "ArrowLeft",
        "ArrowRight",
        "Backspace",
        "Delete",
        "Enter",
        "Escape",
        "Tab",
        "-"
      ];
      if (event.altKey || event.ctrlKey || event.metaKey) {
        return;
      }
      const isShiftTabEvent = event.shiftKey && event.key === "Tab";
      if (supportedKeys.includes(event.key) &&
        (!event.shiftKey || isShiftTabEvent) &&
        !(parseInt(this.value) === 0 && getKey(event.key) === "0")) {
        if (event.key === "Enter") {
          this.calciteInputChange.emit();
        }
        return;
      }
      const decimalSeparator = getDecimalSeparator(this.locale);
      if (event.key === decimalSeparator &&
        isValidDecimal(this.step === "any" ? 1 : this.step)) {
        if (!this.value && !this.childNumberEl.value) {
          return;
        }
        if (this.value && this.childNumberEl.value.indexOf(decimalSeparator) === -1) {
          return;
        }
      }
      event.preventDefault();
    };
    this.nudgeNumberValue = (direction, nativeEvent) => {
      var _a, _b;
      if (this.type !== "number") {
        return;
      }
      const decimals = ((_b = (_a = this.value) === null || _a === void 0 ? void 0 : _a.split(".")[1]) === null || _b === void 0 ? void 0 : _b.length) || 0;
      const inputMax = this.maxString ? parseFloat(this.maxString) : null;
      const inputMin = this.minString ? parseFloat(this.minString) : null;
      const inputStep = this.step === "any" ? 1 : Math.abs(this.step || 1);
      let inputVal = this.value && this.value !== "" ? parseFloat(this.value) : 0;
      let newValue = this.value;
      if (direction === "up" && ((!inputMax && inputMax !== 0) || inputVal < inputMax)) {
        newValue = (inputVal += inputStep).toFixed(decimals).toString();
      }
      if (direction === "down" && ((!inputMin && inputMin !== 0) || inputVal > inputMin)) {
        newValue = (inputVal -= inputStep).toFixed(decimals).toString();
      }
      this.setValue(newValue, nativeEvent, true);
    };
    this.numberButtonClickHandler = (event) => {
      // todo, when dropping ie11 support, refactor to use stepup/stepdown
      // prevent blur and re-focus of input on mousedown
      event.preventDefault();
      const direction = event.target.dataset.adjustment;
      this.nudgeNumberValue(direction, event);
    };
    this.reset = (nativeEvent) => {
      if (this.type === "number") {
        nativeEvent.preventDefault();
      }
      this.setValue(this.defaultValue, nativeEvent);
    };
    this.setChildElRef = (el) => {
      this.childEl = el;
    };
    this.setChildNumberElRef = (el) => {
      this.childNumberEl = el;
    };
    this.setLocalizedValue = (value) => {
      this.localizedValue = localizeNumberString(value, this.locale, this.groupSeparator);
    };
    this.setValue = (value, nativeEvent, committing = false) => {
      const previousValue = this.value;
      this.value = this.type === "number" ? sanitizeNumberString(value) : value;
      if (this.type === "number") {
        this.setLocalizedValue(this.value);
      }
      if (nativeEvent) {
        if (this.type === "number" && (value === null || value === void 0 ? void 0 : value.endsWith("."))) {
          return;
        }
        const calciteInputInputEvent = this.calciteInputInput.emit({
          element: this.childEl,
          nativeEvent,
          value
        });
        if (calciteInputInputEvent.defaultPrevented) {
          this.value = previousValue;
          this.setLocalizedValue(previousValue);
        }
        else if (committing) {
          this.calciteInputChange.emit();
        }
      }
    };
  }
  disabledWatcher() {
    this.setDisabledAction();
  }
  /** watcher to update number-to-string for max */
  maxWatcher() {
    var _a;
    this.maxString = ((_a = this.max) === null || _a === void 0 ? void 0 : _a.toString()) || null;
  }
  /** watcher to update number-to-string for min */
  minWatcher() {
    var _a;
    this.minString = ((_a = this.min) === null || _a === void 0 ? void 0 : _a.toString()) || null;
  }
  valueWatcher(newValue) {
    if (this.type === "number" &&
      this.localizedValue !== localizeNumberString(newValue, this.locale)) {
      this.setLocalizedValue(newValue);
    }
    else if (this.childEl && this.childEl.value !== newValue) {
      this.childEl.value = newValue;
    }
  }
  updateRequestedIcon() {
    this.requestedIcon = setRequestedIcon(INPUT_TYPE_ICONS, this.icon, this.type);
  }
  get isClearable() {
    var _a;
    return !this.isTextarea && (this.clearable || this.type === "search") && ((_a = this.value) === null || _a === void 0 ? void 0 : _a.length) > 0;
  }
  get isTextarea() {
    return this.childElType === "textarea";
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    var _a;
    this.form = closestElementCrossShadowBoundary(this.el, "form");
    (_a = this.form) === null || _a === void 0 ? void 0 : _a.addEventListener("reset", this.reset);
    this.scale = getElementProp(this.el, "scale", this.scale);
    this.status = getElementProp(this.el, "status", this.status);
    this.step = !this.step && this.type === "number" ? "any" : this.step;
    if (this.type === "number" && this.value) {
      if (isValidNumber(this.value)) {
        this.localizedValue = localizeNumberString(this.value, this.locale, this.groupSeparator);
      }
      else {
        this.value = undefined;
      }
    }
  }
  disconnectedCallback() {
    var _a;
    (_a = this.form) === null || _a === void 0 ? void 0 : _a.removeEventListener("reset", this.reset);
  }
  componentWillLoad() {
    var _a, _b;
    this.childElType = this.type === "textarea" ? "textarea" : "input";
    this.defaultValue = this.value;
    this.maxString = (_a = this.max) === null || _a === void 0 ? void 0 : _a.toString();
    this.minString = (_b = this.min) === null || _b === void 0 ? void 0 : _b.toString();
    this.requestedIcon = setRequestedIcon(INPUT_TYPE_ICONS, this.icon, this.type);
  }
  componentDidLoad() {
    this.slottedActionEl = this.el.querySelector("[slot=action]");
    this.setDisabledAction();
    if (this.type === "number" && this.childEl) {
      this.childEl.style.cssText = hiddenInputStyle;
    }
  }
  componentShouldUpdate(newValue, oldValue, property) {
    if (this.type === "number" && property === "value" && newValue && !isValidNumber(newValue)) {
      this.value = oldValue;
      return false;
    }
    return true;
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  keyDownHandler(event) {
    if (this.isClearable && getKey(event.key) === "Escape") {
      this.clearInputValue(event);
      event.preventDefault();
    }
  }
  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  /** focus the rendered child element */
  async setFocus() {
    var _a, _b;
    if (this.type === "number") {
      (_a = this.childNumberEl) === null || _a === void 0 ? void 0 : _a.focus();
    }
    else {
      (_b = this.childEl) === null || _b === void 0 ? void 0 : _b.focus();
    }
  }
  setDisabledAction() {
    if (!this.slottedActionEl) {
      return;
    }
    const slottedActionEl = this.slottedActionEl;
    this.disabled
      ? slottedActionEl.setAttribute("disabled", "")
      : slottedActionEl.removeAttribute("disabled");
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  render() {
    const dir = getElementDir(this.el);
    const loader = (h("div", { class: CSS.loader },
      h("calcite-progress", { label: this.intlLoading, type: "indeterminate" })));
    const inputClearButton = (h("button", { class: CSS.clearButton, disabled: this.disabled, onClick: this.clearInputValue, tabIndex: this.disabled ? -1 : 0, type: "button" },
      h("calcite-icon", { icon: "x", scale: "s" })));
    const iconEl = (h("calcite-icon", { class: CSS.inputIcon, dir: dir, flipRtl: this.iconFlipRtl, icon: this.requestedIcon, scale: "s" }));
    const isHorizontalNumberButton = this.numberButtonType === "horizontal";
    const numberButtonsHorizontalUp = (h("button", { class: {
        [CSS.numberButtonItem]: true,
        [CSS.buttonItemHorizontal]: isHorizontalNumberButton
      }, "data-adjustment": "up", disabled: this.disabled, onClick: this.numberButtonClickHandler, tabIndex: -1, type: "button" },
      h("calcite-icon", { icon: "chevron-up", scale: "s" })));
    const numberButtonsHorizontalDown = (h("button", { class: {
        [CSS.numberButtonItem]: true,
        [CSS.buttonItemHorizontal]: isHorizontalNumberButton
      }, "data-adjustment": "down", disabled: this.disabled, onClick: this.numberButtonClickHandler, tabIndex: -1, type: "button" },
      h("calcite-icon", { icon: "chevron-down", scale: "s" })));
    const numberButtonsVertical = (h("div", { class: CSS.numberButtonWrapper },
      numberButtonsHorizontalUp,
      numberButtonsHorizontalDown));
    const prefixText = h("div", { class: CSS.prefix }, this.prefixText);
    const suffixText = h("div", { class: CSS.suffix }, this.suffixText);
    const localeNumberInput = this.type === "number" ? (h("input", { "aria-label": this.label, autofocus: this.autofocus ? true : null, defaultValue: this.defaultValue, disabled: this.disabled ? true : null, key: "localized-input", maxLength: this.maxLength, minLength: this.minLength, name: undefined, onBlur: this.inputBlurHandler, onFocus: this.inputFocusHandler, onInput: this.inputNumberInputHandler, onKeyDown: this.inputNumberKeyDownHandler, placeholder: this.placeholder || "", ref: this.setChildNumberElRef, tabIndex: this.disabled ? -1 : 0, type: "text", value: this.localizedValue })) : null;
    const childEl = [
      h(this.childElType, { "aria-label": this.label, autofocus: this.autofocus ? true : null, defaultValue: this.defaultValue, disabled: this.disabled ? true : null, max: this.maxString, maxLength: this.maxLength, min: this.minString, minLength: this.minLength, name: this.name, onBlur: this.inputBlurHandler, onFocus: this.inputFocusHandler, onInput: this.inputInputHandler, onKeyDown: this.inputKeyDownHandler, placeholder: this.placeholder || "", ref: this.setChildElRef, required: this.required ? true : null, step: this.step, tabIndex: this.disabled || this.type === "number" ? -1 : null, type: this.type, value: this.value }),
      this.isTextarea ? (h("div", { class: CSS.resizeIconWrapper },
        h("calcite-icon", { icon: "chevron-down", scale: "s" }))) : null
    ];
    return (h(Host, { onClick: this.inputFocusHandler },
      h("div", { class: { [CSS.inputWrapper]: true, [CSS_UTILITY.rtl]: dir === "rtl" }, dir: dir },
        this.type === "number" && this.numberButtonType === "horizontal"
          ? numberButtonsHorizontalDown
          : null,
        this.prefixText ? prefixText : null,
        h("div", { class: CSS.wrapper },
          localeNumberInput,
          childEl,
          this.isClearable ? inputClearButton : null,
          this.requestedIcon ? iconEl : null,
          this.loading ? loader : null),
        h("div", { class: CSS.actionWrapper },
          h("slot", { name: SLOTS.action })),
        this.type === "number" && this.numberButtonType === "vertical"
          ? numberButtonsVertical
          : null,
        this.suffixText ? suffixText : null,
        this.type === "number" && this.numberButtonType === "horizontal"
          ? numberButtonsHorizontalUp
          : null)));
  }
  static get is() { return "calcite-input"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() { return {
    "$": ["calcite-input.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["calcite-input.css"]
  }; }
  static get properties() { return {
    "alignment": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "Position",
        "resolved": "\"end\" | \"start\"",
        "references": {
          "Position": {
            "location": "import",
            "path": "../interfaces"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "specify the alignment of the value of the input"
      },
      "attribute": "alignment",
      "reflect": true,
      "defaultValue": "\"start\""
    },
    "autofocus": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "should the input autofocus"
      },
      "attribute": "autofocus",
      "reflect": false,
      "defaultValue": "false"
    },
    "clearable": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "optionally display a clear button that displays when field has a value\nshows by default for search, time, date\nwill not display for type=\"textarea\""
      },
      "attribute": "clearable",
      "reflect": true
    },
    "disabled": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "is the input disabled"
      },
      "attribute": "disabled",
      "reflect": true
    },
    "groupSeparator": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "for number values, displays the locale's group separator"
      },
      "attribute": "group-separator",
      "reflect": false,
      "defaultValue": "false"
    },
    "icon": {
      "type": "any",
      "mutable": false,
      "complexType": {
        "original": "string | boolean",
        "resolved": "boolean | string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "when used as a boolean set to true, show a default recommended icon for certain\ninput types (tel, password, email, date, time, search). You can also pass a\ncalcite-ui-icon name to this prop to display a requested icon for any input type"
      },
      "attribute": "icon",
      "reflect": true
    },
    "intlLoading": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [{
            "text": "\"Loading\"",
            "name": "default"
          }],
        "text": "string to override English loading text"
      },
      "attribute": "intl-loading",
      "reflect": false,
      "defaultValue": "TEXT.loading"
    },
    "iconFlipRtl": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "flip the icon in rtl"
      },
      "attribute": "icon-flip-rtl",
      "reflect": true
    },
    "label": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "Applies to the aria-label attribute on the button or hyperlink"
      },
      "attribute": "label",
      "reflect": false
    },
    "loading": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "specify if the input is in loading state"
      },
      "attribute": "loading",
      "reflect": true,
      "defaultValue": "false"
    },
    "locale": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "BCP 47 language tag for desired language and country format"
      },
      "attribute": "locale",
      "reflect": false,
      "defaultValue": "document.documentElement.lang || \"en\""
    },
    "localeFormat": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [{
            "text": undefined,
            "name": "internal"
          }],
        "text": "Toggles locale formatting for numbers."
      },
      "attribute": "locale-format",
      "reflect": false,
      "defaultValue": "false"
    },
    "max": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "input max"
      },
      "attribute": "max",
      "reflect": true
    },
    "min": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "input min"
      },
      "attribute": "min",
      "reflect": true
    },
    "maxlength": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [{
            "text": "use maxLength instead",
            "name": "deprecated"
          }],
        "text": "Maximum length of text input."
      },
      "attribute": "maxlength",
      "reflect": true
    },
    "maxLength": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "Maximum length of the input value"
      },
      "attribute": "max-length",
      "reflect": true
    },
    "minLength": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "Minimum length of the text input"
      },
      "attribute": "min-length",
      "reflect": true
    },
    "name": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "The name of the input"
      },
      "attribute": "name",
      "reflect": true
    },
    "numberButtonType": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "InputPlacement",
        "resolved": "\"horizontal\" | \"none\" | \"vertical\"",
        "references": {
          "InputPlacement": {
            "location": "import",
            "path": "./interfaces"
          }
        }
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "specify the placement of the number buttons"
      },
      "attribute": "number-button-type",
      "reflect": true,
      "defaultValue": "\"vertical\""
    },
    "placeholder": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "explicitly whitelist placeholder attribute"
      },
      "attribute": "placeholder",
      "reflect": false
    },
    "prefixText": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "optionally add prefix"
      },
      "attribute": "prefix-text",
      "reflect": false
    },
    "required": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "is the input required"
      },
      "attribute": "required",
      "reflect": false,
      "defaultValue": "false"
    },
    "scale": {
      "type": "string",
      "mutable": true,
      "complexType": {
        "original": "Scale",
        "resolved": "\"l\" | \"m\" | \"s\"",
        "references": {
          "Scale": {
            "location": "import",
            "path": "../interfaces"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "specify the scale of the input, defaults to m"
      },
      "attribute": "scale",
      "reflect": true,
      "defaultValue": "\"m\""
    },
    "status": {
      "type": "string",
      "mutable": true,
      "complexType": {
        "original": "Status",
        "resolved": "\"idle\" | \"invalid\" | \"valid\"",
        "references": {
          "Status": {
            "location": "import",
            "path": "../interfaces"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "specify the status of the input field, determines message and icons"
      },
      "attribute": "status",
      "reflect": true,
      "defaultValue": "\"idle\""
    },
    "step": {
      "type": "any",
      "mutable": true,
      "complexType": {
        "original": "number | \"any\"",
        "resolved": "\"any\" | number",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "input step"
      },
      "attribute": "step",
      "reflect": true
    },
    "suffixText": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "optionally add suffix  *"
      },
      "attribute": "suffix-text",
      "reflect": false
    },
    "type": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "| \"color\"\n    | \"date\"\n    | \"datetime-local\"\n    | \"email\"\n    | \"file\"\n    | \"image\"\n    | \"month\"\n    | \"number\"\n    | \"password\"\n    | \"search\"\n    | \"tel\"\n    | \"text\"\n    | \"textarea\"\n    | \"time\"\n    | \"url\"\n    | \"week\"",
        "resolved": "\"color\" | \"date\" | \"datetime-local\" | \"email\" | \"file\" | \"image\" | \"month\" | \"number\" | \"password\" | \"search\" | \"tel\" | \"text\" | \"textarea\" | \"time\" | \"url\" | \"week\"",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "specify the input type\n\nNote that the following types add type-specific icons by default: `date`, `email`, `password`, `search`, `tel`, `time`"
      },
      "attribute": "type",
      "reflect": true,
      "defaultValue": "\"text\""
    },
    "value": {
      "type": "string",
      "mutable": true,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "input value"
      },
      "attribute": "value",
      "reflect": false
    }
  }; }
  static get states() { return {
    "localizedValue": {}
  }; }
  static get events() { return [{
      "method": "calciteInputFocus",
      "name": "calciteInputFocus",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [{
            "text": undefined,
            "name": "internal"
          }],
        "text": ""
      },
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      }
    }, {
      "method": "calciteInputBlur",
      "name": "calciteInputBlur",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [{
            "text": undefined,
            "name": "internal"
          }],
        "text": ""
      },
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      }
    }, {
      "method": "calciteInputInput",
      "name": "calciteInputInput",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "This event fires each time a new value is typed."
      },
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      }
    }, {
      "method": "calciteInputChange",
      "name": "calciteInputChange",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [{
            "text": undefined,
            "name": "internal"
          }],
        "text": "This event fires each time a new value is typed and committed."
      },
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      }
    }]; }
  static get methods() { return {
    "setFocus": {
      "complexType": {
        "signature": "() => Promise<void>",
        "parameters": [],
        "references": {
          "Promise": {
            "location": "global"
          }
        },
        "return": "Promise<void>"
      },
      "docs": {
        "text": "focus the rendered child element",
        "tags": []
      }
    }
  }; }
  static get elementRef() { return "el"; }
  static get watchers() { return [{
      "propName": "disabled",
      "methodName": "disabledWatcher"
    }, {
      "propName": "max",
      "methodName": "maxWatcher"
    }, {
      "propName": "min",
      "methodName": "minWatcher"
    }, {
      "propName": "value",
      "methodName": "valueWatcher"
    }, {
      "propName": "icon",
      "methodName": "updateRequestedIcon"
    }, {
      "propName": "type",
      "methodName": "updateRequestedIcon"
    }]; }
  static get listeners() { return [{
      "name": "keydown",
      "method": "keyDownHandler",
      "target": undefined,
      "capture": false,
      "passive": false
    }]; }
}
