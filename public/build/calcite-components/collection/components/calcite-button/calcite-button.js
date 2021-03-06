import { Component, Element, h, Method, Prop, Build, State, Watch } from "@stencil/core";
import { CSS, TEXT } from "./resources";
import { getElementDir, queryElementRoots, closestElementCrossShadowBoundary } from "../../utils/dom";
import { CSS_UTILITY } from "../../utils/resources";
/** @slot default text slot for button text */
/** Passing a 'href' will render an anchor link, instead of a button. Role will be set to link, or button, depending on this. */
/** It is the consumers responsibility to add aria information, rel, target, for links, and any button attributes for form submission */
export class CalciteButton {
  constructor() {
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------
    /** optionally specify alignment of button elements. */
    this.alignment = "center";
    /** specify the appearance style of the button, defaults to solid. */
    this.appearance = "solid";
    /** specify the color of the button, defaults to blue */
    this.color = "blue";
    /** string to override English loading text
     * @default "Loading"
     */
    this.intlLoading = TEXT.loading;
    /** optionally add a calcite-loader component to the button, disabling interaction.  */
    this.loading = false;
    /** optionally add a round style to the button  */
    this.round = false;
    /** specify the scale of the button, defaults to m */
    this.scale = "m";
    /** is the button a child of a calcite-split-button */
    this.splitChild = false;
    /** specify the width of the button, defaults to auto */
    this.width = "auto";
    /** the node type of the rendered child element */
    this.childElType = "button";
    /** determine if there is slotted content for styling purposes */
    this.hasContent = false;
    /** determine if loader present for styling purposes */
    this.hasLoader = false;
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    // act on a requested or nearby form based on type
    this.handleClick = (e) => {
      const { childElType, form, el, type } = this;
      // this.type refers to type attribute, not child element type
      if (childElType === "button" && type !== "button") {
        const targetForm = form
          ? queryElementRoots(el, `#${form}`)
          : closestElementCrossShadowBoundary(el, "form");
        if (targetForm) {
          const targetFormSubmitFunction = targetForm.onsubmit;
          switch (type) {
            case "submit":
              if (targetFormSubmitFunction) {
                targetFormSubmitFunction();
              }
              else if (targetForm.checkValidity()) {
                targetForm.submit();
              }
              else {
                targetForm.reportValidity();
              }
              break;
            case "reset":
              targetForm.reset();
              break;
          }
        }
        e.preventDefault();
      }
    };
  }
  loadingChanged(newValue, oldValue) {
    if (!!newValue && !oldValue) {
      this.hasLoader = true;
    }
    if (!newValue && !!oldValue) {
      window.setTimeout(() => {
        this.hasLoader = false;
      }, 300);
    }
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    this.childElType = this.href ? "a" : "button";
    this.hasLoader = this.loading;
    this.setupTextContentObserver();
  }
  disconnectedCallback() {
    this.observer.disconnect();
  }
  componentWillLoad() {
    if (Build.isBrowser) {
      this.updateHasContent();
      if (this.childElType === "button" && !this.type) {
        this.type = "submit";
      }
    }
  }
  render() {
    const dir = getElementDir(this.el);
    const Tag = this.childElType;
    const loader = (h("div", { class: CSS.buttonLoader }, this.hasLoader ? (h("calcite-loader", { active: true, class: this.loading ? CSS.loadingIn : CSS.loadingOut, inline: true, label: this.intlLoading })) : null));
    const iconStartEl = (h("calcite-icon", { class: { [CSS.icon]: true, [CSS.iconStart]: true }, flipRtl: this.iconFlipRtl === "start" || this.iconFlipRtl === "both", icon: this.iconStart, scale: "s" }));
    const iconEndEl = (h("calcite-icon", { class: { [CSS.icon]: true, [CSS.iconEnd]: true }, flipRtl: this.iconFlipRtl === "end" || this.iconFlipRtl === "both", icon: this.iconEnd, scale: "s" }));
    const contentEl = (h("span", { class: CSS.content },
      h("slot", null)));
    return (h(Tag, { "aria-label": this.label, class: { [CSS_UTILITY.rtl]: dir === "rtl", [CSS.contentSlotted]: this.hasContent }, disabled: this.disabled || this.loading, href: this.childElType === "a" && this.href, name: this.childElType === "button" && this.name, onClick: this.handleClick, ref: (el) => (this.childEl = el), rel: this.childElType === "a" && this.rel, tabIndex: this.disabled || this.loading ? -1 : null, target: this.childElType === "a" && this.target, type: this.childElType === "button" && this.type },
      loader,
      this.iconStart ? iconStartEl : null,
      this.hasContent ? contentEl : null,
      this.iconEnd ? iconEndEl : null));
  }
  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  async setFocus() {
    this.childEl.focus();
  }
  updateHasContent() {
    var _a, _b;
    const slottedContent = this.el.textContent.trim().length > 0 || this.el.childNodes.length > 0;
    this.hasContent =
      this.el.childNodes.length === 1 && ((_a = this.el.childNodes[0]) === null || _a === void 0 ? void 0 : _a.nodeName) === "#text"
        ? ((_b = this.el.textContent) === null || _b === void 0 ? void 0 : _b.trim().length) > 0
        : slottedContent;
  }
  setupTextContentObserver() {
    if (Build.isBrowser) {
      this.observer = new MutationObserver(() => {
        this.updateHasContent();
      });
      this.observer.observe(this.el, { childList: true, subtree: true });
    }
  }
  static get is() { return "calcite-button"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["calcite-button.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["calcite-button.css"]
  }; }
  static get properties() { return {
    "alignment": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "ButtonAlignment",
        "resolved": "\"center\" | \"end\" | \"icon-end-space-between\" | \"icon-start-space-between\" | \"space-between\" | \"start\"",
        "references": {
          "ButtonAlignment": {
            "location": "import",
            "path": "./interfaces"
          }
        }
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "optionally specify alignment of button elements."
      },
      "attribute": "alignment",
      "reflect": true,
      "defaultValue": "\"center\""
    },
    "appearance": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "ButtonAppearance",
        "resolved": "\"clear\" | \"outline\" | \"solid\" | \"transparent\"",
        "references": {
          "ButtonAppearance": {
            "location": "import",
            "path": "./interfaces"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "specify the appearance style of the button, defaults to solid."
      },
      "attribute": "appearance",
      "reflect": true,
      "defaultValue": "\"solid\""
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
      "optional": true,
      "docs": {
        "tags": [],
        "text": "Applies to the aria-label attribute on the button or hyperlink"
      },
      "attribute": "label",
      "reflect": false
    },
    "color": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "ButtonColor",
        "resolved": "\"blue\" | \"inverse\" | \"neutral\" | \"red\"",
        "references": {
          "ButtonColor": {
            "location": "import",
            "path": "./interfaces"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "specify the color of the button, defaults to blue"
      },
      "attribute": "color",
      "reflect": true,
      "defaultValue": "\"blue\""
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
      "optional": true,
      "docs": {
        "tags": [],
        "text": "is the button disabled"
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
        "text": "optionally pass a href - used to determine if the component should render as a button or an anchor"
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
    "loading": {
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
        "text": "optionally add a calcite-loader component to the button, disabling interaction."
      },
      "attribute": "loading",
      "reflect": true,
      "defaultValue": "false"
    },
    "name": {
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
        "text": "The name attribute to apply to the button"
      },
      "attribute": "name",
      "reflect": false
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
    "form": {
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
        "text": "The form ID to associate with the component"
      },
      "attribute": "form",
      "reflect": false
    },
    "round": {
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
        "text": "optionally add a round style to the button"
      },
      "attribute": "round",
      "reflect": true,
      "defaultValue": "false"
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
        "text": "specify the scale of the button, defaults to m"
      },
      "attribute": "scale",
      "reflect": true,
      "defaultValue": "\"m\""
    },
    "splitChild": {
      "type": "any",
      "mutable": false,
      "complexType": {
        "original": "\"primary\" | \"secondary\" | false",
        "resolved": "\"primary\" | \"secondary\" | boolean",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "is the button a child of a calcite-split-button"
      },
      "attribute": "split-child",
      "reflect": true,
      "defaultValue": "false"
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
    },
    "type": {
      "type": "string",
      "mutable": true,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "The type attribute to apply to the button"
      },
      "attribute": "type",
      "reflect": false
    },
    "width": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "Width",
        "resolved": "\"auto\" | \"full\" | \"half\"",
        "references": {
          "Width": {
            "location": "import",
            "path": "../interfaces"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "specify the width of the button, defaults to auto"
      },
      "attribute": "width",
      "reflect": true,
      "defaultValue": "\"auto\""
    }
  }; }
  static get states() { return {
    "hasContent": {},
    "hasLoader": {}
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
  static get watchers() { return [{
      "propName": "loading",
      "methodName": "loadingChanged"
    }]; }
}
