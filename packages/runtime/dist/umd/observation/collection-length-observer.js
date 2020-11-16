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
        define(["require", "exports", "./subscriber-collection.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CollectionLengthObserver = void 0;
    const subscriber_collection_js_1 = require("./subscriber-collection.js");
    let CollectionLengthObserver = class CollectionLengthObserver {
        constructor(obj) {
            this.obj = obj;
            this.type = 10 /* Array */;
            this.currentValue = obj.length;
        }
        getValue() {
            return this.obj.length;
        }
        setValue(newValue, flags) {
            const currentValue = this.currentValue;
            if (newValue !== currentValue) {
                this.currentValue = newValue;
                this.callSubscribers(newValue, currentValue, flags | 8 /* updateTarget */);
            }
        }
    };
    CollectionLengthObserver = __decorate([
        subscriber_collection_js_1.subscriberCollection(),
        __metadata("design:paramtypes", [Array])
    ], CollectionLengthObserver);
    exports.CollectionLengthObserver = CollectionLengthObserver;
});
//# sourceMappingURL=collection-length-observer.js.map