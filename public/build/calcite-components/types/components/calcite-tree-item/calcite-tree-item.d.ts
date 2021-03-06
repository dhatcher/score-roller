import { EventEmitter, VNode } from "../../stencil-public-runtime";
import { TreeItemSelectDetail } from "./interfaces";
export declare class CalciteTreeItem {
  el: HTMLCalciteTreeItemElement;
  /** Is the item currently selected */
  selected: boolean;
  /** True if the item is in an expanded state */
  expanded: boolean;
  expandedHandler(newValue: boolean): void;
  /** @internal Is the parent of this item expanded? */
  parentExpanded: boolean;
  /** @internal What level of depth is this item at? */
  depth: number;
  /** @internal Does this tree item have a tree inside it? */
  hasChildren: boolean;
  /** @internal Draw lines (set on parent) */
  lines: boolean;
  /** @internal Display checkboxes (set on parent) */
  inputEnabled: boolean;
  /** @internal Scale of the parent tree, defaults to m */
  scale: "s" | "m";
  /**
   * @internal
   * In ancestor selection mode using inputEnabled,
   * show as indeterminate when only some children are selected
   **/
  indeterminate: boolean;
  connectedCallback(): void;
  componentWillRender(): void;
  render(): VNode;
  onClick(e: Event): void;
  iconClickHandler: (event: MouseEvent) => void;
  childrenClickHandler: (event: MouseEvent) => void;
  keyDownHandler(e: KeyboardEvent): void;
  /**
   * @internal
   */
  calciteTreeItemSelect: EventEmitter<TreeItemSelectDetail>;
  private selectionMode;
  childrenSlotWrapper: HTMLElement;
  defaultSlotWrapper: HTMLElement;
}
