import { Component, Element, h, Prop, Listen, Watch, State, Method } from "@stencil/core";
import { getElementDir } from "../../utils/dom";
import { CSS_UTILITY } from "../../utils/resources";
import { guid } from "../../utils/guid";
export class CalciteTileSelect {
  constructor() {
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------
    /** The checked state of the tile select. */
    this.checked = false;
    /** The disabled state of the tile select. */
    this.disabled = false;
    /** The hidden state of the tile select. */
    this.hidden = false;
    /** The name of the tile select.  This name will appear in form submissions as either a radio or checkbox identifier based on the `type` property. */
    this.name = "";
    /** Display an interactive radio or checkbox. */
    this.inputEnabled = false;
    /** The side of the tile that the radio or checkbox appears on when inputEnabled is true. */
    this.inputAlignment = "start";
    /** The selection mode of the tile select: radio (single) or checkbox (multiple). */
    this.type = "radio";
    /** specify the width of the tile, defaults to auto */
    this.width = "auto";
    this.guid = `calcite-tile-select-${guid()}`;
    //--------------------------------------------------------------------------
    //
    //  State
    //
    //--------------------------------------------------------------------------
    /** The focused state of the tile-select. */
    this.focused = false;
  }
  checkedChanged(newChecked) {
    this.input.checked = newChecked;
  }
  nameChanged(newName) {
    this.input.name = newName;
  }
  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  async setFocus() {
    this.input.setFocus();
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  calciteCheckboxChangeEvent(event) {
    const checkbox = event.target;
    if (checkbox === this.input) {
      this.checked = checkbox.checked;
    }
  }
  calciteCheckboxFocusedChangeEvent(event) {
    const checkbox = event.target;
    if (checkbox === this.input) {
      this.focused = event.detail;
    }
  }
  calciteRadioButtonCheckedChangeEvent(event) {
    const radioButton = event.target;
    if (radioButton === this.input) {
      this.checked = radioButton.checked;
    }
    event.stopPropagation();
  }
  calciteRadioButtonFocusedChangeEvent(event) {
    const radioButton = event.target;
    if (radioButton === this.input) {
      this.focused = radioButton.focused;
    }
  }
  click(event) {
    const target = event.target;
    const targets = ["calcite-tile", "calcite-tile-select"];
    if (targets.includes(target.localName)) {
      this.input.click();
    }
  }
  mouseenter() {
    if (this.input.localName === "calcite-radio-button") {
      this.input.hovered = true;
    }
    if (this.input.localName === "calcite-checkbox") {
      this.input.hovered = true;
    }
  }
  mouseleave() {
    if (this.input.localName === "calcite-radio-button") {
      this.input.hovered = false;
    }
    if (this.input.localName === "calcite-checkbox") {
      this.input.hovered = false;
    }
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    this.renderInput();
  }
  disconnectedCallback() {
    this.input.parentNode.removeChild(this.input);
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  renderInput() {
    this.input = document.createElement(this.type === "radio" ? "calcite-radio-button" : "calcite-checkbox");
    this.input.checked = this.checked;
    this.input.disabled = this.disabled;
    this.input.hidden = this.hidden;
    this.input.id = this.guid;
    this.input.label = this.heading || this.name || "";
    if (this.name) {
      this.input.name = this.name;
    }
    if (this.value) {
      this.input.value = this.value != null ? this.value.toString() : "";
    }
    this.el.insertAdjacentElement("beforeend", this.input);
  }
  render() {
    const dir = getElementDir(this.el);
    return (h("div", { class: { focused: this.focused, root: true, [CSS_UTILITY.rtl]: dir === "rtl" } },
      h("calcite-tile", { active: this.checked, description: this.description, embed: true, heading: this.heading, icon: this.icon }),
      h("slot", null)));
  }
  static get is() { return "calcite-tile-select"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["calcite-tile-select.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["calcite-tile-select.css"]
  }; }
  static get properties() { return {
    "checked": {
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
        "text": "The checked state of the tile select."
      },
      "attribute": "checked",
      "reflect": true,
      "defaultValue": "false"
    },
    "description": {
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
        "text": "The description text that appears beneath the heading of the tile."
      },
      "attribute": "description",
      "reflect": true
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
      "optional": false,
      "docs": {
        "tags": [],
        "text": "The disabled state of the tile select."
      },
      "attribute": "disabled",
      "reflect": true,
      "defaultValue": "false"
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
        "text": "The heading text that appears between the icon and description of the tile."
      },
      "attribute": "heading",
      "reflect": true
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
        "text": "The hidden state of the tile select."
      },
      "attribute": "hidden",
      "reflect": true,
      "defaultValue": "false"
    },
    "icon": {
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
        "text": "The icon that appears at the top of the tile."
      },
      "attribute": "icon",
      "reflect": true
    },
    "name": {
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
        "tags": [],
        "text": "The name of the tile select.  This name will appear in form submissions as either a radio or checkbox identifier based on the `type` property."
      },
      "attribute": "name",
      "reflect": true,
      "defaultValue": "\"\""
    },
    "inputEnabled": {
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
        "text": "Display an interactive radio or checkbox."
      },
      "attribute": "input-enabled",
      "reflect": true,
      "defaultValue": "false"
    },
    "inputAlignment": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "Extract<\"end\" | \"start\", Alignment>",
        "resolved": "\"end\" | \"start\"",
        "references": {
          "Extract": {
            "location": "global"
          },
          "Alignment": {
            "location": "import",
            "path": "../interfaces"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "The side of the tile that the radio or checkbox appears on when inputEnabled is true."
      },
      "attribute": "input-alignment",
      "reflect": true,
      "defaultValue": "\"start\""
    },
    "type": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "TileSelectType",
        "resolved": "\"checkbox\" | \"radio\"",
        "references": {
          "TileSelectType": {
            "location": "import",
            "path": "./interfaces"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "The selection mode of the tile select: radio (single) or checkbox (multiple)."
      },
      "attribute": "type",
      "reflect": true,
      "defaultValue": "\"radio\""
    },
    "value": {
      "type": "any",
      "mutable": false,
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "The value of the tile select.  This value will appear in form submissions when this tile select is checked."
      },
      "attribute": "value",
      "reflect": false
    },
    "width": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "Extract<\"auto\" | \"full\", Width>",
        "resolved": "\"auto\" | \"full\"",
        "references": {
          "Extract": {
            "location": "global"
          },
          "Width": {
            "location": "import",
            "path": "../interfaces"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "specify the width of the tile, defaults to auto"
      },
      "attribute": "width",
      "reflect": true,
      "defaultValue": "\"auto\""
    }
  }; }
  static get states() { return {
    "focused": {}
  }; }
  static get methods() { return {
    "setFocus": {
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
    }
  }; }
  static get elementRef() { return "el"; }
  static get watchers() { return [{
      "propName": "checked",
      "methodName": "checkedChanged"
    }, {
      "propName": "name",
      "methodName": "nameChanged"
    }]; }
  static get listeners() { return [{
      "name": "calciteCheckboxChange",
      "method": "calciteCheckboxChangeEvent",
      "target": undefined,
      "capture": false,
      "passive": false
    }, {
      "name": "calciteCheckboxFocusedChange",
      "method": "calciteCheckboxFocusedChangeEvent",
      "target": undefined,
      "capture": false,
      "passive": false
    }, {
      "name": "calciteRadioButtonCheckedChange",
      "method": "calciteRadioButtonCheckedChangeEvent",
      "target": undefined,
      "capture": false,
      "passive": false
    }, {
      "name": "calciteRadioButtonFocusedChange",
      "method": "calciteRadioButtonFocusedChangeEvent",
      "target": undefined,
      "capture": false,
      "passive": false
    }, {
      "name": "click",
      "method": "click",
      "target": undefined,
      "capture": false,
      "passive": false
    }, {
      "name": "mouseenter",
      "method": "mouseenter",
      "target": undefined,
      "capture": false,
      "passive": true
    }, {
      "name": "mouseleave",
      "method": "mouseleave",
      "target": undefined,
      "capture": false,
      "passive": true
    }]; }
}
