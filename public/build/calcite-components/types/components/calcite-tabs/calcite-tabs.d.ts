import { VNode } from "../../stencil-public-runtime";
import { TabLayout, TabPosition } from "./interfaces";
import { Scale } from "../interfaces";
export declare class CalciteTabs {
  el: HTMLCalciteTabsElement;
  /**
   * Align tab titles to the edge or fully justify them across the tab nav ("center")
   */
  layout: TabLayout;
  /**
   * Display the tabs above (default) or below the tab content
   */
  position: TabPosition;
  /**
   * Specify the scale of the tabs component, defaults to m
   */
  scale: Scale;
  /**
   * Optionally enable tabs to appear like a folder-style menu when its layout is "inline"
   */
  bordered?: boolean;
  connectedCallback(): void;
  render(): VNode;
  /**
   * @internal
   */
  calciteTabTitleRegister(e: CustomEvent): void;
  /**
   * @internal
   */
  calciteTabTitleUnregister(e: CustomEvent): void;
  /**
   * @internal
   */
  calciteTabRegister(e: CustomEvent): void;
  /**
   * @internal
   */
  calciteTabUnregister(e: CustomEvent): void;
  /**
   * @internal
   *
   * Stores an array of ids of `<calcite-tab-titles>`s to match up ARIA
   * attributes.
   */
  titles: HTMLCalciteTabTitleElement[];
  /**
   * @internal
   *
   * Stores an array of ids of `<calcite-tab>`s to match up ARIA attributes.
   */
  tabs: HTMLCalciteTabElement[];
  /**
   * @internal
   *
   * Matches up elements from the internal `tabs` and `titles` to automatically
   * update the ARIA attributes and link `<calcite-tab>` and
   * `<calcite-tab-title>` components.
   */
  private registryHandler;
}
