import { CalcitePickList } from "./calcite-pick-list";
import { CalciteValueList } from "../calcite-value-list/calcite-value-list";
declare type Lists = CalcitePickList | CalciteValueList;
declare type ListItemElement<T> = T extends CalcitePickList ? HTMLCalcitePickListItemElement : HTMLCalciteValueListItemElement;
declare type List<T> = T extends CalcitePickList ? CalcitePickList : CalciteValueList;
export declare type ListFocusId = "filter";
export declare function mutationObserverCallback<T extends Lists>(this: List<T>): void;
export declare function initialize<T extends Lists>(this: List<T>): void;
export declare function initializeObserver<T extends Lists>(this: List<T>): void;
export declare function cleanUpObserver<T extends Lists>(this: List<T>): void;
export declare function calciteListItemChangeHandler<T extends Lists>(this: List<T>, event: CustomEvent): void;
export declare function calciteListItemValueChangeHandler<T extends Lists>(this: List<T>, event: CustomEvent): void;
export declare function calciteListFocusOutHandler<T extends Lists>(this: List<T>, event: FocusEvent): void;
export declare function keyDownHandler<T extends Lists>(this: List<T>, event: KeyboardEvent): void;
export declare function internalCalciteListChangeEvent<T extends Lists>(this: List<T>): void;
export declare function removeItem<T extends Lists, U extends ListItemElement<T>>(this: List<T>, event: CustomEvent): void;
export declare function setFocus<T extends Lists>(this: List<T>, focusId: ListFocusId): Promise<void>;
export declare function setUpItems<T extends Lists>(this: List<T>, tagName: T extends CalcitePickList ? "calcite-pick-list-item" : "calcite-value-list-item"): void;
export declare function setUpFilter<T extends Lists>(this: List<T>): void;
export declare function deselectSiblingItems<T extends Lists>(this: List<T>, item: ListItemElement<T>): void;
export declare function selectSiblings<T extends Lists>(this: List<T>, item: ListItemElement<T>, deselect?: boolean): void;
export declare function handleFilter<T extends Lists>(this: List<T>, event: CustomEvent): void;
export declare type ItemData = {
  label: string;
  description: string;
  metadata: Record<string, unknown>;
  value: string;
}[];
export declare function getItemData<T extends Lists>(this: List<T>): ItemData;
export {};
