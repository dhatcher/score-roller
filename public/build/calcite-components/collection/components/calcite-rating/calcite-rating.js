import { Component, Element, Event, Fragment, h, Listen, Method, Prop, State } from "@stencil/core";
import { getElementDir, hasLabel } from "../../utils/dom";
import { guid } from "../../utils/guid";
import { TEXT } from "./calcite-rating-resources";
import { CSS_UTILITY } from "../../utils/resources";
export class CalciteRating {
  constructor() {
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------
    /** specify the scale of the component, defaults to m */
    this.scale = "m";
    /** the value of the rating component */
    this.value = 0;
    /** is the rating component in a selectable mode */
    this.readOnly = false;
    /** is the rating component in a selectable mode */
    this.disabled = false;
    /** Show average and count data summary chip (if available) */
    this.showChip = false;
    /** Localized string for "Rating" (used for aria label)
     * @default "Rating"
     */
    this.intlRating = TEXT.rating;
    /** Localized string for labelling each star, `${num}` in the string will be replaced by the number
     * @default "stars: ${num}"
     */
    this.intlStars = TEXT.stars;
    this.guid = `calcite-ratings-${guid()}`;
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  handleLabelFocus(e) {
    if (hasLabel(e.detail.labelEl, this.el) &&
      e.detail.interactedEl !== this.el &&
      !this.el.contains(e.detail.interactedEl)) {
      this.setFocus();
    }
  }
  blurHandler() {
    this.hasFocus = false;
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  renderStars() {
    return [1, 2, 3, 4, 5].map((i) => {
      const selected = this.value >= i;
      const average = this.average && !this.value && i <= this.average;
      const hovered = i <= this.hoverValue;
      const fraction = this.average && this.average + 1 - i;
      const partial = !this.value && !hovered && fraction > 0 && fraction < 1;
      const focused = this.hasFocus && this.focusValue === i;
      return (h("span", { class: { wrapper: true } },
        h("label", { class: { star: true, focused, selected, average, hovered, partial }, htmlFor: `${this.guid}-${i}`, onMouseOver: () => {
            this.hoverValue = i;
          } },
          h("calcite-icon", { "aria-hidden": "true", class: "icon", icon: selected || average || this.readOnly ? "star-f" : "star", scale: this.scale }),
          partial && (h("div", { class: "fraction", style: { width: `${fraction * 100}%` } },
            h("calcite-icon", { icon: "star-f", scale: this.scale }))),
          h("span", { class: "visually-hidden" }, this.intlStars.replace("${num}", `${i}`))),
        h("input", { checked: i === this.value, class: "visually-hidden", disabled: this.disabled || this.readOnly, id: `${this.guid}-${i}`, name: this.guid, onChange: () => this.updateValue(i), onFocus: () => {
            this.hasFocus = true;
            this.focusValue = i;
          }, ref: (el) => (i === 1 || i === this.value) && (this.inputFocusRef = el), type: "radio", value: i })));
    });
  }
  render() {
    const { intlRating, showChip, scale, count, average } = this;
    const dir = getElementDir(this.el);
    return (h(Fragment, null,
      h("fieldset", { class: { fieldset: true, [CSS_UTILITY.rtl]: dir === "rtl" }, onBlur: () => (this.hoverValue = null), onMouseLeave: () => (this.hoverValue = null), onTouchEnd: () => (this.hoverValue = null) },
        h("legend", { class: "visually-hidden" }, intlRating),
        this.renderStars()),
      (count || average) && showChip ? (h("calcite-chip", { class: { [CSS_UTILITY.rtl]: dir === "rtl" }, dir: dir, scale: scale, value: count === null || count === void 0 ? void 0 : count.toString() },
        !!average && h("span", { class: "number--average" }, average.toString()),
        !!count && h("span", { class: "number--count" },
          "(", count === null || count === void 0 ? void 0 :
          count.toString(),
          ")"))) : null));
  }
  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  updateValue(value) {
    this.value = value;
    this.calciteRatingChange.emit({ value });
  }
  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  async setFocus() {
    this.inputFocusRef.focus();
  }
  static get is() { return "calcite-rating"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["calcite-rating.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["calcite-rating.css"]
  }; }
  static get properties() { return {
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
        "text": "specify the scale of the component, defaults to m"
      },
      "attribute": "scale",
      "reflect": true,
      "defaultValue": "\"m\""
    },
    "value": {
      "type": "number",
      "mutable": true,
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "the value of the rating component"
      },
      "attribute": "value",
      "reflect": true,
      "defaultValue": "0"
    },
    "readOnly": {
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
        "text": "is the rating component in a selectable mode"
      },
      "attribute": "read-only",
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
      "optional": false,
      "docs": {
        "tags": [],
        "text": "is the rating component in a selectable mode"
      },
      "attribute": "disabled",
      "reflect": true,
      "defaultValue": "false"
    },
    "showChip": {
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
        "text": "Show average and count data summary chip (if available)"
      },
      "attribute": "show-chip",
      "reflect": true,
      "defaultValue": "false"
    },
    "count": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "optionally pass a number of previous ratings to display"
      },
      "attribute": "count",
      "reflect": true
    },
    "average": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "optionally pass a cumulative average rating to display"
      },
      "attribute": "average",
      "reflect": true
    },
    "intlRating": {
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
            "text": "\"Rating\"",
            "name": "default"
          }],
        "text": "Localized string for \"Rating\" (used for aria label)"
      },
      "attribute": "intl-rating",
      "reflect": false,
      "defaultValue": "TEXT.rating"
    },
    "intlStars": {
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
            "text": "\"stars: ${num}\"",
            "name": "default"
          }],
        "text": "Localized string for labelling each star, `${num}` in the string will be replaced by the number"
      },
      "attribute": "intl-stars",
      "reflect": false,
      "defaultValue": "TEXT.stars"
    }
  }; }
  static get states() { return {
    "hoverValue": {},
    "focusValue": {},
    "hasFocus": {}
  }; }
  static get events() { return [{
      "method": "calciteRatingChange",
      "name": "calciteRatingChange",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Fires when the rating value has changed."
      },
      "complexType": {
        "original": "{ value: number }",
        "resolved": "{ value: number; }",
        "references": {}
      }
    }]; }
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
  static get listeners() { return [{
      "name": "calciteLabelFocus",
      "method": "handleLabelFocus",
      "target": "window",
      "capture": false,
      "passive": false
    }, {
      "name": "blur",
      "method": "blurHandler",
      "target": undefined,
      "capture": false,
      "passive": false
    }]; }
}
