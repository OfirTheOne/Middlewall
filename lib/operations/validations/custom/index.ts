import { BrickFn, IfPassFn, AsyncBrickFn, ValidationCb } from "../../../models";
import { BrickError } from "../../../core/brick-error";
import { generateBrick } from "../../../core/generate-brick";
// import { _includeKeys, _isDefine, _isNotDefine, _isEmpty, _isNaN } from "./validation-logic";

export function run(path: string, cb: ValidationCb, ifPass?: IfPassFn, error?: ErrorConstructor | string): AsyncBrickFn {
    const _error = new BrickError(`%s is not pass the necessary validation`, 'run');
    return generateBrick(
        cb, undefined,
        path, 
        _error,
        ifPass 
    );
}
