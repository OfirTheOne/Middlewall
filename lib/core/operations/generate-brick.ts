import { getNestedElementByPath, getNestedElementParentByPath } from '../../utils';
import { BrickError } from '../brick-error';

import { BrickFn, BrickResultCollection, IfPassFn, AsyncBrickFn, ValidationCb } from './../../models';

export function generateSyncBrick(
    cb: (...args: any[]) => boolean, 
    extraArgs: any[] = [],
    path: string, 
    brickError: BrickError,
    ifPass?: IfPassFn
) : BrickFn {
    return (arg: any): BrickResultCollection => {
        try {        

            // ** 01 - find target get result
            let target: any, result: boolean;    
            try {
                target = getNestedElementByPath(arg, path);
                result = cb(target, ...extraArgs); 
            } catch (error) {
                throw error;
            }

            // ** 02 - validate result
            let error: BrickResultCollection;
            if(!result) {
                error = { pass: false, errors: [brickError.createError(arg, path)] } ;
            } else {

            // ** 03 - is-pass action
                try {
                    if(ifPass && typeof ifPass == 'function') {
                        const {parent, pathToChild} = getNestedElementParentByPath(arg, path);
                        parent[pathToChild] = ifPass(target, arg);
                    }
                } catch (error) {
                    throw error;
                }
            }
            return error || { pass: true , errors: [] } as BrickResultCollection;
        } catch (error) {
            return { pass: false , errors: [{ pass : false, error}] } as BrickResultCollection;
        }
    };
}


export function generateBrick(
    cb: ValidationCb, 
    extraArgs: any[] = [],
    path: string, 
    brickError: BrickError,
    ifPass?: IfPassFn
) : AsyncBrickFn {
    return async (arg: any): Promise<BrickResultCollection> => {
        try {        

            // ** 01 - find target get result
            let target: any, result: boolean;    
            try {
                target = getNestedElementByPath(arg, path);
                result = await cb(target, ...extraArgs); 
            } catch (error) {
                throw error;
            }

            // ** 02 - validate result
            let error: BrickResultCollection;
            if(!result) {
                error = { pass: false, errors: [brickError.createError(arg, path)] } ;
            } else {

            // ** 03 - is-pass action
                try {
                    if(ifPass && typeof ifPass == 'function') {
                        const {parent, pathToChild} = getNestedElementParentByPath(arg, path);
                        parent[pathToChild] = ifPass(target, arg);
                    }
                } catch (error) {
                    throw error;
                }
            }
            return error || { pass: true , errors: [] } as BrickResultCollection;
        } catch (error) {
            return { pass: false , errors: [{ pass : false, error}] } as BrickResultCollection;
        }
    };
}
