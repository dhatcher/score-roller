import { EventEmitter, VNode } from "../../stencil-public-runtime";
import { Scale } from "../interfaces";
export declare class CalciteRadioButton {
  el: HTMLCalciteRadioButtonElement;
  /** The checked state of the radio button. */
  checked: boolean;
  checkedChanged(newChecked: boolean): void;
  /** The disabled state of the radio button. */
  disabled: boolean;
  disabledChanged(disabled: boolean): void;
  /**
   * The focused state of the radio button.
   * @private
   */
  focused: boolean;
  focusedChanged(focused: boolean): void;
  /** The id attribute of the radio button.  When omitted, a globally unique identifier is used. */
  guid: string;
  /** The radio button's hidden status.  When a radio button is hidden it is not focusable or checkable. */
  hidden: boolean;
  hiddenChanged(newHidden: boolean): void;
  /**
   * The hovered state of the radio button.
   * @private
   */
  hovered: boolean;
  /**
   * The label of the radio input
   * @internal
   */
  label?: string;
  /** The name of the radio button. `name` is passed as a property automatically from `calcite-radio-button-group`. */
  name: string;
  nameChanged(newName: string): void;
  /** Requires that a value is selected for the radio button group before the parent form will submit. */
  required: boolean;
  requiredChanged(required: boolean): void;
  /** The scale (size) of the radio button. `scale` is passed as a property automatically from `calcite-radio-button-group`. */
  scale: Scale;
  /** The value of the radio button. */
  value: any;
  private initialChecked;
  private inputEl;
  private rootNode;
  setFocus(): Promise<void>;
  private checkLastRadioButton;
  /** @internal */
  emitCheckedChange(): Promise<void>;
  private setInputEl;
  private uncheckAllRadioButtonsInGroup;
  private uncheckOtherRadioButtonsInGroup;
  /**
   * Fires only when the radio button is checked.  This behavior is identical to the native HTML input element.
   * Since this event does not fire when the radio button is unchecked, it's not recommended to attach a listener for this event
   * directly on the element, but instead either attach it to a node that contains all of the radio buttons in the group
   * or use the calciteRadioButtonGroupChange event if using this with calcite-radio-button-group.
   */
  calciteRadioButtonChange: EventEmitter;
  /**
   * Fires when the checked property changes.  This is an internal event used for styling purposes only.
   * Use calciteRadioButtonChange or calciteRadioButtonGroupChange for responding to changes in the checked value for forms.
   * @internal
   */
  calciteRadioButtonCheckedChange: EventEmitter;
  /**
   * Fires when the radio button is either focused or blurred.
   * @internal
   */
  calciteRadioButtonFocusedChange: EventEmitter;
  check(event: MouseEvent | FocusEvent): void;
  mouseenter(): void;
  mouseleave(): void;
  private formResetHandler;
  private hideInputEl;
  private onInputBlur;
  private onInputFocus;
  connectedCallback(): void;
  componentDidLoad(): void;
  disconnectedCallback(): void;
  render(): VNode;
}
