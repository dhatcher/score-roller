import { VNode, EventEmitter } from "../../stencil-public-runtime";
import { HeadingLevel } from "../functional/CalciteHeading";
import { OverlayPositioning } from "../../utils/popper";
import { StrictModifiers } from "@popperjs/core";
import { DateRangeChange } from "../calcite-date-picker/interfaces";
export declare class CalciteInputDatePicker {
  el: HTMLCalciteInputDatePickerElement;
  /** Selected date */
  value?: string;
  /**
   * Number at which section headings should start for this component.
   */
  headingLevel: HeadingLevel;
  /** Selected date as full date object*/
  valueAsDate?: Date;
  /** Selected start date as full date object*/
  startAsDate?: Date;
  /** Selected end date as full date object*/
  endAsDate?: Date;
  /** Earliest allowed date as full date object */
  minAsDate?: Date;
  /** Latest allowed date as full date object */
  maxAsDate?: Date;
  /** Earliest allowed date ("yyyy-mm-dd") */
  min?: string;
  /** Latest allowed date ("yyyy-mm-dd") */
  max?: string;
  /** Expand or collapse when calendar does not have input */
  active: boolean;
  activeHandler(): void;
  /** Localized string for "previous month" (used for aria label)
   * @default "previous month"
   */
  intlPrevMonth?: string;
  /** Localized string for "next month" (used for aria label)
   * @default "next month"
   */
  intlNextMonth?: string;
  /** BCP 47 language tag for desired language and country format */
  locale?: string;
  /** specify the scale of the date picker */
  scale: "s" | "m" | "l";
  /** Range mode activation */
  range?: boolean;
  /** Selected start date */
  start?: string;
  /** Selected end date */
  end?: string;
  /** Describes the type of positioning to use for the overlaid content. If your element is in a fixed container, use the 'fixed' value. */
  overlayPositioning: OverlayPositioning;
  /** Disables the default behaviour on the third click of narrowing or extending the range and instead starts a new range. */
  proximitySelectionDisabled?: boolean;
  /** Layout */
  layout: "horizontal" | "vertical";
  calciteDaySelectHandler(): void;
  /**
   * Trigger calcite date change when a user changes the date.
   */
  calciteDatePickerChange: EventEmitter<Date>;
  /**
   * Trigger calcite date change when a user changes the date range.
   * @see [DateRangeChange](https://github.com/Esri/calcite-components/blob/master/src/components/calcite-date-picker/interfaces.ts#L1)
   */
  calciteDatePickerRangeChange: EventEmitter<DateRangeChange>;
  /**
   * @internal
   */
  calciteInputDatePickerOpen: EventEmitter;
  /**
   * @internal
   */
  calciteInputDatePickerClose: EventEmitter;
  reposition(): Promise<void>;
  connectedCallback(): void;
  disconnectedCallback(): void;
  render(): VNode;
  focusedInput: "start" | "end";
  private localeData;
  private endInput;
  private popper;
  private menuEl;
  private referenceEl;
  private startWrapper;
  private endWrapper;
  private endInputFocusTimeout;
  private activeTransitionProp;
  setReferenceEl(): void;
  transitionEnd: (event: TransitionEvent) => void;
  setEndInput: (el: HTMLCalciteInputElement) => void;
  deactivate: () => void;
  keyUpHandler: (e: KeyboardEvent) => void;
  inputBlur: (e: CustomEvent<any>) => void;
  startInputFocus: () => void;
  endInputFocus: () => void;
  inputInput: (e: CustomEvent<any>) => void;
  setMenuEl: (el: HTMLDivElement) => void;
  setStartWrapper: (el: HTMLDivElement) => void;
  setEndWrapper: (el: HTMLDivElement) => void;
  getModifiers(): Partial<StrictModifiers>[];
  createPopper(): void;
  destroyPopper(): void;
  valueWatcher(value: string): void;
  startWatcher(start: string): void;
  endWatcher(end: string): void;
  private loadLocaleData;
  /**
   * Update date instance of start if valid
   */
  private setStartAsDate;
  /**
   * Update date instance of end if valid
   */
  private setEndAsDate;
  /**
   * If inputted string is a valid date, update value/active
   */
  private input;
  /**
   * Clean up invalid date from input on blur
   */
  private blur;
  /**
   * Event handler for when the selected date changes
   */
  handleDateChange: (event: CustomEvent<Date>) => void;
  private focusInputEnd;
  private handleDateRangeChange;
  /**
   * Find a date from input string
   * return false if date is invalid, or out of range
   */
  private getDateFromInput;
}
