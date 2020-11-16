var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../binding-behavior.js", "@aurelia/kernel", "../binding/ast.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ThrottleBindingBehavior = void 0;
    const binding_behavior_js_1 = require("../binding-behavior.js");
    const kernel_1 = require("@aurelia/kernel");
    const ast_js_1 = require("../binding/ast.js");
    let ThrottleBindingBehavior = class ThrottleBindingBehavior extends binding_behavior_js_1.BindingInterceptor {
        constructor(binding, expr) {
            super(binding, expr);
            this.opts = { delay: 0 };
            this.firstArg = null;
            this.task = null;
            this.lastCall = 0;
            this.platform = binding.locator.get(kernel_1.IPlatform);
            this.taskQueue = this.platform.macroTaskQueue;
            if (expr.args.length > 0) {
                this.firstArg = expr.args[0];
            }
        }
        callSource(args) {
            this.queueTask(() => this.binding.callSource(args));
            return void 0;
        }
        handleChange(newValue, previousValue, flags) {
            this.queueTask(() => this.binding.handleChange(newValue, previousValue, flags));
        }
        queueTask(callback) {
            const opts = this.opts;
            const platform = this.platform;
            const nextDelay = this.lastCall + opts.delay - platform.performanceNow();
            if (nextDelay > 0) {
                if (this.task !== null) {
                    this.task.cancel();
                }
                opts.delay = nextDelay;
                this.task = this.taskQueue.queueTask(() => {
                    this.lastCall = platform.performanceNow();
                    this.task = null;
                    callback();
                }, opts);
            }
            else {
                this.lastCall = platform.performanceNow();
                callback();
            }
        }
        $bind(flags, scope, hostScope) {
            if (this.firstArg !== null) {
                const delay = Number(this.firstArg.evaluate(flags, scope, hostScope, this.locator, null));
                if (!isNaN(delay)) {
                    this.opts.delay = delay;
                }
            }
            this.binding.$bind(flags, scope, hostScope);
        }
        $unbind(flags) {
            var _a;
            (_a = this.task) === null || _a === void 0 ? void 0 : _a.cancel();
            this.task = null;
            super.$unbind(flags);
        }
    };
    ThrottleBindingBehavior = __decorate([
        binding_behavior_js_1.bindingBehavior('throttle'),
        __metadata("design:paramtypes", [Object, ast_js_1.BindingBehaviorExpression])
    ], ThrottleBindingBehavior);
    exports.ThrottleBindingBehavior = ThrottleBindingBehavior;
});
//# sourceMappingURL=throttle.js.map