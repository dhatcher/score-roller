import { Component, Element, h, Prop, Watch } from "@stencil/core";
import Color from "color";
import { COLORS, CSS } from "./resources";
import { getThemeName } from "../../utils/dom";
export class CalciteColorPickerSwatch {
  constructor() {
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------
    /**
     * Used to display whether the swatch is active or not.
     */
    this.active = false;
    /**
     * The component scale.
     */
    this.scale = "m";
  }
  handleColorChange(color) {
    this.internalColor = Color(color);
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  componentWillLoad() {
    this.handleColorChange(this.color);
  }
  render() {
    const { active, el, internalColor } = this;
    const borderRadius = active ? "100%" : "0";
    const hex = internalColor.hex();
    const theme = getThemeName(el);
    const borderColor = theme === "light" ? COLORS.borderLight : COLORS.borderDark;
    return (h("svg", { class: CSS.swatch, xmlns: "http://www.w3.org/2000/svg" },
      h("title", null, hex),
      h("rect", { fill: hex, height: "100%", id: "swatch", rx: borderRadius, stroke: borderColor, "stroke-width": "2", style: { "clip-path": `inset(0 round ${borderRadius})` }, width: "100%" })));
  }
  static get is() { return "calcite-color-picker-swatch"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["calcite-color-picker-swatch.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["calcite-color-picker-swatch.css"]
  }; }
  static get properties() { return {
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
        "text": "Used to display whether the swatch is active or not."
      },
      "attribute": "active",
      "reflect": true,
      "defaultValue": "false"
    },
    "color": {
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
            "text": "https ://developer.mozilla.org/en-US/docs/Web/CSS/color_value",
            "name": "see"
          }],
        "text": "The color value."
      },
      "attribute": "color",
      "reflect": false
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
        "text": "The component scale."
      },
      "attribute": "scale",
      "reflect": true,
      "defaultValue": "\"m\""
    }
  }; }
  static get elementRef() { return "el"; }
  static get watchers() { return [{
      "propName": "color",
      "methodName": "handleColorChange"
    }]; }
}
