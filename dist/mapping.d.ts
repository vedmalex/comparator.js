import { EqualityIput } from './comparator';
export declare function cmp(eq: EqualityIput): {
    Boolean: {
        Boolean: {
            strict(a: boolean, b: boolean): boolean;
            loose(a: boolean, b: boolean): boolean;
            structure: () => boolean;
        };
        Number: {
            loose(a: boolean, b: number): boolean;
        };
        String: {
            loose(a: boolean, b: string): boolean;
            diff(a: boolean, b: string): {
                result: import("./comparator").EqResult.LOOSE;
                from: boolean;
                to: string;
            } | {
                result: import("./comparator").EqResult.NOT_EQUAL;
                from: boolean;
                to: string;
            };
        };
        Undefined: {
            loose(a: boolean, b: undefined): boolean;
        };
        Null: {
            loose(a: boolean, b: null): boolean;
        };
    };
    Number: {
        Number: {
            strict(a: number, b: number): boolean;
            loose(a: number, b: number): boolean;
            structure: () => boolean;
        };
        String: {
            loose(a: number, b: string): boolean;
        };
        Date: {
            strict(a: number, b: Date): boolean;
            loose(a: number, b: Date): boolean;
            structure: () => boolean;
        };
        Null: {
            loose(a: number, b: null): boolean;
        };
        Undefined: {
            loose(a: number, b: undefined): boolean;
        };
        Object: {
            loose(a: number, b: object): boolean;
        };
        Function: {
            loose(a: number, b: Function): boolean;
        };
    };
    String: {
        Boolean: {
            loose(a: string, b: boolean): boolean;
            diff(a: string, b: boolean): {
                result: import("./comparator").EqResult.LOOSE;
                from: string;
                to: boolean;
            } | {
                result: import("./comparator").EqResult.NOT_EQUAL;
                from: string;
                to: boolean;
            };
        };
        String: {
            strict(a: string, b: string): boolean;
            loose(a: string, b: string): boolean;
            structure: () => boolean;
            diff(a: string, b: string): {
                result: number;
                value: string;
                diff?: undefined;
                changes?: undefined;
                changeRating?: undefined;
                from?: undefined;
                to?: undefined;
            } | {
                result: import("./comparator").EqResult.LOOSE;
                diff: string;
                changes: import("diff").Change[];
                value?: undefined;
                changeRating?: undefined;
                from?: undefined;
                to?: undefined;
            } | {
                result: import("./comparator").EqResult.STRUCTURE;
                diff: string;
                changes: import("diff").Change[];
                changeRating: number;
                value?: undefined;
                from?: undefined;
                to?: undefined;
            } | {
                result: import("./comparator").EqResult.NOT_EQUAL;
                diff: string;
                from: string;
                to: string;
                value?: undefined;
                changes?: undefined;
                changeRating?: undefined;
            };
        };
        RegExp: {
            strict(a: string, b: RegExp): boolean;
            loose(a: string, b: string): boolean;
            structure: () => boolean;
        };
        Date: {
            strict(a: string, b: Date): boolean;
            loose(a: string, b: Date): boolean;
            structure: () => boolean;
            diff(a: string, b: Date): {
                result: import("./comparator").EqResult.STRICT;
                value: string;
                from?: undefined;
                to?: undefined;
            } | {
                result: import("./comparator").EqResult.LOOSE;
                from: string;
                to: Date;
                value?: undefined;
            } | {
                result: import("./comparator").EqResult.NOT_EQUAL;
                from: string;
                to: Date;
                value?: undefined;
            };
        };
        Null: {
            loose(a: string, b: null): boolean;
        };
        Undefined: {
            loose(a: string, b: undefined): boolean;
        };
        Array: {
            strict(a: string, b: Array<any>): boolean;
            loose(a: string, b: Array<any>): boolean;
            structure: () => boolean;
        };
        Object: {
            strict(a: string, b: object): boolean;
            loose(a: string, b: object): boolean;
            structure: () => boolean;
        };
        Function: {
            strict(a: string, b: Function): boolean;
            loose(a: string, b: Function): boolean;
            structure: () => boolean;
        };
    };
    RegExp: {
        RegExp: {
            strict(a: RegExp, b: RegExp): boolean;
            loose(a: RegExp, b: RegExp): boolean;
            structure: () => boolean;
            diff: (a: string, b: string) => boolean | import("./comparator").DiffResult;
        };
        Undefined: {
            loose(a: RegExp, b: undefined): boolean;
        };
        Null: {
            loose(a: RegExp, b: null): boolean;
        };
        Object: {
            strict(a: RegExp, b: string): boolean;
            loose(a: RegExp, b: string): boolean;
        };
    };
    Date: {
        Date: {
            strict(a: Date, b: Date): boolean;
            loose(a: Date, b: Date): boolean;
            structure: () => boolean;
        };
        Object: {
            strict(a: Date, b: object): boolean;
            loose(a: Date, b: object): boolean;
            structure: () => boolean;
            diff: (a: string, b: string) => boolean | import("./comparator").DiffResult;
        };
    };
    Undefined: {
        Undefined: {
            strict: () => boolean;
            loose: () => boolean;
            structure: () => boolean;
            diff(): {
                result: import("./comparator").EqResult.STRICT;
            };
        };
        Null: {
            strict: () => boolean;
            loose: () => boolean;
            structure: () => boolean;
            diff(): {
                result: import("./comparator").EqResult.STRICT;
                value: null;
            };
        };
    };
    Null: {
        Null: {
            strict: () => boolean;
            loose: () => boolean;
            structure: () => boolean;
            diff(): {
                result: import("./comparator").EqResult.STRICT;
                value: null;
            };
        };
    };
    Array: {
        Array: {
            strict: boolean | import("./comparator").DiffResult;
            loose: boolean | import("./comparator").DiffResult;
            structure: boolean | import("./comparator").DiffResult;
            diff: boolean | import("./comparator").DiffResult;
        };
        Object: {
            strict: boolean | import("./comparator").DiffResult;
            loose: boolean | import("./comparator").DiffResult;
            structure: boolean | import("./comparator").DiffResult;
            diff: boolean | import("./comparator").DiffResult;
        };
    };
    Object: {
        Object: {
            strict: boolean | import("./comparator").DiffResult;
            loose: boolean | import("./comparator").DiffResult;
            structure: boolean | import("./comparator").DiffResult;
            diff: boolean | import("./comparator").DiffResult;
        };
    };
    Function: {
        Function: {
            strict(a: Function, b: Function): boolean;
            loose(a: Function, b: Function): boolean;
            structure: () => boolean;
            diff: (a: string, b: string) => boolean | import("./comparator").DiffResult;
        };
    };
};
//# sourceMappingURL=mapping.d.ts.map