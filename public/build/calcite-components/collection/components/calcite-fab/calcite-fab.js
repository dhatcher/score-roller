import { Component, Element, Method, Prop, h } from "@stencil/core";
import { CSS, ICONS } from "./resources";
import { focusElement, getElementDir } from "../../utils/dom";
export class CalciteFab {
  constructor() {
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------
    /**
     * Used to set the button's appearance. Default is outline.
     */
    this.appearance = "outline";
    /**
     * Used to set the button's color. Default is light.
     */
    this.color = "neutral";
    /**
     * When true, disabled prevents interaction. This state shows items with lower opacity/grayed.
     */
    this.disabled = false;
    /**
     * The name of the icon to display. The value of this property must match the icon name from https://esri.github.io/calcite-ui-icons/.
     * @default "plus"
     */
    this.icon = ICONS.plus;
    /**
     * When true, content is waiting to be loaded. This state shows a busy indicator.
     */
    this.loading = false;
    /**
     * Specifies the size of the fab.
     */
    this.scale = "m";
    /**
     * Indicates whether the text is displayed.
     */
    this.textEnabled = false;
  }
  // --------------------------------------------------------------------------
  //
  //  Methods
  //
  // --------------------------------------------------------------------------
  async setFocus() {
    focusElement(this.buttonEl);
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  render() {
    const { appearance, color, disabled, el, loading, scale, textEnabled, icon, label, text } = this;
    const title = !textEnabled ? label || text || null : null;
    const dir = getElementDir(el);
    return (h("calcite-button", { appearance: appearance, class: CSS.button, color: color, dir: dir, disabled: disabled, iconStart: icon, label: label, loading: loading, ref: (buttonEl) => {
        this.buttonEl = buttonEl;
      }, round: true, scale: scale, title: title, width: "auto" }, this.textEnabled ? this.text : null));
  }
  static get is() { return "calcite-fab"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["calcite-fab.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["calcite-fab.css"]
  }; }
  static get properties() { return {
    "appearance": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "Extract<\"solid\" | \"outline\", Appearance>",
        "resolved": "\"outline\" | \"solid\"",
        "references": {
          "Extract": {
            "location": "global"
          },
          "Appearance": {
            "location": "import",
            "path": "../interfaces"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Used to set the button's appearance. Default is outline."
      },
      "attribute": "appearance",
      "reflect": true,
      "defaultValue": "\"outline\""
    },
    "color": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "ButtonColor",
        "resolved": "\"blue\" | \"inverse\" | \"neutral\" | \"red\"",
        "references": {
          "ButtonColor": {
            "location": "import",
            "path": "../calcite-button/interfaces"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Used to set the button's color. Default is light."
      },
      "attribute": "color",
      "reflect": true,
      "defaultValue": "\"neutral\""
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
        "text": "When true, disabled prevents interaction. This state shows items with lower opacity/grayed."
      },
      "attribute": "disabled",
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
        "tags": [{
            "text": "\"plus\"",
            "name": "default"
          }],
        "text": "The name of the icon to display. The value of this property must match the icon name from https://esri.github.io/calcite-ui-icons/."
      },
      "attribute": "icon",
      "reflect": false,
      "defaultValue": "ICONS.plus"
    },
    "label": {
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
        "text": "Label of the FAB, exposed on hover when textEnabled is false. If no label is provided, the label inherits what's provided for the `text` prop."
      },
      "attribute": "label",
      "reflect": false
    },
    "loading": {
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
        "text": "When true, content is waiting to be loaded. This state shows a busy indicator."
      },
      "attribute": "loading",
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
        "text": "Specifies the size of the fab."
      },
      "attribute": "scale",
      "reflect": true,
      "defaultValue": "\"m\""
    },
    "text": {
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
        "text": "Text that accompanies the FAB icon."
      },
      "attribute": "text",
      "reflect": false
    },
    "textEnabled": {
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
        "text": "Indicates whether the text is displayed."
      },
      "attribute": "text-enabled",
      "reflect": true,
      "defaultValue": "false"
    }
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
}
