import { AsyncBrickFn, BrickResultCollection } from "../../models";
import { Middlewall } from "./middlewall";
import { mapBrickFn } from "../inner/map-brick-fn";



export async function reduce(pathToArg: string = "", arg: any, root: any, bricks: Array<AsyncBrickFn | Middlewall>): Promise<BrickResultCollection> {
    const _bricks = mapBrickFn(bricks)
        
    try {
            let pass = true;
            const errors = [];
            for (let i = 0; i < bricks.length; i++) {

                const result = await (_bricks[i])(pathToArg, arg, root);
            
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
