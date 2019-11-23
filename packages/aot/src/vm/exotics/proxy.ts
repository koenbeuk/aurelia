import {
  $Object,
} from '../types/object';
import {
  $Null,
} from '../types/null';
import {
  Realm,
  ExecutionContext,
} from '../realm';
import {
  $PropertyKey,
  $AnyNonEmpty,
  $AnyObject,
} from '../types/_shared';
import {
  $Call,
  $ToPropertyDescriptor,
  $ValidateAndApplyPropertyDescriptor,
  $FromPropertyDescriptor,
  $CreateListFromArrayLike,
  $Construct,
} from '../operations';
import {
  $Boolean,
} from '../types/boolean';
import {
  $PropertyDescriptor,
} from '../types/property-descriptor';
import {
  $Undefined,
} from '../types/undefined';
import {
  $String,
} from '../types/string';
import {
  $Symbol,
} from '../types/symbol';
import {
  $Function,
} from '../types/function';
import {
  $CreateArrayFromList,
} from './array';
import {
  $TypeError,
  $Error,
} from '../types/error';
import {
  $List,
} from '../types/list';

// http://www.ecma-international.org/ecma-262/#sec-proxy-object-internal-methods-and-internal-slots
export class $ProxyExoticObject extends $Object<'ProxyExoticObject'> {
  public readonly '[[ProxyHandler]]': $AnyObject | $Null;
  public readonly '[[ProxyTarget]]': $AnyObject | $Null;

  public get isProxy(): true { return true; }

  // http://www.ecma-international.org/ecma-262/#sec-proxycreate
  public constructor(
    realm: Realm,
    target: $AnyNonEmpty,
    handler: $AnyNonEmpty,
  ) {
    super(realm, 'ProxyExoticObject', realm['[[Intrinsics]]'].null);

    // 1. If Type(target) is not Object, throw a TypeError exception.
    if (!target.isObject) {
      return new $TypeError(realm) as any; // TODO: move to static method so we can return error completion
    }

    // 2. If target is a Proxy exotic object and target.[[ProxyHandler]] is null, throw a TypeError exception.
    if (target.isProxy && (target as $ProxyExoticObject)['[[ProxyHandler]]'].isNull) {
      return new $TypeError(realm) as any; // TODO: move to static method so we can return error completion
    }

    // 3. If Type(handler) is not Object, throw a TypeError exception.
    if (!handler.isObject) {
      return new $TypeError(realm) as any; // TODO: move to static method so we can return error completion
    }

    // 4. If handler is a Proxy exotic object and handler.[[ProxyHandler]] is null, throw a TypeError exception.
    if (handler instanceof $ProxyExoticObject && handler['[[ProxyHandler]]'].isNull) {
      return new $TypeError(realm) as any; // TODO: move to static method so we can return error completion
    }

    // 5. Let P be a newly created object.
    // 6. Set P's essential internal methods (except for [[Call]] and [[Construct]]) to the definitions specified in 9.5.
    // 7. If IsCallable(target) is true, then
    // 7. a. Set P.[[Call]] as specified in 9.5.12.
    // 7. b. If IsConstructor(target) is true, then
    // 7. b. i. Set P.[[Construct]] as specified in 9.5.13.
    // 8. Set P.[[ProxyTarget]] to target.
    this['[[ProxyTarget]]'] = target;

    // 9. Set P.[[ProxyHandler]] to handler.
    this['[[ProxyHandler]]'] = handler;

    // 10. Return P.
  }


  // http://www.ecma-international.org/ecma-262/#sec-proxy-object-internal-methods-and-internal-slots-getprototypeof
  public '[[GetPrototypeOf]]'(
    ctx: ExecutionContext,
  ): $AnyObject | $Null | $Error {
    const realm = ctx.Realm;
    const intrinsics = realm['[[Intrinsics]]'];

    const handler = this['[[ProxyHandler]]'];

    // 1. Let handler be O.[[ProxyHandler]].
    if (handler.isNull) {
      // 2. If handler is null, throw a TypeError exception.
      return new $TypeError(realm);
    }

    // 3. Assert: Type(handler) is Object.
    // 4. Let target be O.[[ProxyTarget]].
    const target = this['[[ProxyTarget]]'] as $Object;

    // 5. Let trap be ? GetMethod(handler, "getPrototypeOf").
    const trap = handler.GetMethod(ctx, intrinsics.$getPrototypeOf);
    if (trap.isAbrupt) { return trap; }

    // 6. If trap is undefined, then
    if (trap.isUndefined) {
      // 6. a. Return ? target.[[GetPrototypeOf]]().
      return target['[[GetPrototypeOf]]'](ctx);
    }

    // 7. Let handlerProto be ? Call(trap, handler, « target »).
    const handlerProto = $Call(ctx, trap, handler, [target]);
    if (handlerProto.isAbrupt) { return handlerProto; }

    // 8. If Type(handlerProto) is neither Object nor Null, throw a TypeError exception.
    if (!handlerProto.isNull && !handlerProto.isObject) {
      return new $TypeError(realm);
    }

    // 9. Let extensibleTarget be ? IsExtensible(target).
    const extensibleTarget = target['[[IsExtensible]]'](ctx);
    if (extensibleTarget.isAbrupt) { return extensibleTarget; }

    // 10. If extensibleTarget is true, return handlerProto.
    if (extensibleTarget.isTruthy) {
      return handlerProto;
    }

    // 11. Let targetProto be ? target.[[GetPrototypeOf]]().
    const targetProto = target['[[GetPrototypeOf]]'](ctx);
    if (targetProto.isAbrupt) { return targetProto; }

    // 12. If SameValue(handlerProto, targetProto) is false, throw a TypeError exception.
    if (!handlerProto.is(targetProto)) {
      return new $TypeError(realm);
    }

    // 13. Return handlerProto.
    return handlerProto;
  }

  // http://www.ecma-international.org/ecma-262/#sec-proxy-object-internal-methods-and-internal-slots-setprototypeof-v
  public '[[SetPrototypeOf]]'(
    ctx: ExecutionContext,
    V: $AnyObject | $Null,
  ): $Boolean | $Error {
    const realm = ctx.Realm;
    const intrinsics = realm['[[Intrinsics]]'];

    const handler = this['[[ProxyHandler]]'];

    // 1. Assert: Either Type(V) is Object or Type(V) is Null.

    // 2. Let handler be O.[[ProxyHandler]].
    if (handler.isNull) {
      // 3. If handler is null, throw a TypeError exception.
      return new $TypeError(realm);
    }

    // 4. Assert: Type(handler) is Object.
    // 5. Let target be O.[[ProxyTarget]].
    const target = this['[[ProxyTarget]]'] as $Object;

    // 6. Let trap be ? GetMethod(handler, "setPrototypeOf").
    const trap = handler.GetMethod(ctx, intrinsics.$setPrototypeOf);
    if (trap.isAbrupt) { return trap; }

    // 7. If trap is undefined, then
    if (trap.isUndefined) {
      // 7. a. Return ? target.[[SetPrototypeOf]](V).
      return target['[[SetPrototypeOf]]'](ctx, V);
    }

    // 8. Let booleanTrapResult be ToBoolean(? Call(trap, handler, « target, V »)).
    const booleanTrapResult = $Call(ctx, trap, handler, [target, V]).ToBoolean(ctx);
    if (booleanTrapResult.isAbrupt) { return booleanTrapResult; }

    // 9. If booleanTrapResult is false, return false.
    if (booleanTrapResult.isFalsey) {
      return intrinsics.false;
    }

    // 10. Let extensibleTarget be ? IsExtensible(target).
    const extensibleTarget = target['[[IsExtensible]]'](ctx);
    if (extensibleTarget.isAbrupt) { return extensibleTarget; }
    if (extensibleTarget.isTruthy) {
      // 11. If extensibleTarget is true, return true.
      return intrinsics.true;
    }

    // 12. Let targetProto be ? target.[[GetPrototypeOf]]().
    const targetProto = target['[[GetPrototypeOf]]'](ctx);
    if (targetProto.isAbrupt) { return targetProto; }

    // 13. If SameValue(V, targetProto) is false, throw a TypeError exception.
    if (V.is(targetProto)) {
      return new $TypeError(realm);
    }

    // 14. Return true.
      return intrinsics.true;
  }

  // http://www.ecma-international.org/ecma-262/#sec-proxy-object-internal-methods-and-internal-slots-isextensible
  public '[[IsExtensible]]'(
    ctx: ExecutionContext,
  ): $Boolean | $Error {
    const realm = ctx.Realm;
    const intrinsics = realm['[[Intrinsics]]'];

    const handler = this['[[ProxyHandler]]'];

    // 1. Let handler be O.[[ProxyHandler]].
    if (handler.isNull) {
      // 2. If handler is null, throw a TypeError exception.
      return new $TypeError(realm);
    }

    // 3. Assert: Type(handler) is Object.
    // 4. Let target be O.[[ProxyTarget]].
    const target = this['[[ProxyTarget]]'] as $Object;

    // 5. Let trap be ? GetMethod(handler, "isExtensible").
    const trap = handler.GetMethod(ctx, intrinsics.$isExtensible);
    if (trap.isAbrupt) { return trap; }

    // 6. If trap is undefined, then
    if (trap.isUndefined) {
      // 6. a. Return ? target.[[IsExtensible]]().
      return target['[[IsExtensible]]'](ctx);
    }

    // 7. Let booleanTrapResult be ToBoolean(? Call(trap, handler, « target »)).
    const booleanTrapResult = $Call(ctx, trap, handler, [target]).ToBoolean(ctx);

    // 8. Let targetResult be ? target.[[IsExtensible]]().
    const targetResult = target['[[IsExtensible]]'](ctx);
    if (targetResult.isAbrupt) { return targetResult; }

    // 9. If SameValue(booleanTrapResult, targetResult) is false, throw a TypeError exception.
    if (!booleanTrapResult.is(targetResult)) {
      return new $TypeError(realm);
    }

    // 10. Return booleanTrapResult.
    return booleanTrapResult;
  }

  // http://www.ecma-international.org/ecma-262/#sec-proxy-object-internal-methods-and-internal-slots-preventextensions
  public '[[PreventExtensions]]'(
    ctx: ExecutionContext,
  ): $Boolean | $Error {
    const realm = ctx.Realm;
    const intrinsics = realm['[[Intrinsics]]'];

    const handler = this['[[ProxyHandler]]'];

    // 1. Let handler be O.[[ProxyHandler]].
    if (handler.isNull) {
      // 2. If handler is null, throw a TypeError exception.
      return new $TypeError(realm);
    }

    // 3. Assert: Type(handler) is Object.
    // 4. Let target be O.[[ProxyTarget]].
    const target = this['[[ProxyTarget]]'] as $Object;

    // 5. Let trap be ? GetMethod(handler, "preventExtensions").
    const trap = handler.GetMethod(ctx, intrinsics.$preventExtensions);
    if (trap.isAbrupt) { return trap; }

    // 6. If trap is undefined, then
    if (trap.isUndefined) {
      // 6. a. Return ? target.[[PreventExtensions]]().
      return target['[[PreventExtensions]]'](ctx);
    }

    // 7. Let booleanTrapResult be ToBoolean(? Call(trap, handler, « target »)).
    const booleanTrapResult = $Call(ctx, trap, handler, [target]).ToBoolean(ctx);
    if (booleanTrapResult.isAbrupt) { return booleanTrapResult; }

    // 8. If booleanTrapResult is true, then
    if (booleanTrapResult.isTruthy) {
      // 8. a. Let targetIsExtensible be ? target.[[IsExtensible]]().
      const targetIsExtensible = target['[[IsExtensible]]'](ctx);
      if (targetIsExtensible.isAbrupt) { return targetIsExtensible; }

      // 8. b. If targetIsExtensible is true, throw a TypeError exception.
      if (targetIsExtensible.isTruthy) {
        return new $TypeError(realm);
      }
    }

    // 9. Return booleanTrapResult.
    return booleanTrapResult;
  }

  // http://www.ecma-international.org/ecma-262/#sec-proxy-object-internal-methods-and-internal-slots-getownproperty-p
  public '[[GetOwnProperty]]'(
    ctx: ExecutionContext,
    P: $PropertyKey,
  ): $PropertyDescriptor | $Undefined | $Error {
    const realm = ctx.Realm;
    const intrinsics = realm['[[Intrinsics]]'];

    // 1. Assert: IsPropertyKey(P) is true.

    const handler = this['[[ProxyHandler]]'];

    // 2. Let handler be O.[[ProxyHandler]].
    if (handler.isNull) {
      // 3. If handler is null, throw a TypeError exception.
      return new $TypeError(realm);
    }

    // 4. Assert: Type(handler) is Object.
    // 5. Let target be O.[[ProxyTarget]].
    const target = this['[[ProxyTarget]]'] as $Object;

    // 6. Let trap be ? GetMethod(handler, "getOwnPropertyDescriptor").
    const trap = handler.GetMethod(ctx, intrinsics.$getOwnPropertyDescriptor);
    if (trap.isAbrupt) { return trap; }

    // 7. If trap is undefined, then
    if (trap.isUndefined) {
      // 7. a. Return ? target.[[GetOwnProperty]](P).
      return target['[[GetOwnProperty]]'](ctx, P);
    }

    // 8. Let trapResultObj be ? Call(trap, handler, « target, P »).
    const trapResultObj = $Call(ctx, trap, handler, [target, P]);
    if (trapResultObj.isAbrupt) { return trapResultObj; }

    // 9. If Type(trapResultObj) is neither Object nor Undefined, throw a TypeError exception.
    if (!trapResultObj.isObject && !trapResultObj.isUndefined) {
      return new $TypeError(realm);
    }

    // 10. Let targetDesc be ? target.[[GetOwnProperty]](P).
    const targetDesc = target['[[GetOwnProperty]]'](ctx, P);
    if (targetDesc.isAbrupt) { return targetDesc; }

    // 11. If trapResultObj is undefined, then
    if (trapResultObj.isUndefined) {
      // 11. a. If targetDesc is undefined, return undefined.
      if (targetDesc.isUndefined) {
        return intrinsics.undefined;
      }

      // 11. b. If targetDesc.[[Configurable]] is false, throw a TypeError exception.
      if (targetDesc['[[Configurable]]'].isFalsey) {
        return new $TypeError(realm);
      }

      // 11. c. Let extensibleTarget be ? IsExtensible(target).
      const extensibleTarget = target['[[IsExtensible]]'](ctx);
      if (extensibleTarget.isAbrupt) { return extensibleTarget; }

      // 11. d. If extensibleTarget is false, throw a TypeError exception.
      if (extensibleTarget.isFalsey) {
        return new $TypeError(realm);
      }

      // 11. e. Return undefined.
      return intrinsics.undefined;
    }

    // 12. Let extensibleTarget be ? IsExtensible(target).
    const extensibleTarget = target['[[IsExtensible]]'](ctx);
    if (extensibleTarget.isAbrupt) { return extensibleTarget; }

    // 13. Let resultDesc be ? ToPropertyDescriptor(trapResultObj).
    const resultDesc = $ToPropertyDescriptor(ctx, trapResultObj, P);
    if (resultDesc.isAbrupt) { return resultDesc; }

    // 14. Call CompletePropertyDescriptor(resultDesc).
    resultDesc.Complete(ctx);

    // 15. Let valid be IsCompatiblePropertyDescriptor(extensibleTarget, resultDesc, targetDesc).
    const valid = $ValidateAndApplyPropertyDescriptor(
      ctx,
      /* O */intrinsics.undefined,
      /* P */intrinsics.undefined,
      /* extensible */extensibleTarget,
      /* Desc */resultDesc,
      /* current */targetDesc,
    );

    // 16. If valid is false, throw a TypeError exception.
    if (valid.isFalsey) {
      return new $TypeError(realm);
    }

    // 17. If resultDesc.[[Configurable]] is false, then
    if (resultDesc['[[Configurable]]'].isFalsey) {
      // 17. a. If targetDesc is undefined or targetDesc.[[Configurable]] is true, then
      if (targetDesc.isUndefined || targetDesc['[[Configurable]]'].isTruthy) {
        // 17. a. i. Throw a TypeError exception.
        return new $TypeError(realm);
      }
    }

    // 18. Return resultDesc.
    return resultDesc;
  }

  // http://www.ecma-international.org/ecma-262/#sec-proxy-object-internal-methods-and-internal-slots-defineownproperty-p-desc
  public '[[DefineOwnProperty]]'(
    ctx: ExecutionContext,
    P: $PropertyKey,
    Desc: $PropertyDescriptor,
  ): $Boolean | $Error {
    const realm = ctx.Realm;
    const intrinsics = realm['[[Intrinsics]]'];

    // 1. Assert: IsPropertyKey(P) is true.

    const handler = this['[[ProxyHandler]]'];

    // 2. Let handler be O.[[ProxyHandler]].
    if (handler.isNull) {
      // 3. If handler is null, throw a TypeError exception.
      return new $TypeError(realm);
    }

    // 4. Assert: Type(handler) is Object.
    // 5. Let target be O.[[ProxyTarget]].
    const target = this['[[ProxyTarget]]'] as $Object;

    // 6. Let trap be ? GetMethod(handler, "defineProperty").
    const trap = handler.GetMethod(ctx, intrinsics.$defineProperty);
    if (trap.isAbrupt) { return trap; }

    // 7. If trap is undefined, then
    if (trap.isUndefined) {
      // 7. a. Return ? target.[[DefineOwnProperty]](P, Desc).
      return target['[[DefineOwnProperty]]'](ctx, P, Desc);
    }

    // 8. Let descObj be FromPropertyDescriptor(Desc).
    const descObj = $FromPropertyDescriptor(ctx, Desc);
    if (descObj.isAbrupt) { return descObj; } // TODO: spec doesn't say this. maybe we need to fix the types somehow?

    // 9. Let booleanTrapResult be ToBoolean(? Call(trap, handler, « target, P, descObj »)).
    const booleanTrapResult = $Call(ctx, trap, handler, [target, P, descObj]).ToBoolean(ctx);
    if (booleanTrapResult.isAbrupt) { return booleanTrapResult; }

    // 10. If booleanTrapResult is false, return false.
    if (booleanTrapResult.isFalsey) {
      return intrinsics.false;
    }

    // 11. Let targetDesc be ? target.[[GetOwnProperty]](P).
    const targetDesc = target['[[GetOwnProperty]]'](ctx, P);
    if (targetDesc.isAbrupt) { return targetDesc; }

    // 12. Let extensibleTarget be ? IsExtensible(target).
    const extensibleTarget = target['[[IsExtensible]]'](ctx);
    if (extensibleTarget.isAbrupt) { return extensibleTarget; }

    let settingConfigFalse: boolean;
    // 13. If Desc has a [[Configurable]] field and if Desc.[[Configurable]] is false, then
    if (Desc['[[Configurable]]'].hasValue && Desc['[[Configurable]]'].isFalsey) {
      // 13. a. Let settingConfigFalse be true.
      settingConfigFalse = true;
    }
    // 14. Else, let settingConfigFalse be false.
    else {
      settingConfigFalse = false;
    }

    // 15. If targetDesc is undefined, then
    if (targetDesc.isUndefined) {
      // 15. a. If extensibleTarget is false, throw a TypeError exception.
      if (extensibleTarget.isFalsey) {
        return new $TypeError(realm);
      }

      // 15. b. If settingConfigFalse is true, throw a TypeError exception.
      if (!settingConfigFalse) {
        return new $TypeError(realm);
      }
    }
    // 16. Else targetDesc is not undefined,
    else {
      // 16. a. If IsCompatiblePropertyDescriptor(extensibleTarget, Desc, targetDesc) is false, throw a TypeError exception.
      if ($ValidateAndApplyPropertyDescriptor(
        ctx,
        /* O */intrinsics.undefined,
        /* P */intrinsics.undefined,
        /* extensible */extensibleTarget,
        /* Desc */Desc,
        /* current */targetDesc,
      )) {
        return new $TypeError(realm);
      }

      // 16. b. If settingConfigFalse is true and targetDesc.[[Configurable]] is true, throw a TypeError exception.
      if (settingConfigFalse && targetDesc['[[Configurable]]'].isTruthy) {
        return new $TypeError(realm);
      }
    }

    // 17. Return true.
    return intrinsics.true;
  }

  // http://www.ecma-international.org/ecma-262/#sec-proxy-object-internal-methods-and-internal-slots-hasproperty-p
  public '[[HasProperty]]'(
    ctx: ExecutionContext,
    P: $PropertyKey,
  ): $Boolean | $Error {
    const realm = ctx.Realm;
    const intrinsics = realm['[[Intrinsics]]'];

    // 1. Assert: IsPropertyKey(P) is true.

    const handler = this['[[ProxyHandler]]'];

    // 2. Let handler be O.[[ProxyHandler]].
    if (handler.isNull) {
      // 3. If handler is null, throw a TypeError exception.
      return new $TypeError(realm);
    }

    // 4. Assert: Type(handler) is Object.
    // 5. Let target be O.[[ProxyTarget]].
    const target = this['[[ProxyTarget]]'] as $Object;

    // 6. Let trap be ? GetMethod(handler, "has").
    const trap = handler.GetMethod(ctx, intrinsics.$has);
    if (trap.isAbrupt) { return trap; }

    // 7. If trap is undefined, then
    if (trap.isUndefined) {
      // 7. a. Return ? target.[[HasProperty]](P).
      return target['[[HasProperty]]'](ctx, P);
    }

    // 8. Let booleanTrapResult be ToBoolean(? Call(trap, handler, « target, P »)).
    const booleanTrapResult = $Call(ctx, trap, handler, [target, P]).ToBoolean(ctx);
    if (booleanTrapResult.isAbrupt) { return booleanTrapResult; }

    // 9. If booleanTrapResult is false, then
    if (booleanTrapResult.isFalsey) {
      // 9. a. Let targetDesc be ? target.[[GetOwnProperty]](P).
      const targetDesc = target['[[GetOwnProperty]]'](ctx, P);
      if (targetDesc.isAbrupt) { return targetDesc; }

      // 9. b. If targetDesc is not undefined, then
      if (!targetDesc.isUndefined) {
        // 9. b. i. If targetDesc.[[Configurable]] is false, throw a TypeError exception.
        if (targetDesc['[[Configurable]]'].isFalsey) {
          return new $TypeError(realm);
        }

        // 9. b. ii. Let extensibleTarget be ? IsExtensible(target).
        const extensibleTarget = target['[[IsExtensible]]'](ctx);
        if (extensibleTarget.isAbrupt) { return extensibleTarget; }

        if (extensibleTarget.isFalsey) {
          // 9. b. iii. If extensibleTarget is false, throw a TypeError exception.
          return new $TypeError(realm);
        }
      }
    }

    // 10. Return booleanTrapResult.
    return booleanTrapResult;
  }

  // http://www.ecma-international.org/ecma-262/#sec-proxy-object-internal-methods-and-internal-slots-get-p-receiver
  public '[[Get]]'(
    ctx: ExecutionContext,
    P: $PropertyKey,
    Receiver: $AnyNonEmpty,
  ): $AnyNonEmpty | $Error {
    const realm = ctx.Realm;
    const intrinsics = realm['[[Intrinsics]]'];

    // 1. Assert: IsPropertyKey(P) is true.

    const handler = this['[[ProxyHandler]]'];

    // 2. Let handler be O.[[ProxyHandler]].
    if (handler.isNull) {
      // 3. If handler is null, throw a TypeError exception.
      return new $TypeError(realm);
    }

    // 4. Assert: Type(handler) is Object.
    // 5. Let target be O.[[ProxyTarget]].
    const target = this['[[ProxyTarget]]'] as $Object;

    // 6. Let trap be ? GetMethod(handler, "get").
    const trap = handler.GetMethod(ctx, intrinsics.$get);
    if (trap.isAbrupt) { return trap; }

    // 7. If trap is undefined, then
    if (trap.isUndefined) {
      // 7. a. Return ? target.[[Get]](P, Receiver).
      return target['[[Get]]'](ctx, P, Receiver);
    }

    // 8. Let trapResult be ? Call(trap, handler, « target, P, Receiver »).
    const trapResult = $Call(ctx, trap, handler, [target, P, Receiver]);
    if (trapResult.isAbrupt) { return trapResult; }

    // 9. Let targetDesc be ? target.[[GetOwnProperty]](P).
    const targetDesc = target['[[GetOwnProperty]]'](ctx, P);
    if (targetDesc.isAbrupt) { return targetDesc; }

    // 10. If targetDesc is not undefined and targetDesc.[[Configurable]] is false, then
    if (!targetDesc.isUndefined && targetDesc['[[Configurable]]'].isFalsey) {
      // 10. a. If IsDataDescriptor(targetDesc) is true and targetDesc.[[Writable]] is false, then
      if (targetDesc.isDataDescriptor && targetDesc['[[Writable]]'].isFalsey) {
        // 10. a. i. If SameValue(trapResult, targetDesc.[[Value]]) is false, throw a TypeError exception.
        if (!trapResult.is(targetDesc['[[Value]]'])) {
          return new $TypeError(realm);
        }
      }

      // 10. b. If IsAccessorDescriptor(targetDesc) is true and targetDesc.[[Get]] is undefined, then
      if (targetDesc.isAccessorDescriptor && targetDesc['[[Get]]'].isUndefined) {
        // 10. b. i. If trapResult is not undefined, throw a TypeError exception.
        if (!trapResult.isUndefined) {
          return new $TypeError(realm);
        }
      }
    }

    // 11. Return trapResult.
    return trapResult;
  }

  // http://www.ecma-international.org/ecma-262/#sec-proxy-object-internal-methods-and-internal-slots-set-p-v-receiver
  public '[[Set]]'(
    ctx: ExecutionContext,
    P: $PropertyKey,
    V: $AnyNonEmpty,
    Receiver: $AnyObject,
  ): $Boolean | $Error {
    const realm = ctx.Realm;
    const intrinsics = realm['[[Intrinsics]]'];

    // 1. Assert: IsPropertyKey(P) is true.

    const handler = this['[[ProxyHandler]]'];

    // 2. Let handler be O.[[ProxyHandler]].
    if (handler.isNull) {
      // 3. If handler is null, throw a TypeError exception.
      return new $TypeError(realm);
    }

    // 4. Assert: Type(handler) is Object.
    // 5. Let target be O.[[ProxyTarget]].
    const target = this['[[ProxyTarget]]'] as $Object;

    // 6. Let trap be ? GetMethod(handler, "set").
    const trap = handler.GetMethod(ctx, intrinsics.$set);
    if (trap.isAbrupt) { return trap; }

    // 7. If trap is undefined, then
    if (trap.isUndefined) {
      // 7. a. Return ? target.[[Set]](P, V, Receiver).
      return target['[[Set]]'](ctx, P, V, Receiver);
    }

    // 8. Let booleanTrapResult be ToBoolean(? Call(trap, handler, « target, P, V, Receiver »)).
    const booleanTrapResult = $Call(ctx, trap, handler, [target, P, V, Receiver]).ToBoolean(ctx);
    if (booleanTrapResult.isAbrupt) { return booleanTrapResult; }

    // 9. If booleanTrapResult is false, return false.
    if (booleanTrapResult.isFalsey) {
      return intrinsics.false;
    }

    // 10. Let targetDesc be ? target.[[GetOwnProperty]](P).
    const targetDesc = target['[[GetOwnProperty]]'](ctx, P);
    if (targetDesc.isAbrupt) { return targetDesc; }

    // 11. If targetDesc is not undefined and targetDesc.[[Configurable]] is false, then
    if (!targetDesc.isUndefined && targetDesc['[[Configurable]]'].isFalsey) {

      // 11. a. If IsDataDescriptor(targetDesc) is true and targetDesc.[[Writable]] is false, then
      if (targetDesc.isDataDescriptor && targetDesc['[[Writable]]'].isFalsey) {

        // 11. a. i. If SameValue(V, targetDesc.[[Value]]) is false, throw a TypeError exception.
        if (!V.is(targetDesc['[[Value]]'])) {
          return new $TypeError(realm);
        }
      }

      // 11. b. If IsAccessorDescriptor(targetDesc) is true, then
      if (targetDesc.isAccessorDescriptor) {
        // 11. b. i. If targetDesc.[[Set]] is undefined, throw a TypeError exception.
        if (targetDesc['[[Set]]'].isUndefined) {
          return new $TypeError(realm);
        }
      }
    }

    // 12. Return true.
    return intrinsics.true;
  }

  // http://www.ecma-international.org/ecma-262/#sec-proxy-object-internal-methods-and-internal-slots-delete-p
  public '[[Delete]]'(
    ctx: ExecutionContext,
    P: $PropertyKey,
  ): $Boolean | $Error {
    const realm = ctx.Realm;
    const intrinsics = realm['[[Intrinsics]]'];

    // 1. Assert: IsPropertyKey(P) is true.

    const handler = this['[[ProxyHandler]]'];

    // 2. Let handler be O.[[ProxyHandler]].
    if (handler.isNull) {
      // 3. If handler is null, throw a TypeError exception.
      return new $TypeError(realm);
    }

    // 4. Assert: Type(handler) is Object.
    // 5. Let target be O.[[ProxyTarget]].
    const target = this['[[ProxyTarget]]'] as $Object;

    // 6. Let trap be ? GetMethod(handler, "deleteProperty").
    const trap = handler.GetMethod(ctx, intrinsics.$deleteProperty);
    if (trap.isAbrupt) { return trap; }

    // 7. If trap is undefined, then
    if (trap.isUndefined) {
      // 7. a. Return ? target.[[Delete]](P).
      return target['[[Delete]]'](ctx, P);
    }

    // 8. Let booleanTrapResult be ToBoolean(? Call(trap, handler, « target, P »)).
    const booleanTrapResult = $Call(ctx, trap, handler, [target, P]).ToBoolean(ctx);
    if (booleanTrapResult.isAbrupt) { return booleanTrapResult; }

    // 9. If booleanTrapResult is false, return false.
    if (booleanTrapResult.isFalsey) {
      return intrinsics.false;
    }

    // 10. Let targetDesc be ? target.[[GetOwnProperty]](P).
    const targetDesc = target['[[GetOwnProperty]]'](ctx, P);
    if (targetDesc.isAbrupt) { return targetDesc; }

    // 11. If targetDesc is undefined, return true.
    if (targetDesc.isUndefined) {
      return intrinsics.true;
    }

    // 12. If targetDesc.[[Configurable]] is false, throw a TypeError exception.
    if (targetDesc['[[Configurable]]'].isFalsey) {
      return new $TypeError(realm);
    }

    // 13. Return true.
    return intrinsics.true;
  }

  // http://www.ecma-international.org/ecma-262/#sec-proxy-object-internal-methods-and-internal-slots-ownpropertykeys
  public '[[OwnPropertyKeys]]'(
    ctx: ExecutionContext,
  ): $List<$PropertyKey> | $Error {
    const realm = ctx.Realm;
    const intrinsics = realm['[[Intrinsics]]'];

    const handler = this['[[ProxyHandler]]'];

    // 1. Let handler be O.[[ProxyHandler]].
    if (handler.isNull) {
      // 2. If handler is null, throw a TypeError exception.
      return new $TypeError(realm);
    }

    // 3. Assert: Type(handler) is Object.
    // 4. Let target be O.[[ProxyTarget]].
    const target = this['[[ProxyTarget]]'] as $Object;

    // 5. Let trap be ? GetMethod(handler, "ownKeys").
    const trap = handler.GetMethod(ctx, intrinsics.$ownKeys);
    if (trap.isAbrupt) { return trap; }

    // 6. If trap is undefined, then
    if (trap.isUndefined) {
      // 6. a. Return ? target.[[OwnPropertyKeys]]().
      return target['[[OwnPropertyKeys]]'](ctx);
    }

    // 7. Let trapResultArray be ? Call(trap, handler, « target »).
    const trapResultArray = $Call(ctx, trap, handler, [target]);
    if (trapResultArray.isAbrupt) { return trapResultArray; }

    // 8. Let trapResult be ? CreateListFromArrayLike(trapResultArray, « String, Symbol »).
    const trapResult = $CreateListFromArrayLike(ctx, trapResultArray, ['String', 'Symbol']) as $List<$String | $Symbol>;
    if (trapResult.isAbrupt) { return trapResult; }

    // 9. If trapResult contains any duplicate entries, throw a TypeError exception.
    if (trapResult.filter((x, i) => trapResult.findIndex(y => x.is(y)) === i).length !== trapResult.length) {
      return new $TypeError(realm);
    }

    // 10. Let extensibleTarget be ? IsExtensible(target).
    const extensibleTarget = target['[[IsExtensible]]'](ctx);
    if (extensibleTarget.isAbrupt) { return extensibleTarget; }

    // 11. Let targetKeys be ? target.[[OwnPropertyKeys]]().
    const targetKeys = target['[[OwnPropertyKeys]]'](ctx);
    if (targetKeys.isAbrupt) { return targetKeys; }

    // 12. Assert: targetKeys is a List containing only String and Symbol values.
    // 13. Assert: targetKeys contains no duplicate entries.

    // 14. Let targetConfigurableKeys be a new empty List.
    const targetConfigurableKeys: $PropertyKey[] = [];

    // 15. Let targetNonconfigurableKeys be a new empty List.
    const targetNonconfigurableKeys: $PropertyKey[] = [];

    // 16. For each element key of targetKeys, do
    for (const key of targetKeys) {
      // 16. a. Let desc be ? target.[[GetOwnProperty]](key).
      const desc = target['[[GetOwnProperty]]'](ctx, key);
      if (desc.isAbrupt) { return desc; }

      // 16. b. If desc is not undefined and desc.[[Configurable]] is false, then
      if (!desc.isUndefined && desc['[[Configurable]]'].isFalsey) {
        // 16. b. i. Append key as an element of targetNonconfigurableKeys.
        targetNonconfigurableKeys.push(key);
      }
      // 16. c. Else,
      else {
        // 16. c. i. Append key as an element of targetConfigurableKeys.
        targetConfigurableKeys.push(key);
      }
    }

    // 17. If extensibleTarget is true and targetNonconfigurableKeys is empty, then
    if (extensibleTarget.isTruthy && targetConfigurableKeys.length === 0)  {
      // 17. a. Return trapResult.
      return trapResult;
    }

    // 18. Let uncheckedResultKeys be a new List which is a copy of trapResult.
    const uncheckedResultKeys = trapResult.slice();

    // 19. For each key that is an element of targetNonconfigurableKeys, do
    for (const key of targetNonconfigurableKeys) {
      // 19. a. If key is not an element of uncheckedResultKeys, throw a TypeError exception.
      const idx = uncheckedResultKeys.findIndex(x => x.is(key));
      if (idx === -1) {
        return new $TypeError(realm);
      }

      // 19. b. Remove key from uncheckedResultKeys.
      uncheckedResultKeys.splice(idx, 1);
    }

    // 20. If extensibleTarget is true, return trapResult.
    if (extensibleTarget.isTruthy) {
      return trapResult;
    }

    // 21. For each key that is an element of targetConfigurableKeys, do
    for (const key of targetConfigurableKeys) {
      // 21. a. If key is not an element of uncheckedResultKeys, throw a TypeError exception.
      const idx = targetConfigurableKeys.findIndex(x => x.is(key));
      if (idx === -1) {
        return new $TypeError(realm);
      }

      // 21. b. Remove key from uncheckedResultKeys.
      uncheckedResultKeys.splice(idx, 1);
    }

    // 22. If uncheckedResultKeys is not empty, throw a TypeError exception.
    if (uncheckedResultKeys.length > 0) {
      return new $TypeError(realm);
    }

    // 23. Return trapResult.
    return trapResult;
  }

  // http://www.ecma-international.org/ecma-262/#sec-proxy-object-internal-methods-and-internal-slots-call-thisargument-argumentslist
  public '[[Call]]'(
    ctx: ExecutionContext,
    thisArgument: $AnyNonEmpty,
    argumentsList: readonly $AnyNonEmpty[],
  ): $AnyNonEmpty | $Error {
    const realm = ctx.Realm;
    const intrinsics = realm['[[Intrinsics]]'];

    // 1. Let handler be O.[[ProxyHandler]].
    const handler = this['[[ProxyHandler]]'];

    // 2. If handler is null, throw a TypeError exception.
    if (handler.isNull) {
      return new $TypeError(realm);
    }

    // 3. Assert: Type(handler) is Object.
    // 4. Let target be O.[[ProxyTarget]].
    const target = this['[[ProxyTarget]]'] as $Function;

    // 5. Let trap be ? GetMethod(handler, "apply").
    const trap = handler.GetMethod(ctx, intrinsics.$apply);
    if (trap.isAbrupt) { return trap; }

    // 6. If trap is undefined, then
    if (trap.isUndefined) {
      // 6. a. Return ? Call(target, thisArgument, argumentsList).
      return $Call(ctx, target, thisArgument, argumentsList);
    }

    // 7. Let argArray be CreateArrayFromList(argumentsList).
    const argArray = $CreateArrayFromList(ctx, argumentsList);

    // 8. Return ? Call(trap, handler, « target, thisArgument, argArray »).
    return $Call(ctx, trap, handler, [target, thisArgument, argArray]);
  }

  // http://www.ecma-international.org/ecma-262/#sec-proxy-object-internal-methods-and-internal-slots-construct-argumentslist-newtarget
  public '[[Construct]]'(
    ctx: ExecutionContext,
    argumentsList: readonly $AnyNonEmpty[],
    newTarget: $AnyObject,
  ): $AnyObject | $Error {
    const realm = ctx.Realm;
    const intrinsics = realm['[[Intrinsics]]'];

    // 1. Let handler be O.[[ProxyHandler]].
    const handler = this['[[ProxyHandler]]'];

    // 2. If handler is null, throw a TypeError exception.
    if (handler.isNull) {
      return new $TypeError(realm);
    }

    // 3. Assert: Type(handler) is Object.
    // 4. Let target be O.[[ProxyTarget]].
    const target = this['[[ProxyTarget]]'] as $Function;

    // 5. Assert: IsConstructor(target) is true.
    // 6. Let trap be ? GetMethod(handler, "construct").
    const trap = handler.GetMethod(ctx, intrinsics.$construct);
    if (trap.isAbrupt) { return trap; }

    // 7. If trap is undefined, then
    if (trap.isUndefined) {
      // 7. a. Return ? Construct(target, argumentsList, newTarget).
      return $Construct(ctx, target, argumentsList, newTarget);
    }

    // 8. Let argArray be CreateArrayFromList(argumentsList).
    const argArray = $CreateArrayFromList(ctx, argumentsList);

    // 9. Let newObj be ? Call(trap, handler, « target, argArray, newTarget »).
    const newObj = $Call(ctx, trap, handler, [target, argArray, newTarget]);
    if (newObj.isAbrupt) { return newObj; }

    // 10. If Type(newObj) is not Object, throw a TypeError exception.
    if (!newObj.isObject) {
      return new $TypeError(realm);
    }

    // 11. Return newObj.
    return newObj;
  }
}