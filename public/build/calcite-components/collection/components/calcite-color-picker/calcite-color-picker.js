import { Component, Element, Event, h, Listen, Method, Prop, State, Watch } from "@stencil/core";
import Color from "color";
import { CSS, DEFAULT_COLOR, DEFAULT_STORAGE_KEY_PREFIX, DIMENSIONS, HSV_LIMITS, RGB_LIMITS, TEXT } from "./resources";
import { focusElement, getElementDir } from "../../utils/dom";
import { colorEqual, CSSColorMode, normalizeHex, parseMode } from "./utils";
import { throttle } from "lodash-es";
import { getKey } from "../../utils/key";
import { clamp } from "../../utils/math";
import { CSS_UTILITY } from "../../utils/resources";
const throttleFor60FpsInMs = 16;
const defaultValue = normalizeHex(DEFAULT_COLOR.hex());
const defaultFormat = "auto";
export class CalciteColorPicker {
  constructor() {
    //--------------------------------------------------------------------------
    //
    //  Public properties
    //
    //--------------------------------------------------------------------------
    /**
     * When false, empty color (null) will be allowed as a value. Otherwise, a color value is always enforced by the component.
     *
     * When true, clearing the input and blurring will restore the last valid color set. When false, it will set it to empty.
     */
    this.allowEmpty = false;
    /** specify the appearance - default (containing border), or minimal (no containing border) */
    this.appearance = "default";
    /**
     * Internal prop for advanced use-cases.
     *
     * @internal
     */
    this.color = DEFAULT_COLOR;
    /**
     * The format of the value property.
     *
     * When "auto", the format will be inferred from `value` when set.
     * @default "auto"
     */
    this.format = defaultFormat;
    /** When true, hides the hex input */
    this.hideHex = false;
    /** When true, hides the RGB/HSV channel inputs */
    this.hideChannels = false;
    /** When true, hides the saved colors section */
    this.hideSaved = false;
    /** Label used for the blue channel
     * @default "B"
     */
    this.intlB = TEXT.b;
    /** Label used for the blue channel description
     * @default "Blue"
     */
    this.intlBlue = TEXT.blue;
    /** Label used for the delete color button.
     * @default "Delete color"
     */
    this.intlDeleteColor = TEXT.deleteColor;
    /** Label used for the green channel
     * @default "G"
     */
    this.intlG = TEXT.g;
    /** Label used for the green channel description
     * @default "Green"
     */
    this.intlGreen = TEXT.green;
    /** Label used for the hue channel
     * @default "H"
     */
    this.intlH = TEXT.h;
    /** Label used for the HSV mode
     * @default "HSV"
     */
    this.intlHsv = TEXT.hsv;
    /** Label used for the hex input
     * @default "Hex"
     */
    this.intlHex = TEXT.hex;
    /** Label used for the hue channel description
     * @default "Hue"
     */
    this.intlHue = TEXT.hue;
    /**
     * Label used for the hex input when there is no color selected.
     * @default "No color"
     */
    this.intlNoColor = TEXT.noColor;
    /** Label used for the red channel
     * @default "R"
     */
    this.intlR = TEXT.r;
    /** Label used for the red channel description
     * @default "Red"
     */
    this.intlRed = TEXT.red;
    /** Label used for the RGB mode
     * @default "RGB"
     */
    this.intlRgb = TEXT.rgb;
    /** Label used for the saturation channel
     * @default "S"
     */
    this.intlS = TEXT.s;
    /** Label used for the saturation channel description
     * @default "Saturation"
     */
    this.intlSaturation = TEXT.saturation;
    /** Label used for the save color button.
     * @default "Save color"
     */
    this.intlSaveColor = TEXT.saveColor;
    /** Label used for the saved colors section
     * @default "Saved"
     */
    this.intlSaved = TEXT.saved;
    /** Label used for the value channel
     * @default "V"
     */
    this.intlV = TEXT.v;
    /** Label used for the
     * @default "Value"
     */
    this.intlValue = TEXT.value;
    /**
     * The scale of the color picker.
     */
    this.scale = "m";
    /**
     * The color value.
     *
     * This value can be either a {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color|CSS string}
     * a RGB, HSL or HSV object.
     *
     * The type will be preserved as the color is updated.
     * @default "#007ac2"
     * @see [ColorValue](https://github.com/Esri/calcite-components/blob/master/src/components/calcite-color-picker/interfaces.ts#L10)
     */
    this.value = defaultValue;
    this.colorUpdateLocked = false;
    this.colorFieldAndSliderHovered = false;
    this.hueThumbState = "idle";
    this.mode = CSSColorMode.HEX;
    this.shiftKeyChannelAdjustment = 0;
    this.sliderThumbState = "idle";
    this.colorFieldAndSliderInteractive = false;
    this.channelMode = "rgb";
    this.channels = this.toChannels(DEFAULT_COLOR);
    this.dimensions = DIMENSIONS.m;
    this.savedColors = [];
    this.handleTabActivate = (event) => {
      this.channelMode = event.currentTarget.getAttribute("data-color-mode");
      this.updateChannelsFromColor(this.color);
    };
    this.handleColorFieldScopeKeyDown = (event) => {
      const key = getKey(event.key);
      const arrowKeyToXYOffset = {
        ArrowUp: { x: 0, y: -10 },
        ArrowRight: { x: 10, y: 0 },
        ArrowDown: { x: 0, y: 10 },
        ArrowLeft: { x: -10, y: 0 }
      };
      if (arrowKeyToXYOffset[key]) {
        event.preventDefault();
        this.scopeOrientation = key === "ArrowDown" || key === "ArrowUp" ? "vertical" : "horizontal";
        this.captureColorFieldColor(this.colorFieldScopeLeft + arrowKeyToXYOffset[key].x || 0, this.colorFieldScopeTop + arrowKeyToXYOffset[key].y || 0, false);
      }
    };
    this.handleHueScopeKeyDown = (event) => {
      const modifier = event.shiftKey ? 10 : 1;
      const key = getKey(event.key);
      const arrowKeyToXOffset = {
        ArrowUp: 1,
        ArrowRight: 1,
        ArrowDown: -1,
        ArrowLeft: -1
      };
      if (arrowKeyToXOffset[key]) {
        event.preventDefault();
        const delta = arrowKeyToXOffset[key] * modifier;
        const hue = this.baseColorFieldColor.hue();
        const color = this.baseColorFieldColor.hue(hue + delta);
        this.internalColorSet(color, false);
      }
    };
    this.handleHexInputChange = (event) => {
      event.stopPropagation();
      const { allowEmpty, color } = this;
      const input = event.target;
      const hex = input.value;
      if (allowEmpty && !hex) {
        this.internalColorSet(null);
        return;
      }
      const normalizedHex = color && normalizeHex(color.hex());
      if (hex !== normalizedHex) {
        this.internalColorSet(Color(hex));
      }
    };
    this.handleSavedColorSelect = (event) => {
      const swatch = event.currentTarget;
      this.internalColorSet(Color(swatch.color));
    };
    this.handleChannelInput = (event) => {
      const input = event.currentTarget;
      const internalInput = event.detail.nativeEvent.target;
      const channelIndex = Number(input.getAttribute("data-channel-index"));
      const limit = this.channelMode === "rgb"
        ? RGB_LIMITS[Object.keys(RGB_LIMITS)[channelIndex]]
        : HSV_LIMITS[Object.keys(HSV_LIMITS)[channelIndex]];
      let inputValue;
      if (this.allowEmpty && !input.value) {
        inputValue = "";
      }
      else {
        const value = Number(input.value) + this.shiftKeyChannelAdjustment;
        const clamped = clamp(value, 0, limit);
        inputValue = clamped.toString();
      }
      input.value = inputValue;
      internalInput.value = inputValue;
    };
    this.handleChannelChange = (event) => {
      const input = event.currentTarget;
      const channelIndex = Number(input.getAttribute("data-channel-index"));
      const channels = [...this.channels];
      const shouldClearChannels = this.allowEmpty && !input.value;
      if (shouldClearChannels) {
        this.channels = [null, null, null];
        this.internalColorSet(null);
        return;
      }
      channels[channelIndex] = Number(input.value);
      this.updateColorFromChannels(channels);
    };
    this.handleSavedColorKeyDown = (event) => {
      if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
        event.stopPropagation();
        this.handleSavedColorSelect(event);
      }
    };
    this.handleColorFieldAndSliderMouseLeave = () => {
      this.colorFieldAndSliderInteractive = false;
      this.colorFieldAndSliderHovered = false;
      if (this.sliderThumbState !== "drag" && this.hueThumbState !== "drag") {
        this.hueThumbState = "idle";
        this.sliderThumbState = "idle";
        this.drawColorFieldAndSlider();
      }
    };
    this.handleColorFieldAndSliderMouseDown = (event) => {
      const { offsetX, offsetY } = event;
      const region = this.getCanvasRegion(offsetY);
      if (region === "color-field") {
        this.hueThumbState = "drag";
        this.captureColorFieldColor(offsetX, offsetY);
      }
      else if (region === "slider") {
        this.sliderThumbState = "drag";
        this.captureHueSliderColor(offsetX);
      }
      // prevent text selection outside of color field & slider area
      event.preventDefault();
      document.addEventListener("mousemove", this.globalMouseMoveHandler);
      document.addEventListener("mouseup", this.globalMouseUpHandler, { once: true });
      this.activeColorFieldAndSliderRect =
        this.fieldAndSliderRenderingContext.canvas.getBoundingClientRect();
    };
    this.globalMouseUpHandler = () => {
      const previouslyDragging = this.sliderThumbState === "drag" || this.hueThumbState === "drag";
      this.hueThumbState = "idle";
      this.sliderThumbState = "idle";
      this.activeColorFieldAndSliderRect = null;
      this.drawColorFieldAndSlider();
      if (previouslyDragging) {
        this.calciteColorPickerChange.emit();
      }
    };
    this.globalMouseMoveHandler = (event) => {
      const { el, dimensions } = this;
      const sliderThumbDragging = this.sliderThumbState === "drag";
      const hueThumbDragging = this.hueThumbState === "drag";
      if (!el.isConnected || (!sliderThumbDragging && !hueThumbDragging)) {
        return;
      }
      let samplingX;
      let samplingY;
      if (this.colorFieldAndSliderHovered) {
        samplingX = event.offsetX;
        samplingY = event.offsetY;
      }
      else {
        const { clientX, clientY } = event;
        const colorFieldAndSliderRect = this.activeColorFieldAndSliderRect;
        const colorFieldWidth = dimensions.colorField.width;
        const colorFieldHeight = dimensions.colorField.height;
        const hueSliderHeight = dimensions.slider.height;
        if (clientX < colorFieldAndSliderRect.x + colorFieldWidth &&
          clientX > colorFieldAndSliderRect.x) {
          samplingX = clientX - colorFieldAndSliderRect.x;
        }
        else if (clientX < colorFieldAndSliderRect.x) {
          samplingX = 0;
        }
        else {
          samplingX = colorFieldWidth;
        }
        if (clientY < colorFieldAndSliderRect.y + colorFieldHeight + hueSliderHeight &&
          clientY > colorFieldAndSliderRect.y) {
          samplingY = clientY - colorFieldAndSliderRect.y;
        }
        else if (clientY < colorFieldAndSliderRect.y) {
          samplingY = 0;
        }
        else {
          samplingY = colorFieldHeight + hueSliderHeight;
        }
      }
      if (hueThumbDragging) {
        this.captureColorFieldColor(samplingX, samplingY, false);
      }
      else {
        this.captureHueSliderColor(samplingX);
      }
    };
    this.handleColorFieldAndSliderMouseEnterOrMove = ({ offsetX, offsetY }) => {
      const { dimensions: { colorField, slider, thumb } } = this;
      this.colorFieldAndSliderInteractive = offsetY <= colorField.height + slider.height;
      this.colorFieldAndSliderHovered = true;
      const region = this.getCanvasRegion(offsetY);
      if (region === "color-field") {
        const prevHueThumbState = this.hueThumbState;
        const color = this.baseColorFieldColor.hsv();
        const centerX = Math.round(color.saturationv() / (HSV_LIMITS.s / colorField.width));
        const centerY = Math.round(colorField.height - color.value() / (HSV_LIMITS.v / colorField.height));
        const hoveringThumb = this.containsPoint(offsetX, offsetY, centerX, centerY, thumb.radius);
        let transitionedBetweenHoverAndIdle = false;
        if (prevHueThumbState === "idle" && hoveringThumb) {
          this.hueThumbState = "hover";
          transitionedBetweenHoverAndIdle = true;
        }
        else if (prevHueThumbState === "hover" && !hoveringThumb) {
          this.hueThumbState = "idle";
          transitionedBetweenHoverAndIdle = true;
        }
        if (this.hueThumbState !== "drag") {
          if (transitionedBetweenHoverAndIdle) {
            // refresh since we won't update color and thus no redraw
            this.drawColorFieldAndSlider();
          }
        }
      }
      else if (region === "slider") {
        const sliderThumbColor = this.baseColorFieldColor.hsv().saturationv(100).value(100);
        const prevSliderThumbState = this.sliderThumbState;
        const sliderThumbCenterX = Math.round(sliderThumbColor.hue() / (360 / slider.width));
        const sliderThumbCenterY = Math.round((slider.height + this.getSliderCapSpacing()) / 2) + colorField.height;
        const hoveringSliderThumb = this.containsPoint(offsetX, offsetY, sliderThumbCenterX, sliderThumbCenterY, thumb.radius);
        let sliderThumbTransitionedBetweenHoverAndIdle = false;
        if (prevSliderThumbState === "idle" && hoveringSliderThumb) {
          this.sliderThumbState = "hover";
          sliderThumbTransitionedBetweenHoverAndIdle = true;
        }
        else if (prevSliderThumbState === "hover" && !hoveringSliderThumb) {
          this.sliderThumbState = "idle";
          sliderThumbTransitionedBetweenHoverAndIdle = true;
        }
        if (this.sliderThumbState !== "drag") {
          if (sliderThumbTransitionedBetweenHoverAndIdle) {
            // refresh since we won't update color and thus no redraw
            this.drawColorFieldAndSlider();
          }
        }
      }
    };
    this.storeColorFieldScope = (node) => {
      this.colorFieldScopeNode = node;
    };
    this.renderChannelsTabTitle = (channelMode) => {
      const { channelMode: activeChannelMode, intlRgb, intlHsv } = this;
      const active = channelMode === activeChannelMode;
      const label = channelMode === "rgb" ? intlRgb : intlHsv;
      return (h("calcite-tab-title", { active: active, class: CSS.colorMode, "data-color-mode": channelMode, key: channelMode, onCalciteTabsActivate: this.handleTabActivate }, label));
    };
    this.renderChannelsTab = (channelMode) => {
      const { channelMode: activeChannelMode, channels, intlB, intlBlue, intlG, intlGreen, intlH, intlHue, intlR, intlRed, intlS, intlSaturation, intlV, intlValue } = this;
      const active = channelMode === activeChannelMode;
      const isRgb = channelMode === "rgb";
      const channelLabels = isRgb ? [intlR, intlG, intlB] : [intlH, intlS, intlV];
      const channelAriaLabels = isRgb
        ? [intlRed, intlGreen, intlBlue]
        : [intlHue, intlSaturation, intlValue];
      return (h("calcite-tab", { active: active, class: CSS.control, key: channelMode },
        h("div", { class: CSS.channels }, channels.map((channel, index) => this.renderChannel(channel, index, channelLabels[index], channelAriaLabels[index])))));
    };
    this.renderChannel = (value, index, label, ariaLabel) => (h("calcite-input", { class: CSS.channel, "data-channel-index": index, label: ariaLabel, numberButtonType: "none", onCalciteInputChange: this.handleChannelChange, onCalciteInputInput: this.handleChannelInput, prefixText: label, scale: this.scale === "l" ? "m" : "s", type: "number", value: value === null || value === void 0 ? void 0 : value.toString() }));
    this.deleteColor = () => {
      const colorToDelete = this.color.hex();
      const inStorage = this.savedColors.indexOf(colorToDelete) > -1;
      if (!inStorage) {
        return;
      }
      const savedColors = this.savedColors.filter((color) => color !== colorToDelete);
      this.savedColors = savedColors;
      const storageKey = `${DEFAULT_STORAGE_KEY_PREFIX}${this.storageId}`;
      if (this.storageId) {
        localStorage.setItem(storageKey, JSON.stringify(savedColors));
      }
    };
    this.saveColor = () => {
      const colorToSave = this.color.hex();
      const alreadySaved = this.savedColors.indexOf(colorToSave) > -1;
      if (alreadySaved) {
        return;
      }
      const savedColors = [...this.savedColors, colorToSave];
      this.savedColors = savedColors;
      const storageKey = `${DEFAULT_STORAGE_KEY_PREFIX}${this.storageId}`;
      if (this.storageId) {
        localStorage.setItem(storageKey, JSON.stringify(savedColors));
      }
    };
    this.drawColorFieldAndSlider = throttle(() => {
      if (!this.fieldAndSliderRenderingContext) {
        return;
      }
      this.drawColorField();
      this.drawHueSlider();
    }, throttleFor60FpsInMs);
    this.captureColorFieldColor = (x, y, skipEqual = true) => {
      const { dimensions: { colorField: { height, width } } } = this;
      const saturation = Math.round((HSV_LIMITS.s / width) * x);
      const value = Math.round((HSV_LIMITS.v / height) * (height - y));
      this.internalColorSet(this.baseColorFieldColor.hsv().saturationv(saturation).value(value), skipEqual);
    };
    this.initColorFieldAndSlider = (canvas) => {
      this.fieldAndSliderRenderingContext = canvas.getContext("2d");
      this.setCanvasContextSize(canvas, {
        width: this.dimensions.colorField.width,
        height: this.dimensions.colorField.height +
          this.dimensions.slider.height +
          this.getSliderCapSpacing() * 2
      });
      this.drawColorFieldAndSlider();
    };
  }
  handleColorChange(color, oldColor) {
    this.drawColorFieldAndSlider();
    this.updateChannelsFromColor(color);
    this.previousColor = oldColor;
    if (this.colorUpdateLocked) {
      return;
    }
    this.value = this.toValue(color);
  }
  handleFormatChange(format) {
    this.mode = format === "auto" ? this.mode : format;
    this.value = this.toValue(this.color);
  }
  handleScaleChange(scale = "m") {
    this.updateDimensions(scale);
  }
  handleValueChange(value, oldValue) {
    const { allowEmpty, format } = this;
    const checkMode = !allowEmpty || value;
    let modeChanged = false;
    if (checkMode) {
      const nextMode = parseMode(value);
      if (!nextMode || (format !== "auto" && nextMode !== format)) {
        console.warn(`ignoring invalid color value: ${value}`);
        this.value = oldValue;
        return;
      }
      modeChanged = this.mode !== nextMode;
      this.mode = nextMode;
    }
    const dragging = this.sliderThumbState === "drag" || this.hueThumbState === "drag";
    if (this.colorUpdateLocked) {
      this.calciteColorPickerInput.emit();
      if (!dragging) {
        this.calciteColorPickerChange.emit();
      }
      return;
    }
    const color = allowEmpty && !value ? null : Color(value);
    const colorChanged = !colorEqual(color, this.color);
    if (modeChanged || colorChanged) {
      this.color = color;
      this.calciteColorPickerInput.emit();
      if (!dragging) {
        this.calciteColorPickerChange.emit();
      }
    }
  }
  //--------------------------------------------------------------------------
  //
  //  Internal State/Props
  //
  //--------------------------------------------------------------------------
  get baseColorFieldColor() {
    return this.color || this.previousColor || DEFAULT_COLOR;
  }
  // using @Listen as a workaround for VDOM listener not firing
  handleChannelKeyUpOrDown(event) {
    this.shiftKeyChannelAdjustment = 0;
    const key = getKey(event.key);
    if ((key !== "ArrowUp" && key !== "ArrowDown") ||
      !event.composedPath().some((node) => { var _a; return (_a = node.classList) === null || _a === void 0 ? void 0 : _a.contains(CSS.channel); })) {
      return;
    }
    const { shiftKey } = event;
    event.preventDefault();
    if (!this.color) {
      this.internalColorSet(this.previousColor);
      event.stopPropagation();
      return;
    }
    // this gets applied to the input's up/down arrow increment/decrement
    const complementaryBump = 9;
    this.shiftKeyChannelAdjustment =
      key === "ArrowUp" && shiftKey
        ? complementaryBump
        : key === "ArrowDown" && shiftKey
          ? -complementaryBump
          : 0;
  }
  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  /** Sets focus on the component. */
  async setFocus() {
    return focusElement(this.colorFieldScopeNode);
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  componentWillLoad() {
    const storageKey = `${DEFAULT_STORAGE_KEY_PREFIX}${this.storageId}`;
    if (this.storageId && localStorage.getItem(storageKey)) {
      this.savedColors = JSON.parse(localStorage.getItem(storageKey));
    }
  }
  connectedCallback() {
    const { color, format, value } = this;
    const initialValueDefault = format !== "auto" ? this.toValue(color, format) : defaultValue;
    const initialValue = format !== "auto" && value === defaultValue ? initialValueDefault : value;
    this.handleValueChange(initialValue, initialValueDefault);
    this.updateDimensions(this.scale);
  }
  disconnectedCallback() {
    document.removeEventListener("mousemove", this.globalMouseMoveHandler);
    document.removeEventListener("mouseup", this.globalMouseUpHandler);
  }
  //--------------------------------------------------------------------------
  //
  //  Render Methods
  //
  //--------------------------------------------------------------------------
  render() {
    const { allowEmpty, color, intlDeleteColor, el, hideHex, hideChannels, hideSaved, intlHex, intlSaved, intlSaveColor, savedColors, scale } = this;
    const selectedColorInHex = color ? color.hex() : null;
    const hexInputScale = scale === "l" ? "m" : "s";
    const { colorFieldAndSliderInteractive, colorFieldScopeTop, colorFieldScopeLeft, hueScopeLeft, hueScopeTop, scopeOrientation, dimensions: { colorField: { height: colorFieldHeight, width: colorFieldWidth }, slider: { height: sliderHeight } } } = this;
    const hueTop = hueScopeTop !== null && hueScopeTop !== void 0 ? hueScopeTop : sliderHeight / 2 + colorFieldHeight;
    const hueLeft = hueScopeLeft !== null && hueScopeLeft !== void 0 ? hueScopeLeft : (colorFieldWidth * DEFAULT_COLOR.hue()) / HSV_LIMITS.h;
    const elementDir = getElementDir(el);
    const noColor = color === null;
    const vertical = scopeOrientation === "vertical";
    return (h("div", { class: CSS.container },
      h("div", { class: CSS.colorFieldAndSliderWrap },
        h("canvas", { class: {
            [CSS.colorFieldAndSlider]: true,
            [CSS.colorFieldAndSliderInteractive]: colorFieldAndSliderInteractive
          }, onMouseDown: this.handleColorFieldAndSliderMouseDown, onMouseEnter: this.handleColorFieldAndSliderMouseEnterOrMove, onMouseLeave: this.handleColorFieldAndSliderMouseLeave, onMouseMove: this.handleColorFieldAndSliderMouseEnterOrMove, ref: this.initColorFieldAndSlider }),
        h("div", { "aria-label": vertical ? this.intlValue : this.intlSaturation, "aria-valuemax": vertical ? HSV_LIMITS.v : HSV_LIMITS.s, "aria-valuemin": "0", "aria-valuenow": (vertical ? color === null || color === void 0 ? void 0 : color.saturationv() : color === null || color === void 0 ? void 0 : color.value()) || "0", class: { [CSS.scope]: true, [CSS.colorFieldScope]: true }, onKeyDown: this.handleColorFieldScopeKeyDown, ref: this.storeColorFieldScope, role: "slider", style: { top: `${colorFieldScopeTop || 0}px`, left: `${colorFieldScopeLeft || 0}px` }, tabindex: "0" }),
        h("div", { "aria-label": this.intlHue, "aria-valuemax": HSV_LIMITS.h, "aria-valuemin": "0", "aria-valuenow": (color === null || color === void 0 ? void 0 : color.round().hue()) || DEFAULT_COLOR.round().hue(), class: { [CSS.scope]: true, [CSS.hueScope]: true }, onKeyDown: this.handleHueScopeKeyDown, role: "slider", style: { top: `${hueTop}px`, left: `${hueLeft}px` }, tabindex: "0" })),
      hideHex && hideChannels ? null : (h("div", { class: {
          [CSS.controlSection]: true,
          [CSS.section]: true,
          [CSS_UTILITY.rtl]: elementDir === "rtl"
        } },
        hideHex ? null : (h("div", { class: CSS.hexOptions },
          h("span", { class: {
              [CSS.header]: true,
              [CSS.headerHex]: true
            } }, intlHex),
          h("calcite-color-picker-hex-input", { allowEmpty: allowEmpty, class: CSS.control, dir: elementDir, onCalciteColorPickerHexInputChange: this.handleHexInputChange, scale: hexInputScale, value: selectedColorInHex }))),
        hideChannels ? null : (h("calcite-tabs", { class: {
            [CSS.colorModeContainer]: true,
            [CSS.splitSection]: true
          }, dir: elementDir, scale: hexInputScale },
          h("calcite-tab-nav", { slot: "tab-nav" },
            this.renderChannelsTabTitle("rgb"),
            this.renderChannelsTabTitle("hsv")),
          this.renderChannelsTab("rgb"),
          this.renderChannelsTab("hsv"))))),
      hideSaved ? null : (h("div", { class: { [CSS.savedColorsSection]: true, [CSS.section]: true } },
        h("div", { class: CSS.header },
          h("label", null, intlSaved),
          h("div", { class: CSS.savedColorsButtons },
            h("calcite-button", { appearance: "transparent", class: CSS.deleteColor, color: "neutral", disabled: noColor, iconStart: "minus", label: intlDeleteColor, onClick: this.deleteColor, scale: hexInputScale }),
            h("calcite-button", { appearance: "transparent", class: CSS.saveColor, color: "neutral", disabled: noColor, iconStart: "plus", label: intlSaveColor, onClick: this.saveColor, scale: hexInputScale }))),
        savedColors.length > 0 ? (h("div", { class: CSS.savedColors }, [
          ...savedColors.map((color) => (h("calcite-color-picker-swatch", { active: selectedColorInHex === color, class: CSS.savedColor, color: color, key: color, onClick: this.handleSavedColorSelect, onKeyDown: this.handleSavedColorKeyDown, scale: scale, tabIndex: 0 })))
        ])) : null))));
  }
  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  captureHueSliderColor(x) {
    const { dimensions: { slider: { width } } } = this;
    const hue = (360 / width) * x;
    this.internalColorSet(this.baseColorFieldColor.hue(hue), false);
  }
  getCanvasRegion(y) {
    const { dimensions: { colorField: { height: colorFieldHeight }, slider: { height: sliderHeight } } } = this;
    if (y <= colorFieldHeight) {
      return "color-field";
    }
    if (y <= colorFieldHeight + sliderHeight) {
      return "slider";
    }
    return "none";
  }
  internalColorSet(color, skipEqual = true) {
    if (skipEqual && colorEqual(color, this.color)) {
      return;
    }
    this.colorUpdateLocked = true;
    this.color = color;
    this.value = this.toValue(color);
    this.colorUpdateLocked = false;
  }
  toValue(color, format = this.mode) {
    if (!color) {
      return null;
    }
    const hexMode = "hex";
    if (format.includes(hexMode)) {
      return normalizeHex(color.round()[hexMode]());
    }
    if (format.includes("-css")) {
      return color[format.replace("-css", "").replace("a", "")]().round().string();
    }
    const colorObject = color[format]().round().object();
    if (format.endsWith("a")) {
      // normalize alpha prop
      colorObject.a = colorObject.alpha;
      delete colorObject.alpha;
    }
    return colorObject;
  }
  getSliderCapSpacing() {
    const { dimensions: { slider: { height }, thumb: { radius } } } = this;
    return radius * 2 - height;
  }
  updateDimensions(scale = "m") {
    this.dimensions = DIMENSIONS[scale];
  }
  drawColorField() {
    const context = this.fieldAndSliderRenderingContext;
    const { dimensions: { colorField: { height, width } } } = this;
    context.fillStyle = this.baseColorFieldColor.hsv().saturationv(100).value(100).string();
    context.fillRect(0, 0, width, height);
    const whiteGradient = context.createLinearGradient(0, 0, width, 0);
    whiteGradient.addColorStop(0, "rgba(255,255,255,1)");
    whiteGradient.addColorStop(1, "rgba(255,255,255,0)");
    context.fillStyle = whiteGradient;
    context.fillRect(0, 0, width, height);
    const blackGradient = context.createLinearGradient(0, 0, 0, height);
    blackGradient.addColorStop(0, "rgba(0,0,0,0)");
    blackGradient.addColorStop(1, "rgba(0,0,0,1)");
    context.fillStyle = blackGradient;
    context.fillRect(0, 0, width, height);
    this.drawActiveColorFieldColor();
  }
  setCanvasContextSize(canvas, { height, width }) {
    const devicePixelRatio = window.devicePixelRatio || 1;
    canvas.width = width * devicePixelRatio;
    canvas.height = height * devicePixelRatio;
    canvas.style.height = `${height}px`;
    canvas.style.width = `${width}px`;
    const context = canvas.getContext("2d");
    context.scale(devicePixelRatio, devicePixelRatio);
  }
  containsPoint(testPointX, testPointY, boundsX, boundsY, boundsRadius) {
    return (Math.pow(testPointX - boundsX, 2) + Math.pow(testPointY - boundsY, 2) <=
      Math.pow(boundsRadius, 2));
  }
  drawActiveColorFieldColor() {
    const { color } = this;
    if (!color) {
      return;
    }
    const hsvColor = color.hsv();
    const { dimensions: { colorField: { height, width }, thumb: { radius } } } = this;
    const x = hsvColor.saturationv() / (HSV_LIMITS.s / width);
    const y = height - hsvColor.value() / (HSV_LIMITS.v / height);
    requestAnimationFrame(() => {
      this.colorFieldScopeLeft = x;
      this.colorFieldScopeTop = y;
    });
    this.drawThumb(this.fieldAndSliderRenderingContext, radius, x, y, hsvColor, this.hueThumbState);
  }
  drawThumb(context, radius, x, y, color, state) {
    const startAngle = 0;
    const endAngle = 2 * Math.PI;
    context.beginPath();
    context.arc(x, y, radius, startAngle, endAngle);
    context.shadowBlur = state === "hover" ? 32 : 16;
    context.shadowColor = `rgba(0, 0, 0, ${state === "drag" ? 0.32 : 0.16})`;
    context.fillStyle = "#fff";
    context.fill();
    context.beginPath();
    context.arc(x, y, radius - 3, startAngle, endAngle);
    context.shadowBlur = 0;
    context.shadowColor = "transparent";
    context.fillStyle = color.rgb().string();
    context.fill();
  }
  drawActiveHueSliderColor() {
    const { color } = this;
    if (!color) {
      return;
    }
    const hsvColor = color.hsv().saturationv(100).value(100);
    const { dimensions: { colorField: { height: colorFieldHeight }, slider: { height, width }, thumb: { radius } } } = this;
    const x = hsvColor.hue() / (360 / width);
    const y = height / 2 + colorFieldHeight;
    requestAnimationFrame(() => {
      this.hueScopeLeft = x;
      this.hueScopeTop = y;
    });
    this.drawThumb(this.fieldAndSliderRenderingContext, radius, x, y, hsvColor, this.sliderThumbState);
  }
  drawHueSlider() {
    const context = this.fieldAndSliderRenderingContext;
    const { dimensions: { colorField: { height: colorFieldHeight }, slider: { height, width } } } = this;
    const gradient = context.createLinearGradient(0, 0, width, 0);
    const hueSliderColorStopKeywords = ["red", "yellow", "lime", "cyan", "blue", "magenta", "red"];
    const offset = 1 / (hueSliderColorStopKeywords.length - 1);
    let currentOffset = 0;
    hueSliderColorStopKeywords.forEach((keyword) => {
      gradient.addColorStop(currentOffset, Color(keyword).string());
      currentOffset += offset;
    });
    context.fillStyle = gradient;
    context.clearRect(0, colorFieldHeight, width, height + this.getSliderCapSpacing() * 2);
    context.fillRect(0, colorFieldHeight, width, height);
    this.drawActiveHueSliderColor();
  }
  updateColorFromChannels(channels) {
    this.internalColorSet(Color(channels, this.channelMode));
  }
  updateChannelsFromColor(color) {
    this.channels = color ? this.toChannels(color) : [null, null, null];
  }
  toChannels(color) {
    const { channelMode } = this;
    return color[channelMode]()
      .array()
      .map((value) => Math.floor(value));
  }
  static get is() { return "calcite-color-picker"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["calcite-color-picker.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["calcite-color-picker.css"]
  }; }
  static get properties() { return {
    "allowEmpty": {
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
        "text": "When false, empty color (null) will be allowed as a value. Otherwise, a color value is always enforced by the component.\n\nWhen true, clearing the input and blurring will restore the last valid color set. When false, it will set it to empty."
      },
      "attribute": "allow-empty",
      "reflect": false,
      "defaultValue": "false"
    },
    "appearance": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "ColorAppearance",
        "resolved": "\"default\" | \"minimal\"",
        "references": {
          "ColorAppearance": {
            "location": "import",
            "path": "./interfaces"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "specify the appearance - default (containing border), or minimal (no containing border)"
      },
      "attribute": "appearance",
      "reflect": true,
      "defaultValue": "\"default\""
    },
    "color": {
      "type": "unknown",
      "mutable": true,
      "complexType": {
        "original": "InternalColor | null",
        "resolved": "Color<ColorParam>",
        "references": {
          "InternalColor": {
            "location": "import",
            "path": "./interfaces"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [{
            "text": undefined,
            "name": "internal"
          }],
        "text": "Internal prop for advanced use-cases."
      },
      "defaultValue": "DEFAULT_COLOR"
    },
    "format": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "Format",
        "resolved": "\"auto\" | \"hex\" | \"hexa\" | \"hsl\" | \"hsl-css\" | \"hsla\" | \"hsla-css\" | \"hsv\" | \"hsva\" | \"rgb\" | \"rgb-css\" | \"rgba\" | \"rgba-css\"",
        "references": {
          "Format": {
            "location": "import",
            "path": "./utils"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [{
            "text": "\"auto\"",
            "name": "default"
          }],
        "text": "The format of the value property.\n\nWhen \"auto\", the format will be inferred from `value` when set."
      },
      "attribute": "format",
      "reflect": false,
      "defaultValue": "defaultFormat"
    },
    "hideHex": {
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
        "text": "When true, hides the hex input"
      },
      "attribute": "hide-hex",
      "reflect": false,
      "defaultValue": "false"
    },
    "hideChannels": {
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
        "text": "When true, hides the RGB/HSV channel inputs"
      },
      "attribute": "hide-channels",
      "reflect": false,
      "defaultValue": "false"
    },
    "hideSaved": {
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
        "text": "When true, hides the saved colors section"
      },
      "attribute": "hide-saved",
      "reflect": false,
      "defaultValue": "false"
    },
    "intlB": {
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
            "text": "\"B\"",
            "name": "default"
          }],
        "text": "Label used for the blue channel"
      },
      "attribute": "intl-b",
      "reflect": false,
      "defaultValue": "TEXT.b"
    },
    "intlBlue": {
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
            "text": "\"Blue\"",
            "name": "default"
          }],
        "text": "Label used for the blue channel description"
      },
      "attribute": "intl-blue",
      "reflect": false,
      "defaultValue": "TEXT.blue"
    },
    "intlDeleteColor": {
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
            "text": "\"Delete color\"",
            "name": "default"
          }],
        "text": "Label used for the delete color button."
      },
      "attribute": "intl-delete-color",
      "reflect": false,
      "defaultValue": "TEXT.deleteColor"
    },
    "intlG": {
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
            "text": "\"G\"",
            "name": "default"
          }],
        "text": "Label used for the green channel"
      },
      "attribute": "intl-g",
      "reflect": false,
      "defaultValue": "TEXT.g"
    },
    "intlGreen": {
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
            "text": "\"Green\"",
            "name": "default"
          }],
        "text": "Label used for the green channel description"
      },
      "attribute": "intl-green",
      "reflect": false,
      "defaultValue": "TEXT.green"
    },
    "intlH": {
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
            "text": "\"H\"",
            "name": "default"
          }],
        "text": "Label used for the hue channel"
      },
      "attribute": "intl-h",
      "reflect": false,
      "defaultValue": "TEXT.h"
    },
    "intlHsv": {
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
            "text": "\"HSV\"",
            "name": "default"
          }],
        "text": "Label used for the HSV mode"
      },
      "attribute": "intl-hsv",
      "reflect": false,
      "defaultValue": "TEXT.hsv"
    },
    "intlHex": {
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
            "text": "\"Hex\"",
            "name": "default"
          }],
        "text": "Label used for the hex input"
      },
      "attribute": "intl-hex",
      "reflect": false,
      "defaultValue": "TEXT.hex"
    },
    "intlHue": {
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
            "text": "\"Hue\"",
            "name": "default"
          }],
        "text": "Label used for the hue channel description"
      },
      "attribute": "intl-hue",
      "reflect": false,
      "defaultValue": "TEXT.hue"
    },
    "intlNoColor": {
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
            "text": "\"No color\"",
            "name": "default"
          }],
        "text": "Label used for the hex input when there is no color selected."
      },
      "attribute": "intl-no-color",
      "reflect": false,
      "defaultValue": "TEXT.noColor"
    },
    "intlR": {
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
            "text": "\"R\"",
            "name": "default"
          }],
        "text": "Label used for the red channel"
      },
      "attribute": "intl-r",
      "reflect": false,
      "defaultValue": "TEXT.r"
    },
    "intlRed": {
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
            "text": "\"Red\"",
            "name": "default"
          }],
        "text": "Label used for the red channel description"
      },
      "attribute": "intl-red",
      "reflect": false,
      "defaultValue": "TEXT.red"
    },
    "intlRgb": {
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
            "text": "\"RGB\"",
            "name": "default"
          }],
        "text": "Label used for the RGB mode"
      },
      "attribute": "intl-rgb",
      "reflect": false,
      "defaultValue": "TEXT.rgb"
    },
    "intlS": {
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
            "text": "\"S\"",
            "name": "default"
          }],
        "text": "Label used for the saturation channel"
      },
      "attribute": "intl-s",
      "reflect": false,
      "defaultValue": "TEXT.s"
    },
    "intlSaturation": {
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
            "text": "\"Saturation\"",
            "name": "default"
          }],
        "text": "Label used for the saturation channel description"
      },
      "attribute": "intl-saturation",
      "reflect": false,
      "defaultValue": "TEXT.saturation"
    },
    "intlSaveColor": {
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
            "text": "\"Save color\"",
            "name": "default"
          }],
        "text": "Label used for the save color button."
      },
      "attribute": "intl-save-color",
      "reflect": false,
      "defaultValue": "TEXT.saveColor"
    },
    "intlSaved": {
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
            "text": "\"Saved\"",
            "name": "default"
          }],
        "text": "Label used for the saved colors section"
      },
      "attribute": "intl-saved",
      "reflect": false,
      "defaultValue": "TEXT.saved"
    },
    "intlV": {
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
            "text": "\"V\"",
            "name": "default"
          }],
        "text": "Label used for the value channel"
      },
      "attribute": "intl-v",
      "reflect": false,
      "defaultValue": "TEXT.v"
    },
    "intlValue": {
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
            "text": "\"Value\"",
            "name": "default"
          }],
        "text": "Label used for the"
      },
      "attribute": "intl-value",
      "reflect": false,
      "defaultValue": "TEXT.value"
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
        "text": "The scale of the color picker."
      },
      "attribute": "scale",
      "reflect": true,
      "defaultValue": "\"m\""
    },
    "storageId": {
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
        "text": "Storage ID for colors."
      },
      "attribute": "storage-id",
      "reflect": false
    },
    "value": {
      "type": "string",
      "mutable": true,
      "complexType": {
        "original": "ColorValue | null",
        "resolved": "HSL | HSL & ObjectWithAlpha | HSV | HSV & ObjectWithAlpha | RGB | RGB & ObjectWithAlpha | string",
        "references": {
          "ColorValue": {
            "location": "import",
            "path": "./interfaces"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [{
            "text": "\"#007ac2\"",
            "name": "default"
          }, {
            "text": " [ColorValue](https://github.com/Esri/calcite-components/blob/master/src/components/calcite-color-picker/interfaces.ts#L10)",
            "name": "see"
          }],
        "text": "The color value.\n\nThis value can be either a {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color|CSS string}\na RGB, HSL or HSV object.\n\nThe type will be preserved as the color is updated."
      },
      "attribute": "value",
      "reflect": false,
      "defaultValue": "defaultValue"
    }
  }; }
  static get states() { return {
    "colorFieldAndSliderInteractive": {},
    "channelMode": {},
    "channels": {},
    "dimensions": {},
    "savedColors": {},
    "colorFieldScopeTop": {},
    "colorFieldScopeLeft": {},
    "scopeOrientation": {},
    "hueScopeLeft": {},
    "hueScopeTop": {}
  }; }
  static get events() { return [{
      "method": "calciteColorPickerChange",
      "name": "calciteColorPickerChange",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Fires when the color value has changed."
      },
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      }
    }, {
      "method": "calciteColorPickerInput",
      "name": "calciteColorPickerInput",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Fires as the color value changes.\n\nThis is similar to the change event with the exception of dragging. When dragging the color field or hue slider thumb, this event fires as the thumb is moved."
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
        "text": "Sets focus on the component.",
        "tags": []
      }
    }
  }; }
  static get elementRef() { return "el"; }
  static get watchers() { return [{
      "propName": "color",
      "methodName": "handleColorChange"
    }, {
      "propName": "format",
      "methodName": "handleFormatChange"
    }, {
      "propName": "scale",
      "methodName": "handleScaleChange"
    }, {
      "propName": "value",
      "methodName": "handleValueChange"
    }]; }
  static get listeners() { return [{
      "name": "keydown",
      "method": "handleChannelKeyUpOrDown",
      "target": undefined,
      "capture": true,
      "passive": false
    }, {
      "name": "keyup",
      "method": "handleChannelKeyUpOrDown",
      "target": undefined,
      "capture": true,
      "passive": false
    }]; }
}
