import { AsyncBrickFactory, IMiddlewall } from "../../models";
import { buildWall } from "./build-wall";

/**
 * @Experimental 
 */
export function mixin(... brickFactories: Array<AsyncBrickFactory>)  {
    return (path: string, root: any, ...argsArray: Array<Array<any>> ) => {
        const bricks = brickFactories.map((brickFactory, i) => brickFactory(path, undefined, argsArray[i]));
        return buildWall(...bricks).toBrick();
    }
}