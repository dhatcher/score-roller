import { Component, Prop, h, Element } from "@stencil/core";
import { CSS } from "./resources";
import { getAncestors, getDepth } from "../calcite-combobox/utils";
import { guid } from "../../utils/guid";
import { getElementDir, getElementProp } from "../../utils/dom";
import { CSS_UTILITY } from "../../utils/resources";
export class CalciteComboboxItemGroup {
  constructor() {
    this.guid = guid();
    this.scale = "m";
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
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  render() {
    const { el, scale } = this;
    const dir = getElementDir(el);
    const indent = `${CSS.label}--indent-${getDepth(el)}`;
    return (h("ul", { "aria-labelledby": this.guid, class: { [CSS.list]: true, [CSS_UTILITY.rtl]: dir === "rtl", [`scale--${scale}`]: true }, role: "group" },
      h("li", { class: { [CSS.label]: true, [indent]: true }, id: this.guid, role: "presentation" },
        h("span", { class: CSS.title }, this.label)),
      h("slot", null)));
  }
  static get is() { return "calcite-combobox-item-group"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["./calcite-combobox-item-group.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["calcite-combobox-item-group.css"]
  }; }
  static get properties() { return {
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
        "text": "Title of the group"
      },
      "attribute": "label",
      "reflect": false
    }
  }; }
  static get elementRef() { return "el"; }
}
