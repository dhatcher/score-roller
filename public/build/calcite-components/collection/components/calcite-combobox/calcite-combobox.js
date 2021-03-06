import { Component, h, Prop, State, Listen, Event, Element, Build, Method, Watch, Host } from "@stencil/core";
import { filter } from "../../utils/filter";
import { getElementDir } from "../../utils/dom";
import { debounce } from "lodash-es";
import { getKey } from "../../utils/key";
import { createPopper, updatePopper, CSS as PopperCSS } from "../../utils/popper";
import { guid } from "../../utils/guid";
import { ComboboxChildSelector, ComboboxItem, ComboboxItemGroup, ComboboxDefaultPlacement } from "./resources";
import { getItemAncestors, getItemChildren, hasActiveChildren } from "./utils";
const isGroup = (el) => el.tagName === ComboboxItemGroup;
export class CalciteCombobox {
  constructor() {
    //--------------------------------------------------------------------------
    //
    //  Public Properties
    //
    //--------------------------------------------------------------------------
    /** Open and close combobox */
    this.active = false;
    /** Disable combobox input */
    this.disabled = false;
    /** Specify the maximum number of combobox items (including nested children) to display before showing the scroller */
    this.maxItems = 0;
    /** Describes the type of positioning to use for the overlaid content. If your element is in a fixed container, use the 'fixed' value. */
    this.overlayPositioning = "absolute";
    /** specify the selection mode
     * - multi: allow any number of selected items (default)
     * - single: only one selection)
     * - ancestors: like multi, but show ancestors of selected items as selected, only deepest children shown in chips
     */
    this.selectionMode = "multi";
    /** Specify the scale of the combobox, defaults to m */
    this.scale = "m";
    //--------------------------------------------------------------------------
    //
    //  Private State/Props
    //
    //--------------------------------------------------------------------------
    this.items = [];
    this.groupItems = [];
    this.selectedItems = [];
    this.visibleItems = [];
    this.hideList = !this.active;
    this.activeItemIndex = -1;
    this.activeChipIndex = -1;
    this.activeDescendant = "";
    this.text = "";
    this.open = this.active;
    /** specifies the item wrapper height; it is updated when maxItems is > 0  **/
    this.maxScrollerHeight = 0;
    this.textInput = null;
    this.observer = null;
    this.guid = guid();
    this.inputHeight = 0;
    this.ignoreSelectedEventsFlag = false;
    this.activeTransitionProp = "opacity";
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    this.keydownHandler = (event) => {
      const key = getKey(event.key, getElementDir(this.el));
      switch (key) {
        case "Tab":
          this.activeChipIndex = -1;
          this.activeItemIndex = -1;
          if (this.allowCustomValues && this.text) {
            this.addCustomChip(this.text, true);
            event.preventDefault();
          }
          else {
            this.active = false;
          }
          break;
        case "ArrowLeft":
          this.previousChip();
          break;
        case "ArrowRight":
          this.nextChip();
          break;
        case "ArrowUp":
          event.preventDefault();
          this.active = true;
          this.shiftActiveItemIndex(-1);
          break;
        case "ArrowDown":
          event.preventDefault();
          this.active = true;
          this.shiftActiveItemIndex(1);
          break;
        case "Home":
          this.active = true;
          this.updateActiveItemIndex(0);
          break;
        case "End":
          this.active = true;
          this.updateActiveItemIndex(this.visibleItems.length - 1);
          break;
        case "Escape":
          this.active = false;
          break;
        case "Enter":
          if (this.activeItemIndex > -1) {
            this.toggleSelection(this.visibleItems[this.activeItemIndex]);
          }
          else if (this.activeChipIndex > -1) {
            this.removeActiveChip();
          }
          else if (this.allowCustomValues && this.text) {
            this.addCustomChip(this.text, true);
          }
          break;
        case "Delete":
        case "Backspace":
          if (this.activeChipIndex > -1) {
            this.removeActiveChip();
          }
          else if (!this.text && this.isMulti()) {
            this.removeLastChip();
          }
          break;
        default:
          if (!this.active) {
            this.setFocus();
          }
          break;
      }
    };
    this.toggleCloseEnd = () => {
      this.hideList = true;
      this.el.removeEventListener("calciteComboboxClose", this.toggleCloseEnd);
    };
    this.toggleOpenEnd = () => {
      this.hideList = false;
      this.el.removeEventListener("calciteComboboxOpen", this.toggleOpenEnd);
    };
    this.transitionEnd = (event) => {
      if (event.propertyName === this.activeTransitionProp) {
        this.active ? this.calciteComboboxOpen.emit() : this.calciteComboboxClose.emit();
      }
    };
    this.setMaxScrollerHeight = () => {
      if (this.active) {
        this.maxScrollerHeight = this.getMaxScrollerHeight(this.getCombinedItems());
      }
    };
    this.calciteChipDismissHandler = (event, comboboxItem) => {
      this.active = false;
      const selection = this.items.find((item) => item === comboboxItem);
      if (selection) {
        this.toggleSelection(selection, false);
      }
      this.calciteComboboxChipDismiss.emit(event.detail);
    };
    this.setFocusClick = () => {
      this.setFocus();
    };
    this.setInactiveIfNotContained = (event) => {
      const composedPath = event.composedPath();
      if (!this.active || composedPath.includes(this.el) || composedPath.includes(this.referenceEl)) {
        return;
      }
      if (this.allowCustomValues && this.text) {
        this.addCustomChip(this.text);
      }
      if (this.selectionMode === "single") {
        if (this.textInput) {
          this.textInput.value = "";
        }
        this.text = "";
        this.filterItems("");
        this.updateActiveItemIndex(-1);
      }
      this.active = false;
    };
    this.setMenuEl = (el) => {
      this.menuEl = el;
    };
    this.setListContainerEl = (el) => {
      this.listContainerEl = el;
    };
    this.setReferenceEl = (el) => {
      this.referenceEl = el;
    };
    this.inputHandler = (event) => {
      const value = event.target.value;
      this.text = value;
      this.filterItems(value);
      if (value) {
        this.activeChipIndex = -1;
      }
    };
    this.filterItems = (() => {
      const find = (item, filteredData) => item &&
        filteredData.some(({ label, value }) => {
          if (isGroup(item)) {
            return value === item.label || value === item.label;
          }
          return (value === item.textLabel ||
            value === item.value ||
            label === item.textLabel ||
            label === item.value);
        });
      return debounce((text) => {
        const filteredData = filter(this.data, text);
        const items = this.getCombinedItems();
        items.forEach((item) => {
          const hidden = !find(item, filteredData);
          item.hidden = hidden;
          const [parent, grandparent] = item.ancestors;
          if (find(parent, filteredData) || find(grandparent, filteredData)) {
            item.hidden = false;
          }
          if (!hidden) {
            item.ancestors.forEach((ancestor) => (ancestor.hidden = false));
          }
        });
        this.visibleItems = this.getVisibleItems();
        this.calciteComboboxFilterChange.emit({ visibleItems: [...this.visibleItems], text: text });
      }, 100);
    })();
    this.internalCalciteLookupChangeEvent = () => {
      this.calciteLookupChange.emit(this.selectedItems);
    };
    this.emitCalciteLookupChange = debounce(this.internalCalciteLookupChangeEvent, 0);
    this.internalComboboxChangeEvent = () => {
      const { selectedItems } = this;
      this.calciteComboboxChange.emit({ selectedItems });
    };
    this.emitComboboxChange = debounce(this.internalComboboxChangeEvent, 0);
    this.updateItems = () => {
      this.items = this.getItems();
      this.groupItems = this.getGroupItems();
      this.data = this.getData();
      this.selectedItems = this.getSelectedItems();
      this.visibleItems = this.getVisibleItems();
      this.needsIcon = this.getNeedsIcon();
      if (!this.allowCustomValues) {
        this.setMaxScrollerHeight();
      }
    };
    this.comboboxFocusHandler = () => {
      this.active = true;
      this.textInput.focus();
    };
    this.comboboxBlurHandler = (event) => {
      this.setInactiveIfNotContained(event);
    };
  }
  activeHandler(newValue, oldValue) {
    // when closing, wait transition time then hide to prevent overscroll
    if (oldValue && !newValue) {
      this.el.addEventListener("calciteComboboxClose", this.toggleCloseEnd);
      this.open = false;
    }
    else if (!oldValue && newValue) {
      this.el.addEventListener("calciteComboboxOpen", this.toggleOpenEnd);
      // give the combobox height, then reposition prior to opening
      requestAnimationFrame(() => {
        this.reposition();
        this.setMaxScrollerHeight();
        this.open = true;
      });
    }
    this.reposition();
    this.setMaxScrollerHeight();
  }
  maxItemsHandler() {
    this.setMaxScrollerHeight();
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  documentClickHandler(event) {
    this.setInactiveIfNotContained(event);
  }
  calciteComboboxItemChangeHandler(event) {
    if (this.ignoreSelectedEventsFlag) {
      return;
    }
    const target = event.target;
    this.toggleSelection(target, target.selected);
  }
  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  async reposition() {
    const { popper, menuEl } = this;
    const modifiers = this.getModifiers();
    popper
      ? updatePopper({
        el: menuEl,
        modifiers,
        placement: ComboboxDefaultPlacement,
        popper
      })
      : this.createPopper();
  }
  async setFocus() {
    var _a;
    this.active = true;
    (_a = this.textInput) === null || _a === void 0 ? void 0 : _a.focus();
    this.activeChipIndex = -1;
    this.activeItemIndex = -1;
  }
  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------
  connectedCallback() {
    if (Build.isBrowser) {
      this.observer = new MutationObserver(this.updateItems);
    }
    this.createPopper();
  }
  componentWillLoad() {
    this.updateItems();
  }
  componentDidLoad() {
    var _a;
    (_a = this.observer) === null || _a === void 0 ? void 0 : _a.observe(this.el, { childList: true, subtree: true });
  }
  componentDidRender() {
    if (this.el.offsetHeight !== this.inputHeight) {
      this.reposition();
      this.inputHeight = this.el.offsetHeight;
    }
  }
  disconnectedCallback() {
    var _a;
    (_a = this.observer) === null || _a === void 0 ? void 0 : _a.disconnect();
    this.destroyPopper();
  }
  /** when search text is cleared, reset active to  */
  textHandler() {
    this.updateActiveItemIndex(-1);
  }
  getModifiers() {
    const flipModifier = {
      name: "flip",
      enabled: true
    };
    flipModifier.options = {
      fallbackPlacements: ["top-start", "top", "top-end", "bottom-start", "bottom", "bottom-end"]
    };
    return [flipModifier];
  }
  createPopper() {
    this.destroyPopper();
    const { menuEl, referenceEl, overlayPositioning } = this;
    const modifiers = this.getModifiers();
    this.popper = createPopper({
      el: menuEl,
      modifiers,
      overlayPositioning,
      placement: ComboboxDefaultPlacement,
      referenceEl
    });
  }
  destroyPopper() {
    const { popper } = this;
    if (popper) {
      popper.destroy();
    }
    this.popper = null;
  }
  getMaxScrollerHeight(items) {
    const { maxItems } = this;
    let itemsToProcess = 0;
    let maxScrollerHeight = 0;
    items.forEach((item) => {
      if (itemsToProcess < maxItems && maxItems > 0) {
        const height = this.calculateSingleItemHeight(item);
        if (height > 0) {
          maxScrollerHeight += height;
          itemsToProcess++;
        }
      }
    });
    return maxScrollerHeight;
  }
  calculateSingleItemHeight(item) {
    let height = item.offsetHeight;
    // if item has children items, don't count their height twice
    const children = item.querySelectorAll(ComboboxChildSelector);
    children.forEach((child) => {
      height -= child.offsetHeight;
    });
    return height;
  }
  getCombinedItems() {
    return [...this.groupItems, ...this.items];
  }
  toggleSelection(item, value = !item.selected) {
    if (!item) {
      return;
    }
    if (this.isMulti()) {
      item.selected = value;
      this.updateAncestors(item);
      this.selectedItems = this.getSelectedItems();
      this.emitCalciteLookupChange();
      this.emitComboboxChange();
      this.resetText();
      this.textInput.focus();
      this.filterItems("");
    }
    else {
      this.ignoreSelectedEventsFlag = true;
      this.items.forEach((el) => (el.selected = el === item));
      this.ignoreSelectedEventsFlag = false;
      this.selectedItems = this.getSelectedItems();
      this.emitComboboxChange();
      this.textInput.value = item.textLabel;
      this.active = false;
      this.updateActiveItemIndex(-1);
      this.resetText();
      this.filterItems("");
    }
  }
  updateAncestors(item) {
    if (this.selectionMode !== "ancestors") {
      return;
    }
    const ancestors = getItemAncestors(item);
    const children = getItemChildren(item);
    if (item.selected) {
      ancestors.forEach((el) => {
        el.selected = true;
      });
    }
    else {
      children.forEach((el) => (el.selected = false));
      [...ancestors].forEach((el) => {
        if (!hasActiveChildren(el)) {
          el.selected = false;
        }
      });
    }
  }
  getVisibleItems() {
    return this.items.filter((item) => !item.hidden);
  }
  getSelectedItems() {
    return !this.isMulti()
      ? [this.items.find((item) => item.selected)]
      : this.items
        .filter((item) => item.selected && (this.selectionMode !== "ancestors" || !hasActiveChildren(item)))
        /** Preserve order of entered tags */
        .sort((a, b) => {
        const aIdx = this.selectedItems.indexOf(a);
        const bIdx = this.selectedItems.indexOf(b);
        if (aIdx > -1 && bIdx > -1) {
          return aIdx - bIdx;
        }
        return bIdx - aIdx;
      });
  }
  getData() {
    return this.items.map((item) => ({
      constant: item.constant,
      value: item.value,
      label: item.textLabel,
      guid: item.guid
    }));
  }
  getNeedsIcon() {
    return this.selectionMode === "single" && this.items.some((item) => item.icon);
  }
  resetText() {
    this.textInput.value = "";
    this.text = "";
  }
  getItems() {
    const items = Array.from(this.el.querySelectorAll(ComboboxItem));
    return items.filter((item) => !item.disabled);
  }
  getGroupItems() {
    return Array.from(this.el.querySelectorAll(ComboboxItemGroup));
  }
  addCustomChip(value, focus) {
    const existingItem = this.items.find((el) => el.textLabel === value);
    if (existingItem) {
      this.toggleSelection(existingItem, true);
    }
    else {
      const item = document.createElement(ComboboxItem);
      item.value = value;
      item.textLabel = value;
      item.guid = guid();
      item.selected = true;
      this.el.appendChild(item);
      this.resetText();
      if (focus) {
        this.setFocus();
      }
      this.updateItems();
      this.filterItems("");
      this.emitCalciteLookupChange();
      this.emitComboboxChange();
    }
  }
  removeActiveChip() {
    this.toggleSelection(this.selectedItems[this.activeChipIndex], false);
    this.setFocus();
  }
  removeLastChip() {
    this.toggleSelection(this.selectedItems[this.selectedItems.length - 1], false);
    this.setFocus();
  }
  previousChip() {
    if (this.text) {
      return;
    }
    const length = this.selectedItems.length - 1;
    const active = this.activeChipIndex;
    this.activeChipIndex = active === -1 ? length : Math.max(active - 1, 0);
    this.updateActiveItemIndex(-1);
    this.focusChip();
  }
  nextChip() {
    if (this.text || this.activeChipIndex === -1) {
      return;
    }
    const last = this.selectedItems.length - 1;
    const newIndex = this.activeChipIndex + 1;
    if (newIndex > last) {
      this.activeChipIndex = -1;
      this.setFocus();
    }
    else {
      this.activeChipIndex = newIndex;
      this.focusChip();
    }
    this.updateActiveItemIndex(-1);
  }
  focusChip() {
    var _a;
    const guid = (_a = this.selectedItems[this.activeChipIndex]) === null || _a === void 0 ? void 0 : _a.guid;
    const chip = this.referenceEl.querySelector(`#chip-${guid}`);
    chip === null || chip === void 0 ? void 0 : chip.setFocus();
  }
  shiftActiveItemIndex(delta) {
    const length = this.visibleItems.length;
    const newIndex = (this.activeItemIndex + length + delta) % length;
    this.updateActiveItemIndex(newIndex);
    // ensure active item is in view if we have scrolling
    const activeItem = this.visibleItems[this.activeItemIndex];
    const height = this.calculateSingleItemHeight(activeItem);
    const { offsetHeight, scrollTop } = this.listContainerEl;
    if (offsetHeight + scrollTop < activeItem.offsetTop + height) {
      this.listContainerEl.scrollTop = activeItem.offsetTop - offsetHeight + height;
    }
    else if (activeItem.offsetTop < scrollTop) {
      this.listContainerEl.scrollTop = activeItem.offsetTop;
    }
  }
  updateActiveItemIndex(index) {
    this.activeItemIndex = index;
    let activeDescendant = null;
    this.visibleItems.forEach((el, i) => {
      if (i === index) {
        el.active = true;
        activeDescendant = el.guid;
      }
      else {
        el.active = false;
      }
    });
    this.activeDescendant = activeDescendant;
    if (this.activeItemIndex > -1) {
      this.activeChipIndex = -1;
      this.textInput.focus();
    }
  }
  isMulti() {
    return this.selectionMode !== "single";
  }
  //--------------------------------------------------------------------------
  //
  //  Render Methods
  //
  //--------------------------------------------------------------------------
  renderChips() {
    const { activeChipIndex, scale, selectionMode, el } = this;
    const dir = getElementDir(el);
    return this.selectedItems.map((item, i) => {
      const chipClasses = {
        chip: true,
        "chip--active": activeChipIndex === i,
        "chip--rtl": dir === "rtl"
      };
      const ancestors = [...getItemAncestors(item)].reverse();
      const pathLabel = [...ancestors, item].map((el) => el.textLabel);
      const label = selectionMode !== "ancestors" ? item.textLabel : pathLabel.join(" / ");
      return (h("calcite-chip", { "aria-label": label, class: chipClasses, dismissLabel: "remove tag", dismissible: true, icon: item.icon, id: `chip-${item.guid}`, key: item.textLabel, onCalciteChipDismiss: (event) => this.calciteChipDismissHandler(event, item), scale: scale, title: label, value: item.value }, label));
    });
  }
  renderInput() {
    const { active, disabled, placeholder, selectionMode, needsIcon, label, selectedItems } = this;
    const single = selectionMode === "single";
    const selectedItem = selectedItems[0];
    const showLabel = !active && single && !!selectedItem;
    return (h("span", { class: {
        "input-wrap": true,
        "input-wrap--single": single
      } },
      showLabel && (h("span", { class: {
          label: true,
          "label--spaced": needsIcon
        }, key: "label", onFocus: this.comboboxFocusHandler, tabindex: "0" }, selectedItem.textLabel)),
      h("input", { "aria-activedescendant": this.activeDescendant, "aria-autocomplete": "list", "aria-controls": guid, "aria-label": label, class: {
          input: true,
          "input--transparent": this.activeChipIndex > -1,
          "input--single": single,
          "input--hidden": showLabel,
          "input--icon": single && needsIcon
        }, disabled: disabled, id: `${guid}-input`, key: "input", onBlur: this.comboboxBlurHandler, onFocus: this.comboboxFocusHandler, onInput: this.inputHandler, placeholder: placeholder, ref: (el) => (this.textInput = el), type: "text" })));
  }
  renderListBoxOptions() {
    return this.visibleItems.map((item) => (h("li", { "aria-selected": (!!item.selected).toString(), id: item.guid, role: "option", tabindex: "-1" }, item.textLabel)));
  }
  renderPopperContainer() {
    const { active, maxScrollerHeight, setMenuEl, setListContainerEl, hideList, open } = this;
    const classes = {
      "list-container": true,
      [PopperCSS.animation]: true,
      [PopperCSS.animationActive]: active
    };
    const style = {
      maxHeight: maxScrollerHeight > 0 ? `${maxScrollerHeight}px` : ""
    };
    return (h("div", { "aria-hidden": "true", class: { "popper-container": true, "popper-container--active": open }, ref: setMenuEl },
      h("div", { class: classes, onTransitionEnd: this.transitionEnd, ref: setListContainerEl, style: style },
        h("ul", { class: { list: true, "list--hide": hideList } },
          h("slot", null)))));
  }
  renderIconStart() {
    const { selectionMode, needsIcon, selectedItems } = this;
    const selectedItem = selectedItems[0];
    return (selectionMode === "single" &&
      needsIcon && (h("span", { class: "icon-start" }, (selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.icon) && (h("calcite-icon", { class: "selected-icon", icon: selectedItem.icon, scale: "s" })))));
  }
  renderIconEnd() {
    return (this.selectionMode === "single" && (h("span", { class: "icon-end" },
      h("calcite-icon", { icon: "chevron-down", scale: "s" }))));
  }
  render() {
    const { guid, open, label } = this;
    const single = this.selectionMode === "single";
    const labelId = `${guid}-label`;
    return (h(Host, { onKeyDown: this.keydownHandler },
      h("div", { "aria-autocomplete": "list", "aria-expanded": open.toString(), "aria-haspopup": "listbox", "aria-labelledby": labelId, "aria-owns": guid, class: {
          wrapper: true,
          "wrapper--active": open,
          "wrapper--single": single
        }, onClick: this.setFocusClick, ref: this.setReferenceEl, role: "combobox" },
        this.renderIconStart(),
        !single && this.renderChips(),
        h("label", { class: "screen-readers-only", htmlFor: `${guid}-input`, id: labelId }, label),
        this.renderInput(),
        this.renderIconEnd()),
      h("ul", { "aria-labelledby": labelId, "aria-multiselectable": "true", class: "screen-readers-only", id: guid, role: "listbox", tabIndex: -1 }, this.renderListBoxOptions()),
      this.renderPopperContainer()));
  }
  static get is() { return "calcite-combobox"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["calcite-combobox.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["calcite-combobox.css"]
  }; }
  static get properties() { return {
    "active": {
      "type": "boolean",
      "mutable": true,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Open and close combobox"
      },
      "attribute": "active",
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
        "text": "Disable combobox input"
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
      "required": true,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Aria label for combobox (required)"
      },
      "attribute": "label",
      "reflect": false
    },
    "placeholder": {
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
        "text": "Placeholder text for input"
      },
      "attribute": "placeholder",
      "reflect": false
    },
    "maxItems": {
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
        "text": "Specify the maximum number of combobox items (including nested children) to display before showing the scroller"
      },
      "attribute": "max-items",
      "reflect": false,
      "defaultValue": "0"
    },
    "allowCustomValues": {
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
        "text": "Allow entry of custom values which are not in the original set of items"
      },
      "attribute": "allow-custom-values",
      "reflect": false
    },
    "overlayPositioning": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "OverlayPositioning",
        "resolved": "\"absolute\" | \"fixed\"",
        "references": {
          "OverlayPositioning": {
            "location": "import",
            "path": "../../utils/popper"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Describes the type of positioning to use for the overlaid content. If your element is in a fixed container, use the 'fixed' value."
      },
      "attribute": "overlay-positioning",
      "reflect": false,
      "defaultValue": "\"absolute\""
    },
    "selectionMode": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "ComboboxSelectionMode",
        "resolved": "\"ancestors\" | \"multi\" | \"single\"",
        "references": {
          "ComboboxSelectionMode": {
            "location": "import",
            "path": "./interfaces"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "specify the selection mode\n- multi: allow any number of selected items (default)\n- single: only one selection)\n- ancestors: like multi, but show ancestors of selected items as selected, only deepest children shown in chips"
      },
      "attribute": "selection-mode",
      "reflect": true,
      "defaultValue": "\"multi\""
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
        "text": "Specify the scale of the combobox, defaults to m"
      },
      "attribute": "scale",
      "reflect": true,
      "defaultValue": "\"m\""
    }
  }; }
  static get states() { return {
    "items": {},
    "groupItems": {},
    "selectedItems": {},
    "visibleItems": {},
    "needsIcon": {},
    "hideList": {},
    "activeItemIndex": {},
    "activeChipIndex": {},
    "activeDescendant": {},
    "text": {},
    "open": {},
    "maxScrollerHeight": {}
  }; }
  static get events() { return [{
      "method": "calciteLookupChange",
      "name": "calciteLookupChange",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [{
            "text": "use calciteComboboxChange instead",
            "name": "deprecated"
          }],
        "text": "Called when the selected items set changes"
      },
      "complexType": {
        "original": "HTMLCalciteComboboxItemElement[]",
        "resolved": "HTMLCalciteComboboxItemElement[]",
        "references": {
          "HTMLCalciteComboboxItemElement": {
            "location": "global"
          }
        }
      }
    }, {
      "method": "calciteComboboxChange",
      "name": "calciteComboboxChange",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Called when the selected item(s) changes."
      },
      "complexType": {
        "original": "{ selectedItems: HTMLCalciteComboboxItemElement[] }",
        "resolved": "{ selectedItems: HTMLCalciteComboboxItemElement[]; }",
        "references": {
          "HTMLCalciteComboboxItemElement": {
            "location": "global"
          }
        }
      }
    }, {
      "method": "calciteComboboxFilterChange",
      "name": "calciteComboboxFilterChange",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Called when the user has entered text to filter the options list"
      },
      "complexType": {
        "original": "{\n    visibleItems: HTMLCalciteComboboxItemElement[];\n    text: string;\n  }",
        "resolved": "{ visibleItems: HTMLCalciteComboboxItemElement[]; text: string; }",
        "references": {
          "HTMLCalciteComboboxItemElement": {
            "location": "global"
          }
        }
      }
    }, {
      "method": "calciteComboboxChipDismiss",
      "name": "calciteComboboxChipDismiss",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Called when a selected item in the combobox is dismissed via its chip *"
      },
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      }
    }, {
      "method": "calciteComboboxOpen",
      "name": "calciteComboboxOpen",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [{
            "text": undefined,
            "name": "internal"
          }],
        "text": "Fired when the combobox is opened"
      },
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      }
    }, {
      "method": "calciteComboboxClose",
      "name": "calciteComboboxClose",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [{
            "text": undefined,
            "name": "internal"
          }],
        "text": "Fired when the combobox is closed"
      },
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      }
    }]; }
  static get methods() { return {
    "reposition": {
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
    },
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
      "propName": "active",
      "methodName": "activeHandler"
    }, {
      "propName": "maxItems",
      "methodName": "maxItemsHandler"
    }, {
      "propName": "text",
      "methodName": "textHandler"
    }]; }
  static get listeners() { return [{
      "name": "click",
      "method": "documentClickHandler",
      "target": "document",
      "capture": false,
      "passive": false
    }, {
      "name": "calciteComboboxItemChange",
      "method": "calciteComboboxItemChangeHandler",
      "target": undefined,
      "capture": false,
      "passive": false
    }]; }
}
