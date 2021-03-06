import { Component, Element, Event, h, Host, Listen, Prop } from "@stencil/core";
import { getElementDir, getElementProp } from "../../utils/dom";
import { getKey } from "../../utils/key";
import { CSS_UTILITY } from "../../utils/resources";
export class CalciteAccordionItem {
  constructor() {
    //--------------------------------------------------------------------------
    //
    //  Public Properties
    //
    //--------------------------------------------------------------------------
    this.active = false;
    /** what icon position does the parent accordion specify */
    this.iconPosition = "end";
    /** handle clicks on item header */
    this.itemHeaderClickHandler = () => this.emitRequestedItem();
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    this.parent = this.el.parentElement;
    this.selectionMode = getElementProp(this.el, "selection-mode", "multi");
    this.iconType = getElementProp(this.el, "icon-type", "chevron");
    this.iconPosition = getElementProp(this.el, "icon-position", this.iconPosition);
  }
  componentDidLoad() {
    this.itemPosition = this.getItemPosition();
    this.calciteAccordionItemRegister.emit({
      parent: this.parent,
      position: this.itemPosition
    });
  }
  render() {
    const dir = getElementDir(this.el);
    const iconEl = h("calcite-icon", { class: "accordion-item-icon", icon: this.icon, scale: "s" });
    return (h(Host, { "aria-expanded": this.active.toString(), tabindex: "0" },
      h("div", { class: {
          [`icon-position--${this.iconPosition}`]: true,
          [`icon-type--${this.iconType}`]: true
        } },
        h("div", { class: { "accordion-item-header": true, [CSS_UTILITY.rtl]: dir === "rtl" }, onClick: this.itemHeaderClickHandler },
          this.icon ? iconEl : null,
          h("div", { class: "accordion-item-header-text" },
            h("span", { class: "accordion-item-title" }, this.itemTitle),
            this.itemSubtitle ? (h("span", { class: "accordion-item-subtitle" }, this.itemSubtitle)) : null),
          h("calcite-icon", { class: "accordion-item-expand-icon", icon: this.iconType === "chevron"
              ? "chevronUp"
              : this.iconType === "caret"
                ? "caretUp"
                : this.active
                  ? "minus"
                  : "plus", scale: "s" })),
        h("div", { class: "accordion-item-content" },
          h("slot", null)))));
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  keyDownHandler(e) {
    if (e.target === this.el) {
      switch (getKey(e.key)) {
        case " ":
        case "Enter":
          this.emitRequestedItem();
          e.preventDefault();
          break;
        case "ArrowUp":
        case "ArrowDown":
        case "Home":
        case "End":
          this.calciteAccordionItemKeyEvent.emit({
            parent: this.parent,
            item: e
          });
          e.preventDefault();
          break;
      }
    }
  }
  updateActiveItemOnChange(event) {
    this.requestedAccordionItem = event.detail
      .requestedAccordionItem;
    this.determineActiveItem();
  }
  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  determineActiveItem() {
    switch (this.selectionMode) {
      case "multi":
        if (this.el === this.requestedAccordionItem) {
          this.active = !this.active;
        }
        break;
      case "single":
        if (this.el === this.requestedAccordionItem) {
          this.active = !this.active;
        }
        else {
          this.active = false;
        }
        break;
      case "single-persist":
        this.active = this.el === this.requestedAccordionItem;
        break;
    }
  }
  emitRequestedItem() {
    this.calciteAccordionItemSelect.emit({
      requestedAccordionItem: this.el
    });
  }
  getItemPosition() {
    return Array.prototype.indexOf.call(this.parent.querySelectorAll("calcite-accordion-item"), this.el);
  }
  static get is() { return "calcite-accordion-item"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["calcite-accordion-item.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["calcite-accordion-item.css"]
  }; }
  static get properties() { return {
    "active": {
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
        "text": ""
      },
      "attribute": "active",
      "reflect": true,
      "defaultValue": "false"
    },
    "itemTitle": {
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
        "text": "pass a title for the accordion item"
      },
      "attribute": "item-title",
      "reflect": false
    },
    "itemSubtitle": {
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
        "text": "pass a title for the accordion item"
      },
      "attribute": "item-subtitle",
      "reflect": false
    },
    "icon": {
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
        "text": "optionally pass an icon to display - accepts Calcite UI icon names"
      },
      "attribute": "icon",
      "reflect": true
    }
  }; }
  static get events() { return [{
      "method": "calciteAccordionItemKeyEvent",
      "name": "calciteAccordionItemKeyEvent",
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
      "method": "calciteAccordionItemSelect",
      "name": "calciteAccordionItemSelect",
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
      "method": "calciteAccordionItemClose",
      "name": "calciteAccordionItemClose",
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
      "method": "calciteAccordionItemRegister",
      "name": "calciteAccordionItemRegister",
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
  static get listeners() { return [{
      "name": "keydown",
      "method": "keyDownHandler",
      "target": undefined,
      "capture": false,
      "passive": false
    }, {
      "name": "calciteAccordionChange",
      "method": "updateActiveItemOnChange",
      "target": "body",
      "capture": false,
      "passive": false
    }]; }
}
