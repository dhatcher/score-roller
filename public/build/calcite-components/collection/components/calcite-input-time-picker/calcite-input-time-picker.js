import { Component, Element, Host, h, Prop, Listen, Event, Method, Watch } from "@stencil/core";
import { guid } from "../../utils/guid";
import { getKey } from "../../utils/key";
import { parseTimeString, formatTimeString, getMeridiem, getMeridiemHour } from "../../utils/time";
export class CalciteInputTimePicker {
  constructor() {
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------
    /** The active state of the time input */
    this.active = false;
    /** The disabled state of the time input */
    this.disabled = false;
    /** Format of the hour value (12-hour or 24-hour) (this will be replaced by locale eventually) */
    this.hourDisplayFormat = "12";
    /** The scale (size) of the time input */
    this.scale = "m";
    /** number that specifies the granularity that the value must adhere to */
    this.step = 60;
    /** The selected time */
    this.value = null;
    /** whether the value of the input was changed as a result of user typing or not */
    this.internalValueChange = false;
    this.previousValidValue = null;
    this.referenceElementId = `input-time-picker-${guid()}`;
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    this.calciteInputBlurHandler = () => {
      this.active = false;
      const newValue = formatTimeString(this.calciteInputEl.value) || formatTimeString(this.value);
      if (newValue !== this.calciteInputEl.value) {
        this.setInputValue(newValue);
      }
    };
    this.calciteInputFocusHandler = () => {
      this.active = true;
    };
    this.calciteInputInputHandler = (event) => {
      this.setValue({ value: event.detail.value });
    };
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    this.setCalciteInputEl = (el) => {
      this.calciteInputEl = el;
    };
    this.setCalciteTimePickerEl = (el) => {
      this.calciteTimePickerEl = el;
    };
    this.setInputValue = (newInputValue) => {
      if (!this.calciteInputEl) {
        return;
      }
      if (this.hourDisplayFormat === "12") {
        const { hour, minute, second } = parseTimeString(newInputValue);
        this.calciteInputEl.value = newInputValue
          ? `${getMeridiemHour(hour)}:${minute}${this.step !== 60 ? ":" + second : ""} ${getMeridiem(hour)}`
          : null;
      }
      else {
        this.calciteInputEl.value = newInputValue;
      }
    };
    this.setValue = ({ value, origin = "input" }) => {
      const previousValue = this.value;
      const validatedNewValue = formatTimeString(value);
      this.internalValueChange = origin !== "external" && origin !== "loading";
      const shouldEmit = origin !== "loading" &&
        origin !== "external" &&
        ((value !== this.previousValidValue && !value) ||
          !!(!this.previousValidValue && validatedNewValue) ||
          (validatedNewValue !== this.previousValidValue && validatedNewValue));
      if (value) {
        if (shouldEmit) {
          this.previousValidValue = validatedNewValue;
        }
        if (validatedNewValue && validatedNewValue !== this.value) {
          this.value = validatedNewValue;
        }
      }
      else {
        this.value = value;
      }
      if (origin === "time-picker" || origin === "external") {
        this.setInputValue(validatedNewValue);
      }
      if (shouldEmit) {
        const changeEvent = this.calciteInputTimePickerChange.emit();
        if (changeEvent.defaultPrevented) {
          this.internalValueChange = false;
          this.value = previousValue;
          this.setInputValue(previousValue);
          this.previousValidValue = previousValue;
        }
        else {
          this.previousValidValue = validatedNewValue;
        }
      }
    };
  }
  valueWatcher(newValue) {
    if (!this.internalValueChange) {
      this.setValue({ value: newValue, origin: "external" });
    }
    this.internalValueChange = false;
  }
  clickHandler(event) {
    if (event.composedPath().includes(this.calciteTimePickerEl)) {
      return;
    }
    this.setFocus();
  }
  keyUpHandler(event) {
    if (getKey(event.key) === "Escape" && this.active) {
      this.active = false;
    }
  }
  timePickerBlurHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    this.active = false;
  }
  timePickerChangeHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    if (event.detail) {
      const { hour, minute, second } = event.detail;
      let value;
      if (hour && minute) {
        if (second && this.step !== 60) {
          value = `${hour}:${minute}:${second}`;
        }
        else {
          value = `${hour}:${minute}`;
        }
      }
      else {
        value = "";
      }
      this.setValue({ value, origin: "time-picker" });
    }
  }
  timePickerFocusHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    this.active = true;
  }
  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------
  async setFocus() {
    this.calciteInputEl.setFocus();
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    if (this.value) {
      this.setValue({ value: this.value, origin: "loading" });
    }
  }
  componentDidLoad() {
    if (this.calciteInputEl.value !== this.value) {
      this.setInputValue(this.value);
    }
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  render() {
    const { hour, minute, second } = parseTimeString(this.value);
    const popoverId = `${this.referenceElementId}-popover`;
    return (h(Host, null,
      h("div", { "aria-controls": popoverId, "aria-haspopup": "dialog", "aria-label": this.name, "aria-owns": popoverId, id: this.referenceElementId, role: "combobox" },
        h("calcite-input", { disabled: this.disabled, icon: "clock", name: this.name, onCalciteInputBlur: this.calciteInputBlurHandler, onCalciteInputFocus: this.calciteInputFocusHandler, onCalciteInputInput: this.calciteInputInputHandler, ref: this.setCalciteInputEl, scale: this.scale, step: this.step })),
      h("calcite-popover", { id: popoverId, label: "Time Picker", open: this.active || false, referenceElement: this.referenceElementId },
        h("calcite-time-picker", { hour: hour, "hour-display-format": this.hourDisplayFormat, intlHour: this.intlHour, intlHourDown: this.intlHourDown, intlHourUp: this.intlHourUp, intlMeridiem: this.intlMeridiem, intlMeridiemDown: this.intlMeridiemDown, intlMeridiemUp: this.intlMeridiemUp, intlMinute: this.intlMinute, intlMinuteDown: this.intlMinuteDown, intlMinuteUp: this.intlMinuteUp, intlSecond: this.intlSecond, intlSecondDown: this.intlSecondDown, intlSecondUp: this.intlSecondUp, minute: minute, ref: this.setCalciteTimePickerEl, scale: this.scale, second: second, step: this.step }))));
  }
  static get is() { return "calcite-input-time-picker"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["calcite-input-time-picker.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["calcite-input-time-picker.css"]
  }; }
  static get properties() { return {
    "active": {
      "type": "boolean",
      "mutable": true,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "The active state of the time input"
      },
      "attribute": "active",
      "reflect": true,
      "defaultValue": "false"
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
        "text": "The disabled state of the time input"
      },
      "attribute": "disabled",
      "reflect": true,
      "defaultValue": "false"
    },
    "hourDisplayFormat": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "HourDisplayFormat",
        "resolved": "\"12\" | \"24\"",
        "references": {
          "HourDisplayFormat": {
            "location": "import",
            "path": "../../utils/time"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Format of the hour value (12-hour or 24-hour) (this will be replaced by locale eventually)"
      },
      "attribute": "hour-display-format",
      "reflect": false,
      "defaultValue": "\"12\""
    },
    "intlHour": {
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
        "text": "aria-label for the hour input"
      },
      "attribute": "intl-hour",
      "reflect": false
    },
    "intlHourDown": {
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
        "text": "aria-label for the hour down button"
      },
      "attribute": "intl-hour-down",
      "reflect": false
    },
    "intlHourUp": {
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
        "text": "aria-label for the hour up button"
      },
      "attribute": "intl-hour-up",
      "reflect": false
    },
    "intlMeridiem": {
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
        "text": "aria-label for the meridiem (am/pm) input"
      },
      "attribute": "intl-meridiem",
      "reflect": false
    },
    "intlMeridiemDown": {
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
        "text": "aria-label for the meridiem (am/pm) down button"
      },
      "attribute": "intl-meridiem-down",
      "reflect": false
    },
    "intlMeridiemUp": {
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
        "text": "aria-label for the meridiem (am/pm) up button"
      },
      "attribute": "intl-meridiem-up",
      "reflect": false
    },
    "intlMinute": {
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
        "text": "aria-label for the minute input"
      },
      "attribute": "intl-minute",
      "reflect": false
    },
    "intlMinuteDown": {
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
        "text": "aria-label for the minute down button"
      },
      "attribute": "intl-minute-down",
      "reflect": false
    },
    "intlMinuteUp": {
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
        "text": "aria-label for the minute up button"
      },
      "attribute": "intl-minute-up",
      "reflect": false
    },
    "intlSecond": {
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
        "text": "aria-label for the second input"
      },
      "attribute": "intl-second",
      "reflect": false
    },
    "intlSecondDown": {
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
        "text": "aria-label for the second down button"
      },
      "attribute": "intl-second-down",
      "reflect": false
    },
    "intlSecondUp": {
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
        "text": "aria-label for the second up button"
      },
      "attribute": "intl-second-up",
      "reflect": false
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
        "text": "The name of the time input"
      },
      "attribute": "name",
      "reflect": false
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
        "text": "The scale (size) of the time input"
      },
      "attribute": "scale",
      "reflect": true,
      "defaultValue": "\"m\""
    },
    "step": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "number that specifies the granularity that the value must adhere to"
      },
      "attribute": "step",
      "reflect": false,
      "defaultValue": "60"
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
        "text": "The selected time"
      },
      "attribute": "value",
      "reflect": false,
      "defaultValue": "null"
    }
  }; }
  static get events() { return [{
      "method": "calciteInputTimePickerChange",
      "name": "calciteInputTimePickerChange",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Fires when the time value is changed as a result of user input."
      },
      "complexType": {
        "original": "string",
        "resolved": "string",
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
        "text": "",
        "tags": []
      }
    }
  }; }
  static get elementRef() { return "el"; }
  static get watchers() { return [{
      "propName": "value",
      "methodName": "valueWatcher"
    }]; }
  static get listeners() { return [{
      "name": "click",
      "method": "clickHandler",
      "target": undefined,
      "capture": false,
      "passive": false
    }, {
      "name": "keyup",
      "method": "keyUpHandler",
      "target": undefined,
      "capture": false,
      "passive": false
    }, {
      "name": "calciteTimePickerBlur",
      "method": "timePickerBlurHandler",
      "target": undefined,
      "capture": false,
      "passive": false
    }, {
      "name": "calciteTimePickerChange",
      "method": "timePickerChangeHandler",
      "target": undefined,
      "capture": false,
      "passive": false
    }, {
      "name": "calciteTimePickerFocus",
      "method": "timePickerFocusHandler",
      "target": undefined,
      "capture": false,
      "passive": false
    }]; }
}
