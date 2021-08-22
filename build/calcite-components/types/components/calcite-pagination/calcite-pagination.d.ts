import { EventEmitter, VNode } from "../../stencil-public-runtime";
import { Scale } from "../interfaces";
export interface CalcitePaginationDetail {
  start: number;
  total: number;
  num: number;
}
export declare class CalcitePagination {
  /** number of items per page */
  num: number;
  /** index of item that should begin the page */
  start: number;
  /** total number of items */
  total: number;
  /** title of the next button
   * @default "next"
   */
  textLabelNext: string;
  /** title of the previous button
   * @default "previous"
   */
  textLabelPrevious: string;
  /** The scale of the pagination */
  scale: Scale;
  el: HTMLCalcitePaginationElement;
  /**
   * Emitted whenever the selected page changes.
   * @deprecated use calcitePaginationChange instead
   */
  calcitePaginationUpdate: EventEmitter<CalcitePaginationDetail>;
  /**
   * Emitted whenever the selected page changes.
   * @see [CalcitePaginationDetail](https://github.com/Esri/calcite-components/blob/master/src/components/calcite-pagination/calcite-pagination.tsx#L18)
   */
  calcitePaginationChange: EventEmitter<CalcitePaginationDetail>;
  /** Go to the next page of results */
  nextPage(): Promise<void>;
  /** Go to the previous page of results */
  previousPage(): Promise<void>;
  private getLastStart;
  private previousClicked;
  private nextClicked;
  private showLeftEllipsis;
  private showRightEllipsis;
  private emitUpdate;
  renderPages(): VNode[];
  renderPage(start: number): VNode;
  renderLeftEllipsis(): VNode;
  renderRightEllipsis(): VNode;
  render(): VNode;
}
