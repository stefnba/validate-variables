import type { Variables, VariableList, ValidatorFunc } from './types';

class Validator {
    private variables: VariableList;

    constructor(variables: Variables) {
        this.variables = Object.entries(variables).map(([key, value]) => {
            return {
                name: key,
                value
            };
        });
    }

    /**
     * Main validation method
     * @param validator
     * Function that validates the variable
     * @param errorMsg
     */
    private validate(validator: ValidatorFunc, errorMsg?: string) {
        this.variables.forEach((v) => {
            const validated = this.validateVariable(v.value, validator);

            if (validated) {
                console.log(`${v.name} with value "${v.value}" ${validated}`);
            } else {
                throw new Error(
                    `${v.name} with value "${v.value}" ${errorMsg}`
                );
            }
        });
    }

    private validateVariable(variable: unknown, validator: ValidatorFunc) {
        return validator(variable);
    }

    isString() {
        const validator = (variable: unknown) => {
            return typeof variable === 'string';
        };
        const errorMsg = 'must be a string';

        this.validate(validator, errorMsg);

        return this;
    }

    isEmail() {
        return this;
    }

    isInteger() {
        return this;
    }

    isFloat() {
        return this;
    }

    isArray() {
        return this;
    }

    isNull() {
        return this;
    }

    isNotNull() {
        return this;
    }

    isObject() {
        return this;
    }
}

export default function (variables: Variables) {
    return new Validator(variables);
}
