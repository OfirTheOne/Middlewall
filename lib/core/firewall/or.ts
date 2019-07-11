import { BrickFn, AsyncBrickFn, BrickResultCollection } from "../../models";
import { Firewall } from "./";

export function or(...bricks: Array<AsyncBrickFn|Firewall>): AsyncBrickFn {

    const _bricks =  bricks.map(brick => 
        typeof brick == 'function' ?  brick : brick.toBrick()
    );

    return async (arg) => {
        try {
            let pass = false;
            const errors = [];
            for (let i = 0; i < bricks.length; i++) {

                const result = await (_bricks[i])(arg);

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