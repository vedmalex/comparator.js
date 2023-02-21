const comparator = require('./comparator')

exports.getComparator = comparator.getComparator
exports.strictEq = comparator.strictEq
exports.looseEq = comparator.looseEq
exports.structureEq = comparator.structureEq
exports.diff = comparator.diff
exports.fold = require('./fold').fold
exports.unfold = require('./unfold').unfold
exports.get = require('./get').get
exports.set = require('./set').set
exports.unset = require('./unset').unset
exports.has = require('./has').has
