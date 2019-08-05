
import { BrickFn, AsyncBrickFn, BrickResultCollection } from "../../models";
import { Middlewall } from "./../middlewall";
import { mapBrickFn } from "../inner/map-brick-fn";

export function some(...bricks: Array<AsyncBrickFn|Middlewall>): AsyncBrickFn {

    const _bricks = mapBrickFn(bricks)
    return async (pathToArg: string = "", arg, root: any) => {
        try {
            let pass = false;
            const errors = [];
            if(!Array.isArray(arg)) {
                arg = [arg];
            }
            for(let j = 0; j < arg.length; j++) {
                for (let i = 0; i < bricks.length; i++) {
                    
                    const result = await (_bricks[i])(`${pathToArg}[${j}]`,arg[j], root);
                
                    if(!result.pass) {
                        const errorAsArray = result.errors;
                        errors.push(...errorAsArray);
                    }
                    pass = pass || result.pass;      
                }
            }
            return { pass, errors };

        } catch (error) {
            return { pass: false, errors: [{pass: false, error}] };
        }
    }

}