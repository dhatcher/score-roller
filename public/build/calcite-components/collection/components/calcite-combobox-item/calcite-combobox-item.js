import { Component, Element, Event, Host, Method, Prop, h, Watch } from "@stencil/core";
import { getElementDir, getElementProp } from "../../utils/dom";
import { CSS } from "./resources";
import { guid } from "../../utils/guid";
import { getAncestors, getDepth } from "../calcite-combobox/utils";
import { CSS_UTILITY } from "../../utils/resources";
export class CalciteComboboxItem {
  constructor() {
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------
    /** When true, the item cannot be clicked and is visually muted. */
    this.disabled = false;
    /** Set this to true to pre-select an item. Toggles when an item is checked/unchecked. */
    this.selected = false;
    /** True when item is highlighted either from keyboard or mouse hover */
    this.active = false;
    /** Unique identifier, used for accessibility */
    this.guid = guid();
    this.scale = "m";
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    this.itemClickHandler = (event) => {
      event.preventDefault();
      if (this.disabled) {
        return;
      }
      this.selected = !this.selected;
    };
  }
  selectedWatchHandler() {
    this.calciteComboboxItemChange.emit(this.el);
  }
  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------
  connectedCallback() {
    this.ancestors = getAncestors(this.el);
    this.scale = getElementProp(this.el, "scale", this.scale);
  }
  componentWillLoad() {
    this.hasDefaultSlot = this.el.querySelector(":not([slot])") !== null;
  }
  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------
  /**
   * Used to toggle the selection state. By default this won't trigger an event.
   * The first argument allows the value to be coerced, rather than swapping values.
   */
  async toggleSelected(coerce) {
    if (this.disabled) {
      return;
    }
    this.selected = typeof coerce === "boolean" ? coerce : !this.selected;
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  renderIcon(isSingle) {
    const { icon, disabled, selected } = this;
    const level = `${CSS.icon}--indent`;
    const defaultIcon = isSingle ? "dot" : "check";
    const iconPath = disabled ? "circle-disallowed" : defaultIcon;
    const showDot = isSingle && !icon && !disabled;
    return showDot ? (h("span", { class: {
        [CSS.icon]: true,
        [CSS.dot]: true,
        [level]: true
      } })) : (h("calcite-icon", { class: {
        [CSS.icon]: !icon,
        [CSS.custom]: !!icon,
        [CSS.iconActive]: icon && selected,
        [level]: true
      }, icon: icon || iconPath, scale: "s" }));
  }
  renderChildren() {
    if (!this.hasDefaultSlot) {
      return null;
    }
    return (h("ul", null,
      h("slot", null)));
  }
  render() {
    const isSingleSelect = getElementProp(this.el, "selection-mode", "multi") === "single";
    const dir = getElementDir(this.el);
    const classes = {
      [CSS_UTILITY.rtl]: dir === "rtl",
      [CSS.label]: true,
      [CSS.selected]: this.selected,
      [CSS.active]: this.active,
      [CSS.single]: isSingleSelect
    };
    const depth = getDepth(this.el);
    return (h(Host, { "aria-hidden": "true" },
      h("div", { class: `container scale--${this.scale}`, style: { "--calcite-combobox-item-spacing-indent-multiplier": `${depth}` } },
        h("li", { class: classes, id: this.guid, onClick: this.itemClickHandler },
          this.renderIcon(isSingleSelect),
          h("span", { class: CSS.title }, this.textLabel)),
        this.renderChildren())));
  }
  static get is() { return "calcite-combobox-item"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["./calcite-combobox-item.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["calcite-combobox-item.css"]
  }; }
  static get properties() { return {
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
        "text": "When true, the item cannot be clicked and is visually muted."
      },
      "attribute": "disabled",
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
        "text": "True when item is highlighted either from keyboard or mouse hover"
      },
      "attribute": "active",
      "reflect": false,
      "defaultValue": "false"
    },
    "ancestors": {
      "type": "unknown",
      "mutable": true,
      "complexType": {
        "original": "ComboboxChildElement[]",
        "resolved": "ComboboxChildElement[]",
        "references": {
          "ComboboxChildElement": {
            "location": "import",
            "path": "../calcite-combobox/interfaces"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Parent and grandparent combobox items, this is set internally for use from combobox"
      }
    },
    "guid": {
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
        "text": "Unique identifier, used for accessibility"
      },
      "attribute": "guid",
      "reflect": false,
      "defaultValue": "guid()"
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
        "text": "Custom icon to display both in combobox chips and next to combobox item text"
      },
      "attribute": "icon",
      "reflect": false
    },
    "textLabel": {
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
        "text": "The main label for this item."
      },
      "attribute": "text-label",
      "reflect": true
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
        "text": "The item's associated value"
      },
      "attribute": "value",
      "reflect": false
    },
    "constant": {
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
        "text": "Don't filter this item based on the search text"
      },
      "attribute": "constant",
      "reflect": true
    }
  }; }
  static get events() { return [{
      "method": "calciteComboboxItemChange",
      "name": "calciteComboboxItemChange",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Emitted whenever the item is selected or unselected."
      },
      "complexType": {
        "original": "any",
        "resolved": "any",
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
        "text": "Used to toggle the selection state. By default this won't trigger an event.\nThe first argument allows the value to be coerced, rather than swapping values.",
        "tags": []
      }
    }
  }; }
  static get elementRef() { return "el"; }
  static get watchers() { return [{
      "propName": "selected",
      "methodName": "selectedWatchHandler"
    }]; }
}
