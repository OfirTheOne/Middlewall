import { AsyncBrickFn } from "../../models";
import { Middlewall, reduce } from "../middlewall";
import { mapBrickFn } from './map-brick-fn'

export const _and = (bricks: Array<AsyncBrickFn|Middlewall>, transformCb?: (arg: any)=> any): AsyncBrickFn => {

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
