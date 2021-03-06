import { VNode } from "../../stencil-public-runtime";
import { StrictModifiers, Instance as Popper } from "@popperjs/core";
import { PopperPlacement, OverlayPositioning } from "../../utils/popper";
export declare class CalciteTooltip {
  /** Accessible name for the component */
  label: string;
  /**
   * Offset the position of the popover away from the reference element.
   * @default 6
   */
  offsetDistance: number;
  offsetDistanceOffsetHandler(): void;
  /**
   * Offset the position of the popover along the reference element.
   */
  offsetSkidding: number;
  offsetSkiddingHandler(): void;
  /**
   * Display and position the component.
   */
  open: boolean;
  openHandler(): void;
  /** Describes the type of positioning to use for the overlaid content. If your element is in a fixed container, use the 'fixed' value. */
  overlayPositioning: OverlayPositioning;
  /**
   * Determines where the component will be positioned relative to the referenceElement.
   * @see [PopperPlacement](https://github.com/Esri/calcite-components/blob/master/src/utils/popper.ts#L25)
   */
  placement: PopperPlacement;
  placementHandler(): void;
  /**
   * Reference HTMLElement used to position this component according to the placement property. As a convenience, a string ID of the reference element can be used. However, setting this property to use an HTMLElement is preferred so that the component does not need to query the DOM for the referenceElement.
   */
  referenceElement: HTMLElement | string;
  referenceElementHandler(): void;
  el: HTMLCalciteTooltipElement;
  _referenceElement: HTMLElement;
  arrowEl: HTMLDivElement;
  popper: Popper;
  guid: string;
  componentDidLoad(): void;
  disconnectedCallback(): void;
  reposition(): Promise<void>;
  getId: () => string;
  addReferences: () => void;
  removeReferences: () => void;
  show: () => void;
  hide: () => void;
  getReferenceElement(): HTMLElement;
  getModifiers(): Partial<StrictModifiers>[];
  createPopper(): void;
  destroyPopper(): void;
  render(): VNode;
}
