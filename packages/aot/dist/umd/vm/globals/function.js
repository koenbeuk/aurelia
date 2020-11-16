(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../types/function.js", "../types/error.js", "../types/object.js", "../types/list.js", "../operations.js", "../types/string.js", "typescript", "../ast/functions.js", "../types/boolean.js", "../types/property-descriptor.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.$CreateDynamicFunction = exports.$FunctionPrototype_hasInstance = exports.$FunctionPrototype_toString = exports.$FunctionPrototype_call = exports.$FunctionPrototype_bind = exports.$FunctionPrototype_apply = exports.$FunctionPrototype = exports.$FunctionConstructor = void 0;
    const function_js_1 = require("../types/function.js");
    const error_js_1 = require("../types/error.js");
    const object_js_1 = require("../types/object.js");
    const list_js_1 = require("../types/list.js");
    const operations_js_1 = require("../operations.js");
    const string_js_1 = require("../types/string.js");
    const typescript_1 = require("typescript");
    const functions_js_1 = require("../ast/functions.js");
    const boolean_js_1 = require("../types/boolean.js");
    const property_descriptor_js_1 = require("../types/property-descriptor.js");
    // http://www.ecma-international.org/ecma-262/#sec-function-objects
    // 19.2 Function Objects
    // http://www.ecma-international.org/ecma-262/#sec-function-constructor
    // 19.2.1 The Function Constructor
    class $FunctionConstructor extends function_js_1.$BuiltinFunction {
        // http://www.ecma-international.org/ecma-262/#sec-function.length
        // 19.2.2.1 Function.length
        get length() {
            return this.getProperty(this.realm['[[Intrinsics]]'].length)['[[Value]]'];
        }
        set length(value) {
            this.setDataProperty(this.realm['[[Intrinsics]]'].length, value);
        }
        // http://www.ecma-international.org/ecma-262/#sec-function.prototype
        // 19.2.2.2 Function.prototype
        get $prototype() {
            return this.getProperty(this.realm['[[Intrinsics]]'].$prototype)['[[Value]]'];
        }
        set $prototype(value) {
            this.setDataProperty(this.realm['[[Intrinsics]]'].$prototype, value, false, false, false);
        }
        constructor(realm, functionPrototype) {
            super(realm, '%Function%', functionPrototype);
        }
        // http://www.ecma-international.org/ecma-262/#sec-function-p1-p2-pn-body
        // 19.2.1.1 Function ( p1 , p2 , … , pn , body )
        performSteps(ctx, thisArgument, argumentsList, NewTarget) {
            // 1. Let C be the active function object.
            // 2. Let args be the argumentsList that was passed to this function by [[Call]] or [[Construct]].
            // 3. Return ? CreateDynamicFunction(C, NewTarget, "normal", args).
            return $CreateDynamicFunction(ctx, this, NewTarget, 0 /* normal */, argumentsList);
        }
    }
    exports.$FunctionConstructor = $FunctionConstructor;
    // http://www.ecma-international.org/ecma-262/#sec-properties-of-the-function-prototype-object
    // 19.2.3 Properties of the Function Prototype Object
    class $FunctionPrototype extends object_js_1.$Object {
        // http://www.ecma-international.org/ecma-262/#sec-function.prototype.apply
        // 19.2.3.1 Function.prototype.apply ( thisArg , argArray )
        get $apply() {
            return this.getProperty(this.realm['[[Intrinsics]]'].$apply)['[[Value]]'];
        }
        set $apply(value) {
            this.setDataProperty(this.realm['[[Intrinsics]]'].$apply, value);
        }
        // http://www.ecma-international.org/ecma-262/#sec-function.prototype.bind
        // 19.2.3.2 Function.prototype.bind ( thisArg , ... args )
        get $bind() {
            return this.getProperty(this.realm['[[Intrinsics]]'].$bind)['[[Value]]'];
        }
        set $bind(value) {
            this.setDataProperty(this.realm['[[Intrinsics]]'].$bind, value);
        }
        // http://www.ecma-international.org/ecma-262/#sec-function.prototype.call
        // 19.2.3.3 Function.prototype.call ( thisArg , ... args )
        get $call() {
            return this.getProperty(this.realm['[[Intrinsics]]'].$call)['[[Value]]'];
        }
        set $call(value) {
            this.setDataProperty(this.realm['[[Intrinsics]]'].$call, value);
        }
        // http://www.ecma-international.org/ecma-262/#sec-function.prototype.constructor
        // 19.2.3.4 Function.prototype.constructor
        get $constructor() {
            return this.getProperty(this.realm['[[Intrinsics]]'].$constructor)['[[Value]]'];
        }
        set $constructor(value) {
            this.setDataProperty(this.realm['[[Intrinsics]]'].$constructor, value);
        }
        // http://www.ecma-international.org/ecma-262/#sec-function.prototype.tostring
        // 19.2.3.5 Function.prototype.toString ( )
        get $toString() {
            return this.getProperty(this.realm['[[Intrinsics]]'].$toString)['[[Value]]'];
        }
        set $toString(value) {
            this.setDataProperty(this.realm['[[Intrinsics]]'].$toString, value);
        }
        // http://www.ecma-international.org/ecma-262/#sec-function.prototype-@@hasinstance
        // 19.2.3.6 Function.prototype [ @@hasInstance ] ( V )
        get '@@hasInstance'() {
            return this.getProperty(this.realm['[[Intrinsics]]']['@@hasInstance'])['[[Value]]'];
        }
        set '@@hasInstance'(value) {
            this.setDataProperty(this.realm['[[Intrinsics]]']['@@hasInstance'], value);
        }
        constructor(realm, objectPrototype) {
            const intrinsics = realm['[[Intrinsics]]'];
            super(realm, '%FunctionPrototype%', objectPrototype, 1 /* normal */, intrinsics.empty);
        }
    }
    exports.$FunctionPrototype = $FunctionPrototype;
    class $FunctionPrototype_apply extends function_js_1.$BuiltinFunction {
        constructor(realm, proto) {
            super(realm, 'Function.prototype.apply', proto);
        }
        // http://www.ecma-international.org/ecma-262/#sec-function.prototype.apply
        // 19.2.3.1 Function.prototype.apply ( thisArg , argArray )
        performSteps(ctx, thisArgument, [thisArg, argArray], NewTarget) {
            const realm = ctx.Realm;
            const intrinsics = realm['[[Intrinsics]]'];
            if (thisArg === void 0) {
                thisArg = intrinsics.undefined;
            }
            // 1. Let func be the this value.
            // 2. If IsCallable(func) is false, throw a TypeError exception.
            // 3. If argArray is undefined or null, then
            // 3. a. Perform PrepareForTailCall().
            // 3. b. Return ? Call(func, thisArg).
            // 4. Let argList be ? CreateListFromArrayLike(argArray).
            // 5. Perform PrepareForTailCall().
            // 6. Return ? Call(func, thisArg, argList).
            throw new Error('Method not implemented.');
        }
    }
    exports.$FunctionPrototype_apply = $FunctionPrototype_apply;
    class $FunctionPrototype_bind extends function_js_1.$BuiltinFunction {
        constructor(realm, proto) {
            super(realm, 'Function.prototype.bind', proto);
        }
        // http://www.ecma-international.org/ecma-262/#sec-function.prototype.bind
        // 19.2.3.2 Function.prototype.bind ( thisArg , ... args )
        performSteps(ctx, thisArgument, [thisArg, ...args], NewTarget) {
            const realm = ctx.Realm;
            const intrinsics = realm['[[Intrinsics]]'];
            if (thisArg === void 0) {
                thisArg = intrinsics.undefined;
            }
            // 1. Let Target be the this value.
            // 2. If IsCallable(Target) is false, throw a TypeError exception.
            // 3. Let args be a new (possibly empty) List consisting of all of the argument values provided after thisArg in order.
            // 4. Let F be ? BoundFunctionCreate(Target, thisArg, args).
            // 5. Let targetHasLength be ? HasOwnProperty(Target, "length").
            // 6. If targetHasLength is true, then
            // 6. a. Let targetLen be ? Get(Target, "length").
            // 6. b. If Type(targetLen) is not Number, let L be 0.
            // 6. c. Else,
            // 6. c. i. Set targetLen to ! ToInteger(targetLen).
            // 6. c. ii. Let L be the larger of 0 and the result of targetLen minus the number of elements of args.
            // 7. Else, let L be 0.
            // 8. Perform ! SetFunctionLength(F, L).
            // 9. Let targetName be ? Get(Target, "name").
            // 10. If Type(targetName) is not String, set targetName to the empty string.
            // 11. Perform SetFunctionName(F, targetName, "bound").
            // 12. Return F.
            throw new Error('Method not implemented.');
        }
    }
    exports.$FunctionPrototype_bind = $FunctionPrototype_bind;
    class $FunctionPrototype_call extends function_js_1.$BuiltinFunction {
        constructor(realm, proto) {
            super(realm, 'Function.prototype.call', proto);
        }
        // http://www.ecma-international.org/ecma-262/#sec-function.prototype.call
        // 19.2.3.3 Function.prototype.call ( thisArg , ... args )
        performSteps(ctx, thisArgument, [thisArg, ...args], NewTarget) {
            const realm = ctx.Realm;
            const intrinsics = realm['[[Intrinsics]]'];
            if (thisArg === void 0) {
                thisArg = intrinsics.undefined;
            }
            // 1. Let func be the this value.
            const func = thisArgument;
            // 2. If IsCallable(func) is false, throw a TypeError exception.
            if (!func.isFunction) {
                return new error_js_1.$TypeError(realm, `Function.prototype.call called on ${func}, but expected a callable function`);
            }
            // 3. Let argList be a new empty List.
            const argList = new list_js_1.$List();
            // 4. If this method was called with more than one argument, then in left to right order, starting with the second argument, append each argument as the last element of argList.
            if (args.length > 0) {
                argList.push(...args);
            }
            // 5. Perform PrepareForTailCall().
            ctx.suspend();
            realm.stack.pop();
            // 6. Return ? Call(func, thisArg, argList).
            return operations_js_1.$Call(realm.stack.top, func, thisArg, argList);
        }
    }
    exports.$FunctionPrototype_call = $FunctionPrototype_call;
    class $FunctionPrototype_toString extends function_js_1.$BuiltinFunction {
        constructor(realm, proto) {
            super(realm, 'Function.prototype.toString', proto);
        }
        // http://www.ecma-international.org/ecma-262/#sec-function.prototype.tostring
        // 19.2.3.5 Function.prototype.toString ( )
        performSteps(ctx, thisArgument, [thisArg, ...args], NewTarget) {
            const realm = ctx.Realm;
            const intrinsics = realm['[[Intrinsics]]'];
            if (thisArg === void 0) {
                thisArg = intrinsics.undefined;
            }
            // 1. Let func be the this value.
            // 2. If func is a Bound Function exotic object or a built-in function object, then return an implementation-dependent String source code representation of func. The representation must have the syntax of a NativeFunction. Additionally, if func is a Well-known Intrinsic Object and is not identified as an anonymous function, the portion of the returned String that would be matched by PropertyName must be the initial value of the name property of func.
            // 3. If Type(func) is Object and func has a [[SourceText]] internal slot and Type(func.[[SourceText]]) is String and ! HostHasSourceTextAvailable(func) is true, then return func.[[SourceText]].
            // 4. If Type(func) is Object and IsCallable(func) is true, then return an implementation-dependent String source code representation of func. The representation must have the syntax of a NativeFunction.
            // 5. Throw a TypeError exception.
            throw new Error('Method not implemented.');
        }
    }
    exports.$FunctionPrototype_toString = $FunctionPrototype_toString;
    class $FunctionPrototype_hasInstance extends function_js_1.$BuiltinFunction {
        constructor(realm, proto) {
            super(realm, 'Function.prototype.hasInstance', proto);
        }
        // http://www.ecma-international.org/ecma-262/#sec-function.prototype-@@hasinstance
        // 19.2.3.6 Function.prototype [ @@hasInstance ] ( V )
        performSteps(ctx, thisArgument, [V], NewTarget) {
            const realm = ctx.Realm;
            const intrinsics = realm['[[Intrinsics]]'];
            // 1. Let F be the this value.
            // 2. Return ? OrdinaryHasInstance(F, V).
            throw new Error('Method not implemented.');
        }
    }
    exports.$FunctionPrototype_hasInstance = $FunctionPrototype_hasInstance;
    // http://www.ecma-international.org/ecma-262/#sec-createdynamicfunction
    // 19.2.1.1.1 Runtime Semantics: CreateDynamicFunction ( constructor , newTarget , kind , args )
    function $CreateDynamicFunction(ctx, constructor, newTarget, kind, args) {
        const realm = ctx.Realm;
        const intrinsics = realm['[[Intrinsics]]'];
        const stack = realm.stack;
        // 1. Assert: The execution context stack has at least two elements.
        // 2. Let callerContext be the second to top element of the execution context stack.
        const callerContext = stack[stack.length - 2];
        // 3. Let callerRealm be callerContext's Realm.
        const callerRealm = callerContext.Realm;
        // 4. Let calleeRealm be the current Realm Record.
        const calleeRealm = realm;
        // 5. Perform ? HostEnsureCanCompileStrings(callerRealm, calleeRealm).
        const $HostEnsureCanCompileStringsResult = operations_js_1.$HostEnsureCanCompileStrings(ctx, callerRealm, calleeRealm);
        if ($HostEnsureCanCompileStringsResult.isAbrupt) {
            return $HostEnsureCanCompileStringsResult;
        }
        // 6. If newTarget is undefined, set newTarget to constructor.
        if (newTarget.isUndefined) {
            newTarget = constructor;
        }
        let $yield;
        let $await;
        let prefix;
        let fallbackProto;
        switch (kind) {
            // 7. If kind is "normal", then
            case 0 /* normal */:
                // 7. a. Let goal be the grammar symbol FunctionBody[~Yield, ~Await].
                // 7. b. Let parameterGoal be the grammar symbol FormalParameters[~Yield, ~Await].
                prefix = 'function';
                // 7. c. Let fallbackProto be "%FunctionPrototype%".
                fallbackProto = '%FunctionPrototype%';
                break;
            // 8. Else if kind is "generator", then
            case 4 /* generator */:
                // 8. a. Let goal be the grammar symbol GeneratorBody.
                // 8. b. Let parameterGoal be the grammar symbol FormalParameters[+Yield, ~Await].
                prefix = 'function*';
                // 8. c. Let fallbackProto be "%Generator%".
                fallbackProto = '%Generator%';
                break;
            // 9. Else if kind is "async", then
            case 8 /* async */:
                // 9. a. Let goal be the grammar symbol AsyncFunctionBody.
                // 9. b. Let parameterGoal be the grammar symbol FormalParameters[~Yield, +Await].
                prefix = 'async function';
                // 9. c. Let fallbackProto be "%AsyncFunctionPrototype%".
                fallbackProto = '%AsyncFunctionPrototype%';
                break;
            // 10. Else,
            case 12 /* asyncGenerator */:
                // 10. a. Assert: kind is "async generator".
                // 10. b. Let goal be the grammar symbol AsyncGeneratorBody.
                // 10. c. Let parameterGoal be the grammar symbol FormalParameters[+Yield, +Await].
                prefix = 'async function*';
                // 10. d. Let fallbackProto be "%AsyncGenerator%".
                fallbackProto = '%AsyncGenerator%';
                break;
        }
        // 11. Let argCount be the number of elements in args.
        const argCount = args.length;
        // 12. Let P be the empty String.
        let P = intrinsics[''];
        let $bodyText;
        let bodyText;
        // 13. If argCount = 0, let bodyText be the empty String.
        if (argCount === 0) {
            $bodyText = intrinsics[''];
        }
        // 14. Else if argCount = 1, let bodyText be args[0].
        else if (argCount === 1) {
            $bodyText = args[0];
        }
        // 15. Else argCount > 1,
        else {
            // 15. a. Let firstArg be args[0].
            const firstArg = args[0];
            // 15. b. Set P to ? ToString(firstArg).
            const $P = firstArg.ToString(ctx);
            if ($P.isAbrupt) {
                return $P;
            }
            P = $P;
            // 15. c. Let k be 1.
            let k = 1;
            // 15. d. Repeat, while k < argCount - 1
            while (k < argCount - 1) {
                // 15. d. i. Let nextArg be args[k].
                const nextArg = args[k];
                // 15. d. ii. Let nextArgString be ? ToString(nextArg).
                const nextArgString = nextArg.ToString(ctx);
                if (nextArgString.isAbrupt) {
                    return nextArgString;
                }
                // 15. d. iii. Set P to the string-concatenation of the previous value of P, "," (a comma), and nextArgString.
                P = new string_js_1.$String(realm, `${P['[[Value]]']},${nextArgString['[[Value]]']}`);
                // 15. d. iv. Increase k by 1.
                ++k;
            }
            // 15. e. Let bodyText be args[k].
            $bodyText = args[k];
        }
        // 16. Set bodyText to ? ToString(bodyText).
        $bodyText = $bodyText.ToString(ctx);
        if ($bodyText.isAbrupt) {
            return $bodyText;
        }
        // eslint-disable-next-line prefer-const
        bodyText = $bodyText;
        // 41. Let sourceText be the string-concatenation of prefix, " anonymous(", P, 0x000A (LINE FEED), ") {", 0x000A (LINE FEED), bodyText, 0x000A (LINE FEED), and "}".
        // NOTE: we bring this step up here for parsing a proper function with TS (since TS doesn't expose an api for parsing just functions).
        //    The exact same text is then later set as [[SourceText]]
        const sourceText = `${prefix} anonymous(${P['[[Value]]']}\n) {\n${bodyText['[[Value]]']}\n}`;
        // 17. Let parameters be the result of parsing P, interpreted as UTF-16 encoded Unicode text as described in 6.1.4, using parameterGoal as the goal symbol. Throw a SyntaxError exception if the parse fails.
        // 18. Let body be the result of parsing bodyText, interpreted as UTF-16 encoded Unicode text as described in 6.1.4, using goal as the goal symbol. Throw a SyntaxError exception if the parse fails.
        const node = typescript_1.createSourceFile('', sourceText, typescript_1.ScriptTarget.Latest).statements[0];
        const ScriptOrModule = callerContext.ScriptOrModule;
        const $functionDeclaration = new functions_js_1.$FunctionDeclaration(node, ScriptOrModule, 2 /* Dynamic */, -1, ScriptOrModule, calleeRealm, 1, ScriptOrModule.logger, `${ScriptOrModule.path}[Dynamic].FunctionDeclaration`);
        // 19. Let strict be ContainsUseStrict of body.
        const strict = $functionDeclaration.ContainsUseStrict;
        // TODO: revisit whether we need to implement these early errors. See what 262 tests fail, if any, etc.
        // 20. If any static semantics errors are detected for parameters or body, throw a SyntaxError or a ReferenceError exception, depending on the type of the error. If strict is true, the Early Error rules for UniqueFormalParameters:FormalParameters are applied. Parsing and early error detection may be interweaved in an implementation-dependent manner.
        // 21. If strict is true and IsSimpleParameterList of parameters is false, throw a SyntaxError exception.
        // 22. If any element of the BoundNames of parameters also occurs in the LexicallyDeclaredNames of body, throw a SyntaxError exception.
        // 23. If body Contains SuperCall is true, throw a SyntaxError exception.
        // 24. If parameters Contains SuperCall is true, throw a SyntaxError exception.
        // 25. If body Contains SuperProperty is true, throw a SyntaxError exception.
        // 26. If parameters Contains SuperProperty is true, throw a SyntaxError exception.
        // 27. If kind is "generator" or "async generator", then
        // 27. a. If parameters Contains YieldExpression is true, throw a SyntaxError exception.
        // 28. If kind is "async" or "async generator", then
        // 28. a. If parameters Contains AwaitExpression is true, throw a SyntaxError exception.
        // 29. If strict is true, then
        // 29. a. If BoundNames of parameters contains any duplicate elements, throw a SyntaxError exception.
        // 30. Let proto be ? GetPrototypeFromConstructor(newTarget, fallbackProto).
        const proto = function_js_1.$GetPrototypeFromConstructor(ctx, newTarget, fallbackProto);
        if (proto.isAbrupt) {
            return proto;
        }
        // 31. Let F be FunctionAllocate(proto, strict, kind).
        const F = function_js_1.$Function.FunctionAllocate(ctx, proto, new boolean_js_1.$Boolean(realm, strict), kind);
        // 32. Let realmF be F.[[Realm]].
        const realmF = F['[[Realm]]'];
        // 33. Let scope be realmF.[[GlobalEnv]].
        const scope = realmF['[[GlobalEnv]]'];
        // 34. Perform FunctionInitialize(F, Normal, parameters, body, scope).
        function_js_1.$Function.FunctionInitialize(ctx, F, 'normal', $functionDeclaration, scope);
        // 35. If kind is "generator", then
        if (kind === 4 /* generator */) {
            // 35. a. Let prototype be ObjectCreate(%GeneratorPrototype%).
            const prototype = new object_js_1.$Object(realm, 'anonymous generator', intrinsics['%GeneratorPrototype%'], 1 /* normal */, intrinsics.empty);
            // 35. b. Perform DefinePropertyOrThrow(F, "prototype", PropertyDescriptor { [[Value]]: prototype, [[Writable]]: true, [[Enumerable]]: false, [[Configurable]]: false }).
            operations_js_1.$DefinePropertyOrThrow(ctx, F, intrinsics.$prototype, new property_descriptor_js_1.$PropertyDescriptor(realm, intrinsics.$prototype, {
                '[[Value]]': prototype,
                '[[Writable]]': intrinsics.true,
                '[[Enumerable]]': intrinsics.false,
                '[[Configurable]]': intrinsics.false,
            }));
        }
        // 36. Else if kind is "async generator", then
        else if (kind === 12 /* asyncGenerator */) {
            // 36. a. Let prototype be ObjectCreate(%AsyncGeneratorPrototype%).
            const prototype = new object_js_1.$Object(realm, 'anonymous async generator', intrinsics['%AsyncGeneratorPrototype%'], 1 /* normal */, intrinsics.empty);
            // 36. b. Perform DefinePropertyOrThrow(F, "prototype", PropertyDescriptor { [[Value]]: prototype, [[Writable]]: true, [[Enumerable]]: false, [[Configurable]]: false }).
            operations_js_1.$DefinePropertyOrThrow(ctx, F, intrinsics.$prototype, new property_descriptor_js_1.$PropertyDescriptor(realm, intrinsics.$prototype, {
                '[[Value]]': prototype,
                '[[Writable]]': intrinsics.true,
                '[[Enumerable]]': intrinsics.false,
                '[[Configurable]]': intrinsics.false,
            }));
        }
        // 37. Else if kind is "normal", perform MakeConstructor(F).
        else if (kind === 0 /* normal */) {
            F.MakeConstructor(ctx);
        }
        // 38. NOTE: Async functions are not constructable and do not have a [[Construct]] internal method or a "prototype" property.
        // 39. Perform SetFunctionName(F, "anonymous").
        F.SetFunctionName(ctx, new string_js_1.$String(realm, 'anonymous'));
        // 40. Let prefix be the prefix associated with kind in Table 47.
        // 41. Let sourceText be the string-concatenation of prefix, " anonymous(", P, 0x000A (LINE FEED), ") {", 0x000A (LINE FEED), bodyText, 0x000A (LINE FEED), and "}".
        // 42. Set F.[[SourceText]] to sourceText.
        F['[[SourceText]]'] = new string_js_1.$String(realm, sourceText);
        // 43. Return F.
        return F;
    }
    exports.$CreateDynamicFunction = $CreateDynamicFunction;
});
//# sourceMappingURL=function.js.map