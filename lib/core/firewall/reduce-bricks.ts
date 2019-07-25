import { AsyncBrickFn, BrickResultCollection } from "../../models";



export async function reduce(arg: any, bricks: Array<AsyncBrickFn>): Promise<BrickResultCollection> {
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
