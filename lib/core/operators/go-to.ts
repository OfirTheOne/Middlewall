import { AsyncBrickFactory, IFirewall, AsyncBrickFn } from "../../models";
// import { Firewall } from "./firewall";
import { buildStack } from "./build-stack";

import { reduce } from "../firewall/reduce-bricks";
import { _and } from "../inner/and";
import { NavigateInObject } from "../inner/navigate-in-object";
import { connectPathSegments } from "../../utils";

export function goTo(path: string, ... bricks: Array<AsyncBrickFn>): AsyncBrickFn  {
    return async (pathToArg: string, arg: any, root: any) => {
        return await reduce(connectPathSegments(pathToArg, path), new NavigateInObject(arg).to(path), root, [_and(bricks)])
    }
}