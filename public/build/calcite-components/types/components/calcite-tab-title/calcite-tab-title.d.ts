import { EventEmitter, VNode } from "../../stencil-public-runtime";
import { TabChangeEventDetail } from "../calcite-tab/interfaces";
import { TabID, TabLayout, TabPosition } from "../calcite-tabs/interfaces";
import { FlipContext, Scale } from "../interfaces";
export declare class CalciteTabTitle {
  el: HTMLCalciteTabTitleElement;
  /** Show this tab title as selected */
  active: boolean;
  /** Disable this tab title  */
  disabled: boolean;
  /** optionally pass an icon to display at the end of a tab title - accepts calcite ui icon names  */
  iconEnd?: string;
  /** flip the icon(s) in rtl */
  iconFlipRtl?: FlipContext;
  /** optionally pass an icon to display at the start of a tab title - accepts calcite ui icon names  */
  iconStart?: string;
  /** @internal Parent tabs component layout value */
  layout: TabLayout;
  /** @internal Parent tabs component or parent tab-nav component's position */
  position: TabPosition;
  /** @internal Parent tabs component or parent tab-nav component's scale */
  scale: Scale;
  /** @internal Parent tabs component bordered value */
  bordered?: boolean;
  /**
   * Optionally include a unique name for the tab title,
   * be sure to also set this name on the associated tab.
   */
  tab?: string;
  activeTabChanged(): void;
  connectedCallback(): void;
  disconnectedCallback(): void;
  componentWillLoad(): void;
  componentWillRender(): void;
  render(): VNode;
  componentDidLoad(): Promise<void>;
  tabChangeHandler(event: CustomEvent<TabChangeEventDetail>): void;
  onClick(): void;
  keyDownHandler(e: KeyboardEvent): void;
  /**
   * Fires when a specific tab is activated (`event.details`)
   * @see [TabChangeEventDetail](https://github.com/Esri/calcite-components/blob/master/src/components/calcite-tab/interfaces.ts#L1)
   */
  calciteTabsActivate: EventEmitter<TabChangeEventDetail>;
  /**
   * @internal
   */
  calciteTabsFocusNext: EventEmitter;
  /**
   * @internal
   */
  calciteTabsFocusPrevious: EventEmitter;
  /**
   * @internal
   */
  calciteTabTitleRegister: EventEmitter<TabID>;
  /**
   * Return the index of this title within the nav
   */
  getTabIndex(): Promise<number>;
  /**
   * @internal
   */
  getTabIdentifier(): Promise<TabID>;
  /**
   * @internal
   */
  updateAriaInfo(tabIds?: string[], titleIds?: string[]): Promise<void>;
  /** watches for changing text content **/
  private observer;
  private controls;
  /** determine if there is slotted text for styling purposes */
  private hasText?;
  /**
   * @internal
   */
  private parentTabNavEl;
  /**
   * @internal
   */
  private parentTabsEl;
  private updateHasText;
  private setupTextContentObserver;
  private emitActiveTab;
  /**
   * @internal
   */
  private guid;
}
