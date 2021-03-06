import { EventEmitter } from "../../stencil-public-runtime";
import { VNode } from "../../stencil-public-runtime";
import { PopperPlacement, OverlayPositioning } from "../../utils/popper";
import { Placement } from "@popperjs/core";
/**
 * @slot - A slot for adding `calcite-action`s.
 * @slot trigger - A slot for adding a `calcite-action` to trigger opening the menu.
 * @slot tooltip - A slot for adding an tooltip for the menu.
 */
export declare class CalciteActionMenu {
  connectedCallback(): void;
  disconnectedCallback(): void;
  /**
   * Indicates whether widget is expanded.
   */
  expanded: boolean;
  expandedHandler(): void;
  /**
   * Defines the available placements that can be used when a flip occurs.
   */
  flipPlacements?: Placement[];
  /**
   *  Text string for the actions menu.
   */
  label: string;
  /**
   * Opens the action menu.
   */
  open: boolean;
  openHandler(open: boolean): void;
  /** Describes the type of positioning to use for the overlaid content. If your element is in a fixed container, use the 'fixed' value. */
  overlayPositioning: OverlayPositioning;
  /**
   * Determines where the component will be positioned relative to the referenceElement.
   * @see [PopperPlacement](https://github.com/Esri/calcite-components/blob/master/src/utils/popper.ts#L25)
   */
  placement: PopperPlacement;
  /**
   * Emitted when the open property has changed.
   */
  calciteActionMenuOpenChange: EventEmitter;
  closeCalciteActionMenuOnClick(event: Event): void;
  el: HTMLCalciteActionMenuElement;
  menuButtonEl: HTMLCalciteActionElement;
  defaultMenuButtonEl: HTMLCalciteActionElement;
  menuEl: HTMLDivElement;
  actionElements: HTMLCalciteActionElement[];
  mutationObserver: MutationObserver;
  guid: string;
  menuId: string;
  menuButtonId: string;
  activeMenuItemIndex: number;
  activeMenuItemIndexHandler(): void;
  setFocus(): Promise<void>;
  connectMenuButtonEl: () => void;
  disconnectMenuButtonEl: () => void;
  setDefaultMenuButtonEl: (el: HTMLCalciteActionElement) => void;
  renderMenuButton(): VNode;
  renderMenuItems(): VNode;
  render(): VNode;
  handleCalciteActionClick: () => void;
  menuButtonClick: () => void;
  setTooltipReferenceElement: () => void;
  updateAction: (action: HTMLCalciteActionElement, index: number) => void;
  updateActions: (actions: HTMLCalciteActionElement[]) => void;
  getAssignedElements(): HTMLElement[];
  getActions: () => void;
  isValidKey(key: string, supportedKeys: string[]): boolean;
  menuButtonKeyUp: (event: KeyboardEvent) => void;
  menuButtonKeyDown: (event: KeyboardEvent) => void;
  menuActionsContainerKeyDown: (event: KeyboardEvent) => void;
  menuActionsContainerKeyUp: (event: KeyboardEvent) => void;
  handleActionNavigation: (key: string, actions: HTMLCalciteActionElement[]) => void;
  toggleOpenEnd: () => void;
  toggleOpen: (value?: boolean) => void;
}
