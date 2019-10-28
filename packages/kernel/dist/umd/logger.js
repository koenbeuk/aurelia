(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "./functions", "./di"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const tslib_1 = require("tslib");
    const functions_1 = require("./functions");
    const di_1 = require("./di");
    var ColorOptions;
    (function (ColorOptions) {
        ColorOptions[ColorOptions["noColors"] = 0] = "noColors";
        ColorOptions[ColorOptions["colors"] = 1] = "colors";
    })(ColorOptions = exports.ColorOptions || (exports.ColorOptions = {}));
    exports.ILogConfig = di_1.DI.createInterface('ILogConfig').noDefault();
    exports.ISink = di_1.DI.createInterface('ISink').noDefault();
    exports.ILogEventFactory = di_1.DI.createInterface('ILogEventFactory').noDefault();
    exports.ILogger = di_1.DI.createInterface('ILogger').noDefault();
    // http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
    const format = functions_1.toLookup({
        red(str) {
            return `\u001b[31m${str}\u001b[39m`;
        },
        green(str) {
            return `\u001b[32m${str}\u001b[39m`;
        },
        yellow(str) {
            return `\u001b[33m${str}\u001b[39m`;
        },
        blue(str) {
            return `\u001b[34m${str}\u001b[39m`;
        },
        magenta(str) {
            return `\u001b[35m${str}\u001b[39m`;
        },
        cyan(str) {
            return `\u001b[36m${str}\u001b[39m`;
        },
        white(str) {
            return `\u001b[37m${str}\u001b[39m`;
        },
        grey(str) {
            return `\u001b[90m${str}\u001b[39m`;
        },
    });
    class LogConfig {
        constructor(colorOptions, level) {
            this.colorOptions = colorOptions;
            this.level = level;
        }
    }
    exports.LogConfig = LogConfig;
    const getLogLevelString = (function () {
        const logLevelString = [
            functions_1.toLookup({
                TRC: 'TRC',
                DBG: 'DBG',
                INF: 'INF',
                WRN: 'WRN',
                ERR: 'ERR',
                FTL: 'FTL',
                QQQ: '???',
            }),
            functions_1.toLookup({
                TRC: format.grey('TRC'),
                DBG: format.grey('DBG'),
                INF: format.white('INF'),
                WRN: format.yellow('WRN'),
                ERR: format.red('ERR'),
                FTL: format.red('FTL'),
                QQQ: format.grey('???'),
            }),
        ];
        return function (level, colorOptions) {
            if (level <= 0 /* trace */) {
                return logLevelString[colorOptions].TRC;
            }
            if (level <= 1 /* debug */) {
                return logLevelString[colorOptions].DBG;
            }
            if (level <= 2 /* info */) {
                return logLevelString[colorOptions].INF;
            }
            if (level <= 3 /* warn */) {
                return logLevelString[colorOptions].WRN;
            }
            if (level <= 4 /* error */) {
                return logLevelString[colorOptions].ERR;
            }
            if (level <= 5 /* fatal */) {
                return logLevelString[colorOptions].FTL;
            }
            return logLevelString[colorOptions].QQQ;
        };
    })();
    function getScopeString(scope, colorOptions) {
        if (colorOptions === 0 /* noColors */) {
            return scope.join('.');
        }
        // eslint-disable-next-line @typescript-eslint/unbound-method
        return scope.map(format.cyan).join('.');
    }
    function getIsoString(timestamp, colorOptions) {
        if (colorOptions === 0 /* noColors */) {
            return new Date(timestamp).toISOString();
        }
        return format.grey(new Date(timestamp).toISOString());
    }
    class DefaultLogEvent {
        constructor(severity, message, optionalParams, scope, colorOptions, timestamp) {
            this.severity = severity;
            this.message = message;
            this.optionalParams = optionalParams;
            this.scope = scope;
            this.colorOptions = colorOptions;
            this.timestamp = timestamp;
        }
        toString() {
            const { severity, message, scope, colorOptions, timestamp } = this;
            if (scope.length === 0) {
                return `${getIsoString(timestamp, colorOptions)} [${getLogLevelString(severity, colorOptions)}] ${message}`;
            }
            return `${getIsoString(timestamp, colorOptions)} [${getLogLevelString(severity, colorOptions)} ${getScopeString(scope, colorOptions)}] ${message}`;
        }
    }
    exports.DefaultLogEvent = DefaultLogEvent;
    let DefaultLogEventFactory = class DefaultLogEventFactory {
        constructor(config) {
            this.config = config;
        }
        createLogEvent(logger, level, message, optionalParams) {
            return new DefaultLogEvent(level, message, optionalParams, logger.scope, this.config.colorOptions, Date.now());
        }
    };
    DefaultLogEventFactory = tslib_1.__decorate([
        tslib_1.__param(0, exports.ILogConfig)
    ], DefaultLogEventFactory);
    exports.DefaultLogEventFactory = DefaultLogEventFactory;
    class ConsoleSink {
        constructor($console) {
            this.emit = function emit(event) {
                const optionalParams = event.optionalParams;
                if (optionalParams === void 0 || optionalParams.length === 0) {
                    switch (event.severity) {
                        case 0 /* trace */:
                        case 1 /* debug */:
                            return $console.debug(event.toString());
                        case 2 /* info */:
                            return $console.info(event.toString());
                        case 3 /* warn */:
                            return $console.warn(event.toString());
                        case 4 /* error */:
                        case 5 /* fatal */:
                            return $console.error(event.toString());
                    }
                }
                else {
                    switch (event.severity) {
                        case 0 /* trace */:
                        case 1 /* debug */:
                            return $console.debug(event.toString(), ...optionalParams);
                        case 2 /* info */:
                            return $console.info(event.toString(), ...optionalParams);
                        case 3 /* warn */:
                            return $console.warn(event.toString(), ...optionalParams);
                        case 4 /* error */:
                        case 5 /* fatal */:
                            return $console.error(event.toString(), ...optionalParams);
                    }
                }
            };
        }
    }
    exports.ConsoleSink = ConsoleSink;
    let DefaultLogger = class DefaultLogger {
        constructor(config, factory, sinks, scope = [], parent = null) {
            this.config = config;
            this.factory = factory;
            this.sinks = sinks;
            this.scope = scope;
            if (parent === null) {
                this.root = this;
                this.parent = this;
            }
            else {
                this.root = parent.root;
                this.parent = parent;
            }
            const sinksLen = sinks.length;
            let i = 0;
            const emit = (level, msgOrGetMsg, optionalParams) => {
                const message = typeof msgOrGetMsg === 'function' ? msgOrGetMsg() : msgOrGetMsg;
                const event = factory.createLogEvent(this, level, message, optionalParams);
                for (i = 0; i < sinksLen; ++i) {
                    sinks[i].emit(event);
                }
            };
            this.trace = function trace(messageOrGetMessage, ...optionalParams) {
                if (config.level <= 0 /* trace */) {
                    emit(0 /* trace */, messageOrGetMessage, optionalParams);
                }
            };
            this.debug = function debug(messageOrGetMessage, ...optionalParams) {
                if (config.level <= 1 /* debug */) {
                    emit(1 /* debug */, messageOrGetMessage, optionalParams);
                }
            };
            this.info = function info(messageOrGetMessage, ...optionalParams) {
                if (config.level <= 2 /* info */) {
                    emit(2 /* info */, messageOrGetMessage, optionalParams);
                }
            };
            this.warn = function warn(messageOrGetMessage, ...optionalParams) {
                if (config.level <= 3 /* warn */) {
                    emit(3 /* warn */, messageOrGetMessage, optionalParams);
                }
            };
            this.error = function error(messageOrGetMessage, ...optionalParams) {
                if (config.level <= 4 /* error */) {
                    emit(4 /* error */, messageOrGetMessage, optionalParams);
                }
            };
            this.fatal = function fatal(messageOrGetMessage, ...optionalParams) {
                if (config.level <= 5 /* fatal */) {
                    emit(5 /* fatal */, messageOrGetMessage, optionalParams);
                }
            };
        }
        scopeTo(name) {
            return new DefaultLogger(this.config, this.factory, this.sinks, this.scope.concat(name), this);
        }
    };
    DefaultLogger = tslib_1.__decorate([
        tslib_1.__param(0, exports.ILogConfig),
        tslib_1.__param(1, exports.ILogEventFactory),
        tslib_1.__param(2, di_1.all(exports.ISink))
    ], DefaultLogger);
    exports.DefaultLogger = DefaultLogger;
    exports.LoggerConfiguration = functions_1.toLookup({
        create($console, level = 3 /* warn */, colorOptions = 0 /* noColors */) {
            return functions_1.toLookup({
                register(container) {
                    return container.register(di_1.Registration.instance(exports.ILogConfig, new LogConfig(colorOptions, level)), di_1.Registration.instance(exports.ISink, new ConsoleSink($console)), di_1.Registration.singleton(exports.ILogEventFactory, DefaultLogEventFactory), di_1.Registration.singleton(exports.ILogger, DefaultLogger));
                },
            });
        },
    });
});
//# sourceMappingURL=logger.js.map