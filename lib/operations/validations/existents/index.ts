import { BrickFn, IfPassFn, AsyncBrickFn, ValidationOptions } from "../../../models";
import { BrickError } from "../../../core/brick-error";
import { generateBrick } from "../../../core/generate-brick";
import { 
    _includeKeys, 
    _isExist, 
    _isNotExist, 
    _isEmpty, 
    _isNaN,
    _isNull, 
    _isUndefined
} from "./validation-logic";

export function includeKeys(path: string, keys: Array<string>, ifPass?: IfPassFn, error?: string, options?: ValidationOptions): AsyncBrickFn {
    const _error = new BrickError(error || `%s is not pass as define`, 'isDefine');
    return generateBrick(_includeKeys, [keys], path, _error, ifPass, options);
}

export function isExist(path: string, ifPass?: IfPassFn, error?: string, options?: ValidationOptions): AsyncBrickFn {
    const _error = new BrickError(error || `%s is not pass as exist`, 'isDefine');
    return generateBrick(_isExist, undefined, path, _error, ifPass, options);
}

export function isNotExist(path: string, ifPass?: IfPassFn, error?: string, options?: ValidationOptions): AsyncBrickFn {
    const _error = new BrickError(error || `%s is not pass as not exist`, 'isNotExist');
    return generateBrick(_isNotExist, undefined, path, _error, ifPass, options);
}

export function isEmpty(path: string, ifPass?: IfPassFn, error?: string, options?: ValidationOptions): AsyncBrickFn {
    const _error = new BrickError(error || `%s is not pass as empty`, 'isEmpty');
    return generateBrick(_isEmpty, undefined, path, _error, ifPass, options);
}

export function isNaN(path: string, ifPass?: IfPassFn, error?: string, options?: ValidationOptions): AsyncBrickFn {
    const _error = new BrickError(error || `%s is not NaN`, 'isNaN');
    return generateBrick(_isNaN, undefined, path, _error, ifPass, options);
}

export function isUndefined(path: string, ifPass?: IfPassFn, error?: string, options?: ValidationOptions): AsyncBrickFn {
    const _error = new BrickError(error || `%s is not undefined`, 'isUndefined');
    return generateBrick(_isUndefined, undefined, path, _error, ifPass, options);
}

export function isNull(path: string, ifPass?: IfPassFn, error?: string, options?: ValidationOptions): AsyncBrickFn {
    const _error = new BrickError(error || `%s is not null`, 'isNull');
    return generateBrick(_isNull, undefined, path, _error, ifPass, options);
}
