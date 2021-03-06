import { Component, Element, Event, h, Listen, Method, Prop, State, Watch } from "@stencil/core";
import { guid } from "../../utils/guid";
import { focusElement, closestElementCrossShadowBoundary } from "../../utils/dom";
import { hiddenInputStyle } from "../../utils/form";
export class CalciteCheckbox {
  constructor() {
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------
    /** The checked state of the checkbox. */
    this.checked = false;
    /** True if the checkbox is disabled */
    this.disabled = false;
    /**
     * The hovered state of the checkbox.
     * @private
     */
    this.hovered = false;
    /**
     * True if the checkbox is initially indeterminate,
     * which is independent from its checked state
     * https://css-tricks.com/indeterminate-checkboxes/
     * */
    this.indeterminate = false;
    /** The name of the checkbox input */
    this.name = "";
    /** specify the scale of the checkbox, defaults to m */
    this.scale = "m";
    //--------------------------------------------------------------------------
    //
    //  Private Properties
    //
    //--------------------------------------------------------------------------
    this.checkedPath = "M5.5 12L2 8.689l.637-.636L5.5 10.727l8.022-7.87.637.637z";
    this.indeterminatePath = "M13 8v1H3V8z";
    //--------------------------------------------------------------------------
    //
    //  State
    //
    //--------------------------------------------------------------------------
    /** The focused state of the checkbox. */
    this.focused = false;
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    this.getPath = () => this.indeterminate ? this.indeterminatePath : this.checked ? this.checkedPath : "";
    this.toggle = () => {
      if (!this.disabled) {
        this.checked = !this.checked;
        focusElement(this.input);
        this.indeterminate = false;
        this.calciteCheckboxChange.emit();
      }
    };
    this.formResetHandler = () => {
      this.checked = this.initialChecked;
    };
    this.nativeLabelClickHandler = ({ target }) => {
      if (!this.el.closest("calcite-label") &&
        target.nodeName === "LABEL" &&
        target.parentNode.nodeName !== "CALCITE-LABEL" &&
        this.el.id &&
        target.htmlFor === this.el.id) {
        this.toggle();
      }
    };
  }
  checkedWatcher(newChecked) {
    this.input.checked = newChecked;
  }
  disabledChanged(disabled) {
    this.input.disabled = disabled;
  }
  nameChanged(newName) {
    this.input.name = newName;
  }
  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  async setFocus() {
    focusElement(this.input);
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  onClick(event) {
    // This line prevents double-triggering when wrapped inside either a <label> or a <calcite-label>
    // by preventing the browser default behavior, which is to click the label's first input child element
    if (event.target === this.el) {
      event.preventDefault();
    }
    this.toggle();
  }
  mouseenter() {
    this.hovered = true;
  }
  mouseleave() {
    this.hovered = false;
  }
  onInputBlur() {
    this.focused = false;
    this.calciteCheckboxFocusedChange.emit(false);
  }
  onInputFocus() {
    this.focused = true;
    this.calciteCheckboxFocusedChange.emit(true);
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    this.guid = this.el.id || `calcite-checkbox-${guid()}`;
    this.initialChecked = this.checked;
    this.renderHiddenCheckboxInput();
    const form = closestElementCrossShadowBoundary(this.el, "form");
    if (form) {
      form.addEventListener("reset", this.formResetHandler);
    }
    document.addEventListener("click", this.nativeLabelClickHandler);
  }
  disconnectedCallback() {
    this.input.parentNode.removeChild(this.input);
    const form = closestElementCrossShadowBoundary(this.el, "form");
    if (form) {
      form.removeEventListener("reset", this.formResetHandler);
    }
    document.removeEventListener("click", this.nativeLabelClickHandler);
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  renderHiddenCheckboxInput() {
    this.input = document.createElement("input");
    this.checked && this.input.setAttribute("checked", "");
    this.input.disabled = this.disabled;
    this.input.id = `${this.guid}-input`;
    this.input.name = this.name;
    this.input.onblur = this.onInputBlur.bind(this);
    this.input.onfocus = this.onInputFocus.bind(this);
    this.input.style.cssText = hiddenInputStyle;
    this.input.type = "checkbox";
    if (this.label) {
      this.input.setAttribute("aria-label", this.label);
    }
    else {
      this.input.removeAttribute("aria-label");
    }
    if (this.value) {
      this.input.value = this.value != null ? this.value.toString() : "";
    }
    this.el.appendChild(this.input);
  }
  render() {
    return (h("div", { class: { focused: this.focused } },
      h("svg", { class: "check-svg", viewBox: "0 0 16 16" },
        h("path", { d: this.getPath() })),
      h("slot", null)));
  }
  static get is() { return "calcite-checkbox"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["calcite-checkbox.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["calcite-checkbox.css"]
  }; }
  static get properties() { return {
    "checked": {
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
        "tags": [],
        "text": "The checked state of the checkbox."
      },
      "attribute": "checked",
      "reflect": true,
      "defaultValue": "false"
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
        "text": "True if the checkbox is disabled"
      },
      "attribute": "disabled",
      "reflect": true,
      "defaultValue": "false"
    },
    "guid": {
      "type": "string",
      "mutable": true,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "The id attribute of the checkbox.  When omitted, a globally unique identifier is used."
      },
      "attribute": "guid",
      "reflect": true
    },
    "hovered": {
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
        "tags": [{
            "text": undefined,
            "name": "private"
          }],
        "text": "The hovered state of the checkbox."
      },
      "attribute": "hovered",
      "reflect": true,
      "defaultValue": "false"
    },
    "indeterminate": {
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
        "tags": [],
        "text": "True if the checkbox is initially indeterminate,\nwhich is independent from its checked state\nhttps://css-tricks.com/indeterminate-checkboxes/"
      },
      "attribute": "indeterminate",
      "reflect": true,
      "defaultValue": "false"
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
      "optional": true,
      "docs": {
        "tags": [{
            "text": undefined,
            "name": "internal"
          }],
        "text": "The label of the checkbox input"
      },
      "attribute": "label",
      "reflect": false
    },
    "name": {
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
        "text": "The name of the checkbox input"
      },
      "attribute": "name",
      "reflect": true,
      "defaultValue": "\"\""
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
        "text": "specify the scale of the checkbox, defaults to m"
      },
      "attribute": "scale",
      "reflect": true,
      "defaultValue": "\"m\""
    },
    "value": {
      "type": "any",
      "mutable": false,
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "The value of the checkbox input"
      },
      "attribute": "value",
      "reflect": false
    }
  }; }
  static get states() { return {
    "focused": {}
  }; }
  static get events() { return [{
      "method": "calciteCheckboxChange",
      "name": "calciteCheckboxChange",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Emitted when the checkbox checked status changes"
      },
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      }
    }, {
      "method": "calciteCheckboxFocusedChange",
      "name": "calciteCheckboxFocusedChange",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [{
            "text": undefined,
            "name": "internal"
          }],
        "text": "Emitted when the checkbox focused state changes"
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
        "text": "",
        "tags": []
      }
    }
  }; }
  static get elementRef() { return "el"; }
  static get watchers() { return [{
      "propName": "checked",
      "methodName": "checkedWatcher"
    }, {
      "propName": "disabled",
      "methodName": "disabledChanged"
    }, {
      "propName": "name",
      "methodName": "nameChanged"
    }]; }
  static get listeners() { return [{
      "name": "click",
      "method": "onClick",
      "target": undefined,
      "capture": false,
      "passive": false
    }, {
      "name": "mouseenter",
      "method": "mouseenter",
      "target": undefined,
      "capture": false,
      "passive": true
    }, {
      "name": "mouseleave",
      "method": "mouseleave",
      "target": undefined,
      "capture": false,
      "passive": true
    }]; }
}
