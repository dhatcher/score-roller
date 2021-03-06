/// <reference types="lodash" />
import { Event, EventEmitter, VNode } from "../../stencil-public-runtime";
import { OverlayPositioning } from "../../utils/popper";
import { StrictModifiers } from "@popperjs/core";
import { Scale } from "../interfaces";
import { ComboboxSelectionMode, ComboboxChildElement } from "./interfaces";
interface ItemData {
  label: string;
  value: string;
}
export declare class CalciteCombobox {
  el: HTMLCalciteComboboxElement;
  /** Open and close combobox */
  active: boolean;
  activeHandler(newValue: boolean, oldValue: boolean): void;
  /** Disable combobox input */
  disabled: boolean;
  /** Aria label for combobox (required) */
  label: string;
  /** Placeholder text for input */
  placeholder?: string;
  /** Specify the maximum number of combobox items (including nested children) to display before showing the scroller */
  maxItems: number;
  maxItemsHandler(): void;
  /** Allow entry of custom values which are not in the original set of items */
  allowCustomValues: boolean;
  /** Describes the type of positioning to use for the overlaid content. If your element is in a fixed container, use the 'fixed' value. */
  overlayPositioning: OverlayPositioning;
  /** specify the selection mode
   * - multi: allow any number of selected items (default)
   * - single: only one selection)
   * - ancestors: like multi, but show ancestors of selected items as selected, only deepest children shown in chips
   */
  selectionMode: ComboboxSelectionMode;
  /** Specify the scale of the combobox, defaults to m */
  scale: Scale;
  documentClickHandler(event: Event): void;
  calciteComboboxItemChangeHandler(event: CustomEvent<HTMLCalciteComboboxItemElement>): void;
  reposition(): Promise<void>;
  setFocus(): Promise<void>;
  /**
   * Called when the selected items set changes
   * @deprecated use calciteComboboxChange instead
   */
  calciteLookupChange: EventEmitter<HTMLCalciteComboboxItemElement[]>;
  /**
   * Called when the selected item(s) changes.
   */
  calciteComboboxChange: EventEmitter<{
    selectedItems: HTMLCalciteComboboxItemElement[];
  }>;
  /** Called when the user has entered text to filter the options list */
  calciteComboboxFilterChange: EventEmitter<{
    visibleItems: HTMLCalciteComboboxItemElement[];
    text: string;
  }>;
  /** Called when a selected item in the combobox is dismissed via its chip **/
  calciteComboboxChipDismiss: EventEmitter;
  /**
   * Fired when the combobox is opened
   * @internal
   */
  calciteComboboxOpen: EventEmitter;
  /**
   *  Fired when the combobox is closed
   * @internal
   */
  calciteComboboxClose: EventEmitter;
  connectedCallback(): void;
  componentWillLoad(): void;
  componentDidLoad(): void;
  componentDidRender(): void;
  disconnectedCallback(): void;
  items: HTMLCalciteComboboxItemElement[];
  groupItems: HTMLCalciteComboboxItemGroupElement[];
  selectedItems: HTMLCalciteComboboxItemElement[];
  visibleItems: HTMLCalciteComboboxItemElement[];
  needsIcon: boolean;
  hideList: boolean;
  activeItemIndex: number;
  activeChipIndex: number;
  activeDescendant: string;
  text: string;
  open: boolean;
  /** specifies the item wrapper height; it is updated when maxItems is > 0  **/
  maxScrollerHeight: number;
  /** when search text is cleared, reset active to  */
  textHandler(): void;
  textInput: HTMLInputElement;
  data: ItemData[];
  observer: MutationObserver;
  private guid;
  private inputHeight;
  private popper;
  private menuEl;
  private referenceEl;
  private listContainerEl;
  private ignoreSelectedEventsFlag;
  private activeTransitionProp;
  keydownHandler: (event: KeyboardEvent) => void;
  private toggleCloseEnd;
  private toggleOpenEnd;
  transitionEnd: (event: TransitionEvent) => void;
  setMaxScrollerHeight: () => void;
  calciteChipDismissHandler: (event: CustomEvent<HTMLCalciteChipElement>, comboboxItem: HTMLCalciteComboboxItemElement) => void;
  setFocusClick: () => void;
  setInactiveIfNotContained: (event: Event) => void;
  setMenuEl: (el: HTMLDivElement) => void;
  setListContainerEl: (el: HTMLDivElement) => void;
  setReferenceEl: (el: HTMLDivElement) => void;
  getModifiers(): Partial<StrictModifiers>[];
  createPopper(): void;
  destroyPopper(): void;
  private getMaxScrollerHeight;
  private calculateSingleItemHeight;
  inputHandler: (event: Event) => void;
  getCombinedItems(): ComboboxChildElement[];
  filterItems: import("lodash").DebouncedFunc<(text: string) => void>;
  internalCalciteLookupChangeEvent: () => void;
  emitCalciteLookupChange: import("lodash").DebouncedFunc<() => void>;
  internalComboboxChangeEvent: () => void;
  emitComboboxChange: import("lodash").DebouncedFunc<() => void>;
  toggleSelection(item: HTMLCalciteComboboxItemElement, value?: boolean): void;
  updateAncestors(item: HTMLCalciteComboboxItemElement): void;
  getVisibleItems(): HTMLCalciteComboboxItemElement[];
  getSelectedItems(): HTMLCalciteComboboxItemElement[];
  updateItems: () => void;
  getData(): ItemData[];
  getNeedsIcon(): boolean;
  resetText(): void;
  getItems(): HTMLCalciteComboboxItemElement[];
  getGroupItems(): HTMLCalciteComboboxItemGroupElement[];
  addCustomChip(value: string, focus?: boolean): void;
  removeActiveChip(): void;
  removeLastChip(): void;
  previousChip(): void;
  nextChip(): void;
  focusChip(): void;
  shiftActiveItemIndex(delta: number): void;
  updateActiveItemIndex(index: number): void;
  isMulti(): boolean;
  comboboxFocusHandler: () => void;
  comboboxBlurHandler: (event: FocusEvent) => void;
  renderChips(): VNode[];
  renderInput(): VNode;
  renderListBoxOptions(): VNode[];
  renderPopperContainer(): VNode;
  renderIconStart(): VNode;
  renderIconEnd(): VNode;
  render(): VNode;
}
export {};
