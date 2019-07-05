
import { BrickFn } from './../../../models';
import { generateBrick } from './../generate-brick';
import { BrickError } from '../../brick-error';
import { _isString, _isArray, _isObject, _isNumber, _isBoolean } from './validation-logic';


export function isString(path: string, error?: ErrorConstructor | string): BrickFn {
    const _error = new BrickError(`%s is not of type string`, 'isString');
    return generateBrick(
        _isString, undefined,
        path, 
        _error
    );
    
}

export function isArray(path: string, error?: ErrorConstructor | string): BrickFn {
    const _error = new BrickError(`%s is not of type array`, 'isArray');
    return generateBrick(
        _isArray, undefined,
        path, 
        _error 
    );
}

export function isObject(path: string, error?: ErrorConstructor | string): BrickFn {
    const _error = new BrickError(`%s is not of type object`, '_isObject');
    return generateBrick(
        _isObject, undefined,
        path, 
        _error 
    );
}

export function isNumber(path: string, error?: ErrorConstructor | string): BrickFn {   
    const _error = new BrickError(`%s is not of type number`, 'isNumber');
    return generateBrick(
        _isNumber, undefined,
        path, 
        _error 
    );
}

export function isBoolean(path: string, error?: ErrorConstructor | string): BrickFn {   
    const _error = new BrickError(`%s is not of type boolean`, 'isBoolean');
    return generateBrick(
        _isBoolean, undefined,
        path, 
        _error 
    );
}
