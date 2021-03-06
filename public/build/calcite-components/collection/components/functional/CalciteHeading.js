import { h } from "@stencil/core";
export function constrainHeadingLevel(level) {
  return Math.min(Math.max(Math.ceil(level), 1), 6);
}
export const CalciteHeading = (props, children) => {
  const HeadingTag = `h${props.level}`;
  delete props.level;
  return h(HeadingTag, Object.assign({}, props), children);
};
