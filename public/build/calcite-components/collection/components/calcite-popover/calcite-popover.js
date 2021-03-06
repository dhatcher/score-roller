import { Component, Element, Event, forceUpdate, Host, Method, Prop, State, Watch, h } from "@stencil/core";
import { CSS, ARIA_CONTROLS, ARIA_EXPANDED, HEADING_LEVEL, POPOVER_REFERENCE, TEXT } from "./resources";
import { defaultOffsetDistance, createPopper, updatePopper, CSS as PopperCSS } from "../../utils/popper";
import { guid } from "../../utils/guid";
import { getElementDir, queryElementRoots } from "../../utils/dom";
import { CSS_UTILITY } from "../../utils/resources";
import { CalciteHeading } from "../functional/CalciteHeading";
/**
 * @slot image - A slot for adding an image. The image will appear above the other slot content.
 */
export class CalcitePopover {
  constructor() {
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------
    /**
     * Display a close button within the Popover.
     * @deprecated use dismissible instead.
     */
    this.closeButton = false;
    /**
     * Display a close button within the Popover.
     */
    this.dismissible = false;
    /**
     * Prevents flipping the popover's placement when it starts to overlap its reference element.
     */
    this.disableFlip = false;
    /**
     * Removes the caret pointer.
     */
    this.disablePointer = false;
    /**
     * Offset the position of the popover away from the reference element.
     * @default 6
     */
    this.offsetDistance = defaultOffsetDistance;
    /**
     * Offset the position of the popover along the reference element.
     */
    this.offsetSkidding = 0;
    /**
     * Display and position the component.
     */
    this.open = false;
    /** Describes the type of positioning to use for the overlaid content. If your element is in a fixed container, use the 'fixed' value. */
    this.overlayPositioning = "absolute";
    /**
     * Determines where the component will be positioned relative to the referenceElement.
     * @see [PopperPlacement](https://github.com/Esri/calcite-components/blob/master/src/utils/popper.ts#L25)
     */
    this.placement = "auto";
    /** Text for close button.
     * @default "Close"
     */
    this.intlClose = TEXT.close;
    this._referenceElement = this.getReferenceElement();
    this.guid = `calcite-popover-${guid()}`;
    this.activeTransitionProp = "opacity";
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    this.getId = () => {
      return this.el.id || this.guid;
    };
    this.setExpandedAttr = () => {
      const { _referenceElement, open } = this;
      if (!_referenceElement) {
        return;
      }
      _referenceElement.setAttribute(ARIA_EXPANDED, open.toString());
    };
    this.addReferences = () => {
      const { _referenceElement } = this;
      if (!_referenceElement) {
        return;
      }
      const id = this.getId();
      _referenceElement.setAttribute(POPOVER_REFERENCE, id);
      _referenceElement.setAttribute(ARIA_CONTROLS, id);
      this.setExpandedAttr();
    };
    this.removeReferences = () => {
      const { _referenceElement } = this;
      if (!_referenceElement) {
        return;
      }
      _referenceElement.removeAttribute(POPOVER_REFERENCE);
      _referenceElement.removeAttribute(ARIA_CONTROLS);
      _referenceElement.removeAttribute(ARIA_EXPANDED);
    };
    this.hide = () => {
      this.open = false;
    };
    this.transitionEnd = (event) => {
      if (event.propertyName === this.activeTransitionProp) {
        this.open ? this.calcitePopoverOpen.emit() : this.calcitePopoverClose.emit();
      }
    };
  }
  offsetDistanceOffsetHandler() {
    this.reposition();
  }
  offsetSkiddingHandler() {
    this.reposition();
  }
  openHandler() {
    if (!this._referenceElement) {
      this.referenceElementHandler();
    }
    this.reposition();
    this.setExpandedAttr();
  }
  placementHandler() {
    this.reposition();
  }
  referenceElementHandler() {
    this.removeReferences();
    this._referenceElement = this.getReferenceElement();
    this.addReferences();
    this.createPopper();
  }
  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------
  componentDidLoad() {
    this.createPopper();
    this.addReferences();
  }
  disconnectedCallback() {
    this.removeReferences();
    this.destroyPopper();
  }
  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------
  async reposition() {
    const { popper, el, placement } = this;
    const modifiers = this.getModifiers();
    popper
      ? updatePopper({
        el,
        modifiers,
        placement,
        popper
      })
      : this.createPopper();
  }
  async setFocus(focusId) {
    var _a;
    const { closeButtonEl } = this;
    if (focusId === "close-button" && closeButtonEl) {
      forceUpdate(closeButtonEl);
      closeButtonEl.setFocus();
      return;
    }
    (_a = this.el) === null || _a === void 0 ? void 0 : _a.focus();
  }
  async toggle(value = !this.open) {
    this.open = value;
  }
  getReferenceElement() {
    const { referenceElement, el } = this;
    return ((typeof referenceElement === "string"
      ? queryElementRoots(el, `#${referenceElement}`)
      : referenceElement) || null);
  }
  getModifiers() {
    const { arrowEl, flipPlacements, disableFlip, disablePointer, offsetDistance, offsetSkidding } = this;
    const flipModifier = {
      name: "flip",
      enabled: !disableFlip
    };
    if (flipPlacements) {
      flipModifier.options = {
        fallbackPlacements: flipPlacements
      };
    }
    const arrowModifier = {
      name: "arrow",
      enabled: !disablePointer
    };
    if (arrowEl) {
      arrowModifier.options = {
        element: arrowEl
      };
    }
    const offsetModifier = {
      name: "offset",
      enabled: true,
      options: {
        offset: [offsetSkidding, offsetDistance]
      }
    };
    return [arrowModifier, flipModifier, offsetModifier];
  }
  createPopper() {
    this.destroyPopper();
    const { el, placement, _referenceElement: referenceEl, overlayPositioning } = this;
    const modifiers = this.getModifiers();
    this.popper = createPopper({
      el,
      modifiers,
      overlayPositioning,
      placement,
      referenceEl
    });
  }
  destroyPopper() {
    const { popper } = this;
    if (popper) {
      popper.destroy();
    }
    this.popper = null;
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  renderCloseButton() {
    const { dismissible, closeButton, intlClose } = this;
    return dismissible || closeButton ? (h("calcite-action", { class: CSS.closeButton, onClick: this.hide, ref: (closeButtonEl) => (this.closeButtonEl = closeButtonEl), text: intlClose },
      h("calcite-icon", { icon: "x", scale: "m" }))) : null;
  }
  renderHeader() {
    const { heading, headingLevel } = this;
    const headingNode = heading ? (h(CalciteHeading, { class: CSS.heading, level: headingLevel || HEADING_LEVEL }, heading)) : null;
    return headingNode ? (h("div", { class: CSS.header },
      headingNode,
      this.renderCloseButton())) : null;
  }
  render() {
    const { _referenceElement, el, heading, label, open, disablePointer } = this;
    const rtl = getElementDir(el) === "rtl";
    const displayed = _referenceElement && open;
    const hidden = !displayed;
    const arrowNode = !disablePointer ? (h("div", { class: CSS.arrow, ref: (arrowEl) => (this.arrowEl = arrowEl) })) : null;
    return (h(Host, { "aria-hidden": hidden.toString(), "aria-label": label, "calcite-hydrated-hidden": hidden, id: this.getId(), role: "dialog" },
      h("div", { class: {
          [CSS_UTILITY.rtl]: rtl,
          [PopperCSS.animation]: true,
          [PopperCSS.animationActive]: displayed
        }, onTransitionEnd: this.transitionEnd },
        arrowNode,
        h("div", { class: {
            [CSS.hasHeader]: !!heading,
            [CSS.container]: true
          } },
          this.renderHeader(),
          h("div", { class: CSS.content },
            h("slot", null)),
          !heading ? this.renderCloseButton() : null))));
  }
  static get is() { return "calcite-popover"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["calcite-popover.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["calcite-popover.css"]
  }; }
  static get properties() { return {
    "closeButton": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [{
            "text": "use dismissible instead.",
            "name": "deprecated"
          }],
        "text": "Display a close button within the Popover."
      },
      "attribute": "close-button",
      "reflect": true,
      "defaultValue": "false"
    },
    "dismissible": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Display a close button within the Popover."
      },
      "attribute": "dismissible",
      "reflect": true,
      "defaultValue": "false"
    },
    "disableFlip": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Prevents flipping the popover's placement when it starts to overlap its reference element."
      },
      "attribute": "disable-flip",
      "reflect": true,
      "defaultValue": "false"
    },
    "disablePointer": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Removes the caret pointer."
      },
      "attribute": "disable-pointer",
      "reflect": true,
      "defaultValue": "false"
    },
    "flipPlacements": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "Placement[]",
        "resolved": "Placement[]",
        "references": {
          "Placement": {
            "location": "import",
            "path": "@popperjs/core"
          }
        }
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "Defines the available placements that can be used when a flip occurs."
      }
    },
    "heading": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "Heading text."
      },
      "attribute": "heading",
      "reflect": false
    },
    "headingLevel": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "HeadingLevel",
        "resolved": "1 | 2 | 3 | 4 | 5 | 6",
        "references": {
          "HeadingLevel": {
            "location": "import",
            "path": "../functional/CalciteHeading"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Number at which section headings should start for this component."
      },
      "attribute": "heading-level",
      "reflect": false
    },
    "label": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": true,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Accessible name for the component"
      },
      "attribute": "label",
      "reflect": false
    },
    "offsetDistance": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [{
            "text": "6",
            "name": "default"
          }],
        "text": "Offset the position of the popover away from the reference element."
      },
      "attribute": "offset-distance",
      "reflect": true,
      "defaultValue": "defaultOffsetDistance"
    },
    "offsetSkidding": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Offset the position of the popover along the reference element."
      },
      "attribute": "offset-skidding",
      "reflect": true,
      "defaultValue": "0"
    },
    "open": {
      "type": "boolean",
      "mutable": true,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Display and position the component."
      },
      "attribute": "open",
      "reflect": true,
      "defaultValue": "false"
    },
    "overlayPositioning": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "OverlayPositioning",
        "resolved": "\"absolute\" | \"fixed\"",
        "references": {
          "OverlayPositioning": {
            "location": "import",
            "path": "../../utils/popper"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Describes the type of positioning to use for the overlaid content. If your element is in a fixed container, use the 'fixed' value."
      },
      "attribute": "overlay-positioning",
      "reflect": false,
      "defaultValue": "\"absolute\""
    },
    "placement": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "PopperPlacement",
        "resolved": "Placement | PlacementRtl | VariationRtl",
        "references": {
          "PopperPlacement": {
            "location": "import",
            "path": "../../utils/popper"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [{
            "text": " [PopperPlacement](https://github.com/Esri/calcite-components/blob/master/src/utils/popper.ts#L25)",
            "name": "see"
          }],
        "text": "Determines where the component will be positioned relative to the referenceElement."
      },
      "attribute": "placement",
      "reflect": true,
      "defaultValue": "\"auto\""
    },
    "referenceElement": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "HTMLElement | string",
        "resolved": "HTMLElement | string",
        "references": {
          "HTMLElement": {
            "location": "global"
          }
        }
      },
      "required": true,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Reference HTMLElement used to position this component according to the placement property. As a convenience, a string ID of the reference element can be used. However, setting this property to use an HTMLElement is preferred so that the component does not need to query the DOM for the referenceElement."
      },
      "attribute": "reference-element",
      "reflect": false
    },
    "intlClose": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [{
            "text": "\"Close\"",
            "name": "default"
          }],
        "text": "Text for close button."
      },
      "attribute": "intl-close",
      "reflect": false,
      "defaultValue": "TEXT.close"
    }
  }; }
  static get states() { return {
    "_referenceElement": {}
  }; }
  static get events() { return [{
      "method": "calcitePopoverClose",
      "name": "calcitePopoverClose",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Fired when the popover is closed"
      },
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      }
    }, {
      "method": "calcitePopoverOpen",
      "name": "calcitePopoverOpen",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Fired when the popover is opened"
      },
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      }
    }]; }
  static get methods() { return {
    "reposition": {
      "complexType": {
        "signature": "() => Promise<void>",
        "parameters": [],
        "references": {
          "Promise": {
            "location": "global"
          }
        },
        "return": "Promise<void>"
      },
      "docs": {
        "text": "",
        "tags": []
      }
    },
    "setFocus": {
      "complexType": {
        "signature": "(focusId?: \"close-button\") => Promise<void>",
        "parameters": [{
            "tags": [],
            "text": ""
          }],
        "references": {
          "Promise": {
            "location": "global"
          }
        },
        "return": "Promise<void>"
      },
      "docs": {
        "text": "",
        "tags": []
      }
    },
    "toggle": {
      "complexType": {
        "signature": "(value?: boolean) => Promise<void>",
        "parameters": [{
            "tags": [],
            "text": ""
          }],
        "references": {
          "Promise": {
            "location": "global"
          }
        },
        "return": "Promise<void>"
      },
      "docs": {
        "text": "",
        "tags": []
      }
    }
  }; }
  static get elementRef() { return "el"; }
  static get watchers() { return [{
      "propName": "offsetDistance",
      "methodName": "offsetDistanceOffsetHandler"
    }, {
      "propName": "offsetSkidding",
      "methodName": "offsetSkiddingHandler"
    }, {
      "propName": "open",
      "methodName": "openHandler"
    }, {
      "propName": "placement",
      "methodName": "placementHandler"
    }, {
      "propName": "referenceElement",
      "methodName": "referenceElementHandler"
    }]; }
}
