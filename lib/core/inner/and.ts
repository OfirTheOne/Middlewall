import { AsyncBrickFn } from "../../models";
import { Firewall } from "../firewall/firewall";
import { mapBrickFn } from './map-brick-fn'

export const _and = (bricks: Array<AsyncBrickFn|Firewall>, transformCb?: (arg: any)=> any): AsyncBrickFn => {

    const _bricks = mapBrickFn(bricks);
    return async (pathToArg: string = "", arg) => {
        let _arg: any = arg;

        try {
            _arg = transformCb ? transformCb(_arg) : _arg;
        } catch (error) {
            console.log(error);
        }

        try {
            let pass = true;
            const errors = [];
            // if(!Array.isArray(arg)) {
            //     arg = [arg];
            // }
            // for(let item of arg) {
                for (let i = 0; i < bricks.length; i++) {
    
                    const result = await (_bricks[i])(pathToArg, _arg);
                
                    if(!result.pass) {
                        const errorAsArray = result.errors;
                        errors.push(...errorAsArray);
                    }
                    pass = pass && result.pass;      
                }
            // }
            return { pass, errors };
    
        } catch (error) {
            return { pass: false, errors: [{pass: false, error}] };
        }
    }
}
