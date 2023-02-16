"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diff = exports.structureEq = exports.looseEq = exports.strictEq = exports.getType = exports.getComparator = exports.Equality = exports.EqResult = void 0;
var EqResult;
(function (EqResult) {
    EqResult[EqResult["NOT_EQUAL"] = 0] = "NOT_EQUAL";
    EqResult[EqResult["STRICT"] = 1] = "STRICT";
    EqResult[EqResult["LOOSE"] = 2] = "LOOSE";
    EqResult[EqResult["STRUCTURE"] = 3] = "STRUCTURE";
})(EqResult = exports.EqResult || (exports.EqResult = {}));
exports.Equality = {
    false: () => false,
    true: () => true,
    NOT_EQUAL: 0,
    STRICT: 1,
    LOOSE: 2,
    STRUCTURE: 3,
    diffValue: (a, b) => {
        if (a === b)
            return {
                result: exports.Equality.STRICT,
                value: b,
            };
        if (a != null && b != null && a.valueOf() === b.valueOf())
            return {
                result: exports.Equality.LOOSE,
                from: a,
                to: b,
            };
        return {
            result: exports.Equality.NOT_EQUAL,
            from: a,
            to: b,
        };
    },
    diffString: (a, b) => {
        if (a === b)
            return {
                result: exports.Equality.STRICT,
                value: b,
            };
        if (a.toString() == b.toString())
            return {
                result: exports.Equality.LOOSE,
                from: a,
                to: b,
            };
        return {
            result: exports.Equality.NOT_EQUAL,
            from: a,
            to: b,
        };
    },
    eqObject: (config) => {
        if (config.strict) {
            return (source, dest, compare) => {
                if (source == dest)
                    return true;
                const ks = Object.keys(source);
                const kd = Object.keys(dest);
                let key;
                const so = ks.toString() == kd.toString();
                if (so) {
                    for (let i = 0, len = ks.length; i < len; i += 1) {
                        key = ks[i];
                        if (!compare(source[key], dest[key]))
                            return false;
                    }
                }
                else {
                    return false;
                }
                return true;
            };
        }
        if (config.loose) {
            return (source, dest, compare) => {
                if (source == dest)
                    return true;
                const ks = Object.keys(source);
                let key;
                for (let i = 0, len = ks.length; i < len; i += 1) {
                    key = ks[i];
                    if (!compare(source[key], dest[key])) {
                        return false;
                    }
                }
                return true;
            };
        }
        if (config.structure) {
            return (source, dest, compare) => {
                if (source == dest)
                    return true;
                const ks = Object.keys(source);
                const kd = Object.keys(dest);
                let i;
                let len;
                let key;
                if (ks.length > kd.length)
                    return false;
                const so = ks.toString() == kd.toString();
                if (so) {
                    for (i = 0, len = ks.length; i < len; i += 1) {
                        key = ks[i];
                        if (!compare(source[key], dest[key]))
                            return false;
                    }
                }
                else {
                    const ksd = Object.keys(source).sort();
                    const passed = {};
                    for (i = 0, len = ksd.length; i < len; i += 1) {
                        key = ksd[i];
                        passed[key] = 1;
                        if (!compare(source[key], dest[key]))
                            return false;
                    }
                    if (Object.keys(passed).sort().toString() != ksd.toString())
                        return false;
                }
                return true;
            };
        }
        if (config.diff) {
            return (source, dest, compare) => {
                if (source == dest)
                    return {
                        result: 1,
                        value: dest,
                    };
                const result = {};
                let i;
                let len;
                let key;
                let ret;
                const ks = Object.keys(source);
                const kd = Object.keys(dest);
                const so = ks.toString() == kd.toString();
                if (so) {
                    result.result = 1;
                    for (i = 0, len = ks.length; i < len; i += 1) {
                        key = ks[i];
                        result[key] = compare(source[key], dest[key]);
                        ret = result[key];
                        if (ret.result === 0)
                            ret.result = 3;
                        if (ret.result > 0 && result.result < ret.result)
                            result.result = ret.result;
                    }
                }
                else {
                    result.result = 1;
                    const ksd = Object.keys(source).sort();
                    const kss = Object.keys(dest).sort();
                    result.reorder = ks.toString() != kd.toString();
                    const passed = {};
                    let srcI;
                    let dstI;
                    for (i = 0, len = ksd.length; i < len; i += 1) {
                        key = ksd[i];
                        passed[key] = true;
                        srcI = ks.indexOf(key);
                        dstI = kd.indexOf(key);
                        if (dstI >= 0) {
                            result[key] = {};
                            if (srcI != dstI)
                                result[key].order = {
                                    from: ks.indexOf(key),
                                    to: kd.indexOf(key),
                                };
                            result[key].value = compare(source[key], dest[key]);
                            ret = result[key].value;
                            if (ret.result === 0)
                                ret.result = 3;
                            if (ret.result > 0 && result.result < ret.result)
                                result.result = ret.result;
                        }
                        else {
                            result.result = 0;
                            if (!result.removed)
                                result.removed = {};
                            result.removed[key] = {
                                order: ks.indexOf(key),
                                value: source[key],
                            };
                        }
                    }
                    for (i = 0, len = kss.length; i < len; i += 1) {
                        key = kss[i];
                        if (passed[key] !== true) {
                            passed[key] = true;
                            if (!result.inserted)
                                result.inserted = {};
                            result.inserted[key] = {
                                order: kd.indexOf(key),
                                value: dest[key],
                            };
                        }
                    }
                }
                return result;
            };
        }
    },
    eqArray: (config) => {
        if (config.strict || config.structure) {
            return (source, dest, compare) => {
                if (source == dest)
                    return {
                        result: 1,
                        value: dest,
                    };
                if (source && dest && source.length == dest.length) {
                    for (let i = 0, len = source.length; i < len; i += 1) {
                        if (!compare(source[i], dest[i]))
                            return false;
                    }
                    return true;
                }
                return false;
            };
        }
        if (config.loose) {
            return (source, dest, compare) => {
                if (source == dest)
                    return {
                        result: 1,
                        value: dest,
                    };
                let val;
                let i;
                let len;
                const foundItems = [];
                foundItems.length =
                    source.length > dest.length ? source.length : dest.length;
                if (source && dest && source.length <= dest.length) {
                    for (i = 0, len = source.length; i < len; i += 1) {
                        val = source[i];
                        let rec;
                        let cmpRes;
                        let found;
                        for (let j = 0, dstlen = dest.length; j < dstlen; j += 1) {
                            rec = dest[j];
                            cmpRes = compare(val, rec);
                            if (cmpRes) {
                                found = rec;
                                if (!foundItems[j])
                                    break;
                            }
                            else {
                                found = undefined;
                            }
                        }
                        if (!found)
                            return false;
                    }
                    return true;
                }
                return false;
            };
        }
        if (config.diff) {
            return (source, dest, compare) => {
                if (source == dest) {
                    return {
                        result: 1,
                        value: dest,
                    };
                }
                if (JSON.stringify(source) == JSON.stringify(dest)) {
                    return {
                        result: 1,
                        value: dest,
                    };
                }
                const result = {
                    result: 1,
                    reorder: true,
                };
                function compareRatings(a, b) {
                    return (a === null || a === void 0 ? void 0 : a.cmpRes.changeRating) - b.cmpRes.changeRating;
                }
                let val;
                let i;
                let len;
                const foundItems = [];
                foundItems.length =
                    source.length > dest.length ? source.length : dest.length;
                let srcI;
                let dstI;
                for (i = 0, len = source.length; i < len; i += 1) {
                    val = source[i];
                    let rec;
                    let cmpRes;
                    let found;
                    const approx = [];
                    for (let j = 0, dstlen = dest.length; j < dstlen; j += 1) {
                        rec = dest[j];
                        cmpRes = compare(val, rec);
                        if (cmpRes.result == EqResult.STRICT ||
                            cmpRes.result == EqResult.LOOSE) {
                            found = rec;
                            dstI = dest.indexOf(rec);
                            if (!foundItems[j])
                                break;
                        }
                        else if (cmpRes.result === 3) {
                            approx.push({
                                found: rec,
                                dstI: dest.indexOf(rec),
                                cmpRes,
                            });
                        }
                        else {
                            found = undefined;
                            dstI = -1;
                        }
                    }
                    srcI = source.indexOf(val);
                    if (!found && approx.length > 0) {
                        approx.sort(compareRatings);
                        const aFound = approx.shift();
                        found = aFound.found;
                        dstI = aFound.dstI;
                        cmpRes = aFound.cmpRes;
                        approx.length = 0;
                    }
                    if (found) {
                        result[i] = {};
                        if (srcI != dstI) {
                            result[i].order = {
                                from: srcI,
                                to: dstI,
                            };
                        }
                        foundItems[dstI] = true;
                        result[i].value = cmpRes;
                        if ((cmpRes === null || cmpRes === void 0 ? void 0 : cmpRes.result) && cmpRes.result > 1 && result.result !== 0)
                            result.result = cmpRes === null || cmpRes === void 0 ? void 0 : cmpRes.result;
                    }
                    else {
                        result.result = 0;
                        if (!result.removed)
                            result.removed = {};
                        result.removed[i] = {
                            order: dstI,
                            value: val,
                        };
                    }
                }
                for (i = 0, len = dest.length; i < len; i += 1) {
                    val = dest[i];
                    if (foundItems[i] !== true) {
                        if (!result.inserted)
                            result.inserted = {};
                        result.inserted[i] = {
                            order: i,
                            value: val,
                        };
                    }
                }
                if (!config.diff) {
                    return Object.keys(result).every(v => result[v]);
                }
                return result;
            };
        }
    },
};
const mapping_1 = require("./mapping");
const Compariable = (0, mapping_1.cmp)(exports.Equality);
function getComparator(a, b, type) {
    let cmpr = Compariable[a][b];
    let res = cmpr ? cmpr[type] : null;
    if (!res) {
        cmpr = Compariable[b][a];
        res = cmpr ? cmpr[type] : null;
    }
    if (!res) {
        switch (type) {
            case 'strict':
                return exports.Equality.false;
            case 'loose':
                return exports.Equality.false;
            case 'structure':
                return exports.Equality.false;
            case 'diff':
                return exports.Equality.diffValue;
        }
    }
    else
        return res;
}
exports.getComparator = getComparator;
function getType(v) {
    return Object.prototype.toString.call(v).match(/\[object (.+)\]/)[1];
}
exports.getType = getType;
function strictEq(a, b) {
    const t0 = getType(a);
    const t1 = getType(b);
    const fnc = getComparator(t0, t1, 'strict');
    return fnc(a, b, strictEq);
}
exports.strictEq = strictEq;
function looseEq(a, b) {
    const t0 = getType(a);
    const t1 = getType(b);
    const fnc = getComparator(t0, t1, 'loose');
    return fnc(a, b, looseEq);
}
exports.looseEq = looseEq;
function structureEq(a, b) {
    const t0 = getType(a);
    const t1 = getType(b);
    const fnc = getComparator(t0, t1, 'structure');
    return fnc(a, b, structureEq);
}
exports.structureEq = structureEq;
function diff(a, b) {
    const t0 = getType(a);
    const t1 = getType(b);
    const fnc = getComparator(t0, t1, 'diff');
    return fnc(a, b, diff);
}
exports.diff = diff;
//# sourceMappingURL=comparator.js.map