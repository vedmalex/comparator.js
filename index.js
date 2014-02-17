var comparator = require('./lib/comparator.js');
exports.getComparator = comparator.getComparator;
exports.strictEq = comparator.strictEq;
exports.looseEq = comparator.looseEq;
exports.structureEq = comparator.structureEq;
exports.diff = comparator.diff;