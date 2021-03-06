import { EventEmitter, VNode } from "../../stencil-public-runtime";
import { Scale } from "../interfaces";
export declare class CalciteRating {
  el: HTMLCalciteRatingElement;
  /** specify the scale of the component, defaults to m */
  scale: Scale;
  /** the value of the rating component */
  value: number;
  /** is the rating component in a selectable mode */
  readOnly: boolean;
  /** is the rating component in a selectable mode */
  disabled: boolean;
  /** Show average and count data summary chip (if available) */
  showChip: boolean;
  /** optionally pass a number of previous ratings to display */
  count?: number;
  /** optionally pass a cumulative average rating to display */
  average?: number;
  /** Localized string for "Rating" (used for aria label)
   * @default "Rating"
   */
  intlRating?: string;
  /** Localized string for labelling each star, `${num}` in the string will be replaced by the number
   * @default "stars: ${num}"
   */
  intlStars?: string;
  /**
   * Fires when the rating value has changed.
   */
  calciteRatingChange: EventEmitter<{
    value: number;
  }>;
  handleLabelFocus(e: CustomEvent): void;
  blurHandler(): void;
  renderStars(): VNode[];
  render(): any;
  private updateValue;
  setFocus(): Promise<void>;
  hoverValue: number;
  focusValue: number;
  hasFocus: boolean;
  private guid;
  private inputFocusRef;
}
