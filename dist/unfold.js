"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unfold = void 0;
function unfold(data, _result, _propName) {
    const result = _result || {};
    const propName = _propName || '';
    let i;
    let len;
    if (Array.isArray(data)) {
        for (i = 0, len = data.length; i < len; i += 1) {
            unfold(data[i], result, (propName ? `${propName}.` : '') + i);
        }
    }
    else if (data && data.constructor === Object) {
        const keys = Object.keys(data);
        for (i = 0, len = keys.length; i < len; i += 1) {
            unfold(data[keys[i]], result, (propName ? `${propName}.` : '') + keys[i]);
        }
    }
    else {
        result[propName] = data;
    }
    return result;
}
exports.unfold = unfold;
//# sourceMappingURL=unfold.js.map