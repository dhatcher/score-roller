import { Scale } from "../interfaces";
export declare class CalciteRadio {
  /** The checked state of the radio. */
  checked: boolean;
  /** The disabled state of the radio. */
  disabled?: boolean;
  /**
   * The focused state of the radio.
   * @private
   */
  focused: boolean;
  /** The radio's hidden status. */
  hidden: boolean;
  /**
   * The hovered state of the radio.
   * @private
   */
  hovered: boolean;
  /** The scale (size) of the radio. */
  scale: Scale;
  render(): any;
}
