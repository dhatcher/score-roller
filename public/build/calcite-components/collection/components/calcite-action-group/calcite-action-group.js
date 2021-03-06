import { Component, h, Prop, Watch, Element } from "@stencil/core";
import { SLOTS, TEXT, ICONS } from "./resources";
import { Fragment } from "@stencil/core/internal";
import { getSlotted } from "../../utils/dom";
import { SLOTS as ACTION_MENU_SLOTS } from "../calcite-action-menu/resources";
/**
 * @slot - A slot for adding a group of `calcite-action`s.
 * @slot menu-actions - a slot for adding an overflow menu with actions inside a dropdown.
 * @slot menu-tooltip - a slot for adding an tooltip for the menu.
 */
export class CalciteActionGroup {
  constructor() {
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------
    /**
     * Indicates whether widget is expanded.
     */
    this.expanded = false;
    /**
     * Indicates the horizontal, vertical, or grid layout of the component.
     */
    this.layout = "vertical";
    /**
     * Opens the action menu.
     */
    this.menuOpen = false;
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    this.setMenuOpen = (event) => {
      this.menuOpen = !!event.detail;
    };
  }
  expandedHandler() {
    this.menuOpen = false;
  }
  // --------------------------------------------------------------------------
  //
  //  Component Methods
  //
  // --------------------------------------------------------------------------
  renderTooltip() {
    const { el } = this;
    const hasTooltip = getSlotted(el, SLOTS.menuTooltip);
    return hasTooltip ? h("slot", { name: SLOTS.menuTooltip, slot: ACTION_MENU_SLOTS.tooltip }) : null;
  }
  renderMenu() {
    const { el, expanded, intlMore, menuOpen } = this;
    const hasMenuItems = getSlotted(el, SLOTS.menuActions);
    return hasMenuItems ? (h("calcite-action-menu", { expanded: expanded, flipPlacements: ["left", "right"], label: intlMore || TEXT.more, onCalciteActionMenuOpenChange: this.setMenuOpen, open: menuOpen, placement: "leading-start" },
      h("calcite-action", { icon: ICONS.menu, slot: ACTION_MENU_SLOTS.trigger, text: intlMore || TEXT.more, textEnabled: expanded }),
      h("slot", { name: SLOTS.menuActions }),
      this.renderTooltip())) : null;
  }
  render() {
    return (h(Fragment, null,
      h("slot", null),
      this.renderMenu()));
  }
  static get is() { return "calcite-action-group"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["calcite-action-group.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["calcite-action-group.css"]
  }; }
  static get properties() { return {
    "expanded": {
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
        "text": "Indicates whether widget is expanded."
      },
      "attribute": "expanded",
      "reflect": true,
      "defaultValue": "false"
    },
    "layout": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "Layout",
        "resolved": "\"grid\" | \"horizontal\" | \"vertical\"",
        "references": {
          "Layout": {
            "location": "import",
            "path": "../interfaces"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Indicates the horizontal, vertical, or grid layout of the component."
      },
      "attribute": "layout",
      "reflect": true,
      "defaultValue": "\"vertical\""
    },
    "columns": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "Columns",
        "resolved": "1 | 2 | 3 | 4 | 5 | 6",
        "references": {
          "Columns": {
            "location": "import",
            "path": "../interfaces"
          }
        }
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "Indicates number of columns."
      },
      "attribute": "columns",
      "reflect": true
    },
    "intlMore": {
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
        "text": "Text string for the actions menu."
      },
      "attribute": "intl-more",
      "reflect": false
    },
    "menuOpen": {
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
        "text": "Opens the action menu."
      },
      "attribute": "menu-open",
      "reflect": true,
      "defaultValue": "false"
    }
  }; }
  static get elementRef() { return "el"; }
  static get watchers() { return [{
      "propName": "expanded",
      "methodName": "expandedHandler"
    }]; }
}
