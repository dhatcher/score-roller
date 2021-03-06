import { EventEmitter, VNode } from "../../stencil-public-runtime";
import { Alignment, Appearance, Scale } from "../interfaces";
/**
 * @slot - A slot for adding a `calcite-icon`.
 */
export declare class CalciteAction {
  /** Specify the appearance style of the action, defaults to solid. */
  appearance: Appearance;
  /**
   * Indicates whether the action is highlighted.
   */
  active: boolean;
  /**
   * Indicates the alignment when text-enabled is false.
   */
  alignment?: Alignment;
  /**
   * Compact mode is used internally by components to reduce side padding, e.g. calcite-block-section.
   */
  compact: boolean;
  /**
   * When true, disabled prevents interaction. This state shows items with lower opacity/grayed.
   */
  disabled: boolean;
  /**
   * The name of the icon to display. The value of this property must match the icon name from https://esri.github.io/calcite-ui-icons/.
   */
  icon?: string;
  /**
   * Indicates unread changes.
   */
  indicator: boolean;
  /** string to override English loading text
   * @default "Loading"
   */
  intlLoading?: string;
  /**
   * The label of the action. If no label is provided, the label inherits what's provided for the `text` prop.
   */
  label?: string;
  /**
   * When true, content is waiting to be loaded. This state shows a busy indicator.
   */
  loading: boolean;
  /**
   * Specifies the size of the action.
   */
  scale: Scale;
  /**
   * Text that accompanies the action icon.
   */
  text: string;
  /**
   * Indicates whether the text is displayed.
   */
  textEnabled: boolean;
  /**
   * Emitted when the action has been clicked.
   */
  calciteActionClick: EventEmitter;
  el: HTMLCalciteActionElement;
  buttonEl: HTMLButtonElement;
  observer: MutationObserver;
  connectedCallback(): void;
  disconnectedCallback(): void;
  setFocus(): Promise<void>;
  renderTextContainer(): VNode;
  renderIconContainer(): VNode;
  render(): VNode;
  calciteActionClickHandler: () => void;
}
