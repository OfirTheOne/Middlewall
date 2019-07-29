
import { BrickFn, AsyncBrickFn, BrickResultCollection } from "../../models";
import { Firewall } from "./../firewall";

export function each(...bricks: Array<AsyncBrickFn|Firewall>): AsyncBrickFn {

    const _bricks =  bricks.map(brick => 
        typeof brick == 'function' ?  brick : brick.toBrick()
    );

    return async (pathToArg: string = "", arg) => {
        try {
            let pass = true;
            const errors = [];
            if(!Array.isArray(arg)) {
                arg = [arg];
            }
            for(let j = 0; j < arg.length; j++) {
                for (let i = 0; i < bricks.length; i++) {
                    
                    const result = await (_bricks[i])(`${pathToArg}[${j}]`,arg[j]);
                
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