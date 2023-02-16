"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fold = void 0;
const set_1 = require("./set");
function fold(data) {
    const result = {};
    const keys = Object.keys(data);
    for (let i = 0, len = keys.length; i < len; i += 1) {
        (0, set_1.set)(result, keys[i], data[keys[i]]);
    }
    return result;
}
exports.fold = fold;
//# sourceMappingURL=fold.js.map