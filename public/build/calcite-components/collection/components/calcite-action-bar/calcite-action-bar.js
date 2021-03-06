import { Component, Element, Event, Host, Prop, Watch, h, Method } from "@stencil/core";
import { CalciteExpandToggle, toggleChildActionText } from "../functional/CalciteExpandToggle";
import { CSS, SLOTS, TEXT } from "./resources";
import { getSlotted, focusElement } from "../../utils/dom";
import { getOverflowCount, overflowActions, queryActions } from "./utils";
/**
 * @slot - A slot for adding `calcite-action`s that will appear at the top of the action bar.
 * @slot bottom-actions - A slot for adding `calcite-action`s that will appear at the bottom of the action bar, above the collapse/expand button.
 * @slot expand-tooltip - Used to set the tooltip for the expand toggle.
 */
export class CalciteActionBar {
  constructor() {
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------
    /**
     * When set to true, the expand-toggling behavior will be disabled.
     */
    this.expandDisabled = false;
    /**
     * Indicates whether widget is expanded.
     */
    this.expanded = false;
    this.mutationObserver = new MutationObserver(() => {
      const { el, expanded } = this;
      toggleChildActionText({ parent: el, expanded });
      this.resize(el.clientHeight);
    });
    this.resizeObserver = new ResizeObserver((entries) => this.resizeHandlerEntries(entries));
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    this.actionMenuOpenChangeHandler = (event) => {
      if (event.detail) {
        const composedPath = event.composedPath();
        Array.from(this.el.querySelectorAll("calcite-action-group")).forEach((group) => {
          if (!composedPath.includes(group)) {
            group.menuOpen = false;
          }
        });
      }
    };
    this.resizeHandlerEntries = (entries) => {
      entries.forEach(this.resizeHandler);
    };
    this.resizeHandler = (entry) => {
      const { height } = entry.contentRect;
      this.resize(height);
    };
    this.resize = (height) => {
      const { el, expanded, expandDisabled, lastActionCount, lastGroupCount, lastResizeHeight, overflowActionsDisabled } = this;
      if (typeof height !== "number" || overflowActionsDisabled) {
        return;
      }
      const actions = queryActions(el);
      const actionCount = expandDisabled ? actions.length : actions.length + 1;
      const actionGroups = Array.from(el.querySelectorAll("calcite-action-group"));
      const groupCount = getSlotted(el, SLOTS.bottomActions) || !expandDisabled
        ? actionGroups.length + 1
        : actionGroups.length;
      if (lastResizeHeight === height &&
        lastActionCount === actionCount &&
        lastGroupCount === groupCount) {
        return;
      }
      this.lastActionCount = actionCount;
      this.lastGroupCount = groupCount;
      this.lastResizeHeight = height;
      const overflowCount = getOverflowCount({ actionCount, height, groupCount });
      overflowActions({
        actionGroups,
        expanded,
        overflowCount
      });
    };
    this.toggleExpand = () => {
      this.expanded = !this.expanded;
    };
    this.setExpandToggleRef = (el) => {
      this.expandToggleEl = el;
    };
  }
  expandHandler(expandDisabled) {
    if (!expandDisabled) {
      toggleChildActionText({ parent: this.el, expanded: this.expanded });
    }
    this.resize(this.el.clientHeight);
  }
  expandedHandler(expanded) {
    if (!this.expandDisabled) {
      toggleChildActionText({ parent: this.el, expanded });
    }
    this.calciteActionBarToggle.emit();
  }
  overflowDisabledHandler(overflowActionsDisabled) {
    overflowActionsDisabled
      ? this.resizeObserver.disconnect()
      : this.resizeObserver.observe(this.el);
  }
  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------
  componentWillLoad() {
    const { el, expandDisabled, expanded } = this;
    if (!expandDisabled) {
      toggleChildActionText({ parent: el, expanded });
    }
    this.mutationObserver.observe(el, { childList: true });
    if (!this.overflowActionsDisabled) {
      this.resizeObserver.observe(el);
    }
  }
  componentDidLoad() {
    this.resize(this.el.clientHeight);
  }
  disconnectedCallback() {
    this.mutationObserver.disconnect();
    this.resizeObserver.disconnect();
  }
  // --------------------------------------------------------------------------
  //
  //  Methods
  //
  // --------------------------------------------------------------------------
  async setFocus(focusId) {
    if (focusId === "expand-toggle") {
      await focusElement(this.expandToggleEl);
      return;
    }
    this.el.focus();
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  renderBottomActionGroup() {
    const { expanded, expandDisabled, intlExpand, intlCollapse, el, position, toggleExpand } = this;
    const tooltip = getSlotted(el, SLOTS.expandTooltip);
    const expandLabel = intlExpand || TEXT.expand;
    const collapseLabel = intlCollapse || TEXT.collapse;
    const expandToggleNode = !expandDisabled ? (h(CalciteExpandToggle, { el: el, expanded: expanded, intlCollapse: collapseLabel, intlExpand: expandLabel, position: position, ref: this.setExpandToggleRef, toggle: toggleExpand, tooltip: tooltip })) : null;
    return getSlotted(el, SLOTS.bottomActions) || expandToggleNode ? (h("calcite-action-group", { class: CSS.actionGroupBottom },
      h("slot", { name: SLOTS.bottomActions }),
      h("slot", { name: SLOTS.expandTooltip }),
      expandToggleNode)) : null;
  }
  render() {
    return (h(Host, { onCalciteActionMenuOpenChange: this.actionMenuOpenChangeHandler },
      h("slot", null),
      this.renderBottomActionGroup()));
  }
  static get is() { return "calcite-action-bar"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["calcite-action-bar.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["calcite-action-bar.css"]
  }; }
  static get properties() { return {
    "expandDisabled": {
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
        "text": "When set to true, the expand-toggling behavior will be disabled."
      },
      "attribute": "expand-disabled",
      "reflect": true,
      "defaultValue": "false"
    },
    "expanded": {
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
        "text": "Indicates whether widget is expanded."
      },
      "attribute": "expanded",
      "reflect": true,
      "defaultValue": "false"
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
        "text": "Updates the label of the expand icon when the component is not expanded."
      },
      "attribute": "intl-expand",
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
        "text": "Updates the label of the collapse icon when the component is expanded."
      },
      "attribute": "intl-collapse",
      "reflect": false
    },
    "overflowActionsDisabled": {
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
        "text": "Disables automatically overflowing actions that won't fit into menus."
      },
      "attribute": "overflow-actions-disabled",
      "reflect": false
    },
    "position": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "Position",
        "resolved": "\"end\" | \"start\"",
        "references": {
          "Position": {
            "location": "import",
            "path": "../interfaces"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Arranges the component depending on the elements 'dir' property."
      },
      "attribute": "position",
      "reflect": true
    }
  }; }
  static get events() { return [{
      "method": "calciteActionBarToggle",
      "name": "calciteActionBarToggle",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Emitted when expanded has been toggled."
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
        "signature": "(focusId?: \"expand-toggle\") => Promise<void>",
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
      "propName": "expandDisabled",
      "methodName": "expandHandler"
    }, {
      "propName": "expanded",
      "methodName": "expandedHandler"
    }, {
      "propName": "overflowActionsDisabled",
      "methodName": "overflowDisabledHandler"
    }]; }
}
