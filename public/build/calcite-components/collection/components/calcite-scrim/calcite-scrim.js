import { Component, Prop, h } from "@stencil/core";
import { CSS, TEXT } from "./resources";
export class CalciteScrim {
  constructor() {
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------
    /** string to override English loading text
     * @default "Loading"
     */
    this.intlLoading = TEXT.loading;
    /**
     * Determines if the component will have the loader overlay.
     * Otherwise, will render opaque disabled state.
     */
    this.loading = false;
  }
  // --------------------------------------------------------------------------
  //
  //  Render Method
  //
  // --------------------------------------------------------------------------
  render() {
    const loaderNode = this.loading ? h("calcite-loader", { active: true, label: this.intlLoading }) : null;
    return h("div", { class: CSS.scrim }, loaderNode);
  }
  static get is() { return "calcite-scrim"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["calcite-scrim.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["calcite-scrim.css"]
  }; }
  static get properties() { return {
    "intlLoading": {
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
            "text": "\"Loading\"",
            "name": "default"
          }],
        "text": "string to override English loading text"
      },
      "attribute": "intl-loading",
      "reflect": false,
      "defaultValue": "TEXT.loading"
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
        "text": "Determines if the component will have the loader overlay.\nOtherwise, will render opaque disabled state."
      },
      "attribute": "loading",
      "reflect": true,
      "defaultValue": "false"
    }
  }; }
}
