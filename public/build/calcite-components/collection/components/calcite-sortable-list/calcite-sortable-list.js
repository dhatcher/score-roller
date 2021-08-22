import Sortable from "sortablejs";
import { Component, Element, Event, Listen, Prop, State, h } from "@stencil/core";
/**
 * @slot - A slot for adding sortable items
 */
export class CalciteSortableList {
  constructor() {
    /**
     * The selector for the handle elements.
     */
    this.handleSelector = "calcite-handle";
    /**
     * When true, disabled prevents interaction. This state shows items with lower opacity/grayed.
     */
    this.disabled = false;
    /**
     * When true, content is waiting to be loaded. This state shows a busy indicator.
     */
    this.loading = false;
    this.handleActivated = false;
    this.items = [];
    this.observer = new MutationObserver(() => {
      this.items = Array.from(this.el.children);
      this.setUpDragAndDrop();
    });
  }
  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------
  connectedCallback() {
    this.items = Array.from(this.el.children);
    this.setUpDragAndDrop();
    this.beginObserving();
  }
  disconnectedCallback() {
    this.observer.disconnect();
    this.cleanUpDragAndDrop();
  }
  calciteHandleNudgeHandler(event) {
    const sortItem = this.items.find((item) => {
      return item.contains(event.detail.handle) || event.composedPath().includes(item);
    });
    const lastIndex = this.items.length - 1;
    const startingIndex = this.items.indexOf(sortItem);
    let appendInstead = false;
    let buddyIndex;
    switch (event.detail.direction) {
      case "up":
        event.preventDefault();
        if (startingIndex === 0) {
          appendInstead = true;
        }
        else {
          buddyIndex = startingIndex - 1;
        }
        break;
      case "down":
        event.preventDefault();
        if (startingIndex === lastIndex) {
          buddyIndex = 0;
        }
        else if (startingIndex === lastIndex - 1) {
          appendInstead = true;
        }
        else {
          buddyIndex = startingIndex + 2;
        }
        break;
      default:
        return;
    }
    this.observer.disconnect();
    if (appendInstead) {
      sortItem.parentElement.appendChild(sortItem);
    }
    else {
      sortItem.parentElement.insertBefore(sortItem, this.items[buddyIndex]);
    }
    this.items = Array.from(this.el.children);
    event.detail.handle.activated = true;
    event.detail.handle.setFocus();
    this.beginObserving();
  }
  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------
  setUpDragAndDrop() {
    this.cleanUpDragAndDrop();
    const options = {
      dataIdAttr: "id",
      group: this.group,
      handle: this.handleSelector,
      // Changed sorting within list
      onUpdate: () => {
        this.items = Array.from(this.el.children);
        this.calciteListOrderChange.emit();
      },
      // Element dragging started
      onStart: () => {
        this.observer.disconnect();
      },
      // Element dragging ended
      onEnd: () => {
        this.beginObserving();
      }
    };
    if (this.dragSelector) {
      options.draggable = this.dragSelector;
    }
    this.sortable = Sortable.create(this.el, options);
  }
  cleanUpDragAndDrop() {
    var _a;
    (_a = this.sortable) === null || _a === void 0 ? void 0 : _a.destroy();
    this.sortable = null;
  }
  beginObserving() {
    this.observer.observe(this.el, { childList: true, subtree: true });
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  render() {
    return h("slot", null);
  }
  static get is() { return "calcite-sortable-list"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["calcite-sortable-list.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["calcite-sortable-list.css"]
  }; }
  static get properties() { return {
    "dragSelector": {
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
        "text": "Specifies which items inside the element should be draggable."
      },
      "attribute": "drag-selector",
      "reflect": false
    },
    "group": {
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
        "text": "The list's group identifier.\n\nTo drag elements from one list into another, both lists must have the same group value."
      },
      "attribute": "group",
      "reflect": false
    },
    "handleSelector": {
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
        "text": "The selector for the handle elements."
      },
      "attribute": "handle-selector",
      "reflect": false,
      "defaultValue": "\"calcite-handle\""
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
      "optional": false,
      "docs": {
        "tags": [],
        "text": "When true, disabled prevents interaction. This state shows items with lower opacity/grayed."
      },
      "attribute": "disabled",
      "reflect": true,
      "defaultValue": "false"
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
        "text": "When true, content is waiting to be loaded. This state shows a busy indicator."
      },
      "attribute": "loading",
      "reflect": true,
      "defaultValue": "false"
    }
  }; }
  static get states() { return {
    "handleActivated": {}
  }; }
  static get events() { return [{
      "method": "calciteListOrderChange",
      "name": "calciteListOrderChange",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Emitted when the order of the list has changed."
      },
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      }
    }]; }
  static get elementRef() { return "el"; }
  static get listeners() { return [{
      "name": "calciteHandleNudge",
      "method": "calciteHandleNudgeHandler",
      "target": undefined,
      "capture": false,
      "passive": false
    }]; }
}
