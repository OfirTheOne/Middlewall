import { AsyncBrickFn } from "../../models";
import { Firewall, reduce } from "../firewall";
import { mapBrickFn } from './map-brick-fn'
// import { reduce } from "../firewall/reduce-bricks";

export const _and = (bricks: Array<AsyncBrickFn|Firewall>, transformCb?: (arg: any)=> any): AsyncBrickFn => {

    const _bricks = mapBrickFn(bricks);
    return async (pathToArg: string = "", arg, root: any) => {
        let _arg: any = arg;

        try {
            _arg = transformCb ? transformCb(_arg) : _arg;
        } catch (error) {
            console.log(error);
        }
        return await reduce(pathToArg, _arg, root,_bricks);
    }
}
