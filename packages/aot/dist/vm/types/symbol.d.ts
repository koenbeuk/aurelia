import { $Undefined } from './undefined.js';
import { $String } from './string.js';
import { $AnyNonError, PotentialNonEmptyCompletionType, CompletionTarget, $Any } from './_shared.js';
import { Realm, ExecutionContext } from '../realm.js';
import { $Object } from './object.js';
import { $Boolean } from './boolean.js';
import { $Error } from './error.js';
import { I$Node } from '../ast/_shared.js';
export declare class $Symbol<T extends $Undefined | $String = $Undefined | $String> {
    readonly realm: Realm;
    readonly Description: T;
    readonly '<$Symbol>': unknown;
    readonly id: number;
    readonly IntrinsicName: 'symbol';
    '[[Type]]': PotentialNonEmptyCompletionType;
    readonly '[[Value]]': symbol;
    '[[Target]]': CompletionTarget;
    get isAbrupt(): false;
    get Type(): 'Symbol';
    get isEmpty(): false;
    get isUndefined(): false;
    get isNull(): false;
    get isNil(): false;
    get isBoolean(): false;
    get isNumber(): false;
    get isString(): false;
    get isSymbol(): true;
    get isPrimitive(): true;
    get isObject(): false;
    get isArray(): false;
    get isProxy(): false;
    get isFunction(): false;
    get isBoundFunction(): false;
    get isTruthy(): true;
    get isFalsey(): false;
    get isSpeculative(): false;
    get hasValue(): true;
    get isList(): false;
    readonly nodeStack: I$Node[];
    ctx: ExecutionContext | null;
    stack: string;
    get IsArrayIndex(): false;
    constructor(realm: Realm, Description: T, value?: symbol, type?: PotentialNonEmptyCompletionType, target?: CompletionTarget);
    is(other: $AnyNonError): other is $Symbol<T>;
    enrichWith(ctx: ExecutionContext, node: I$Node): this;
    [Symbol.toPrimitive](): string;
    [Symbol.toStringTag](): string;
    ToCompletion(type: PotentialNonEmptyCompletionType, target: CompletionTarget): this;
    UpdateEmpty(value: $Any): this;
    ToObject(ctx: ExecutionContext): $Object;
    ToPropertyKey(ctx: ExecutionContext): $String;
    ToLength(ctx: ExecutionContext): $Error;
    ToPrimitive(ctx: ExecutionContext): this;
    ToBoolean(ctx: ExecutionContext): $Boolean;
    ToNumber(ctx: ExecutionContext): $Error;
    ToInt32(ctx: ExecutionContext): $Error;
    ToUint32(ctx: ExecutionContext): $Error;
    ToInt16(ctx: ExecutionContext): $Error;
    ToUint16(ctx: ExecutionContext): $Error;
    ToInt8(ctx: ExecutionContext): $Error;
    ToUint8(ctx: ExecutionContext): $Error;
    ToUint8Clamp(ctx: ExecutionContext): $Error;
    ToString(ctx: ExecutionContext): $String;
    GetValue(ctx: ExecutionContext): this;
}
//# sourceMappingURL=symbol.d.ts.map