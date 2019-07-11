import { AsyncBrickFactory, IFirewall } from "../../models";
// import { Firewall } from "./firewall";
import { buildStack } from "./build-stack";

export function mixin(... brickFactories: Array<AsyncBrickFactory>)  {
    return (path: string, ...argsArray: Array<Array<any>> ) => {
        const bricks = brickFactories.map((brickFactory, i) => brickFactory(path, undefined, argsArray[i]));
        return buildStack(...bricks).toBrick();
    }
}