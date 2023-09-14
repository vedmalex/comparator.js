import { diffLines } from 'diff';

function cmp(eq) {
    return {
        Boolean: {
            Boolean: {
                strict(a, b) {
                    return a === b;
                },
                loose(a, b) {
                    return a == b;
                },
                structure: eq.true,
            },
            Number: {
                loose(a, b) {
                    return a == !!b;
                },
            },
            String: {
                loose(a, b) {
                    const bFalse = /false/i.test(b) || /0/.test(b);
                    const bTrue = /true/i.test(b) || /1/.test(b);
                    if (a)
                        return a === bTrue;
                    return a === !bFalse;
                },
                diff(a, b) {
                    let res;
                    const bFalse = /false/i.test(b) || /0/.test(b);
                    const bTrue = /true/i.test(b) || /1/.test(b);
                    if (a)
                        res = a === bTrue;
                    else
                        res = a === !bFalse;
                    if (res)
                        return {
                            result: eq.LOOSE,
                            from: a,
                            to: b,
                        };
                    return {
                        result: eq.NOT_EQUAL,
                        from: a,
                        to: b,
                    };
                },
            },
            Undefined: {
                loose(a, b) {
                    return !a == !b;
                },
            },
            Null: {
                loose(a, b) {
                    return !a == !b;
                },
            },
        },
        Number: {
            Number: {
                strict(a, b) {
                    return a === b;
                },
                loose(a, b) {
                    return a == b;
                },
                structure: eq.true,
            },
            String: {
                loose(a, b) {
                    return a == +b;
                },
            },
            Date: {
                strict(a, b) {
                    return a === b.valueOf();
                },
                loose(a, b) {
                    return a.valueOf() == b.valueOf();
                },
                structure: eq.true,
            },
            Null: {
                loose(a, b) {
                    return !a == !b;
                },
            },
            Undefined: {
                loose(a, b) {
                    return !a == !b;
                },
            },
            Object: {
                loose(a, b) {
                    return a.toString() == b.toString();
                },
            },
            Function: {
                loose(a, b) {
                    return a.toString() == b.toString();
                },
            },
        },
        String: {
            Boolean: {
                loose(a, b) {
                    const aFalse = /false/i.test(a) || /0/.test(a);
                    const aTrue = /true/i.test(a) || /1/.test(a);
                    if (b)
                        return b === aTrue;
                    return b === !aFalse;
                },
                diff(a, b) {
                    let res;
                    const aFalse = /false/i.test(a) || /0/.test(a);
                    const aTrue = /true/i.test(a) || /1/.test(a);
                    if (b)
                        res = b === aTrue;
                    else
                        res = b === !aFalse;
                    if (res)
                        return {
                            result: eq.LOOSE,
                            from: a,
                            to: b,
                        };
                    return {
                        result: eq.NOT_EQUAL,
                        from: a,
                        to: b,
                    };
                },
            },
            String: {
                strict(a, b) {
                    return a == b;
                },
                loose(a, b) {
                    return a == b;
                },
                structure: eq.true,
                diff(a, b) {
                    if (a == b)
                        return {
                            result: 1,
                            value: b,
                        };
                    const result = WEB
                        ? [{ added: b, removed: a, value: a }]
                        : diffLines(a, b);
                    const srcLen = a.length;
                    const dstLen = b.length;
                    let unchangedCnt = 0;
                    let removedCnt = 0;
                    let removedLen = 0;
                    let addedCnt = 0;
                    let addedLen = 0;
                    result.forEach(part => {
                        if (part.added) {
                            addedCnt += 1;
                            addedLen += part.value.length;
                        }
                        else if (part.removed) {
                            removedCnt += 1;
                            removedLen += part.value.length;
                        }
                        else {
                            unchangedCnt += 1;
                        }
                    });
                    if (unchangedCnt === 1 && addedCnt === 0 && removedCnt === 0) {
                        return {
                            result: eq.LOOSE,
                            diff: 'lines',
                            changes: result,
                        };
                    }
                    if (unchangedCnt > 0 && (addedCnt > 0 || removedCnt > 0)) {
                        return {
                            result: eq.STRUCTURE,
                            diff: 'lines',
                            changes: result,
                            changeRating: Math.abs(addedLen - removedLen) /
                                (addedLen > removedLen ? dstLen : srcLen),
                        };
                    }
                    return {
                        result: eq.NOT_EQUAL,
                        diff: 'lines',
                        from: a,
                        to: b,
                    };
                },
            },
            RegExp: {
                strict(a, b) {
                    return a == b.source;
                },
                loose(a, b) {
                    return a.toString() == b.toString();
                },
                structure: eq.false,
            },
            Date: {
                strict(a, b) {
                    if (a.toString() == b.toString())
                        return true;
                    if (b.toJSON) {
                        let v0;
                        let v1;
                        v0 = a;
                        if (b.toJSON)
                            v1 = b.toJSON();
                        else
                            v1 = b.toString();
                        return v0 == v1;
                    }
                    return false;
                },
                loose(a, b) {
                    if (a.toString() == b.toString())
                        return true;
                    if (b.toJSON) {
                        let v0;
                        let v1;
                        v0 = a;
                        if (b.toJSON)
                            v1 = b.toJSON();
                        else
                            v1 = a.toString();
                        return v0 == v1;
                    }
                    return false;
                },
                structure: eq.true,
                diff(a, b) {
                    if (a.toString() == b.toString())
                        return {
                            result: eq.STRICT,
                            value: b.toString(),
                        };
                    if (b.toJSON) {
                        let v0;
                        let v1;
                        v0 = a;
                        if (b.toJSON)
                            v1 = b.toJSON();
                        else
                            v1 = b.toString();
                        if (v0 == v1)
                            return {
                                result: eq.LOOSE,
                                from: a,
                                to: b,
                            };
                    }
                    return {
                        result: eq.NOT_EQUAL,
                        from: a,
                        to: b,
                    };
                },
            },
            Null: {
                loose(a, b) {
                    return !a == !b;
                },
            },
            Undefined: {
                loose(a, b) {
                    return !a == !b;
                },
            },
            Array: {
                strict(a, b) {
                    return a == b.join();
                },
                loose(a, b) {
                    return a == b.join();
                },
                structure: eq.true,
            },
            Object: {
                strict(a, b) {
                    return a.toString() == b.toString();
                },
                loose(a, b) {
                    return a.toString() == b.toString();
                },
                structure: eq.false,
            },
            Function: {
                strict(a, b) {
                    return a.toString() == b.toString();
                },
                loose(a, b) {
                    return a.toString() == b.toString();
                },
                structure: eq.true,
            },
        },
        RegExp: {
            RegExp: {
                strict(a, b) {
                    return a === b;
                },
                loose(a, b) {
                    return a.toString() == b.toString();
                },
                structure: eq.true,
                diff: eq.diffString,
            },
            Undefined: {
                loose(a, b) {
                    return a.test('undefined');
                },
            },
            Null: {
                loose(a, b) {
                    return a.test('null');
                },
            },
            Object: {
                strict(a, b) {
                    return a.toString() == b.toString();
                },
                loose(a, b) {
                    return a.toString() == b.toString();
                },
            },
        },
        Date: {
            Date: {
                strict(a, b) {
                    if (a === b)
                        return true;
                    return a.toString() == b.toString();
                },
                loose(a, b) {
                    return a.toString() == b.toString();
                },
                structure: eq.true,
            },
            Object: {
                strict(a, b) {
                    return a.toString() == b.toString();
                },
                loose(a, b) {
                    return a.toString() == b.toString();
                },
                structure: eq.false,
                diff: eq.diffString,
            },
        },
        Undefined: {
            Undefined: {
                strict: eq.true,
                loose: eq.true,
                structure: eq.true,
                diff() {
                    return {
                        result: eq.STRICT,
                    };
                },
            },
            Null: {
                strict: eq.true,
                loose: eq.true,
                structure: eq.true,
                diff() {
                    return {
                        result: eq.STRICT,
                        value: null,
                    };
                },
            },
        },
        Null: {
            Null: {
                strict: eq.true,
                loose: eq.true,
                structure: eq.true,
                diff() {
                    return {
                        result: eq.STRICT,
                        value: null,
                    };
                },
            },
        },
        Array: {
            Array: {
                strict: eq.eqArray({
                    strict: true,
                }),
                loose: eq.eqArray({
                    loose: true,
                }),
                structure: eq.eqArray({
                    structure: true,
                }),
                diff: eq.eqArray({
                    diff: true,
                }),
            },
            Object: {
                strict: eq.eqObject({
                    strict: true,
                }),
                loose: eq.eqObject({
                    loose: true,
                }),
                structure: eq.eqObject({
                    structure: true,
                }),
                diff: eq.eqObject({
                    diff: true,
                }),
            },
        },
        Object: {
            Object: {
                strict: eq.eqObject({
                    strict: true,
                }),
                loose: eq.eqObject({
                    loose: true,
                }),
                structure: eq.eqObject({
                    structure: true,
                }),
                diff: eq.eqObject({
                    diff: true,
                }),
            },
        },
        Function: {
            Function: {
                strict(a, b) {
                    return a === b;
                },
                loose(a, b) {
                    return a.toString() == b.toString();
                },
                structure: eq.true,
                diff: eq.diffString,
            },
        },
    };
}

var EqResult;
(function (EqResult) {
    EqResult[EqResult["NOT_EQUAL"] = 0] = "NOT_EQUAL";
    EqResult[EqResult["STRICT"] = 1] = "STRICT";
    EqResult[EqResult["LOOSE"] = 2] = "LOOSE";
    EqResult[EqResult["STRUCTURE"] = 3] = "STRUCTURE";
})(EqResult || (EqResult = {}));
const Equality = {
    false: () => false,
    true: () => true,
    NOT_EQUAL: 0,
    STRICT: 1,
    LOOSE: 2,
    STRUCTURE: 3,
    diffValue: (a, b) => {
        if (a === b)
            return {
                result: Equality.STRICT,
                value: b,
            };
        if (a != null && b != null && a.valueOf() === b.valueOf())
            return {
                result: Equality.LOOSE,
                from: a,
                to: b,
            };
        return {
            result: Equality.NOT_EQUAL,
            from: a,
            to: b,
        };
    },
    diffString: (a, b) => {
        if (a === b)
            return {
                result: Equality.STRICT,
                value: b,
            };
        if (a.toString() == b.toString())
            return {
                result: Equality.LOOSE,
                from: a,
                to: b,
            };
        return {
            result: Equality.NOT_EQUAL,
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
const Compariable = cmp(Equality);
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
                return Equality.false;
            case 'loose':
                return Equality.false;
            case 'structure':
                return Equality.false;
            case 'diff':
                return Equality.diffValue;
        }
    }
    else
        return res;
}
function getType(v) {
    return Object.prototype.toString.call(v).match(/\[object (.+)\]/)[1];
}
function strictEq(a, b) {
    const t0 = getType(a);
    const t1 = getType(b);
    const fnc = getComparator(t0, t1, 'strict');
    return fnc(a, b, strictEq);
}
function looseEq(a, b) {
    const t0 = getType(a);
    const t1 = getType(b);
    const fnc = getComparator(t0, t1, 'loose');
    return fnc(a, b, looseEq);
}
function structureEq(a, b) {
    const t0 = getType(a);
    const t1 = getType(b);
    const fnc = getComparator(t0, t1, 'structure');
    return fnc(a, b, structureEq);
}
function diff(a, b) {
    const t0 = getType(a);
    const t1 = getType(b);
    const fnc = getComparator(t0, t1, 'diff');
    return fnc(a, b, diff);
}

function set(data, path, value) {
    if (typeof data === 'object') {
        const parts = path.split('.');
        if (Array.isArray(parts)) {
            const curr = parts.shift();
            if (parts.length > 0) {
                if (!data[curr]) {
                    if (Number.isNaN(Number(parts[0])))
                        data[curr] = {};
                    else
                        data[curr] = [];
                }
                set(data[curr], parts.join('.'), value);
            }
            else
                data[path] = value;
        }
        else {
            data[path] = value;
        }
    }
}

function fold(data) {
    const result = {};
    const keys = Object.keys(data);
    for (let i = 0, len = keys.length; i < len; i += 1) {
        set(result, keys[i], data[keys[i]]);
    }
    return result;
}

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

function get(data, path) {
    if (Array.isArray(data)) {
        const result = [];
        for (let i = 0, len = data.length; i < len; i += 1) {
            result.push(get(data[i], path));
        }
        return result;
    }
    if (typeof data === 'object') {
        if (data[path] === undefined) {
            const parts = path.split('.');
            if (Array.isArray(parts)) {
                const curr = parts.shift();
                if (parts.length > 0) {
                    return get(data[curr], parts.join('.'));
                }
                return data[curr];
            }
        }
        return data[path];
    }
    return data;
}

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

function has(data, path) {
    if (Array.isArray(data)) {
        const result = [];
        for (let i = 0, len = data.length; i < len; i += 1) {
            result.push(has(data[i], path));
        }
        return result;
    }
    else if (typeof data === 'object') {
        if (data[path] === undefined) {
            const parts = path.split('.');
            if (Array.isArray(parts)) {
                const curr = parts.shift();
                if (parts.length > 0) {
                    return has(data[curr], parts.join('.'));
                }
                return curr in data;
            }
        }
        else {
            return path in data;
        }
    }
    else
        return true;
}

export { diff, fold, get, getComparator, has, looseEq, set, strictEq, structureEq, unfold, unset };
//# sourceMappingURL=index.module.js.map
