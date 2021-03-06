import { Component, Element, Event, Listen, h, Prop } from "@stencil/core";
import { getElementDir, queryElementRoots } from "../../utils/dom";
import { CSS_UTILITY } from "../../utils/resources";
export class CalciteLabel {
  constructor() {
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------
    /** specify the text alignment of the label */
    this.alignment = "start";
    /** specify the status of the label and any child input / input messages */
    this.status = "idle";
    /** specify the scale of the input, defaults to m */
    this.scale = "m";
    /** is the wrapped element positioned inline with the label slotted text */
    this.layout = "default";
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    this.handleCalciteHtmlForClicks = (target) => {
      // 1. has htmlFor
      if (!this.for) {
        return;
      }
      // 2. htmlFor matches a calcite component
      const inputForThisLabel = queryElementRoots(this.el, `#${this.for}`);
      if (!inputForThisLabel) {
        return;
      }
      if (!inputForThisLabel.localName.startsWith("calcite")) {
        return;
      }
      // 5. target is NOT the calcite component that this label matches
      if (target === inputForThisLabel) {
        return;
      }
      // 3. target is not a labelable native form element
      const labelableNativeElements = [
        "button",
        "input",
        "meter",
        "output",
        "progress",
        "select",
        "textarea"
      ];
      if (labelableNativeElements.includes(target.localName)) {
        return;
      }
      // 4. target is not a labelable calcite form element
      const labelableCalciteElements = [
        "calcite-button",
        "calcite-checkbox",
        "calcite-date",
        "calcite-inline-editable",
        "calcite-input",
        "calcite-radio",
        "calcite-radio-button",
        "calcite-radio-button-group",
        "calcite-radio-group",
        "calcite-rating",
        "calcite-select",
        "calcite-slider",
        "calcite-switch"
      ];
      if (labelableCalciteElements.includes(target.localName)) {
        return;
      }
      // 5. target is not a child of a labelable calcite form element
      for (let i = 0; i < labelableCalciteElements.length; i++) {
        if (target.closest(labelableCalciteElements[i])) {
          return;
        }
      }
      inputForThisLabel.click();
    };
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  onClick(event) {
    const target = event.target;
    this.calciteLabelFocus.emit({
      labelEl: this.el,
      interactedEl: target,
      requestedInput: this.for
    });
    this.handleCalciteHtmlForClicks(target);
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  render() {
    const dir = getElementDir(this.el);
    return (h("label", { class: { [CSS_UTILITY.rtl]: dir === "rtl" }, htmlFor: this.for },
      h("slot", null)));
  }
  static get is() { return "calcite-label"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() { return {
    "$": ["calcite-label.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["calcite-label.css"]
  }; }
  static get properties() { return {
    "alignment": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "Alignment",
        "resolved": "\"center\" | \"end\" | \"start\"",
        "references": {
          "Alignment": {
            "location": "import",
            "path": "../interfaces"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "specify the text alignment of the label"
      },
      "attribute": "alignment",
      "reflect": true,
      "defaultValue": "\"start\""
    },
    "status": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "Status",
        "resolved": "\"idle\" | \"invalid\" | \"valid\"",
        "references": {
          "Status": {
            "location": "import",
            "path": "../interfaces"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "specify the status of the label and any child input / input messages"
      },
      "attribute": "status",
      "reflect": true,
      "defaultValue": "\"idle\""
    },
    "for": {
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
        "text": "The id of the input associated with the label"
      },
      "attribute": "for",
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
        "text": "specify the scale of the input, defaults to m"
      },
      "attribute": "scale",
      "reflect": true,
      "defaultValue": "\"m\""
    },
    "layout": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "\"inline\" | \"inline-space-between\" | \"default\"",
        "resolved": "\"default\" | \"inline\" | \"inline-space-between\"",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "is the wrapped element positioned inline with the label slotted text"
      },
      "attribute": "layout",
      "reflect": true,
      "defaultValue": "\"default\""
    },
    "disableSpacing": {
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
        "text": "eliminates any space around the label"
      },
      "attribute": "disable-spacing",
      "reflect": false
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
        "text": "is the label disabled"
      },
      "attribute": "disabled",
      "reflect": true
    }
  }; }
  static get events() { return [{
      "method": "calciteLabelFocus",
      "name": "calciteLabelFocus",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [{
            "text": undefined,
            "name": "internal"
          }],
        "text": ""
      },
      "complexType": {
        "original": "FocusRequest",
        "resolved": "FocusRequest",
        "references": {
          "FocusRequest": {
            "location": "import",
            "path": "./interfaces"
          }
        }
      }
    }]; }
  static get elementRef() { return "el"; }
  static get listeners() { return [{
      "name": "click",
      "method": "onClick",
      "target": undefined,
      "capture": false,
      "passive": false
    }]; }
}
