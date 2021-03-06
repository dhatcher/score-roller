import { VNode } from "../../stencil-public-runtime";
/**
 * @slot header - A slot for adding header content. This content will be positioned at the top of the shell.
 * @slot footer - A slot for adding footer content. This content will be positioned at the bottom of the shell.
 * @slot primary-panel - A slot for adding the leading `calcite-shell-panel`.
 * @slot contextual-panel - A slot for adding the trailing `calcite-shell-panel`.
 * @slot bottom-panel - A slot for adding a bottom floating panel such as a chart or `calcite-tip-manager`.
 * @slot - A slot for adding content to the shell. This content will appear between any leading and trailing panels added to the shell. (eg. a map)
 */
export declare class CalciteShell {
  /**
   * Positions the center content behind any calcite-shell-panels.
   */
  contentBehind?: boolean;
  el: HTMLCalciteShellElement;
  renderHeader(): VNode;
  renderContent(): VNode[];
  renderFooter(): VNode;
  renderMain(): VNode;
  render(): VNode;
}
