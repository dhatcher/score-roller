import { VNode } from "../../stencil-public-runtime";
import { Columns, Layout } from "../interfaces";
/**
 * @slot - A slot for adding a group of `calcite-action`s.
 * @slot menu-actions - a slot for adding an overflow menu with actions inside a dropdown.
 * @slot menu-tooltip - a slot for adding an tooltip for the menu.
 */
export declare class CalciteActionGroup {
  /**
   * Indicates whether widget is expanded.
   */
  expanded: boolean;
  expandedHandler(): void;
  /**
   * Indicates the horizontal, vertical, or grid layout of the component.
   */
  layout: Layout;
  /**
   * Indicates number of columns.
   */
  columns?: Columns;
  /**
   * Text string for the actions menu.
   */
  intlMore?: string;
  /**
   * Opens the action menu.
   */
  menuOpen: boolean;
  el: HTMLCalciteActionGroupElement;
  renderTooltip(): VNode;
  renderMenu(): VNode;
  render(): VNode;
  setMenuOpen: (event: CustomEvent<boolean>) => void;
}
