import { VNode } from "../../stencil-public-runtime";
import { ComboboxChildElement } from "../calcite-combobox/interfaces";
import { Scale } from "../interfaces";
export declare class CalciteComboboxItemGroup {
  /** Parent and grandparent combobox items, this is set internally for use from combobox */
  ancestors: ComboboxChildElement[];
  /** Title of the group */
  label: string;
  connectedCallback(): void;
  el: HTMLCalciteComboboxItemGroupElement;
  guid: string;
  scale: Scale;
  render(): VNode;
}
