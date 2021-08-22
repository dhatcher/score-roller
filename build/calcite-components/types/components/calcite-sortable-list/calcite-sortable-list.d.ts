import Sortable from "sortablejs";
import { EventEmitter, VNode } from "../../stencil-public-runtime";
/**
 * @slot - A slot for adding sortable items
 */
export declare class CalciteSortableList {
  /**
   * Specifies which items inside the element should be draggable.
   */
  dragSelector?: string;
  /**
   * The list's group identifier.
   *
   * To drag elements from one list into another, both lists must have the same group value.
   */
  group?: string;
  /**
   * The selector for the handle elements.
   */
  handleSelector: string;
  /**
   * When true, disabled prevents interaction. This state shows items with lower opacity/grayed.
   */
  disabled: boolean;
  /**
   * When true, content is waiting to be loaded. This state shows a busy indicator.
   */
  loading: boolean;
  el: HTMLCalciteSortableListElement;
  handleActivated: boolean;
  items: Element[];
  observer: MutationObserver;
  sortable: Sortable;
  connectedCallback(): void;
  disconnectedCallback(): void;
  /**
   * Emitted when the order of the list has changed.
   */
  calciteListOrderChange: EventEmitter;
  calciteHandleNudgeHandler(event: CustomEvent): void;
  setUpDragAndDrop(): void;
  cleanUpDragAndDrop(): void;
  beginObserving(): void;
  render(): VNode;
}
