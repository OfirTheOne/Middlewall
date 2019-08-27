import { _isObject } from "../types/validation-logic";

export const _includeKeys = (arg, keys: Array<string>) => { 
    if(_isObject(arg)) {
        if(!keys || keys.length == 0) {
            return true;
        } else {
            const actualKeys = Object.keys(arg);
            const keysSet = keys.reduce((set,k) => (set[k]=true), {});
            return actualKeys.every(k => keysSet[k]);
        }
    } 
    return false;
}

export const _isExist = (arg) => arg != undefined && arg != null;
export const _isNotExist = (arg) => arg == undefined || arg == null;

export const _isNull = (arg) => arg == null;
export const _isUndefined = (arg) => arg == undefined;

export const _isEmpty = (arg) => (_isExist(arg) && arg.length && arg.length > 0);
export const _isNaN = (arg) => arg == NaN;

export const _isIncludeKeys = (arg: any, key: (string | Array<string>)) => 
    _isExist(arg) && (Array.isArray(key) ? key : [key]).every(k => _isExist(arg[k]));

