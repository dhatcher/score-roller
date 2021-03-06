import { Component, Element, Host, h, Prop, Watch } from "@stencil/core";
import { getElementDir, getElementProp, setRequestedIcon } from "../../utils/dom";
import { StatusIconDefaults } from "./interfaces";
import { CSS_UTILITY } from "../../utils/resources";
export class CalciteInputMessage {
  constructor() {
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------
    this.active = false;
    /** specify the scale of the input, defaults to m */
    this.scale = "m";
    /** specify the status of the input field, determines message and icons */
    this.status = "idle";
  }
  handleIconEl() {
    this.requestedIcon = setRequestedIcon(StatusIconDefaults, this.icon, this.status);
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    this.status = getElementProp(this.el, "status", this.status);
    this.scale = getElementProp(this.el, "scale", this.scale);
    this.requestedIcon = setRequestedIcon(StatusIconDefaults, this.icon, this.status);
  }
  render() {
    const hidden = !this.active;
    return (h(Host, { "calcite-hydrated-hidden": hidden },
      this.renderIcon(this.requestedIcon),
      h("slot", null)));
  }
  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  renderIcon(iconName) {
    if (iconName) {
      const dir = getElementDir(this.el);
      return (h("calcite-icon", { class: { ["calcite-input-message-icon"]: true, [CSS_UTILITY.rtl]: dir === "rtl" }, icon: iconName, scale: "s" }));
    }
  }
  static get is() { return "calcite-input-message"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["calcite-input-message.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["calcite-input-message.css"]
  }; }
  static get properties() { return {
    "active": {
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
        "text": ""
      },
      "attribute": "active",
      "reflect": true,
      "defaultValue": "false"
    },
    "icon": {
      "type": "any",
      "mutable": false,
      "complexType": {
        "original": "boolean | string",
        "resolved": "boolean | string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "when used as a boolean set to true, show a default icon based on status. You can\nalso pass a calcite-ui-icon name to this prop to display a custom icon"
      },
      "attribute": "icon",
      "reflect": true
    },
    "scale": {
      "type": "string",
      "mutable": true,
      "complexType": {
        "original": "Scale",
        "resolved": "\"l\" | \"m\" | \"s\"",
        "references": {
          "Scale": {
            "location": "import",
            "path": "../interfaces"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "specify the scale of the input, defaults to m"
      },
      "attribute": "scale",
      "reflect": true,
      "defaultValue": "\"m\""
    },
    "status": {
      "type": "string",
      "mutable": true,
      "complexType": {
        "original": "Status",
        "resolved": "\"idle\" | \"invalid\" | \"valid\"",
        "references": {
          "Status": {
            "location": "import",
            "path": "../interfaces"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "specify the status of the input field, determines message and icons"
      },
      "attribute": "status",
      "reflect": true,
      "defaultValue": "\"idle\""
    },
    "type": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "\"default\"",
        "resolved": "\"default\"",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [{
            "text": "\"floating\" type is no longer supported",
            "name": "deprecated"
          }],
        "text": "specify the appearance of any slotted message - default (displayed under input), or floating (positioned absolutely under input)"
      },
      "attribute": "type",
      "reflect": true
    }
  }; }
  static get elementRef() { return "el"; }
  static get watchers() { return [{
      "propName": "status",
      "methodName": "handleIconEl"
    }, {
      "propName": "icon",
      "methodName": "handleIconEl"
    }]; }
}
