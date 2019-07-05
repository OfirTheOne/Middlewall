import { BrickFn, BrickResultCollection } from "../../models";

export function reduce(arg: any, bricks: Array<BrickFn>): BrickResultCollection {
    try {
        let pass = true;
        const errors = [];
        for (let i = 0; i < bricks.length; i++) {

            const result = (bricks[i])(arg);
          
            if(!result.pass) {
                const errorAsArray = result.errors;
                errors.push(...errorAsArray);
            }
            pass = pass && result.pass;      
        }
        return { pass, errors };

    } catch (error) {
        return { pass: false, errors: [{pass: false, error}] };
    }

}
/*
export async function asyncReduce(arg: any, bricks: Array<BrickFn>): Promise<BrickResultCollection> {
    try {
        let pass = true;
        const errors = [];
        for (let i = 0; i < bricks.length; i++) {

            const result = await (bricks[i])(arg);
          
            if(!result.pass) {
                const errorAsArray = result.errors;
                errors.push(...errorAsArray);
            }
            pass = pass && result.pass;      
        }
        return { pass, errors };

    } catch (error) {
        return { pass: false, errors: [{pass: false, error}] };
    }

}
*/