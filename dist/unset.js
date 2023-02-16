"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unset = void 0;
function unset(data, path) {
    if (Array.isArray(data)) {
        for (let i = 0, len = data.length; i < len; i += 1) {
            unset(data[i], path);
        }
    }
    else if (typeof data === 'object') {
        if (data[path] === undefined) {
            const parts = path.split('.');
            if (Array.isArray(parts)) {
                const curr = parts.shift();
                if (parts.length > 0) {
                    unset(data[curr], parts.join('.'));
                }
                else {
                    delete data[curr];
                }
            }
        }
        else {
            delete data[path];
        }
    }
}
exports.unset = unset;
//# sourceMappingURL=unset.js.map