import { Component, h, Listen, Prop, Element } from "@stencil/core";
import { TOOLTIP_REFERENCE, TOOLTIP_DELAY_MS } from "../calcite-tooltip/resources";
import { queryElementRoots } from "../../utils/dom";
import { getKey } from "../../utils/key";
/**
 * @slot - A slot for adding elements that reference a 'calcite-tooltip' by the 'selector' property.
 */
export class CalciteTooltipManager {
  constructor() {
    this.hoverTimeouts = new WeakMap();
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------
    /**
     * CSS Selector to match reference elements for tooltips. Reference elements will be identified by this selector in order to open their associated tooltip.
     * @default `[data-calcite-tooltip-reference]`
     */
    this.selector = `[${TOOLTIP_REFERENCE}]`;
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    this.queryTooltip = (element) => {
      var _a;
      const { selector, el } = this;
      const id = (_a = element.closest(selector)) === null || _a === void 0 ? void 0 : _a.getAttribute(TOOLTIP_REFERENCE);
      return queryElementRoots(el, `#${id}`);
    };
    this.clearHoverTimeout = (tooltip) => {
      const { hoverTimeouts } = this;
      if (hoverTimeouts.has(tooltip)) {
        window.clearTimeout(hoverTimeouts.get(tooltip));
        hoverTimeouts.delete(tooltip);
      }
    };
    this.closeExistingTooltip = () => {
      const { tooltipEl } = this;
      if (tooltipEl) {
        this.toggleTooltip(tooltipEl, false);
      }
    };
    this.focusTooltip = ({ tooltip, value }) => {
      this.closeExistingTooltip();
      if (value) {
        this.clearHoverTimeout(tooltip);
      }
      this.toggleTooltip(tooltip, value);
    };
    this.toggleTooltip = (tooltip, value) => {
      tooltip.open = value;
      if (value) {
        this.tooltipEl = tooltip;
      }
    };
    this.hoverToggle = ({ tooltip, value }) => {
      const { hoverTimeouts } = this;
      hoverTimeouts.delete(tooltip);
      if (value) {
        this.closeExistingTooltip();
      }
      this.toggleTooltip(tooltip, value);
    };
    this.hoverTooltip = ({ tooltip, value }) => {
      this.clearHoverTimeout(tooltip);
      const { hoverTimeouts } = this;
      const timeoutId = window.setTimeout(() => this.hoverToggle({ tooltip, value }), TOOLTIP_DELAY_MS || 0);
      hoverTimeouts.set(tooltip, timeoutId);
    };
    this.activeTooltipHover = (event) => {
      const { tooltipEl, hoverTimeouts } = this;
      if (!tooltipEl) {
        return;
      }
      if (event.composedPath().includes(tooltipEl)) {
        this.clearHoverTimeout(tooltipEl);
      }
      else if (!hoverTimeouts.has(tooltipEl)) {
        this.hoverTooltip({ tooltip: tooltipEl, value: false });
      }
    };
    this.hoverEvent = (event, value) => {
      const tooltip = this.queryTooltip(event.target);
      this.activeTooltipHover(event);
      if (!tooltip) {
        return;
      }
      this.hoverTooltip({ tooltip, value });
    };
    this.focusEvent = (event, value) => {
      const tooltip = this.queryTooltip(event.target);
      if (!tooltip || tooltip === this.clickedTooltip) {
        this.clickedTooltip = null;
        return;
      }
      this.focusTooltip({ tooltip, value });
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
  keyUpHandler(event) {
    if (getKey(event.key) === "Escape") {
      const { tooltipEl } = this;
      if (tooltipEl) {
        this.clearHoverTimeout(tooltipEl);
        this.toggleTooltip(tooltipEl, false);
      }
    }
  }
  mouseEnterShow(event) {
    this.hoverEvent(event, true);
  }
  mouseLeaveHide(event) {
    this.hoverEvent(event, false);
  }
  clickHandler(event) {
    const clickedTooltip = this.queryTooltip(event.target);
    this.clickedTooltip = clickedTooltip;
    if (clickedTooltip) {
      this.toggleTooltip(clickedTooltip, false);
    }
  }
  focusShow(event) {
    this.focusEvent(event, true);
  }
  blurHide(event) {
    this.focusEvent(event, false);
  }
  static get is() { return "calcite-tooltip-manager"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["calcite-tooltip-manager.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["calcite-tooltip-manager.css"]
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
            "text": "`[data-calcite-tooltip-reference]`",
            "name": "default"
          }],
        "text": "CSS Selector to match reference elements for tooltips. Reference elements will be identified by this selector in order to open their associated tooltip."
      },
      "attribute": "selector",
      "reflect": false,
      "defaultValue": "`[${TOOLTIP_REFERENCE}]`"
    }
  }; }
  static get elementRef() { return "el"; }
  static get listeners() { return [{
      "name": "keyup",
      "method": "keyUpHandler",
      "target": "document",
      "capture": false,
      "passive": false
    }, {
      "name": "mouseover",
      "method": "mouseEnterShow",
      "target": undefined,
      "capture": true,
      "passive": true
    }, {
      "name": "mouseout",
      "method": "mouseLeaveHide",
      "target": undefined,
      "capture": true,
      "passive": true
    }, {
      "name": "click",
      "method": "clickHandler",
      "target": undefined,
      "capture": true,
      "passive": false
    }, {
      "name": "focus",
      "method": "focusShow",
      "target": undefined,
      "capture": true,
      "passive": false
    }, {
      "name": "blur",
      "method": "blurHide",
      "target": undefined,
      "capture": true,
      "passive": false
    }]; }
}
