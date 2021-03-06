import { Scale, Status } from "../interfaces";
import { EventEmitter, VNode } from "../../stencil-public-runtime";
import { InputPlacement } from "./interfaces";
import { Position } from "../interfaces";
/**
 * @slot action - A slot for positioning a button next to an input
 */
export declare class CalciteInput {
  el: HTMLCalciteInputElement;
  /** specify the alignment of the value of the input */
  alignment: Position;
  /** should the input autofocus */
  autofocus: boolean;
  /** optionally display a clear button that displays when field has a value
   * shows by default for search, time, date
   * will not display for type="textarea" */
  clearable?: boolean;
  /** is the input disabled  */
  disabled?: boolean;
  disabledWatcher(): void;
  /** for number values, displays the locale's group separator */
  groupSeparator: boolean;
  /** when used as a boolean set to true, show a default recommended icon for certain
   * input types (tel, password, email, date, time, search). You can also pass a
   * calcite-ui-icon name to this prop to display a requested icon for any input type */
  icon: string | boolean;
  /**
   * string to override English loading text
   * @default "Loading"
   */
  intlLoading?: string;
  /** flip the icon in rtl */
  iconFlipRtl?: boolean;
  /** Applies to the aria-label attribute on the button or hyperlink */
  label?: string;
  /** specify if the input is in loading state */
  loading: boolean;
  /** BCP 47 language tag for desired language and country format */
  locale?: string;
  /**
   * Toggles locale formatting for numbers.
   * @internal
   */
  localeFormat: boolean;
  /** input max */
  max?: number;
  /** watcher to update number-to-string for max */
  maxWatcher(): void;
  /** input min */
  min?: number;
  /** watcher to update number-to-string for min */
  minWatcher(): void;
  /**
   * Maximum length of text input.
   * @deprecated use maxLength instead
   */
  maxlength?: number;
  /** Maximum length of the input value */
  maxLength?: number;
  /** Minimum length of the text input */
  minLength?: number;
  /** The name of the input */
  name?: string;
  /** specify the placement of the number buttons */
  numberButtonType?: InputPlacement;
  /** explicitly whitelist placeholder attribute */
  placeholder: string;
  /** optionally add prefix  */
  prefixText?: string;
  /** is the input required */
  required: boolean;
  /** specify the scale of the input, defaults to m */
  scale: Scale;
  /** specify the status of the input field, determines message and icons */
  status: Status;
  /** input step */
  step?: number | "any";
  /** optionally add suffix  **/
  suffixText?: string;
  /**
   * specify the input type
   *
   * Note that the following types add type-specific icons by default: `date`, `email`, `password`, `search`, `tel`, `time`
   */
  type: "color" | "date" | "datetime-local" | "email" | "file" | "image" | "month" | "number" | "password" | "search" | "tel" | "text" | "textarea" | "time" | "url" | "week";
  /** input value */
  value?: string;
  valueWatcher(newValue: string): void;
  updateRequestedIcon(): void;
  /** keep track of the rendered child type */
  private childEl?;
  /** keep track of the rendered child type */
  private childElType?;
  /** number text input element for locale */
  private childNumberEl?;
  /** keep track of the initial value */
  private defaultValue;
  private form;
  get isClearable(): boolean;
  get isTextarea(): boolean;
  private minString?;
  private maxString?;
  private preFocusValue;
  /** the computed icon to render */
  private requestedIcon?;
  /** determine if there is a slotted action for styling purposes */
  private slottedActionEl?;
  localizedValue: string;
  connectedCallback(): void;
  disconnectedCallback(): void;
  componentWillLoad(): void;
  componentDidLoad(): void;
  componentShouldUpdate(newValue: any, oldValue: any, property: string): boolean;
  /**
   * @internal
   */
  calciteInputFocus: EventEmitter;
  /**
   * @internal
   */
  calciteInputBlur: EventEmitter;
  /**
   * This event fires each time a new value is typed.
   */
  calciteInputInput: EventEmitter;
  /**
   * This event fires each time a new value is typed and committed.
   * @internal
   */
  calciteInputChange: EventEmitter;
  keyDownHandler(event: KeyboardEvent): void;
  /** focus the rendered child element */
  setFocus(): Promise<void>;
  private clearInputValue;
  private inputBlurHandler;
  private inputFocusHandler;
  private inputInputHandler;
  private inputKeyDownHandler;
  private inputNumberInputHandler;
  private inputNumberKeyDownHandler;
  private nudgeNumberValue;
  private numberButtonClickHandler;
  private reset;
  private setChildElRef;
  private setChildNumberElRef;
  private setDisabledAction;
  private setLocalizedValue;
  private setValue;
  render(): VNode;
}
