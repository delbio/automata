export type GenericMap<T> = { [name : string] : T };

export function isString(val: any): boolean
{
    return typeof val === 'string' || val instanceof String;
}
export function isNullOrUndefined(val: any): boolean
{
    return typeof val === "undefined" || val === null;
}

/**
 * @see: http://stackoverflow.com/a/36643177/3753724
 */
export function getClassName(instance:any): string
{
    if ('name' in instance.constructor){
        return instance.constructor.name;
    }
    return null;
}