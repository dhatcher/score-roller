import { Component, Element, h, Prop } from "@stencil/core";
export class CalciteProgress {
  constructor() {
    /** Use indeterminate if finding actual progress value is impossible */
    this.type = "determinate";
    /** Fraction completed, in the range of 0 - 1.0 */
    this.value = 0;
    /** For indeterminate progress bars, reverse the animation direction */
    this.reversed = false;
  }
  render() {
    const isDeterminate = this.type === "determinate";
    const barStyles = isDeterminate ? { width: `${this.value * 100}%` } : {};
    return (h("div", { "aria-label": this.label || this.text, "aria-valuemax": 1, "aria-valuemin": 0, "aria-valuenow": this.value, role: "progressbar" },
      h("div", { class: "track" },
        h("div", { class: {
            bar: true,
            indeterminate: this.type === "indeterminate",
            reversed: this.reversed
          }, style: barStyles })),
      this.text ? h("div", { class: "text" }, this.text) : null));
  }
  static get is() { return "calcite-progress"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["calcite-progress.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["calcite-progress.css"]
  }; }
  static get properties() { return {
    "type": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "\"indeterminate\" | \"determinate\"",
        "resolved": "\"determinate\" | \"indeterminate\"",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Use indeterminate if finding actual progress value is impossible"
      },
      "attribute": "type",
      "reflect": false,
      "defaultValue": "\"determinate\""
    },
    "value": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Fraction completed, in the range of 0 - 1.0"
      },
      "attribute": "value",
      "reflect": false,
      "defaultValue": "0"
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
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Label for the progress indicator"
      },
      "attribute": "label",
      "reflect": false
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
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Text to display for the progress indicator"
      },
      "attribute": "text",
      "reflect": false
    },
    "reversed": {
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
        "text": "For indeterminate progress bars, reverse the animation direction"
      },
      "attribute": "reversed",
      "reflect": false,
      "defaultValue": "false"
    }
  }; }
  static get elementRef() { return "el"; }
}
