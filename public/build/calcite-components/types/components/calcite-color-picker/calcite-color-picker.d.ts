import { EventEmitter, VNode } from "../../stencil-public-runtime";
import Color from "color";
import { ColorAppearance, ColorMode, ColorValue, InternalColor } from "./interfaces";
import { Scale } from "../interfaces";
import { Format } from "./utils";
export declare class CalciteColorPicker {
  el: HTMLCalciteColorPickerElement;
  /**
   * When false, empty color (null) will be allowed as a value. Otherwise, a color value is always enforced by the component.
   *
   * When true, clearing the input and blurring will restore the last valid color set. When false, it will set it to empty.
   */
  allowEmpty: boolean;
  /** specify the appearance - default (containing border), or minimal (no containing border) */
  appearance: ColorAppearance;
  /**
   * Internal prop for advanced use-cases.
   *
   * @internal
   */
  color: InternalColor | null;
  handleColorChange(color: Color | null, oldColor: Color | null): void;
  /**
   * The format of the value property.
   *
   * When "auto", the format will be inferred from `value` when set.
   * @default "auto"
   */
  format: Format;
  handleFormatChange(format: CalciteColorPicker["format"]): void;
  /** When true, hides the hex input */
  hideHex: boolean;
  /** When true, hides the RGB/HSV channel inputs */
  hideChannels: boolean;
  /** When true, hides the saved colors section */
  hideSaved: boolean;
  /** Label used for the blue channel
   * @default "B"
   */
  intlB: string;
  /** Label used for the blue channel description
   * @default "Blue"
   */
  intlBlue: string;
  /** Label used for the delete color button.
   * @default "Delete color"
   */
  intlDeleteColor: string;
  /** Label used for the green channel
   * @default "G"
   */
  intlG: string;
  /** Label used for the green channel description
   * @default "Green"
   */
  intlGreen: string;
  /** Label used for the hue channel
   * @default "H"
   */
  intlH: string;
  /** Label used for the HSV mode
   * @default "HSV"
   */
  intlHsv: string;
  /** Label used for the hex input
   * @default "Hex"
   */
  intlHex: string;
  /** Label used for the hue channel description
   * @default "Hue"
   */
  intlHue: string;
  /**
   * Label used for the hex input when there is no color selected.
   * @default "No color"
   */
  intlNoColor: string;
  /** Label used for the red channel
   * @default "R"
   */
  intlR: string;
  /** Label used for the red channel description
   * @default "Red"
   */
  intlRed: string;
  /** Label used for the RGB mode
   * @default "RGB"
   */
  intlRgb: string;
  /** Label used for the saturation channel
   * @default "S"
   */
  intlS: string;
  /** Label used for the saturation channel description
   * @default "Saturation"
   */
  intlSaturation: string;
  /** Label used for the save color button.
   * @default "Save color"
   */
  intlSaveColor: string;
  /** Label used for the saved colors section
   * @default "Saved"
   */
  intlSaved: string;
  /** Label used for the value channel
   * @default "V"
   */
  intlV: string;
  /** Label used for the
   * @default "Value"
   */
  intlValue: string;
  /**
   * The scale of the color picker.
   */
  scale: Scale;
  handleScaleChange(scale?: Scale): void;
  /**
   * Storage ID for colors.
   */
  storageId: string;
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
  value: ColorValue | null;
  handleValueChange(value: ColorValue | null, oldValue: ColorValue | null): void;
  private get baseColorFieldColor();
  private activeColorFieldAndSliderRect;
  private colorUpdateLocked;
  private colorFieldAndSliderHovered;
  private fieldAndSliderRenderingContext;
  private colorFieldScopeNode;
  private hueThumbState;
  private previousColor;
  private mode;
  private shiftKeyChannelAdjustment;
  private sliderThumbState;
  colorFieldAndSliderInteractive: boolean;
  channelMode: ColorMode;
  channels: [number, number, number];
  dimensions: {
    slider: {
      height: number;
      width: number;
    };
    colorField: {
      height: number;
      width: number;
    }; /** specify the appearance - default (containing border), or minimal (no containing border) */
    thumb: {
      radius: number;
    };
  };
  savedColors: string[];
  colorFieldScopeTop: number;
  colorFieldScopeLeft: number;
  scopeOrientation: "vertical" | "horizontal";
  hueScopeLeft: number;
  hueScopeTop: number;
  /**
   * Fires when the color value has changed.
   */
  calciteColorPickerChange: EventEmitter;
  /**
   * Fires as the color value changes.
   *
   * This is similar to the change event with the exception of dragging. When dragging the color field or hue slider thumb, this event fires as the thumb is moved.
   */
  calciteColorPickerInput: EventEmitter;
  private handleTabActivate;
  private handleColorFieldScopeKeyDown;
  private handleHueScopeKeyDown;
  private handleHexInputChange;
  private handleSavedColorSelect;
  private handleChannelInput;
  protected handleChannelKeyUpOrDown(event: KeyboardEvent): void;
  private handleChannelChange;
  private handleSavedColorKeyDown;
  private handleColorFieldAndSliderMouseLeave;
  private handleColorFieldAndSliderMouseDown;
  private globalMouseUpHandler;
  private globalMouseMoveHandler;
  private handleColorFieldAndSliderMouseEnterOrMove;
  /** Sets focus on the component. */
  setFocus(): Promise<void>;
  componentWillLoad(): void;
  connectedCallback(): void;
  disconnectedCallback(): void;
  render(): VNode;
  private storeColorFieldScope;
  private renderChannelsTabTitle;
  private renderChannelsTab;
  private renderChannel;
  private captureHueSliderColor;
  private getCanvasRegion;
  private internalColorSet;
  private toValue;
  private getSliderCapSpacing;
  private updateDimensions;
  private deleteColor;
  private saveColor;
  private drawColorFieldAndSlider;
  private drawColorField;
  private setCanvasContextSize;
  private captureColorFieldColor;
  private initColorFieldAndSlider;
  private containsPoint;
  private drawActiveColorFieldColor;
  private drawThumb;
  private drawActiveHueSliderColor;
  private drawHueSlider;
  private updateColorFromChannels;
  private updateChannelsFromColor;
  private toChannels;
}
