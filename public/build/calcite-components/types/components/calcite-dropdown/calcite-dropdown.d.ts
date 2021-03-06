import { EventEmitter, VNode } from "../../stencil-public-runtime";
import { DropdownPlacement, ItemKeyboardEvent } from "./interfaces";
import { OverlayPositioning } from "../../utils/popper";
import { StrictModifiers } from "@popperjs/core";
import { Scale } from "../interfaces";
export declare class CalciteDropdown {
  el: HTMLCalciteDropdownElement;
  active: boolean;
  activeHandler(): void;
  /**
   allow the dropdown to remain open after a selection is made
   if the selection-mode of the selected item's containing group is "none", the dropdown will always close
   */
  disableCloseOnSelect: boolean;
  /** is the dropdown disabled  */
  disabled?: boolean;
  /**
   specify the maximum number of calcite-dropdown-items to display before showing the scroller, must be greater than 0 -
   this value does not include groupTitles passed to calcite-dropdown-group
  */
  maxItems: number;
  /** Describes the type of positioning to use for the overlaid content. If your element is in a fixed container, use the 'fixed' value. */
  overlayPositioning: OverlayPositioning;
  /**
   * Determines where the dropdown will be positioned relative to the button.
   * @default "bottom-leading"
   */
  placement: DropdownPlacement;
  placementHandler(): void;
  /** specify the scale of dropdown, defaults to m */
  scale: Scale;
  /**
   * **read-only** The currently selected items
   *
   * @readonly
   */
  selectedItems: HTMLCalciteDropdownItemElement[];
  /** specify whether the dropdown is opened by hover or click of a trigger element */
  type: "hover" | "click";
  /** specify the width of dropdown, defaults to m */
  width: Scale;
  connectedCallback(): void;
  componentWillLoad(): void;
  componentDidLoad(): void;
  disconnectedCallback(): void;
  render(): VNode;
  reposition(): Promise<void>;
  /** fires when a dropdown item has been selected or deselected **/
  calciteDropdownSelect: EventEmitter<void>;
  /** fires when a dropdown has been opened **/
  calciteDropdownOpen: EventEmitter<void>;
  /** fires when a dropdown has been closed **/
  calciteDropdownClose: EventEmitter<void>;
  closeCalciteDropdownOnClick(e: Event): void;
  closeCalciteDropdownOnEvent(): void;
  closeCalciteDropdownOnOpenEvent(e: Event): void;
  mouseEnterHandler(): void;
  mouseLeaveHandler(): void;
  calciteDropdownItemKeyEvent(e: CustomEvent<ItemKeyboardEvent>): void;
  handleItemSelect(event: CustomEvent): void;
  private items;
  /** specifies the item wrapper height; it is updated when maxItems is > 0  **/
  private maxScrollerHeight;
  /** trigger elements */
  private triggers;
  private popper;
  private menuEl;
  private referenceEl;
  private activeTransitionProp;
  transitionEnd: (event: TransitionEvent) => void;
  setReferenceEl: (el: HTMLDivElement) => void;
  setMenuEl: (el: HTMLDivElement) => void;
  getModifiers(): Partial<StrictModifiers>[];
  createPopper(): void;
  destroyPopper(): void;
  private openDropdown;
  private keyDownHandler;
  private updateSelectedItems;
  private getMaxScrollerHeight;
  private closeCalciteDropdown;
  private focusOnFirstActiveOrFirstItem;
  private focusFirstItem;
  private focusLastItem;
  private focusNextItem;
  private focusPrevItem;
  private itemIndex;
  private getFocusableElement;
  private toggleOpenEnd;
  private openCalciteDropdown;
}
