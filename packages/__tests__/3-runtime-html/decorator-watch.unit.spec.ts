import { DI } from '@aurelia/kernel';
import { AccessMemberExpression, AccessScopeExpression, ComputedWatcher, ExpressionWatcher } from '@aurelia/runtime';
import { assert, createObserverLocator, createScopeForTest } from '@aurelia/testing';

describe('3-runtime-html/decorator-watch.unit.spec.ts', function () {
  describe('ComputedWatcher', function () {
    it('works', function () {
      let getCallCount = 0;
      const callbackValues = [];
      const container = DI.createContainer();
      const observerLocator = createObserverLocator(container);
      const obj: any = {};
      const watcher = new ComputedWatcher(
        obj,
        observerLocator,
        o => {
          getCallCount++;
          return (o as any)['prop'];
        },
        (newValue) => {
          callbackValues.push(newValue);
        },
      );

      watcher.$bind();
      assert.strictEqual(watcher['value'], undefined);
      assert.strictEqual(getCallCount, 1);
      assert.deepStrictEqual(callbackValues, []);

      obj.prop = 1;
      assert.strictEqual(watcher['value'], 1);
      assert.strictEqual(getCallCount, 2);
      assert.deepStrictEqual(callbackValues, [1]);

      obj.prop = 2;
      assert.strictEqual(watcher['value'], 2);
      assert.strictEqual(getCallCount, 3);
      assert.deepStrictEqual(callbackValues, [1, 2]);

      watcher.isBound = false;
      obj.prop = 3;
      assert.strictEqual(watcher['value'], 2);
      assert.strictEqual(getCallCount, 3);
      assert.deepStrictEqual(callbackValues, [1, 2]);
    });

    it('observes collection/collection length', function () {
      let getCallCount = 0;
      const callbackValues = [];
      const container = DI.createContainer();
      const observerLocator = createObserverLocator(container);
      const obj: any = {};
      const watcher = new ComputedWatcher(
        obj,
        observerLocator,
        o => {
          getCallCount++;
          return o;
        },
        (newValue) => {
          callbackValues.push(newValue);
        },
      );
      const arr = [];
      watcher.isBound = true;
      watcher.observeCollection(arr);
      arr.push(1);

      assert.strictEqual(getCallCount, 1);
      assert.deepStrictEqual(callbackValues, [obj]);

      // collection observation dropped last run
      arr.push(2);
      assert.strictEqual(getCallCount, 1);
      assert.deepStrictEqual(callbackValues, [obj]);

      // start again
      watcher.observeLength(arr);
      arr.push(3);
      assert.strictEqual(getCallCount, 2);
      // returning te same value, callback won't be call
      assert.deepStrictEqual(callbackValues, [obj]);
    });
  });

  describe('ExpressionWatcher', function () {
    it('observers', function () {
      let evaluateCallCount = 0;
      const callbackValues = [];
      const container = DI.createContainer();
      const observerLocator = createObserverLocator(container);
      const obj: any = { a: {} };
      const expr = new AccessMemberExpression(
        new AccessScopeExpression('a'),
        'prop'
      );
      const watcher = new ExpressionWatcher(
        createScopeForTest(obj),
        container,
        observerLocator,
        expr,
        newValue => {
          callbackValues.push(newValue);
        }
      );
      expr.evaluate = (evaluate => {
        return function (...args: unknown[]) {
          evaluateCallCount++;
          assert.strictEqual(args[4], watcher);
          return evaluate.apply(this, args);
        };
      })(expr.evaluate);

      obj.a.prop = 1;
      assert.strictEqual(evaluateCallCount, 0);
      assert.strictEqual(watcher['value'], void 0);
      assert.deepStrictEqual(callbackValues, []);

      watcher.$bind();
      assert.strictEqual(evaluateCallCount, 1);
      assert.strictEqual(watcher['value'], 1);
      assert.deepStrictEqual(callbackValues, []);

      obj.a.prop = 2;
      assert.strictEqual(evaluateCallCount, 2);
      assert.strictEqual(watcher['value'], 2);
      assert.deepStrictEqual(callbackValues, [2]);

      watcher.$unbind();
      assert.strictEqual(evaluateCallCount, 2);
      assert.strictEqual(watcher['value'], void 0);
      assert.deepStrictEqual(callbackValues, [2]);

      obj.a.prop = 3;
      assert.strictEqual(evaluateCallCount, 2);
      assert.strictEqual(watcher['value'], void 0);
      assert.deepStrictEqual(callbackValues, [2]);
    });
  });

});