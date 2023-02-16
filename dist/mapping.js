"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cmp = void 0;
const diff_1 = require("diff");
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
                    const result = (0, diff_1.diffLines)(a, b);
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
exports.cmp = cmp;
//# sourceMappingURL=mapping.js.map