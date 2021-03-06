import { Component, Element, Event, h, Host, Listen, Method, Prop, State, Watch } from "@stencil/core";
import { guid } from "../../utils/guid";
import { getKey } from "../../utils/key";
import { hasLabel, intersects } from "../../utils/dom";
import { clamp } from "../../utils/math";
export class CalciteSlider {
  constructor() {
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------
    /** Disable and gray out the slider */
    this.disabled = false;
    /** Indicates if a histogram is present */
    this.hasHistogram = false;
    /** Maximum selectable value */
    this.max = 100;
    /** Minimum selectable value */
    this.min = 0;
    /**
     * When true, the slider will display values from high to low.
     *
     * Note that this value will be ignored if the slider has an associated histogram.
     */
    this.mirrored = false;
    /** When true, enables snap selection along the step interval */
    this.snap = false;
    /** Interval to move on up/down keys */
    this.step = 1;
    /** Currently selected number (if single select) */
    this.value = null;
    //--------------------------------------------------------------------------
    //
    //  Private State/Props
    //
    //--------------------------------------------------------------------------
    this.guid = `calcite-slider-${guid()}`;
    this.isRange = false;
    this.activeProp = "value";
    this.minMaxValueRange = null;
    this.minValueDragRange = null;
    this.maxValueDragRange = null;
    this.tickValues = [];
    this.dragUpdate = (event) => {
      event.preventDefault();
      if (this.dragProp) {
        const value = this.translate(event.clientX || event.pageX);
        if (this.isRange && this.dragProp === "minMaxValue") {
          if (this.minValueDragRange && this.maxValueDragRange && this.minMaxValueRange) {
            const newMinValue = value - this.minValueDragRange;
            const newMaxValue = value + this.maxValueDragRange;
            if (newMaxValue <= this.max &&
              newMinValue >= this.min &&
              newMaxValue - newMinValue === this.minMaxValueRange) {
              this.minValue = this.clamp(newMinValue, "minValue");
              this.maxValue = this.clamp(newMaxValue, "maxValue");
            }
          }
          else {
            this.minValueDragRange = value - this.minValue;
            this.maxValueDragRange = this.maxValue - value;
            this.minMaxValueRange = this.maxValue - this.minValue;
          }
        }
        else {
          this[this.dragProp] = this.clamp(value, this.dragProp);
        }
        this.emitChange();
      }
    };
    this.dragEnd = () => {
      document.removeEventListener("pointermove", this.dragUpdate);
      document.removeEventListener("pointerup", this.dragEnd);
      document.removeEventListener("pointercancel", this.dragEnd);
      this.emitChange();
      this.focusActiveHandle();
      this.dragProp = null;
      this.minValueDragRange = null;
      this.maxValueDragRange = null;
      this.minMaxValueRange = null;
    };
  }
  histogramWatcher(newHistogram) {
    this.hasHistogram = !!newHistogram;
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  componentWillLoad() {
    this.isRange = !!(this.maxValue || this.maxValue === 0);
    this.tickValues = this.generateTickValues();
    this.value = this.clamp(this.value);
    if (this.snap) {
      this.value = this.getClosestStep(this.value);
    }
    if (this.histogram) {
      this.hasHistogram = true;
    }
    this.emitChange();
  }
  componentDidRender() {
    if (this.labelHandles) {
      this.adjustHostObscuredHandleLabel("value");
      if (this.isRange) {
        this.adjustHostObscuredHandleLabel("minValue");
        if (!(this.precise && this.isRange && !this.hasHistogram)) {
          this.hyphenateCollidingRangeHandleLabels();
        }
      }
    }
    this.hideObscuredBoundingTickLabels();
  }
  render() {
    const id = this.el.id || this.guid;
    const min = this.minValue || this.min;
    const max = this.maxValue || this.value;
    const maxProp = this.isRange ? "maxValue" : "value";
    const value = this[maxProp];
    const minInterval = this.getUnitInterval(min) * 100;
    const maxInterval = this.getUnitInterval(max) * 100;
    const mirror = this.shouldMirror();
    const leftThumbOffset = `${mirror ? 100 - minInterval : minInterval}%`;
    const rightThumbOffset = `${mirror ? maxInterval : 100 - maxInterval}%`;
    const handle = (h("button", { "aria-label": this.isRange ? this.maxLabel : this.minLabel, "aria-orientation": "horizontal", "aria-valuemax": this.max, "aria-valuemin": this.min, "aria-valuenow": value, class: {
        thumb: true,
        "thumb--value": true,
        "thumb--active": this.lastDragProp !== "minMaxValue" && this.dragProp === maxProp
      }, disabled: this.disabled, onBlur: () => (this.activeProp = null), onFocus: () => (this.activeProp = maxProp), onPointerDown: () => this.dragStart(maxProp), ref: (el) => (this.maxHandle = el), role: "slider", style: { right: rightThumbOffset } },
      h("div", { class: "handle" })));
    const labeledHandle = (h("button", { "aria-label": this.isRange ? this.maxLabel : this.minLabel, "aria-orientation": "horizontal", "aria-valuemax": this.max, "aria-valuemin": this.min, "aria-valuenow": value, class: {
        thumb: true,
        "thumb--value": true,
        "thumb--active": this.lastDragProp !== "minMaxValue" && this.dragProp === maxProp
      }, disabled: this.disabled, onBlur: () => (this.activeProp = null), onFocus: () => (this.activeProp = maxProp), onPointerDown: () => this.dragStart(maxProp), ref: (el) => (this.maxHandle = el), role: "slider", style: { right: rightThumbOffset } },
      h("span", { "aria-hidden": "true", class: "handle__label handle__label--value" }, value ? value.toLocaleString() : value),
      h("span", { "aria-hidden": "true", class: "handle__label handle__label--value static" }, value ? value.toLocaleString() : value),
      h("span", { "aria-hidden": "true", class: "handle__label handle__label--value transformed" }, value ? value.toLocaleString() : value),
      h("div", { class: "handle" })));
    const histogramLabeledHandle = (h("button", { "aria-label": this.isRange ? this.maxLabel : this.minLabel, "aria-orientation": "horizontal", "aria-valuemax": this.max, "aria-valuemin": this.min, "aria-valuenow": value, class: {
        thumb: true,
        "thumb--value": true,
        "thumb--active": this.lastDragProp !== "minMaxValue" && this.dragProp === maxProp
      }, disabled: this.disabled, onBlur: () => (this.activeProp = null), onFocus: () => (this.activeProp = maxProp), onPointerDown: () => this.dragStart(maxProp), ref: (el) => (this.maxHandle = el), role: "slider", style: { right: rightThumbOffset } },
      h("div", { class: "handle" }),
      h("span", { "aria-hidden": "true", class: "handle__label handle__label--value" }, value ? value.toLocaleString() : value),
      h("span", { "aria-hidden": "true", class: "handle__label handle__label--value static" }, value ? value.toLocaleString() : value),
      h("span", { "aria-hidden": "true", class: "handle__label handle__label--value transformed" }, value ? value.toLocaleString() : value)));
    const preciseHandle = (h("button", { "aria-label": this.isRange ? this.maxLabel : this.minLabel, "aria-orientation": "horizontal", "aria-valuemax": this.max, "aria-valuemin": this.min, "aria-valuenow": value, class: {
        thumb: true,
        "thumb--value": true,
        "thumb--active": this.lastDragProp !== "minMaxValue" && this.dragProp === maxProp,
        "thumb--precise": true
      }, disabled: this.disabled, onBlur: () => (this.activeProp = null), onFocus: () => (this.activeProp = maxProp), onPointerDown: () => this.dragStart(maxProp), ref: (el) => (this.maxHandle = el), role: "slider", style: { right: rightThumbOffset } },
      h("div", { class: "handle" }),
      h("div", { class: "handle-extension" })));
    const histogramPreciseHandle = (h("button", { "aria-label": this.isRange ? this.maxLabel : this.minLabel, "aria-orientation": "horizontal", "aria-valuemax": this.max, "aria-valuemin": this.min, "aria-valuenow": value, class: {
        thumb: true,
        "thumb--value": true,
        "thumb--active": this.lastDragProp !== "minMaxValue" && this.dragProp === maxProp,
        "thumb--precise": true
      }, disabled: this.disabled, onBlur: () => (this.activeProp = null), onFocus: () => (this.activeProp = maxProp), onPointerDown: () => this.dragStart(maxProp), ref: (el) => (this.maxHandle = el), role: "slider", style: { right: rightThumbOffset } },
      h("div", { class: "handle-extension" }),
      h("div", { class: "handle" })));
    const labeledPreciseHandle = (h("button", { "aria-label": this.isRange ? this.maxLabel : this.minLabel, "aria-orientation": "horizontal", "aria-valuemax": this.max, "aria-valuemin": this.min, "aria-valuenow": value, class: {
        thumb: true,
        "thumb--value": true,
        "thumb--active": this.lastDragProp !== "minMaxValue" && this.dragProp === maxProp,
        "thumb--precise": true
      }, disabled: this.disabled, onBlur: () => (this.activeProp = null), onFocus: () => (this.activeProp = maxProp), onPointerDown: () => this.dragStart(maxProp), ref: (el) => (this.maxHandle = el), role: "slider", style: { right: rightThumbOffset } },
      h("span", { "aria-hidden": "true", class: "handle__label handle__label--value" }, value ? value.toLocaleString() : value),
      h("span", { "aria-hidden": "true", class: "handle__label handle__label--value static" }, value ? value.toLocaleString() : value),
      h("span", { "aria-hidden": "true", class: "handle__label handle__label--value transformed" }, value ? value.toLocaleString() : value),
      h("div", { class: "handle" }),
      h("div", { class: "handle-extension" })));
    const histogramLabeledPreciseHandle = (h("button", { "aria-label": this.isRange ? this.maxLabel : this.minLabel, "aria-orientation": "horizontal", "aria-valuemax": this.max, "aria-valuemin": this.min, "aria-valuenow": value, class: {
        thumb: true,
        "thumb--value": true,
        "thumb--active": this.lastDragProp !== "minMaxValue" && this.dragProp === maxProp,
        "thumb--precise": true
      }, disabled: this.disabled, onBlur: () => (this.activeProp = null), onFocus: () => (this.activeProp = maxProp), onPointerDown: () => this.dragStart(maxProp), ref: (el) => (this.maxHandle = el), role: "slider", style: { right: rightThumbOffset } },
      h("div", { class: "handle-extension" }),
      h("div", { class: "handle" }),
      h("span", { "aria-hidden": "true", class: "handle__label handle__label--value" }, value ? value.toLocaleString() : value),
      h("span", { "aria-hidden": "true", class: "handle__label handle__label--value static" }, value ? value.toLocaleString() : value),
      h("span", { "aria-hidden": "true", class: "handle__label handle__label--value transformed" }, value ? value.toLocaleString() : value)));
    const minHandle = (h("button", { "aria-label": this.minLabel, "aria-orientation": "horizontal", "aria-valuemax": this.max, "aria-valuemin": this.min, "aria-valuenow": this.minValue, class: {
        thumb: true,
        "thumb--minValue": true,
        "thumb--active": this.dragProp === "minValue"
      }, disabled: this.disabled, onBlur: () => (this.activeProp = null), onFocus: () => (this.activeProp = "minValue"), onPointerDown: () => this.dragStart("minValue"), ref: (el) => (this.minHandle = el), role: "slider", style: { left: leftThumbOffset } },
      h("div", { class: "handle" })));
    const minLabeledHandle = (h("button", { "aria-label": this.minLabel, "aria-orientation": "horizontal", "aria-valuemax": this.max, "aria-valuemin": this.min, "aria-valuenow": this.minValue, class: {
        thumb: true,
        "thumb--minValue": true,
        "thumb--active": this.dragProp === "minValue"
      }, disabled: this.disabled, onBlur: () => (this.activeProp = null), onFocus: () => (this.activeProp = "minValue"), onPointerDown: () => this.dragStart("minValue"), ref: (el) => (this.minHandle = el), role: "slider", style: { left: leftThumbOffset } },
      h("span", { "aria-hidden": "true", class: "handle__label handle__label--minValue" }, this.minValue && this.minValue.toLocaleString()),
      h("span", { "aria-hidden": "true", class: "handle__label handle__label--minValue static" }, this.minValue && this.minValue.toLocaleString()),
      h("span", { "aria-hidden": "true", class: "handle__label handle__label--minValue transformed" }, this.minValue && this.minValue.toLocaleString()),
      h("div", { class: "handle" })));
    const minHistogramLabeledHandle = (h("button", { "aria-label": this.minLabel, "aria-orientation": "horizontal", "aria-valuemax": this.max, "aria-valuemin": this.min, "aria-valuenow": this.minValue, class: {
        thumb: true,
        "thumb--minValue": true,
        "thumb--active": this.dragProp === "minValue"
      }, disabled: this.disabled, onBlur: () => (this.activeProp = null), onFocus: () => (this.activeProp = "minValue"), onPointerDown: () => this.dragStart("minValue"), ref: (el) => (this.minHandle = el), role: "slider", style: { left: leftThumbOffset } },
      h("div", { class: "handle" }),
      h("span", { "aria-hidden": "true", class: "handle__label handle__label--minValue" }, this.minValue && this.minValue.toLocaleString()),
      h("span", { "aria-hidden": "true", class: "handle__label handle__label--minValue static" }, this.minValue && this.minValue.toLocaleString()),
      h("span", { "aria-hidden": "true", class: "handle__label handle__label--minValue transformed" }, this.minValue && this.minValue.toLocaleString())));
    const minPreciseHandle = (h("button", { "aria-label": this.minLabel, "aria-orientation": "horizontal", "aria-valuemax": this.max, "aria-valuemin": this.min, "aria-valuenow": this.minValue, class: {
        thumb: true,
        "thumb--minValue": true,
        "thumb--active": this.dragProp === "minValue",
        "thumb--precise": true
      }, disabled: this.disabled, onBlur: () => (this.activeProp = null), onFocus: () => (this.activeProp = "minValue"), onPointerDown: () => this.dragStart("minValue"), ref: (el) => (this.minHandle = el), role: "slider", style: { left: leftThumbOffset } },
      h("div", { class: "handle-extension" }),
      h("div", { class: "handle" })));
    const minLabeledPreciseHandle = (h("button", { "aria-label": this.minLabel, "aria-orientation": "horizontal", "aria-valuemax": this.max, "aria-valuemin": this.min, "aria-valuenow": this.minValue, class: {
        thumb: true,
        "thumb--minValue": true,
        "thumb--active": this.dragProp === "minValue",
        "thumb--precise": true
      }, disabled: this.disabled, onBlur: () => (this.activeProp = null), onFocus: () => (this.activeProp = "minValue"), onPointerDown: () => this.dragStart("minValue"), ref: (el) => (this.minHandle = el), role: "slider", style: { left: leftThumbOffset } },
      h("div", { class: "handle-extension" }),
      h("div", { class: "handle" }),
      h("span", { "aria-hidden": "true", class: "handle__label handle__label--minValue" }, this.minValue && this.minValue.toLocaleString()),
      h("span", { "aria-hidden": "true", class: "handle__label handle__label--minValue static" }, this.minValue && this.minValue.toLocaleString()),
      h("span", { "aria-hidden": "true", class: "handle__label handle__label--minValue transformed" }, this.minValue && this.minValue.toLocaleString())));
    return (h(Host, { id: id, onTouchStart: this.handleTouchStart },
      h("div", { class: { container: true, "container--range": this.isRange } },
        this.renderGraph(),
        h("div", { class: "track" },
          h("div", { class: "track__range", onPointerDown: () => this.dragStart("minMaxValue"), style: {
              left: `${mirror ? 100 - maxInterval : minInterval}%`,
              right: `${mirror ? minInterval : 100 - maxInterval}%`
            } }),
          h("div", { class: "ticks" }, this.tickValues.map((tick) => {
            const tickOffset = `${this.getUnitInterval(tick) * 100}%`;
            return (h("span", { class: {
                tick: true,
                "tick--active": tick >= min && tick <= max
              }, style: {
                left: mirror ? "" : tickOffset,
                right: mirror ? tickOffset : ""
              } }, this.renderTickLabel(tick)));
          }))),
        !this.precise && !this.labelHandles && this.isRange && minHandle,
        !this.hasHistogram &&
          !this.precise &&
          this.labelHandles &&
          this.isRange &&
          minLabeledHandle,
        this.precise && !this.labelHandles && this.isRange && minPreciseHandle,
        this.precise && this.labelHandles && this.isRange && minLabeledPreciseHandle,
        this.hasHistogram &&
          !this.precise &&
          this.labelHandles &&
          this.isRange &&
          minHistogramLabeledHandle,
        !this.precise && !this.labelHandles && handle,
        !this.hasHistogram && !this.precise && this.labelHandles && labeledHandle,
        !this.hasHistogram && this.precise && !this.labelHandles && preciseHandle,
        this.hasHistogram && this.precise && !this.labelHandles && histogramPreciseHandle,
        !this.hasHistogram && this.precise && this.labelHandles && labeledPreciseHandle,
        this.hasHistogram && !this.precise && this.labelHandles && histogramLabeledHandle,
        this.hasHistogram && this.precise && this.labelHandles && histogramLabeledPreciseHandle)));
  }
  renderGraph() {
    return this.histogram ? (h("div", { class: "graph" },
      h("calcite-graph", { colorStops: this.histogramStops, data: this.histogram, height: 48, highlightMax: this.isRange ? this.maxValue : this.value, highlightMin: this.isRange ? this.minValue : this.min, width: 300 }))) : null;
  }
  renderTickLabel(tick) {
    const isMinTickLabel = tick === this.min;
    const isMaxTickLabel = tick === this.max;
    const tickLabel = (h("span", { class: {
        tick__label: true,
        "tick__label--min": isMinTickLabel,
        "tick__label--max": isMaxTickLabel
      } }, tick.toLocaleString()));
    if (this.labelTicks && !this.hasHistogram && !this.isRange) {
      return tickLabel;
    }
    if (this.labelTicks &&
      !this.hasHistogram &&
      this.isRange &&
      !this.precise &&
      !this.labelHandles) {
      return tickLabel;
    }
    if (this.labelTicks &&
      !this.hasHistogram &&
      this.isRange &&
      !this.precise &&
      this.labelHandles) {
      return tickLabel;
    }
    if (this.labelTicks &&
      !this.hasHistogram &&
      this.isRange &&
      this.precise &&
      (isMinTickLabel || isMaxTickLabel)) {
      return tickLabel;
    }
    if (this.labelTicks && this.hasHistogram && !this.precise && !this.labelHandles) {
      return tickLabel;
    }
    if (this.labelTicks &&
      this.hasHistogram &&
      this.precise &&
      !this.labelHandles &&
      (isMinTickLabel || isMaxTickLabel)) {
      return tickLabel;
    }
    if (this.labelTicks &&
      this.hasHistogram &&
      !this.precise &&
      this.labelHandles &&
      (isMinTickLabel || isMaxTickLabel)) {
      return tickLabel;
    }
    if (this.labelTicks &&
      this.hasHistogram &&
      this.precise &&
      this.labelHandles &&
      (isMinTickLabel || isMaxTickLabel)) {
      return tickLabel;
    }
    return null;
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  handleLabelFocus(e) {
    if (e.detail.interactedEl !== this.el && hasLabel(e.detail.labelEl, this.el)) {
      this.setFocus();
    }
  }
  keyDownHandler(event) {
    const mirror = this.shouldMirror();
    const { activeProp, max, min, pageStep, step } = this;
    const value = this[activeProp];
    const key = getKey(event.key);
    if (key === "Enter" || key === " ") {
      event.preventDefault();
      return;
    }
    let adjustment;
    if (key === "ArrowUp" || key === "ArrowRight") {
      const directionFactor = mirror && key === "ArrowRight" ? -1 : 1;
      adjustment = value + step * directionFactor;
    }
    else if (key === "ArrowDown" || key === "ArrowLeft") {
      const directionFactor = mirror && key === "ArrowLeft" ? -1 : 1;
      adjustment = value - step * directionFactor;
    }
    else if (key === "PageUp") {
      if (pageStep) {
        adjustment = value + pageStep;
      }
    }
    else if (key === "PageDown") {
      if (pageStep) {
        adjustment = value - pageStep;
      }
    }
    else if (key === "Home") {
      adjustment = min;
    }
    else if (key === "End") {
      adjustment = max;
    }
    if (isNaN(adjustment)) {
      return;
    }
    event.preventDefault();
    this[activeProp] = this.clamp(adjustment, activeProp);
    this.emitChange();
  }
  clickHandler() {
    this.focusActiveHandle();
  }
  pointerDownHandler(event) {
    const x = event.clientX || event.pageX;
    const position = this.translate(x);
    let prop = "value";
    if (this.isRange) {
      const inRange = position >= this.minValue && position <= this.maxValue;
      if (inRange && this.lastDragProp === "minMaxValue") {
        prop = "minMaxValue";
      }
      else {
        const closerToMax = Math.abs(this.maxValue - position) < Math.abs(this.minValue - position);
        prop = closerToMax ? "maxValue" : "minValue";
      }
    }
    this[prop] = this.clamp(position, prop);
    this.dragStart(prop);
  }
  handleTouchStart(event) {
    // needed to prevent extra click at the end of a handle drag
    event.preventDefault();
  }
  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  async setFocus() {
    const handle = this.minHandle ? this.minHandle : this.maxHandle;
    handle.focus();
  }
  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  shouldMirror() {
    return this.mirrored && !this.hasHistogram;
  }
  generateTickValues() {
    const ticks = [];
    let current = this.min;
    while (this.ticks && current < this.max + this.ticks) {
      ticks.push(current);
      current = current + this.ticks;
    }
    return ticks;
  }
  dragStart(prop) {
    this.dragProp = prop;
    this.lastDragProp = this.dragProp;
    this.activeProp = prop;
    document.addEventListener("pointermove", this.dragUpdate);
    document.addEventListener("pointerup", this.dragEnd);
    document.addEventListener("pointercancel", this.dragEnd);
  }
  focusActiveHandle() {
    switch (this.dragProp) {
      default:
      case "maxValue":
        this.maxHandle.focus();
        break;
      case "minValue":
        this.minHandle.focus();
        break;
      case "minMaxValue":
        break;
    }
  }
  emitChange() {
    this.calciteSliderChange.emit();
    this.calciteSliderUpdate.emit();
  }
  /**
   * If number is outside range, constrain to min or max
   * @internal
   */
  clamp(value, prop) {
    value = clamp(value, this.min, this.max);
    // ensure that maxValue and minValue don't swap positions
    if (prop === "maxValue") {
      value = Math.max(value, this.minValue);
    }
    if (prop === "minValue") {
      value = Math.min(value, this.maxValue);
    }
    return value;
  }
  /**
   * Translate a pixel position to value along the range
   * @internal
   */
  translate(x) {
    const range = this.max - this.min;
    const { left, width } = this.el.getBoundingClientRect();
    const percent = (x - left) / width;
    const mirror = this.shouldMirror();
    let value = this.clamp(this.min + range * (mirror ? 1 - percent : percent));
    if (this.snap && this.step) {
      value = this.getClosestStep(value);
    }
    return value;
  }
  /**
   * Get closest allowed value along stepped values
   * @internal
   */
  getClosestStep(num) {
    num = this.clamp(num);
    if (this.step) {
      const step = Math.round(num / this.step) * this.step;
      num = this.clamp(step);
    }
    return num;
  }
  getFontSizeForElement(element) {
    return Number(window.getComputedStyle(element).getPropertyValue("font-size").match(/\d+/)[0]);
  }
  /**
   * Get position of value along range as fractional value
   * @return {number} number in the unit interval [0,1]
   * @internal
   */
  getUnitInterval(num) {
    num = this.clamp(num);
    const range = this.max - this.min;
    return (num - this.min) / range;
  }
  adjustHostObscuredHandleLabel(name) {
    const label = this.el.shadowRoot.querySelector(`.handle__label--${name}`);
    const labelStatic = this.el.shadowRoot.querySelector(`.handle__label--${name}.static`);
    const labelTransformed = this.el.shadowRoot.querySelector(`.handle__label--${name}.transformed`);
    const labelStaticBounds = labelStatic.getBoundingClientRect();
    const labelStaticOffset = this.getHostOffset(labelStaticBounds.left, labelStaticBounds.right);
    label.style.transform = `translateX(${labelStaticOffset}px)`;
    labelTransformed.style.transform = `translateX(${labelStaticOffset}px)`;
  }
  hyphenateCollidingRangeHandleLabels() {
    const { shadowRoot } = this.el;
    const mirror = this.shouldMirror();
    const leftModifier = mirror ? "value" : "minValue";
    const rightModifier = mirror ? "minValue" : "value";
    const leftValueLabel = shadowRoot.querySelector(`.handle__label--${leftModifier}`);
    const leftValueLabelStatic = shadowRoot.querySelector(`.handle__label--${leftModifier}.static`);
    const leftValueLabelTransformed = shadowRoot.querySelector(`.handle__label--${leftModifier}.transformed`);
    const leftValueLabelStaticHostOffset = this.getHostOffset(leftValueLabelStatic.getBoundingClientRect().left, leftValueLabelStatic.getBoundingClientRect().right);
    const rightValueLabel = shadowRoot.querySelector(`.handle__label--${rightModifier}`);
    const rightValueLabelStatic = shadowRoot.querySelector(`.handle__label--${rightModifier}.static`);
    const rightValueLabelTransformed = shadowRoot.querySelector(`.handle__label--${rightModifier}.transformed`);
    const rightValueLabelStaticHostOffset = this.getHostOffset(rightValueLabelStatic.getBoundingClientRect().left, rightValueLabelStatic.getBoundingClientRect().right);
    const labelFontSize = this.getFontSizeForElement(leftValueLabel);
    const labelTransformedOverlap = this.getRangeLabelOverlap(leftValueLabelTransformed, rightValueLabelTransformed);
    const hyphenLabel = leftValueLabel;
    const labelOffset = labelFontSize / 2;
    if (labelTransformedOverlap > 0) {
      hyphenLabel.classList.add("hyphen");
      if (rightValueLabelStaticHostOffset === 0 && leftValueLabelStaticHostOffset === 0) {
        // Neither handle overlaps the host boundary
        let leftValueLabelTranslate = labelTransformedOverlap / 2 - labelOffset;
        if (Math.sign(leftValueLabelTranslate) === -1) {
          leftValueLabelTranslate = Math.abs(leftValueLabelTranslate);
        }
        else {
          leftValueLabelTranslate = -leftValueLabelTranslate;
        }
        const leftValueLabelTransformedHostOffset = this.getHostOffset(leftValueLabelTransformed.getBoundingClientRect().left +
          leftValueLabelTranslate -
          labelOffset, leftValueLabelTransformed.getBoundingClientRect().right +
          leftValueLabelTranslate -
          labelOffset);
        let rightValueLabelTranslate = labelTransformedOverlap / 2;
        const rightValueLabelTransformedHostOffset = this.getHostOffset(rightValueLabelTransformed.getBoundingClientRect().left + rightValueLabelTranslate, rightValueLabelTransformed.getBoundingClientRect().right + rightValueLabelTranslate);
        if (leftValueLabelTransformedHostOffset !== 0) {
          leftValueLabelTranslate += leftValueLabelTransformedHostOffset;
          rightValueLabelTranslate += leftValueLabelTransformedHostOffset;
        }
        if (rightValueLabelTransformedHostOffset !== 0) {
          leftValueLabelTranslate += rightValueLabelTransformedHostOffset;
          rightValueLabelTranslate += rightValueLabelTransformedHostOffset;
        }
        leftValueLabel.style.transform = `translateX(${leftValueLabelTranslate}px)`;
        leftValueLabelTransformed.style.transform = `translateX(${leftValueLabelTranslate - labelOffset}px)`;
        rightValueLabel.style.transform = `translateX(${rightValueLabelTranslate}px)`;
        rightValueLabelTransformed.style.transform = `translateX(${rightValueLabelTranslate}px)`;
      }
      else if (leftValueLabelStaticHostOffset > 0 || rightValueLabelStaticHostOffset > 0) {
        // labels overlap host boundary on the left side
        leftValueLabel.style.transform = `translateX(${leftValueLabelStaticHostOffset + labelOffset}px)`;
        rightValueLabel.style.transform = `translateX(${labelTransformedOverlap + rightValueLabelStaticHostOffset}px)`;
        rightValueLabelTransformed.style.transform = `translateX(${labelTransformedOverlap + rightValueLabelStaticHostOffset}px)`;
      }
      else if (leftValueLabelStaticHostOffset < 0 || rightValueLabelStaticHostOffset < 0) {
        // labels overlap host boundary on the right side
        let leftValueLabelTranslate = Math.abs(leftValueLabelStaticHostOffset) + labelTransformedOverlap - labelOffset;
        if (Math.sign(leftValueLabelTranslate) === -1) {
          leftValueLabelTranslate = Math.abs(leftValueLabelTranslate);
        }
        else {
          leftValueLabelTranslate = -leftValueLabelTranslate;
        }
        leftValueLabel.style.transform = `translateX(${leftValueLabelTranslate}px)`;
        leftValueLabelTransformed.style.transform = `translateX(${leftValueLabelTranslate - labelOffset}px)`;
      }
    }
    else {
      hyphenLabel.classList.remove("hyphen");
      leftValueLabel.style.transform = `translateX(${leftValueLabelStaticHostOffset}px)`;
      leftValueLabelTransformed.style.transform = `translateX(${leftValueLabelStaticHostOffset}px)`;
      rightValueLabel.style.transform = `translateX(${rightValueLabelStaticHostOffset}px)`;
      rightValueLabelTransformed.style.transform = `translateX(${rightValueLabelStaticHostOffset}px)`;
    }
  }
  /**
   * Hides bounding tick labels that are obscured by either handle.
   */
  hideObscuredBoundingTickLabels() {
    if (!this.hasHistogram && !this.isRange && !this.labelHandles && !this.precise) {
      return;
    }
    if (!this.hasHistogram && !this.isRange && this.labelHandles && !this.precise) {
      return;
    }
    if (!this.hasHistogram && !this.isRange && !this.labelHandles && this.precise) {
      return;
    }
    if (!this.hasHistogram && !this.isRange && this.labelHandles && this.precise) {
      return;
    }
    if (!this.hasHistogram && this.isRange && !this.precise) {
      return;
    }
    if (this.hasHistogram && !this.precise && !this.labelHandles) {
      return;
    }
    const minHandle = this.el.shadowRoot.querySelector(".thumb--minValue");
    const maxHandle = this.el.shadowRoot.querySelector(".thumb--value");
    const minTickLabel = this.el.shadowRoot.querySelector(".tick__label--min");
    const maxTickLabel = this.el.shadowRoot.querySelector(".tick__label--max");
    if (!minHandle && maxHandle && minTickLabel && maxTickLabel) {
      if (this.isMinTickLabelObscured(minTickLabel, maxHandle)) {
        minTickLabel.style.opacity = "0";
      }
      else {
        minTickLabel.style.opacity = "1";
      }
      if (this.isMaxTickLabelObscured(maxTickLabel, maxHandle)) {
        maxTickLabel.style.opacity = "0";
      }
      else {
        maxTickLabel.style.opacity = "1";
      }
    }
    if (minHandle && maxHandle && minTickLabel && maxTickLabel) {
      if (this.isMinTickLabelObscured(minTickLabel, minHandle) ||
        this.isMinTickLabelObscured(minTickLabel, maxHandle)) {
        minTickLabel.style.opacity = "0";
      }
      else {
        minTickLabel.style.opacity = "1";
      }
      if (this.isMaxTickLabelObscured(maxTickLabel, minHandle) ||
        (this.isMaxTickLabelObscured(maxTickLabel, maxHandle) && this.hasHistogram)) {
        maxTickLabel.style.opacity = "0";
      }
      else {
        maxTickLabel.style.opacity = "1";
      }
    }
  }
  /**
   * Returns an integer representing the number of pixels to offset on the left or right side based on desired position behavior.
   * @internal
   */
  getHostOffset(leftBounds, rightBounds) {
    const hostBounds = this.el.getBoundingClientRect();
    const buffer = 7;
    if (leftBounds + buffer < hostBounds.left) {
      return hostBounds.left - leftBounds - buffer;
    }
    if (rightBounds - buffer > hostBounds.right) {
      return -(rightBounds - hostBounds.right) + buffer;
    }
    return 0;
  }
  /**
   * Returns an integer representing the number of pixels that the two given span elements are overlapping, taking into account
   * a space in between the two spans equal to the font-size set on them to account for the space needed to render a hyphen.
   * @param leftLabel
   * @param rightLabel
   */
  getRangeLabelOverlap(leftLabel, rightLabel) {
    const leftLabelBounds = leftLabel.getBoundingClientRect();
    const rightLabelBounds = rightLabel.getBoundingClientRect();
    const leftLabelFontSize = this.getFontSizeForElement(leftLabel);
    const rangeLabelOverlap = leftLabelBounds.right + leftLabelFontSize - rightLabelBounds.left;
    return Math.max(rangeLabelOverlap, 0);
  }
  /**
   * Returns a boolean value representing if the minLabel span element is obscured (being overlapped) by the given handle button element.
   * @param minLabel
   * @param handle
   */
  isMinTickLabelObscured(minLabel, handle) {
    const minLabelBounds = minLabel.getBoundingClientRect();
    const handleBounds = handle.getBoundingClientRect();
    return intersects(minLabelBounds, handleBounds);
  }
  /**
   * Returns a boolean value representing if the maxLabel span element is obscured (being overlapped) by the given handle button element.
   * @param maxLabel
   * @param handle
   */
  isMaxTickLabelObscured(maxLabel, handle) {
    const maxLabelBounds = maxLabel.getBoundingClientRect();
    const handleBounds = handle.getBoundingClientRect();
    return intersects(maxLabelBounds, handleBounds);
  }
  static get is() { return "calcite-slider"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["calcite-slider.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["calcite-slider.css"]
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
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Disable and gray out the slider"
      },
      "attribute": "disabled",
      "reflect": true,
      "defaultValue": "false"
    },
    "hasHistogram": {
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
        "text": "Indicates if a histogram is present"
      },
      "attribute": "has-histogram",
      "reflect": true,
      "defaultValue": "false"
    },
    "histogram": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "DataSeries",
        "resolved": "Point[]",
        "references": {
          "DataSeries": {
            "location": "import",
            "path": "../calcite-graph/interfaces"
          }
        }
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "Display a histogram above the slider"
      }
    },
    "histogramStops": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "ColorStop[]",
        "resolved": "ColorStop[]",
        "references": {
          "ColorStop": {
            "location": "import",
            "path": "../calcite-graph/interfaces"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Array of values describing a single color stop, sorted by offset ascending."
      }
    },
    "labelHandles": {
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
        "text": "Label handles with their numeric value"
      },
      "attribute": "label-handles",
      "reflect": true
    },
    "labelTicks": {
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
        "text": "Label tick marks with their numeric value."
      },
      "attribute": "label-ticks",
      "reflect": true
    },
    "max": {
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
        "text": "Maximum selectable value"
      },
      "attribute": "max",
      "reflect": true,
      "defaultValue": "100"
    },
    "maxLabel": {
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
        "text": "Label for second handle if needed (ex. \"Temperature, upper bound\")"
      },
      "attribute": "max-label",
      "reflect": false
    },
    "maxValue": {
      "type": "number",
      "mutable": true,
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "Currently selected upper number (if multi-select)"
      },
      "attribute": "max-value",
      "reflect": false
    },
    "min": {
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
        "text": "Minimum selectable value"
      },
      "attribute": "min",
      "reflect": true,
      "defaultValue": "0"
    },
    "minLabel": {
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
        "text": "Label for first (or only) handle (ex. \"Temperature, lower bound\")"
      },
      "attribute": "min-label",
      "reflect": false
    },
    "minValue": {
      "type": "number",
      "mutable": true,
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "Currently selected lower number (if multi-select)"
      },
      "attribute": "min-value",
      "reflect": false
    },
    "mirrored": {
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
        "text": "When true, the slider will display values from high to low.\n\nNote that this value will be ignored if the slider has an associated histogram."
      },
      "attribute": "mirrored",
      "reflect": true,
      "defaultValue": "false"
    },
    "pageStep": {
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
        "text": "Interval to move on page up/page down keys"
      },
      "attribute": "page-step",
      "reflect": false
    },
    "precise": {
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
        "text": "Use finer point for handles"
      },
      "attribute": "precise",
      "reflect": false
    },
    "snap": {
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
        "text": "When true, enables snap selection along the step interval"
      },
      "attribute": "snap",
      "reflect": false,
      "defaultValue": "false"
    },
    "step": {
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
        "text": "Interval to move on up/down keys"
      },
      "attribute": "step",
      "reflect": false,
      "defaultValue": "1"
    },
    "ticks": {
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
        "text": "Show tick marks on the number line at provided interval"
      },
      "attribute": "ticks",
      "reflect": false
    },
    "value": {
      "type": "number",
      "mutable": true,
      "complexType": {
        "original": "null | number",
        "resolved": "number",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Currently selected number (if single select)"
      },
      "attribute": "value",
      "reflect": true,
      "defaultValue": "null"
    }
  }; }
  static get states() { return {
    "activeProp": {},
    "minMaxValueRange": {},
    "minValueDragRange": {},
    "maxValueDragRange": {},
    "tickValues": {}
  }; }
  static get events() { return [{
      "method": "calciteSliderChange",
      "name": "calciteSliderChange",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Fires on all updates to the slider.\n:warning: Will be fired frequently during drag. If you are performing any\nexpensive operations consider using a debounce or throttle to avoid\nlocking up the main thread."
      },
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      }
    }, {
      "method": "calciteSliderUpdate",
      "name": "calciteSliderUpdate",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [{
            "text": "use calciteSliderChange instead",
            "name": "deprecated"
          }],
        "text": "Fires on all updates to the slider.\n:warning: Will be fired frequently during drag. If you are performing any\nexpensive operations consider using a debounce or throttle to avoid\nlocking up the main thread."
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
        "text": "",
        "tags": []
      }
    }
  }; }
  static get elementRef() { return "el"; }
  static get watchers() { return [{
      "propName": "histogram",
      "methodName": "histogramWatcher"
    }]; }
  static get listeners() { return [{
      "name": "calciteLabelFocus",
      "method": "handleLabelFocus",
      "target": "window",
      "capture": false,
      "passive": false
    }, {
      "name": "keydown",
      "method": "keyDownHandler",
      "target": undefined,
      "capture": false,
      "passive": false
    }, {
      "name": "click",
      "method": "clickHandler",
      "target": undefined,
      "capture": false,
      "passive": false
    }, {
      "name": "pointerdown",
      "method": "pointerDownHandler",
      "target": undefined,
      "capture": false,
      "passive": true
    }]; }
}
