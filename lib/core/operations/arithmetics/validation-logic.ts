import { _isNumber } from "../types/validation-logic";

export const _isGte = (arg: any, n: number) => _isNumber(arg) && arg >= n
export const _isGt = (arg: any, n: number) => _isNumber(arg) && arg > n;
export const _isLte = (arg: any, n: number) => _isNumber(arg) && arg <= n;
export const _isLt = (arg: any, n: number) => _isNumber(arg) && arg < n;
export const _isBetween = (arg: any, a: number, b: number) => _isNumber(arg) && _isLte(arg, b) && _isGte(arg, a)
export const _isPositive = (arg: any) => _isNumber(arg) && _isGte(arg, 0);
export const _isNegative = (arg: any) => _isNumber(arg) && _isLt(arg, 0);