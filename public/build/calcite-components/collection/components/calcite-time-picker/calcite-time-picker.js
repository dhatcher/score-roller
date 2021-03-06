import { Component, Element, Host, h, Prop, Event, Watch, State, Listen, Method } from "@stencil/core";
import { getKey, isActivationKey, numberKeys } from "../../utils/key";
import { isValidNumber } from "../../utils/number";
import { formatTimePart, maxTenthForMinuteAndSecond, getMeridiem, getMeridiemHour } from "../../utils/time";
import { CSS, TEXT } from "./resources";
export class CalciteTimePicker {
  constructor() {
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------
    /** The hour value (24-hour format) */
    this.hour = null;
    /** Format of the hour value (12-hour or 24-hour) (this will be replaced by locale eventually) */
    this.hourDisplayFormat = "12";
    /** aria-label for the hour input
     * @default "Hour"
     */
    this.intlHour = TEXT.hour;
    /** aria-label for the hour down button
     * @default "Decrease hour"
     */
    this.intlHourDown = TEXT.hourDown;
    /** aria-label for the hour up button
     * @default "Increase hour"
     */
    this.intlHourUp = TEXT.hourUp;
    /** aria-label for the meridiem (am/pm) input
     * @default "AM/PM"
     */
    this.intlMeridiem = TEXT.meridiem;
    /** aria-label for the meridiem (am/pm) down button
     * @default "Decrease AM/PM"
     */
    this.intlMeridiemDown = TEXT.meridiemDown;
    /** aria-label for the meridiem (am/pm) up button
     * @default "Increase AM/PM"
     */
    this.intlMeridiemUp = TEXT.meridiemUp;
    /** aria-label for the minute input
     * @default "Minute"
     */
    this.intlMinute = TEXT.minute;
    /** aria-label for the minute down button
     * @default "Decrease minute"
     */
    this.intlMinuteDown = TEXT.minuteDown;
    /** aria-label for the minute up button
     * @default "Increase minute"
     */
    this.intlMinuteUp = TEXT.minuteUp;
    /** aria-label for the second input
     * @default "Second"
     */
    this.intlSecond = TEXT.second;
    /** aria-label for the second down button
     * @default "Decrease second"
     */
    this.intlSecondDown = TEXT.secondDown;
    /** aria-label for the second up button
     * @default "Increase second"
     */
    this.intlSecondUp = TEXT.secondUp;
    /** The minute value */
    this.minute = null;
    /** The second value */
    this.second = null;
    /** The scale (size) of the time picker */
    this.scale = "m";
    /** number that specifies the granularity that the value must adhere to */
    this.step = 60;
    this.timeChanged = false;
    // --------------------------------------------------------------------------
    //
    //  State
    //
    // --------------------------------------------------------------------------
    /** The am/pm value */
    this.meridiem = null;
    this.displayHour = this.getDisplayHour();
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    this.decrementHour = () => {
      const newHour = !this.hour ? 0 : this.hour === "00" ? 23 : parseInt(this.hour) - 1;
      this.setTime("hour", newHour);
    };
    this.decrementMeridiem = () => {
      const newMeridiem = this.meridiem === "PM" ? "AM" : "PM";
      this.setTime("meridiem", newMeridiem);
    };
    this.decrementMinuteOrSecond = (key) => {
      let newValue;
      if (isValidNumber(this[key])) {
        const valueAsNumber = parseInt(this[key]);
        if (valueAsNumber === 0) {
          newValue = 59;
        }
        else {
          newValue = valueAsNumber - 1;
        }
      }
      else {
        newValue = 59;
      }
      this.setTime(key, newValue);
    };
    this.decrementMinute = () => {
      this.decrementMinuteOrSecond("minute");
    };
    this.decrementSecond = () => {
      this.decrementMinuteOrSecond("second");
    };
    this.focusHandler = (event) => {
      this.activeEl = event.currentTarget;
    };
    this.hourDownButtonKeyDownHandler = (event) => {
      if (this.buttonActivated(event)) {
        this.decrementHour();
      }
    };
    this.hourKeyDownHandler = (event) => {
      const key = getKey(event.key);
      if (numberKeys.includes(key)) {
        const keyAsNumber = parseInt(key);
        let newHour;
        if (isValidNumber(this.hour)) {
          switch (this.hourDisplayFormat) {
            case "12":
              if (this.hour === "01" && keyAsNumber >= 0 && keyAsNumber <= 2) {
                newHour = `1${keyAsNumber}`;
              }
              else {
                newHour = keyAsNumber;
              }
              break;
            case "24":
              if (this.hour === "01") {
                newHour = `1${keyAsNumber}`;
              }
              else if (this.hour === "02" && keyAsNumber >= 0 && keyAsNumber <= 3) {
                newHour = `2${keyAsNumber}`;
              }
              else {
                newHour = keyAsNumber;
              }
              break;
          }
        }
        else {
          newHour = keyAsNumber;
        }
        this.setTime("hour", newHour);
      }
      else {
        switch (key) {
          case "Backspace":
          case "Delete":
            this.setTime("hour", null);
            break;
          case "ArrowDown":
            event.preventDefault();
            this.decrementHour();
            break;
          case "ArrowUp":
            event.preventDefault();
            this.incrementHour();
            break;
          case " ":
          case "Spacebar":
            event.preventDefault();
            break;
        }
      }
    };
    this.hourUpButtonKeyDownHandler = (event) => {
      if (this.buttonActivated(event)) {
        this.incrementHour();
      }
    };
    this.incrementMeridiem = () => {
      const newMeridiem = this.meridiem === "AM" ? "PM" : "AM";
      this.setTime("meridiem", newMeridiem);
    };
    this.incrementHour = () => {
      const newHour = isValidNumber(this.hour)
        ? this.hour === "23"
          ? 0
          : parseInt(this.hour) + 1
        : 1;
      this.setTime("hour", newHour);
    };
    this.incrementMinuteOrSecond = (key) => {
      const newValue = isValidNumber(this[key])
        ? this[key] === "59"
          ? 0
          : parseInt(this[key]) + 1
        : 0;
      this.setTime(key, newValue);
    };
    this.incrementMinute = () => {
      this.incrementMinuteOrSecond("minute");
    };
    this.incrementSecond = () => {
      this.incrementMinuteOrSecond("second");
    };
    this.meridiemDownButtonKeyDownHandler = (event) => {
      if (this.buttonActivated(event)) {
        this.decrementMeridiem();
      }
    };
    this.meridiemKeyDownHandler = (event) => {
      switch (getKey(event.key)) {
        case "a":
          this.setTime("meridiem", "AM");
          break;
        case "p":
          this.setTime("meridiem", "PM");
          break;
        case "Backspace":
        case "Delete":
          this.setTime("meridiem", null);
          break;
        case "ArrowUp":
          event.preventDefault();
          this.incrementMeridiem();
          break;
        case "ArrowDown":
          event.preventDefault();
          this.decrementMeridiem();
          break;
        case " ":
        case "Spacebar":
          event.preventDefault();
          break;
      }
    };
    this.meridiemUpButtonKeyDownHandler = (event) => {
      if (this.buttonActivated(event)) {
        this.incrementMeridiem();
      }
    };
    this.minuteDownButtonKeyDownHandler = (event) => {
      if (this.buttonActivated(event)) {
        this.decrementMinute();
      }
    };
    this.minuteKeyDownHandler = (event) => {
      const key = getKey(event.key);
      if (numberKeys.includes(key)) {
        const keyAsNumber = parseInt(key);
        let newMinute;
        if (isValidNumber(this.minute) && this.minute.startsWith("0")) {
          const minuteAsNumber = parseInt(this.minute);
          if (minuteAsNumber > maxTenthForMinuteAndSecond) {
            newMinute = keyAsNumber;
          }
          else {
            newMinute = `${minuteAsNumber}${keyAsNumber}`;
          }
        }
        else {
          newMinute = keyAsNumber;
        }
        this.setTime("minute", newMinute);
      }
      else {
        switch (key) {
          case "Backspace":
          case "Delete":
            this.setTime("minute", null);
            break;
          case "ArrowDown":
            event.preventDefault();
            this.decrementMinute();
            break;
          case "ArrowUp":
            event.preventDefault();
            this.incrementMinute();
            break;
          case " ":
          case "Spacebar":
            event.preventDefault();
            break;
        }
      }
    };
    this.minuteUpButtonKeyDownHandler = (event) => {
      if (this.buttonActivated(event)) {
        this.incrementMinute();
      }
    };
    this.secondDownButtonKeyDownHandler = (event) => {
      if (this.buttonActivated(event)) {
        this.decrementSecond();
      }
    };
    this.secondKeyDownHandler = (event) => {
      const key = getKey(event.key);
      if (numberKeys.includes(key)) {
        const keyAsNumber = parseInt(key);
        let newSecond;
        if (isValidNumber(this.second) && this.second.startsWith("0")) {
          const secondAsNumber = parseInt(this.second);
          if (secondAsNumber > maxTenthForMinuteAndSecond) {
            newSecond = keyAsNumber;
          }
          else {
            newSecond = `${secondAsNumber}${keyAsNumber}`;
          }
        }
        else {
          newSecond = keyAsNumber;
        }
        this.setTime("second", newSecond);
      }
      else {
        switch (key) {
          case "Backspace":
          case "Delete":
            this.setTime("second", null);
            break;
          case "ArrowDown":
            event.preventDefault();
            this.decrementSecond();
            break;
          case "ArrowUp":
            event.preventDefault();
            this.incrementSecond();
            break;
          case " ":
          case "Spacebar":
            event.preventDefault();
            break;
        }
      }
    };
    this.secondUpButtonKeyDownHandler = (event) => {
      if (this.buttonActivated(event)) {
        this.incrementSecond();
      }
    };
    this.setTime = (key, value, emit = true) => {
      switch (key) {
        default:
          return;
        case "hour":
          this.hour = typeof value === "number" ? formatTimePart(value) : value;
          break;
        case "minute":
          this.minute = typeof value === "number" ? formatTimePart(value) : value;
          break;
        case "second":
          this.second = typeof value === "number" ? formatTimePart(value) : value;
          break;
        case "meridiem":
          if (isValidNumber(this.hour)) {
            const hourAsNumber = parseInt(this.hour);
            switch (value) {
              case "AM":
                if (hourAsNumber >= 12) {
                  this.hour = formatTimePart(hourAsNumber - 12);
                }
                break;
              case "PM":
                if (hourAsNumber < 12) {
                  this.hour = formatTimePart(hourAsNumber + 12);
                }
                break;
            }
            this.meridiem = value;
          }
          else {
            this.meridiem = value;
          }
          break;
      }
      this.timeChanged = true;
      if (emit) {
        this.calciteTimePickerChange.emit(this.getTime());
      }
    };
  }
  hourChanged(newHour) {
    if (this.hourDisplayFormat === "12" && isValidNumber(newHour)) {
      this.meridiem = getMeridiem(newHour);
    }
  }
  timeChangeHandler() {
    const { hour, minute } = this.getTime();
    if (!hour && !minute) {
      this.setTime("meridiem", null, false);
    }
    if (this.timeChanged) {
      this.timeChanged = false;
    }
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  hostBlurHandler() {
    this.calciteTimePickerBlur.emit();
  }
  hostFocusHandler() {
    this.calciteTimePickerFocus.emit();
  }
  keyDownHandler(event) {
    const key = getKey(event.key);
    switch (this.activeEl) {
      case this.hourEl:
        if (key === "ArrowRight") {
          this.setFocus("minute");
        }
        break;
      case this.minuteEl:
        switch (key) {
          case "ArrowLeft":
            this.setFocus("hour");
            break;
          case "ArrowRight":
            if (this.step !== 60) {
              this.setFocus("second");
            }
            else if (this.hourDisplayFormat === "12") {
              this.setFocus("meridiem");
            }
            break;
        }
        break;
      case this.secondEl:
        switch (key) {
          case "ArrowLeft":
            this.setFocus("minute");
            break;
          case "ArrowRight":
            if (this.hourDisplayFormat === "12") {
              this.setFocus("meridiem");
            }
            break;
        }
        break;
      case this.meridiemEl:
        switch (key) {
          case "ArrowLeft":
            if (this.step !== 60) {
              this.setFocus("second");
            }
            else {
              this.setFocus("minute");
            }
            break;
        }
        break;
    }
  }
  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  async setFocus(target) {
    var _a;
    (_a = this[`${target || "hour"}El`]) === null || _a === void 0 ? void 0 : _a.focus();
  }
  buttonActivated(event) {
    const key = getKey(event.key);
    if (key === " ") {
      event.preventDefault();
    }
    return isActivationKey(key);
  }
  getDisplayHour() {
    if (!this.hour) {
      return "--";
    }
    if (this.hourDisplayFormat === "12") {
      return getMeridiemHour(this.hour);
    }
    return this.hour;
  }
  getTime() {
    return {
      hour: this.hour,
      minute: this.minute,
      second: this.second
    };
  }
  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------
  connectedCallback() {
    if (this.hourDisplayFormat === "12") {
      this.meridiem = getMeridiem(this.hour);
    }
    if (isValidNumber(this.hour)) {
      this.hour = formatTimePart(parseInt(this.hour));
    }
    if (isValidNumber(this.minute)) {
      this.minute = formatTimePart(parseInt(this.minute));
    }
    if (isValidNumber(this.second)) {
      this.second = formatTimePart(parseInt(this.second));
    }
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  render() {
    const iconScale = this.scale === "s" || this.scale === "m" ? "s" : "m";
    const includeSeconds = this.step !== 60;
    const hourIsNumber = isValidNumber(this.hour);
    const minuteIsNumber = isValidNumber(this.minute);
    const secondIsNumber = isValidNumber(this.second);
    return (h(Host, null,
      h("div", { class: CSS.timePicker },
        h("div", { role: "group" },
          h("span", { "aria-label": this.intlHourUp, class: {
              [CSS.button]: true,
              [CSS.buttonHourUp]: true,
              [CSS.buttonTopLeft]: true
            }, onClick: this.incrementHour, onKeyDown: this.hourUpButtonKeyDownHandler, role: "button", tabIndex: -1 },
            h("calcite-icon", { icon: "chevron-up", scale: iconScale })),
          h("span", { "aria-label": this.intlHour, "aria-valuemax": "23", "aria-valuemin": "1", "aria-valuenow": hourIsNumber && parseInt(this.hour), "aria-valuetext": this.hour, class: {
              [CSS.input]: true,
              [CSS.hour]: true
            }, onFocus: this.focusHandler, onKeyDown: this.hourKeyDownHandler, ref: (el) => (this.hourEl = el), role: "spinbutton", tabIndex: 0 }, this.getDisplayHour()),
          h("span", { "aria-label": this.intlHourDown, class: {
              [CSS.button]: true,
              [CSS.buttonHourDown]: true,
              [CSS.buttonBottomLeft]: true
            }, onClick: this.decrementHour, onKeyDown: this.hourDownButtonKeyDownHandler, role: "button", tabIndex: -1 },
            h("calcite-icon", { icon: "chevron-down", scale: iconScale }))),
        h("span", { class: CSS.delimiter }, ":"),
        h("div", { role: "group" },
          h("span", { "aria-label": this.intlMinuteUp, class: {
              [CSS.button]: true,
              [CSS.buttonMinuteUp]: true
            }, onClick: this.incrementMinute, onKeyDown: this.minuteUpButtonKeyDownHandler, role: "button", tabIndex: -1 },
            h("calcite-icon", { icon: "chevron-up", scale: iconScale })),
          h("span", { "aria-label": this.intlMinute, "aria-valuemax": "12", "aria-valuemin": "1", "aria-valuenow": minuteIsNumber && parseInt(this.minute), "aria-valuetext": this.minute, class: {
              [CSS.input]: true,
              [CSS.minute]: true
            }, onFocus: this.focusHandler, onKeyDown: this.minuteKeyDownHandler, ref: (el) => (this.minuteEl = el), role: "spinbutton", tabIndex: 0 }, this.minute ? this.minute : "--"),
          h("span", { "aria-label": this.intlMinuteDown, class: {
              [CSS.button]: true,
              [CSS.buttonMinuteDown]: true
            }, onClick: this.decrementMinute, onKeyDown: this.minuteDownButtonKeyDownHandler, role: "button", tabIndex: -1 },
            h("calcite-icon", { icon: "chevron-down", scale: iconScale }))),
        includeSeconds && h("span", { class: CSS.delimiter }, ":"),
        includeSeconds && (h("div", { role: "group" },
          h("span", { "aria-label": this.intlSecondUp, class: {
              [CSS.button]: true,
              [CSS.buttonSecondUp]: true
            }, onClick: this.incrementSecond, onKeyDown: this.secondUpButtonKeyDownHandler, role: "button", tabIndex: -1 },
            h("calcite-icon", { icon: "chevron-up", scale: iconScale })),
          h("span", { "aria-label": this.intlSecond, "aria-valuemax": "59", "aria-valuemin": "0", "aria-valuenow": secondIsNumber && parseInt(this.second), "aria-valuetext": this.second, class: {
              [CSS.input]: true,
              [CSS.second]: true
            }, onFocus: this.focusHandler, onKeyDown: this.secondKeyDownHandler, ref: (el) => (this.secondEl = el), role: "spinbutton", tabIndex: 0 }, this.second ? this.second : "--"),
          h("span", { "aria-label": this.intlSecondDown, class: {
              [CSS.button]: true,
              [CSS.buttonSecondDown]: true
            }, onClick: this.decrementSecond, onKeyDown: this.secondDownButtonKeyDownHandler, role: "button", tabIndex: -1 },
            h("calcite-icon", { icon: "chevron-down", scale: iconScale })))),
        this.hourDisplayFormat === "12" && (h("div", { role: "group" },
          h("span", { "aria-label": this.intlMeridiemUp, class: {
              [CSS.button]: true,
              [CSS.buttonMeridiemUp]: true,
              [CSS.buttonTopRight]: true
            }, onClick: this.incrementMeridiem, onKeyDown: this.meridiemUpButtonKeyDownHandler, role: "button", tabIndex: -1 },
            h("calcite-icon", { icon: "chevron-up", scale: iconScale })),
          h("span", { "aria-label": this.intlMeridiem, "aria-valuemax": "2", "aria-valuemin": "1", "aria-valuenow": this.meridiem === "AM" ? "1" : this.meridiem === "PM" ? "2" : undefined, "aria-valuetext": this.meridiem, class: {
              [CSS.input]: true,
              [CSS.meridiem]: true
            }, onFocus: this.focusHandler, onKeyDown: this.meridiemKeyDownHandler, ref: (el) => (this.meridiemEl = el), role: "spinbutton", tabIndex: 0 }, this.meridiem ? this.meridiem : "--"),
          h("span", { "aria-label": this.intlMeridiemDown, class: {
              [CSS.button]: true,
              [CSS.buttonMeridiemDown]: true,
              [CSS.buttonBottomRight]: true
            }, onClick: this.decrementMeridiem, onKeyDown: this.meridiemDownButtonKeyDownHandler, role: "button", tabIndex: -1 },
            h("calcite-icon", { icon: "chevron-down", scale: iconScale })))))));
  }
  static get is() { return "calcite-time-picker"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["calcite-time-picker.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["calcite-time-picker.css"]
  }; }
  static get properties() { return {
    "hour": {
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
        "text": "The hour value (24-hour format)"
      },
      "attribute": "hour",
      "reflect": false,
      "defaultValue": "null"
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
      "reflect": true,
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
      "optional": false,
      "docs": {
        "tags": [{
            "text": "\"Hour\"",
            "name": "default"
          }],
        "text": "aria-label for the hour input"
      },
      "attribute": "intl-hour",
      "reflect": false,
      "defaultValue": "TEXT.hour"
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
      "optional": false,
      "docs": {
        "tags": [{
            "text": "\"Decrease hour\"",
            "name": "default"
          }],
        "text": "aria-label for the hour down button"
      },
      "attribute": "intl-hour-down",
      "reflect": false,
      "defaultValue": "TEXT.hourDown"
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
      "optional": false,
      "docs": {
        "tags": [{
            "text": "\"Increase hour\"",
            "name": "default"
          }],
        "text": "aria-label for the hour up button"
      },
      "attribute": "intl-hour-up",
      "reflect": false,
      "defaultValue": "TEXT.hourUp"
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
      "optional": false,
      "docs": {
        "tags": [{
            "text": "\"AM/PM\"",
            "name": "default"
          }],
        "text": "aria-label for the meridiem (am/pm) input"
      },
      "attribute": "intl-meridiem",
      "reflect": false,
      "defaultValue": "TEXT.meridiem"
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
      "optional": false,
      "docs": {
        "tags": [{
            "text": "\"Decrease AM/PM\"",
            "name": "default"
          }],
        "text": "aria-label for the meridiem (am/pm) down button"
      },
      "attribute": "intl-meridiem-down",
      "reflect": false,
      "defaultValue": "TEXT.meridiemDown"
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
      "optional": false,
      "docs": {
        "tags": [{
            "text": "\"Increase AM/PM\"",
            "name": "default"
          }],
        "text": "aria-label for the meridiem (am/pm) up button"
      },
      "attribute": "intl-meridiem-up",
      "reflect": false,
      "defaultValue": "TEXT.meridiemUp"
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
      "optional": false,
      "docs": {
        "tags": [{
            "text": "\"Minute\"",
            "name": "default"
          }],
        "text": "aria-label for the minute input"
      },
      "attribute": "intl-minute",
      "reflect": false,
      "defaultValue": "TEXT.minute"
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
      "optional": false,
      "docs": {
        "tags": [{
            "text": "\"Decrease minute\"",
            "name": "default"
          }],
        "text": "aria-label for the minute down button"
      },
      "attribute": "intl-minute-down",
      "reflect": false,
      "defaultValue": "TEXT.minuteDown"
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
      "optional": false,
      "docs": {
        "tags": [{
            "text": "\"Increase minute\"",
            "name": "default"
          }],
        "text": "aria-label for the minute up button"
      },
      "attribute": "intl-minute-up",
      "reflect": false,
      "defaultValue": "TEXT.minuteUp"
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
      "optional": false,
      "docs": {
        "tags": [{
            "text": "\"Second\"",
            "name": "default"
          }],
        "text": "aria-label for the second input"
      },
      "attribute": "intl-second",
      "reflect": false,
      "defaultValue": "TEXT.second"
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
      "optional": false,
      "docs": {
        "tags": [{
            "text": "\"Decrease second\"",
            "name": "default"
          }],
        "text": "aria-label for the second down button"
      },
      "attribute": "intl-second-down",
      "reflect": false,
      "defaultValue": "TEXT.secondDown"
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
      "optional": false,
      "docs": {
        "tags": [{
            "text": "\"Increase second\"",
            "name": "default"
          }],
        "text": "aria-label for the second up button"
      },
      "attribute": "intl-second-up",
      "reflect": false,
      "defaultValue": "TEXT.secondUp"
    },
    "minute": {
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
        "text": "The minute value"
      },
      "attribute": "minute",
      "reflect": false,
      "defaultValue": "null"
    },
    "second": {
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
        "text": "The second value"
      },
      "attribute": "second",
      "reflect": false,
      "defaultValue": "null"
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
        "text": "The scale (size) of the time picker"
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
      "reflect": true,
      "defaultValue": "60"
    }
  }; }
  static get states() { return {
    "meridiem": {},
    "displayHour": {}
  }; }
  static get events() { return [{
      "method": "calciteTimePickerBlur",
      "name": "calciteTimePickerBlur",
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
        "original": "Time",
        "resolved": "Time",
        "references": {
          "Time": {
            "location": "import",
            "path": "../../utils/time"
          }
        }
      }
    }, {
      "method": "calciteTimePickerChange",
      "name": "calciteTimePickerChange",
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
        "original": "Time",
        "resolved": "Time",
        "references": {
          "Time": {
            "location": "import",
            "path": "../../utils/time"
          }
        }
      }
    }, {
      "method": "calciteTimePickerFocus",
      "name": "calciteTimePickerFocus",
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
        "original": "Time",
        "resolved": "Time",
        "references": {
          "Time": {
            "location": "import",
            "path": "../../utils/time"
          }
        }
      }
    }]; }
  static get methods() { return {
    "setFocus": {
      "complexType": {
        "signature": "(target: TimeFocusId) => Promise<void>",
        "parameters": [{
            "tags": [],
            "text": ""
          }],
        "references": {
          "Promise": {
            "location": "global"
          },
          "TimeFocusId": {
            "location": "import",
            "path": "../../utils/time"
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
      "propName": "hour",
      "methodName": "hourChanged"
    }, {
      "propName": "hour",
      "methodName": "timeChangeHandler"
    }, {
      "propName": "minute",
      "methodName": "timeChangeHandler"
    }, {
      "propName": "second",
      "methodName": "timeChangeHandler"
    }]; }
  static get listeners() { return [{
      "name": "blur",
      "method": "hostBlurHandler",
      "target": undefined,
      "capture": false,
      "passive": false
    }, {
      "name": "focus",
      "method": "hostFocusHandler",
      "target": undefined,
      "capture": false,
      "passive": false
    }, {
      "name": "keydown",
      "method": "keyDownHandler",
      "target": undefined,
      "capture": false,
      "passive": false
    }]; }
}
