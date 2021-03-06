import { r as registerInstance, c as createEvent, h, H as Host, g as getElement, F as Fragment } from './index-b3673963.js';
import { T as TEXT, b as getDaysDiff, c as dateToISO, d as dateFromISO, a as dateFromRange, g as getLocaleData, s as sameDate, i as inRange, l as localizeNumber, e as getOrder, n as nextMonth, f as prevMonth, h as parseNumber } from './calcite-date-picker-resources-c39d40b0.js';
import { g as getElementDir, C as CSS_UTILITY } from './dom-7b4de04f.js';
import { g as getKey } from './key-ec82f942.js';
import { C as CalciteHeading } from './CalciteHeading-d888a521.js';
import './locale-8436bbe1.js';
import './number-358ca1d4.js';
import './guid-09142681.js';

const HEADING_LEVEL = 2;

const calciteDatePickerCss = "@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:inline-block;vertical-align:top;width:100%;position:relative;overflow:visible;border-radius:0;border-width:1px;border-style:solid;border-color:var(--calcite-ui-border-2);background-color:var(--calcite-ui-foreground-1)}:host([scale=s]){max-width:216px}:host([scale=m]){max-width:286px}:host([scale=l]){max-width:398px}";

const CalciteDatePicker = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteDatePickerChange = createEvent(this, "calciteDatePickerChange", 7);
    this.calciteDatePickerRangeChange = createEvent(this, "calciteDatePickerRangeChange", 7);
    //--------------------------------------------------------------------------
    //
    //  Public Properties
    //
    //--------------------------------------------------------------------------
    /** Active range */
    this.activeRange = "start";
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
    /** Disables the default behaviour on the third click of narrowing or extending the range and instead starts a new range. */
    this.proximitySelectionDisabled = false;
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    this.keyUpHandler = (e) => {
      if (getKey(e.key) === "Escape") {
        this.reset();
      }
    };
    this.monthHeaderSelectChange = (e) => {
      const date = new Date(e.detail);
      if (!this.range) {
        this.activeDate = date;
      }
      else {
        if (this.activeRange === "start") {
          this.activeStartDate = date;
        }
        else if (this.activeRange === "end") {
          this.activeEndDate = date;
        }
        this.mostRecentRangeValue = date;
      }
    };
    this.monthActiveDateChange = (e) => {
      const date = new Date(e.detail);
      if (!this.range) {
        this.activeDate = date;
      }
      else {
        if (this.activeRange === "start") {
          this.activeStartDate = date;
        }
        else if (this.activeRange === "end") {
          this.activeEndDate = date;
        }
        this.mostRecentRangeValue = date;
      }
    };
    this.monthHoverChange = (e) => {
      if (!this.startAsDate) {
        this.hoverRange = undefined;
        return this.hoverRange;
      }
      const date = new Date(e.detail);
      this.hoverRange = {
        focused: this.activeRange,
        start: this.startAsDate,
        end: this.endAsDate
      };
      if (!this.proximitySelectionDisabled) {
        if (this.endAsDate) {
          const startDiff = getDaysDiff(date, this.startAsDate);
          const endDiff = getDaysDiff(date, this.endAsDate);
          if (startDiff < endDiff) {
            this.hoverRange.start = date;
            this.hoverRange.focused = "start";
          }
          else {
            this.hoverRange.end = date;
            this.hoverRange.focused = "end";
          }
        }
        else {
          if (date < this.startAsDate) {
            this.hoverRange = {
              focused: "start",
              start: date,
              end: this.startAsDate
            };
          }
          else {
            this.hoverRange.end = date;
            this.hoverRange.focused = "end";
          }
        }
      }
      else {
        if (!this.endAsDate) {
          if (date < this.startAsDate) {
            this.hoverRange = {
              focused: "start",
              start: date,
              end: this.startAsDate
            };
          }
          else {
            this.hoverRange.end = date;
            this.hoverRange.focused = "end";
          }
        }
        else {
          this.hoverRange = undefined;
        }
      }
    };
    this.monthMouseOutChange = () => {
      if (this.hoverRange) {
        this.hoverRange = undefined;
      }
    };
    /**
     * Reset active date and close
     */
    this.reset = () => {
      var _a, _b, _c, _d, _e, _f;
      if (this.valueAsDate && ((_a = this.valueAsDate) === null || _a === void 0 ? void 0 : _a.getTime()) !== ((_b = this.activeDate) === null || _b === void 0 ? void 0 : _b.getTime())) {
        this.activeDate = new Date(this.valueAsDate);
      }
      if (this.startAsDate && ((_c = this.startAsDate) === null || _c === void 0 ? void 0 : _c.getTime()) !== ((_d = this.activeStartDate) === null || _d === void 0 ? void 0 : _d.getTime())) {
        this.activeStartDate = new Date(this.startAsDate);
      }
      if (this.endAsDate && ((_e = this.endAsDate) === null || _e === void 0 ? void 0 : _e.getTime()) !== ((_f = this.activeEndDate) === null || _f === void 0 ? void 0 : _f.getTime())) {
        this.activeEndDate = new Date(this.endAsDate);
      }
    };
    /**
     * Event handler for when the selected date changes
     */
    this.monthDateChange = (e) => {
      const date = new Date(e.detail);
      if (!this.range) {
        this.value = dateToISO(date);
        this.activeDate = date;
        return;
      }
      if (!this.startAsDate || (!this.endAsDate && date < this.startAsDate)) {
        if (this.startAsDate) {
          const newEndDate = new Date(this.startAsDate);
          this.end = dateToISO(newEndDate);
          this.setEndAsDate(newEndDate, true);
          this.activeEndDate = newEndDate;
        }
        this.start = dateToISO(date);
        this.setStartAsDate(date, true);
        this.activeStartDate = date;
      }
      else if (!this.endAsDate) {
        this.end = dateToISO(date);
        this.setEndAsDate(date, true);
        this.activeEndDate = date;
      }
      else {
        if (!this.proximitySelectionDisabled) {
          const startDiff = getDaysDiff(date, this.startAsDate);
          const endDiff = getDaysDiff(date, this.endAsDate);
          if (startDiff < endDiff) {
            this.start = dateToISO(date);
            this.setStartAsDate(date, true);
            this.activeStartDate = date;
          }
          else {
            this.end = dateToISO(date);
            this.setEndAsDate(date, true);
            this.activeEndDate = date;
          }
        }
        else {
          this.start = dateToISO(date);
          this.setStartAsDate(date, true);
          this.activeStartDate = date;
          this.endAsDate = this.activeEndDate = this.end = undefined;
        }
      }
    };
  }
  handleValueAsDate(date) {
    this.activeDate = date;
    this.calciteDatePickerChange.emit(date);
  }
  handleRangeChange() {
    const { startAsDate: startDate, endAsDate: endDate } = this;
    this.activeEndDate = endDate;
    this.activeStartDate = startDate;
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
  }
  render() {
    var _a;
    const date = dateFromRange(this.range ? this.startAsDate : this.valueAsDate, this.minAsDate, this.maxAsDate);
    const activeStartDate = this.range
      ? this.getActiveStartDate(date, this.minAsDate, this.maxAsDate)
      : this.getActiveDate(date, this.minAsDate, this.maxAsDate);
    let activeDate = activeStartDate;
    const endDate = this.range
      ? dateFromRange(this.endAsDate, this.minAsDate, this.maxAsDate)
      : null;
    const activeEndDate = this.getActiveEndDate(endDate, this.minAsDate, this.maxAsDate);
    if ((this.activeRange === "end" ||
      (((_a = this.hoverRange) === null || _a === void 0 ? void 0 : _a.focused) === "end" && (!this.proximitySelectionDisabled || endDate))) &&
      activeEndDate) {
      activeDate = activeEndDate;
    }
    if (this.range && this.mostRecentRangeValue) {
      activeDate = this.mostRecentRangeValue;
    }
    const minDate = this.activeRange === "start" ? this.minAsDate : date || this.maxAsDate;
    const maxDate = this.maxAsDate;
    const dir = getElementDir(this.el);
    return (h(Host, { onBlur: this.reset, onKeyUp: this.keyUpHandler, role: "application" }, this.renderCalendar(activeDate, dir, maxDate, minDate, date, endDate)));
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
   * Render calcite-date-picker-month-header and calcite-date-picker-month
   */
  renderCalendar(activeDate, dir, maxDate, minDate, date, endDate) {
    return (this.localeData && [
      h("calcite-date-picker-month-header", { activeDate: activeDate, dir: dir, headingLevel: this.headingLevel || HEADING_LEVEL, intlNextMonth: this.intlNextMonth, intlPrevMonth: this.intlPrevMonth, localeData: this.localeData, max: maxDate, min: minDate, onCalciteDatePickerSelect: this.monthHeaderSelectChange, scale: this.scale, selectedDate: this.activeRange === "start" ? date : endDate || new Date() }),
      h("calcite-date-picker-month", { activeDate: activeDate, dir: dir, endDate: this.range ? endDate : undefined, hoverRange: this.hoverRange, localeData: this.localeData, max: maxDate, min: minDate, onCalciteDatePickerActiveDateChange: this.monthActiveDateChange, onCalciteDatePickerHover: this.monthHoverChange, onCalciteDatePickerMouseOut: this.monthMouseOutChange, onCalciteDatePickerSelect: this.monthDateChange, scale: this.scale, selectedDate: this.activeRange === "start" ? date : endDate, startDate: this.range ? date : undefined })
    ]);
  }
  /**
   * Update date instance of start if valid
   */
  setStartAsDate(startDate, emit) {
    this.startAsDate = startDate;
    this.mostRecentRangeValue = this.startAsDate;
    if (emit) {
      this.calciteDatePickerRangeChange.emit({
        startDate,
        endDate: this.endAsDate
      });
    }
  }
  /**
   * Update date instance of end if valid
   */
  setEndAsDate(endDate, emit) {
    this.endAsDate = endDate;
    this.mostRecentRangeValue = this.endAsDate;
    if (emit) {
      this.calciteDatePickerRangeChange.emit({
        startDate: this.startAsDate,
        endDate
      });
    }
  }
  /**
   * Get an active date using the value, or current date as default
   */
  getActiveDate(value, min, max) {
    return dateFromRange(this.activeDate, min, max) || value || dateFromRange(new Date(), min, max);
  }
  getActiveStartDate(value, min, max) {
    return (dateFromRange(this.activeStartDate, min, max) || value || dateFromRange(new Date(), min, max));
  }
  getActiveEndDate(value, min, max) {
    return (dateFromRange(this.activeEndDate, min, max) || value || dateFromRange(new Date(), min, max));
  }
  static get assetsDirs() { return ["assets"]; }
  get el() { return getElement(this); }
  static get watchers() { return {
    "valueAsDate": ["handleValueAsDate"],
    "startAsDate": ["handleRangeChange"],
    "endAsDate": ["handleRangeChange"],
    "value": ["valueWatcher"],
    "start": ["startWatcher"],
    "end": ["endWatcher"],
    "locale": ["loadLocaleData"]
  }; }
};
CalciteDatePicker.style = calciteDatePickerCss;

const calciteDatePickerDayCss = "@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;outline:2px solid transparent;outline-offset:2px;color:var(--calcite-ui-text-3);cursor:pointer;min-width:0;width:calc(100% / 7)}.day-v-wrapper{-ms-flex:1 1 auto;flex:1 1 auto}.day-wrapper{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:center;align-items:center}.day{display:-ms-flexbox;display:flex;border-radius:9999px;font-size:var(--calcite-font-size--2);line-height:1rem;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;line-height:1;color:var(--calcite-ui-text-3);-webkit-transition-property:all;transition-property:all;opacity:var(--calcite-ui-opacity-disabled);background:none;-webkit-box-shadow:0 0 0 2px transparent, 0 0 0 0px transparent;box-shadow:0 0 0 2px transparent, 0 0 0 0px transparent}.text{margin-top:1px;margin-right:0;margin-bottom:0;margin-left:1px}:host([scale=s]) .day-v-wrapper{padding-top:0.125rem;padding-bottom:0.125rem}:host([scale=s]) .day-wrapper{padding:0}:host([scale=s]) .day{height:27px;width:27px;font-size:var(--calcite-font-size--2)}:host([scale=m]) .day-v-wrapper{padding-top:0.25rem;padding-bottom:0.25rem}:host([scale=m]) .day-wrapper{padding-left:0.25rem;padding-right:0.25rem}:host([scale=m]) .day{height:33px;width:33px;font-size:var(--calcite-font-size--1)}:host([scale=l]) .day-v-wrapper{padding-top:0.25rem;padding-bottom:0.25rem}:host([scale=l]) .day-wrapper{padding-left:0.25rem;padding-right:0.25rem}:host([scale=l]) .day{height:43px;width:43px;font-size:var(--calcite-font-size-0)}:host([current-month]) .day{opacity:1}:host([disabled]){cursor:default;opacity:0.25}:host(:hover:not([disabled])) .day,:host([active]:not([range])) .day{background-color:var(--calcite-ui-foreground-2);color:var(--calcite-ui-text-1)}:host(:focus),:host([active]){z-index:1}:host(:focus:not([disabled])) .day{-webkit-box-shadow:0 0 0 2px var(--calcite-ui-foreground-1), 0 0 0 4px var(--calcite-ui-brand);box-shadow:0 0 0 2px var(--calcite-ui-foreground-1), 0 0 0 4px var(--calcite-ui-brand)}:host([selected]) .day{font-weight:var(--calcite-font-weight-medium);background-color:var(--calcite-ui-brand) !important;color:var(--calcite-ui-foreground-1) !important;z-index:1}:host([range][selected]) .day-wrapper{background-color:var(--calcite-ui-foreground-current)}:host([start-of-range]) :not(.calcite--rtl) .day-wrapper,:host([end-of-range]) .calcite--rtl .day-wrapper{border-top-left-radius:40%;border-bottom-left-radius:40%;-webkit-box-shadow:inset 4px 0 var(--calcite-ui-foreground-1);box-shadow:inset 4px 0 var(--calcite-ui-foreground-1)}:host([start-of-range]) :not(.calcite--rtl) .day,:host([end-of-range]) .calcite--rtl .day{opacity:1}:host([start-of-range]:not(:focus)) :not(.calcite--rtl) .day,:host([end-of-range]:not(:focus)) .calcite--rtl .day{-webkit-box-shadow:0 0 0 2px var(--calcite-ui-foreground-1);box-shadow:0 0 0 2px var(--calcite-ui-foreground-1)}:host([end-of-range]) :not(.calcite--rtl) .day-wrapper,:host([start-of-range]) .calcite--rtl .day-wrapper{border-top-right-radius:40%;border-bottom-right-radius:40%;-webkit-box-shadow:inset -4px 0 var(--calcite-ui-foreground-1);box-shadow:inset -4px 0 var(--calcite-ui-foreground-1)}:host([end-of-range]) :not(.calcite--rtl) .day,:host([start-of-range]) .calcite--rtl .day{opacity:1}:host([end-of-range]:not(:focus)) :not(.calcite--rtl) .day,:host([start-of-range]:not(:focus)) .calcite--rtl .day{-webkit-box-shadow:0 0 0 2px var(--calcite-ui-foreground-1);box-shadow:0 0 0 2px var(--calcite-ui-foreground-1)}:host([end-of-range][scale=l]) :not(.calcite--rtl) .day-wrapper,:host([start-of-range][scale=l]) .calcite--rtl .day-wrapper{-webkit-box-shadow:inset -8px 0 var(--calcite-ui-foreground-1);box-shadow:inset -8px 0 var(--calcite-ui-foreground-1)}:host([start-of-range][scale=l]) :not(.calcite--rtl) .day-wrapper,:host([end-of-range][scale=l]) .calcite--rtl .day-wrapper{-webkit-box-shadow:inset 8px 0 var(--calcite-ui-foreground-1);box-shadow:inset 8px 0 var(--calcite-ui-foreground-1)}:host([highlighted]) .day-wrapper{background-color:var(--calcite-ui-foreground-current)}:host([highlighted]) .day-wrapper .day{color:var(--calcite-ui-text-1)}:host([highlighted]:not([active]:focus)) .day{border-radius:0;color:var(--calcite-ui-text-1)}:host([range-hover]:not([selected])) .day-wrapper{background-color:var(--calcite-ui-foreground-2)}:host([range-hover]:not([selected])) .day{border-radius:0}:host([end-of-range][range-hover]) :not(.calcite--rtl) .day-wrapper,:host([start-of-range][range-hover]) .calcite--rtl .day-wrapper{background-image:-webkit-gradient(linear, left top, right top, from(var(--calcite-ui-foreground-current)), color-stop(var(--calcite-ui-foreground-current)), color-stop(var(--calcite-ui-foreground-2)), to(var(--calcite-ui-foreground-2)));background-image:linear-gradient(to right, var(--calcite-ui-foreground-current), var(--calcite-ui-foreground-current), var(--calcite-ui-foreground-2), var(--calcite-ui-foreground-2));border-radius:0;-webkit-box-shadow:none;box-shadow:none}:host([start-of-range][range-hover]) :not(.calcite--rtl) .day-wrapper,:host([end-of-range][range-hover]) .calcite--rtl .day-wrapper{background-image:-webkit-gradient(linear, right top, left top, from(var(--calcite-ui-foreground-current)), color-stop(var(--calcite-ui-foreground-current)), color-stop(var(--calcite-ui-foreground-2)), to(var(--calcite-ui-foreground-2)));background-image:linear-gradient(to left, var(--calcite-ui-foreground-current), var(--calcite-ui-foreground-current), var(--calcite-ui-foreground-2), var(--calcite-ui-foreground-2));border-radius:0;-webkit-box-shadow:none;box-shadow:none}:host(:hover[end-of-range][range-hover]) :not(.calcite--rtl) .day-wrapper,:host(:hover[start-of-range][range-hover]) .calcite--rtl .day-wrapper{background-image:-webkit-gradient(linear, left top, right top, from(var(--calcite-ui-foreground-current)), color-stop(var(--calcite-ui-foreground-current)), color-stop(var(--calcite-ui-foreground-1)), to(var(--calcite-ui-foreground-1)));background-image:linear-gradient(to right, var(--calcite-ui-foreground-current), var(--calcite-ui-foreground-current), var(--calcite-ui-foreground-1), var(--calcite-ui-foreground-1));border-radius:0;-webkit-box-shadow:none;box-shadow:none}:host(:hover[start-of-range][range-hover]) :not(.calcite--rtl) .day-wrapper,:host(:hover[end-of-range][range-hover]) .calcite--rtl .day-wrapper{background-image:-webkit-gradient(linear, right top, left top, from(var(--calcite-ui-foreground-current)), color-stop(var(--calcite-ui-foreground-current)), color-stop(var(--calcite-ui-foreground-1)), to(var(--calcite-ui-foreground-1)));background-image:linear-gradient(to left, var(--calcite-ui-foreground-current), var(--calcite-ui-foreground-current), var(--calcite-ui-foreground-1), var(--calcite-ui-foreground-1));border-radius:0;-webkit-box-shadow:none;box-shadow:none}:host(:hover[range-hover]:not([selected]).focused--end) :not(.calcite--rtl) .day-wrapper,:host(:hover[range-hover]:not([selected]).focused--start) .calcite--rtl .day-wrapper{background-image:-webkit-gradient(linear, left top, right top, from(var(--calcite-ui-foreground-2)), color-stop(var(--calcite-ui-foreground-2)), color-stop(var(--calcite-ui-foreground-current)), to(var(--calcite-ui-foreground-current)));background-image:linear-gradient(to right, var(--calcite-ui-foreground-2), var(--calcite-ui-foreground-2), var(--calcite-ui-foreground-current), var(--calcite-ui-foreground-current))}:host(:hover[range-hover]:not([selected]).focused--end) :not(.calcite--rtl) .day,:host(:hover[range-hover]:not([selected]).focused--start) .calcite--rtl .day{border-radius:9999px;opacity:1;-webkit-box-shadow:0 0 0 2px var(--calcite-ui-foreground-1);box-shadow:0 0 0 2px var(--calcite-ui-foreground-1)}:host(:hover[range-hover]:not([selected]).focused--start) :not(.calcite--rtl) .day-wrapper,:host(:hover[range-hover]:not([selected]).focused--end) .calcite--rtl .day-wrapper{background-image:-webkit-gradient(linear, left top, right top, from(var(--calcite-ui-foreground-current)), color-stop(var(--calcite-ui-foreground-current)), color-stop(var(--calcite-ui-foreground-2)), to(var(--calcite-ui-foreground-2)));background-image:linear-gradient(to right, var(--calcite-ui-foreground-current), var(--calcite-ui-foreground-current), var(--calcite-ui-foreground-2), var(--calcite-ui-foreground-2))}:host(:hover[range-hover]:not([selected]).focused--start) :not(.calcite--rtl) .day,:host(:hover[range-hover]:not([selected]).focused--end) .calcite--rtl .day{border-radius:9999px;opacity:1;-webkit-box-shadow:0 0 0 2px var(--calcite-ui-foreground-1);box-shadow:0 0 0 2px var(--calcite-ui-foreground-1)}:host(:hover[range-hover]:not([selected]).focused--start.hover--outside-range) :not(.calcite--rtl) .day-wrapper,:host(:hover[range-hover]:not([selected]).focused--end.hover--outside-range) .calcite--rtl .day-wrapper{background-image:-webkit-gradient(linear, left top, right top, from(var(--calcite-ui-foreground-1)), color-stop(var(--calcite-ui-foreground-1)), color-stop(var(--calcite-ui-foreground-2)), to(var(--calcite-ui-foreground-2)));background-image:linear-gradient(to right, var(--calcite-ui-foreground-1), var(--calcite-ui-foreground-1), var(--calcite-ui-foreground-2), var(--calcite-ui-foreground-2))}:host(:hover[range-hover]:not([selected]).focused--start.hover--outside-range) :not(.calcite--rtl) .day,:host(:hover[range-hover]:not([selected]).focused--end.hover--outside-range) .calcite--rtl .day{border-radius:9999px;opacity:1;-webkit-box-shadow:0 0 0 2px var(--calcite-ui-foreground-1);box-shadow:0 0 0 2px var(--calcite-ui-foreground-1)}:host(:hover[range-hover]:not([selected]).focused--end.hover--outside-range) :not(.calcite--rtl) .day-wrapper,:host(:hover[range-hover]:not([selected]).focused--start.hover--outside-range) .calcite--rtl .day-wrapper{background-image:-webkit-gradient(linear, left top, right top, from(var(--calcite-ui-foreground-2)), color-stop(var(--calcite-ui-foreground-2)), color-stop(var(--calcite-ui-foreground-1)), to(var(--calcite-ui-foreground-1)));background-image:linear-gradient(to right, var(--calcite-ui-foreground-2), var(--calcite-ui-foreground-2), var(--calcite-ui-foreground-1), var(--calcite-ui-foreground-1))}:host(:hover[range-hover]:not([selected]).focused--end.hover--outside-range) :not(.calcite--rtl) .day,:host(:hover[range-hover]:not([selected]).focused--start.hover--outside-range) .calcite--rtl .day{border-radius:9999px;opacity:1;-webkit-box-shadow:0 0 0 2px var(--calcite-ui-foreground-1);box-shadow:0 0 0 2px var(--calcite-ui-foreground-1)}:host(:hover[start-of-range].hover--inside-range.focused--end) .day-wrapper,:host(:hover[end-of-range].hover--inside-range.focused--start) .day-wrapper{background-image:none}:host([start-of-range].hover--inside-range.focused--end) .day-wrapper,:host([end-of-range].hover--inside-range.focused--start) .day-wrapper{background-color:var(--calcite-ui-foreground-2)}:host([highlighted]:last-child) :not(.calcite--rtl) .day-wrapper,:host([range-hover]:last-child) :not(.calcite--rtl) .day-wrapper,:host([highlighted]:first-child) .calcite--rtl .day-wrapper,:host([range-hover]:first-child) .calcite--rtl .day-wrapper{border-top-right-radius:45%;border-bottom-right-radius:45%;-webkit-box-shadow:inset -4px 0px 0px 0px var(--calcite-ui-foreground-1);box-shadow:inset -4px 0px 0px 0px var(--calcite-ui-foreground-1)}:host([highlighted]:first-child) :not(.calcite--rtl) .day-wrapper,:host([range-hover]:first-child) :not(.calcite--rtl) .day-wrapper,:host([highlighted]:last-child) .calcite--rtl .day-wrapper,:host([range-hover]:last-child) .calcite--rtl .day-wrapper{border-top-left-radius:45%;border-bottom-left-radius:45%;-webkit-box-shadow:inset 4px 0px 0px 0px var(--calcite-ui-foreground-1);box-shadow:inset 4px 0px 0px 0px var(--calcite-ui-foreground-1)}:host([scale=s][highlighted]:last-child) :not(.calcite--rtl) .day-wrapper,:host([scale=s][range-hover]:last-child) :not(.calcite--rtl) .day-wrapper,:host([scale=s][highlighted]:first-child) .calcite--rtl .day-wrapper,:host([scale=s][range-hover]:first-child) .calcite--rtl .day-wrapper{-webkit-box-shadow:inset -1px 0px 0px 0px var(--calcite-ui-foreground-1);box-shadow:inset -1px 0px 0px 0px var(--calcite-ui-foreground-1)}:host([scale=s][highlighted]:first-child) :not(.calcite--rtl) .day-wrapper,:host([scale=s][range-hover]:first-child) :not(.calcite--rtl) .day-wrapper,:host([scale=s][highlighted]:last-child) .calcite--rtl .day-wrapper,:host([scale=s][range-hover]:last-child) .calcite--rtl .day-wrapper{-webkit-box-shadow:inset 1px 0px 0px 0px var(--calcite-ui-foreground-1);box-shadow:inset 1px 0px 0px 0px var(--calcite-ui-foreground-1)}:host([scale=l][highlighted]:first-child) :not(.calcite--rtl) .day-wrapper,:host([scale=l][range-hover]:first-child) :not(.calcite--rtl) .day-wrapper,:host([scale=l][highlighted]:last-child) .calcite--rtl .day-wrapper,:host([scale=l][range-hover]:last-child) .calcite--rtl .day-wrapper{-webkit-box-shadow:inset 6px 0px 0px 0px var(--calcite-ui-foreground-1);box-shadow:inset 6px 0px 0px 0px var(--calcite-ui-foreground-1)}:host([scale=l][highlighted]:last-child) :not(.calcite--rtl) .day-wrapper,:host([scale=l][range-hover]:last-child) :not(.calcite--rtl) .day-wrapper,:host([scale=l][highlighted]:first-child) .calcite--rtl .day-wrapper,:host([scale=l][range-hover]:first-child) .calcite--rtl .day-wrapper{-webkit-box-shadow:inset -6px 0px 0px 0px var(--calcite-ui-foreground-1);box-shadow:inset -6px 0px 0px 0px var(--calcite-ui-foreground-1)}";

const CalciteDatePickerDay = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteDaySelect = createEvent(this, "calciteDaySelect", 7);
    this.calciteDayHover = createEvent(this, "calciteDayHover", 7);
    /** Date is outside of range and can't be selected */
    this.disabled = false;
    /** Date is in the current month. */
    this.currentMonth = false;
    /** Date is the current selected date of the picker */
    this.selected = false;
    /** Date is currently highlighted as part of the range */
    this.highlighted = false;
    /** Showing date range */
    this.range = false;
    /** Date is the start of date range */
    this.startOfRange = false;
    /** Date is the end of date range */
    this.endOfRange = false;
    this.rangeHover = false;
    /** Date is actively in focus for keyboard navigation */
    this.active = false;
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    this.onClick = () => {
      !this.disabled && this.calciteDaySelect.emit();
    };
    this.keyDownHandler = (e) => {
      const key = getKey(e.key);
      if (key === " " || key === "Enter") {
        !this.disabled && this.calciteDaySelect.emit();
      }
    };
  }
  mouseoverHandler() {
    this.calciteDayHover.emit({
      disabled: this.disabled
    });
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  render() {
    const formattedDay = String(this.day)
      .split("")
      .map((i) => this.localeData.numerals[i])
      .join("");
    const dir = getElementDir(this.el);
    return (h(Host, { onClick: this.onClick, onKeyDown: this.keyDownHandler, role: "gridcell", tabindex: this.active ? 0 : -1 }, h("div", { class: { "day-v-wrapper": true, [CSS_UTILITY.rtl]: dir === "rtl" } }, h("div", { class: "day-wrapper" }, h("span", { class: "day" }, h("span", { class: "text" }, formattedDay))))));
  }
  get el() { return getElement(this); }
};
CalciteDatePickerDay.style = calciteDatePickerDayCss;

const calciteDatePickerMonthCss = "@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}.calender{margin-bottom:0.25rem}.week-headers{display:-ms-flexbox;display:flex;border-width:0;border-top-width:1px;border-style:solid;border-color:var(--calcite-ui-border-3);padding-top:0;padding-bottom:0;padding-left:0.25rem;padding-right:0.25rem}.week-header{color:var(--calcite-ui-text-3);text-align:center;font-weight:var(--calcite-font-weight-bold);width:calc(100% / 7)}:host([scale=s]) .week-header{font-size:var(--calcite-font-size--2);line-height:1rem;padding-top:1rem;padding-bottom:1rem;padding-left:0;padding-right:0}:host([scale=m]) .week-header{font-size:var(--calcite-font-size--2);line-height:1rem;padding-top:1.5rem;padding-bottom:1.5rem;padding-left:0;padding-right:0}:host([scale=l]) .week-header{font-size:var(--calcite-font-size--1);line-height:1rem;padding-top:2rem;padding-bottom:1.5rem;padding-left:0;padding-right:0}.week-days{outline:2px solid transparent;outline-offset:2px;display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;padding-top:0;padding-bottom:0;padding-left:6px;padding-right:6px}";

const CalciteDatePickerMonth = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteDatePickerSelect = createEvent(this, "calciteDatePickerSelect", 7);
    this.calciteDatePickerHover = createEvent(this, "calciteDatePickerHover", 7);
    this.calciteDatePickerActiveDateChange = createEvent(this, "calciteDatePickerActiveDateChange", 7);
    this.calciteDatePickerMouseOut = createEvent(this, "calciteDatePickerMouseOut", 7);
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
    return (h(Host, { onFocusOut: this.disableActiveFocus, onKeyDown: this.keyDownHandler }, h("div", { class: "calender", role: "grid" }, h("div", { class: "week-headers", role: "row" }, adjustedWeekDays.map((weekday) => (h("span", { class: "week-header", role: "columnheader" }, weekday)))), weeks.map((days) => (h("div", { class: "week-days", role: "row" }, days))))));
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
  get el() { return getElement(this); }
};
CalciteDatePickerMonth.style = calciteDatePickerMonthCss;

const calciteDatePickerMonthHeaderCss = "@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:block}.header{display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between;padding-top:0;padding-bottom:0;padding-left:0.25rem;padding-right:0.25rem}:host([scale=s]) .text{font-size:var(--calcite-font-size--1);line-height:1rem}:host([scale=s]) .chevron{height:2.5rem}:host([scale=m]) .text{font-size:var(--calcite-font-size-0);line-height:1.25rem}:host([scale=m]) .chevron{height:3rem}:host([scale=l]) .text{font-size:var(--calcite-font-size-1);line-height:1.5rem}:host([scale=l]) .chevron{height:4rem}.chevron{color:var(--calcite-ui-text-2);-ms-flex-positive:0;flex-grow:0;-webkit-box-sizing:content-box;box-sizing:content-box;outline:2px solid transparent;outline-offset:2px;padding-left:0.25rem;padding-right:0.25rem;margin-left:-0.25rem;margin-right:-0.25rem;border-style:none;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;background-color:var(--calcite-ui-foreground-1);cursor:pointer;-webkit-transition-property:all;transition-property:all;-webkit-transition-duration:150ms;transition-duration:150ms;-webkit-transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;width:calc(100% / 7)}.chevron:focus{outline:2px solid var(--calcite-ui-brand);outline-offset:-2px}.chevron:hover,.chevron:focus{background-color:var(--calcite-ui-foreground-2);fill:var(--calcite-ui-text-1)}.chevron:active{background-color:var(--calcite-ui-foreground-3)}.chevron[aria-disabled=true]{pointer-events:none;opacity:0}.text{-ms-flex:1 1 auto;flex:1 1 auto;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;line-height:1;margin-top:auto;margin-bottom:auto;text-align:center;width:100%}.text--reverse{-ms-flex-direction:row-reverse;flex-direction:row-reverse}.month,.year,.suffix{color:var(--calcite-ui-text-1);background-color:var(--calcite-ui-foreground-1);font-weight:var(--calcite-font-weight-medium);line-height:1.25;margin-left:0.25rem;margin-right:0.25rem;display:inline-block;font-size:inherit}.year{font-family:inherit;text-align:center;border-style:none;width:3rem;background-color:transparent;position:relative;outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;z-index:2}.year:hover{-webkit-transition-duration:100ms;transition-duration:100ms;-webkit-transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);-webkit-transition-property:outline-color;transition-property:outline-color;outline:2px solid var(--calcite-ui-border-2);outline-offset:2px}.year:focus{outline:2px solid var(--calcite-ui-brand);outline-offset:2px}.year--suffix{width:4rem;text-align:left}.year-wrap{position:relative}.suffix{position:absolute;width:4rem;white-space:nowrap;text-align:left;top:0;left:0}.suffix__invisible{visibility:hidden}";

const CalciteDatePickerMonthHeader = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteDatePickerSelect = createEvent(this, "calciteDatePickerSelect", 7);
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
    return (h(Fragment, null, h("a", { "aria-disabled": (this.prevMonthDate.getMonth() === activeMonth).toString(), "aria-label": this.intlPrevMonth, class: "chevron", href: "#", onClick: this.prevMonthClick, onKeyDown: this.prevMonthKeydown, role: "button", tabindex: this.prevMonthDate.getMonth() === activeMonth ? -1 : 0 }, h("calcite-icon", { dir: dir, "flip-rtl": true, icon: "chevron-left", scale: iconScale })), h("div", { class: { text: true, "text--reverse": reverse } }, h(CalciteHeading, { class: "month", level: this.headingLevel }, localizedMonth), h("span", { class: "year-wrap" }, h("input", { class: {
        year: true,
        "year--suffix": !!suffix
      }, inputmode: "numeric", maxlength: "4", minlength: "1", onChange: this.yearChanged, onKeyDown: this.onYearKey, pattern: "\\d*", ref: (el) => (this.yearInput = el), type: "text", value: localizedYear }), suffix && (h("span", { class: "suffix" }, h("span", { "aria-hidden": "true", class: "suffix__invisible" }, localizedYear), " " + suffix)))), h("a", { "aria-disabled": (this.nextMonthDate.getMonth() === activeMonth).toString(), "aria-label": this.intlNextMonth, class: "chevron", href: "#", onClick: this.nextMonthClick, onKeyDown: this.nextMonthKeydown, role: "button", tabindex: this.nextMonthDate.getMonth() === activeMonth ? -1 : 0 }, h("calcite-icon", { dir: dir, "flip-rtl": true, icon: "chevron-right", scale: iconScale }))));
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
  get el() { return getElement(this); }
  static get watchers() { return {
    "min": ["setNextPrevMonthDates"],
    "max": ["setNextPrevMonthDates"],
    "activeDate": ["setNextPrevMonthDates"]
  }; }
};
CalciteDatePickerMonthHeader.style = calciteDatePickerMonthHeaderCss;

export { CalciteDatePicker as calcite_date_picker, CalciteDatePickerDay as calcite_date_picker_day, CalciteDatePickerMonth as calcite_date_picker_month, CalciteDatePickerMonthHeader as calcite_date_picker_month_header };
