import { Component, Element, Event, Method, Prop, Watch, h, Fragment } from "@stencil/core";
import { CSS, HEADING_LEVEL, ICONS, SLOTS, TEXT } from "./resources";
import { getElementDir, getSlotted } from "../../utils/dom";
import { CSS_UTILITY } from "../../utils/resources";
import { CalciteHeading } from "../functional/CalciteHeading";
import { SLOTS as ACTION_MENU_SLOTS } from "../calcite-action-menu/resources";
/**
 * @slot header-actions-start - a slot for adding actions or content to the start side of the panel header.
 * @slot header-actions-end - a slot for adding actions or content to the end side of the panel header.
 * @slot header-content - a slot for adding custom content to the header.
 * @slot header-menu-actions - a slot for adding an overflow menu with actions inside a dropdown.
 * @slot fab - a slot for adding a `calcite-fab` (floating action button) to perform an action.
 * @slot footer-actions - a slot for adding buttons to the footer.
 * @slot footer - a slot for adding custom content to the footer.
 */
export class CalcitePanel {
  constructor() {
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------
    /**
     * Hides the panel.
     */
    this.dismissed = false;
    /**
     * When true, disabled prevents interaction. This state shows items with lower opacity/grayed.
     */
    this.disabled = false;
    /**
     * Displays a close button in the trailing side of the header.
     */
    this.dismissible = false;
    /**
     * Shows a back button in the header.
     */
    this.showBackButton = false;
    /**
     * When true, content is waiting to be loaded. This state shows a busy indicator.
     */
    this.loading = false;
    /**
     * Opens the action menu.
     */
    this.menuOpen = false;
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    this.setContainerRef = (node) => {
      this.containerEl = node;
    };
    this.setDismissRef = (node) => {
      this.dismissButtonEl = node;
    };
    this.setBackRef = (node) => {
      this.backButtonEl = node;
    };
    this.panelKeyUpHandler = (event) => {
      if (event.key === "Escape") {
        this.dismiss();
      }
    };
    this.dismiss = () => {
      this.dismissed = true;
    };
    this.panelScrollHandler = () => {
      this.calcitePanelScroll.emit();
    };
    this.backButtonClick = () => {
      this.calcitePanelBackClick.emit();
    };
  }
  dismissedHandler() {
    this.calcitePanelDismissedChange.emit();
  }
  // --------------------------------------------------------------------------
  //
  //  Methods
  //
  // --------------------------------------------------------------------------
  async setFocus(focusId) {
    var _a, _b, _c;
    if (focusId === "dismiss-button") {
      (_a = this.dismissButtonEl) === null || _a === void 0 ? void 0 : _a.setFocus();
      return;
    }
    if (focusId === "back-button") {
      (_b = this.backButtonEl) === null || _b === void 0 ? void 0 : _b.setFocus();
      return;
    }
    (_c = this.containerEl) === null || _c === void 0 ? void 0 : _c.focus();
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  renderBackButton() {
    const { el } = this;
    const rtl = getElementDir(el) === "rtl";
    const { showBackButton, intlBack, backButtonClick } = this;
    const label = intlBack || TEXT.back;
    const icon = rtl ? ICONS.backRight : ICONS.backLeft;
    return showBackButton ? (h("calcite-action", { "aria-label": label, class: CSS.backButton, icon: icon, key: "back-button", onClick: backButtonClick, ref: this.setBackRef, scale: "s", slot: SLOTS.headerActionsStart, text: label })) : null;
  }
  renderHeaderContent() {
    const { heading, headingLevel, summary } = this;
    const headingNode = heading ? (h(CalciteHeading, { class: CSS.heading, level: headingLevel || HEADING_LEVEL }, heading)) : null;
    const summaryNode = summary ? h("span", { class: CSS.summary }, summary) : null;
    return headingNode || summaryNode ? (h("div", { class: CSS.headerContent, key: "header-content" },
      headingNode,
      summaryNode)) : null;
  }
  /**
   * Allows user to override the entire header-content node.
   */
  renderHeaderSlottedContent() {
    return (h("div", { class: CSS.headerContent, key: "header-content" },
      h("slot", { name: SLOTS.headerContent })));
  }
  renderHeaderStartActions() {
    const { el } = this;
    const hasStartActions = getSlotted(el, SLOTS.headerActionsStart);
    return hasStartActions ? (h("div", { class: { [CSS.headerActionsStart]: true, [CSS.headerActions]: true }, key: "header-actions-start" },
      h("slot", { name: SLOTS.headerActionsStart }))) : null;
  }
  renderHeaderActionsEnd() {
    const { dismiss, dismissible, el, intlClose } = this;
    const text = intlClose || TEXT.close;
    const dismissibleNode = dismissible ? (h("calcite-action", { "aria-label": text, icon: ICONS.close, onClick: dismiss, ref: this.setDismissRef, text: text })) : null;
    const slotNode = h("slot", { name: SLOTS.headerActionsEnd });
    const hasEndActions = getSlotted(el, SLOTS.headerActionsEnd);
    return hasEndActions || dismissibleNode ? (h("div", { class: { [CSS.headerActionsEnd]: true, [CSS.headerActions]: true }, key: "header-actions-end" },
      slotNode,
      dismissibleNode)) : null;
  }
  renderMenu() {
    const { el, intlOptions, menuOpen } = this;
    const hasMenuItems = getSlotted(el, SLOTS.headerMenuActions);
    return hasMenuItems ? (h("calcite-action-menu", { flipPlacements: ["top", "bottom"], label: intlOptions || TEXT.options, open: menuOpen, placement: "bottom-end" },
      h("calcite-action", { icon: ICONS.menu, slot: ACTION_MENU_SLOTS.trigger, text: intlOptions || TEXT.options }),
      h("slot", { name: SLOTS.headerMenuActions }))) : null;
  }
  renderHeaderNode() {
    const { el, showBackButton } = this;
    const backButtonNode = this.renderBackButton();
    const hasHeaderSlottedContent = getSlotted(el, SLOTS.headerContent);
    const headerContentNode = hasHeaderSlottedContent
      ? this.renderHeaderSlottedContent()
      : this.renderHeaderContent();
    const actionsNodeStart = this.renderHeaderStartActions();
    const actionsNodeEnd = this.renderHeaderActionsEnd();
    const headerMenuNode = this.renderMenu();
    return actionsNodeStart ||
      headerContentNode ||
      actionsNodeEnd ||
      headerMenuNode ||
      showBackButton ? (h("header", { class: CSS.header },
      backButtonNode,
      actionsNodeStart,
      headerContentNode,
      actionsNodeEnd,
      headerMenuNode)) : null;
  }
  /**
   * Allows user to override the entire footer node.
   */
  renderFooterSlottedContent() {
    const { el } = this;
    const hasFooterSlottedContent = getSlotted(el, SLOTS.footer);
    return hasFooterSlottedContent ? (h("footer", { class: CSS.footer },
      h("slot", { name: SLOTS.footer }))) : null;
  }
  renderFooterActions() {
    const { el } = this;
    const hasFooterActions = getSlotted(el, SLOTS.footerActions);
    return hasFooterActions ? (h("footer", { class: CSS.footer },
      h("slot", { name: SLOTS.footerActions }))) : null;
  }
  renderContent() {
    return (h("section", { class: CSS.contentContainer, onScroll: this.panelScrollHandler, tabIndex: 0 },
      h("slot", null),
      this.renderFab()));
  }
  renderFab() {
    const { el } = this;
    const hasFab = getSlotted(el, SLOTS.fab);
    return hasFab ? (h("div", { class: CSS.fabContainer },
      h("slot", { name: SLOTS.fab }))) : null;
  }
  render() {
    const { dismissed, disabled, dismissible, el, loading, panelKeyUpHandler } = this;
    const rtl = getElementDir(el) === "rtl";
    const panelNode = (h("article", { "aria-busy": loading.toString(), class: {
        [CSS.container]: true,
        [CSS_UTILITY.rtl]: rtl
      }, hidden: dismissible && dismissed, onKeyUp: panelKeyUpHandler, ref: this.setContainerRef, tabIndex: dismissible ? 0 : -1 },
      this.renderHeaderNode(),
      this.renderContent(),
      this.renderFooterSlottedContent() || this.renderFooterActions()));
    return (h(Fragment, null,
      loading || disabled ? h("calcite-scrim", { loading: loading }) : null,
      panelNode));
  }
  static get is() { return "calcite-panel"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["calcite-panel.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["calcite-panel.css"]
  }; }
  static get properties() { return {
    "dismissed": {
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
        "text": "Hides the panel."
      },
      "attribute": "dismissed",
      "reflect": true,
      "defaultValue": "false"
    },
    "beforeBack": {
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
        "text": "When provided, this method will be called before it is removed from the parent flow."
      }
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
    "dismissible": {
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
        "text": "Displays a close button in the trailing side of the header."
      },
      "attribute": "dismissible",
      "reflect": true,
      "defaultValue": "false"
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
    "showBackButton": {
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
        "text": "Shows a back button in the header."
      },
      "attribute": "show-back-button",
      "reflect": true,
      "defaultValue": "false"
    },
    "intlBack": {
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
        "text": "'Back' text string."
      },
      "attribute": "intl-back",
      "reflect": false
    },
    "heightScale": {
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
        "text": "Specifies the maxiumum height of the panel."
      },
      "attribute": "height-scale",
      "reflect": true
    },
    "widthScale": {
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
      "optional": true,
      "docs": {
        "tags": [],
        "text": "This sets width of the panel."
      },
      "attribute": "width-scale",
      "reflect": true
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
    "intlClose": {
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
        "text": "'Close' text string for the close button. The close button will only be shown when 'dismissible' is true."
      },
      "attribute": "intl-close",
      "reflect": false
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
        "tags": [],
        "text": "'Options' text string for the actions menu."
      },
      "attribute": "intl-options",
      "reflect": false
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
      "optional": true,
      "docs": {
        "tags": [],
        "text": "Heading text."
      },
      "attribute": "heading",
      "reflect": false
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
      "optional": true,
      "docs": {
        "tags": [],
        "text": "Summary text. A description displayed underneath the heading."
      },
      "attribute": "summary",
      "reflect": false
    },
    "menuOpen": {
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
        "text": "Opens the action menu."
      },
      "attribute": "menu-open",
      "reflect": true,
      "defaultValue": "false"
    }
  }; }
  static get events() { return [{
      "method": "calcitePanelDismissedChange",
      "name": "calcitePanelDismissedChange",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Emitted when the close button has been clicked."
      },
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      }
    }, {
      "method": "calcitePanelScroll",
      "name": "calcitePanelScroll",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Emitted when the content has been scrolled."
      },
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      }
    }, {
      "method": "calcitePanelBackClick",
      "name": "calcitePanelBackClick",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Emitted when the back button has been clicked."
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
        "signature": "(focusId?: \"dismiss-button\" | \"back-button\") => Promise<void>",
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
        "text": "",
        "tags": []
      }
    }
  }; }
  static get elementRef() { return "el"; }
  static get watchers() { return [{
      "propName": "dismissed",
      "methodName": "dismissedHandler"
    }]; }
}
