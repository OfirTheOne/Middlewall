import { getNestedElementByPath } from '../../utils';
import { BrickError } from '../brick-error';

import { BrickFn, BrickResultCollection } from './../../models';

export function generateBrick(
    cb: (...args: any[]) => boolean, 
    extraArgs: any[] = [],path: string, 
    brickError: BrickError
) : BrickFn {
    return (arg: any): BrickResultCollection => {
        try {            
            const target = getNestedElementByPath(arg, path);
            const result = cb(target, ...extraArgs);

            let error: BrickResultCollection;
            if(!result) {
                error = { pass: false, errors: [brickError.createError(arg, path)] } ;
            }
            return error || { pass: true , errors: [] } as BrickResultCollection;
        } catch (error) {
            return { pass: false , errors: [{ pass : false, error}] } as BrickResultCollection;
        }
    };
}