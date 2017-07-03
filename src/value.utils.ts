export type GenericMap<T> = { [name : string] : T };

export function isString(val: any): boolean
{
    return typeof val === 'string' || val instanceof String;
}
export function isNullOrUndefined(val: any): boolean
{
    return typeof val === "undefined" || val === null;
}