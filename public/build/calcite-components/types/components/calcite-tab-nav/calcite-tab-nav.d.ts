import { EventEmitter, VNode } from "../../stencil-public-runtime";
import { TabChangeEventDetail } from "../calcite-tab/interfaces";
import { TabID, TabLayout } from "../calcite-tabs/interfaces";
import { TabPosition } from "../calcite-tabs/interfaces";
import { Scale } from "../interfaces";
export declare class CalciteTabNav {
  el: HTMLCalciteTabNavElement;
  /**
   * Name to use when saving selected tab data to localStorage
   */
  storageId: string;
  /**
   * Pass the same string to multiple tab navs to keep them all in sync if one changes
   */
  syncId: string;
  /** @internal Parent tabs component scale value */
  scale: Scale;
  /** @internal Parent tabs component layout value */
  layout: TabLayout;
  /** @internal Parent tabs component position value */
  position: TabPosition;
  /** @internal Parent tabs component bordered value when layout is "inline" */
  bordered?: boolean;
  /**
   * @internal
   */
  selectedTab: TabID;
  /**
   * @internal
   */
  selectedTabEl: HTMLCalciteTabTitleElement;
  /**
   * @internal
   */
  indicatorOffset: number;
  /**
   * @internal
   */
  indicatorWidth: number;
  selectedTabChanged(): Promise<void>;
  selectedTabElChanged(): void;
  componentWillLoad(): void;
  componentWillRender(): void;
  componentDidRender(): void;
  render(): VNode;
  resizeHandler(): void;
  focusPreviousTabHandler(e: CustomEvent): void;
  focusNextTabHandler(e: CustomEvent): void;
  activateTabHandler(e: CustomEvent<TabChangeEventDetail>): void;
  /**
   * Check for active tabs on register and update selected
   */
  updateTabTitles(e: CustomEvent<TabID>): void;
  globalTabChangeHandler(e: CustomEvent<TabChangeEventDetail>): void;
  /**
   * Emitted when the active tab changes
   * @see [TabChangeEventDetail](https://github.com/Esri/calcite-components/blob/master/src/components/calcite-tab/interfaces.ts#L1)
   */
  calciteTabChange: EventEmitter<TabChangeEventDetail>;
  private tabNavEl;
  private activeIndicatorEl;
  private activeIndicatorContainerEl;
  private animationActiveDuration;
  private handleContainerScroll;
  private updateOffsetPosition;
  private updateActiveWidth;
  private getIndexOfTabTitle;
  private getTabTitleById;
  private get tabTitles();
  private get enabledTabTitles();
}
