import { Component, Element, h, Listen, Prop } from "@stencil/core";
import { POPOVER_REFERENCE } from "../calcite-popover/resources";
import { queryElementRoots, queryElementsRoots } from "../../utils/dom";
/**
 * @slot - A slot for adding elements that reference a 'calcite-popover' by the 'selector' property.
 */
export class CalcitePopoverManager {
  constructor() {
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------
    /**
     * CSS Selector to match reference elements for popovers. Reference elements will be identified by this selector in order to open their associated popover.
     * @default `[data-calcite-popover-reference]`
     */
    this.selector = `[${POPOVER_REFERENCE}]`;
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    this.getRelatedPopover = (element) => {
      var _a;
      const { selector, el } = this;
      const id = (_a = element.closest(selector)) === null || _a === void 0 ? void 0 : _a.getAttribute(POPOVER_REFERENCE);
      return queryElementRoots(el, `#${id}`);
    };
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  render() {
    return h("slot", null);
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  closeOpenPopovers(event) {
    const target = event.target;
    const { autoClose, el } = this;
    const popoverSelector = "calcite-popover";
    const isTargetInsidePopover = target.closest(popoverSelector);
    const relatedPopover = this.getRelatedPopover(target);
    if (autoClose && !isTargetInsidePopover) {
      queryElementsRoots(el, popoverSelector)
        .filter((popover) => popover.open && popover !== relatedPopover)
        .forEach((popover) => popover.toggle(false));
    }
    if (!el.contains(target) || !relatedPopover) {
      return;
    }
    relatedPopover.toggle();
  }
  static get is() { return "calcite-popover-manager"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["calcite-popover-manager.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["calcite-popover-manager.css"]
  }; }
  static get properties() { return {
    "selector": {
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
            "text": "`[data-calcite-popover-reference]`",
            "name": "default"
          }],
        "text": "CSS Selector to match reference elements for popovers. Reference elements will be identified by this selector in order to open their associated popover."
      },
      "attribute": "selector",
      "reflect": false,
      "defaultValue": "`[${POPOVER_REFERENCE}]`"
    },
    "autoClose": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "Automatically closes any currently open popovers when clicking outside of a popover."
      },
      "attribute": "auto-close",
      "reflect": true
    }
  }; }
  static get elementRef() { return "el"; }
  static get listeners() { return [{
      "name": "click",
      "method": "closeOpenPopovers",
      "target": "window",
      "capture": true,
      "passive": false
    }]; }
}
