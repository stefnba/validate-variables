import type { ValidationErrorParams } from './types';

export class ValidationError extends Error {
    variable: string;
    value: unknown;
    type: string;

    constructor({ error, value, variable }: ValidationErrorParams) {
        const message = `variable "${variable}" with value "${value}" ${error.message}`;
        super(message);

        this.variable = variable;
        this.value = value;
        this.type = error.type;
    }
}

export const createErrorType = (error: string) => `${error}.validationFailed`;
