import { Component, Element, Event, h, Prop, Method, Fragment } from "@stencil/core";
import { getElementDir } from "../../utils/dom";
import { CSS, TEXT } from "./resources";
const maxPagesDisplayed = 5;
export class CalcitePagination {
  constructor() {
    //--------------------------------------------------------------------------
    //
    //  Public Properties
    //
    //--------------------------------------------------------------------------
    /** number of items per page */
    this.num = 20;
    /** index of item that should begin the page */
    this.start = 1;
    /** total number of items */
    this.total = 0;
    /** title of the next button
     * @default "next"
     */
    this.textLabelNext = TEXT.nextLabel;
    /** title of the previous button
     * @default "previous"
     */
    this.textLabelPrevious = TEXT.previousLabel;
    /** The scale of the pagination */
    this.scale = "m";
    this.previousClicked = () => {
      this.previousPage().then();
      this.emitUpdate();
    };
    this.nextClicked = () => {
      this.nextPage();
      this.emitUpdate();
    };
  }
  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------
  /** Go to the next page of results */
  async nextPage() {
    this.start = Math.min(this.getLastStart(), this.start + this.num);
  }
  /** Go to the previous page of results */
  async previousPage() {
    this.start = Math.max(1, this.start - this.num);
  }
  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------
  getLastStart() {
    const { total, num } = this;
    const lastStart = total % num === 0 ? total - num : Math.floor(total / num) * num;
    return lastStart + 1;
  }
  showLeftEllipsis() {
    return Math.floor(this.start / this.num) > 3;
  }
  showRightEllipsis() {
    return (this.total - this.start) / this.num > 3;
  }
  emitUpdate() {
    const changePayload = {
      start: this.start,
      total: this.total,
      num: this.num
    };
    this.calcitePaginationChange.emit(changePayload);
    this.calcitePaginationUpdate.emit(changePayload);
  }
  //--------------------------------------------------------------------------
  //
  //  Render Methods
  //
  //--------------------------------------------------------------------------
  renderPages() {
    const lastStart = this.getLastStart();
    let end;
    let nextStart;
    // if we don't need ellipses render the whole set
    if (this.total / this.num <= maxPagesDisplayed) {
      nextStart = 1 + this.num;
      end = lastStart - this.num;
    }
    else {
      // if we're within max pages of page 1
      if (this.start / this.num < maxPagesDisplayed - 1) {
        nextStart = 1 + this.num;
        end = 1 + 4 * this.num;
      }
      else {
        // if we're within max pages of last page
        if (this.start + 3 * this.num >= this.total) {
          nextStart = lastStart - 4 * this.num;
          end = lastStart - this.num;
        }
        else {
          nextStart = this.start - this.num;
          end = this.start + this.num;
        }
      }
    }
    const pages = [];
    while (nextStart <= end) {
      pages.push(nextStart);
      nextStart = nextStart + this.num;
    }
    return pages.map((page) => this.renderPage(page));
  }
  renderPage(start) {
    const page = Math.floor(start / this.num) + (this.num === 1 ? 0 : 1);
    return (h("button", { class: {
        [CSS.page]: true,
        [CSS.selected]: start === this.start
      }, onClick: () => {
        this.start = start;
        this.emitUpdate();
      } }, page));
  }
  renderLeftEllipsis() {
    if (this.total / this.num > maxPagesDisplayed && this.showLeftEllipsis()) {
      return h("span", { class: `${CSS.ellipsis} ${CSS.ellipsisStart}` }, "\u2026");
    }
  }
  renderRightEllipsis() {
    if (this.total / this.num > maxPagesDisplayed && this.showRightEllipsis()) {
      return h("span", { class: `${CSS.ellipsis} ${CSS.ellipsisEnd}` }, "\u2026");
    }
  }
  render() {
    const dir = getElementDir(this.el);
    const { total, num, start } = this;
    const prevDisabled = num === 1 ? start <= num : start < num;
    const nextDisabled = num === 1 ? start + num > total : start + num > total;
    return (h(Fragment, null,
      h("button", { "aria-label": this.textLabelPrevious, class: {
          [CSS.previous]: true,
          [CSS.disabled]: prevDisabled
        }, disabled: prevDisabled, onClick: this.previousClicked },
        h("calcite-icon", { dir: dir, flipRtl: true, icon: "chevronLeft", scale: "s" })),
      total > num ? this.renderPage(1) : null,
      this.renderLeftEllipsis(),
      this.renderPages(),
      this.renderRightEllipsis(),
      this.renderPage(this.getLastStart()),
      h("button", { "aria-label": this.textLabelNext, class: {
          [CSS.next]: true,
          [CSS.disabled]: nextDisabled
        }, disabled: nextDisabled, onClick: this.nextClicked },
        h("calcite-icon", { dir: dir, flipRtl: true, icon: "chevronRight", scale: "s" }))));
  }
  static get is() { return "calcite-pagination"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["calcite-pagination.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["calcite-pagination.css"]
  }; }
  static get properties() { return {
    "num": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "number of items per page"
      },
      "attribute": "num",
      "reflect": false,
      "defaultValue": "20"
    },
    "start": {
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
        "text": "index of item that should begin the page"
      },
      "attribute": "start",
      "reflect": false,
      "defaultValue": "1"
    },
    "total": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "total number of items"
      },
      "attribute": "total",
      "reflect": false,
      "defaultValue": "0"
    },
    "textLabelNext": {
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
            "text": "\"next\"",
            "name": "default"
          }],
        "text": "title of the next button"
      },
      "attribute": "text-label-next",
      "reflect": false,
      "defaultValue": "TEXT.nextLabel"
    },
    "textLabelPrevious": {
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
            "text": "\"previous\"",
            "name": "default"
          }],
        "text": "title of the previous button"
      },
      "attribute": "text-label-previous",
      "reflect": false,
      "defaultValue": "TEXT.previousLabel"
    },
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
        "text": "The scale of the pagination"
      },
      "attribute": "scale",
      "reflect": true,
      "defaultValue": "\"m\""
    }
  }; }
  static get events() { return [{
      "method": "calcitePaginationUpdate",
      "name": "calcitePaginationUpdate",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [{
            "text": "use calcitePaginationChange instead",
            "name": "deprecated"
          }],
        "text": "Emitted whenever the selected page changes."
      },
      "complexType": {
        "original": "CalcitePaginationDetail",
        "resolved": "CalcitePaginationDetail",
        "references": {
          "CalcitePaginationDetail": {
            "location": "local"
          }
        }
      }
    }, {
      "method": "calcitePaginationChange",
      "name": "calcitePaginationChange",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [{
            "text": " [CalcitePaginationDetail](https://github.com/Esri/calcite-components/blob/master/src/components/calcite-pagination/calcite-pagination.tsx#L18)",
            "name": "see"
          }],
        "text": "Emitted whenever the selected page changes."
      },
      "complexType": {
        "original": "CalcitePaginationDetail",
        "resolved": "CalcitePaginationDetail",
        "references": {
          "CalcitePaginationDetail": {
            "location": "local"
          }
        }
      }
    }]; }
  static get methods() { return {
    "nextPage": {
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
        "text": "Go to the next page of results",
        "tags": []
      }
    },
    "previousPage": {
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
        "text": "Go to the previous page of results",
        "tags": []
      }
    }
  }; }
  static get elementRef() { return "el"; }
}
