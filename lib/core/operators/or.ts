import { BrickFn, AsyncBrickFn, BrickResultCollection } from "../../models";
import { Middlewall } from "./../middlewall";

export function or(...bricks: Array<AsyncBrickFn| Middlewall>): AsyncBrickFn {

    const _bricks =  bricks.map(brick => 
        typeof brick == 'function' ?  brick : brick.toBrick()
    );

    return async (pathToArg: string = "", arg, root: any) => {
        try {
            let pass = false;
            const errors = [];
            for (let i = 0; i < bricks.length; i++) {

                const result = await (_bricks[i])(pathToArg, arg, root);

                pass = pass || result.pass;
                   
                if(!result.pass) {
                    const errorAsArray = result.errors;
                    errors.push(...errorAsArray);
                }
                
            }
            return { pass, errors };

        } catch (error) {
            return { pass: false, errors: [{ pass : false, error }] };
        }

    }

}