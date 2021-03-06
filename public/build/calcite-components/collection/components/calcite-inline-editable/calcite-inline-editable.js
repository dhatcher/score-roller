import { Component, Element, Event, h, Listen, Prop, Watch } from "@stencil/core";
import { getElementProp } from "../../utils/dom";
import { TEXT, CSS } from "./resources";
/**
 * @slot - slot for rendering a `<calcite-input>`
 */
export class CalciteInlineEditable {
  constructor() {
    //--------------------------------------------------------------------------
    //
    //  Props
    //
    //--------------------------------------------------------------------------
    /** specify whether editing can be enabled */
    this.disabled = false;
    /** specify whether the wrapped input element is editable, defaults to false */
    this.editingEnabled = false;
    /** specify whether the confirm button should display a loading state, defaults to false */
    this.loading = false;
    /** specify whether save/cancel controls should be displayed when editingEnabled is true, defaults to false */
    this.controls = false;
    /** specify text to be user for the enable editing button's aria-label, defaults to `Click to edit`
     * @default "Click to edit"
     */
    this.intlEnableEditing = TEXT.intlEnablingEditing;
    /** specify text to be user for the cancel editing button's aria-label, defaults to `Cancel`
     * @default "Cancel"
     */
    this.intlCancelEditing = TEXT.intlCancelEditing;
    /** specify text to be user for the confirm changes button's aria-label, defaults to `Save`
     * @default "Save"
     */
    this.intlConfirmChanges = TEXT.intlConfirmChanges;
    this.editingCancelTransitionProp = "border-top-color";
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    this.transitionEnd = (event) => {
      if (!this.editingEnabled && event.propertyName === this.editingCancelTransitionProp) {
        this.calciteInlineEditableEditingCancel.emit(event);
      }
    };
    this.enableEditing = () => {
      this.htmlInput.tabIndex = undefined;
      this.valuePriorToEditing = this.inputElement.value;
      this.editingEnabled = true;
      this.inputElement.setFocus();
      this.calciteInlineEditableEnableEditingChange.emit();
    };
    this.disableEditing = () => {
      this.htmlInput.tabIndex = -1;
      this.editingEnabled = false;
    };
    this.cancelEditingEnd = () => {
      this.enableEditingButton.setFocus();
      this.el.removeEventListener("calciteInlineEditableEditingCancel", this.cancelEditingEnd);
    };
    this.cancelEditing = () => {
      this.inputElement.value = this.valuePriorToEditing;
      this.el.addEventListener("calciteInlineEditableEditingCancel", this.cancelEditingEnd);
      this.disableEditing();
    };
    this.escapeKeyHandler = async (e) => {
      if (e.key !== "Escape") {
        return;
      }
      this.cancelEditing();
    };
    this.cancelEditingHandler = async (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.cancelEditing();
    };
    this.enableEditingHandler = async (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (this.disabled) {
        return;
      }
      if (!this.editingEnabled) {
        this.enableEditing();
      }
    };
    this.confirmChangesHandler = async (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.calciteInlineEditableChangesConfirm.emit();
      try {
        if (this.afterConfirm) {
          this.loading = true;
          await this.afterConfirm();
          this.disableEditing();
        }
      }
      catch (e) {
      }
      finally {
        this.loading = false;
      }
    };
  }
  disabledWatcher(disabled) {
    this.inputElement.disabled = disabled;
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  componentWillLoad() {
    this.inputElement = this.el.querySelector("calcite-input");
    this.inputElement.disabled = this.disabled;
    this.scale =
      this.scale || this.inputElement.scale || getElementProp(this.el, "scale", undefined);
  }
  componentDidLoad() {
    this.htmlInput = this.inputElement.querySelector("input");
    if (!this.editingEnabled) {
      this.htmlInput.tabIndex = -1;
    }
  }
  render() {
    return (h("div", { class: CSS.wrapper, onClick: this.enableEditingHandler, onKeyDown: this.escapeKeyHandler, onTransitionEnd: this.transitionEnd },
      h("div", { class: CSS.inputWrapper },
        h("slot", null)),
      h("div", { class: CSS.controlsWrapper },
        !this.editingEnabled && (h("calcite-button", { appearance: "transparent", class: CSS.enableEditingButton, color: "neutral", disabled: this.disabled, iconStart: "pencil", label: this.intlEnableEditing, onClick: this.enableEditingHandler, ref: (el) => (this.enableEditingButton = el), scale: this.scale })),
        this.shouldShowControls && [
          h("div", { class: CSS.cancelEditingButtonWrapper },
            h("calcite-button", { appearance: "transparent", class: CSS.cancelEditingButton, color: "neutral", disabled: this.disabled, iconStart: "x", label: this.intlCancelEditing, onClick: this.cancelEditingHandler, scale: this.scale })),
          h("calcite-button", { appearance: "solid", class: CSS.confirmChangesButton, color: "blue", disabled: this.disabled, iconStart: "check", label: this.intlConfirmChanges, loading: this.loading, onClick: this.confirmChangesHandler, scale: this.scale })
        ])));
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  blurHandler() {
    if (!this.controls) {
      this.disableEditing();
    }
  }
  handleLabelFocus(e) {
    const htmlTarget = e.target;
    if (!(htmlTarget.parentElement.tagName === "LABEL" ||
      htmlTarget.parentElement.tagName === "CALCITE-LABEL")) {
      return;
    }
    if (!htmlTarget.parentElement.contains(this.el)) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    if (this.editingEnabled) {
      this.inputElement.setFocus();
    }
    else {
      this.enableEditingButton.setFocus();
    }
  }
  get shouldShowControls() {
    return this.editingEnabled && this.controls;
  }
  static get is() { return "calcite-inline-editable"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() { return {
    "$": ["calcite-inline-editable.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["calcite-inline-editable.css"]
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
        "text": "specify whether editing can be enabled"
      },
      "attribute": "disabled",
      "reflect": true,
      "defaultValue": "false"
    },
    "editingEnabled": {
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
        "text": "specify whether the wrapped input element is editable, defaults to false"
      },
      "attribute": "editing-enabled",
      "reflect": true,
      "defaultValue": "false"
    },
    "loading": {
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
        "text": "specify whether the confirm button should display a loading state, defaults to false"
      },
      "attribute": "loading",
      "reflect": true,
      "defaultValue": "false"
    },
    "controls": {
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
        "text": "specify whether save/cancel controls should be displayed when editingEnabled is true, defaults to false"
      },
      "attribute": "controls",
      "reflect": true,
      "defaultValue": "false"
    },
    "intlEnableEditing": {
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
            "text": "\"Click to edit\"",
            "name": "default"
          }],
        "text": "specify text to be user for the enable editing button's aria-label, defaults to `Click to edit`"
      },
      "attribute": "intl-enable-editing",
      "reflect": true,
      "defaultValue": "TEXT.intlEnablingEditing"
    },
    "intlCancelEditing": {
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
            "text": "\"Cancel\"",
            "name": "default"
          }],
        "text": "specify text to be user for the cancel editing button's aria-label, defaults to `Cancel`"
      },
      "attribute": "intl-cancel-editing",
      "reflect": true,
      "defaultValue": "TEXT.intlCancelEditing"
    },
    "intlConfirmChanges": {
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
            "text": "\"Save\"",
            "name": "default"
          }],
        "text": "specify text to be user for the confirm changes button's aria-label, defaults to `Save`"
      },
      "attribute": "intl-confirm-changes",
      "reflect": true,
      "defaultValue": "TEXT.intlConfirmChanges"
    },
    "scale": {
      "type": "string",
      "mutable": true,
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
      "optional": true,
      "docs": {
        "tags": [],
        "text": "specify the scale of the inline-editable component, defaults to the scale of the wrapped calcite-input or the scale of the closest wrapping component with a set scale"
      },
      "attribute": "scale",
      "reflect": true
    },
    "afterConfirm": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "() => Promise<void>",
        "resolved": "() => Promise<void>",
        "references": {
          "Promise": {
            "location": "global"
          }
        }
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "when controls, specify a callback to be executed prior to disabling editing. when provided, loading state will be handled automatically."
      }
    }
  }; }
  static get events() { return [{
      "method": "calciteInlineEditableEditingCancel",
      "name": "calciteInlineEditableEditingCancel",
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
        "original": "any",
        "resolved": "any",
        "references": {}
      }
    }, {
      "method": "calciteInlineEditableChangesConfirm",
      "name": "calciteInlineEditableChangesConfirm",
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
        "original": "any",
        "resolved": "any",
        "references": {}
      }
    }, {
      "method": "calciteInlineEditableEnableEditingChange",
      "name": "calciteInlineEditableEnableEditingChange",
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
        "original": "any",
        "resolved": "any",
        "references": {}
      }
    }]; }
  static get elementRef() { return "el"; }
  static get watchers() { return [{
      "propName": "disabled",
      "methodName": "disabledWatcher"
    }]; }
  static get listeners() { return [{
      "name": "calciteInputBlur",
      "method": "blurHandler",
      "target": undefined,
      "capture": false,
      "passive": false
    }, {
      "name": "click",
      "method": "handleLabelFocus",
      "target": "window",
      "capture": false,
      "passive": false
    }]; }
}
