import { BrickFn, AsyncBrickFn, IfPassFn } from "../../../../models";
import { BrickError } from "../../../brick-error";
import { generateBrick } from "../../generate-brick";
import { _isIntegerString, _isBooleanString, _isAlpha, _isAlphaNumeric, _isJson } from "./validation-logic";

export function isIntegerString(path: string, ifPass?: IfPassFn, error?: ErrorConstructor | string): AsyncBrickFn {
    const _error = new BrickError(`%s is not pass as integer string`, 'isIntegerString');
    return generateBrick(
        _isIntegerString, undefined,
        path, 
        _error, ifPass
    );
    
}

export function isBooleanString(path: string, ifPass?: IfPassFn, error?: ErrorConstructor | string): AsyncBrickFn {
    const _error = new BrickError(`%s is not pass as boolean string`, 'isBooleanString');
    return generateBrick(
        _isBooleanString, undefined,
        path, 
        _error, ifPass
    );
    
}

export function isJson(path: string, ifPass?: IfPassFn, error?: ErrorConstructor | string): AsyncBrickFn {
    const _error = new BrickError(`%s is not pass as JSON string`, 'isJson');
    return generateBrick(
        _isJson, undefined,
        path, 
        _error, ifPass
    );
    
}

export function isAlpha(path: string, ifPass?: IfPassFn, error?: ErrorConstructor | string): AsyncBrickFn {
    const _error = new BrickError(`%s is not pass as alphabetic string`, 'isAlpha');
    return generateBrick(
        _isAlpha, undefined,
        path, 
        _error, ifPass
    );
    
}

export function isAlphaNumeric(path: string, ifPass?: IfPassFn, error?: ErrorConstructor | string): AsyncBrickFn {
    const _error = new BrickError(`%s is not pass as alpha-numeric string`, 'isAlphaNumeric');
    return generateBrick(
        _isAlphaNumeric, undefined,
        path, 
        _error, ifPass
    );
    
}