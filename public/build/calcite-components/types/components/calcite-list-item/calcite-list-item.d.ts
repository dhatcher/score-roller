import { VNode } from "../../stencil-public-runtime";
/**
 * @slot actions-start - A slot for adding actionable `calcite-action` elements before the content of the list item.
 * @slot content-start - A slot for adding non-actionable elements before the label and description of the list item.
 * @slot content-end - A slot for adding non-actionable elements after the label and description of the list item.
 * @slot actions-end - A slot for adding actionable `calcite-action` elements after the content of the list item.
 */
export declare class CalciteListItem {
  /**
   * When true, prevents the content of the list item from user interaction.
   */
  nonInteractive: boolean;
  /**
   * An optional description for this item.  This will appear below the label text.
   */
  description: string;
  /**
   * When true, disabled prevents interaction.
   */
  disabled: boolean;
  /**
   * @todo The label of the list item.
   */
  label: string;
  el: HTMLCalciteListItemElement;
  renderActionsStart(): VNode;
  renderActionsEnd(): VNode;
  renderContentStart(): VNode;
  renderContentEnd(): VNode;
  renderContent(): VNode;
  renderContentContainer(): VNode;
  render(): VNode;
}
