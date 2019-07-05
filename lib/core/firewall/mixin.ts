import { BrickFactory, IFirewall } from "../../models";
// import { Firewall } from "./firewall";
import { buildStack } from "./build-stack";

export function mixin(... brickFactories: Array<BrickFactory>)  {
    return (path: string, ...argsArray: Array<Array<any>> ) => {
        const bricks = brickFactories.map((brickFactory, i) => brickFactory(path, argsArray[i]));
        return buildStack(...bricks).toBrick();
    }
}