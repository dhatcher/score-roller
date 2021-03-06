import { Component, Element, Event, h, Method, Prop, Watch } from "@stencil/core";
import { CSS, SLOTS, TEXT } from "./calcite-notice.resources";
import { StatusIcons } from "../calcite-alert/interfaces";
import { getElementDir, getSlotted, setRequestedIcon } from "../../utils/dom";
import { CSS_UTILITY } from "../../utils/resources";
/** Notices are intended to be used to present users with important-but-not-crucial contextual tips or copy. Because
 * notices are displayed inline, a common use case is displaying them on page-load to present users with short hints or contextual copy.
 * They are optionally dismissible - useful for keeping track of whether or not a user has dismissed the notice. You can also choose not
 * to display a notice on page load and set the "active" attribute as needed to contextually provide inline messaging to users.
 */
/**
 * @slot title - Title of the notice (optional)
 * @slot message - Main text of the notice
 * @slot link - Optional action to take from the notice (undo, try again, link to page, etc.)
 * @slot actions-end - Allows adding a `calcite-action` at the end of the notice. It is recommended to use 2 or less actions.
 */
export class CalciteNotice {
  constructor() {
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //---------------------------------------------------------------------------
    /** Is the notice currently active or not */
    this.active = false;
    /** Color for the notice (will apply to top border and icon) */
    this.color = "blue";
    /** Optionally show a button the user can click to dismiss the notice */
    this.dismissible = false;
    /** String for the close button.
     * @default "Close"
     */
    this.intlClose = TEXT.close;
    /** specify the scale of the notice, defaults to m */
    this.scale = "m";
    /** specify the width of the notice, defaults to auto */
    this.width = "auto";
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    this.close = () => {
      this.active = false;
      this.calciteNoticeClose.emit();
    };
  }
  updateRequestedIcon() {
    this.requestedIcon = setRequestedIcon(StatusIcons, this.icon, this.color);
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  componentWillLoad() {
    this.requestedIcon = setRequestedIcon(StatusIcons, this.icon, this.color);
  }
  componentDidLoad() {
    this.noticeLinkEl = this.el.querySelector("calcite-link");
  }
  render() {
    const { el } = this;
    const dir = getElementDir(el);
    const closeButton = (h("button", { "aria-label": this.intlClose, class: CSS.close, onClick: this.close, ref: (el) => (this.closeButton = el) },
      h("calcite-icon", { icon: "x", scale: this.scale === "l" ? "m" : "s" })));
    const hasActionEnd = getSlotted(el, SLOTS.actionsEnd);
    return (h("div", { class: { [CSS.container]: true, [CSS_UTILITY.rtl]: dir === "rtl" } },
      this.requestedIcon ? (h("div", { class: CSS.icon },
        h("calcite-icon", { icon: this.requestedIcon, scale: this.scale === "l" ? "m" : "s" }))) : null,
      h("div", { class: CSS.content },
        h("slot", { name: SLOTS.title }),
        h("slot", { name: SLOTS.message }),
        h("slot", { name: SLOTS.link })),
      hasActionEnd ? (h("div", { class: CSS.actionsEnd },
        h("slot", { name: SLOTS.actionsEnd }))) : null,
      this.dismissible ? closeButton : null));
  }
  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  /** focus the close button, if present and requested */
  async setFocus() {
    if (!this.closeButton && !this.noticeLinkEl) {
      return;
    }
    if (this.noticeLinkEl) {
      this.noticeLinkEl.setFocus();
    }
    else if (this.closeButton) {
      this.closeButton.focus();
    }
  }
  static get is() { return "calcite-notice"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["calcite-notice.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["calcite-notice.css"]
  }; }
  static get properties() { return {
    "active": {
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
        "text": "Is the notice currently active or not"
      },
      "attribute": "active",
      "reflect": true,
      "defaultValue": "false"
    },
    "color": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "StatusColor",
        "resolved": "\"blue\" | \"green\" | \"red\" | \"yellow\"",
        "references": {
          "StatusColor": {
            "location": "import",
            "path": "../calcite-alert/interfaces"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Color for the notice (will apply to top border and icon)"
      },
      "attribute": "color",
      "reflect": true,
      "defaultValue": "\"blue\""
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
        "text": "Optionally show a button the user can click to dismiss the notice"
      },
      "attribute": "dismissible",
      "reflect": true,
      "defaultValue": "false"
    },
    "icon": {
      "type": "any",
      "mutable": false,
      "complexType": {
        "original": "string | boolean",
        "resolved": "boolean | string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "when used as a boolean set to true, show a default recommended icon. You can\nalso pass a calcite-ui-icon name to this prop to display a requested icon"
      },
      "attribute": "icon",
      "reflect": true
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
        "text": "String for the close button."
      },
      "attribute": "intl-close",
      "reflect": false,
      "defaultValue": "TEXT.close"
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
        "text": "specify the scale of the notice, defaults to m"
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
        "text": "specify the width of the notice, defaults to auto"
      },
      "attribute": "width",
      "reflect": true,
      "defaultValue": "\"auto\""
    }
  }; }
  static get events() { return [{
      "method": "calciteNoticeClose",
      "name": "calciteNoticeClose",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Fired when an notice is closed"
      },
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      }
    }, {
      "method": "calciteNoticeOpen",
      "name": "calciteNoticeOpen",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Fired when an Notice is opened"
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
        "text": "focus the close button, if present and requested",
        "tags": []
      }
    }
  }; }
  static get elementRef() { return "el"; }
  static get watchers() { return [{
      "propName": "icon",
      "methodName": "updateRequestedIcon"
    }, {
      "propName": "color",
      "methodName": "updateRequestedIcon"
    }]; }
}
