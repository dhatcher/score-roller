import { VNode, EventEmitter } from "../../stencil-public-runtime";
import { Scale } from "../interfaces";
import { Meridiem, Time, TimeFocusId, HourDisplayFormat } from "../../utils/time";
export declare class CalciteTimePicker {
  el: HTMLCalciteTimePickerElement;
  /** The hour value (24-hour format) */
  hour?: string;
  /** Format of the hour value (12-hour or 24-hour) (this will be replaced by locale eventually) */
  hourDisplayFormat: HourDisplayFormat;
  /** aria-label for the hour input
   * @default "Hour"
   */
  intlHour: string;
  /** aria-label for the hour down button
   * @default "Decrease hour"
   */
  intlHourDown: string;
  /** aria-label for the hour up button
   * @default "Increase hour"
   */
  intlHourUp: string;
  /** aria-label for the meridiem (am/pm) input
   * @default "AM/PM"
   */
  intlMeridiem: string;
  /** aria-label for the meridiem (am/pm) down button
   * @default "Decrease AM/PM"
   */
  intlMeridiemDown: string;
  /** aria-label for the meridiem (am/pm) up button
   * @default "Increase AM/PM"
   */
  intlMeridiemUp: string;
  /** aria-label for the minute input
   * @default "Minute"
   */
  intlMinute: string;
  /** aria-label for the minute down button
   * @default "Decrease minute"
   */
  intlMinuteDown: string;
  /** aria-label for the minute up button
   * @default "Increase minute"
   */
  intlMinuteUp: string;
  /** aria-label for the second input
   * @default "Second"
   */
  intlSecond: string;
  /** aria-label for the second down button
   * @default "Decrease second"
   */
  intlSecondDown: string;
  /** aria-label for the second up button
   * @default "Increase second"
   */
  intlSecondUp: string;
  /** The minute value */
  minute?: string;
  /** The second value */
  second?: string;
  /** The scale (size) of the time picker */
  scale: Scale;
  /** number that specifies the granularity that the value must adhere to */
  step: number;
  hourChanged(newHour: string): void;
  timeChangeHandler(): void;
  private activeEl;
  private meridiemEl;
  private hourEl;
  private minuteEl;
  private secondEl;
  private timeChanged;
  /** The am/pm value */
  meridiem: Meridiem;
  displayHour: string;
  /**
   * @internal
   */
  calciteTimePickerBlur: EventEmitter<Time>;
  /**
   * @internal
   */
  calciteTimePickerChange: EventEmitter<Time>;
  /**
   * @internal
   */
  calciteTimePickerFocus: EventEmitter<Time>;
  hostBlurHandler(): void;
  hostFocusHandler(): void;
  keyDownHandler(event: KeyboardEvent): void;
  setFocus(target: TimeFocusId): Promise<void>;
  private decrementHour;
  private decrementMeridiem;
  private decrementMinuteOrSecond;
  private decrementMinute;
  private decrementSecond;
  private buttonActivated;
  private focusHandler;
  private getDisplayHour;
  private getTime;
  private hourDownButtonKeyDownHandler;
  private hourKeyDownHandler;
  private hourUpButtonKeyDownHandler;
  private incrementMeridiem;
  private incrementHour;
  private incrementMinuteOrSecond;
  private incrementMinute;
  private incrementSecond;
  private meridiemDownButtonKeyDownHandler;
  private meridiemKeyDownHandler;
  private meridiemUpButtonKeyDownHandler;
  private minuteDownButtonKeyDownHandler;
  private minuteKeyDownHandler;
  private minuteUpButtonKeyDownHandler;
  private secondDownButtonKeyDownHandler;
  private secondKeyDownHandler;
  private secondUpButtonKeyDownHandler;
  private setTime;
  connectedCallback(): void;
  render(): VNode;
}
