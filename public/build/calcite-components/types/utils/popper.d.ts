import { Placement, Instance as Popper, StrictModifiers, PositioningStrategy } from "@popperjs/core";
declare type PlacementRtl = "leading-start" | "leading" | "leading-end" | "trailing-end" | "trailing" | "trailing-start";
declare type VariationRtl = "leading-leading" | "leading-trailing" | "trailing-leading" | "trailing-trailing" | "top-leading" | "top-trailing" | "bottom-leading" | "bottom-trailing" | "right-leading" | "right-trailing" | "left-leading" | "left-trailing";
export declare type PopperPlacement = Placement | PlacementRtl | VariationRtl;
export declare type OverlayPositioning = PositioningStrategy;
export declare const CSS: {
  animation: string;
  animationActive: string;
};
export declare function getPlacement(el: HTMLElement, placement: PopperPlacement): Placement;
export declare function createPopper({ referenceEl, el, placement, overlayPositioning, modifiers }: {
  el: HTMLElement;
  modifiers: Partial<StrictModifiers>[];
  overlayPositioning: PositioningStrategy;
  placement: PopperPlacement;
  referenceEl: HTMLElement;
}): Popper | null;
export declare function updatePopper({ el, modifiers, placement: PopperPlacement, popper }: {
  el: HTMLElement;
  modifiers: Partial<StrictModifiers>[];
  popper: Popper;
  placement: PopperPlacement;
}): void;
export declare function hypotenuse(sideA: number, sideB: number): number;
export declare const defaultOffsetDistance: number;
export {};
