import { EventEmitter, VNode } from "../../stencil-public-runtime";
import { Scale } from "../interfaces";
/**
 * @slot - slot for rendering a `<calcite-input>`
 */
export declare class CalciteInlineEditable {
  el: HTMLCalciteInlineEditableElement;
  /** specify whether editing can be enabled */
  disabled: boolean;
  disabledWatcher(disabled: boolean): void;
  /** specify whether the wrapped input element is editable, defaults to false */
  editingEnabled: boolean;
  /** specify whether the confirm button should display a loading state, defaults to false */
  loading: boolean;
  /** specify whether save/cancel controls should be displayed when editingEnabled is true, defaults to false */
  controls: boolean;
  /** specify text to be user for the enable editing button's aria-label, defaults to `Click to edit`
   * @default "Click to edit"
   */
  intlEnableEditing: string;
  /** specify text to be user for the cancel editing button's aria-label, defaults to `Cancel`
   * @default "Cancel"
   */
  intlCancelEditing: string;
  /** specify text to be user for the confirm changes button's aria-label, defaults to `Save`
   * @default "Save"
   */
  intlConfirmChanges: string;
  /** specify the scale of the inline-editable component, defaults to the scale of the wrapped calcite-input or the scale of the closest wrapping component with a set scale */
  scale?: Scale;
  /** when controls, specify a callback to be executed prior to disabling editing. when provided, loading state will be handled automatically. */
  afterConfirm?: () => Promise<void>;
  componentWillLoad(): void;
  componentDidLoad(): void;
  render(): VNode;
  /**
   * @internal
   */
  calciteInlineEditableEditingCancel: EventEmitter;
  /**
   * @internal
   */
  calciteInlineEditableChangesConfirm: EventEmitter;
  /**
   * @internal
   */
  calciteInlineEditableEnableEditingChange: EventEmitter;
  blurHandler(): void;
  handleLabelFocus(e: CustomEvent): void;
  private inputElement;
  private htmlInput;
  private valuePriorToEditing;
  private enableEditingButton;
  private editingCancelTransitionProp;
  transitionEnd: (event: TransitionEvent) => void;
  private get shouldShowControls();
  private enableEditing;
  private disableEditing;
  private cancelEditingEnd;
  private cancelEditing;
  private escapeKeyHandler;
  private cancelEditingHandler;
  private enableEditingHandler;
  private confirmChangesHandler;
}
