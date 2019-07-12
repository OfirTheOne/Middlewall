
import { BrickFn, IfPassFn, AsyncBrickFn, ValidationOptions } from "../../../models";
import { BrickError } from "../../../core/brick-error";
import { generateBrick } from "../../../core/generate-brick";
import { _isGte, _isGt, _isLte, _isLt, _isBetween, _isPositive, _isNegative } from './validation-logic';

export function isGte(path: string, n: number, ifPass?: IfPassFn, error?: string, options?: ValidationOptions): AsyncBrickFn {
    const _error = new BrickError(error || `%s is not greater or equals then ${n}`, 'isGte');
    return generateBrick( _isGte, [n], path, _error, ifPass, options);
}

export function isGt(path: string, n: number, ifPass?: IfPassFn, error?: string, options?: ValidationOptions): AsyncBrickFn {
    const _error = new BrickError(error || `%s is not greater then ${n}`, 'isGt');
    return generateBrick( _isGt, [n], path, _error, ifPass, options);
}


export function isLte(path: string, n: number, ifPass?: IfPassFn, error?: string, options?: ValidationOptions): AsyncBrickFn {
    const _error = new BrickError(error || `%s is not less or equals then ${n}`, 'isLte');
    return generateBrick( _isLte, [n], path, _error, ifPass, options);
}


export function isLt(path: string, n: number, ifPass?: IfPassFn, error?: string, options?: ValidationOptions): AsyncBrickFn {
    const _error = new BrickError(error || `%s is not less then ${n}`, 'isLt');
    return generateBrick( _isLt, [n], path, _error, ifPass, options);
}


export function isBetween(path: string, a: number, b: number, ifPass?: IfPassFn, error?: string, options?: ValidationOptions): AsyncBrickFn {
    const _error = new BrickError(error || `%s is not between ${a} and ${b}`, 'isBetween');
    return generateBrick( _isBetween, [a,b], path, _error, ifPass, options);
}


export function isPositive(path: string, ifPass?: IfPassFn, error?: string, options?: ValidationOptions): AsyncBrickFn {
    const _error = new BrickError(error || `%s is not pass as a positive number`, 'isPositive');
    return generateBrick( _isPositive, undefined, path, _error, ifPass, options);
}


export function isNegative(path: string, ifPass?: IfPassFn, error?: string, options?: ValidationOptions): AsyncBrickFn {
    const _error = new BrickError(error || `%s is not pass as a negative number`, 'isNegative');
    return generateBrick( _isNegative, undefined, path, _error, ifPass, options);
}
