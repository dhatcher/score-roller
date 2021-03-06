import { EventEmitter, VNode } from "../../stencil-public-runtime";
import { DateLocaleData } from "../calcite-date-picker/utils";
import { Scale } from "../interfaces";
export declare class CalciteDatePickerDay {
  el: HTMLCalciteDatePickerDayElement;
  /** Day of the month to be shown. */
  day: number;
  /** Date is outside of range and can't be selected */
  disabled: boolean;
  /** Date is in the current month. */
  currentMonth: boolean;
  /** Date is the current selected date of the picker */
  selected: boolean;
  /** Date is currently highlighted as part of the range */
  highlighted: boolean;
  /** Showing date range */
  range: boolean;
  /** Date is the start of date range */
  startOfRange: boolean;
  /** Date is the end of date range */
  endOfRange: boolean;
  rangeHover: boolean;
  /** Date is actively in focus for keyboard navigation */
  active: boolean;
  /** CLDR data for current locale */
  localeData: DateLocaleData;
  /** specify the scale of the date picker */
  scale: Scale;
  /** Date value for the day. */
  value: Date;
  onClick: () => void;
  keyDownHandler: (e: KeyboardEvent) => void;
  mouseoverHandler(): void;
  /**
   * Emitted when user selects day
   */
  calciteDaySelect: EventEmitter;
  /**
   * Emitted when user hovers over a day
   * @internal
   */
  calciteDayHover: EventEmitter;
  render(): VNode;
}
