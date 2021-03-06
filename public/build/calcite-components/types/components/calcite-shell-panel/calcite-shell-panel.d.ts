import { EventEmitter, VNode } from "../../stencil-public-runtime";
import { Position, Scale } from "../interfaces";
/**
 * @slot action-bar - A slot for adding a `calcite-action-bar` to the panel.
 * @slot - A slot for adding content to the shell panel.
 */
export declare class CalciteShellPanel {
  /**
   * Hide the content panel.
   */
  collapsed: boolean;
  watchHandler(): void;
  /**
   * This property makes the content area appear like a "floating" panel.
   */
  detached: boolean;
  /**
   * Specifies the maxiumum height of the contents when detached.
   */
  detachedHeightScale: Scale;
  /**
   * This sets width of the content area.
   */
  widthScale: Scale;
  /**
   * Arranges the component depending on the elements 'dir' property.
   */
  position: Position;
  el: HTMLCalciteShellPanelElement;
  /**
   * Emitted when collapse has been toggled.
   */
  calciteShellPanelToggle: EventEmitter;
  renderHeader(): VNode;
  render(): VNode;
}
