import { Component, Element, h, Host, Method, Prop } from "@stencil/core";
import { focusElement, getElementDir } from "../../utils/dom";
import { CSS_UTILITY } from "../../utils/resources";
/** @slot default text slot for link text */
/** Any attributes placed on <calcite-link> component will propagate to the rendered child */
/** Passing a 'href' will render an anchor link, instead of a span. Role will be set to link, or link, depending on this. */
/** It is the consumers responsibility to add aria information, rel, target, for links, and any link attributes for form submission */
export class CalciteLink {
  constructor() {
    /** the node type of the rendered child element */
    this.childElType = "span";
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    this.storeTagRef = (el) => {
      this.childEl = el;
    };
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    this.childElType = this.href ? "a" : "span";
  }
  render() {
    const dir = getElementDir(this.el);
    const iconStartEl = (h("calcite-icon", { class: "calcite-link--icon icon-start", flipRtl: this.iconFlipRtl === "start" || this.iconFlipRtl === "both", icon: this.iconStart, scale: "s" }));
    const iconEndEl = (h("calcite-icon", { class: "calcite-link--icon icon-end", flipRtl: this.iconFlipRtl === "end" || this.iconFlipRtl === "both", icon: this.iconEnd, scale: "s" }));
    const Tag = this.childElType;
    const role = this.childElType === "span" ? "link" : null;
    const tabIndex = this.disabled ? -1 : this.childElType === "span" ? 0 : null;
    return (h(Host, { role: "presentation" },
      h(Tag, { class: { [CSS_UTILITY.rtl]: dir === "rtl" }, dir: dir, href: Tag === "a" && this.href, ref: this.storeTagRef, rel: Tag === "a" && this.rel, role: role, tabIndex: tabIndex, target: Tag === "a" && this.target },
        this.iconStart ? iconStartEl : null,
        h("slot", null),
        this.iconEnd ? iconEndEl : null)));
  }
  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  async setFocus() {
    focusElement(this.childEl);
  }
  static get is() { return "calcite-link"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["calcite-link.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["calcite-link.css"]
  }; }
  static get properties() { return {
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
        "text": "is the link disabled"
      },
      "attribute": "disabled",
      "reflect": true
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
        "text": "optionally pass a href - used to determine if the component should render as a link or an anchor"
      },
      "attribute": "href",
      "reflect": true
    },
    "iconEnd": {
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
        "text": "optionally pass an icon to display at the end of a button - accepts calcite ui icon names"
      },
      "attribute": "icon-end",
      "reflect": true
    },
    "iconFlipRtl": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "FlipContext",
        "resolved": "\"both\" | \"end\" | \"start\"",
        "references": {
          "FlipContext": {
            "location": "import",
            "path": "../interfaces"
          }
        }
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "flip the icon(s) in rtl"
      },
      "attribute": "icon-flip-rtl",
      "reflect": true
    },
    "iconStart": {
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
        "text": "optionally pass an icon to display at the start of a button - accepts calcite ui icon names"
      },
      "attribute": "icon-start",
      "reflect": true
    },
    "rel": {
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
        "text": "The rel attribute to apply to the hyperlink"
      },
      "attribute": "rel",
      "reflect": false
    },
    "target": {
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
        "text": "The target attribute to apply to the hyperlink"
      },
      "attribute": "target",
      "reflect": false
    }
  }; }
  static get methods() { return {
    "setFocus": {
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
}
