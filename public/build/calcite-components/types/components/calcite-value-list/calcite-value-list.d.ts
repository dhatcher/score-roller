import Sortable from "sortablejs";
import { EventEmitter, VNode } from "../../stencil-public-runtime";
import { ICON_TYPES } from "./resources";
import { ListFocusId, ItemData } from "../calcite-pick-list/shared-list-logic";
/**
 * @slot - A slot for adding `calcite-pick-list-item` elements or `calcite-pick-list-group` elements. Items are displayed as a vertical list.
 * @slot menu-actions - A slot for adding a button + menu combo for performing actions like sorting.
 */
export declare class CalciteValueList<ItemElement extends HTMLCalciteValueListItemElement = HTMLCalciteValueListItemElement> {
  /**
   * When true, disabled prevents interaction. This state shows items with lower opacity/grayed.
   */
  disabled: boolean;
  /**
   * When true, the items will be sortable via drag and drop.
   */
  dragEnabled: boolean;
  /**
   * When true, an input appears at the top of the list that can be used by end users to filter items in the list.
   */
  filterEnabled: boolean;
  /**
   * Placeholder text for the filter input field.
   */
  filterPlaceholder: string;
  /**
   * The list's group identifier.
   *
   * To drag elements from one list into another, both lists must have the same group value.
   */
  group?: string;
  /**
   * When true, content is waiting to be loaded. This state shows a busy indicator.
   */
  loading: boolean;
  /**
   * Multiple Works similar to standard radio buttons and checkboxes.
   * When true, a user can select multiple items at a time.
   * When false, only a single item can be selected at a time
   * and selecting a new item will deselect any other selected items.
   */
  multiple: boolean;
  /**
   * When true and single-selection is enabled, the selection will change when navigating items via the keyboard.
   */
  selectionFollowsFocus: boolean;
  selectedValues: Map<string, ItemElement>;
  dataForFilter: ItemData;
  items: ItemElement[];
  lastSelectedItem: ItemElement;
  observer: MutationObserver;
  sortable: Sortable;
  el: HTMLCalciteValueListElement;
  emitCalciteListChange: () => void;
  filterEl: HTMLCalciteFilterElement;
  connectedCallback(): void;
  componentDidLoad(): void;
  disconnectedCallback(): void;
  /**
   * Emitted when any of the item selections have changed.
   */
  calciteListChange: EventEmitter;
  /**
   * Emitted when the order of the list has changed.
   */
  calciteListOrderChange: EventEmitter;
  calciteListItemRemoveHandler(event: CustomEvent<void>): void;
  calciteListItemChangeHandler(event: CustomEvent): void;
  calciteListItemPropsChangeHandler(event: CustomEvent): void;
  calciteListItemValueChangeHandler(event: CustomEvent): void;
  setUpItems(): void;
  setUpFilter(): void;
  setFilterEl: (el: HTMLCalciteFilterElement) => void;
  setUpDragAndDrop(): void;
  cleanUpDragAndDrop(): void;
  deselectSiblingItems: any;
  selectSiblings: any;
  handleFilter: any;
  getItemData: any;
  keyDownHandler: (event: KeyboardEvent) => void;
  getSelectedItems(): Promise<Map<string, HTMLCalciteValueListItemElement>>;
  setFocus(focusId?: ListFocusId): Promise<void>;
  getIconType(): ICON_TYPES | null;
  render(): VNode;
}
