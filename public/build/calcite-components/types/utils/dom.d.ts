/**
 * This helper will guarantee an ID on the provided element.
 *
 * If it already has an ID, it will be preserved, otherwise a unique one will be generated and assigned.
 *
 * @returns {string} The element's ID.
 */
export declare function ensureId(el: Element): string;
export declare function nodeListToArray<T extends Element>(nodeList: HTMLCollectionOf<T> | NodeListOf<T> | T[]): T[];
export declare type Direction = "ltr" | "rtl";
export declare function getThemeName(el: HTMLElement): "light" | "dark";
export declare function getElementDir(el: HTMLElement): Direction;
export declare function getElementProp(el: Element, prop: string, fallbackValue: any): any;
export declare function getRootNode(el: Element): HTMLDocument | ShadowRoot;
export declare function getHost(root: HTMLDocument | ShadowRoot): Element | null;
export declare function queryElementsRoots<T extends Element = Element>(element: Element, selector: string): T[];
export declare function queryElementRoots<T extends Element = Element>(element: Element, selector: string): T | null;
export declare function closestElementCrossShadowBoundary<T extends Element = Element>(element: Element, selector: string): T | null;
export interface CalciteFocusableElement extends HTMLElement {
  setFocus?: () => Promise<void>;
}
export declare function isCalciteFocusable(el: CalciteFocusableElement): boolean;
export declare function focusElement(el: CalciteFocusableElement): Promise<void>;
interface GetSlottedOptions {
  all?: boolean;
  direct?: boolean;
  selector?: string;
}
export declare function getSlotted<T extends Element = Element>(element: Element, slotName: string, options: GetSlottedOptions & {
  all: true;
}): T[];
export declare function getSlotted<T extends Element = Element>(element: Element, slotName: string, options?: GetSlottedOptions): T | null;
export declare function filterDirectChildren<T extends Element>(el: Element, selector: string): T[];
export declare function hasLabel(labelEl: HTMLCalciteLabelElement, el: HTMLElement): boolean;
export declare function setRequestedIcon(iconObject: Record<string, string>, iconValue: string | boolean, matchedValue: string): string;
export declare function intersects(rect1: DOMRect, rect2: DOMRect): boolean;
export {};
