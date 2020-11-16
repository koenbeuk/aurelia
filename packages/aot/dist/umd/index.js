(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./system/file-system.js", "./system/interfaces.js", "./vm/types/boolean.js", "./vm/types/empty.js", "./vm/types/error.js", "./vm/types/null.js", "./vm/types/number.js", "./vm/types/object.js", "./vm/types/string.js", "./vm/types/symbol.js", "./vm/types/undefined.js", "./vm/agent.js", "./vm/ast/modules.js", "./vm/job.js", "./vm/realm.js", "./service-host.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ServiceHost = exports.DeferredModule = exports.ExecutionContext = exports.Realm = exports.Job = exports.$ESScript = exports.$DocumentFragment = exports.$ESModule = exports.ISourceFileProvider = exports.$Undefined = exports.$Symbol = exports.$String = exports.$Object = exports.$Number = exports.$Null = exports.$URIError = exports.$TypeError = exports.$SyntaxError = exports.$ReferenceError = exports.$RangeError = exports.$Error = exports.$Empty = exports.$Boolean = exports.IFileSystem = exports.FileKind = exports.Encoding = exports.NodeFileSystem = void 0;
    var file_system_js_1 = require("./system/file-system.js");
    Object.defineProperty(exports, "NodeFileSystem", { enumerable: true, get: function () { return file_system_js_1.NodeFileSystem; } });
    var interfaces_js_1 = require("./system/interfaces.js");
    Object.defineProperty(exports, "Encoding", { enumerable: true, get: function () { return interfaces_js_1.Encoding; } });
    Object.defineProperty(exports, "FileKind", { enumerable: true, get: function () { return interfaces_js_1.FileKind; } });
    Object.defineProperty(exports, "IFileSystem", { enumerable: true, get: function () { return interfaces_js_1.IFileSystem; } });
    var boolean_js_1 = require("./vm/types/boolean.js");
    Object.defineProperty(exports, "$Boolean", { enumerable: true, get: function () { return boolean_js_1.$Boolean; } });
    var empty_js_1 = require("./vm/types/empty.js");
    Object.defineProperty(exports, "$Empty", { enumerable: true, get: function () { return empty_js_1.$Empty; } });
    var error_js_1 = require("./vm/types/error.js");
    Object.defineProperty(exports, "$Error", { enumerable: true, get: function () { return error_js_1.$Error; } });
    Object.defineProperty(exports, "$RangeError", { enumerable: true, get: function () { return error_js_1.$RangeError; } });
    Object.defineProperty(exports, "$ReferenceError", { enumerable: true, get: function () { return error_js_1.$ReferenceError; } });
    Object.defineProperty(exports, "$SyntaxError", { enumerable: true, get: function () { return error_js_1.$SyntaxError; } });
    Object.defineProperty(exports, "$TypeError", { enumerable: true, get: function () { return error_js_1.$TypeError; } });
    Object.defineProperty(exports, "$URIError", { enumerable: true, get: function () { return error_js_1.$URIError; } });
    // export {
    //   $BuiltinFunction,
    //   $Function,
    // } from './vm/types/function.js';
    var null_js_1 = require("./vm/types/null.js");
    Object.defineProperty(exports, "$Null", { enumerable: true, get: function () { return null_js_1.$Null; } });
    var number_js_1 = require("./vm/types/number.js");
    Object.defineProperty(exports, "$Number", { enumerable: true, get: function () { return number_js_1.$Number; } });
    var object_js_1 = require("./vm/types/object.js");
    Object.defineProperty(exports, "$Object", { enumerable: true, get: function () { return object_js_1.$Object; } });
    var string_js_1 = require("./vm/types/string.js");
    Object.defineProperty(exports, "$String", { enumerable: true, get: function () { return string_js_1.$String; } });
    var symbol_js_1 = require("./vm/types/symbol.js");
    Object.defineProperty(exports, "$Symbol", { enumerable: true, get: function () { return symbol_js_1.$Symbol; } });
    var undefined_js_1 = require("./vm/types/undefined.js");
    Object.defineProperty(exports, "$Undefined", { enumerable: true, get: function () { return undefined_js_1.$Undefined; } });
    var agent_js_1 = require("./vm/agent.js");
    Object.defineProperty(exports, "ISourceFileProvider", { enumerable: true, get: function () { return agent_js_1.ISourceFileProvider; } });
    var modules_js_1 = require("./vm/ast/modules.js");
    Object.defineProperty(exports, "$ESModule", { enumerable: true, get: function () { return modules_js_1.$ESModule; } });
    Object.defineProperty(exports, "$DocumentFragment", { enumerable: true, get: function () { return modules_js_1.$DocumentFragment; } });
    Object.defineProperty(exports, "$ESScript", { enumerable: true, get: function () { return modules_js_1.$ESScript; } });
    var job_js_1 = require("./vm/job.js");
    Object.defineProperty(exports, "Job", { enumerable: true, get: function () { return job_js_1.Job; } });
    var realm_js_1 = require("./vm/realm.js");
    Object.defineProperty(exports, "Realm", { enumerable: true, get: function () { return realm_js_1.Realm; } });
    Object.defineProperty(exports, "ExecutionContext", { enumerable: true, get: function () { return realm_js_1.ExecutionContext; } });
    Object.defineProperty(exports, "DeferredModule", { enumerable: true, get: function () { return realm_js_1.DeferredModule; } });
    var service_host_js_1 = require("./service-host.js");
    Object.defineProperty(exports, "ServiceHost", { enumerable: true, get: function () { return service_host_js_1.ServiceHost; } });
});
//# sourceMappingURL=index.js.map