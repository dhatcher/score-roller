import { Component, Element, Event, Prop, h } from "@stencil/core";
import { getElementDir } from "../../utils/dom";
import { CSS_UTILITY } from "../../utils/resources";
import { CSS, ICONS, TEXT } from "./resources";
/**
 * @slot - A slot for adding content to the block section.
 */
export class CalciteBlockSection {
  constructor() {
    /**
     * When true, the block's section content will be displayed.
     */
    this.open = false;
    /**
     * This property determines the look of the section toggle.
     * If the value is "switch", a toggle-switch will be displayed.
     * If the value is "button", a clickable header is displayed.
     *
     * @todo revisit doc
     */
    this.toggleDisplay = "button";
    this.toggleSection = () => {
      this.open = !this.open;
      this.calciteBlockSectionToggle.emit();
    };
  }
  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------
  handleHeaderLabelKeyDown(event) {
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      this.click();
    }
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  renderStatusIcon() {
    var _a;
    const { status } = this;
    const statusIcon = (_a = ICONS[status]) !== null && _a !== void 0 ? _a : false;
    const statusIconClasses = {
      [CSS.statusIcon]: true,
      [CSS.valid]: status == "valid",
      [CSS.invalid]: status == "invalid"
    };
    return !!statusIcon ? (h("calcite-icon", { class: statusIconClasses, icon: statusIcon, scale: "s" })) : null;
  }
  render() {
    const { el, intlCollapse, intlExpand, open, text, toggleDisplay } = this;
    const dir = getElementDir(el);
    const arrowIcon = open
      ? ICONS.menuOpen
      : dir === "rtl"
        ? ICONS.menuClosedLeft
        : ICONS.menuClosedRight;
    const toggleLabel = open ? intlCollapse || TEXT.collapse : intlExpand || TEXT.expand;
    const headerNode = toggleDisplay === "switch" ? (h("label", { "aria-label": toggleLabel, class: {
        [CSS.toggle]: true,
        [CSS.toggleSwitch]: true
      }, onKeyDown: this.handleHeaderLabelKeyDown, tabIndex: 0, title: toggleLabel },
      h("div", { class: CSS.toggleSwitchContent },
        h("span", { class: CSS.toggleSwitchText }, text)),
      h("calcite-switch", { onCalciteSwitchChange: this.toggleSection, scale: "s", switched: open, tabIndex: -1 }),
      this.renderStatusIcon())) : (h("button", { "aria-label": toggleLabel, class: {
        [CSS.sectionHeader]: true,
        [CSS.toggle]: true
      }, name: toggleLabel, onClick: this.toggleSection, onKeyDown: this.handleHeaderLabelKeyDown },
      h("calcite-icon", { icon: arrowIcon, scale: "s" }),
      h("span", { class: CSS.sectionHeaderText }, text),
      this.renderStatusIcon()));
    return (h("section", { "aria-expanded": open.toString(), class: { [CSS_UTILITY.rtl]: dir === "rtl" } },
      headerNode,
      h("div", { class: CSS.content, hidden: !open },
        h("slot", null))));
  }
  static get is() { return "calcite-block-section"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["calcite-block-section.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["calcite-block-section.css"]
  }; }
  static get properties() { return {
    "intlCollapse": {
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
        "text": "Tooltip used for the toggle when expanded."
      },
      "attribute": "intl-collapse",
      "reflect": false
    },
    "intlExpand": {
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
        "text": "Tooltip used for the toggle when collapsed."
      },
      "attribute": "intl-expand",
      "reflect": false
    },
    "open": {
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
        "text": "When true, the block's section content will be displayed."
      },
      "attribute": "open",
      "reflect": true,
      "defaultValue": "false"
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
      "optional": true,
      "docs": {
        "tags": [],
        "text": "BlockSection status. Adds indicator to show valid or invalid status."
      },
      "attribute": "status",
      "reflect": true
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
        "text": "Text displayed in the button."
      },
      "attribute": "text",
      "reflect": false
    },
    "toggleDisplay": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "BlockSectionToggleDisplay",
        "resolved": "\"button\" | \"switch\"",
        "references": {
          "BlockSectionToggleDisplay": {
            "location": "import",
            "path": "./interfaces"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [{
            "text": "revisit doc",
            "name": "todo"
          }],
        "text": "This property determines the look of the section toggle.\nIf the value is \"switch\", a toggle-switch will be displayed.\nIf the value is \"button\", a clickable header is displayed."
      },
      "attribute": "toggle-display",
      "reflect": true,
      "defaultValue": "\"button\""
    }
  }; }
  static get events() { return [{
      "method": "calciteBlockSectionToggle",
      "name": "calciteBlockSectionToggle",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Emitted when the header has been clicked."
      },
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      }
    }]; }
  static get elementRef() { return "el"; }
}
