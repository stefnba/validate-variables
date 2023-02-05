export type Variables = Record<string, unknown>;

export type VariableList = Array<{ name: string; value: unknown }>;

export type ValidatorFunc = (variable: unknown) => boolean;
