var comparator = require('./lib/comparator.js');
exports.getComparator = comparator.getComparator;
exports.strictEq = comparator.strictEq;
exports.looseEq = comparator.looseEq;
exports.structureEq = comparator.structureEq;
exports.diff = comparator.diff;
exports.fold = require('./lib/fold').fold;
exports.unfold = require('./lib/unfold').unfold;
exports.get = require('./lib/get').get;
exports.set = require('./lib/set').set;