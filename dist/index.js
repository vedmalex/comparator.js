"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.has = exports.unset = exports.set = exports.get = exports.unfold = exports.fold = exports.diff = exports.structureEq = exports.looseEq = exports.strictEq = exports.getComparator = void 0;
var comparator_1 = require("./comparator");
Object.defineProperty(exports, "getComparator", { enumerable: true, get: function () { return comparator_1.getComparator; } });
Object.defineProperty(exports, "strictEq", { enumerable: true, get: function () { return comparator_1.strictEq; } });
Object.defineProperty(exports, "looseEq", { enumerable: true, get: function () { return comparator_1.looseEq; } });
Object.defineProperty(exports, "structureEq", { enumerable: true, get: function () { return comparator_1.structureEq; } });
Object.defineProperty(exports, "diff", { enumerable: true, get: function () { return comparator_1.diff; } });
var fold_1 = require("./fold");
Object.defineProperty(exports, "fold", { enumerable: true, get: function () { return fold_1.fold; } });
var unfold_1 = require("./unfold");
Object.defineProperty(exports, "unfold", { enumerable: true, get: function () { return unfold_1.unfold; } });
var get_1 = require("./get");
Object.defineProperty(exports, "get", { enumerable: true, get: function () { return get_1.get; } });
var set_1 = require("./set");
Object.defineProperty(exports, "set", { enumerable: true, get: function () { return set_1.set; } });
var unset_1 = require("./unset");
Object.defineProperty(exports, "unset", { enumerable: true, get: function () { return unset_1.unset; } });
var has_1 = require("./has");
Object.defineProperty(exports, "has", { enumerable: true, get: function () { return has_1.has; } });
//# sourceMappingURL=index.js.map