import { Component, Element, Event, h, Host, Listen, Method, Prop, State, Watch } from "@stencil/core";
import { getElementDir, setRequestedIcon } from "../../utils/dom";
import { DURATIONS, SLOTS, TEXT } from "./calcite-alert.resources";
import { StatusIcons } from "./interfaces";
import { CSS_UTILITY } from "../../utils/resources";
/** Alerts are meant to provide a way to communicate urgent or important information to users, frequently as a result of an action they took in your app. Alerts are positioned
 * at the bottom of the page. Multiple opened alerts will be added to a queue, allowing users to dismiss them in the order they are provided.
 */
/**
 * @slot title - Title of the alert (optional)
 * @slot message - Main text of the alert
 * @slot link - Optional action to take from the alert (undo, try again, link to page, etc.)
 */
export class CalciteAlert {
  constructor() {
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //---------------------------------------------------------------------------
    /** Is the alert currently active or not */
    this.active = false;
    /** Close the alert automatically (recommended for passive, non-blocking alerts) */
    this.autoDismiss = false;
    /** Duration of autoDismiss (only used with `autoDismiss`) */
    this.autoDismissDuration = this.autoDismiss ? "medium" : null;
    /** Color for the alert (will apply to top border and icon) */
    this.color = "blue";
    /** string to override English close text
     * @default "close"
     */
    this.intlClose = TEXT.intlClose;
    /** specify the scale of the button, defaults to m */
    this.scale = "m";
    //--------------------------------------------------------------------------
    //
    //  Private State/Props
    //
    //--------------------------------------------------------------------------
    /** the list of queued alerts */
    this.queue = [];
    /** the count of queued alerts */
    this.queueLength = 0;
    /** is the alert queued */
    this.queued = false;
    /** close and emit the closed alert and the queue */
    this.closeAlert = () => {
      this.queued = false;
      this.active = false;
      this.queue = this.queue.filter((e) => e !== this.el);
      this.determineActiveAlert();
      this.calciteAlertSync.emit({ queue: this.queue });
      this.calciteAlertClose.emit({
        el: this.el,
        queue: this.queue
      });
    };
  }
  watchActive() {
    if (this.active && !this.queued) {
      this.calciteAlertRegister.emit();
    }
    if (!this.active) {
      this.queue = this.queue.filter((e) => e !== this.el);
      this.calciteAlertSync.emit({ queue: this.queue });
    }
  }
  updateRequestedIcon() {
    this.requestedIcon = setRequestedIcon(StatusIcons, this.icon, this.color);
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    if (this.active && !this.queued) {
      this.calciteAlertRegister.emit();
    }
  }
  componentWillLoad() {
    this.requestedIcon = setRequestedIcon(StatusIcons, this.icon, this.color);
  }
  componentDidLoad() {
    this.alertLinkEl = this.el.querySelectorAll("calcite-link")[0];
  }
  render() {
    const dir = getElementDir(this.el);
    const closeButton = (h("button", { "aria-label": this.intlClose, class: "alert-close", onClick: this.closeAlert, ref: (el) => (this.closeButton = el), type: "button" },
      h("calcite-icon", { icon: "x", scale: this.scale === "l" ? "m" : "s" })));
    const queueText = `+${this.queueLength > 2 ? this.queueLength - 1 : 1}`;
    const queueCount = (h("div", { class: `${this.queueLength > 1 ? "active " : ""}alert-queue-count` },
      h("calcite-chip", { scale: this.scale, value: queueText }, queueText)));
    const { active, autoDismiss, label, queued, requestedIcon } = this;
    const progress = h("div", { class: "alert-dismiss-progress" });
    const role = autoDismiss ? "alert" : "alertdialog";
    const hidden = !active;
    return (h(Host, { "aria-hidden": hidden.toString(), "aria-label": label, "calcite-hydrated-hidden": hidden, role: role },
      h("div", { class: {
          container: true,
          queued,
          [CSS_UTILITY.rtl]: dir === "rtl"
        } },
        requestedIcon ? (h("div", { class: "alert-icon" },
          h("calcite-icon", { icon: requestedIcon, scale: this.scale === "l" ? "m" : "s" }))) : null,
        h("div", { class: "alert-content" },
          h("slot", { name: SLOTS.title }),
          h("slot", { name: SLOTS.message }),
          h("slot", { name: SLOTS.link })),
        queueCount,
        !autoDismiss ? closeButton : null,
        active && !queued && autoDismiss ? progress : null)));
  }
  // when an alert is opened or closed, update queue and determine active alert
  alertSync(event) {
    if (this.queue !== event.detail.queue) {
      this.queue = event.detail.queue;
    }
    this.queueLength = this.queue.length;
    this.determineActiveAlert();
  }
  // when an alert is first registered, trigger a queue sync to get queue
  alertRegister() {
    if (this.active && !this.queue.includes(this.el)) {
      this.queued = true;
      this.queue.push(this.el);
    }
    this.calciteAlertSync.emit({ queue: this.queue });
    this.determineActiveAlert();
  }
  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  /** focus either the slotted link or the close button */
  async setFocus() {
    if (!this.closeButton && !this.alertLinkEl) {
      return;
    }
    else if (this.alertLinkEl) {
      this.alertLinkEl.setFocus();
    }
    else if (this.closeButton) {
      this.closeButton.focus();
    }
  }
  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  /** determine which alert is active */
  determineActiveAlert() {
    var _a;
    if (((_a = this.queue) === null || _a === void 0 ? void 0 : _a[0]) === this.el) {
      this.openAlert();
      clearTimeout(this.autoDismissTimeout);
      if (this.autoDismiss) {
        this.autoDismissTimeout = window.setTimeout(() => this.closeAlert(), DURATIONS[this.autoDismissDuration]);
      }
    }
    else {
      return;
    }
  }
  /** emit the opened alert and the queue */
  openAlert() {
    clearTimeout(this.queueTimeout);
    this.queueTimeout = window.setTimeout(() => (this.queued = false), 300);
    this.calciteAlertOpen.emit({
      el: this.el,
      queue: this.queue
    });
  }
  static get is() { return "calcite-alert"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["calcite-alert.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["calcite-alert.css"]
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
        "text": "Is the alert currently active or not"
      },
      "attribute": "active",
      "reflect": true,
      "defaultValue": "false"
    },
    "autoDismiss": {
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
        "text": "Close the alert automatically (recommended for passive, non-blocking alerts)"
      },
      "attribute": "auto-dismiss",
      "reflect": false,
      "defaultValue": "false"
    },
    "autoDismissDuration": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "AlertDuration",
        "resolved": "\"fast\" | \"medium\" | \"slow\"",
        "references": {
          "AlertDuration": {
            "location": "import",
            "path": "./interfaces"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Duration of autoDismiss (only used with `autoDismiss`)"
      },
      "attribute": "auto-dismiss-duration",
      "reflect": true,
      "defaultValue": "this.autoDismiss ? \"medium\" : null"
    },
    "color": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "StatusColor",
        "resolved": "\"blue\" | \"green\" | \"red\" | \"yellow\"",
        "references": {
          "StatusColor": {
            "location": "import",
            "path": "./interfaces"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Color for the alert (will apply to top border and icon)"
      },
      "attribute": "color",
      "reflect": true,
      "defaultValue": "\"blue\""
    },
    "icon": {
      "type": "any",
      "mutable": false,
      "complexType": {
        "original": "string | boolean",
        "resolved": "boolean | string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "when used as a boolean set to true, show a default recommended icon. You can\nalso pass a calcite-ui-icon name to this prop to display a requested icon"
      },
      "attribute": "icon",
      "reflect": true
    },
    "intlClose": {
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
            "text": "\"close\"",
            "name": "default"
          }],
        "text": "string to override English close text"
      },
      "attribute": "intl-close",
      "reflect": false,
      "defaultValue": "TEXT.intlClose"
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
        "text": "Accessible name for the component"
      },
      "attribute": "label",
      "reflect": false
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
    }
  }; }
  static get states() { return {
    "queue": {},
    "queueLength": {},
    "queued": {},
    "requestedIcon": {}
  }; }
  static get events() { return [{
      "method": "calciteAlertClose",
      "name": "calciteAlertClose",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Fired when an alert is closed"
      },
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      }
    }, {
      "method": "calciteAlertOpen",
      "name": "calciteAlertOpen",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Fired when an alert is opened"
      },
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      }
    }, {
      "method": "calciteAlertSync",
      "name": "calciteAlertSync",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [{
            "text": undefined,
            "name": "internal"
          }],
        "text": "Fired to sync queue when opened or closed"
      },
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      }
    }, {
      "method": "calciteAlertRegister",
      "name": "calciteAlertRegister",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [{
            "text": undefined,
            "name": "internal"
          }],
        "text": "Fired when an alert is added to dom - used to receive initial queue"
      },
      "complexType": {
        "original": "any",
        "resolved": "any",
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
        "text": "focus either the slotted link or the close button",
        "tags": []
      }
    }
  }; }
  static get elementRef() { return "el"; }
  static get watchers() { return [{
      "propName": "active",
      "methodName": "watchActive"
    }, {
      "propName": "icon",
      "methodName": "updateRequestedIcon"
    }, {
      "propName": "color",
      "methodName": "updateRequestedIcon"
    }]; }
  static get listeners() { return [{
      "name": "calciteAlertSync",
      "method": "alertSync",
      "target": "window",
      "capture": false,
      "passive": false
    }, {
      "name": "calciteAlertRegister",
      "method": "alertRegister",
      "target": "window",
      "capture": false,
      "passive": false
    }]; }
}
