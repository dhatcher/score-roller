import { Component, Element, Prop, h, Host } from "@stencil/core";
import { SLOTS, CSS } from "./resources";
import { getSlotted } from "../../utils/dom";
/**
 * @slot actions-start - A slot for adding actionable `calcite-action` elements before the content of the list item.
 * @slot content-start - A slot for adding non-actionable elements before the label and description of the list item.
 * @slot content-end - A slot for adding non-actionable elements after the label and description of the list item.
 * @slot actions-end - A slot for adding actionable `calcite-action` elements after the content of the list item.
 */
export class CalciteListItem {
  constructor() {
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------
    /**
     * When true, prevents the content of the list item from user interaction.
     */
    this.nonInteractive = false;
    /**
     * When true, disabled prevents interaction.
     */
    this.disabled = false;
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  renderActionsStart() {
    const { el } = this;
    return getSlotted(el, SLOTS.actionsStart) ? (h("div", { class: CSS.actionsStart },
      h("slot", { name: SLOTS.actionsStart }))) : null;
  }
  renderActionsEnd() {
    const { el } = this;
    return getSlotted(el, SLOTS.actionsEnd) ? (h("div", { class: CSS.actionsEnd },
      h("slot", { name: SLOTS.actionsEnd }))) : null;
  }
  renderContentStart() {
    const { el } = this;
    return getSlotted(el, SLOTS.contentStart) ? (h("div", { class: CSS.contentStart },
      h("slot", { name: SLOTS.contentStart }))) : null;
  }
  renderContentEnd() {
    const { el } = this;
    return getSlotted(el, SLOTS.contentEnd) ? (h("div", { class: CSS.contentEnd },
      h("slot", { name: SLOTS.contentEnd }))) : null;
  }
  renderContent() {
    const { label, description } = this;
    return !!label || !!description ? (h("div", { class: CSS.content },
      label ? h("div", { class: CSS.label }, label) : null,
      description ? h("div", { class: CSS.description }, description) : null)) : null;
  }
  renderContentContainer() {
    const { disabled, nonInteractive } = this;
    const content = [this.renderContentStart(), this.renderContent(), this.renderContentEnd()];
    return !nonInteractive ? (h("button", { class: { [CSS.contentContainer]: true, [CSS.contentContainerButton]: true }, disabled: disabled }, content)) : (h("div", { class: CSS.contentContainer }, content));
  }
  render() {
    return (h(Host, { role: "listitem" },
      h("div", { class: CSS.container },
        this.renderActionsStart(),
        this.renderContentContainer(),
        this.renderActionsEnd())));
  }
  static get is() { return "calcite-list-item"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["calcite-list-item.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["calcite-list-item.css"]
  }; }
  static get properties() { return {
    "nonInteractive": {
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
        "text": "When true, prevents the content of the list item from user interaction."
      },
      "attribute": "non-interactive",
      "reflect": true,
      "defaultValue": "false"
    },
    "description": {
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
        "text": "An optional description for this item.  This will appear below the label text."
      },
      "attribute": "description",
      "reflect": false
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
        "text": "When true, disabled prevents interaction."
      },
      "attribute": "disabled",
      "reflect": true,
      "defaultValue": "false"
    },
    "label": {
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
            "text": "The label of the list item.",
            "name": "todo"
          }],
        "text": ""
      },
      "attribute": "label",
      "reflect": false
    }
  }; }
  static get elementRef() { return "el"; }
}
