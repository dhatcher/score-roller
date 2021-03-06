import { Component, h, Prop, Element, Host, State, Listen, Watch, Method, Event } from "@stencil/core";
import { getLocaleData } from "../calcite-date-picker/utils";
import { getElementDir } from "../../utils/dom";
import { dateFromRange, inRange, dateFromISO, parseDateString, sameDate } from "../../utils/date";
import { getKey } from "../../utils/key";
import { TEXT } from "../calcite-date-picker/calcite-date-picker-resources";
import { createPopper, updatePopper, CSS as PopperCSS } from "../../utils/popper";
const DEFAULT_PLACEMENT = "bottom-leading";
export class CalciteInputDatePicker {
  constructor() {
    /** Expand or collapse when calendar does not have input */
    this.active = false;
    /** Localized string for "previous month" (used for aria label)
     * @default "previous month"
     */
    this.intlPrevMonth = TEXT.prevMonth;
    /** Localized string for "next month" (used for aria label)
     * @default "next month"
     */
    this.intlNextMonth = TEXT.nextMonth;
    /** BCP 47 language tag for desired language and country format */
    this.locale = document.documentElement.lang || "en";
    /** specify the scale of the date picker */
    this.scale = "m";
    /** Range mode activation */
    this.range = false;
    /** Describes the type of positioning to use for the overlaid content. If your element is in a fixed container, use the 'fixed' value. */
    this.overlayPositioning = "absolute";
    /** Disables the default behaviour on the third click of narrowing or extending the range and instead starts a new range. */
    this.proximitySelectionDisabled = false;
    /** Layout */
    this.layout = "horizontal";
    //--------------------------------------------------------------------------
    //
    //  Private State/Props
    //
    //--------------------------------------------------------------------------
    this.focusedInput = "start";
    this.activeTransitionProp = "opacity";
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    this.transitionEnd = (event) => {
      if (event.propertyName === this.activeTransitionProp) {
        this.active
          ? this.calciteInputDatePickerOpen.emit()
          : this.calciteInputDatePickerClose.emit();
      }
    };
    this.setEndInput = (el) => {
      this.endInput = el;
    };
    this.deactivate = () => {
      this.active = false;
    };
    this.keyUpHandler = (e) => {
      if (getKey(e.key) === "Escape") {
        this.active = false;
      }
    };
    this.inputBlur = (e) => {
      this.blur(e.detail);
    };
    this.startInputFocus = () => {
      this.active = true;
      this.focusedInput = "start";
    };
    this.endInputFocus = () => {
      this.active = true;
      this.focusedInput = "end";
    };
    this.inputInput = (e) => {
      this.input(e.detail.value);
    };
    this.setMenuEl = (el) => {
      if (el) {
        this.menuEl = el;
        this.createPopper();
      }
    };
    this.setStartWrapper = (el) => {
      this.startWrapper = el;
      this.setReferenceEl();
    };
    this.setEndWrapper = (el) => {
      this.endWrapper = el;
      this.setReferenceEl();
    };
    /**
     * Event handler for when the selected date changes
     */
    this.handleDateChange = (event) => {
      if (this.range) {
        return;
      }
      this.valueAsDate = event.detail;
    };
    this.focusInputEnd = () => {
      var _a;
      (_a = this.endInput) === null || _a === void 0 ? void 0 : _a.setFocus();
      this.el.removeEventListener("calciteInputDatePickerOpen", this.focusInputEnd);
    };
    this.handleDateRangeChange = (event) => {
      if (!this.range || !event.detail) {
        return;
      }
      const { startDate, endDate } = event.detail;
      this.startAsDate = startDate;
      this.endAsDate = endDate;
      clearTimeout(this.endInputFocusTimeout);
      if (startDate && this.focusedInput === "start" && this.endInput) {
        this.el.addEventListener("calciteInputDatePickerOpen", this.focusInputEnd);
      }
    };
  }
  activeHandler() {
    this.reposition();
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  calciteDaySelectHandler() {
    this.active = false;
  }
  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  async reposition() {
    const { popper, menuEl } = this;
    const modifiers = this.getModifiers();
    popper
      ? updatePopper({
        el: menuEl,
        modifiers,
        placement: DEFAULT_PLACEMENT,
        popper
      })
      : this.createPopper();
  }
  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------
  connectedCallback() {
    this.loadLocaleData();
    if (this.value) {
      this.valueAsDate = dateFromISO(this.value);
    }
    if (this.start) {
      this.setStartAsDate(dateFromISO(this.start));
    }
    if (this.end) {
      this.setEndAsDate(dateFromISO(this.end));
    }
    if (this.min) {
      this.minAsDate = dateFromISO(this.min);
    }
    if (this.max) {
      this.maxAsDate = dateFromISO(this.max);
    }
    this.createPopper();
  }
  disconnectedCallback() {
    this.destroyPopper();
  }
  render() {
    var _a, _b;
    const date = dateFromRange(this.range ? this.startAsDate : this.valueAsDate, this.minAsDate, this.maxAsDate);
    const endDate = this.range
      ? dateFromRange(this.endAsDate, this.minAsDate, this.maxAsDate)
      : null;
    const formattedEndDate = endDate ? endDate.toLocaleDateString(this.locale) : "";
    const formattedDate = date ? date.toLocaleDateString(this.locale) : "";
    const dir = getElementDir(this.el);
    return (h(Host, { onBlur: this.deactivate, onKeyUp: this.keyUpHandler, role: "application" }, this.localeData && (h("div", { "aria-expanded": this.active.toString(), class: "input-container", dir: dir, role: "application" },
      h("div", { class: "input-wrapper", ref: this.setStartWrapper },
        h("calcite-input", { class: `input ${this.layout === "vertical" && this.range ? `no-bottom-border` : ``}`, icon: "calendar", "number-button-type": "none", onCalciteInputBlur: this.inputBlur, onCalciteInputFocus: this.startInputFocus, onCalciteInputInput: this.inputInput, placeholder: (_a = this.localeData) === null || _a === void 0 ? void 0 : _a.placeholder, scale: this.scale, type: "text", value: formattedDate })),
      h("div", { "aria-hidden": (!this.active).toString(), class: "menu-container", ref: this.setMenuEl },
        h("div", { class: {
            ["calendar-picker-wrapper"]: true,
            ["calendar-picker-wrapper--end"]: this.focusedInput === "end",
            [PopperCSS.animation]: true,
            [PopperCSS.animationActive]: this.active
          }, onTransitionEnd: this.transitionEnd },
          h("calcite-date-picker", { activeRange: this.focusedInput, endAsDate: this.endAsDate, headingLevel: this.headingLevel, intlNextMonth: this.intlNextMonth, intlPrevMonth: this.intlPrevMonth, locale: this.locale, max: this.max, maxAsDate: this.maxAsDate, min: this.min, minAsDate: this.minAsDate, onCalciteDatePickerChange: this.handleDateChange, onCalciteDatePickerRangeChange: this.handleDateRangeChange, proximitySelectionDisabled: this.proximitySelectionDisabled, range: this.range, scale: this.scale, startAsDate: this.startAsDate, tabIndex: 0, valueAsDate: this.valueAsDate }))),
      this.range && this.layout === "horizontal" && (h("div", { class: "horizontal-arrow-container" },
        h("calcite-icon", { flipRtl: true, icon: "arrow-right", scale: "s" }))),
      this.range && this.layout === "vertical" && this.scale !== "s" && (h("div", { class: "vertical-arrow-container" },
        h("calcite-icon", { icon: "arrow-down", scale: "s" }))),
      this.range && (h("div", { class: "input-wrapper", ref: this.setEndWrapper },
        h("calcite-input", { class: {
            input: true,
            "border-t-color-1": this.layout === "vertical" && this.range
          }, icon: "calendar", "number-button-type": "none", onCalciteInputBlur: this.inputBlur, onCalciteInputFocus: this.endInputFocus, onCalciteInputInput: this.inputInput, placeholder: (_b = this.localeData) === null || _b === void 0 ? void 0 : _b.placeholder, ref: this.setEndInput, scale: this.scale, type: "text", value: formattedEndDate })))))));
  }
  setReferenceEl() {
    const { focusedInput, layout, endWrapper, startWrapper } = this;
    this.referenceEl =
      focusedInput === "end" || layout === "vertical"
        ? endWrapper || startWrapper
        : startWrapper || endWrapper;
    this.createPopper();
  }
  getModifiers() {
    const flipModifier = {
      name: "flip",
      enabled: true
    };
    flipModifier.options = {
      fallbackPlacements: ["top-start", "top", "top-end", "bottom-start", "bottom", "bottom-end"]
    };
    return [flipModifier];
  }
  createPopper() {
    this.destroyPopper();
    const { menuEl, referenceEl, overlayPositioning } = this;
    if (!menuEl || !referenceEl) {
      return;
    }
    const modifiers = this.getModifiers();
    this.popper = createPopper({
      el: menuEl,
      modifiers,
      overlayPositioning,
      placement: DEFAULT_PLACEMENT,
      referenceEl
    });
  }
  destroyPopper() {
    const { popper } = this;
    if (popper) {
      popper.destroy();
    }
    this.popper = null;
  }
  valueWatcher(value) {
    this.valueAsDate = dateFromISO(value);
  }
  startWatcher(start) {
    this.setStartAsDate(dateFromISO(start));
  }
  endWatcher(end) {
    this.setEndAsDate(dateFromISO(end));
  }
  async loadLocaleData() {
    const { locale } = this;
    this.localeData = await getLocaleData(locale);
  }
  /**
   * Update date instance of start if valid
   */
  setStartAsDate(startDate) {
    this.startAsDate = startDate;
  }
  /**
   * Update date instance of end if valid
   */
  setEndAsDate(endDate) {
    this.endAsDate = endDate;
  }
  /**
   * If inputted string is a valid date, update value/active
   */
  input(value) {
    const date = this.getDateFromInput(value);
    if (date) {
      if (!this.range) {
        this.valueAsDate = date;
      }
      else {
        let changed = false;
        if (this.focusedInput === "start") {
          changed = !this.startAsDate || !sameDate(date, this.startAsDate);
          if (changed) {
            this.startAsDate = date;
          }
        }
        else if (this.focusedInput === "end") {
          changed = !this.endAsDate || !sameDate(date, this.endAsDate);
          if (changed) {
            this.endAsDate = date;
          }
        }
      }
    }
  }
  /**
   * Clean up invalid date from input on blur
   */
  blur(target) {
    const { locale, focusedInput, endAsDate, range, startAsDate, valueAsDate } = this;
    const date = this.getDateFromInput(target.value);
    if (!date) {
      if (!range && valueAsDate) {
        target.value = valueAsDate.toLocaleDateString(locale);
      }
      else if (focusedInput === "start" && startAsDate) {
        target.value = startAsDate.toLocaleDateString(locale);
      }
      else if (focusedInput === "end" && endAsDate) {
        target.value = endAsDate.toLocaleDateString(locale);
      }
    }
  }
  /**
   * Find a date from input string
   * return false if date is invalid, or out of range
   */
  getDateFromInput(value) {
    if (!this.localeData) {
      return false;
    }
    const { separator } = this.localeData;
    const { day, month, year } = parseDateString(value, this.localeData);
    const validDay = day > 0;
    const validMonth = month > -1;
    const date = new Date(year, month, day);
    date.setFullYear(year);
    const validDate = !isNaN(date.getTime());
    const validLength = value.split(separator).filter((c) => c).length > 2;
    const validYear = year.toString().length > 0;
    if (validDay &&
      validMonth &&
      validDate &&
      validLength &&
      validYear &&
      inRange(date, this.min, this.max)) {
      return date;
    }
    return false;
  }
  static get is() { return "calcite-input-date-picker"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["calcite-input-date-picker.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["calcite-input-date-picker.css"]
  }; }
  static get properties() { return {
    "value": {
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
        "text": "Selected date"
      },
      "attribute": "value",
      "reflect": false
    },
    "headingLevel": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "HeadingLevel",
        "resolved": "1 | 2 | 3 | 4 | 5 | 6",
        "references": {
          "HeadingLevel": {
            "location": "import",
            "path": "../functional/CalciteHeading"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Number at which section headings should start for this component."
      },
      "attribute": "heading-level",
      "reflect": false
    },
    "valueAsDate": {
      "type": "unknown",
      "mutable": true,
      "complexType": {
        "original": "Date",
        "resolved": "Date",
        "references": {
          "Date": {
            "location": "global"
          }
        }
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "Selected date as full date object"
      }
    },
    "startAsDate": {
      "type": "unknown",
      "mutable": true,
      "complexType": {
        "original": "Date",
        "resolved": "Date",
        "references": {
          "Date": {
            "location": "global"
          }
        }
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "Selected start date as full date object"
      }
    },
    "endAsDate": {
      "type": "unknown",
      "mutable": true,
      "complexType": {
        "original": "Date",
        "resolved": "Date",
        "references": {
          "Date": {
            "location": "global"
          }
        }
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "Selected end date as full date object"
      }
    },
    "minAsDate": {
      "type": "unknown",
      "mutable": true,
      "complexType": {
        "original": "Date",
        "resolved": "Date",
        "references": {
          "Date": {
            "location": "global"
          }
        }
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "Earliest allowed date as full date object"
      }
    },
    "maxAsDate": {
      "type": "unknown",
      "mutable": true,
      "complexType": {
        "original": "Date",
        "resolved": "Date",
        "references": {
          "Date": {
            "location": "global"
          }
        }
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "Latest allowed date as full date object"
      }
    },
    "min": {
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
        "text": "Earliest allowed date (\"yyyy-mm-dd\")"
      },
      "attribute": "min",
      "reflect": false
    },
    "max": {
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
        "text": "Latest allowed date (\"yyyy-mm-dd\")"
      },
      "attribute": "max",
      "reflect": false
    },
    "active": {
      "type": "boolean",
      "mutable": true,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Expand or collapse when calendar does not have input"
      },
      "attribute": "active",
      "reflect": true,
      "defaultValue": "false"
    },
    "intlPrevMonth": {
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
            "text": "\"previous month\"",
            "name": "default"
          }],
        "text": "Localized string for \"previous month\" (used for aria label)"
      },
      "attribute": "intl-prev-month",
      "reflect": false,
      "defaultValue": "TEXT.prevMonth"
    },
    "intlNextMonth": {
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
            "text": "\"next month\"",
            "name": "default"
          }],
        "text": "Localized string for \"next month\" (used for aria label)"
      },
      "attribute": "intl-next-month",
      "reflect": false,
      "defaultValue": "TEXT.nextMonth"
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
    "scale": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "\"s\" | \"m\" | \"l\"",
        "resolved": "\"l\" | \"m\" | \"s\"",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "specify the scale of the date picker"
      },
      "attribute": "scale",
      "reflect": true,
      "defaultValue": "\"m\""
    },
    "range": {
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
        "text": "Range mode activation"
      },
      "attribute": "range",
      "reflect": true,
      "defaultValue": "false"
    },
    "start": {
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
        "text": "Selected start date"
      },
      "attribute": "start",
      "reflect": false
    },
    "end": {
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
        "text": "Selected end date"
      },
      "attribute": "end",
      "reflect": false
    },
    "overlayPositioning": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "OverlayPositioning",
        "resolved": "\"absolute\" | \"fixed\"",
        "references": {
          "OverlayPositioning": {
            "location": "import",
            "path": "../../utils/popper"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Describes the type of positioning to use for the overlaid content. If your element is in a fixed container, use the 'fixed' value."
      },
      "attribute": "overlay-positioning",
      "reflect": false,
      "defaultValue": "\"absolute\""
    },
    "proximitySelectionDisabled": {
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
        "text": "Disables the default behaviour on the third click of narrowing or extending the range and instead starts a new range."
      },
      "attribute": "proximity-selection-disabled",
      "reflect": false,
      "defaultValue": "false"
    },
    "layout": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "\"horizontal\" | \"vertical\"",
        "resolved": "\"horizontal\" | \"vertical\"",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Layout"
      },
      "attribute": "layout",
      "reflect": true,
      "defaultValue": "\"horizontal\""
    }
  }; }
  static get states() { return {
    "focusedInput": {},
    "localeData": {}
  }; }
  static get events() { return [{
      "method": "calciteDatePickerChange",
      "name": "calciteDatePickerChange",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Trigger calcite date change when a user changes the date."
      },
      "complexType": {
        "original": "Date",
        "resolved": "Date",
        "references": {
          "Date": {
            "location": "global"
          }
        }
      }
    }, {
      "method": "calciteDatePickerRangeChange",
      "name": "calciteDatePickerRangeChange",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [{
            "text": " [DateRangeChange](https://github.com/Esri/calcite-components/blob/master/src/components/calcite-date-picker/interfaces.ts#L1)",
            "name": "see"
          }],
        "text": "Trigger calcite date change when a user changes the date range."
      },
      "complexType": {
        "original": "DateRangeChange",
        "resolved": "DateRangeChange",
        "references": {
          "DateRangeChange": {
            "location": "import",
            "path": "../calcite-date-picker/interfaces"
          }
        }
      }
    }, {
      "method": "calciteInputDatePickerOpen",
      "name": "calciteInputDatePickerOpen",
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
      "method": "calciteInputDatePickerClose",
      "name": "calciteInputDatePickerClose",
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
    }]; }
  static get methods() { return {
    "reposition": {
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
      "propName": "active",
      "methodName": "activeHandler"
    }, {
      "propName": "layout",
      "methodName": "setReferenceEl"
    }, {
      "propName": "focusedInput",
      "methodName": "setReferenceEl"
    }, {
      "propName": "value",
      "methodName": "valueWatcher"
    }, {
      "propName": "start",
      "methodName": "startWatcher"
    }, {
      "propName": "end",
      "methodName": "endWatcher"
    }, {
      "propName": "locale",
      "methodName": "loadLocaleData"
    }]; }
  static get listeners() { return [{
      "name": "calciteDaySelect",
      "method": "calciteDaySelectHandler",
      "target": undefined,
      "capture": false,
      "passive": false
    }]; }
}
