import { Component, Element, Event, h, Listen, Method, Prop, Watch } from "@stencil/core";
import { getKey } from "../../utils/key";
export class CalciteStepper {
  constructor() {
    //--------------------------------------------------------------------------
    //
    //  Public Properties
    //
    //--------------------------------------------------------------------------
    /** optionally display a status icon next to the step title */
    this.icon = false;
    /** specify the layout of stepper, defaults to horizontal */
    this.layout = "horizontal";
    /** optionally display the number next to the step title */
    this.numbered = false;
    /** specify the scale of stepper, defaults to m */
    this.scale = "m";
    //--------------------------------------------------------------------------
    //
    //  Private State/Props
    //
    //--------------------------------------------------------------------------
    /** created list of Stepper items */
    this.items = [];
    /** sorted list of Stepper items */
    this.sortedItems = [];
  }
  // watch for removal of disabled to register step
  contentWatcher() {
    if (this.layout === "horizontal") {
      if (!this.stepperContentContainer && this.requestedContent) {
        this.addHorizontalContentContainer();
      }
      this.updateContent(this.requestedContent);
    }
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  componentDidLoad() {
    // if no stepper items are set as active, default to the first one
    if (!this.currentPosition) {
      this.calciteStepperItemChange.emit({
        position: 0
      });
    }
  }
  componentWillLoad() {
    if (this.layout === "horizontal" && !this.stepperContentContainer) {
      this.addHorizontalContentContainer();
    }
  }
  render() {
    return h("slot", null);
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  calciteStepperItemKeyEvent(e) {
    const item = e.detail.item;
    const itemToFocus = e.target;
    const isFirstItem = this.itemIndex(itemToFocus) === 0;
    const isLastItem = this.itemIndex(itemToFocus) === this.sortedItems.length - 1;
    switch (getKey(item.key)) {
      case "ArrowDown":
      case "ArrowRight":
        if (isLastItem) {
          this.focusFirstItem();
        }
        else {
          this.focusNextItem(itemToFocus);
        }
        break;
      case "ArrowUp":
      case "ArrowLeft":
        if (isFirstItem) {
          this.focusLastItem();
        }
        else {
          this.focusPrevItem(itemToFocus);
        }
        break;
      case "Home":
        this.focusFirstItem();
        break;
      case "End":
        this.focusLastItem();
        break;
    }
  }
  registerItem(event) {
    const item = {
      item: event.target,
      position: event.detail.position,
      content: event.detail.content
    };
    if (item.content && item.item.active) {
      this.requestedContent = item.content;
    }
    if (!this.items.includes(item)) {
      this.items.push(item);
    }
    this.sortedItems = this.sortItems();
  }
  updateItem(event) {
    if (event.detail.content) {
      this.requestedContent = event.detail.content;
    }
    this.currentPosition = event.detail.position;
    this.calciteStepperItemChange.emit({
      position: this.currentPosition
    });
  }
  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  /** set the next step as active */
  async nextStep() {
    this.currentPosition =
      this.currentPosition + 1 < this.items.length
        ? this.currentPosition + 1
        : this.currentPosition;
    this.emitChangedItem();
  }
  /** set the previous step as active */
  async prevStep() {
    this.currentPosition =
      this.currentPosition - 1 >= 0 ? this.currentPosition - 1 : this.currentPosition;
    this.emitChangedItem();
  }
  /** set the requested step as active */
  async goToStep(num) {
    this.currentPosition = num - 1;
    this.emitChangedItem();
  }
  /** set the first step as active */
  async startStep() {
    this.currentPosition = 0;
    this.emitChangedItem();
  }
  /** set the last step as active */
  async endStep() {
    this.currentPosition = this.items.length - 1;
    this.emitChangedItem();
  }
  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  addHorizontalContentContainer() {
    this.stepperContentContainer = document.createElement("div");
    this.stepperContentContainer.classList.add("calcite-stepper-content");
    this.el.insertAdjacentElement("beforeend", this.stepperContentContainer);
  }
  emitChangedItem() {
    this.calciteStepperItemChange.emit({
      position: this.currentPosition
    });
  }
  focusFirstItem() {
    const firstItem = this.sortedItems[0];
    this.focusElement(firstItem);
  }
  focusLastItem() {
    const lastItem = this.sortedItems[this.sortedItems.length - 1];
    this.focusElement(lastItem);
  }
  focusNextItem(e) {
    const index = this.itemIndex(e);
    const nextItem = this.sortedItems[index + 1] || this.sortedItems[0];
    this.focusElement(nextItem);
  }
  focusPrevItem(e) {
    const index = this.itemIndex(e);
    const prevItem = this.sortedItems[index - 1] || this.sortedItems[this.sortedItems.length - 1];
    this.focusElement(prevItem);
  }
  itemIndex(e) {
    return this.sortedItems.indexOf(e);
  }
  focusElement(item) {
    const target = item;
    target.focus();
  }
  sortItems() {
    const items = Array.from(this.items)
      .filter((a) => !a.item.disabled)
      .sort((a, b) => a.position - b.position)
      .map((a) => a.item);
    return [...Array.from(new Set(items))];
  }
  updateContent(content) {
    this.stepperContentContainer.innerHTML = "";
    this.stepperContentContainer.append(...content);
  }
  static get is() { return "calcite-stepper"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["calcite-stepper.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["calcite-stepper.css"]
  }; }
  static get properties() { return {
    "icon": {
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
        "text": "optionally display a status icon next to the step title"
      },
      "attribute": "icon",
      "reflect": true,
      "defaultValue": "false"
    },
    "layout": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "Layout",
        "resolved": "\"grid\" | \"horizontal\" | \"vertical\"",
        "references": {
          "Layout": {
            "location": "import",
            "path": "../interfaces"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "specify the layout of stepper, defaults to horizontal"
      },
      "attribute": "layout",
      "reflect": true,
      "defaultValue": "\"horizontal\""
    },
    "numbered": {
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
        "text": "optionally display the number next to the step title"
      },
      "attribute": "numbered",
      "reflect": true,
      "defaultValue": "false"
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
        "text": "specify the scale of stepper, defaults to m"
      },
      "attribute": "scale",
      "reflect": true,
      "defaultValue": "\"m\""
    },
    "requestedContent": {
      "type": "unknown",
      "mutable": true,
      "complexType": {
        "original": "HTMLElement[] | NodeListOf<any>",
        "resolved": "HTMLElement[] | NodeListOf<any>",
        "references": {
          "HTMLElement": {
            "location": "global"
          },
          "NodeListOf": {
            "location": "global"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [{
            "text": undefined,
            "name": "internal"
          }],
        "text": ""
      }
    }
  }; }
  static get events() { return [{
      "method": "calciteStepperItemChange",
      "name": "calciteStepperItemChange",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [{
            "text": undefined,
            "name": "internal"
          }],
        "text": "This event fires when the active stepper item has changed."
      },
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      }
    }]; }
  static get methods() { return {
    "nextStep": {
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
        "text": "set the next step as active",
        "tags": []
      }
    },
    "prevStep": {
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
        "text": "set the previous step as active",
        "tags": []
      }
    },
    "goToStep": {
      "complexType": {
        "signature": "(num: number) => Promise<void>",
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
        "text": "set the requested step as active",
        "tags": []
      }
    },
    "startStep": {
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
        "text": "set the first step as active",
        "tags": []
      }
    },
    "endStep": {
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
        "text": "set the last step as active",
        "tags": []
      }
    }
  }; }
  static get elementRef() { return "el"; }
  static get watchers() { return [{
      "propName": "requestedContent",
      "methodName": "contentWatcher"
    }]; }
  static get listeners() { return [{
      "name": "calciteStepperItemKeyEvent",
      "method": "calciteStepperItemKeyEvent",
      "target": undefined,
      "capture": false,
      "passive": false
    }, {
      "name": "calciteStepperItemRegister",
      "method": "registerItem",
      "target": undefined,
      "capture": false,
      "passive": false
    }, {
      "name": "calciteStepperItemSelect",
      "method": "updateItem",
      "target": undefined,
      "capture": false,
      "passive": false
    }]; }
}
