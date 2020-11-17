import { DI } from '@aurelia/kernel';
import { Scope } from '@aurelia/runtime';
import { validationRulesRegistrar, rootObjectSymbol } from './rule-provider.js';
/**
 * IInstruction for the validation controller's validate method.
 */
export class ValidateInstruction {
    /**
     * @param {TObject} [object=(void 0)!] - The object to validate.
     * @param {(keyof TObject | string)} [propertyName=(void 0)!] - The property name to validate.
     * @param {PropertyRule[]} [rules=(void 0)!] - The rules to validate.
     * @param {string} [objectTag=(void 0)!] - The tag indicating the ruleset defined for the object.
     * @param {string} [propertyTag=(void 0)!] - The tag indicating the ruleset for the property.
     * @param {LifecycleFlags} [flags=LifecycleFlags.none] - Use this to enable lifecycle flag sensitive expression evaluation.
     */
    constructor(object = (void 0), propertyName = (void 0), rules = (void 0), objectTag = (void 0), propertyTag = (void 0), flags = 0 /* none */) {
        this.object = object;
        this.propertyName = propertyName;
        this.rules = rules;
        this.objectTag = objectTag;
        this.propertyTag = propertyTag;
        this.flags = flags;
    }
}
export const IValidator = DI.createInterface('IValidator').noDefault();
/**
 * Standard implementation of `IValidator`.
 */
export class StandardValidator {
    async validate(instruction) {
        var _a, _b, _c, _d;
        const object = instruction.object;
        const propertyName = instruction.propertyName;
        const propertyTag = instruction.propertyTag;
        const flags = instruction.flags;
        const rules = (_b = (_a = instruction.rules) !== null && _a !== void 0 ? _a : validationRulesRegistrar.get(object, instruction.objectTag)) !== null && _b !== void 0 ? _b : [];
        const scope = Scope.create(flags, { [rootObjectSymbol]: object });
        if (propertyName !== void 0) {
            return (_d = (await ((_c = rules.find((r) => r.property.name === propertyName)) === null || _c === void 0 ? void 0 : _c.validate(object, propertyTag, flags, scope)))) !== null && _d !== void 0 ? _d : [];
        }
        return (await Promise.all(rules.map(async (rule) => rule.validate(object, propertyTag, flags, scope)))).flat();
    }
}
//# sourceMappingURL=validator.js.map