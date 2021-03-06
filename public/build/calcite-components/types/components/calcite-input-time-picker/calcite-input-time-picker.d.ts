import { VNode, EventEmitter } from "../../stencil-public-runtime";
import { HourDisplayFormat } from "../../utils/time";
import { Scale } from "../interfaces";
export declare class CalciteInputTimePicker {
  el: HTMLCalciteInputTimePickerElement;
  /** The active state of the time input */
  active?: boolean;
  /** The disabled state of the time input */
  disabled?: boolean;
  /** Format of the hour value (12-hour or 24-hour) (this will be replaced by locale eventually) */
  hourDisplayFormat: HourDisplayFormat;
  /** aria-label for the hour input */
  intlHour?: string;
  /** aria-label for the hour down button */
  intlHourDown?: string;
  /** aria-label for the hour up button */
  intlHourUp?: string;
  /** aria-label for the meridiem (am/pm) input */
  intlMeridiem?: string;
  /** aria-label for the meridiem (am/pm) down button */
  intlMeridiemDown?: string;
  /** aria-label for the meridiem (am/pm) up button */
  intlMeridiemUp?: string;
  /** aria-label for the minute input */
  intlMinute?: string;
  /** aria-label for the minute down button */
  intlMinuteDown?: string;
  /** aria-label for the minute up button */
  intlMinuteUp?: string;
  /** aria-label for the second input */
  intlSecond?: string;
  /** aria-label for the second down button */
  intlSecondDown?: string;
  /** aria-label for the second up button */
  intlSecondUp?: string;
  /** The name of the time input */
  name?: string;
  /** The scale (size) of the time input */
  scale: Scale;
  /** number that specifies the granularity that the value must adhere to */
  step: number;
  /** The selected time */
  value: string;
  valueWatcher(newValue: string): void;
  private calciteInputEl;
  private calciteTimePickerEl;
  /** whether the value of the input was changed as a result of user typing or not */
  private internalValueChange;
  private previousValidValue;
  private referenceElementId;
  /**
   * Fires when the time value is changed as a result of user input.
   */
  calciteInputTimePickerChange: EventEmitter<string>;
  private calciteInputBlurHandler;
  private calciteInputFocusHandler;
  private calciteInputInputHandler;
  clickHandler(event: MouseEvent): void;
  keyUpHandler(event: KeyboardEvent): void;
  timePickerBlurHandler(event: CustomEvent): void;
  timePickerChangeHandler(event: CustomEvent): void;
  timePickerFocusHandler(event: CustomEvent): void;
  setFocus(): Promise<void>;
  private setCalciteInputEl;
  private setCalciteTimePickerEl;
  private setInputValue;
  private setValue;
  connectedCallback(): void;
  componentDidLoad(): void;
  render(): VNode;
}
