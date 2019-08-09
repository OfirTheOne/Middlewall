import { getNestedElementByPath, getNestedElementParentByPath, connectPathSegments } from './../utils';
import { BrickError } from './brick-error';

import { BrickFn, BrickResultCollection, IfPassFn, AsyncBrickFn, ValidationCb, ValidationOptions, ValidationOptionsParser } from './../models';

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
    return async (pathToArg: string, arg: any, root: any): Promise<BrickResultCollection> => {
        try {        

            const parsedOptions = new ValidationOptionsParser(options);
            // ** 01 - find target get result
            let target: any = arg, result: boolean;  
            let isOptional = parsedOptions.optional;
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

            // ** 03 - set default action
                try {
                    if(isOptional && target == undefined && options.default != undefined) {
                        setTargetNewValue(arg, path, options.default);
                    }
                } catch (error) {
                    throw error;
                }
            // ** 04 - is-pass action
                try {
                    if(result && ifPass && typeof ifPass == 'function') {
                        const newValue = ifPass(target, root);
                        if(parsedOptions.overwriteValue) {
                            setTargetNewValue(arg, path, newValue);
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



function setTargetNewValue(arg: any, path: string, newValue: any) {
    const {parent, pathToChild} = getNestedElementParentByPath(arg, path);
    if(parent && pathToChild) {
        parent[pathToChild] = newValue
    }
}