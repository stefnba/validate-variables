export type Variables = Record<string, unknown>;

export type VariableParams = { variable: string; value: unknown };

export type VariableList = Array<VariableParams>;

export type ValidatorFunc = (variable: unknown) => boolean;

export type ValidationResult = {
    validated: boolean;
    error?: ValidationErrorObject;
} & VariableParams;

export type Validations = Array<ValidationResult>;

export type ValidationErrorParams = {
    variable: string;
    value: unknown;
    error: ValidationErrorObject;
};

export type ValidationErrorObject = {
    message: string;
    type: string;
};

export type ValidatorOptions = {
    throwError?: boolean;
};
