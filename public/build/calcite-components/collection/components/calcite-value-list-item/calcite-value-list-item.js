import { Component, Element, Event, h, Host, Listen, Method, Prop } from "@stencil/core";
import { ICON_TYPES } from "../calcite-pick-list/resources";
import { guid } from "../../utils/guid";
import { CSS } from "../calcite-pick-list-item/resources";
import { ICONS, SLOTS } from "./resources";
import { SLOTS as PICK_LIST_SLOTS } from "../calcite-pick-list-item/resources";
import { getSlotted } from "../../utils/dom";
/**
 * @slot actions-end - A slot for adding actions or content to the end side of the item.
 * @slot actions-start - A slot for adding actions or content to the start side of the item.
 */
export class CalciteValueListItem {
  constructor() {
    /**
     * When true, the item cannot be clicked and is visually muted
     */
    this.disabled = false;
    /**
     * @internal When false, the item cannot be deselected by user interaction.
     */
    this.disableDeselect = false;
    /**
     * When true, prevents the content of the list item from user interaction.
     */
    this.nonInteractive = false;
    /**
     * @internal - stores the activated state of the drag handle.
     */
    this.handleActivated = false;
    /**
     * Determines the icon SVG symbol that will be shown. Options are circle, square, grip or null.
     * @see [ICON_TYPES](https://github.com/Esri/calcite-components/blob/master/src/components/calcite-pick-list/resources.ts#L5)
     */
    this.icon = null;
    /**
     * Set this to true to display a remove action that removes the item from the list.
     */
    this.removable = false;
    /**
     * Set this to true to pre-select an item. Toggles when an item is checked/unchecked.
     */
    this.selected = false;
    this.pickListItem = null;
    this.guid = `calcite-value-list-item-${guid()}`;
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    this.getPickListRef = (el) => (this.pickListItem = el);
    this.handleKeyDown = (event) => {
      if (event.key === " ") {
        this.handleActivated = !this.handleActivated;
      }
    };
    this.handleBlur = () => {
      this.handleActivated = false;
    };
    this.handleSelectChange = (event) => {
      this.selected = event.detail.selected;
    };
  }
  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------
  async toggleSelected(coerce) {
    this.pickListItem.toggleSelected(coerce);
  }
  async setFocus() {
    var _a;
    (_a = this.pickListItem) === null || _a === void 0 ? void 0 : _a.setFocus();
  }
  calciteListItemChangeHandler(event) {
    // adjust item payload from wrapped item before bubbling
    event.detail.item = this.el;
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  renderActionsEnd() {
    const { el } = this;
    const hasActionsEnd = getSlotted(el, SLOTS.actionsEnd);
    return hasActionsEnd ? (h("slot", { name: SLOTS.actionsEnd, slot: PICK_LIST_SLOTS.actionsEnd })) : null;
  }
  renderActionsStart() {
    const { el } = this;
    const hasActionsStart = getSlotted(el, SLOTS.actionsStart);
    return hasActionsStart ? (h("slot", { name: SLOTS.actionsStart, slot: PICK_LIST_SLOTS.actionsStart })) : null;
  }
  renderHandle() {
    const { icon } = this;
    if (icon === ICON_TYPES.grip) {
      return (h("span", { "aria-pressed": this.handleActivated.toString(), class: {
          [CSS.handle]: true,
          [CSS.handleActivated]: this.handleActivated
        }, "data-js-handle": true, onBlur: this.handleBlur, onKeyDown: this.handleKeyDown, role: "button", tabindex: "0" },
        h("calcite-icon", { icon: ICONS.drag, scale: "s" })));
    }
  }
  render() {
    return (h(Host, { id: this.el.id || this.guid },
      this.renderHandle(),
      h("calcite-pick-list-item", { description: this.description, disableDeselect: this.disableDeselect, nonInteractive: this.nonInteractive, disabled: this.disabled, label: this.label, metadata: this.metadata, onCalciteListItemChange: this.handleSelectChange, ref: this.getPickListRef, removable: this.removable, selected: this.selected, value: this.value },
        this.renderActionsStart(),
        this.renderActionsEnd())));
  }
  static get is() { return "calcite-value-list-item"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["./calcite-value-list-item.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["calcite-value-list-item.css"]
  }; }
  static get properties() { return {
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
        "text": "An optional description for this item. Will appear below the label text."
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
      "optional": true,
      "docs": {
        "tags": [],
        "text": "When true, the item cannot be clicked and is visually muted"
      },
      "attribute": "disabled",
      "reflect": true,
      "defaultValue": "false"
    },
    "disableDeselect": {
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
            "text": "When false, the item cannot be deselected by user interaction.",
            "name": "internal"
          }],
        "text": ""
      },
      "attribute": "disable-deselect",
      "reflect": false,
      "defaultValue": "false"
    },
    "nonInteractive": {
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
        "text": "When true, prevents the content of the list item from user interaction."
      },
      "attribute": "non-interactive",
      "reflect": true,
      "defaultValue": "false"
    },
    "handleActivated": {
      "type": "boolean",
      "mutable": true,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [{
            "text": "- stores the activated state of the drag handle.",
            "name": "internal"
          }],
        "text": ""
      },
      "attribute": "handle-activated",
      "reflect": false,
      "defaultValue": "false"
    },
    "icon": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "ICON_TYPES | null",
        "resolved": "ICON_TYPES.circle | ICON_TYPES.grip | ICON_TYPES.square",
        "references": {
          "ICON_TYPES": {
            "location": "import",
            "path": "../calcite-pick-list/resources"
          }
        }
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [{
            "text": " [ICON_TYPES](https://github.com/Esri/calcite-components/blob/master/src/components/calcite-pick-list/resources.ts#L5)",
            "name": "see"
          }],
        "text": "Determines the icon SVG symbol that will be shown. Options are circle, square, grip or null."
      },
      "attribute": "icon",
      "reflect": true,
      "defaultValue": "null"
    },
    "label": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": true,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "The main label for this item. Appears next to the icon."
      },
      "attribute": "label",
      "reflect": true
    },
    "metadata": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "Record<string, unknown>",
        "resolved": "{ [x: string]: unknown; }",
        "references": {
          "Record": {
            "location": "global"
          }
        }
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "Used to provide additional metadata to an item, primarily used when the parent list has a filter."
      }
    },
    "removable": {
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
        "text": "Set this to true to display a remove action that removes the item from the list."
      },
      "attribute": "removable",
      "reflect": true,
      "defaultValue": "false"
    },
    "selected": {
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
        "text": "Set this to true to pre-select an item. Toggles when an item is checked/unchecked."
      },
      "attribute": "selected",
      "reflect": true,
      "defaultValue": "false"
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
        "text": "The item's associated value."
      },
      "attribute": "value",
      "reflect": false
    }
  }; }
  static get events() { return [{
      "method": "calciteListItemRemove",
      "name": "calciteListItemRemove",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Emitted whenever the remove button is pressed."
      },
      "complexType": {
        "original": "void",
        "resolved": "void",
        "references": {}
      }
    }]; }
  static get methods() { return {
    "toggleSelected": {
      "complexType": {
        "signature": "(coerce?: boolean) => Promise<void>",
        "parameters": [{
            "tags": [],
            "text": ""
          }],
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
    },
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
  static get listeners() { return [{
      "name": "calciteListItemChange",
      "method": "calciteListItemChangeHandler",
      "target": undefined,
      "capture": false,
      "passive": false
    }]; }
}
