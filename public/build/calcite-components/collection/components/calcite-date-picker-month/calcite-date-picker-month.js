import { Component, Element, Prop, Host, Event, h, Listen } from "@stencil/core";
import { inRange, sameDate, dateFromRange } from "../../utils/date";
import { getKey } from "../../utils/key";
import { getElementDir } from "../../utils/dom";
export class CalciteDatePickerMonth {
  constructor() {
    /** Date currently active.*/
    this.activeDate = new Date();
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    this.keyDownHandler = (e) => {
      const isRTL = this.el.dir === "rtl";
      switch (getKey(e.key)) {
        case "ArrowUp":
          e.preventDefault();
          this.addDays(-7);
          break;
        case "ArrowRight":
          e.preventDefault();
          this.addDays(isRTL ? -1 : 1);
          break;
        case "ArrowDown":
          e.preventDefault();
          this.addDays(7);
          break;
        case "ArrowLeft":
          e.preventDefault();
          this.addDays(isRTL ? 1 : -1);
          break;
        case "PageUp":
          e.preventDefault();
          this.addMonths(-1);
          break;
        case "PageDown":
          e.preventDefault();
          this.addMonths(1);
          break;
        case "Home":
          e.preventDefault();
          this.activeDate.setDate(1);
          this.addDays();
          break;
        case "End":
          e.preventDefault();
          this.activeDate.setDate(new Date(this.activeDate.getFullYear(), this.activeDate.getMonth() + 1, 0).getDate());
          this.addDays();
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          break;
        case "Tab":
          this.activeFocus = false;
      }
    };
    /**
     * Once user is not interacting via keyboard,
     * disable auto focusing of active date
     */
    this.disableActiveFocus = () => {
      this.activeFocus = false;
    };
    this.dayHover = (e) => {
      const target = e.target;
      if (e.detail.disabled) {
        this.calciteDatePickerMouseOut.emit();
      }
      else {
        this.calciteDatePickerHover.emit(target.value);
      }
    };
    this.daySelect = (e) => {
      const target = e.target;
      this.calciteDatePickerSelect.emit(target.value);
    };
  }
  mouseoutHandler() {
    this.calciteDatePickerMouseOut.emit();
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  render() {
    const month = this.activeDate.getMonth();
    const year = this.activeDate.getFullYear();
    const startOfWeek = this.localeData.weekStart % 7;
    const { abbreviated, short, narrow } = this.localeData.days;
    const weekDays = this.scale === "s" ? narrow || short || abbreviated : short || abbreviated || narrow;
    const adjustedWeekDays = [...weekDays.slice(startOfWeek, 7), ...weekDays.slice(0, startOfWeek)];
    const curMonDays = this.getCurrentMonthDays(month, year);
    const prevMonDays = this.getPrevMonthdays(month, year, startOfWeek);
    const nextMonDays = this.getNextMonthDays(month, year, startOfWeek);
    const dir = getElementDir(this.el);
    const days = [
      ...prevMonDays.map((day) => {
        const date = new Date(year, month - 1, day);
        return this.renderDateDay(false, day, dir, date);
      }),
      ...curMonDays.map((day) => {
        const date = new Date(year, month, day);
        const active = sameDate(date, this.activeDate);
        return this.renderDateDay(active, day, dir, date, true, true);
      }),
      ...nextMonDays.map((day) => {
        const date = new Date(year, month + 1, day);
        return this.renderDateDay(false, day, dir, date);
      })
    ];
    const weeks = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }
    return (h(Host, { onFocusOut: this.disableActiveFocus, onKeyDown: this.keyDownHandler },
      h("div", { class: "calender", role: "grid" },
        h("div", { class: "week-headers", role: "row" }, adjustedWeekDays.map((weekday) => (h("span", { class: "week-header", role: "columnheader" }, weekday)))),
        weeks.map((days) => (h("div", { class: "week-days", role: "row" }, days))))));
  }
  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  /**
   * Add n months to the current month
   */
  addMonths(step) {
    const nextDate = new Date(this.activeDate);
    nextDate.setMonth(this.activeDate.getMonth() + step);
    this.calciteDatePickerActiveDateChange.emit(dateFromRange(nextDate, this.min, this.max));
    this.activeFocus = true;
  }
  /**
   * Add n days to the current date
   */
  addDays(step = 0) {
    const nextDate = new Date(this.activeDate);
    nextDate.setDate(this.activeDate.getDate() + step);
    this.calciteDatePickerActiveDateChange.emit(dateFromRange(nextDate, this.min, this.max));
    this.activeFocus = true;
  }
  /**
   * Get dates for last days of the previous month
   */
  getPrevMonthdays(month, year, startOfWeek) {
    const lastDate = new Date(year, month, 0);
    const date = lastDate.getDate();
    const day = lastDate.getDay();
    const days = [];
    if (day - 6 === startOfWeek) {
      return days;
    }
    for (let i = lastDate.getDay(); i >= startOfWeek; i--) {
      days.push(date - i);
    }
    return days;
  }
  /**
   * Get dates for the current month
   */
  getCurrentMonthDays(month, year) {
    const num = new Date(year, month + 1, 0).getDate();
    const days = [];
    for (let i = 0; i < num; i++) {
      days.push(i + 1);
    }
    return days;
  }
  /**
   * Get dates for first days of the next month
   */
  getNextMonthDays(month, year, startOfWeek) {
    const endDay = new Date(year, month + 1, 0).getDay();
    const days = [];
    if (endDay === (startOfWeek + 6) % 7) {
      return days;
    }
    for (let i = 0; i < (6 - (endDay - startOfWeek)) % 7; i++) {
      days.push(i + 1);
    }
    return days;
  }
  /**
   * Determine if the date is in between the start and end dates
   */
  betweenSelectedRange(date) {
    return (this.startDate &&
      this.endDate &&
      date > this.startDate &&
      date < this.endDate &&
      !this.isRangeHover(date));
  }
  /**
   * Determine if the date should be in selected state
   */
  isSelected(date) {
    return (sameDate(date, this.selectedDate) ||
      (this.startDate && sameDate(date, this.startDate)) ||
      (this.endDate && sameDate(date, this.endDate)));
  }
  /**
   * Determine if the date is the start of the date range
   */
  isStartOfRange(date) {
    return (!!this.startDate &&
      !sameDate(this.startDate, this.endDate) &&
      sameDate(this.startDate, date) &&
      !this.isEndOfRange(date));
  }
  isEndOfRange(date) {
    return ((!!this.endDate && !sameDate(this.startDate, this.endDate) && sameDate(this.endDate, date)) ||
      (!this.endDate &&
        this.hoverRange &&
        sameDate(this.startDate, this.hoverRange.end) &&
        sameDate(date, this.hoverRange.end)));
  }
  /**
   * Render calcite-date-picker-day
   */
  renderDateDay(active, day, dir, date, currentMonth, ref) {
    var _a;
    const isFocusedOnStart = this.isFocusedOnStart();
    const isHoverInRange = this.isHoverInRange() ||
      (!this.endDate && this.hoverRange && sameDate((_a = this.hoverRange) === null || _a === void 0 ? void 0 : _a.end, this.startDate));
    return (h("calcite-date-picker-day", { active: active, class: {
        "hover--inside-range": this.startDate && isHoverInRange,
        "hover--outside-range": this.startDate && !isHoverInRange,
        "focused--start": isFocusedOnStart,
        "focused--end": !isFocusedOnStart
      }, currentMonth: currentMonth, day: day, dir: dir, disabled: !inRange(date, this.min, this.max), endOfRange: this.isEndOfRange(date), highlighted: this.betweenSelectedRange(date), key: date.toDateString(), localeData: this.localeData, onCalciteDayHover: this.dayHover, onCalciteDaySelect: this.daySelect, range: !!this.startDate && !!this.endDate && !sameDate(this.startDate, this.endDate), rangeHover: this.isRangeHover(date), ref: (el) => {
        // when moving via keyboard, focus must be updated on active date
        if (ref && active && this.activeFocus) {
          el === null || el === void 0 ? void 0 : el.focus();
        }
      }, scale: this.scale, selected: this.isSelected(date), startOfRange: this.isStartOfRange(date), value: date }));
  }
  isFocusedOnStart() {
    var _a;
    return ((_a = this.hoverRange) === null || _a === void 0 ? void 0 : _a.focused) === "start";
  }
  isHoverInRange() {
    if (!this.hoverRange) {
      return;
    }
    const { start, end } = this.hoverRange;
    return ((!this.isFocusedOnStart() && !!this.startDate && (!this.endDate || end < this.endDate)) ||
      (this.isFocusedOnStart() && !!this.startDate && start > this.startDate));
  }
  isRangeHover(date) {
    if (!this.hoverRange) {
      return false;
    }
    const { start, end } = this.hoverRange;
    const isStart = this.isFocusedOnStart();
    const insideRange = this.isHoverInRange();
    const cond1 = insideRange &&
      ((!isStart && date > this.startDate && (date < end || sameDate(date, end))) ||
        (isStart && date < this.endDate && (date > start || sameDate(date, start))));
    const cond2 = !insideRange &&
      ((!isStart && date >= this.endDate && (date < end || sameDate(date, end))) ||
        (isStart &&
          (date < this.startDate || (this.endDate && sameDate(date, this.startDate))) &&
          (date > start || sameDate(date, start))));
    return cond1 || cond2;
  }
  static get is() { return "calcite-date-picker-month"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["calcite-date-picker-month.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["calcite-date-picker-month.css"]
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
        "text": "Date currently active."
      },
      "defaultValue": "new Date()"
    },
    "startDate": {
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
      "optional": true,
      "docs": {
        "tags": [],
        "text": "Start date currently active."
      }
    },
    "endDate": {
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
      "optional": true,
      "docs": {
        "tags": [],
        "text": "End date currently active"
      }
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
        "tags": [{
            "text": undefined,
            "name": "internal"
          }],
        "text": "CLDR locale data for current locale"
      }
    },
    "hoverRange": {
      "type": "any",
      "mutable": false,
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "hover-range",
      "reflect": false
    }
  }; }
  static get events() { return [{
      "method": "calciteDatePickerSelect",
      "name": "calciteDatePickerSelect",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Event emitted when user selects the date."
      },
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      }
    }, {
      "method": "calciteDatePickerHover",
      "name": "calciteDatePickerHover",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [{
            "text": undefined,
            "name": "internal"
          }],
        "text": "Event emitted when user hovers the date."
      },
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      }
    }, {
      "method": "calciteDatePickerActiveDateChange",
      "name": "calciteDatePickerActiveDateChange",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Active date for the user keyboard access."
      },
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      }
    }, {
      "method": "calciteDatePickerMouseOut",
      "name": "calciteDatePickerMouseOut",
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
  static get elementRef() { return "el"; }
  static get listeners() { return [{
      "name": "mouseout",
      "method": "mouseoutHandler",
      "target": undefined,
      "capture": false,
      "passive": true
    }]; }
}
