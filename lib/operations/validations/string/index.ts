import { BrickFn, IfPassFn, AsyncBrickFn } from "../../../models";
import { BrickError } from "../../../core/brick-error";
import { generateBrick } from "../../../core/generate-brick";
import { 
    _isIntegerString, 
    _isBooleanString, 
    _isJson,

    _isAlpha, 
    _isAlphaNumeric, 
    _isEmail, 
    _isOWASPStrongPassword, 
    _isURL,

    _isLen,
    _isLenGt,
    _isLenGte,
    _isLenLt,
    _isLenLte,

    _isIncludes,
    _isEndWith,
    _isStartWith
} from "./validation-logic";

export function isIntegerString(path: string, ifPass?: IfPassFn, error?:  string): AsyncBrickFn {
    const _error = new BrickError(error || `%s is not pass as integer string`, 'isIntegerString');
    return generateBrick(_isIntegerString, undefined, path, _error, ifPass);
}
export function isBooleanString(path: string, ifPass?: IfPassFn, error?:  string): AsyncBrickFn {
    const _error = new BrickError(error || `%s is not pass as boolean string`, 'isBooleanString');
    return generateBrick(_isBooleanString, undefined, path, _error, ifPass);
}
export function isJson(path: string, ifPass?: IfPassFn, error?:  string): AsyncBrickFn {
    const _error = new BrickError(error || `%s is not pass as JSON string`, 'isJson');
    return generateBrick( _isJson, undefined, path, _error, ifPass);
}


export function isURL(path: string, ifPass?: IfPassFn, error?:  string): AsyncBrickFn {
    const _error = new BrickError(error || `%s is not pass as URL string`, 'isURL');
    return generateBrick( _isURL, undefined, path, _error, ifPass);
}
export function isAlpha(path: string, ifPass?: IfPassFn, error?:  string): AsyncBrickFn {
    const _error = new BrickError(error || `%s is not pass as alphabetic string`, 'isAlpha');
    return generateBrick(_isAlpha, undefined, path, _error, ifPass);
}
export function isAlphaNumeric(path: string, ifPass?: IfPassFn, error?:  string): AsyncBrickFn {
    const _error = new BrickError(error || `%s is not pass as alpha-numeric string`, 'isAlphaNumeric');
    return generateBrick(_isAlphaNumeric, undefined, path, _error, ifPass);
}
export function isEmail(path: string, ifPass?: IfPassFn, error?: string): AsyncBrickFn {
    const _error = new BrickError(error || `%s is not pass as email format string`, 'isEmail');
    return generateBrick(_isEmail, undefined, path, _error, ifPass);
}
export function isOWASPStrongPassword(path: string, ifPass?: IfPassFn, error?: string): AsyncBrickFn {
    const _error = new BrickError(error || `%s is not pass as OWASP strong password`, 'isOWASPStrongPassword');
    return generateBrick(_isOWASPStrongPassword, undefined, path, _error, ifPass);
}


export function isLen(path: string, n: number, ifPass?: IfPassFn, error?: string): AsyncBrickFn {
    const _error = new BrickError(error || `%s is not pass as string with length of ${n}`, 'isLen');
    return generateBrick(_isLen, [n], path, _error, ifPass);
}
export function isLenGte(path: string, n: number, ifPass?: IfPassFn, error?: string): AsyncBrickFn {
    const _error = new BrickError(error || `%s is not pass as string with length gte ${n}`, 'isLenGte');
    return generateBrick(_isLenGte, [n], path, _error, ifPass);
}
export function isLenGt(path: string, n: number, ifPass?: IfPassFn, error?: string): AsyncBrickFn {
    const _error = new BrickError(error || `%s is not pass as string with length gt ${n}`, 'isLenGt');
    return generateBrick(_isLenGt, [n], path, _error, ifPass);
}
export function isLenLte(path: string, n: number, ifPass?: IfPassFn, error?: string): AsyncBrickFn {
    const _error = new BrickError(error || `%s is not pass as string with length lte ${n}`, 'isLenLt');
    return generateBrick(_isLenLte, [n], path, _error, ifPass);
}
export function isLenLt(path: string, n: number, ifPass?: IfPassFn, error?: string): AsyncBrickFn {
    const _error = new BrickError(error || `%s is not pass as string with length lt ${n}`, 'isLenLt');
    return generateBrick(_isLenLt, [n], path, _error, ifPass);
}


export function isIncludes(path: string, text: string, ifPass?: IfPassFn, error?: string): AsyncBrickFn {
    const _error = new BrickError(error || `%s is not pass as a string that includes '${text}'`, 'isIncludes');
    return generateBrick(_isIncludes, [text], path, _error, ifPass);
}
export function isStartWith(path: string, text: string, ifPass?: IfPassFn, error?: string): AsyncBrickFn {
    const _error = new BrickError(error || `%s is not pass as a string that start with '${text}'`, 'isStartWith');
    return generateBrick(_isStartWith, [text], path, _error, ifPass);
}
export function isEndWith(path: string, text: string, ifPass?: IfPassFn, error?: string): AsyncBrickFn {
    const _error = new BrickError(error || `%s is not pass as a string that end with '${text}'`, 'isEndWith');
    return generateBrick(_isEndWith, [text], path, _error, ifPass);
}
