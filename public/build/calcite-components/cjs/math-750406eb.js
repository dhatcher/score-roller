'use strict';

const clamp = (value, min, max) => Math.max(min, Math.min(value, max));

exports.clamp = clamp;
