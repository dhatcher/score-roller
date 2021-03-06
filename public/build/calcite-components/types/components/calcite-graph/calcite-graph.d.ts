import { VNode } from "../../stencil-public-runtime";
import { ColorStop, DataSeries } from "./interfaces";
export declare class CalciteGraph {
  el: HTMLCalciteGraphElement;
  /**
   * Array of tuples describing a single data point ([x, y])
   * These data points should be sorted by x-axis value
   */
  data: DataSeries;
  /**
   * Array of values describing a single color stop ([offset, color, opacity])
   * These color stops should be sorted by offset value
   */
  colorStops: ColorStop[];
  /** Width of graph in pixels*/
  width: number;
  /** Width of graph in pixels*/
  height: number;
  /** Start of highlight color if highlighting range */
  highlightMin: number;
  /** End of highlight color if highlighting range */
  highlightMax: number;
  render(): VNode;
  private graphId;
}
