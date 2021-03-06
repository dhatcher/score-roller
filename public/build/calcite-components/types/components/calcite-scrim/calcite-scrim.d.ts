import { VNode } from "../../stencil-public-runtime";
export declare class CalciteScrim {
  /** string to override English loading text
   * @default "Loading"
   */
  intlLoading?: string;
  /**
   * Determines if the component will have the loader overlay.
   * Otherwise, will render opaque disabled state.
   */
  loading: boolean;
  render(): VNode;
}
