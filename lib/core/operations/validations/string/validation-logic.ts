import { _isString } from "../types/validation-logic";
import { tryCatch } from "../../../../utils";

export const _isIntegerString = (target) => _isString(target) && parseInt(target) != NaN;
export const _isBooleanString = (target) => target === 'true' || target === 'false';
export const _isAlpha = (target) => _isString(target) && /([a-z]|[A-Z])+/.test(target);
export const _isAlphaNumeric = (target) => _isString(target) && /(([a-z]|[A-Z])+|[0-9]+)+/.test(target);
export const _isJson = (target) => _isString(target) && tryCatch(()=>JSON.parse(target))[0] == undefined;



// TODO
// _isEmail
// isPhoneNumber
// isSnakeCase
// isCamelCase
// isXml
