
import { BrickFn, AsyncBrickFn, BrickResultCollection } from "../../models";
import { Firewall } from "./../firewall";

export function each(...bricks: Array<AsyncBrickFn|Firewall>): AsyncBrickFn {

    const _bricks =  bricks.map(brick => 
        typeof brick == 'function' ?  brick : brick.toBrick()
    );

    return async (arg) => {
        try {
            let pass = true;
            const errors = [];
            if(!Array.isArray(arg)) {
                arg = [arg];
            }
            for(let item of arg) {
                for (let i = 0; i < bricks.length; i++) {
    
                    const result = await (_bricks[i])(item);
                
                    if(!result.pass) {
                        const errorAsArray = result.errors;
                        errors.push(...errorAsArray);
                    }
                    pass = pass && result.pass;      
                }
            }
            return { pass, errors };

        } catch (error) {
            return { pass: false, errors: [{pass: false, error}] };
        }
    }

}