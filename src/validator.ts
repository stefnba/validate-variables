import { ValidationError, createErrorType } from './error';
import type {
    Variables,
    VariableList,
    ValidatorFunc,
    Validations,
    ValidatorOptions,
    ValidationResult
} from './types';

class Validator {
    private variables: VariableList;
    private options: ValidatorOptions;
    private _validations?: Validations;

    constructor(variables: Variables, options?: ValidatorOptions) {
        this.variables = Object.entries(variables).map(([key, value]) => {
            return {
                variable: key,
                value
            };
        });
        this.options = { ...options };
    }

    /**
     * Validates one variable
     * @param variable
     * @param validator
     * Validator function that checks if validation should return true or false
     * @returns
     */
    private validateVariable(variable: unknown, validator: ValidatorFunc) {
        return validator(variable);
    }

    validations() {
        if (!this._validations) {
            throw Error('No validations have been performed');
        }
        return this._validations;
    }

    validated() {
        if (!this._validations) {
            throw Error('No validations have been performed');
        }
        return this._validations.filter((v) => !v.validated).length === 0;
    }

    /**
     * Validates all variables
     * @param validator
     * Function that validates the variable
     * @param errorMsg

     */
    private validate(
        validator: ValidatorFunc,
        validatorName: string,
        errorMessage?: string
    ) {
        this._validations = this.variables.map<ValidationResult>((v) => {
            const validated = this.validateVariable(v.value, validator);

            if (validated) {
                return {
                    validated: true,
                    ...v
                };
            } else {
                if (this.options.throwError) {
                    this.throwError();
                }
                return {
                    error: {
                        type: createErrorType(validatorName),
                        message: errorMessage || 'did not pass validation'
                    },
                    validated: false,
                    ...v
                };
            }
        });
    }

    throwError() {
        if (this.validated() === false) {
            const validations = this.validations();
            const failed = validations.filter((v) => v.validated === false);
            console.log(failed);
            const { variable, value, error } =
                failed[0] as Required<ValidationResult>;
            throw new ValidationError({ value, variable, error: error });
        }
    }

    isString() {
        const validator = (variable: unknown) => {
            return typeof variable === 'string';
        };
        const error = 'must be string';
        const name = this.isString.name;

        this.validate(validator, name, error);

        return this;
    }

    isEmail() {
        const validator = (variable: unknown) => {
            return typeof variable === 'string';
        };
        const error = 'must be valid email';
        const name = this.isEmail.name;

        this.validate(validator, name, error);

        return this;
    }

    isInteger(thresholds: { min?: number; max?: number }) {
        const validator = (variable: unknown) => {
            return typeof variable === 'string';
        };
        const error = 'must be integer';
        const name = this.isInteger.name;

        this.validate(validator, name, error);

        return this;
    }

    isFloat() {
        return this;
    }

    isArray() {
        const validator = (variable: unknown) => {
            return Array.isArray(variable);
        };
        const error = 'must be an array';
        const name = this.isArray.name;

        this.validate(validator, name, error);

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

    contains(values: unknown | Array<unknown>) {
        return this;
    }

    hasKeys(keys: Array<string>) {
        const validator = (variable: unknown) => {
            return true;
        };
        const error = 'must have keys';
        const name = this.hasKeys.name;

        this.validate(validator, name, error);

        return this;
    }
}

export default function (variables: Variables) {
    return new Validator(variables);
}
