'use strict';

const index = require('./index-318f3d91.js');

function constrainHeadingLevel(level) {
  return Math.min(Math.max(Math.ceil(level), 1), 6);
}
const CalciteHeading = (props, children) => {
  const HeadingTag = `h${props.level}`;
  delete props.level;
  return index.h(HeadingTag, Object.assign({}, props), children);
};

exports.CalciteHeading = CalciteHeading;
exports.constrainHeadingLevel = constrainHeadingLevel;
