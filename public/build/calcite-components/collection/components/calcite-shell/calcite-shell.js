import { Component, Element, Prop, h, Fragment } from "@stencil/core";
import { CSS, SLOTS } from "./resources";
import { getSlotted } from "../../utils/dom";
/**
 * @slot header - A slot for adding header content. This content will be positioned at the top of the shell.
 * @slot footer - A slot for adding footer content. This content will be positioned at the bottom of the shell.
 * @slot primary-panel - A slot for adding the leading `calcite-shell-panel`.
 * @slot contextual-panel - A slot for adding the trailing `calcite-shell-panel`.
 * @slot bottom-panel - A slot for adding a bottom floating panel such as a chart or `calcite-tip-manager`.
 * @slot - A slot for adding content to the shell. This content will appear between any leading and trailing panels added to the shell. (eg. a map)
 */
export class CalciteShell {
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  renderHeader() {
    const hasHeader = !!getSlotted(this.el, SLOTS.header);
    return hasHeader ? h("slot", { name: SLOTS.header }) : null;
  }
  renderContent() {
    const content = !!this.contentBehind
      ? [
        h("div", { class: {
            [CSS.content]: true,
            [CSS.contentBehind]: !!this.contentBehind
          } },
          h("slot", null)),
        h("slot", { name: "center-row" })
      ]
      : [
        h("div", { class: CSS.content },
          h("slot", null),
          h("slot", { name: "center-row" }))
      ];
    return content;
  }
  renderFooter() {
    const hasFooter = !!getSlotted(this.el, SLOTS.footer);
    return hasFooter ? (h("div", { class: CSS.footer },
      h("slot", { name: SLOTS.footer }))) : null;
  }
  renderMain() {
    const primaryPanel = getSlotted(this.el, SLOTS.primaryPanel);
    const mainClasses = {
      [CSS.main]: true,
      [CSS.mainReversed]: (primaryPanel === null || primaryPanel === void 0 ? void 0 : primaryPanel.position) === "end"
    };
    return (h("div", { class: mainClasses },
      h("slot", { name: SLOTS.primaryPanel }),
      this.renderContent(),
      h("slot", { name: SLOTS.contextualPanel })));
  }
  render() {
    return (h(Fragment, null,
      this.renderHeader(),
      this.renderMain(),
      this.renderFooter()));
  }
  static get is() { return "calcite-shell"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["calcite-shell.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["calcite-shell.css"]
  }; }
  static get properties() { return {
    "contentBehind": {
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
        "text": "Positions the center content behind any calcite-shell-panels."
      },
      "attribute": "content-behind",
      "reflect": true
    }
  }; }
  static get elementRef() { return "el"; }
}
