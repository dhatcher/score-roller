import { EventEmitter, VNode } from "../../stencil-public-runtime";
import Color from "color";
import { Scale } from "../interfaces";
export declare class CalciteColorPickerHexInput {
  el: HTMLCalciteColorPickerHexInputElement;
  connectedCallback(): void;
  /**
   * When false, empty color (null) will be allowed as a value. Otherwise, a color value is always enforced by the component.
   *
   * When true, clearing the input and blurring will restore the last valid color set. When false, it will set it to empty.
   */
  allowEmpty: boolean;
  /**
   * Label used for the hex input.
   * @default "Hex"
   */
  intlHex: string;
  /**
   * Label used for the hex input when there is no color selected.
   * @default "No color"
   */
  intlNoColor: string;
  /**
   * The component's scale.
   */
  scale: Scale;
  /**
   * The hex value.
   */
  value: string;
  handleValueChange(value: string, oldValue: string): void;
  /**
   * Emitted when the hex value changes.
   */
  calciteColorPickerHexInputChange: EventEmitter;
  private onCalciteInputBlur;
  private onInputChange;
  protected onInputKeyDown(event: KeyboardEvent): void;
  private inputNode;
  /**
   * The last valid/selected color. Used as a fallback if an invalid hex code is entered.
   */
  internalColor: Color | null;
  private previousNonNullValue;
  render(): VNode;
  /** Sets focus on the component. */
  setFocus(): Promise<void>;
  private storeInputRef;
  private formatForInternalInput;
  private nudgeRGBChannels;
}
