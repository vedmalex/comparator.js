var comparator = require('./lib/comparator.js');
var foldunfold = require('./lib/foldunfold.js');
exports.getComparator = comparator.getComparator;
exports.strictEq = comparator.strictEq;
exports.looseEq = comparator.looseEq;
exports.structureEq = comparator.structureEq;
exports.diff = comparator.diff;
exports.fold = foldunfold.fold;
exports.unfold = foldunfold.unfold;
exports.get = foldunfold.get;
exports.set = foldunfold.set;