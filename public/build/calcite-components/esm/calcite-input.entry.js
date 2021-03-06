import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-b3673963.js';
import { T as TEXT, s as setRequestedIcon, c as closestElementCrossShadowBoundary, d as getElementProp, g as getElementDir, C as CSS_UTILITY } from './dom-7b4de04f.js';
import { g as getKey, n as numberKeys } from './key-ec82f942.js';
import { d as delocalizeNumberString, g as getDecimalSeparator, l as localizeNumberString } from './locale-8436bbe1.js';
import { h as hiddenInputStyle } from './form-8aa0d95b.js';
import { i as isValidNumber, p as parseNumberString, a as isValidDecimal, s as sanitizeNumberString } from './number-358ca1d4.js';
import './guid-09142681.js';

const CSS = {
  loader: "calcite-input__loader",
  clearButton: "calcite-input__clear-button",
  inputIcon: "calcite-input__icon",
  prefix: "calcite-input__prefix",
  suffix: "calcite-input__suffix",
  numberButtonWrapper: "calcite-input__number-button-wrapper",
  buttonItemHorizontal: "calcite-input__number-button-item--horizontal",
  wrapper: "calcite-input__element-wrapper",
  inputWrapper: "calcite-input__wrapper",
  actionWrapper: "calcite-input__action-wrapper",
  resizeIconWrapper: "calcite-input__resize-icon-wrapper",
  numberButtonItem: "calcite-input__number-button-item"
};
const INPUT_TYPE_ICONS = {
  tel: "phone",
  password: "lock",
  email: "email-address",
  date: "calendar",
  time: "clock",
  search: "search"
};
const SLOTS = {
  action: "action"
};

const calciteInputCss = "@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}.sc-calcite-input:root{--calcite-animation-timing:300ms}.calcite-animate.sc-calcite-input{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in.sc-calcite-input{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down.sc-calcite-input{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up.sc-calcite-input{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale.sc-calcite-input{-webkit-animation-name:in-scale;animation-name:in-scale}.sc-calcite-input:root{--calcite-popper-transition:150ms ease-in-out}[hidden].sc-calcite-input-h{display:none}[scale=s].sc-calcite-input-h input.sc-calcite-input,[scale=s].sc-calcite-input-h .calcite-input__prefix.sc-calcite-input,[scale=s].sc-calcite-input-h .calcite-input__suffix.sc-calcite-input{font-size:var(--calcite-font-size--2);line-height:1rem;padding:0.5rem;height:1.5rem}[scale=s].sc-calcite-input-h textarea.sc-calcite-input{height:1.5rem;min-height:1.5rem}[scale=s].sc-calcite-input-h .calcite-input__number-button-wrapper.sc-calcite-input,[scale=s].sc-calcite-input-h .calcite-input__action-wrapper.sc-calcite-input calcite-button.sc-calcite-input,[scale=s].sc-calcite-input-h .calcite-input__action-wrapper.sc-calcite-input calcite-button.sc-calcite-input button.sc-calcite-input{height:1.5rem}[scale=s].sc-calcite-input-h input[type=file].sc-calcite-input{height:1.5rem}[scale=s].sc-calcite-input-h .calcite-input__clear-button.sc-calcite-input{min-height:1.5rem;min-width:1.5rem}[scale=s].sc-calcite-input-h textarea.sc-calcite-input{font-size:var(--calcite-font-size--2);line-height:1rem;padding-top:0.25rem;padding-bottom:0.25rem;padding-left:0.5rem;padding-right:0.5rem;height:auto}[scale=m].sc-calcite-input-h input.sc-calcite-input,[scale=m].sc-calcite-input-h .calcite-input__prefix.sc-calcite-input,[scale=m].sc-calcite-input-h .calcite-input__suffix.sc-calcite-input{font-size:var(--calcite-font-size--1);line-height:1rem;padding:0.75rem;height:2rem}[scale=m].sc-calcite-input-h textarea.sc-calcite-input{min-height:2rem}[scale=m].sc-calcite-input-h .calcite-input__number-button-wrapper.sc-calcite-input,[scale=m].sc-calcite-input-h .calcite-input__action-wrapper.sc-calcite-input calcite-button.sc-calcite-input,[scale=m].sc-calcite-input-h .calcite-input__action-wrapper.sc-calcite-input calcite-button.sc-calcite-input button.sc-calcite-input{height:2rem}[scale=m].sc-calcite-input-h input[type=file].sc-calcite-input{height:2rem}[scale=m].sc-calcite-input-h .calcite-input__clear-button.sc-calcite-input{min-height:2rem;min-width:2rem}[scale=m].sc-calcite-input-h textarea.sc-calcite-input{font-size:var(--calcite-font-size--1);line-height:1rem;padding-top:0.5rem;padding-bottom:0.5rem;padding-left:0.75rem;padding-right:0.75rem;height:auto}[scale=l].sc-calcite-input-h input.sc-calcite-input,[scale=l].sc-calcite-input-h .calcite-input__prefix.sc-calcite-input,[scale=l].sc-calcite-input-h .calcite-input__suffix.sc-calcite-input{font-size:var(--calcite-font-size-0);line-height:1.25rem;padding:1rem;height:2.75rem}[scale=l].sc-calcite-input-h textarea.sc-calcite-input{min-height:2.75rem}[scale=l].sc-calcite-input-h .calcite-input__number-button-wrapper.sc-calcite-input,[scale=l].sc-calcite-input-h .calcite-input__action-wrapper.sc-calcite-input calcite-button.sc-calcite-input,[scale=l].sc-calcite-input-h .calcite-input__action-wrapper.sc-calcite-input calcite-button.sc-calcite-input button.sc-calcite-input{height:2.75rem}[scale=l].sc-calcite-input-h input[type=file].sc-calcite-input{height:2.75rem}[scale=l].sc-calcite-input-h .calcite-input__clear-button.sc-calcite-input{min-height:2.75rem;min-width:2.75rem}[scale=l].sc-calcite-input-h textarea.sc-calcite-input{font-size:var(--calcite-font-size-0);line-height:1.25rem;padding-top:0.75rem;padding-bottom:0.75rem;padding-left:1rem;padding-right:1rem;height:auto}[disabled].sc-calcite-input-h{pointer-events:none}[disabled].sc-calcite-input-h .calcite-input__wrapper.sc-calcite-input{pointer-events:none;--text-opacity:var(--calcite-ui-opacity-disabled)}[disabled].sc-calcite-input-h button.sc-calcite-input,[disabled].sc-calcite-input-h textarea.sc-calcite-input,[disabled].sc-calcite-input-h input.sc-calcite-input{pointer-events:none}[disabled].sc-calcite-input-h textarea.sc-calcite-input{resize:none}.sc-calcite-input-h textarea.sc-calcite-input,.sc-calcite-input-h input.sc-calcite-input{-webkit-transition:150ms ease-in-out, height 0s;transition:150ms ease-in-out, height 0s;-webkit-appearance:none;width:100%;border-radius:0;position:relative;max-height:100%;max-width:100%;margin:0;font-weight:var(--calcite-font-weight-normal);font-family:inherit;-ms-flex:1 1 0%;flex:1 1 0%;display:-ms-flexbox;display:flex;color:var(--calcite-ui-text-1);-webkit-box-sizing:border-box;box-sizing:border-box;background-color:var(--calcite-ui-foreground-1)}.sc-calcite-input-h input[type=search].sc-calcite-input::-webkit-search-decoration{-webkit-appearance:none}.sc-calcite-input-h input.sc-calcite-input,.sc-calcite-input-h textarea.sc-calcite-input{color:var(--calcite-ui-text-1);border-width:1px;border-style:solid;border-color:var(--calcite-ui-border-input)}.sc-calcite-input-h input.sc-calcite-input:-ms-input-placeholder,.sc-calcite-input-h textarea.sc-calcite-input:-ms-input-placeholder{color:var(--calcite-ui-text-3);font-weight:var(--calcite-font-weight-normal)}.sc-calcite-input-h input.sc-calcite-input::-ms-input-placeholder,.sc-calcite-input-h textarea.sc-calcite-input::-ms-input-placeholder{color:var(--calcite-ui-text-3);font-weight:var(--calcite-font-weight-normal)}.sc-calcite-input-h input.sc-calcite-input::placeholder,.sc-calcite-input-h input.sc-calcite-input:-ms-input-placeholder,.sc-calcite-input-h input.sc-calcite-input::-ms-input-placeholder,.sc-calcite-input-h textarea.sc-calcite-input::placeholder,.sc-calcite-input-h textarea.sc-calcite-input:-ms-input-placeholder,.sc-calcite-input-h textarea.sc-calcite-input::-ms-input-placeholder{color:var(--calcite-ui-text-3);font-weight:var(--calcite-font-weight-normal)}.sc-calcite-input-h input.sc-calcite-input:focus,.sc-calcite-input-h textarea.sc-calcite-input:focus{border-color:var(--calcite-ui-brand);color:var(--calcite-ui-text-1)}.sc-calcite-input-h input[readonly].sc-calcite-input,.sc-calcite-input-h textarea[readonly].sc-calcite-input{background-color:var(--calcite-ui-background)}.sc-calcite-input-h input[readonly].sc-calcite-input:focus,.sc-calcite-input-h textarea[readonly].sc-calcite-input:focus{color:var(--calcite-ui-text-1)}.sc-calcite-input-h calcite-icon.sc-calcite-input{color:var(--calcite-ui-text-3)}.sc-calcite-input-h textarea.sc-calcite-input,.sc-calcite-input-h input.sc-calcite-input{outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}.sc-calcite-input-h textarea.sc-calcite-input:focus,.sc-calcite-input-h input.sc-calcite-input:focus{outline:2px solid var(--calcite-ui-brand);outline-offset:-2px}[status=invalid].sc-calcite-input-h input.sc-calcite-input,[status=invalid].sc-calcite-input-h textarea.sc-calcite-input{border-color:var(--calcite-ui-danger)}[status=invalid].sc-calcite-input-h input.sc-calcite-input:focus,[status=invalid].sc-calcite-input-h textarea.sc-calcite-input:focus{outline:2px solid var(--calcite-ui-danger);outline-offset:-2px}[scale=s].sc-calcite-input-h .calcite-input__icon.sc-calcite-input{left:0.5rem}[scale=s].sc-calcite-input-h .calcite--rtl.sc-calcite-input .calcite-input__icon.sc-calcite-input{left:unset;right:0.5rem}[scale=m].sc-calcite-input-h .calcite-input__icon.sc-calcite-input{left:0.75rem}[scale=m].sc-calcite-input-h .calcite--rtl.sc-calcite-input .calcite-input__icon.sc-calcite-input{left:unset;right:0.75rem}[scale=l].sc-calcite-input-h .calcite-input__icon.sc-calcite-input{left:1rem}[scale=l].sc-calcite-input-h .calcite--rtl.sc-calcite-input .calcite-input__icon.sc-calcite-input{left:unset;right:1rem}[icon][scale=s].sc-calcite-input-h input.sc-calcite-input{padding-left:2rem}[icon][scale=s].sc-calcite-input-h .calcite--rtl.sc-calcite-input input.sc-calcite-input{padding-right:2rem;padding-left:0.5rem}[icon][scale=m].sc-calcite-input-h input.sc-calcite-input{padding-left:2.5rem}[icon][scale=m].sc-calcite-input-h .calcite--rtl.sc-calcite-input input.sc-calcite-input{padding-right:2.5rem;padding-left:0.5rem}[icon][scale=l].sc-calcite-input-h input.sc-calcite-input{padding-left:3rem}[icon][scale=l].sc-calcite-input-h .calcite--rtl.sc-calcite-input input.sc-calcite-input{padding-right:3rem;padding-left:0.5rem}.calcite-input__element-wrapper.sc-calcite-input{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;-ms-flex:1 1 0%;flex:1 1 0%;position:relative;-ms-flex-order:3;order:3}.calcite-input__icon.sc-calcite-input{display:block;position:absolute;pointer-events:none;z-index:10;-webkit-transition-property:all;transition-property:all;-webkit-transition-duration:150ms;transition-duration:150ms;-webkit-transition-timing-function:ease-in-out;transition-timing-function:ease-in-out;-webkit-transition-delay:0s;transition-delay:0s}input[type=text].sc-calcite-input::-ms-clear,input[type=text].sc-calcite-input::-ms-reveal{display:none;width:0;height:0}input[type=search].sc-calcite-input::-webkit-search-decoration,input[type=search].sc-calcite-input::-webkit-search-cancel-button,input[type=search].sc-calcite-input::-webkit-search-results-button,input[type=search].sc-calcite-input::-webkit-search-results-decoration,input[type=date].sc-calcite-input::-webkit-clear-button,input[type=time].sc-calcite-input::-webkit-clear-button{display:none}.calcite-input__clear-button.sc-calcite-input{pointer-events:initial;outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;display:-ms-flexbox;display:flex;-ms-flex-item-align:stretch;align-self:stretch;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;-webkit-box-sizing:border-box;box-sizing:border-box;cursor:pointer;min-height:100%;border-width:1px;border-style:solid;border-color:var(--calcite-ui-border-input);background-color:var(--calcite-ui-foreground-1);border-left-width:0;-ms-flex-order:4;order:4}.calcite-input__clear-button.sc-calcite-input:hover{background-color:var(--calcite-ui-foreground-2);-webkit-transition-property:all;transition-property:all;-webkit-transition-duration:150ms;transition-duration:150ms;-webkit-transition-timing-function:ease-in-out;transition-timing-function:ease-in-out;-webkit-transition-delay:0s;transition-delay:0s}.calcite-input__clear-button.sc-calcite-input:hover calcite-icon.sc-calcite-input{color:var(--calcite-ui-text-1);-webkit-transition-property:all;transition-property:all;-webkit-transition-duration:150ms;transition-duration:150ms;-webkit-transition-timing-function:ease-in-out;transition-timing-function:ease-in-out;-webkit-transition-delay:0s;transition-delay:0s}.calcite-input__clear-button.sc-calcite-input:active{background-color:var(--calcite-ui-foreground-3)}.calcite-input__clear-button.sc-calcite-input:active calcite-icon.sc-calcite-input{color:var(--calcite-ui-text-1)}.calcite-input__clear-button.sc-calcite-input:disabled{opacity:var(--calcite-ui-opacity-disabled)}.calcite--rtl.sc-calcite-input .calcite-input__clear-button.sc-calcite-input{border-left-color:var(--calcite-ui-border-input);border-width:1px;border-right-width:0}.calcite-input__loader.sc-calcite-input{top:1px;left:1px;right:1px;display:block;pointer-events:none;position:absolute}.calcite-input__action-wrapper.sc-calcite-input{display:-ms-flexbox;display:flex;-ms-flex-order:7;order:7}.calcite-input__prefix.sc-calcite-input,.calcite-input__suffix.sc-calcite-input{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-line-pack:center;align-content:center;height:auto;min-height:100%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-box-sizing:border-box;box-sizing:border-box;font-weight:var(--calcite-font-weight-medium);border-width:1px;border-style:solid;border-color:var(--calcite-ui-border-input);background-color:var(--calcite-ui-background);color:var(--calcite-ui-text-2);line-height:1;word-wrap:break-word;overflow-wrap:break-word}.calcite-input__prefix.sc-calcite-input{-ms-flex-order:2;order:2;border-right-width:0}.calcite-input__suffix.sc-calcite-input{-ms-flex-order:5;order:5;border-left-width:0}.calcite--rtl.sc-calcite-input .calcite-input__prefix.sc-calcite-input{border-right-width:1px;border-left-width:0}.calcite--rtl.sc-calcite-input .calcite-input__suffix.sc-calcite-input{border-left-width:1px;border-right-width:0}[readonly].sc-calcite-input-h .calcite-input__number-button-item.sc-calcite-input{pointer-events:none}[alignment=start].sc-calcite-input-h textarea.sc-calcite-input,[alignment=start].sc-calcite-input-h input.sc-calcite-input{text-align:left}[alignment=start].sc-calcite-input-h .calcite--rtl.sc-calcite-input textarea.sc-calcite-input,[alignment=start].sc-calcite-input-h .calcite--rtl.sc-calcite-input input.sc-calcite-input{text-align:right}[alignment=end].sc-calcite-input-h textarea.sc-calcite-input,[alignment=end].sc-calcite-input-h input.sc-calcite-input{text-align:right}[alignment=end].sc-calcite-input-h .calcite--rtl.sc-calcite-input textarea.sc-calcite-input,[alignment=end].sc-calcite-input-h .calcite--rtl.sc-calcite-input input.sc-calcite-input{text-align:left}.sc-calcite-input-h input[type=number].sc-calcite-input{-moz-appearance:textfield}.sc-calcite-input-h input[type=number].sc-calcite-input::-webkit-inner-spin-button,.sc-calcite-input-h input[type=number].sc-calcite-input::-webkit-outer-spin-button{-webkit-appearance:none;-moz-appearance:textfield;margin:0}.calcite-input__number-button-wrapper.sc-calcite-input{-webkit-box-sizing:border-box;box-sizing:border-box;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;pointer-events:none;-ms-flex-order:6;order:6;-webkit-transition-property:all;transition-property:all;-webkit-transition-duration:150ms;transition-duration:150ms;-webkit-transition-timing-function:ease-in-out;transition-timing-function:ease-in-out;-webkit-transition-delay:0s;transition-delay:0s}[number-button-type=vertical].sc-calcite-input-h .calcite-input__wrapper.sc-calcite-input{-ms-flex-direction:row;flex-direction:row;display:-ms-flexbox;display:flex}[number-button-type=vertical].sc-calcite-input-h input.sc-calcite-input,[number-button-type=vertical].sc-calcite-input-h textarea.sc-calcite-input{-ms-flex-order:2;order:2}[number-button-type=horizontal].sc-calcite-input-h .calcite--rtl.sc-calcite-input .calcite-input__number-button-item[data-adjustment=down].sc-calcite-input calcite-icon.sc-calcite-input{-webkit-transform:rotate(-90deg);transform:rotate(-90deg)}[number-button-type=horizontal].sc-calcite-input-h .calcite--rtl.sc-calcite-input .calcite-input__number-button-item[data-adjustment=up].sc-calcite-input calcite-icon.sc-calcite-input{-webkit-transform:rotate(-90deg);transform:rotate(-90deg)}.calcite-input__number-button-item.calcite-input__number-button-item--horizontal[data-adjustment=down].sc-calcite-input,.calcite-input__number-button-item.calcite-input__number-button-item--horizontal[data-adjustment=up].sc-calcite-input{min-height:100%;max-height:100%;-ms-flex-order:1;order:1;-ms-flex-item-align:stretch;align-self:stretch}.calcite-input__number-button-item.calcite-input__number-button-item--horizontal[data-adjustment=down].sc-calcite-input calcite-icon.sc-calcite-input,.calcite-input__number-button-item.calcite-input__number-button-item--horizontal[data-adjustment=up].sc-calcite-input calcite-icon.sc-calcite-input{-webkit-transform:rotate(90deg);transform:rotate(90deg)}.calcite-input__number-button-item.calcite-input__number-button-item--horizontal[data-adjustment=down].sc-calcite-input{border-width:1px;border-style:solid;border-color:var(--calcite-ui-border-input);border-right-width:0}.calcite-input__number-button-item.calcite-input__number-button-item--horizontal[data-adjustment=up].sc-calcite-input{-ms-flex-order:5;order:5}.calcite--rtl.sc-calcite-input .calcite-input__number-button-item.calcite-input__number-button-item--horizontal[data-adjustment=down].sc-calcite-input{border-width:1px;border-left-width:0;border-color:var(--calcite-ui-border-input)}.calcite--rtl.sc-calcite-input .calcite-input__number-button-item.calcite-input__number-button-item--horizontal[data-adjustment=up].sc-calcite-input{border-width:1px;border-right-width:0;border-color:var(--calcite-ui-border-input)}[number-button-type=vertical].sc-calcite-input-h .calcite-input__number-button-item[data-adjustment=down].sc-calcite-input,[number-button-type=vertical].sc-calcite-input-h .calcite--rtl.sc-calcite-input .calcite-input__number-button-item[data-adjustment=down].sc-calcite-input{border-top-width:0}.calcite-input__number-button-item.sc-calcite-input{max-height:50%;min-height:50%;pointer-events:initial;display:-ms-flexbox;display:flex;-ms-flex-item-align:center;align-self:center;-ms-flex-align:center;align-items:center;-webkit-box-sizing:border-box;box-sizing:border-box;cursor:pointer;padding-top:0;padding-bottom:0;padding-left:0.5rem;padding-right:0.5rem;border-width:1px;border-style:solid;border-color:var(--calcite-ui-border-input);background-color:var(--calcite-ui-foreground-1);border-left-width:0;-webkit-transition-property:all;transition-property:all;-webkit-transition-duration:150ms;transition-duration:150ms;-webkit-transition-timing-function:ease-in-out;transition-timing-function:ease-in-out;-webkit-transition-delay:0s;transition-delay:0s}.calcite-input__number-button-item.sc-calcite-input calcite-icon.sc-calcite-input{pointer-events:none;-webkit-transition-property:all;transition-property:all;-webkit-transition-duration:150ms;transition-duration:150ms;-webkit-transition-timing-function:ease-in-out;transition-timing-function:ease-in-out;-webkit-transition-delay:0s;transition-delay:0s}.calcite-input__number-button-item.sc-calcite-input:hover,.calcite-input__number-button-item.sc-calcite-input:focus{background-color:var(--calcite-ui-foreground-2)}.calcite-input__number-button-item.sc-calcite-input:hover calcite-icon.sc-calcite-input,.calcite-input__number-button-item.sc-calcite-input:focus calcite-icon.sc-calcite-input{color:var(--calcite-ui-text-1)}.calcite-input__number-button-item.sc-calcite-input:active{background-color:var(--calcite-ui-foreground-3)}[number-button-type=vertical].sc-calcite-input-h .calcite--rtl.sc-calcite-input .calcite-input__number-button-item.sc-calcite-input{border-width:1px;border-style:solid;border-color:var(--calcite-ui-border-input);border-right-width:0}.calcite-input__wrapper.sc-calcite-input{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;-ms-flex-align:center;align-items:center;position:relative}.sc-calcite-input-h input.sc-calcite-input::-webkit-calendar-picker-indicator{display:none}.sc-calcite-input-h input[type=date].sc-calcite-input::-webkit-input-placeholder{visibility:hidden !important}.sc-calcite-input-h textarea.sc-calcite-input::-webkit-resizer{-webkit-box-sizing:border-box;box-sizing:border-box;position:absolute;bottom:0;right:0;padding-top:0;padding-bottom:0;padding-left:0.25rem;padding-right:0.25rem}@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none){.calcite-input__resize-icon-wrapper.sc-calcite-input{display:none}}.calcite-input__resize-icon-wrapper.sc-calcite-input{bottom:2px;right:2px;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-3);position:absolute;z-index:10;pointer-events:none;width:0.75rem;height:0.75rem}.calcite-input__resize-icon-wrapper.sc-calcite-input calcite-icon.sc-calcite-input{bottom:0.25rem;right:0.25rem;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.calcite--rtl.sc-calcite-input textarea.sc-calcite-input::-webkit-resizer{right:unset;left:0}.calcite--rtl.sc-calcite-input .calcite-input__resize-icon-wrapper.sc-calcite-input{left:2px;right:unset}.calcite--rtl.sc-calcite-input .calcite-input__resize-icon-wrapper.sc-calcite-input calcite-icon.sc-calcite-input{bottom:0.25rem;right:0.25rem;-webkit-transform:rotate(45deg);transform:rotate(45deg)}[type=file].sc-calcite-input-h input.sc-calcite-input{background-color:var(--calcite-ui-foreground-1);cursor:pointer;border-width:1px;border-style:dashed;border-color:var(--calcite-ui-border-input);text-align:center}[type=file][scale=s].sc-calcite-input-h input.sc-calcite-input{padding-top:1px;padding-bottom:1px;padding-left:0.5rem;padding-right:0.5rem}[type=file][scale=m].sc-calcite-input-h input.sc-calcite-input{padding-top:0.25rem;padding-bottom:0.25rem;padding-left:0.75rem;padding-right:0.75rem}[type=file][scale=l].sc-calcite-input-h input.sc-calcite-input{padding-top:0.5rem;padding-bottom:0.5rem;padding-left:1rem;padding-right:1rem}.no-bottom-border.sc-calcite-input-h input.sc-calcite-input.sc-calcite-input{border-bottom-width:0}.border-t-color-1.sc-calcite-input-h input.sc-calcite-input.sc-calcite-input{border-top-color:var(--calcite-ui-border-1)}";

const CalciteInput = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteInputFocus = createEvent(this, "calciteInputFocus", 7);
    this.calciteInputBlur = createEvent(this, "calciteInputBlur", 7);
    this.calciteInputInput = createEvent(this, "calciteInputInput", 7);
    this.calciteInputChange = createEvent(this, "calciteInputChange", 7);
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------
    /** specify the alignment of the value of the input */
    this.alignment = "start";
    /** should the input autofocus */
    this.autofocus = false;
    /** for number values, displays the locale's group separator */
    this.groupSeparator = false;
    /**
     * string to override English loading text
     * @default "Loading"
     */
    this.intlLoading = TEXT.loading;
    /** specify if the input is in loading state */
    this.loading = false;
    /** BCP 47 language tag for desired language and country format */
    this.locale = document.documentElement.lang || "en";
    /**
     * Toggles locale formatting for numbers.
     * @internal
     */
    this.localeFormat = false;
    /** specify the placement of the number buttons */
    this.numberButtonType = "vertical";
    /** is the input required */
    this.required = false;
    /** specify the scale of the input, defaults to m */
    this.scale = "m";
    /** specify the status of the input field, determines message and icons */
    this.status = "idle";
    /**
     * specify the input type
     *
     * Note that the following types add type-specific icons by default: `date`, `email`, `password`, `search`, `tel`, `time`
     */
    this.type = "text";
    /** keep track of the rendered child type */
    this.childElType = "input";
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    this.clearInputValue = (nativeEvent) => {
      this.setValue(null, nativeEvent, true);
    };
    this.inputBlurHandler = () => {
      if (this.type === "number") {
        this.setLocalizedValue(this.value);
      }
      this.calciteInputBlur.emit({
        element: this.childEl,
        value: this.value
      });
      if (this.preFocusValue !== this.value) {
        this.calciteInputChange.emit();
      }
    };
    this.inputFocusHandler = (event) => {
      if (event.target !== this.slottedActionEl) {
        this.setFocus();
      }
      this.calciteInputFocus.emit({
        element: this.childEl,
        value: this.value
      });
      this.preFocusValue = this.value;
    };
    this.inputInputHandler = (nativeEvent) => {
      this.setValue(nativeEvent.target.value, nativeEvent);
    };
    this.inputKeyDownHandler = (event) => {
      if (event.key === "Enter") {
        this.calciteInputChange.emit();
      }
    };
    this.inputNumberInputHandler = (nativeEvent) => {
      const value = nativeEvent.target.value;
      const delocalizedValue = delocalizeNumberString(value, this.locale);
      if (nativeEvent.inputType === "insertFromPaste") {
        if (!isValidNumber(delocalizedValue)) {
          nativeEvent.preventDefault();
        }
        this.setValue(parseNumberString(delocalizedValue), nativeEvent);
        this.childNumberEl.value = this.localizedValue;
      }
      else {
        this.setValue(delocalizeNumberString(value, this.locale), nativeEvent);
      }
    };
    this.inputNumberKeyDownHandler = (event) => {
      if (this.type !== "number") {
        return;
      }
      if (event.key === "ArrowUp") {
        this.nudgeNumberValue("up", event);
        return;
      }
      if (event.key === "ArrowDown") {
        this.nudgeNumberValue("down", event);
        return;
      }
      const supportedKeys = [
        ...numberKeys,
        "ArrowLeft",
        "ArrowRight",
        "Backspace",
        "Delete",
        "Enter",
        "Escape",
        "Tab",
        "-"
      ];
      if (event.altKey || event.ctrlKey || event.metaKey) {
        return;
      }
      const isShiftTabEvent = event.shiftKey && event.key === "Tab";
      if (supportedKeys.includes(event.key) &&
        (!event.shiftKey || isShiftTabEvent) &&
        !(parseInt(this.value) === 0 && getKey(event.key) === "0")) {
        if (event.key === "Enter") {
          this.calciteInputChange.emit();
        }
        return;
      }
      const decimalSeparator = getDecimalSeparator(this.locale);
      if (event.key === decimalSeparator &&
        isValidDecimal(this.step === "any" ? 1 : this.step)) {
        if (!this.value && !this.childNumberEl.value) {
          return;
        }
        if (this.value && this.childNumberEl.value.indexOf(decimalSeparator) === -1) {
          return;
        }
      }
      event.preventDefault();
    };
    this.nudgeNumberValue = (direction, nativeEvent) => {
      var _a, _b;
      if (this.type !== "number") {
        return;
      }
      const decimals = ((_b = (_a = this.value) === null || _a === void 0 ? void 0 : _a.split(".")[1]) === null || _b === void 0 ? void 0 : _b.length) || 0;
      const inputMax = this.maxString ? parseFloat(this.maxString) : null;
      const inputMin = this.minString ? parseFloat(this.minString) : null;
      const inputStep = this.step === "any" ? 1 : Math.abs(this.step || 1);
      let inputVal = this.value && this.value !== "" ? parseFloat(this.value) : 0;
      let newValue = this.value;
      if (direction === "up" && ((!inputMax && inputMax !== 0) || inputVal < inputMax)) {
        newValue = (inputVal += inputStep).toFixed(decimals).toString();
      }
      if (direction === "down" && ((!inputMin && inputMin !== 0) || inputVal > inputMin)) {
        newValue = (inputVal -= inputStep).toFixed(decimals).toString();
      }
      this.setValue(newValue, nativeEvent, true);
    };
    this.numberButtonClickHandler = (event) => {
      // todo, when dropping ie11 support, refactor to use stepup/stepdown
      // prevent blur and re-focus of input on mousedown
      event.preventDefault();
      const direction = event.target.dataset.adjustment;
      this.nudgeNumberValue(direction, event);
    };
    this.reset = (nativeEvent) => {
      if (this.type === "number") {
        nativeEvent.preventDefault();
      }
      this.setValue(this.defaultValue, nativeEvent);
    };
    this.setChildElRef = (el) => {
      this.childEl = el;
    };
    this.setChildNumberElRef = (el) => {
      this.childNumberEl = el;
    };
    this.setLocalizedValue = (value) => {
      this.localizedValue = localizeNumberString(value, this.locale, this.groupSeparator);
    };
    this.setValue = (value, nativeEvent, committing = false) => {
      const previousValue = this.value;
      this.value = this.type === "number" ? sanitizeNumberString(value) : value;
      if (this.type === "number") {
        this.setLocalizedValue(this.value);
      }
      if (nativeEvent) {
        if (this.type === "number" && (value === null || value === void 0 ? void 0 : value.endsWith("."))) {
          return;
        }
        const calciteInputInputEvent = this.calciteInputInput.emit({
          element: this.childEl,
          nativeEvent,
          value
        });
        if (calciteInputInputEvent.defaultPrevented) {
          this.value = previousValue;
          this.setLocalizedValue(previousValue);
        }
        else if (committing) {
          this.calciteInputChange.emit();
        }
      }
    };
  }
  disabledWatcher() {
    this.setDisabledAction();
  }
  /** watcher to update number-to-string for max */
  maxWatcher() {
    var _a;
    this.maxString = ((_a = this.max) === null || _a === void 0 ? void 0 : _a.toString()) || null;
  }
  /** watcher to update number-to-string for min */
  minWatcher() {
    var _a;
    this.minString = ((_a = this.min) === null || _a === void 0 ? void 0 : _a.toString()) || null;
  }
  valueWatcher(newValue) {
    if (this.type === "number" &&
      this.localizedValue !== localizeNumberString(newValue, this.locale)) {
      this.setLocalizedValue(newValue);
    }
    else if (this.childEl && this.childEl.value !== newValue) {
      this.childEl.value = newValue;
    }
  }
  updateRequestedIcon() {
    this.requestedIcon = setRequestedIcon(INPUT_TYPE_ICONS, this.icon, this.type);
  }
  get isClearable() {
    var _a;
    return !this.isTextarea && (this.clearable || this.type === "search") && ((_a = this.value) === null || _a === void 0 ? void 0 : _a.length) > 0;
  }
  get isTextarea() {
    return this.childElType === "textarea";
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    var _a;
    this.form = closestElementCrossShadowBoundary(this.el, "form");
    (_a = this.form) === null || _a === void 0 ? void 0 : _a.addEventListener("reset", this.reset);
    this.scale = getElementProp(this.el, "scale", this.scale);
    this.status = getElementProp(this.el, "status", this.status);
    this.step = !this.step && this.type === "number" ? "any" : this.step;
    if (this.type === "number" && this.value) {
      if (isValidNumber(this.value)) {
        this.localizedValue = localizeNumberString(this.value, this.locale, this.groupSeparator);
      }
      else {
        this.value = undefined;
      }
    }
  }
  disconnectedCallback() {
    var _a;
    (_a = this.form) === null || _a === void 0 ? void 0 : _a.removeEventListener("reset", this.reset);
  }
  componentWillLoad() {
    var _a, _b;
    this.childElType = this.type === "textarea" ? "textarea" : "input";
    this.defaultValue = this.value;
    this.maxString = (_a = this.max) === null || _a === void 0 ? void 0 : _a.toString();
    this.minString = (_b = this.min) === null || _b === void 0 ? void 0 : _b.toString();
    this.requestedIcon = setRequestedIcon(INPUT_TYPE_ICONS, this.icon, this.type);
  }
  componentDidLoad() {
    this.slottedActionEl = this.el.querySelector("[slot=action]");
    this.setDisabledAction();
    if (this.type === "number" && this.childEl) {
      this.childEl.style.cssText = hiddenInputStyle;
    }
  }
  componentShouldUpdate(newValue, oldValue, property) {
    if (this.type === "number" && property === "value" && newValue && !isValidNumber(newValue)) {
      this.value = oldValue;
      return false;
    }
    return true;
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  keyDownHandler(event) {
    if (this.isClearable && getKey(event.key) === "Escape") {
      this.clearInputValue(event);
      event.preventDefault();
    }
  }
  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  /** focus the rendered child element */
  async setFocus() {
    var _a, _b;
    if (this.type === "number") {
      (_a = this.childNumberEl) === null || _a === void 0 ? void 0 : _a.focus();
    }
    else {
      (_b = this.childEl) === null || _b === void 0 ? void 0 : _b.focus();
    }
  }
  setDisabledAction() {
    if (!this.slottedActionEl) {
      return;
    }
    const slottedActionEl = this.slottedActionEl;
    this.disabled
      ? slottedActionEl.setAttribute("disabled", "")
      : slottedActionEl.removeAttribute("disabled");
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  render() {
    const dir = getElementDir(this.el);
    const loader = (h("div", { class: CSS.loader }, h("calcite-progress", { label: this.intlLoading, type: "indeterminate" })));
    const inputClearButton = (h("button", { class: CSS.clearButton, disabled: this.disabled, onClick: this.clearInputValue, tabIndex: this.disabled ? -1 : 0, type: "button" }, h("calcite-icon", { icon: "x", scale: "s" })));
    const iconEl = (h("calcite-icon", { class: CSS.inputIcon, dir: dir, flipRtl: this.iconFlipRtl, icon: this.requestedIcon, scale: "s" }));
    const isHorizontalNumberButton = this.numberButtonType === "horizontal";
    const numberButtonsHorizontalUp = (h("button", { class: {
        [CSS.numberButtonItem]: true,
        [CSS.buttonItemHorizontal]: isHorizontalNumberButton
      }, "data-adjustment": "up", disabled: this.disabled, onClick: this.numberButtonClickHandler, tabIndex: -1, type: "button" }, h("calcite-icon", { icon: "chevron-up", scale: "s" })));
    const numberButtonsHorizontalDown = (h("button", { class: {
        [CSS.numberButtonItem]: true,
        [CSS.buttonItemHorizontal]: isHorizontalNumberButton
      }, "data-adjustment": "down", disabled: this.disabled, onClick: this.numberButtonClickHandler, tabIndex: -1, type: "button" }, h("calcite-icon", { icon: "chevron-down", scale: "s" })));
    const numberButtonsVertical = (h("div", { class: CSS.numberButtonWrapper }, numberButtonsHorizontalUp, numberButtonsHorizontalDown));
    const prefixText = h("div", { class: CSS.prefix }, this.prefixText);
    const suffixText = h("div", { class: CSS.suffix }, this.suffixText);
    const localeNumberInput = this.type === "number" ? (h("input", { "aria-label": this.label, autofocus: this.autofocus ? true : null, defaultValue: this.defaultValue, disabled: this.disabled ? true : null, key: "localized-input", maxLength: this.maxLength, minLength: this.minLength, name: undefined, onBlur: this.inputBlurHandler, onFocus: this.inputFocusHandler, onInput: this.inputNumberInputHandler, onKeyDown: this.inputNumberKeyDownHandler, placeholder: this.placeholder || "", ref: this.setChildNumberElRef, tabIndex: this.disabled ? -1 : 0, type: "text", value: this.localizedValue })) : null;
    const childEl = [
      h(this.childElType, { "aria-label": this.label, autofocus: this.autofocus ? true : null, defaultValue: this.defaultValue, disabled: this.disabled ? true : null, max: this.maxString, maxLength: this.maxLength, min: this.minString, minLength: this.minLength, name: this.name, onBlur: this.inputBlurHandler, onFocus: this.inputFocusHandler, onInput: this.inputInputHandler, onKeyDown: this.inputKeyDownHandler, placeholder: this.placeholder || "", ref: this.setChildElRef, required: this.required ? true : null, step: this.step, tabIndex: this.disabled || this.type === "number" ? -1 : null, type: this.type, value: this.value }),
      this.isTextarea ? (h("div", { class: CSS.resizeIconWrapper }, h("calcite-icon", { icon: "chevron-down", scale: "s" }))) : null
    ];
    return (h(Host, { onClick: this.inputFocusHandler }, h("div", { class: { [CSS.inputWrapper]: true, [CSS_UTILITY.rtl]: dir === "rtl" }, dir: dir }, this.type === "number" && this.numberButtonType === "horizontal"
      ? numberButtonsHorizontalDown
      : null, this.prefixText ? prefixText : null, h("div", { class: CSS.wrapper }, localeNumberInput, childEl, this.isClearable ? inputClearButton : null, this.requestedIcon ? iconEl : null, this.loading ? loader : null), h("div", { class: CSS.actionWrapper }, h("slot", { name: SLOTS.action })), this.type === "number" && this.numberButtonType === "vertical"
      ? numberButtonsVertical
      : null, this.suffixText ? suffixText : null, this.type === "number" && this.numberButtonType === "horizontal"
      ? numberButtonsHorizontalUp
      : null)));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "disabled": ["disabledWatcher"],
    "max": ["maxWatcher"],
    "min": ["minWatcher"],
    "value": ["valueWatcher"],
    "icon": ["updateRequestedIcon"],
    "type": ["updateRequestedIcon"]
  }; }
};
CalciteInput.style = calciteInputCss;

export { CalciteInput as calcite_input };
