import { BrickFn, BrickResultCollection } from "../../models";
import { Firewall } from "./";

export function or(...bricks: Array<BrickFn|Firewall>): BrickFn {

    const _bricks =  bricks.map(brick => 
        typeof brick == 'function' ?  brick : brick.toBrick()
    );

    return (arg) => {
        try {
            let pass = false;
            const errors = [];
            for (let i = 0; i < bricks.length; i++) {

                const result = (_bricks[i])(arg);

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