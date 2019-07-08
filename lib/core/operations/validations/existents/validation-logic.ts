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

export const _isDefine = (arg) => arg != undefined && arg != null;
export const _isNotDefine = (arg) => arg == undefined || arg == null;
export const _isEmpty = (arg) => (_isDefine(arg) && arg.length && arg.length > 0);
export const _isNaN = (arg) => arg == NaN;