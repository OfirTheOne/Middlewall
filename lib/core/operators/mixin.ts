import { AsyncBrickFactory, IFirewall } from "../../models";
// import { Firewall } from "./firewall";
import { buildStack } from "./build-stack";

/**
 * @Experimental 
 */
export function mixin(... brickFactories: Array<AsyncBrickFactory>)  {
    return (path: string, root: any, ...argsArray: Array<Array<any>> ) => {
        const bricks = brickFactories.map((brickFactory, i) => brickFactory(path, undefined, argsArray[i]));
        return buildStack(...bricks).toBrick();
    }
}