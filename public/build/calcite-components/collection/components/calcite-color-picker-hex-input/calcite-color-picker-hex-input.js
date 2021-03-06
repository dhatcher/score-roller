import { Component, Element, Event, h, Listen, Method, Prop, State, Watch } from "@stencil/core";
import { hexChar, hexToRGB, isLonghandHex, isValidHex, normalizeHex, rgbToHex } from "../calcite-color-picker/utils";
import Color from "color";
import { CSS } from "./resources";
import { focusElement, getElementDir } from "../../utils/dom";
import { TEXT } from "../calcite-color-picker/resources";
import { getKey } from "../../utils/key";
const DEFAULT_COLOR = Color();
export class CalciteColorPickerHexInput {
  constructor() {
    //--------------------------------------------------------------------------
    //
    //  Public Properties
    //
    //--------------------------------------------------------------------------
    /**
     * When false, empty color (null) will be allowed as a value. Otherwise, a color value is always enforced by the component.
     *
     * When true, clearing the input and blurring will restore the last valid color set. When false, it will set it to empty.
     */
    this.allowEmpty = false;
    /**
     * Label used for the hex input.
     * @default "Hex"
     */
    this.intlHex = TEXT.hex;
    /**
     * Label used for the hex input when there is no color selected.
     * @default "No color"
     */
    this.intlNoColor = TEXT.noColor;
    /**
     * The component's scale.
     */
    this.scale = "m";
    /**
     * The hex value.
     */
    this.value = normalizeHex(DEFAULT_COLOR.hex());
    this.onCalciteInputBlur = (event) => {
      const node = event.currentTarget;
      const inputValue = node.value;
      const hex = `#${inputValue}`;
      const willClearValue = this.allowEmpty && !inputValue;
      if (willClearValue || (isValidHex(hex) && isLonghandHex(hex))) {
        return;
      }
      // manipulating DOM directly since rerender doesn't update input value
      node.value =
        this.allowEmpty && !this.internalColor
          ? ""
          : this.formatForInternalInput(rgbToHex(this.internalColor.object()));
    };
    this.onInputChange = (event) => {
      const node = event.currentTarget;
      const inputValue = node.value;
      let value;
      if (inputValue) {
        const hex = inputValue;
        const color = hexToRGB(`#${hex}`);
        if (!color) {
          return;
        }
        value = normalizeHex(hex);
      }
      else if (this.allowEmpty) {
        value = null;
      }
      this.value = value;
      this.calciteColorPickerHexInputChange.emit();
    };
    /**
     * The last valid/selected color. Used as a fallback if an invalid hex code is entered.
     */
    this.internalColor = DEFAULT_COLOR;
    this.previousNonNullValue = this.value;
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    this.storeInputRef = (node) => {
      this.inputNode = node;
    };
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    const { allowEmpty, value } = this;
    if (value) {
      const normalized = normalizeHex(value);
      if (isValidHex(normalized)) {
        this.internalColor = Color(normalized);
        this.value = normalized;
      }
      return;
    }
    if (allowEmpty) {
      this.internalColor = null;
      this.value = null;
    }
  }
  handleValueChange(value, oldValue) {
    if (value) {
      const normalized = normalizeHex(value);
      if (isValidHex(normalized)) {
        const { internalColor } = this;
        const changed = !internalColor || normalized !== normalizeHex(internalColor.hex());
        this.internalColor = Color(normalized);
        this.previousNonNullValue = normalized;
        this.value = normalized;
        if (changed) {
          this.calciteColorPickerHexInputChange.emit();
        }
        return;
      }
    }
    else if (this.allowEmpty) {
      this.internalColor = null;
      this.value = null;
      this.calciteColorPickerHexInputChange.emit();
      return;
    }
    this.value = oldValue;
  }
  // using @Listen as a workaround for VDOM listener not firing
  onInputKeyDown(event) {
    const { altKey, ctrlKey, metaKey, shiftKey } = event;
    const { el, inputNode, internalColor, value } = this;
    const key = getKey(event.key);
    const isNudgeKey = key === "ArrowDown" || key === "ArrowUp";
    if (isNudgeKey) {
      if (!value) {
        this.value = this.previousNonNullValue;
        event.preventDefault();
        return;
      }
      const direction = key === "ArrowUp" ? 1 : -1;
      const bump = shiftKey ? 10 : 1;
      this.value = normalizeHex(this.nudgeRGBChannels(internalColor, bump * direction).hex());
      event.preventDefault();
      return;
    }
    const withModifiers = altKey || ctrlKey || metaKey;
    const exceededHexLength = inputNode.value.length >= 6;
    const focusedElement = el.shadowRoot.activeElement;
    const hasTextSelection = 
    // can't use window.getSelection() because of FF bug: https://bugzilla.mozilla.org/show_bug.cgi?id=85686
    focusedElement.selectionStart != focusedElement.selectionEnd;
    const singleChar = key.length === 1;
    const validHexChar = hexChar.test(key);
    if (singleChar &&
      !withModifiers &&
      (!validHexChar || (!hasTextSelection && exceededHexLength))) {
      event.preventDefault();
    }
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  render() {
    const { el, intlHex, value } = this;
    const hexInputValue = this.formatForInternalInput(value);
    const elementDir = getElementDir(el);
    return (h("div", { class: CSS.container },
      h("calcite-input", { class: CSS.input, dir: elementDir, label: intlHex, onCalciteInputBlur: this.onCalciteInputBlur, onChange: this.onInputChange, prefixText: "#", ref: this.storeInputRef, scale: this.scale, value: hexInputValue }),
      hexInputValue ? (h("calcite-color-picker-swatch", { active: true, class: CSS.preview, color: `#${hexInputValue}`, scale: this.scale })) : null));
  }
  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  /** Sets focus on the component. */
  async setFocus() {
    focusElement(this.inputNode);
  }
  formatForInternalInput(hex) {
    return hex ? hex.replace("#", "") : "";
  }
  nudgeRGBChannels(color, amount) {
    return Color.rgb(color.array().map((channel) => channel + amount));
  }
  static get is() { return "calcite-color-picker-hex-input"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["calcite-color-picker-hex-input.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["calcite-color-picker-hex-input.css"]
  }; }
  static get properties() { return {
    "allowEmpty": {
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
        "text": "When false, empty color (null) will be allowed as a value. Otherwise, a color value is always enforced by the component.\n\nWhen true, clearing the input and blurring will restore the last valid color set. When false, it will set it to empty."
      },
      "attribute": "allow-empty",
      "reflect": false,
      "defaultValue": "false"
    },
    "intlHex": {
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
        "tags": [{
            "text": "\"Hex\"",
            "name": "default"
          }],
        "text": "Label used for the hex input."
      },
      "attribute": "intl-hex",
      "reflect": false,
      "defaultValue": "TEXT.hex"
    },
    "intlNoColor": {
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
        "tags": [{
            "text": "\"No color\"",
            "name": "default"
          }],
        "text": "Label used for the hex input when there is no color selected."
      },
      "attribute": "intl-no-color",
      "reflect": false,
      "defaultValue": "TEXT.noColor"
    },
    "scale": {
      "type": "string",
      "mutable": false,
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
        "text": "The component's scale."
      },
      "attribute": "scale",
      "reflect": true,
      "defaultValue": "\"m\""
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
      "optional": false,
      "docs": {
        "tags": [],
        "text": "The hex value."
      },
      "attribute": "value",
      "reflect": true,
      "defaultValue": "normalizeHex(DEFAULT_COLOR.hex())"
    }
  }; }
  static get states() { return {
    "internalColor": {}
  }; }
  static get events() { return [{
      "method": "calciteColorPickerHexInputChange",
      "name": "calciteColorPickerHexInputChange",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Emitted when the hex value changes."
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
        "text": "Sets focus on the component.",
        "tags": []
      }
    }
  }; }
  static get elementRef() { return "el"; }
  static get watchers() { return [{
      "propName": "value",
      "methodName": "handleValueChange"
    }]; }
  static get listeners() { return [{
      "name": "keydown",
      "method": "onInputKeyDown",
      "target": undefined,
      "capture": true,
      "passive": false
    }]; }
}
