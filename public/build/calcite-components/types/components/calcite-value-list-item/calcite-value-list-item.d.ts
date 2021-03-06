import { EventEmitter, VNode } from "../../stencil-public-runtime";
import { ICON_TYPES } from "../calcite-pick-list/resources";
/**
 * @slot actions-end - A slot for adding actions or content to the end side of the item.
 * @slot actions-start - A slot for adding actions or content to the start side of the item.
 */
export declare class CalciteValueListItem {
  /**
   * An optional description for this item. Will appear below the label text.
   */
  description?: string;
  /**
   * When true, the item cannot be clicked and is visually muted
   */
  disabled?: boolean;
  /**
   * @internal When false, the item cannot be deselected by user interaction.
   */
  disableDeselect: boolean;
  /**
   * When true, prevents the content of the list item from user interaction.
   */
  nonInteractive: boolean;
  /**
   * @internal - stores the activated state of the drag handle.
   */
  handleActivated?: boolean;
  /**
   * Determines the icon SVG symbol that will be shown. Options are circle, square, grip or null.
   * @see [ICON_TYPES](https://github.com/Esri/calcite-components/blob/master/src/components/calcite-pick-list/resources.ts#L5)
   */
  icon?: ICON_TYPES | null;
  /**
   * The main label for this item. Appears next to the icon.
   */
  label: string;
  /**
   * Used to provide additional metadata to an item, primarily used when the parent list has a filter.
   */
  metadata?: Record<string, unknown>;
  /**
   * Set this to true to display a remove action that removes the item from the list.
   */
  removable: boolean;
  /**
   * Set this to true to pre-select an item. Toggles when an item is checked/unchecked.
   */
  selected: boolean;
  /**
   * The item's associated value.
   */
  value: any;
  el: HTMLCalciteValueListItemElement;
  pickListItem: HTMLCalcitePickListItemElement;
  guid: string;
  toggleSelected(coerce?: boolean): Promise<void>;
  setFocus(): Promise<void>;
  /**
   * Emitted whenever the remove button is pressed.
   */
  calciteListItemRemove: EventEmitter<void>;
  calciteListItemChangeHandler(event: CustomEvent): void;
  getPickListRef: (el: HTMLCalcitePickListItemElement) => HTMLCalcitePickListItemElement;
  handleKeyDown: (event: KeyboardEvent) => void;
  handleBlur: () => void;
  handleSelectChange: (event: CustomEvent) => void;
  renderActionsEnd(): VNode;
  renderActionsStart(): VNode;
  renderHandle(): VNode;
  render(): VNode;
}
