import { _isString } from "../types/validation-logic";
import * as regex from './../../regex';
import { tryCatch } from "../../../utils";




// string value serialization
export const _isIntegerString = (target) => _isString(target) && parseInt(target) != NaN;

export const _isBooleanString = (target) => target === 'true' || target === 'false';

// string format 
export const _isJson = (target) => _isString(target) && tryCatch(()=>JSON.parse(target))[0] == undefined;

export const _isAlpha = (target) => _isString(target) && regex.alpha.test(target);

export const _isAlphaNumeric = (target) => _isString(target) && regex.alphaNumeric.test(target);

export const _isEmail = (target) => _isString(target) && regex.email.test(target);

export const _isURL = (target) => _isString(target) && regex.url.test(target);

export const _isOWASPStrongPassword = (target) => _isString(target) && regex.owaspStrongPassword.test(target);


// string size
export const _isLen = (target, n: number) => _isString(target) && target.length == n;
export const _isLenGte = (target, n: number) => _isString(target) && target.length >= n;
export const _isLenGt = (target, n: number) => _isString(target) && target.length > n;
export const _isLenLte = (target, n: number) => _isString(target) && target.length <= n;
export const _isLenLt = (target, n: number) => _isString(target) && target.length < n;

// 
export const _isIncludes = (target, text: string) => _isString(target) && (target as string).includes(text);
export const _isStartWith = (target, text: string) => _isString(target) && (target as string).startsWith(text);
export const _isEndWith = (target, text: string) => _isString(target) && (target as string).endsWith(text);

