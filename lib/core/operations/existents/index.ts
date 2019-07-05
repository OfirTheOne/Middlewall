import { BrickFn } from "../../../models";
import { BrickError } from "../../brick-error";
import { generateBrick } from "../generate-brick";
import { _includeKeys, _isDefine, _isNotDefine, _isEmpty, _isNaN } from "./validation-logic";

export function includeKeys(path: string, keys: Array<string>, error?: ErrorConstructor | string): BrickFn {
    const _error = new BrickError(`%s is not pass as define`, 'isDefine');
    return generateBrick(
        _includeKeys, [keys],
        path, 
        _error 
    );
}

export function isDefine(path: string, error?: ErrorConstructor | string): BrickFn {
    const _error = new BrickError(`%s is not pass as define`, 'isDefine');
    return generateBrick(
        _isDefine, undefined,
        path, 
        _error 
    );
}

export function isNotDefine(path: string, error?: ErrorConstructor | string): BrickFn {
    const _error = new BrickError(`%s is not pass as not define`, 'isNotDefine');
    return generateBrick(
        _isNotDefine, undefined,
        path, 
        _error 
    );
}

export function isEmpty(path: string, error?: ErrorConstructor | string): BrickFn {
    const _error = new BrickError(`%s is not pass as empty`, 'isEmpty');

    return generateBrick(
        _isEmpty, undefined,
        path, 
        _error 
    );
}

export function isNaN(path: string, error?: ErrorConstructor | string): BrickFn {
    const _error = new BrickError(`%s is not NaN`, 'isNaN');

    return generateBrick(
        _isNaN, undefined,
        path, 
        _error 
    );
}