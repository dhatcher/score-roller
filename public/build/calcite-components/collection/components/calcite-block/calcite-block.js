import { Component, Element, Event, h, Host, Prop } from "@stencil/core";
import { CSS, HEADING_LEVEL, ICONS, SLOTS, TEXT } from "./resources";
import { CSS_UTILITY } from "../../utils/resources";
import { getElementDir, getSlotted } from "../../utils/dom";
import { CalciteHeading } from "../functional/CalciteHeading";
/**
 * @slot icon - A slot for adding a leading header icon.
 * @slot control - A slot for adding a single HTML input element in a header.
 * @slot header-menu-actions - a slot for adding an overflow menu with actions inside a dropdown.
 * @slot - A slot for adding content to the block.
 */
export class CalciteBlock {
  constructor() {
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------
    /**
     * When true, this block will be collapsible.
     */
    this.collapsible = false;
    /**
     * When true, disabled prevents interaction. This state shows items with lower opacity/grayed.
     */
    this.disabled = false;
    /**
     * When true, displays a drag handle in the header.
     */
    this.dragHandle = false;
    /** string to override English loading text
     * @default "Loading"
     */
    this.intlLoading = TEXT.loading;
    /** Text string used for the actions menu
     * @default "Options"
     */
    this.intlOptions = TEXT.options;
    /**
     * When true, content is waiting to be loaded. This state shows a busy indicator.
     */
    this.loading = false;
    /**
     * When true, the block's content will be displayed.
     */
    this.open = false;
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    this.onHeaderClick = () => {
      this.open = !this.open;
      this.calciteBlockToggle.emit();
    };
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  renderScrim() {
    const { disabled, loading } = this;
    const defaultSlot = h("slot", null);
    return [loading || disabled ? h("calcite-scrim", { loading: loading }) : null, defaultSlot];
  }
  renderIcon() {
    var _a;
    const { el, status } = this;
    const icon = (_a = ICONS[status]) !== null && _a !== void 0 ? _a : false;
    const hasIcon = getSlotted(el, SLOTS.icon) || icon;
    const iconEl = !icon ? (h("slot", { name: SLOTS.icon })) : (h("calcite-icon", { class: {
        [CSS.statusIcon]: true,
        [CSS.valid]: status == "valid",
        [CSS.invalid]: status == "invalid"
      }, icon: icon, scale: "m" }));
    return hasIcon ? h("div", { class: CSS.icon }, iconEl) : null;
  }
  render() {
    const { collapsible, disabled, el, heading, intlCollapse, intlExpand, loading, open, summary, intlLoading, headingLevel } = this;
    const toggleLabel = open ? intlCollapse || TEXT.collapse : intlExpand || TEXT.expand;
    const headerContent = (h("header", { class: CSS.header },
      this.renderIcon(),
      h("div", { class: CSS.title },
        h(CalciteHeading, { class: CSS.heading, level: headingLevel || HEADING_LEVEL }, heading),
        summary ? h("div", { class: CSS.summary }, summary) : null)));
    const hasControl = !!getSlotted(el, SLOTS.control);
    const hasMenuActions = !!getSlotted(el, SLOTS.headerMenuActions);
    const collapseIcon = open ? ICONS.opened : ICONS.closed;
    const headerNode = (h("div", { class: CSS.headerContainer },
      this.dragHandle ? h("calcite-handle", null) : null,
      collapsible ? (h("button", { "aria-expanded": collapsible ? open.toString() : null, "aria-label": toggleLabel, class: CSS.toggle, onClick: this.onHeaderClick, title: toggleLabel },
        headerContent,
        !hasControl ? (h("calcite-icon", { "aria-hidden": "true", class: CSS.toggleIcon, icon: collapseIcon, scale: "s" })) : null)) : (headerContent),
      loading ? (h("calcite-loader", { inline: true, "is-active": true, label: intlLoading })) : hasControl ? (h("div", { class: CSS.controlContainer },
        h("slot", { name: SLOTS.control }))) : null,
      hasMenuActions ? (h("calcite-action-menu", { label: this.intlOptions || TEXT.options },
        h("slot", { name: SLOTS.headerMenuActions }))) : null));
    const rtl = getElementDir(el) === "rtl";
    return (h(Host, { tabIndex: disabled ? -1 : null },
      h("article", { "aria-busy": loading.toString(), class: {
          [CSS.article]: true,
          [CSS_UTILITY.rtl]: rtl
        } },
        headerNode,
        h("div", { class: CSS.content, hidden: !open }, this.renderScrim()))));
  }
  static get is() { return "calcite-block"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["calcite-block.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["calcite-block.css"]
  }; }
  static get properties() { return {
    "collapsible": {
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
        "text": "When true, this block will be collapsible."
      },
      "attribute": "collapsible",
      "reflect": false,
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
      "optional": false,
      "docs": {
        "tags": [],
        "text": "When true, disabled prevents interaction. This state shows items with lower opacity/grayed."
      },
      "attribute": "disabled",
      "reflect": true,
      "defaultValue": "false"
    },
    "dragHandle": {
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
        "text": "When true, displays a drag handle in the header."
      },
      "attribute": "drag-handle",
      "reflect": true,
      "defaultValue": "false"
    },
    "heading": {
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
        "text": "Block heading."
      },
      "attribute": "heading",
      "reflect": false
    },
    "headingLevel": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "HeadingLevel",
        "resolved": "1 | 2 | 3 | 4 | 5 | 6",
        "references": {
          "HeadingLevel": {
            "location": "import",
            "path": "../functional/CalciteHeading"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Number at which section headings should start for this component."
      },
      "attribute": "heading-level",
      "reflect": false
    },
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
    "intlOptions": {
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
            "text": "\"Options\"",
            "name": "default"
          }],
        "text": "Text string used for the actions menu"
      },
      "attribute": "intl-options",
      "reflect": false,
      "defaultValue": "TEXT.options"
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
        "text": "When true, the block's content will be displayed."
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
        "text": "Block status. Updates or adds icon to show related icon and color."
      },
      "attribute": "status",
      "reflect": true
    },
    "summary": {
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
        "text": "Block summary."
      },
      "attribute": "summary",
      "reflect": false
    }
  }; }
  static get events() { return [{
      "method": "calciteBlockToggle",
      "name": "calciteBlockToggle",
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
