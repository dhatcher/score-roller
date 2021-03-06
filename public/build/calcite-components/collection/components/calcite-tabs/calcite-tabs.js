import { Component, Prop, h, Element, Listen, State, Fragment } from "@stencil/core";
export class CalciteTabs {
  constructor() {
    //--------------------------------------------------------------------------
    //
    //  Public Properties
    //
    //--------------------------------------------------------------------------
    /**
     * Align tab titles to the edge or fully justify them across the tab nav ("center")
     */
    this.layout = "inline";
    /**
     * Display the tabs above (default) or below the tab content
     */
    this.position = "above";
    /**
     * Specify the scale of the tabs component, defaults to m
     */
    this.scale = "m";
    /**
     * Optionally enable tabs to appear like a folder-style menu when its layout is "inline"
     */
    this.bordered = false;
    //--------------------------------------------------------------------------
    //
    //  Events
    //
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //
    //  Private State/Props
    //
    //--------------------------------------------------------------------------
    /**
     * @internal
     *
     * Stores an array of ids of `<calcite-tab-titles>`s to match up ARIA
     * attributes.
     */
    this.titles = [];
    /**
     * @internal
     *
     * Stores an array of ids of `<calcite-tab>`s to match up ARIA attributes.
     */
    this.tabs = [];
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    if (this.layout === "center") {
      this.bordered = false;
    }
  }
  render() {
    return (h(Fragment, null,
      h("slot", { name: "tab-nav" }),
      h("section", null,
        h("slot", null))));
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  /**
   * @internal
   */
  calciteTabTitleRegister(e) {
    this.titles = [...this.titles, e.target];
    this.registryHandler();
    e.stopPropagation();
  }
  /**
   * @internal
   */
  calciteTabTitleUnregister(e) {
    this.titles = this.titles.filter((el) => el !== e.detail);
    this.registryHandler();
    e.stopPropagation();
  }
  /**
   * @internal
   */
  calciteTabRegister(e) {
    this.tabs = [...this.tabs, e.target];
    this.registryHandler();
    e.stopPropagation();
  }
  /**
   * @internal
   */
  calciteTabUnregister(e) {
    this.tabs = this.tabs.filter((el) => el !== e.detail);
    this.registryHandler();
    e.stopPropagation();
  }
  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  /**
   * @internal
   *
   * Matches up elements from the internal `tabs` and `titles` to automatically
   * update the ARIA attributes and link `<calcite-tab>` and
   * `<calcite-tab-title>` components.
   */
  async registryHandler() {
    let tabIds;
    let titleIds;
    // determine if we are using `tab` based or `index` based tab identifiers.
    if (this.tabs.some((e) => e.tab) || this.titles.some((e) => e.tab)) {
      // if we are using `tab` based identifiers sort by `tab` to account for
      // possible out of order tabs and get the id of each tab
      tabIds = this.tabs.sort((a, b) => a.tab.localeCompare(b.tab)).map((e) => e.id);
      titleIds = this.titles.sort((a, b) => a.tab.localeCompare(b.tab)).map((e) => e.id);
    }
    else {
      // if we are using index based tabs then the `<calcite-tab>` and
      // `<calcite-tab-title>` might have been rendered out of order so the
      // order of `this.tabs` and `this.titles` might not reflect the DOM state,
      // and might not match each other so we need to get the index of all the
      // tabs and titles in the DOM order to match them up as a source of truth
      const tabDomIndexes = await Promise.all(this.tabs.map((el) => el.getTabIndex()));
      const titleDomIndexes = await Promise.all(this.titles.map((el) => el.getTabIndex()));
      // once we have the DOM order as a source of truth we can build the
      // matching tabIds and titleIds arrays
      tabIds = tabDomIndexes.reduce((ids, indexInDOM, registryIndex) => {
        ids[indexInDOM] = this.tabs[registryIndex].id;
        return ids;
      }, []);
      titleIds = titleDomIndexes.reduce((ids, indexInDOM, registryIndex) => {
        ids[indexInDOM] = this.titles[registryIndex].id;
        return ids;
      }, []);
    }
    // pass all our new aria information to each `<calcite-tab>` and
    // `<calcite-tab-title>` which will check if they can update their internal
    // `controlled` or `labeledBy` states and re-render if necessary
    this.tabs.forEach((el) => el.updateAriaInfo(tabIds, titleIds));
    this.titles.forEach((el) => el.updateAriaInfo(tabIds, titleIds));
  }
  static get is() { return "calcite-tabs"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["calcite-tabs.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["calcite-tabs.css"]
  }; }
  static get properties() { return {
    "layout": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "TabLayout",
        "resolved": "\"center\" | \"inline\"",
        "references": {
          "TabLayout": {
            "location": "import",
            "path": "./interfaces"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Align tab titles to the edge or fully justify them across the tab nav (\"center\")"
      },
      "attribute": "layout",
      "reflect": true,
      "defaultValue": "\"inline\""
    },
    "position": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "TabPosition",
        "resolved": "\"above\" | \"below\"",
        "references": {
          "TabPosition": {
            "location": "import",
            "path": "./interfaces"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Display the tabs above (default) or below the tab content"
      },
      "attribute": "position",
      "reflect": true,
      "defaultValue": "\"above\""
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
        "text": "Specify the scale of the tabs component, defaults to m"
      },
      "attribute": "scale",
      "reflect": true,
      "defaultValue": "\"m\""
    },
    "bordered": {
      "type": "boolean",
      "mutable": true,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "Optionally enable tabs to appear like a folder-style menu when its layout is \"inline\""
      },
      "attribute": "bordered",
      "reflect": true,
      "defaultValue": "false"
    }
  }; }
  static get states() { return {
    "titles": {},
    "tabs": {}
  }; }
  static get elementRef() { return "el"; }
  static get listeners() { return [{
      "name": "calciteTabTitleRegister",
      "method": "calciteTabTitleRegister",
      "target": undefined,
      "capture": false,
      "passive": false
    }, {
      "name": "calciteTabTitleUnregister",
      "method": "calciteTabTitleUnregister",
      "target": "body",
      "capture": false,
      "passive": false
    }, {
      "name": "calciteTabRegister",
      "method": "calciteTabRegister",
      "target": undefined,
      "capture": false,
      "passive": false
    }, {
      "name": "calciteTabUnregister",
      "method": "calciteTabUnregister",
      "target": "body",
      "capture": false,
      "passive": false
    }]; }
}
