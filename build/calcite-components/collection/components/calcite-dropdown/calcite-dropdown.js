import { Component, Element, Event, h, Host, Listen, Method, Prop, Watch } from "@stencil/core";
import { getKey } from "../../utils/key";
import { focusElement, getElementDir } from "../../utils/dom";
import { createPopper, CSS as PopperCSS, updatePopper } from "../../utils/popper";
import { DefaultDropdownPlacement } from "./resources";
import { CSS_UTILITY } from "../../utils/resources";
export class CalciteDropdown {
  constructor() {
    //--------------------------------------------------------------------------
    //
    //  Public Properties
    //
    //--------------------------------------------------------------------------
    this.active = false;
    /**
     allow the dropdown to remain open after a selection is made
     if the selection-mode of the selected item's containing group is "none", the dropdown will always close
     */
    this.disableCloseOnSelect = false;
    /**
     specify the maximum number of calcite-dropdown-items to display before showing the scroller, must be greater than 0 -
     this value does not include groupTitles passed to calcite-dropdown-group
    */
    this.maxItems = 0;
    /** Describes the type of positioning to use for the overlaid content. If your element is in a fixed container, use the 'fixed' value. */
    this.overlayPositioning = "absolute";
    /**
     * Determines where the dropdown will be positioned relative to the button.
     * @default "bottom-leading"
     */
    this.placement = DefaultDropdownPlacement;
    /** specify the scale of dropdown, defaults to m */
    this.scale = "m";
    /**
     * **read-only** The currently selected items
     *
     * @readonly
     */
    this.selectedItems = [];
    /** specify whether the dropdown is opened by hover or click of a trigger element */
    this.type = "click";
    /** specify the width of dropdown, defaults to m */
    this.width = "m";
    //--------------------------------------------------------------------------
    //
    //  Private State/Props
    //
    //--------------------------------------------------------------------------
    this.items = [];
    /** specifies the item wrapper height; it is updated when maxItems is > 0  **/
    this.maxScrollerHeight = 0;
    this.activeTransitionProp = "opacity";
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    this.transitionEnd = (event) => {
      if (event.propertyName === this.activeTransitionProp) {
        this.active ? this.calciteDropdownOpen.emit() : this.calciteDropdownClose.emit();
      }
    };
    this.setReferenceEl = (el) => {
      this.referenceEl = el;
    };
    this.setMenuEl = (el) => {
      this.menuEl = el;
    };
    this.openDropdown = (e) => {
      const target = e.target;
      if (this.triggers.includes(target) ||
        this.triggers.some((trigger) => trigger.contains(target))) {
        e.preventDefault();
        e.stopPropagation();
        this.openCalciteDropdown();
      }
    };
    this.keyDownHandler = (e) => {
      const target = e.target;
      const key = getKey(e.key);
      if (this.triggers.includes(target) ||
        this.triggers.some((trigger) => trigger.contains(target))) {
        if (target.nodeName !== "BUTTON" && target.nodeName !== "CALCITE-BUTTON") {
          switch (key) {
            case " ":
            case "Enter":
              this.openCalciteDropdown();
              break;
            case "Escape":
              this.closeCalciteDropdown();
              break;
          }
        }
        else if (this.active && (key === "Escape" || (e.shiftKey && key === "Tab"))) {
          this.closeCalciteDropdown();
        }
      }
    };
    this.focusOnFirstActiveOrFirstItem = () => {
      this.getFocusableElement(this.items.find((item) => item.active) || this.items[0]);
    };
    this.toggleOpenEnd = () => {
      this.focusOnFirstActiveOrFirstItem();
      this.el.removeEventListener("calciteDropdownOpen", this.toggleOpenEnd);
    };
    this.openCalciteDropdown = () => {
      this.active = !this.active;
      if (this.active) {
        this.el.addEventListener("calciteDropdownOpen", this.toggleOpenEnd);
      }
    };
  }
  activeHandler() {
    this.reposition();
  }
  placementHandler() {
    this.reposition();
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    this.createPopper();
  }
  componentWillLoad() {
    // get initially selected items
    this.updateSelectedItems();
  }
  componentDidLoad() {
    this.triggers = Array.from(this.el.querySelectorAll("[slot=dropdown-trigger]"));
    const groups = Array.from(this.el.querySelectorAll("calcite-dropdown-group"));
    this.maxScrollerHeight = this.getMaxScrollerHeight(groups);
    this.items = Array.from(this.el.querySelectorAll("calcite-dropdown-item"));
    this.reposition();
  }
  disconnectedCallback() {
    this.destroyPopper();
  }
  render() {
    const { active, maxScrollerHeight } = this;
    const dir = getElementDir(this.el);
    return (h(Host, { tabIndex: this.disabled ? -1 : null },
      h("div", { class: { ["calcite-dropdown-trigger-container"]: true, [CSS_UTILITY.rtl]: dir === "rtl" }, onClick: this.openDropdown, onKeyDown: this.keyDownHandler, ref: this.setReferenceEl },
        h("slot", { "aria-expanded": active.toString(), "aria-haspopup": "true", name: "dropdown-trigger" })),
      h("div", { "aria-hidden": (!active).toString(), class: "calcite-dropdown-wrapper", ref: this.setMenuEl },
        h("div", { class: {
            ["calcite-dropdown-content"]: true,
            [PopperCSS.animation]: true,
            [PopperCSS.animationActive]: active
          }, onTransitionEnd: this.transitionEnd, style: {
            maxHeight: maxScrollerHeight > 0 ? `${maxScrollerHeight}px` : ""
          } },
          h("slot", null)))));
  }
  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  async reposition() {
    const { popper, menuEl, placement } = this;
    const modifiers = this.getModifiers();
    popper
      ? updatePopper({
        el: menuEl,
        modifiers,
        placement,
        popper
      })
      : this.createPopper();
  }
  closeCalciteDropdownOnClick(e) {
    const target = e.target;
    if (this.active &&
      target.nodeName !== "CALCITE-DROPDOWN-ITEM" &&
      target.nodeName !== "CALCITE-DROPDOWN-GROUP") {
      this.closeCalciteDropdown();
    }
  }
  closeCalciteDropdownOnEvent() {
    this.closeCalciteDropdown();
  }
  closeCalciteDropdownOnOpenEvent(e) {
    if (e.composedPath().includes(this.el)) {
      return;
    }
    this.active = false;
  }
  mouseEnterHandler() {
    if (this.type === "hover") {
      this.openCalciteDropdown();
    }
  }
  mouseLeaveHandler() {
    if (this.type === "hover") {
      this.closeCalciteDropdown();
    }
  }
  calciteDropdownItemKeyEvent(e) {
    const { keyboardEvent } = e.detail;
    // handle edge
    const target = keyboardEvent.target;
    const itemToFocus = target.nodeName !== "A" ? target : target.parentNode;
    const isFirstItem = this.itemIndex(itemToFocus) === 0;
    const isLastItem = this.itemIndex(itemToFocus) === this.items.length - 1;
    switch (getKey(keyboardEvent.key)) {
      case "Tab":
        if (isLastItem && !keyboardEvent.shiftKey) {
          this.closeCalciteDropdown();
        }
        else if (isFirstItem && keyboardEvent.shiftKey) {
          this.closeCalciteDropdown();
        }
        else if (keyboardEvent.shiftKey) {
          this.focusPrevItem(itemToFocus);
        }
        else {
          this.focusNextItem(itemToFocus);
        }
        break;
      case "ArrowDown":
        this.focusNextItem(itemToFocus);
        break;
      case "ArrowUp":
        this.focusPrevItem(itemToFocus);
        break;
      case "Home":
        this.focusFirstItem();
        break;
      case "End":
        this.focusLastItem();
        break;
    }
    e.stopPropagation();
  }
  handleItemSelect(event) {
    this.updateSelectedItems();
    event.stopPropagation();
    this.calciteDropdownSelect.emit();
    if (!this.disableCloseOnSelect ||
      event.detail.requestedDropdownGroup.selectionMode === "none") {
      this.closeCalciteDropdown();
    }
  }
  getModifiers() {
    const flipModifier = {
      name: "flip",
      enabled: true
    };
    flipModifier.options = {
      fallbackPlacements: ["top-start", "top", "top-end", "bottom-start", "bottom", "bottom-end"]
    };
    return [flipModifier];
  }
  createPopper() {
    this.destroyPopper();
    const { menuEl, referenceEl, placement, overlayPositioning } = this;
    const modifiers = this.getModifiers();
    this.popper = createPopper({
      el: menuEl,
      modifiers,
      overlayPositioning,
      placement,
      referenceEl
    });
  }
  destroyPopper() {
    const { popper } = this;
    if (popper) {
      popper.destroy();
    }
    this.popper = null;
  }
  updateSelectedItems() {
    const items = Array.from(this.el.querySelectorAll("calcite-dropdown-item"));
    this.selectedItems = items.filter((item) => item.active);
  }
  getMaxScrollerHeight(groups) {
    const { maxItems } = this;
    let itemsToProcess = 0;
    let maxScrollerHeight = 0;
    let groupHeaderHeight;
    groups.forEach((group) => {
      if (maxItems > 0 && itemsToProcess < maxItems) {
        Array.from(group.children).forEach((item, index) => {
          if (index === 0) {
            if (isNaN(groupHeaderHeight)) {
              groupHeaderHeight = item.offsetTop;
            }
            maxScrollerHeight += groupHeaderHeight;
          }
          if (itemsToProcess < maxItems) {
            maxScrollerHeight += item.offsetHeight;
            itemsToProcess += 1;
          }
        });
      }
    });
    return maxScrollerHeight;
  }
  closeCalciteDropdown() {
    this.active = false;
    focusElement(this.triggers[0]);
  }
  focusFirstItem() {
    const firstItem = this.items[0];
    this.getFocusableElement(firstItem);
  }
  focusLastItem() {
    const lastItem = this.items[this.items.length - 1];
    this.getFocusableElement(lastItem);
  }
  focusNextItem(e) {
    const index = this.itemIndex(e);
    const nextItem = this.items[index + 1] || this.items[0];
    this.getFocusableElement(nextItem);
  }
  focusPrevItem(e) {
    const index = this.itemIndex(e);
    const prevItem = this.items[index - 1] || this.items[this.items.length - 1];
    this.getFocusableElement(prevItem);
  }
  itemIndex(e) {
    return this.items.indexOf(e);
  }
  getFocusableElement(item) {
    if (!item) {
      return;
    }
    const target = item.attributes.isLink
      ? item.shadowRoot.querySelector("a")
      : item;
    focusElement(target);
  }
  static get is() { return "calcite-dropdown"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["calcite-dropdown.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["calcite-dropdown.css"]
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
    "disableCloseOnSelect": {
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
        "text": "allow the dropdown to remain open after a selection is made\nif the selection-mode of the selected item's containing group is \"none\", the dropdown will always close"
      },
      "attribute": "disable-close-on-select",
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
        "text": "is the dropdown disabled"
      },
      "attribute": "disabled",
      "reflect": true
    },
    "maxItems": {
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
        "text": "specify the maximum number of calcite-dropdown-items to display before showing the scroller, must be greater than 0 -\nthis value does not include groupTitles passed to calcite-dropdown-group"
      },
      "attribute": "max-items",
      "reflect": false,
      "defaultValue": "0"
    },
    "overlayPositioning": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "OverlayPositioning",
        "resolved": "\"absolute\" | \"fixed\"",
        "references": {
          "OverlayPositioning": {
            "location": "import",
            "path": "../../utils/popper"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Describes the type of positioning to use for the overlaid content. If your element is in a fixed container, use the 'fixed' value."
      },
      "attribute": "overlay-positioning",
      "reflect": false,
      "defaultValue": "\"absolute\""
    },
    "placement": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "DropdownPlacement",
        "resolved": "\"bottom\" | \"bottom-end\" | \"bottom-leading\" | \"bottom-start\" | \"bottom-trailing\" | \"top\" | \"top-end\" | \"top-leading\" | \"top-start\" | \"top-trailing\"",
        "references": {
          "DropdownPlacement": {
            "location": "import",
            "path": "./interfaces"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [{
            "text": "\"bottom-leading\"",
            "name": "default"
          }],
        "text": "Determines where the dropdown will be positioned relative to the button."
      },
      "attribute": "placement",
      "reflect": true,
      "defaultValue": "DefaultDropdownPlacement"
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
        "text": "specify the scale of dropdown, defaults to m"
      },
      "attribute": "scale",
      "reflect": true,
      "defaultValue": "\"m\""
    },
    "selectedItems": {
      "type": "unknown",
      "mutable": true,
      "complexType": {
        "original": "HTMLCalciteDropdownItemElement[]",
        "resolved": "HTMLCalciteDropdownItemElement[]",
        "references": {
          "HTMLCalciteDropdownItemElement": {
            "location": "global"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [{
            "text": undefined,
            "name": "readonly"
          }],
        "text": "**read-only** The currently selected items"
      },
      "defaultValue": "[]"
    },
    "type": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "\"hover\" | \"click\"",
        "resolved": "\"click\" | \"hover\"",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "specify whether the dropdown is opened by hover or click of a trigger element"
      },
      "attribute": "type",
      "reflect": true,
      "defaultValue": "\"click\""
    },
    "width": {
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
        "text": "specify the width of dropdown, defaults to m"
      },
      "attribute": "width",
      "reflect": true,
      "defaultValue": "\"m\""
    }
  }; }
  static get events() { return [{
      "method": "calciteDropdownSelect",
      "name": "calciteDropdownSelect",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "fires when a dropdown item has been selected or deselected *"
      },
      "complexType": {
        "original": "void",
        "resolved": "void",
        "references": {}
      }
    }, {
      "method": "calciteDropdownOpen",
      "name": "calciteDropdownOpen",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "fires when a dropdown has been opened *"
      },
      "complexType": {
        "original": "void",
        "resolved": "void",
        "references": {}
      }
    }, {
      "method": "calciteDropdownClose",
      "name": "calciteDropdownClose",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "fires when a dropdown has been closed *"
      },
      "complexType": {
        "original": "void",
        "resolved": "void",
        "references": {}
      }
    }]; }
  static get methods() { return {
    "reposition": {
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
      "propName": "active",
      "methodName": "activeHandler"
    }, {
      "propName": "placement",
      "methodName": "placementHandler"
    }]; }
  static get listeners() { return [{
      "name": "click",
      "method": "closeCalciteDropdownOnClick",
      "target": "window",
      "capture": false,
      "passive": false
    }, {
      "name": "calciteDropdownCloseRequest",
      "method": "closeCalciteDropdownOnEvent",
      "target": undefined,
      "capture": false,
      "passive": false
    }, {
      "name": "calciteDropdownOpen",
      "method": "closeCalciteDropdownOnOpenEvent",
      "target": "window",
      "capture": false,
      "passive": false
    }, {
      "name": "mouseenter",
      "method": "mouseEnterHandler",
      "target": undefined,
      "capture": false,
      "passive": true
    }, {
      "name": "mouseleave",
      "method": "mouseLeaveHandler",
      "target": undefined,
      "capture": false,
      "passive": true
    }, {
      "name": "calciteDropdownItemKeyEvent",
      "method": "calciteDropdownItemKeyEvent",
      "target": undefined,
      "capture": false,
      "passive": false
    }, {
      "name": "calciteDropdownItemSelect",
      "method": "handleItemSelect",
      "target": undefined,
      "capture": false,
      "passive": false
    }]; }
}
