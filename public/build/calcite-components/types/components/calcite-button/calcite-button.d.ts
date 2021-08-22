import { VNode } from "../../stencil-public-runtime";
import { ButtonAlignment, ButtonAppearance, ButtonColor } from "./interfaces";
import { FlipContext, Scale, Width } from "../interfaces";
export declare class CalciteButton {
  el: HTMLCalciteButtonElement;
  /** optionally specify alignment of button elements. */
  alignment?: ButtonAlignment;
  /** specify the appearance style of the button, defaults to solid. */
  appearance: ButtonAppearance;
  /** Applies to the aria-label attribute on the button or hyperlink */
  label?: string;
  /** specify the color of the button, defaults to blue */
  color: ButtonColor;
  /** is the button disabled  */
  disabled?: boolean;
  /** optionally pass a href - used to determine if the component should render as a button or an anchor */
  href?: string;
  /** optionally pass an icon to display at the end of a button - accepts calcite ui icon names  */
  iconEnd?: string;
  /** flip the icon(s) in rtl */
  iconFlipRtl?: FlipContext;
  /** optionally pass an icon to display at the start of a button - accepts calcite ui icon names  */
  iconStart?: string;
  /** string to override English loading text
   * @default "Loading"
   */
  intlLoading?: string;
  /** optionally add a calcite-loader component to the button, disabling interaction.  */
  loading?: boolean;
  /** The name attribute to apply to the button */
  name?: string;
  /** The rel attribute to apply to the hyperlink */
  rel?: string;
  /** The form ID to associate with the component */
  form?: string;
  /** optionally add a round style to the button  */
  round?: boolean;
  /** specify the scale of the button, defaults to m */
  scale: Scale;
  /** is the button a child of a calcite-split-button */
  splitChild?: "primary" | "secondary" | false;
  /** The target attribute to apply to the hyperlink */
  target?: string;
  /** The type attribute to apply to the button */
  type?: string;
  /** specify the width of the button, defaults to auto */
  width: Width;
  loadingChanged(newValue: boolean, oldValue: boolean): void;
  connectedCallback(): void;
  disconnectedCallback(): void;
  componentWillLoad(): void;
  render(): VNode;
  setFocus(): Promise<void>;
  /** watches for changing text content **/
  private observer;
  /** the rendered child element */
  private childEl?;
  /** the node type of the rendered child element */
  private childElType?;
  /** determine if there is slotted content for styling purposes */
  private hasContent?;
  /** determine if loader present for styling purposes */
  private hasLoader?;
  private updateHasContent;
  private setupTextContentObserver;
  private handleClick;
}
