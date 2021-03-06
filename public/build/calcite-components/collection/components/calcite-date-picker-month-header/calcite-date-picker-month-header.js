import { Component, Element, Prop, Event, h, State, Watch, Fragment } from "@stencil/core";
import { getElementDir } from "../../utils/dom";
import { dateFromRange, nextMonth, prevMonth, localizeNumber, parseNumber, getOrder } from "../../utils/date";
import { getKey } from "../../utils/key";
import { CalciteHeading } from "../functional/CalciteHeading";
export class CalciteDatePickerMonthHeader {
  constructor() {
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    /**
     * Increment year on UP/DOWN keys
     */
    this.onYearKey = (e) => {
      const year = e.target.value;
      switch (getKey(e.key)) {
        case "ArrowDown":
          e.preventDefault();
          this.setYear(year, -1);
          break;
        case "ArrowUp":
          e.preventDefault();
          this.setYear(year, 1);
          break;
      }
    };
    this.yearChanged = (event) => {
      this.setYear(event.target.value);
    };
    this.prevMonthClick = (e) => {
      this.handleArrowClick(e, this.prevMonthDate);
    };
    this.prevMonthKeydown = (e) => {
      const key = getKey(e.key);
      if (key === " " || key === "Enter") {
        this.prevMonthClick(e);
      }
    };
    this.nextMonthClick = (e) => {
      this.handleArrowClick(e, this.nextMonthDate);
    };
    this.nextMonthKeydown = (e) => {
      const key = getKey(e.key);
      if (key === " " || key === "Enter") {
        this.nextMonthClick(e);
      }
    };
    /*
     * Update active month on clicks of left/right arrows
     */
    this.handleArrowClick = (e, date) => {
      e === null || e === void 0 ? void 0 : e.preventDefault();
      e.stopPropagation();
      this.calciteDatePickerSelect.emit(date);
    };
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    this.setNextPrevMonthDates();
  }
  render() {
    const dir = getElementDir(this.el);
    return (h("div", { class: "header", dir: dir }, this.renderContent(dir)));
  }
  renderContent(dir) {
    var _a;
    if (!this.activeDate || !this.localeData) {
      return null;
    }
    const activeMonth = this.activeDate.getMonth();
    const { months, unitOrder } = this.localeData;
    const localizedMonth = (months.wide || months.narrow || months.abbreviated)[activeMonth];
    const localizedYear = localizeNumber(this.activeDate.getFullYear(), this.localeData);
    const iconScale = this.scale === "l" ? "m" : "s";
    const order = getOrder(unitOrder);
    const reverse = order.indexOf("y") < order.indexOf("m");
    const suffix = (_a = this.localeData.year) === null || _a === void 0 ? void 0 : _a.suffix;
    return (h(Fragment, null,
      h("a", { "aria-disabled": (this.prevMonthDate.getMonth() === activeMonth).toString(), "aria-label": this.intlPrevMonth, class: "chevron", href: "#", onClick: this.prevMonthClick, onKeyDown: this.prevMonthKeydown, role: "button", tabindex: this.prevMonthDate.getMonth() === activeMonth ? -1 : 0 },
        h("calcite-icon", { dir: dir, "flip-rtl": true, icon: "chevron-left", scale: iconScale })),
      h("div", { class: { text: true, "text--reverse": reverse } },
        h(CalciteHeading, { class: "month", level: this.headingLevel }, localizedMonth),
        h("span", { class: "year-wrap" },
          h("input", { class: {
              year: true,
              "year--suffix": !!suffix
            }, inputmode: "numeric", maxlength: "4", minlength: "1", onChange: this.yearChanged, onKeyDown: this.onYearKey, pattern: "\\d*", ref: (el) => (this.yearInput = el), type: "text", value: localizedYear }),
          suffix && (h("span", { class: "suffix" },
            h("span", { "aria-hidden": "true", class: "suffix__invisible" }, localizedYear),
            " " + suffix)))),
      h("a", { "aria-disabled": (this.nextMonthDate.getMonth() === activeMonth).toString(), "aria-label": this.intlNextMonth, class: "chevron", href: "#", onClick: this.nextMonthClick, onKeyDown: this.nextMonthKeydown, role: "button", tabindex: this.nextMonthDate.getMonth() === activeMonth ? -1 : 0 },
        h("calcite-icon", { dir: dir, "flip-rtl": true, icon: "chevron-right", scale: iconScale }))));
  }
  setNextPrevMonthDates() {
    if (!this.activeDate) {
      return;
    }
    this.nextMonthDate = dateFromRange(nextMonth(this.activeDate), this.min, this.max);
    this.prevMonthDate = dateFromRange(prevMonth(this.activeDate), this.min, this.max);
  }
  /**
   * Parse localized year string from input,
   * set to active if in range
   */
  setYear(localizedYear, increment = 0) {
    const { min, max, activeDate, localeData, yearInput } = this;
    const parsedYear = parseNumber(localizedYear, localeData);
    const length = parsedYear.toString().length;
    const year = isNaN(parsedYear) ? false : parsedYear + increment;
    const inRange = year && (!min || min.getFullYear() <= year) && (!max || max.getFullYear() >= year);
    // if you've supplied a year and it's in range, update active date
    if (year && inRange && length === localizedYear.length) {
      const nextDate = new Date(activeDate);
      nextDate.setFullYear(year);
      const inRangeDate = dateFromRange(nextDate, min, max);
      this.calciteDatePickerSelect.emit(inRangeDate);
      yearInput.value = localizeNumber(inRangeDate.getFullYear(), localeData);
    }
    else {
      // leave the current active date and clean up garbage input
      yearInput.value = localizeNumber(activeDate.getFullYear(), localeData);
    }
  }
  static get is() { return "calcite-date-picker-month-header"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["calcite-date-picker-month-header.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["calcite-date-picker-month-header.css"]
  }; }
  static get properties() { return {
    "selectedDate": {
      "type": "unknown",
      "mutable": false,
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
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Already selected date."
      }
    },
    "activeDate": {
      "type": "unknown",
      "mutable": false,
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
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Focused date with indicator (will become selected date if user proceeds)"
      }
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
    "min": {
      "type": "unknown",
      "mutable": false,
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
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Minimum date of the calendar below which is disabled."
      }
    },
    "max": {
      "type": "unknown",
      "mutable": false,
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
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Maximum date of the calendar above which is disabled."
      }
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
      "optional": false,
      "docs": {
        "tags": [],
        "text": "User's language and region as BCP 47 formatted string."
      },
      "attribute": "locale",
      "reflect": false
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
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Localized string for previous month."
      },
      "attribute": "intl-prev-month",
      "reflect": false
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
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Localized string for next month."
      },
      "attribute": "intl-next-month",
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
        "text": "specify the scale of the date picker"
      },
      "attribute": "scale",
      "reflect": true
    },
    "localeData": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "DateLocaleData",
        "resolved": "DateLocaleData",
        "references": {
          "DateLocaleData": {
            "location": "import",
            "path": "../calcite-date-picker/utils"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "CLDR locale data for translated calendar info"
      }
    }
  }; }
  static get states() { return {
    "nextMonthDate": {},
    "prevMonthDate": {}
  }; }
  static get events() { return [{
      "method": "calciteDatePickerSelect",
      "name": "calciteDatePickerSelect",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Changes to active date"
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
    }]; }
  static get elementRef() { return "el"; }
  static get watchers() { return [{
      "propName": "min",
      "methodName": "setNextPrevMonthDates"
    }, {
      "propName": "max",
      "methodName": "setNextPrevMonthDates"
    }, {
      "propName": "activeDate",
      "methodName": "setNextPrevMonthDates"
    }]; }
}
