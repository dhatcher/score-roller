import { Component, Element, Prop, h, Fragment } from "@stencil/core";
import { CSS, SLOTS } from "./resources";
import { CSS_UTILITY } from "../../utils/resources";
import { HEADING_LEVEL } from "./resources";
import { getElementDir, getSlotted } from "../../utils/dom";
import { CalciteHeading, constrainHeadingLevel } from "../functional/CalciteHeading";
/**
 * @slot - A slot for adding `calcite-pick-list-item` elements.
 */
export class CalcitePickListGroup {
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  render() {
    var _a;
    const { el, groupTitle, headingLevel } = this;
    const rtl = getElementDir(el) === "rtl";
    const hasParentItem = getSlotted(el, SLOTS.parentItem) !== null;
    const sectionClasses = {
      [CSS.container]: true,
      [CSS.indented]: hasParentItem,
      [CSS_UTILITY.rtl]: rtl
    };
    const title = groupTitle;
    const parentLevel = (_a = el.closest("calcite-pick-list")) === null || _a === void 0 ? void 0 : _a.headingLevel;
    const relativeLevel = parentLevel ? constrainHeadingLevel(parentLevel + 1) : null;
    const level = headingLevel || relativeLevel || HEADING_LEVEL;
    return (h(Fragment, null,
      title ? (h(CalciteHeading, { class: CSS.heading, level: level }, title)) : null,
      h("slot", { name: SLOTS.parentItem }),
      h("section", { class: sectionClasses },
        h("slot", null))));
  }
  static get is() { return "calcite-pick-list-group"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["./calcite-pick-list-group.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["calcite-pick-list-group.css"]
  }; }
  static get properties() { return {
    "groupTitle": {
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
        "text": "The title used for all nested `calcite-pick-list` rows."
      },
      "attribute": "group-title",
      "reflect": true
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
    }
  }; }
  static get elementRef() { return "el"; }
}
