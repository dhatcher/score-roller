import { EventEmitter, VNode } from "../../stencil-public-runtime";
import { Scale } from "../interfaces";
export declare class CalciteCheckbox {
  el: HTMLCalciteCheckboxElement;
  /** The checked state of the checkbox. */
  checked?: boolean;
  checkedWatcher(newChecked: boolean): void;
  /** True if the checkbox is disabled */
  disabled?: boolean;
  disabledChanged(disabled: boolean): void;
  /** The id attribute of the checkbox.  When omitted, a globally unique identifier is used. */
  guid: string;
  /**
   * The hovered state of the checkbox.
   * @private
   */
  hovered: boolean;
  /**
   * True if the checkbox is initially indeterminate,
   * which is independent from its checked state
   * https://css-tricks.com/indeterminate-checkboxes/
   * */
  indeterminate?: boolean;
  /**
   * The label of the checkbox input
   * @internal
   */
  label?: string;
  /** The name of the checkbox input */
  name?: string;
  nameChanged(newName: string): void;
  /** specify the scale of the checkbox, defaults to m */
  scale: Scale;
  /** The value of the checkbox input */
  value?: any;
  private readonly checkedPath;
  private readonly indeterminatePath;
  private initialChecked;
  private input;
  /** The focused state of the checkbox. */
  focused: boolean;
  setFocus(): Promise<void>;
  private getPath;
  private toggle;
  /** Emitted when the checkbox checked status changes */
  calciteCheckboxChange: EventEmitter;
  /**
   * Emitted when the checkbox focused state changes
   *
   * @internal
   */
  calciteCheckboxFocusedChange: EventEmitter;
  onClick(event: MouseEvent): void;
  mouseenter(): void;
  mouseleave(): void;
  private formResetHandler;
  private nativeLabelClickHandler;
  private onInputBlur;
  private onInputFocus;
  connectedCallback(): void;
  disconnectedCallback(): void;
  private renderHiddenCheckboxInput;
  render(): VNode;
}
