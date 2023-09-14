declare function getComparator(a: any, b: any, type: "strict" | "loose" | "structure" | "diff"): any;
declare function strictEq(a: any, b: any): any;
declare function looseEq(a: any, b: any): any;
declare function structureEq(a: any, b: any): any;
declare function diff(a: any, b: any): any;
declare function fold<T extends Record<string, any>>(data: T): Record<string, any>;
declare function unfold(data: Record<string, any>, _result?: Record<string, any>, _propName?: string): Record<string, any>;
declare function get<T extends Record<string, any>, R>(data: T, path: string): R;
declare function get<T extends Record<string, any>, R>(data: Array<T>, path: string): Array<R>;
declare function set(data: Record<string, any>, path: string, value: any): void;
declare function unset(data: Record<string, any>, path: string): void;
declare function has<T extends Record<string, any>>(data: T, path: string): boolean;
declare function has<T extends Record<string, any>>(data: Array<T>, path: string): Array<boolean>;
export { getComparator, strictEq, looseEq, structureEq, diff, fold, unfold, get, set, unset, has };
//# sourceMappingURL=index.d.ts.map