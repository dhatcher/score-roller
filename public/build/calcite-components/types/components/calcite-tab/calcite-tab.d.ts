import { EventEmitter, VNode } from "../../stencil-public-runtime";
import { TabChangeEventDetail } from "./interfaces";
import { Scale } from "../interfaces";
export declare class CalciteTab {
  el: HTMLCalciteTabElement;
  /**
   * Optionally include a unique name for this tab,
   * be sure to also set this name on the associated title.
   */
  tab: string;
  /**
   * Show this tab
   */
  active: boolean;
  /** @internal Parent tabs component scale value */
  scale: Scale;
  render(): VNode;
  componentDidLoad(): void;
  componentWillRender(): void;
  disconnectedCallback(): void;
  /**
   * @internal
   */
  calciteTabRegister: EventEmitter;
  tabChangeHandler(event: CustomEvent<TabChangeEventDetail>): void;
  /**
   * Return the index of this tab within the tab array
   */
  getTabIndex(): Promise<number>;
  /**
   * @internal
   */
  private guid;
  private labeledBy;
  /**
   * @internal
   */
  updateAriaInfo(tabIds?: string[], titleIds?: string[]): Promise<void>;
}
