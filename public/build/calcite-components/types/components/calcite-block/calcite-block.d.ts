import { EventEmitter, VNode } from "../../stencil-public-runtime";
import { HeadingLevel } from "../functional/CalciteHeading";
import { Status } from "../interfaces";
/**
 * @slot icon - A slot for adding a leading header icon.
 * @slot control - A slot for adding a single HTML input element in a header.
 * @slot header-menu-actions - a slot for adding an overflow menu with actions inside a dropdown.
 * @slot - A slot for adding content to the block.
 */
export declare class CalciteBlock {
  /**
   * When true, this block will be collapsible.
   */
  collapsible: boolean;
  /**
   * When true, disabled prevents interaction. This state shows items with lower opacity/grayed.
   */
  disabled: boolean;
  /**
   * When true, displays a drag handle in the header.
   */
  dragHandle: boolean;
  /**
   * Block heading.
   */
  heading: string;
  /**
   * Number at which section headings should start for this component.
   */
  headingLevel: HeadingLevel;
  /**
   * Tooltip used for the toggle when expanded.
   */
  intlCollapse?: string;
  /**
   * Tooltip used for the toggle when collapsed.
   */
  intlExpand?: string;
  /** string to override English loading text
   * @default "Loading"
   */
  intlLoading?: string;
  /** Text string used for the actions menu
   * @default "Options"
   */
  intlOptions?: string;
  /**
   * When true, content is waiting to be loaded. This state shows a busy indicator.
   */
  loading: boolean;
  /**
   * When true, the block's content will be displayed.
   */
  open: boolean;
  /**
   * Block status. Updates or adds icon to show related icon and color.
   */
  status?: Status;
  /**
   * Block summary.
   */
  summary: string;
  el: HTMLCalciteBlockElement;
  /**
   * Emitted when the header has been clicked.
   */
  calciteBlockToggle: EventEmitter;
  onHeaderClick: () => void;
  renderScrim(): VNode[];
  renderIcon(): VNode[];
  render(): VNode;
}
