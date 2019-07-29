import { getNestedElementByPath, getNestedElementParentByPath, connectPathSegments } from './../utils';
import { BrickError } from './brick-error';

import { BrickFn, BrickResultCollection, IfPassFn, AsyncBrickFn, ValidationCb, ValidationOptions } from './../models';

/*
export function generateSyncBrick(
    cb: (...args: any[]) => boolean, 
    extraArgs: any[] = [],
    path: string, 
    brickError: BrickError,
    ifPass?: IfPassFn,
    options?: ValidationOptions
) : BrickFn {
    return (arg: any): BrickResultCollection => {
        try {        

            // ** 01 - find target get result
            let target: any, result: boolean;
            let isOptional = options ? options.optional : false    
            try {
                target = getNestedElementByPath(arg, path);
                isOptional = isOptional && (target == undefined || target == null)
                result = cb(target, ...extraArgs); 
            } catch (error) {
                throw error;
            }

            // ** 02 - validate result
            let error: BrickResultCollection;
            if(!result && !isOptional) {
                error = { pass: false, errors: [brickError.createError(arg, path)] } ;
            } else {

            // ** 03 - is-pass action
                try { 
                    if(result && ifPass && typeof ifPass == 'function') {
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
*/

export function generateBrick(
    cb: ValidationCb, 
    extraArgs: any[] = [],
    path: string, 
    brickError: BrickError,
    ifPass?: IfPassFn,
    options?: ValidationOptions
) : AsyncBrickFn {
    return async (pathToArg: string, arg: any): Promise<BrickResultCollection> => {
        try {        

            // ** 01 - find target get result
            let target: any = arg, result: boolean;  
            let isOptional = options ? options.optional : false;
            try {
                target = path == '' ? 
                    target :
                    getNestedElementByPath(arg, path);
                isOptional = isOptional && (target == undefined || target == null);   
                result = await cb(target, ...extraArgs); 
            } catch (error) {
                throw error;
            }

            // ** 02 - validate result
            let error: BrickResultCollection;
            if(!result && !isOptional) {
                error = { 
                    pass: false, errors: [
                        brickError.createError(
                            target, 
                            connectPathSegments(pathToArg, path)
                        )
                    ] 
                };
            } else {

            // ** 03 - is-pass action
                try {
                    if(result && ifPass && typeof ifPass == 'function') {
                        const {parent, pathToChild} = getNestedElementParentByPath(arg, path);
                        if(pathToChild) {
                            parent[pathToChild] = ifPass(target, arg);
                        }
                    }
                } catch (error) {
                    throw error;
                }
            }
            return error || { pass: true , errors: [] } as BrickResultCollection;
        } catch (error) {
            return { pass: false , errors: [{ pass : false, error, path}] } as BrickResultCollection;
        }
    };
}
