import { createPopper as setupPopper } from "@popperjs/core";
import { getElementDir } from "./dom";
export const CSS = {
  animation: "calcite-popper-anim",
  animationActive: "calcite-popper-anim--active"
};
export function getPlacement(el, placement) {
  const placements = ["left", "right"];
  const variations = ["start", "end"];
  if (getElementDir(el) === "rtl") {
    placements.reverse();
    variations.reverse();
  }
  return placement
    .replace(/-leading/gi, `-${variations[0]}`)
    .replace(/-trailing/gi, `-${variations[1]}`)
    .replace(/leading/gi, placements[0])
    .replace(/trailing/gi, placements[1]);
}
export function createPopper({ referenceEl, el, placement, overlayPositioning = "absolute", modifiers }) {
  if (!referenceEl) {
    return null;
  }
  return setupPopper(referenceEl, el, {
    strategy: overlayPositioning,
    placement: getPlacement(el, placement),
    modifiers
  });
}
export function updatePopper({ el, modifiers, placement: PopperPlacement, popper }) {
  const placement = getPlacement(el, PopperPlacement);
  popper.setOptions({
    modifiers,
    placement
  });
}
export function hypotenuse(sideA, sideB) {
  return Math.sqrt(Math.pow(sideA, 2) + Math.pow(sideB, 2));
}
const visiblePointerSize = 4;
export const defaultOffsetDistance = Math.ceil(hypotenuse(visiblePointerSize, visiblePointerSize));
