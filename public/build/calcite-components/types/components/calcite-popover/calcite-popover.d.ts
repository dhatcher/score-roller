import { EventEmitter, VNode } from "../../stencil-public-runtime";
import { PopperPlacement, OverlayPositioning } from "../../utils/popper";
import { StrictModifiers, Placement, Instance as Popper } from "@popperjs/core";
import { HeadingLevel } from "../functional/CalciteHeading";
/**
 * @slot image - A slot for adding an image. The image will appear above the other slot content.
 */
export declare class CalcitePopover {
  /**
   * Display a close button within the Popover.
   * @deprecated use dismissible instead.
   */
  closeButton: boolean;
  /**
   * Display a close button within the Popover.
   */
  dismissible: boolean;
  /**
   * Prevents flipping the popover's placement when it starts to overlap its reference element.
   */
  disableFlip: boolean;
  /**
   * Removes the caret pointer.
   */
  disablePointer: boolean;
  /**
   * Defines the available placements that can be used when a flip occurs.
   */
  flipPlacements?: Placement[];
  /**
   * Heading text.
   */
  heading?: string;
  /**
   * Number at which section headings should start for this component.
   */
  headingLevel: HeadingLevel;
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
  /** Text for close button.
   * @default "Close"
   */
  intlClose: string;
  el: HTMLCalcitePopoverElement;
  _referenceElement: HTMLElement;
  popper: Popper;
  arrowEl: HTMLDivElement;
  closeButtonEl: HTMLCalciteActionElement;
  guid: string;
  private activeTransitionProp;
  componentDidLoad(): void;
  disconnectedCallback(): void;
  /** Fired when the popover is closed */
  calcitePopoverClose: EventEmitter;
  /** Fired when the popover is opened */
  calcitePopoverOpen: EventEmitter;
  reposition(): Promise<void>;
  setFocus(focusId?: "close-button"): Promise<void>;
  toggle(value?: boolean): Promise<void>;
  getId: () => string;
  setExpandedAttr: () => void;
  addReferences: () => void;
  removeReferences: () => void;
  getReferenceElement(): HTMLElement;
  getModifiers(): Partial<StrictModifiers>[];
  createPopper(): void;
  destroyPopper(): void;
  hide: () => void;
  transitionEnd: (event: TransitionEvent) => void;
  renderCloseButton(): VNode;
  renderHeader(): VNode;
  render(): VNode;
}
