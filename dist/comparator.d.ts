export type EqConfig = {
    strict?: boolean;
    loose?: boolean;
    structure?: boolean;
    diff?: boolean;
};
export type Result<T> = {
    [key: string]: any;
    result?: T;
};
export type ComparatorFunction = (a: any, b: any) => DiffResult;
export declare enum EqResult {
    NOT_EQUAL = 0,
    STRICT = 1,
    LOOSE = 2,
    STRUCTURE = 3
}
export interface DiffResult extends Record<string, any> {
    result?: EqResult;
    value?: any;
    from?: any;
    to?: any;
    reorder?: boolean;
    removed?: Record<string, {
        order: number;
        value: any;
    }>;
    inserted?: Record<string, {
        order: number;
        value: any;
    }>;
    changeRating?: number;
}
export interface EqualityIput {
    false: () => boolean;
    true: () => boolean;
    NOT_EQUAL: EqResult.NOT_EQUAL;
    STRICT: EqResult.STRICT;
    LOOSE: EqResult.LOOSE;
    STRUCTURE: EqResult.STRUCTURE;
    diffString: (a: string, b: string) => boolean | DiffResult;
    eqObject: (config: EqConfig) => boolean | DiffResult;
    eqArray: (config: EqConfig) => boolean | DiffResult;
}
export declare const Equality: {
    false: () => boolean;
    true: () => boolean;
    NOT_EQUAL: number;
    STRICT: number;
    LOOSE: number;
    STRUCTURE: number;
    diffValue: (a: any, b: any) => DiffResult;
    diffString: (a: string, b: string) => {
        result: number;
        value: string;
        from?: undefined;
        to?: undefined;
    } | {
        result: number;
        from: string;
        to: string;
        value?: undefined;
    };
    eqObject: (config: EqConfig) => ((source: any, dest: any, compare: ComparatorFunction) => boolean) | ((source: any, dest: any, compare: ComparatorFunction) => Result<any>) | undefined;
    eqArray: (config: EqConfig) => ((source: any, dest: any, compare: ComparatorFunction) => boolean | DiffResult | {
        result: number;
        value: any;
    }) | undefined;
};
export declare function getComparator(a: any, b: any, type: 'strict' | 'loose' | 'structure' | 'diff'): any;
export declare function getType(v: any): string;
export declare function strictEq(a: any, b: any): any;
export declare function looseEq(a: any, b: any): any;
export declare function structureEq(a: any, b: any): any;
export declare function diff(a: any, b: any): any;
//# sourceMappingURL=comparator.d.ts.map