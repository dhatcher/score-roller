import { EventEmitter, VNode } from "../../stencil-public-runtime";
import { HeadingLevel } from "../functional/CalciteHeading";
/**
 * @slot thumbnail - A slot for adding an HTML image element to the tip.
 */
export declare class CalciteTip {
  /**
   * No longer displays the tip.
   */
  dismissed: boolean;
  /**
   * Indicates whether the tip can be dismissed.
   */
  nonDismissible: boolean;
  /**
   * The heading of the tip.
   */
  heading?: string;
  /**
   * Number at which section headings should start for this component.
   */
  headingLevel: HeadingLevel;
  /**
   * The selected state of the tip if it is being used inside a `calcite-tip-manager`.
   */
  selected?: boolean;
  /**
   * Alternate text for closing the tip.
   */
  intlClose?: string;
  el: HTMLCalciteTipElement;
  /**
   * Emitted when the component has been dismissed.
   */
  calciteTipDismiss: EventEmitter;
  hideTip: () => void;
  renderHeader(): VNode;
  renderDismissButton(): VNode;
  renderImageFrame(): VNode;
  renderInfoNode(): VNode;
  renderContent(): VNode;
  render(): VNode;
}
