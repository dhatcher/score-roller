import { Component, Element, Event, h, Prop } from "@stencil/core";
import { CSS } from "./resources";
import { getElementDir } from "../../utils/dom";
export class CalciteSplitButton {
  constructor() {
    /** specify the appearance style of the button, defaults to solid. */
    this.appearance = "solid";
    /** specify the color of the control, defaults to blue */
    this.color = "blue";
    /** specify the icon used for the dropdown menu, defaults to chevron */
    this.dropdownIconType = "chevron";
    /** optionally add a calcite-loader component to the control,
     disabling interaction. with the primary button */
    this.loading = false;
    /** specify the scale of the control, defaults to m */
    this.scale = "m";
    /** specify the width of the button, defaults to auto */
    this.width = "auto";
    this.calciteSplitButtonPrimaryClickHandler = (e) => this.calciteSplitButtonPrimaryClick.emit(e);
    this.calciteSplitButtonSecondaryClickHandler = (e) => this.calciteSplitButtonSecondaryClick.emit(e);
  }
  render() {
    const dir = getElementDir(this.el);
    const widthClasses = {
      [CSS.container]: true,
      [CSS.widthAuto]: this.width === "auto",
      [CSS.widthHalf]: this.width === "half",
      [CSS.widthFull]: this.width === "full"
    };
    const buttonWidth = this.width === "auto" ? "auto" : "full";
    return (h("div", { class: widthClasses, dir: dir },
      h("calcite-button", { appearance: this.appearance, color: this.color, dir: dir, disabled: this.disabled, "icon-end": this.primaryIconEnd ? this.primaryIconEnd : null, "icon-start": this.primaryIconStart ? this.primaryIconStart : null, iconFlipRtl: this.primaryIconFlipRtl ? this.primaryIconFlipRtl : null, label: this.primaryLabel, loading: this.loading, onClick: this.calciteSplitButtonPrimaryClickHandler, scale: this.scale, splitChild: "primary", width: buttonWidth }, this.primaryText),
      h("div", { class: CSS.dividerContainer },
        h("div", { class: CSS.divider })),
      h("calcite-dropdown", { active: this.active, dir: dir, onClick: this.calciteSplitButtonSecondaryClickHandler, placement: "bottom-trailing", scale: this.scale, width: this.scale },
        h("calcite-button", { appearance: this.appearance, color: this.color, dir: dir, disabled: this.disabled, "icon-start": this.dropdownIcon, label: this.dropdownLabel, scale: this.scale, slot: "dropdown-trigger", splitChild: "secondary" }),
        h("slot", null))));
  }
  get dropdownIcon() {
    return this.dropdownIconType === "chevron"
      ? "chevronDown"
      : this.dropdownIconType === "caret"
        ? "caretDown"
        : this.dropdownIconType === "ellipsis"
          ? "ellipsis"
          : "handle-vertical";
  }
  static get is() { return "calcite-split-button"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["calcite-split-button.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["calcite-split-button.css"]
  }; }
  static get properties() { return {
    "appearance": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "ButtonAppearance",
        "resolved": "\"clear\" | \"outline\" | \"solid\" | \"transparent\"",
        "references": {
          "ButtonAppearance": {
            "location": "import",
            "path": "../calcite-button/interfaces"
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
        "text": "specify the color of the control, defaults to blue"
      },
      "attribute": "color",
      "reflect": true,
      "defaultValue": "\"blue\""
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
        "text": "is the control disabled"
      },
      "attribute": "disabled",
      "reflect": true
    },
    "active": {
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
        "tags": [{
            "text": undefined,
            "name": "internal"
          }],
        "text": "Is the dropdown currently active or not"
      },
      "attribute": "active",
      "reflect": true
    },
    "dropdownIconType": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "DropdownIconType",
        "resolved": "\"caret\" | \"chevron\" | \"ellipsis\" | \"overflow\"",
        "references": {
          "DropdownIconType": {
            "location": "import",
            "path": "../calcite-button/interfaces"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "specify the icon used for the dropdown menu, defaults to chevron"
      },
      "attribute": "dropdown-icon-type",
      "reflect": true,
      "defaultValue": "\"chevron\""
    },
    "dropdownLabel": {
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
        "text": "aria label for overflow button"
      },
      "attribute": "dropdown-label",
      "reflect": true
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
      "optional": true,
      "docs": {
        "tags": [],
        "text": "optionally add a calcite-loader component to the control,\ndisabling interaction. with the primary button"
      },
      "attribute": "loading",
      "reflect": true,
      "defaultValue": "false"
    },
    "primaryIconEnd": {
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
        "text": "optionally pass an icon to display at the end of the primary button - accepts Calcite UI icon names"
      },
      "attribute": "primary-icon-end",
      "reflect": true
    },
    "primaryIconFlipRtl": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "FlipContext",
        "resolved": "\"both\" | \"end\" | \"start\"",
        "references": {
          "FlipContext": {
            "location": "import",
            "path": "../interfaces"
          }
        }
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "flip the primary icon(s) in rtl"
      },
      "attribute": "primary-icon-flip-rtl",
      "reflect": true
    },
    "primaryIconStart": {
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
        "text": "optionally pass an icon to display at the start of the primary button - accepts Calcite UI icon names"
      },
      "attribute": "primary-icon-start",
      "reflect": true
    },
    "primaryLabel": {
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
        "text": "optionally pass an aria-label for the primary button"
      },
      "attribute": "primary-label",
      "reflect": true
    },
    "primaryText": {
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
        "text": "text for primary action button"
      },
      "attribute": "primary-text",
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
        "text": "specify the scale of the control, defaults to m"
      },
      "attribute": "scale",
      "reflect": true,
      "defaultValue": "\"m\""
    },
    "width": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "Width",
        "resolved": "\"auto\" | \"full\" | \"half\"",
        "references": {
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
        "text": "specify the width of the button, defaults to auto"
      },
      "attribute": "width",
      "reflect": true,
      "defaultValue": "\"auto\""
    }
  }; }
  static get events() { return [{
      "method": "calciteSplitButtonPrimaryClick",
      "name": "calciteSplitButtonPrimaryClick",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "fired when the primary button is clicked"
      },
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      }
    }, {
      "method": "calciteSplitButtonSecondaryClick",
      "name": "calciteSplitButtonSecondaryClick",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "fired when the secondary button is clicked"
      },
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      }
    }]; }
  static get elementRef() { return "el"; }
}
