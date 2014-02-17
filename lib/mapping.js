// default strict = eq.false;
// default loose = eq.false;
// default structure = eq.false;
// default diff =eq.diffValue

// проверить работу, посде доделать адресно для каждого типа 
// так чтобы знать какой параметр каким приходит
// чтобы было меньше проверок

exports.cmp = function(eq) {
	return {
		"Boolean": {
			"Boolean": {
				strict: function(a, b) {
					return a === b;
				},
				loose: function(a, b) {
					return a == b;
				},
				structure: eq.true,
			},
			"Number": {
				loose: function(a, b) {
					return a == b;
				},
			},
			"String": {
				loose: function(a, b) {
					return Boolean(a) == Boolean(b);
				},
			},
			"Undefined": {
				loose: function(a, b) {
					return !a == !b;
				},
			},
			"Null": {
				loose: function(a, b) {
					return !a == !b;
				},
			}
		},
		"Number": {
			"Number": {
				strict: function(a, b) {
					return a === b;
				},
				loose: function(a, b) {
					return a == b;
				},
				structure: eq.true,
			},
			"String": {
				loose: function(a, b) {
					return a == b;
				},
			},
			"Date": {
				strict: function(a, b) {
					return a == b;
				},
				loose: function(a, b) {
					return a.valueOf() == b.valueOf();
				},
				structure: eq.true
			},
			"Null": {
				loose: function(a, b) {
					return !a == !b;
				},
			},
			"Undefined": {
				loose: function(a, b) {
					return !a == !b;
				},
			},
			"Object": {
				loose: function(a, b) {
					return a.toString() == b.toString();
				},
			},
			"Function": {
				loose: function(a, b) {
					return a.toString() == b.toString();
				},
			}
		},
		"String": {
			"String": {
				strict: function(a, b) {
					return a == b;
				},
				loose: function(a, b) {
					return a == b;
				},
				structure: eq.true
			},
			"RegExp": {
				strict: function(a, b) {
					return a == b;
				},
				loose: function(a, b) {
					return a.toString() == b.toString();
				},
				structure: eq.false
			},
			"Date": {
				strict: function(a, b) {
					if (a.toString() == b.toString()) return true;

					if (a.toJSON || b.toJSON) {
						var v0, v1;
						if (a.toJSON) v0 = a.toJSON();
						else v0 = value.toString();

						if (b.toJSON) v1 = b.toJSON();
						else v1 = value.toString();
						return v0 == v1;
					} else return false;
				},
				loose: function(a, b) {
					if (a.toString() == b.toString()) return true;

					if (a.toJSON || b.toJSON) {
						var v0, v1;
						if (a.toJSON) v0 = a.toJSON();
						else v0 = value.toString();

						if (b.toJSON) v1 = b.toJSON();
						else v1 = value.toString();
						return v0 == v1;
					} else return false;
				},
				structure: eq.true,
				diff: function(a, b) {
					if (a.toString() == b.toString()) return {
						result: 1,
						value: b.toString()
					};

					if (a.toJSON || b.toJSON) {
						var v0, v1;
						if (a.toJSON) v0 = a.toJSON();
						else v0 = value.toString();

						if (b.toJSON) v1 = b.toJSON();
						else v1 = value.toString();

						if (v0 == v1) return {
							result: 2,
							from: a,
							to: b
						};
					}

					return {
						result: 0,
						from: a,
						to: b
					};
				}
			},
			"Null": {
				loose: function(a, b) {
					return !a == !b;
				},
			},
			"Undefined": {
				loose: function(a, b) {
					return !a == !b;
				},
			},
			"Array": {
				strict: function(a, b) {
					return a == b;
				},
				loose: function(a, b) {
					return a.toString() == b.toString();
				},
				structure: eq.true
			},
			"Object": {
				strict: function(a, b) {
					return a.toString() == b.toString();
				},
				loose: function(a, b) {
					return a.toString() == b.toString();
				},
				structure: eq.false,
			},
			"Function": {
				strict: function(a, b) {
					return a.toString() == b.toString();
				},
				loose: function(a, b) {
					return a.toString() == b.toString();
				},
				structure: eq.true,
			}
		},
		"RegExp": {
			// ввести сравнение регулярок с json версией mongoosejs
			"RegExp": {
				strict: function(a, b) {
					if (a === b) return true;
				},
				loose: function(a, b) {
					return a.toString() == b.toString();
				},
				structure: eq.true,
				diff: eq.diffString
			},
			"Undefined": {
				loose: function(a, b) {
					if (a instanceof RegExp)
						return a.test(b);
					else
						return b.test(a);

				}
			},
			"Null": {
				loose: function(a, b) {
					if (a instanceof RegExp) {
						return a.test(b);
					} else
						return b.test(a);
				},
			},
			"Object": {
				strict: function(a, b) {
					return a.toString() == b.toString();
				},
				loose: function(a, b) {
					return a.toString() == b.toString();
				}
			},
		},
		"Date": {
			"Date": {
				strict: function(a, b) {
					if (a === b) return true;
					return a.toString() == b.toString();
				},
				loose: function(a, b) {
					return a.toString() == b.toString();
				},
				structure: eq.true
			},
			"Object": {
				strict: function(a, b) {
					return a.toString() == b.toString();
				},
				loose: function(a, b) {
					return a.toString() == b.toString();
				},
				structure: eq.false,
				diff: eq.diffString
			},
		},
		"Undefined": {
			"Undefined": {
				strict: eq.true,
				loose: eq.true,
				structure: eq.true,
				diff: function() {
					return {
						result: 1,
					}
				}
			},
			"Null": {
				strict: eq.true,
				loose: eq.true,
				structure: eq.true,
				diff: function() {
					return {
						result: 1,
						value: null
					}
				}
			}
		},
		"Null": {
			"Null": {
				strict: eq.true,
				loose: eq.true,
				structure: eq.true,
				diff: function() {
					return {
						result: 1,
						value: null
					}
				}
			}
		},
		"Array": {
			"Array": {
				strict: eq.eqArray({
					strict: true
				}),
				loose: eq.eqArray({
					loose: true
				}),
				structure: eq.eqArray({
					structure: true
				}),
				diff: eq.eqArray({
					diff: true
				})
			},
			"Object": {
				strict: eq.eqObject({
					strict: true
				}),
				loose: eq.eqObject({
					loose: true
				}),
				structure: eq.eqObject({
					structure: true
				}),
				diff: eq.eqObject({
					diff: true
				})
			}
		},
		"Object": {
			"Object": {
				// возможно нужны будут Другие операции
				strict: eq.eqObject({
					strict: true
				}),
				loose: eq.eqObject({
					loose: true
				}),
				structure: eq.eqObject({
					structure: true
				}),
				diff: eq.eqObject({
					diff: true
				})
			},
		},
		"Function": {
			"Function": {
				strict: function(a, b) {
					return a === b;
				},
				loose: function(a, b) {
					return a.toString() == b.toString();
				},
				structure: eq.true,
				diff: eq.diffString
			}
		}
	};
};
