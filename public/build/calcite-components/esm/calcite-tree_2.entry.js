import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-b3673963.js';
import { f as focusElement, n as nodeListToArray, b as getSlotted, g as getElementDir, l as filterDirectChildren } from './dom-7b4de04f.js';
import { g as getKey } from './key-ec82f942.js';
import './guid-09142681.js';

var TreeSelectionMode;
(function (TreeSelectionMode) {
  TreeSelectionMode["Single"] = "single";
  TreeSelectionMode["Multi"] = "multi";
  TreeSelectionMode["Children"] = "children";
  TreeSelectionMode["MultiChildren"] = "multi-children";
  TreeSelectionMode["Ancestors"] = "ancestors";
})(TreeSelectionMode || (TreeSelectionMode = {}));

const calciteTreeCss = "@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:block;outline:2px solid transparent;outline-offset:2px}";

const CalciteTree = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteTreeSelect = createEvent(this, "calciteTreeSelect", 7);
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------
    /** Display indentation guide lines */
    this.lines = false;
    /** Display input */
    this.inputEnabled = false;
    /** Specify the scale of the tree, defaults to m */
    this.scale = "m";
    /** Customize how tree selection works (single, multi, children, multi-children)
     * @default "single"
     * @see [TreeSelectionMode](https://github.com/Esri/calcite-components/blob/master/src/components/calcite-tree/interfaces.ts#L5)
     */
    this.selectionMode = TreeSelectionMode.Single;
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  componentWillRender() {
    const parent = this.el.parentElement.closest("calcite-tree");
    this.lines = parent ? parent.lines : this.lines;
    this.scale = parent ? parent.scale : this.scale;
    this.inputEnabled = parent ? parent.inputEnabled : this.inputEnabled;
    this.selectionMode = parent ? parent.selectionMode : this.selectionMode;
    this.child = !!parent;
  }
  render() {
    return (h(Host, { "aria-multiselectable": this.selectionMode === TreeSelectionMode.Multi ||
        this.selectionMode === TreeSelectionMode.MultiChildren, role: !this.child ? "tree" : undefined, tabIndex: this.getRootTabIndex() }, h("slot", null)));
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  onFocus() {
    if (!this.child) {
      const focusTarget = this.el.querySelector("calcite-tree-item[selected]") ||
        this.el.querySelector("calcite-tree-item");
      focusElement(focusTarget);
    }
  }
  onFocusIn(event) {
    const focusedFromRootOrOutsideTree = event.relatedTarget === this.el || !this.el.contains(event.relatedTarget);
    if (focusedFromRootOrOutsideTree) {
      this.el.tabIndex = -1;
    }
  }
  onFocusOut(event) {
    const willFocusOutsideTree = !this.el.contains(event.relatedTarget);
    if (willFocusOutsideTree) {
      this.el.tabIndex = this.getRootTabIndex();
    }
  }
  onClick(e) {
    const target = e.target;
    const childItems = nodeListToArray(target.querySelectorAll("calcite-tree-item"));
    if (!this.child) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (this.selectionMode === TreeSelectionMode.Ancestors && !this.child) {
      this.updateAncestorTree(e);
      return;
    }
    const shouldSelect = this.selectionMode !== null &&
      (!target.hasChildren ||
        (target.hasChildren &&
          (this.selectionMode === TreeSelectionMode.Children ||
            this.selectionMode === TreeSelectionMode.MultiChildren)));
    const shouldModifyToCurrentSelection = e.detail.modifyCurrentSelection &&
      (this.selectionMode === TreeSelectionMode.Multi ||
        this.selectionMode === TreeSelectionMode.MultiChildren);
    const shouldSelectChildren = this.selectionMode === TreeSelectionMode.MultiChildren ||
      this.selectionMode === TreeSelectionMode.Children;
    const shouldClearCurrentSelection = !shouldModifyToCurrentSelection &&
      (((this.selectionMode === TreeSelectionMode.Single ||
        this.selectionMode === TreeSelectionMode.Multi) &&
        childItems.length <= 0) ||
        this.selectionMode === TreeSelectionMode.Children ||
        this.selectionMode === TreeSelectionMode.MultiChildren);
    const shouldExpandTarget = this.selectionMode === TreeSelectionMode.Children ||
      this.selectionMode === TreeSelectionMode.MultiChildren;
    if (!this.child) {
      const targetItems = [];
      if (shouldSelect) {
        targetItems.push(target);
      }
      if (shouldSelectChildren) {
        childItems.forEach((treeItem) => {
          targetItems.push(treeItem);
        });
      }
      if (shouldClearCurrentSelection) {
        const selectedItems = nodeListToArray(this.el.querySelectorAll("calcite-tree-item[selected]"));
        selectedItems.forEach((treeItem) => {
          if (!targetItems.includes(treeItem)) {
            treeItem.selected = false;
          }
        });
      }
      if (shouldExpandTarget && !e.detail.forceToggle) {
        target.expanded = true;
      }
      if (shouldModifyToCurrentSelection) {
        window.getSelection().removeAllRanges();
      }
      if ((shouldModifyToCurrentSelection && target.selected) ||
        (shouldSelectChildren && e.detail.forceToggle)) {
        targetItems.forEach((treeItem) => {
          treeItem.selected = false;
        });
      }
      else {
        targetItems.forEach((treeItem) => {
          treeItem.selected = true;
        });
      }
    }
    this.calciteTreeSelect.emit({
      selected: nodeListToArray(this.el.querySelectorAll("calcite-tree-item")).filter((i) => i.selected)
    });
  }
  updateAncestorTree(e) {
    const item = e.target;
    const children = item.querySelectorAll("calcite-tree-item");
    const ancestors = [];
    let parent = item.parentElement.closest("calcite-tree-item");
    while (parent) {
      ancestors.push(parent);
      parent = parent.parentElement.closest("calcite-tree-item");
    }
    item.selected = !item.selected;
    item.indeterminate = false;
    if (children === null || children === void 0 ? void 0 : children.length) {
      children.forEach((el) => {
        el.selected = item.selected;
        el.indeterminate = false;
      });
    }
    if (ancestors) {
      ancestors.forEach((ancestor) => {
        const descendants = nodeListToArray(ancestor.querySelectorAll("calcite-tree-item"));
        const activeDescendants = descendants.filter((el) => el.selected);
        if (activeDescendants.length === 0) {
          ancestor.selected = false;
          ancestor.indeterminate = false;
          return;
        }
        const indeterminate = activeDescendants.length < descendants.length;
        ancestor.indeterminate = indeterminate;
        ancestor.selected = !indeterminate;
      });
    }
    this.calciteTreeSelect.emit({
      selected: nodeListToArray(this.el.querySelectorAll("calcite-tree-item")).filter((i) => i.selected)
    });
  }
  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  getRootTabIndex() {
    return !this.child ? 0 : -1;
  }
  get el() { return getElement(this); }
};
CalciteTree.style = calciteTreeCss;

const calciteTreeItemCss = "@charset \"UTF-8\";@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:block;color:var(--calcite-tree-text);cursor:pointer;outline:none;font-size:0.875rem;line-height:1.5;max-width:100%;--calcite-tree-text:var(--calcite-ui-text-2);--calcite-tree-text:var(--calcite-ui-text-1);--calcite-tree-text:var(--calcite-ui-text-1);--calcite-tree-chevron:var(--calcite-ui-border-1);--calcite-tree-chevron-hover:var(--calcite-ui-text-3);--calcite-tree-vertical-padding:0.375rem;--calcite-tree-indicator:var(--calcite-ui-border-1);--calcite-tree-indicator-active:var(--calcite-ui-brand);--calcite-tree-indicator-first-start:0.1rem;--calcite-tree-indicator-first-end:auto;--calcite-tree-indicator-distance-start:0.15rem;--calcite-tree-indicator-distance-end:auto;--calcite-tree-icon-edge-distance-start:-0.2rem;--calcite-tree-icon-edge-distance-end:0;--calcite-tree-icon-content-distance-start:0.375rem;--calcite-tree-icon-content-distance-end:0;--calcite-tree-indent-start:1.4rem;--calcite-tree-indent-end:0;--calcite-tree-children-indent-start:0.25rem;--calcite-tree-children-indent-end:0;--calcite-tree-children-padding-start:1rem;--calcite-tree-children-padding-end:0;--calcite-tree-checkbox-padding-start:0;--calcite-tree-checkbox-padding-end:0.5rem;--calcite-tree-line-position-start:0.05rem;--calcite-tree-line-position-end:0;--calcite-tree-parent-line-position-start:-0.95rem;--calcite-tree-parent-line-position-end:0;--calcite-tree-line-width:1px;--calcite-tree-hover-line-width:3px}:host([lines]){--calcite-tree-line:var(--calcite-ui-border-3);--calcite-tree-line-hover:var(--calcite-ui-border-1)}:host([lines]) .calcite-tree-node:before{display:none}:host(:not([lines])) .calcite-tree-node:after{display:none}:host([scale=s]){--calcite-tree-hover-line-width:2px;--calcite-tree-vertical-padding:0.1875rem;--calcite-tree-children-indent-start:0rem;--calcite-tree-children-padding-start:0.8rem;--calcite-tree-line-position-start:0.3rem;--calcite-tree-parent-line-position-start:-0.5rem}:host([dir=rtl]){--calcite-tree-indicator-first-start:0;--calcite-tree-indicator-first-end:0.1rem;--calcite-tree-indicator-distance-start:auto;--calcite-tree-indicator-distance-end:0.15rem;--calcite-tree-icon-edge-distance-start:auto;--calcite-tree-icon-edge-distance-end:-0.2rem;--calcite-tree-icon-content-distance-start:0;--calcite-tree-icon-content-distance-end:0.375rem;--calcite-tree-indent-start:0;--calcite-tree-indent-end:1.4rem;--calcite-tree-children-indent-start:0;--calcite-tree-children-indent-end:0.25rem;--calcite-tree-children-padding-start:0;--calcite-tree-children-padding-end:1rem;--calcite-tree-checkbox-padding-start:0.5rem;--calcite-tree-checkbox-padding-end:0;--calcite-tree-line-position-start:0;--calcite-tree-line-position-end:0.05rem;--calcite-tree-parent-line-position-start:0;--calcite-tree-parent-line-position-end:-0.95rem}:host([dir=rtl][scale=s]){--calcite-tree-children-indent-end:0rem;--calcite-tree-children-padding-end:0.8rem;--calcite-tree-line-position-end:0.3rem;--calcite-tree-parent-line-position-end:-0.5rem}::slotted(*){color:inherit;font-size:0.875rem;line-height:1.5;text-decoration:none !important;word-wrap:break-word;overflow-wrap:break-word;min-width:0;max-width:100%}::slotted(*):hover{text-decoration:none !important}::slotted(a){width:100%;text-decoration:none}:host{outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}:host(:focus){outline:2px solid var(--calcite-ui-brand);outline-offset:-2px}.calcite-tree-checkbox{line-height:0;padding-left:var(--calcite-tree-checkbox-padding-start);padding-right:var(--calcite-tree-checkbox-padding-end);outline:none}.calcite-tree-label{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;pointer-events:none}.calcite-tree-children{z-index:1;margin-left:var(--calcite-tree-children-indent-start);margin-right:var(--calcite-tree-children-indent-end);padding-left:var(--calcite-tree-children-padding-start);padding-right:var(--calcite-tree-children-padding-end);position:relative;-webkit-transform:scaleY(0);transform:scaleY(0);opacity:0;overflow:hidden;-webkit-transition:0.15s cubic-bezier(0.215, 0.44, 0.42, 0.88), opacity 0.15s cubic-bezier(0.215, 0.44, 0.42, 0.88), all 0.15s ease-in-out;transition:0.15s cubic-bezier(0.215, 0.44, 0.42, 0.88), opacity 0.15s cubic-bezier(0.215, 0.44, 0.42, 0.88), all 0.15s ease-in-out;height:0;-webkit-transform-origin:top;transform-origin:top}.calcite-tree-children:after{-webkit-transition:all 150ms ease-in-out;transition:all 150ms ease-in-out;content:\"\";height:100%;width:var(--calcite-tree-line-width);background:var(--calcite-tree-line);left:var(--calcite-tree-line-position-start);right:var(--calcite-tree-line-position-end);top:0;position:absolute}:host([expanded])>.calcite-tree-children{-webkit-transform:scaleY(1);transform:scaleY(1);opacity:1;height:auto}:host([has-children]) .calcite-tree-children:hover:after,:host([has-children]) .calcite-tree-children:focus:after{background:var(--calcite-tree-line-hover)}.calcite-tree-node{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;padding:var(--calcite-tree-vertical-padding) 0;padding-left:var(--calcite-tree-indent-start);padding-right:var(--calcite-tree-indent-end);position:relative}.calcite-tree-node:before{content:\"???\";position:absolute;left:var(--calcite-tree-indicator-distance-start);right:var(--calcite-tree-indicator-distance-end);opacity:0;color:var(--calcite-tree-indicator);-webkit-transition:all 150ms ease-in-out;transition:all 150ms ease-in-out}.calcite-tree-node:after{-webkit-transition:all 150ms ease-in-out;transition:all 150ms ease-in-out;content:\"\";height:100%;width:var(--calcite-tree-line-width);background:var(--calcite-tree-line);left:var(--calcite-tree-parent-line-position-start);right:var(--calcite-tree-parent-line-position-end);top:0;position:absolute}:host([depth=\"1\"])>.calcite-tree-node:after{display:none}:host([input-enabled]) .calcite-tree-node:before{display:none}:host([has-children])>.calcite-tree-node{padding-left:0;padding-right:0}:host([has-children])>.calcite-tree-node:before{display:none}:host([depth=\"1\"])>.calcite-tree-node:before,:host([depth=\"1\"])>.calcite-tree-children:before{left:var(--calcite-tree-indicator-first-start);right:var(--calcite-tree-indicator-first-end)}.calcite-tree-node:hover:before,:host([selected]) .calcite-tree-node:hover:before,:host(:focus) .calcite-tree-node:before{opacity:1}.calcite-tree-node:hover:after,:host([selected]) .calcite-tree-node:hover:after,:host(:focus) .calcite-tree-node:after{width:var(--calcite-tree-hover-line-width);background:var(--calcite-tree-line-hover);z-index:2}.calcite-tree-node:hover ::slotted(*),:host([selected]) .calcite-tree-node:hover ::slotted(*),:host(:focus) .calcite-tree-node ::slotted(*){color:var(--calcite-tree-text-hover)}.calcite-tree-node:hover .calcite-tree-chevron,:host([selected]) .calcite-tree-node:hover .calcite-tree-chevron,:host(:focus) .calcite-tree-node .calcite-tree-chevron{fill:var(--calcite-tree-chevron-hover)}.calcite-tree-node:hover .calcite-tree-indicator,:host([selected]) .calcite-tree-node:hover .calcite-tree-indicator,:host(:focus) .calcite-tree-node .calcite-tree-indicator{fill:var(--calcite-tree-indicator-hover)}:host([selected])>.calcite-tree-node,:host([selected])>.calcite-tree-node:hover{color:var(--calcite-tree-text-active);font-weight:500}:host([selected])>.calcite-tree-node:before,:host([selected])>.calcite-tree-node:hover:before{opacity:1;color:var(--calcite-tree-indicator-active)}:host([selected])>.calcite-tree-node:after,:host([selected])>.calcite-tree-node:hover:after{background:var(--calcite-ui-brand);width:var(--calcite-tree-hover-line-width);z-index:2}:host([selected])>.calcite-tree-node ::slotted(*),:host([selected])>.calcite-tree-node:hover ::slotted(*){color:var(--calcite-tree-text-active)}:host([has-children][expanded])>.calcite-tree-node{color:var(--calcite-tree-text-active);font-weight:500}:host([has-children][expanded])>.calcite-tree-node:after{background:var(--calcite-ui-brand)}:host([has-children][expanded])>.calcite-tree-node:before{opacity:1;color:var(--calcite-tree-indicator-active)}:host([has-children][expanded])>.calcite-tree-node ::slotted(*){color:var(--calcite-tree-text-active)}:host([has-children][expanded][selected])>.calcite-tree-node:after{background:var(--calcite-ui-brand);width:var(--calcite-tree-hover-line-width);z-index:2}.calcite-tree-chevron{-webkit-transition:all 150ms ease-in-out;transition:all 150ms ease-in-out;-ms-flex:0 0 auto;flex:0 0 auto;position:relative;-ms-flex-item-align:center;align-self:center;left:var(--calcite-tree-icon-edge-distance-start);right:var(--calcite-tree-icon-edge-distance-end);margin-right:var(--calcite-tree-icon-content-distance-start);margin-left:var(--calcite-tree-icon-content-distance-end);-webkit-transform:rotate(0deg);transform:rotate(0deg);fill:var(--calcite-tree-chevron)}:host([dir=rtl]) .calcite-tree-chevron{-webkit-transform:rotate(180deg);transform:rotate(180deg)}:host(:hover) .calcite-tree-chevron,:host(:focus) .calcite-tree-chevron{fill:var(--calcite-tree-chevron-hover);stroke:var(--calcite-tree-chevron-hover);stroke-width:0.75}:host([expanded])>.calcite-tree-node>.calcite-tree-chevron{-webkit-transform:rotate(90deg);transform:rotate(90deg);fill:var(--calcite-ui-brand);stroke-width:0.75;stroke:var(--calcite-ui-brand)}";

const CalciteTreeItem = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteTreeItemSelect = createEvent(this, "calciteTreeItemSelect", 7);
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------
    /** Is the item currently selected */
    this.selected = false;
    /** True if the item is in an expanded state */
    this.expanded = false;
    /** @internal Is the parent of this item expanded? */
    this.parentExpanded = false;
    /** @internal What level of depth is this item at? */
    this.depth = -1;
    /** @internal Does this tree item have a tree inside it? */
    this.hasChildren = null;
    this.iconClickHandler = (event) => {
      event.stopPropagation();
      this.expanded = !this.expanded;
      if (!this.inputEnabled) {
        this.calciteTreeItemSelect.emit({
          modifyCurrentSelection: event.shiftKey,
          forceToggle: true
        });
      }
    };
    this.childrenClickHandler = (event) => event.stopPropagation();
  }
  expandedHandler(newValue) {
    const items = getSlotted(this.el, "children", {
      all: true,
      selector: "calcite-tree-item"
    });
    items.forEach((item) => (item.parentExpanded = newValue));
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    this.expandedHandler(this.expanded);
  }
  componentWillRender() {
    this.hasChildren = !!this.el.querySelector("calcite-tree");
    this.depth = 0;
    this.el.dir = getElementDir(this.el);
    let parentTree = this.el.closest("calcite-tree");
    if (!parentTree) {
      return;
    }
    this.selectionMode = parentTree.selectionMode;
    this.scale = parentTree.scale || "m";
    this.lines = parentTree.lines;
    this.inputEnabled = parentTree.inputEnabled;
    let nextParentTree;
    while (parentTree) {
      nextParentTree = parentTree.parentElement.closest("calcite-tree");
      if (nextParentTree === parentTree) {
        break;
      }
      else {
        parentTree = nextParentTree;
        this.depth = this.depth + 1;
      }
    }
  }
  render() {
    const icon = this.hasChildren ? (h("calcite-icon", { class: "calcite-tree-chevron", "data-test-id": "icon", icon: "chevron-right", onClick: this.iconClickHandler, scale: "s" })) : null;
    const checkbox = this.inputEnabled ? (h("label", { class: "calcite-tree-label" }, h("calcite-checkbox", { checked: this.selected, class: "calcite-tree-checkbox", "data-test-id": "checkbox", indeterminate: this.hasChildren && this.indeterminate, scale: this.scale, tabIndex: -1 }), h("slot", null))) : null;
    const hidden = !(this.parentExpanded || this.depth === 1);
    return (h(Host, { "aria-expanded": this.hasChildren ? this.expanded.toString() : undefined, "aria-hidden": hidden.toString(), "aria-selected": this.selected
        ? "true"
        : this.selectionMode === TreeSelectionMode.Multi ||
          this.selectionMode === TreeSelectionMode.MultiChildren
          ? "false"
          : undefined, "calcite-hydrated-hidden": hidden, role: "treeitem", tabindex: this.parentExpanded || this.depth === 1 ? "0" : "-1" }, h("div", { class: "calcite-tree-node", ref: (el) => (this.defaultSlotWrapper = el) }, icon, checkbox ? checkbox : h("slot", null)), h("div", { class: "calcite-tree-children", "data-test-id": "calcite-tree-children", onClick: this.childrenClickHandler, ref: (el) => (this.childrenSlotWrapper = el), role: this.hasChildren ? "group" : undefined }, h("slot", { name: "children" }))));
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  onClick(e) {
    // Solve for if the item is clicked somewhere outside the slotted anchor.
    // Anchor is triggered anywhere you click
    const [link] = filterDirectChildren(this.el, "a");
    if (link && e.composedPath()[0].tagName.toLowerCase() !== "a") {
      const target = link.target === "" ? "_self" : link.target;
      window.open(link.href, target);
    }
    this.expanded = !this.expanded;
    this.calciteTreeItemSelect.emit({
      modifyCurrentSelection: e.shiftKey || this.inputEnabled,
      forceToggle: false
    });
  }
  keyDownHandler(e) {
    let root;
    switch (getKey(e.key)) {
      case " ":
        this.calciteTreeItemSelect.emit({
          modifyCurrentSelection: e.shiftKey,
          forceToggle: false
        });
        e.preventDefault();
        e.stopPropagation();
        break;
      case "Enter":
        // activates a node, i.e., performs its default action. For parent nodes, one possible default action is to open or close the node. In single-select trees where selection does not follow focus (see note below), the default action is typically to select the focused node.
        const link = nodeListToArray(this.el.children).find((e) => e.matches("a"));
        if (link) {
          link.click();
          this.selected = true;
        }
        else {
          this.calciteTreeItemSelect.emit({
            modifyCurrentSelection: e.shiftKey,
            forceToggle: false
          });
        }
        e.preventDefault();
        e.stopPropagation();
        break;
      case "ArrowLeft":
        // When focus is on an open node, closes the node.
        if (this.hasChildren && this.expanded) {
          this.expanded = false;
          e.preventDefault();
          e.stopPropagation();
          break;
        }
        // When focus is on a child node that is also either an end node or a closed node, moves focus to its parent node.
        const parentItem = this.el.parentElement.closest("calcite-tree-item");
        if (parentItem && (!this.hasChildren || this.expanded === false)) {
          parentItem.focus();
          e.preventDefault();
          e.stopPropagation();
          break;
        }
        // When focus is on a root node that is also either an end node or a closed node, does nothing.
        break;
      case "ArrowRight":
        // When focus is on a closed node, opens the node; focus does not move.
        if (this.hasChildren && this.expanded === false) {
          this.expanded = true;
          e.preventDefault();
          e.stopPropagation();
          break;
        }
        // When focus is on a open node, moves focus to the first child node.
        if (this.hasChildren && this.expanded) {
          this.el.querySelector("calcite-tree-item").focus();
          break;
        }
        // When focus is on an end node, does nothing.
        break;
      case "ArrowUp":
        const previous = this.el.previousElementSibling;
        if (previous && previous.matches("calcite-tree-item")) {
          previous.focus();
        }
        break;
      case "ArrowDown":
        const next = this.el.nextElementSibling;
        if (next && next.matches("calcite-tree-item")) {
          next.focus();
        }
        break;
      case "Home":
        root = this.el.closest("calcite-tree:not([child])");
        const firstNode = root.querySelector("calcite-tree-item");
        firstNode.focus();
        break;
      case "End":
        root = this.el.closest("calcite-tree:not([child])");
        let currentNode = root.children[root.children.length - 1]; // last child
        let currentTree = nodeListToArray(currentNode.children).find((e) => e.matches("calcite-tree"));
        while (currentTree) {
          currentNode = currentTree.children[root.children.length - 1];
          currentTree = nodeListToArray(currentNode.children).find((e) => e.matches("calcite-tree"));
        }
        currentNode.focus();
        break;
    }
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "expanded": ["expandedHandler"]
  }; }
};
CalciteTreeItem.style = calciteTreeItemCss;

export { CalciteTree as calcite_tree, CalciteTreeItem as calcite_tree_item };
