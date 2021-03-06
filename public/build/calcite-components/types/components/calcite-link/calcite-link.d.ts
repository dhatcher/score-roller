import { VNode } from "../../stencil-public-runtime";
import { FlipContext } from "../interfaces";
/** @slot default text slot for link text */
/** Any attributes placed on <calcite-link> component will propagate to the rendered child */
/** Passing a 'href' will render an anchor link, instead of a span. Role will be set to link, or link, depending on this. */
/** It is the consumers responsibility to add aria information, rel, target, for links, and any link attributes for form submission */
export declare class CalciteLink {
  el: HTMLCalciteLinkElement;
  /** is the link disabled  */
  disabled?: boolean;
  /** optionally pass a href - used to determine if the component should render as a link or an anchor */
  href?: string;
  /** optionally pass an icon to display at the end of a button - accepts calcite ui icon names  */
  iconEnd?: string;
  /** flip the icon(s) in rtl */
  iconFlipRtl?: FlipContext;
  /** optionally pass an icon to display at the start of a button - accepts calcite ui icon names  */
  iconStart?: string;
  /** The rel attribute to apply to the hyperlink */
  rel?: string;
  /** The target attribute to apply to the hyperlink */
  target?: string;
  connectedCallback(): void;
  render(): VNode;
  setFocus(): Promise<void>;
  /** the rendered child element */
  private childEl;
  /** the node type of the rendered child element */
  private childElType;
  private storeTagRef;
}
