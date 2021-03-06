import { Component, h, Prop, Event, Element, Method } from "@stencil/core";
import { getElementDir, getSlotted } from "../../utils/dom";
import { guid } from "../../utils/guid";
import { CSS, TEXT } from "./resources";
import { CSS_UTILITY } from "../../utils/resources";
export class CalciteChip {
  constructor() {
    //--------------------------------------------------------------------------
    //
    //  Public Properties
    //
    //--------------------------------------------------------------------------
    /** specify the appearance style of the button, defaults to solid. */
    this.appearance = "solid";
    /** specify the color of the button, defaults to blue */
    this.color = "grey";
    /** Optionally show a button the user can click to dismiss the chip */
    this.dismissible = false;
    /** Aria label for the "x" button
     * @default "close"
     */
    this.dismissLabel = TEXT.close;
    /** specify the scale of the chip, defaults to m */
    this.scale = "m";
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    this.closeClickHandler = (event) => {
      event.preventDefault();
      this.calciteChipDismiss.emit(this.el);
    };
    this.guid = guid();
  }
  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  async setFocus() {
    var _a;
    (_a = this.closeButton) === null || _a === void 0 ? void 0 : _a.focus();
  }
  //--------------------------------------------------------------------------
  //
  //  Render Methods
  //
  //--------------------------------------------------------------------------
  renderChipImage() {
    const { el } = this;
    const hasChipImage = getSlotted(el, "image");
    return hasChipImage ? (h("div", { class: "chip-image-container" },
      h("slot", { name: "image" }))) : null;
  }
  render() {
    const dir = getElementDir(this.el);
    const iconEl = (h("calcite-icon", { class: "calcite-chip--icon", dir: dir, flipRtl: this.iconFlipRtl, icon: this.icon, scale: "s" }));
    const closeButton = (h("button", { "aria-describedby": this.guid, "aria-label": this.dismissLabel, class: CSS.close, onClick: this.closeClickHandler, ref: (el) => (this.closeButton = el) },
      h("calcite-icon", { icon: "x", scale: "s" })));
    return (h("div", { class: { container: true, [CSS_UTILITY.rtl]: dir === "rtl" } },
      this.renderChipImage(),
      this.icon ? iconEl : null,
      h("span", { class: CSS.title, id: this.guid },
        h("slot", null)),
      this.dismissible ? closeButton : null));
  }
  static get is() { return "calcite-chip"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["calcite-chip.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["calcite-chip.css"]
  }; }
  static get properties() { return {
    "appearance": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "Extract<\"solid\" | \"clear\", Appearance>",
        "resolved": "\"clear\" | \"solid\"",
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
        "text": "specify the appearance style of the button, defaults to solid."
      },
      "attribute": "appearance",
      "reflect": true,
      "defaultValue": "\"solid\""
    },
    "color": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "ChipColor",
        "resolved": "\"blue\" | \"green\" | \"grey\" | \"red\" | \"yellow\"",
        "references": {
          "ChipColor": {
            "location": "import",
            "path": "./interfaces"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "specify the color of the button, defaults to blue"
      },
      "attribute": "color",
      "reflect": true,
      "defaultValue": "\"grey\""
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
      "optional": true,
      "docs": {
        "tags": [],
        "text": "Optionally show a button the user can click to dismiss the chip"
      },
      "attribute": "dismissible",
      "reflect": true,
      "defaultValue": "false"
    },
    "dismissLabel": {
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
            "text": "\"close\"",
            "name": "default"
          }],
        "text": "Aria label for the \"x\" button"
      },
      "attribute": "dismiss-label",
      "reflect": false,
      "defaultValue": "TEXT.close"
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
        "text": "optionally pass an icon to display - accepts Calcite UI icon names"
      },
      "attribute": "icon",
      "reflect": true
    },
    "iconFlipRtl": {
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
        "text": "flip the icon in rtl"
      },
      "attribute": "icon-flip-rtl",
      "reflect": true
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
        "text": "specify the scale of the chip, defaults to m"
      },
      "attribute": "scale",
      "reflect": true,
      "defaultValue": "\"m\""
    },
    "value": {
      "type": "any",
      "mutable": false,
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      },
      "required": true,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "value",
      "reflect": false
    }
  }; }
  static get events() { return [{
      "method": "calciteChipDismiss",
      "name": "calciteChipDismiss",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Emitted when the dismiss button is clicked"
      },
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      }
    }]; }
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
