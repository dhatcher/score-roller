import { EventEmitter, VNode } from "../../stencil-public-runtime";
import { ButtonAppearance, ButtonColor, DropdownIconType } from "../calcite-button/interfaces";
import { FlipContext, Scale, Width } from "../interfaces";
export declare class CalciteSplitButton {
  el: HTMLCalciteSplitButtonElement;
  /** specify the appearance style of the button, defaults to solid. */
  appearance: ButtonAppearance;
  /** specify the color of the control, defaults to blue */
  color: ButtonColor;
  /** is the control disabled  */
  disabled?: boolean;
  /**
   * Is the dropdown currently active or not
   * @internal
   */
  active?: boolean;
  /** specify the icon used for the dropdown menu, defaults to chevron */
  dropdownIconType: DropdownIconType;
  /** aria label for overflow button */
  dropdownLabel?: string;
  /** optionally add a calcite-loader component to the control,
   disabling interaction. with the primary button */
  loading?: boolean;
  /** optionally pass an icon to display at the end of the primary button - accepts Calcite UI icon names  */
  primaryIconEnd?: string;
  /** flip the primary icon(s) in rtl */
  primaryIconFlipRtl?: FlipContext;
  /** optionally pass an icon to display at the start of the primary button - accepts Calcite UI icon names  */
  primaryIconStart?: string;
  /** optionally pass an aria-label for the primary button */
  primaryLabel?: string;
  /** text for primary action button  */
  primaryText: string;
  /** specify the scale of the control, defaults to m */
  scale: Scale;
  /** specify the width of the button, defaults to auto */
  width: Width;
  /** fired when the primary button is clicked */
  calciteSplitButtonPrimaryClick: EventEmitter;
  /** fired when the secondary button is clicked */
  calciteSplitButtonSecondaryClick: EventEmitter;
  render(): VNode;
  private calciteSplitButtonPrimaryClickHandler;
  private calciteSplitButtonSecondaryClickHandler;
  private get dropdownIcon();
}
