import { Component, h, Prop } from "@stencil/core";
export class CalciteRadio {
  constructor() {
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------
    /** The checked state of the radio. */
    this.checked = false;
    /** The disabled state of the radio. */
    this.disabled = false;
    /**
     * The focused state of the radio.
     * @private
     */
    this.focused = false;
    /** The radio's hidden status. */
    this.hidden = false;
    /**
     * The hovered state of the radio.
     * @private
     */
    this.hovered = false;
    /** The scale (size) of the radio. */
    this.scale = "m";
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  render() {
    return h("div", { class: "radio" });
  }
  static get is() { return "calcite-radio"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["calcite-radio.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["calcite-radio.css"]
  }; }
  static get properties() { return {
    "checked": {
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
        "text": "The checked state of the radio."
      },
      "attribute": "checked",
      "reflect": true,
      "defaultValue": "false"
    },
    "disabled": {
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
        "text": "The disabled state of the radio."
      },
      "attribute": "disabled",
      "reflect": true,
      "defaultValue": "false"
    },
    "focused": {
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
            "text": undefined,
            "name": "private"
          }],
        "text": "The focused state of the radio."
      },
      "attribute": "focused",
      "reflect": true,
      "defaultValue": "false"
    },
    "hidden": {
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
        "text": "The radio's hidden status."
      },
      "attribute": "hidden",
      "reflect": true,
      "defaultValue": "false"
    },
    "hovered": {
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
            "text": undefined,
            "name": "private"
          }],
        "text": "The hovered state of the radio."
      },
      "attribute": "hovered",
      "reflect": true,
      "defaultValue": "false"
    },
    "scale": {
      "type": "string",
      "mutable": false,
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
        "text": "The scale (size) of the radio."
      },
      "attribute": "scale",
      "reflect": true,
      "defaultValue": "\"m\""
    }
  }; }
}
