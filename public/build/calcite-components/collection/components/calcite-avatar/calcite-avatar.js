import { Component, Element, h, Prop, State } from "@stencil/core";
import { getElementDir } from "../../utils/dom";
import { isValidHex } from "../calcite-color-picker/utils";
import { hexToHue, stringToHex } from "./utils";
import { getThemeName } from "../../utils/dom";
export class CalciteAvatar {
  constructor() {
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------
    /** specify the scale of the avatar, defaults to m */
    this.scale = "m";
    //--------------------------------------------------------------------------
    //
    //  Private State/Props
    //
    //--------------------------------------------------------------------------
    /** True if thumnail fails to load */
    this.error = false;
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  render() {
    return this.determineContent();
  }
  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  determineContent() {
    const dir = getElementDir(this.el);
    if (this.thumbnail && !this.error) {
      return (h("img", { alt: "", class: "thumbnail", dir: dir, onError: () => (this.error = true), src: this.thumbnail }));
    }
    const initials = this.generateInitials();
    const backgroundColor = this.generateFillColor();
    return (h("span", { class: "background", dir: dir, style: { backgroundColor } }, initials ? (h("span", { "aria-hidden": "true", class: "initials" }, initials)) : (h("calcite-icon", { class: "icon", icon: "user", scale: this.scale }))));
  }
  /**
   * Generate a valid background color that is consistent and unique to this user
   */
  generateFillColor() {
    const { userId, username, fullName, el } = this;
    const theme = getThemeName(el);
    const id = userId && `#${userId.substr(userId.length - 6)}`;
    const name = username || fullName || "";
    const hex = id && isValidHex(id) ? id : stringToHex(name);
    // if there is not unique information, or an invalid hex is produced, return a default
    if ((!userId && !name) || !isValidHex(hex)) {
      return `var(--calcite-ui-foreground-2)`;
    }
    const hue = hexToHue(hex);
    const l = theme === "dark" ? 20 : 90;
    return `hsl(${hue}, 60%, ${l}%)`;
  }
  /**
   * Use fullname or username to generate initials
   */
  generateInitials() {
    const { fullName, username } = this;
    if (fullName) {
      return fullName
        .trim()
        .split(" ")
        .map((name) => name.substring(0, 1))
        .join("");
    }
    else if (username) {
      return username.substring(0, 2);
    }
    return false;
  }
  static get is() { return "calcite-avatar"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["calcite-avatar.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["calcite-avatar.css"]
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
        "text": "specify the scale of the avatar, defaults to m"
      },
      "attribute": "scale",
      "reflect": true,
      "defaultValue": "\"m\""
    },
    "thumbnail": {
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
        "text": "src to an image (remember to add a token if the user is private)"
      },
      "attribute": "thumbnail",
      "reflect": false
    },
    "fullName": {
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
        "text": "full name of the user"
      },
      "attribute": "full-name",
      "reflect": false
    },
    "username": {
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
        "text": "user name"
      },
      "attribute": "username",
      "reflect": false
    },
    "userId": {
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
        "text": "unique id for user"
      },
      "attribute": "user-id",
      "reflect": false
    }
  }; }
  static get states() { return {
    "error": {}
  }; }
  static get elementRef() { return "el"; }
}
