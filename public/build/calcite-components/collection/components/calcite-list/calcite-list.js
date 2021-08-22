import { Component, h, Host } from "@stencil/core";
import { CSS } from "./resources";
/**
 * A general purpose list that enables users to construct list items that conform to Calcite styling.
 * @slot - A slot for adding `calcite-list-item` elements.
 */
export class CalciteList {
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  render() {
    return (h(Host, { role: "list" },
      h("div", { class: CSS.container },
        h("slot", null))));
  }
  static get is() { return "calcite-list"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["calcite-list.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["calcite-list.css"]
  }; }
}
