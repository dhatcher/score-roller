import { Component, Fragment, h, Prop } from "@stencil/core";
export class CalciteTile {
  constructor() {
    /**
     * When true, prevents interaction.
     */
    this.disabled = false;
    /** The embed mode of the tile.  When true, renders without a border and padding for use by other components. */
    this.embed = false;
    /**
     * The focused state of the tile.
     * @private
     */
    this.focused = false;
    /** The hidden state of the tile. */
    this.hidden = false;
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  renderTile() {
    const isLargeVisual = this.heading && this.icon && !this.description;
    const iconStyle = isLargeVisual
      ? {
        height: "64px",
        width: "64px"
      }
      : undefined;
    return (h("div", { class: { "large-visual": isLargeVisual, tile: true } },
      this.icon && (h("div", { class: "icon" },
        h("calcite-icon", { icon: this.icon, scale: "l", style: iconStyle }))),
      this.heading && h("div", { class: "heading" }, this.heading),
      this.description && h("div", { class: "description" }, this.description)));
  }
  render() {
    return (h(Fragment, null, this.href ? (h("calcite-link", { disabled: this.disabled, href: this.href }, this.renderTile())) : (this.renderTile())));
  }
  static get is() { return "calcite-tile"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["calcite-tile.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["calcite-tile.css"]
  }; }
  static get properties() { return {
    "active": {
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
        "text": "The active state of the tile."
      },
      "attribute": "active",
      "reflect": true
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
      "optional": true,
      "docs": {
        "tags": [],
        "text": "The description text that appears beneath the heading of the tile."
      },
      "attribute": "description",
      "reflect": true
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
        "text": "When true, prevents interaction."
      },
      "attribute": "disabled",
      "reflect": true,
      "defaultValue": "false"
    },
    "embed": {
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
        "text": "The embed mode of the tile.  When true, renders without a border and padding for use by other components."
      },
      "attribute": "embed",
      "reflect": true,
      "defaultValue": "false"
    },
    "focused": {
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
        "tags": [{
            "text": undefined,
            "name": "private"
          }],
        "text": "The focused state of the tile."
      },
      "attribute": "focused",
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
      "optional": true,
      "docs": {
        "tags": [],
        "text": "The heading text that appears between the icon and description of the tile."
      },
      "attribute": "heading",
      "reflect": true
    },
    "hidden": {
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
        "text": "The hidden state of the tile."
      },
      "attribute": "hidden",
      "reflect": true,
      "defaultValue": "false"
    },
    "href": {
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
        "text": "The (optional) url for the tile. (Only applies when embed is set to false)"
      },
      "attribute": "href",
      "reflect": true
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
        "text": "The icon that appears at the top of the tile."
      },
      "attribute": "icon",
      "reflect": true
    }
  }; }
}
