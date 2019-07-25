import { AsyncBrickFactory, IFirewall, AsyncBrickFn } from "../../models";
// import { Firewall } from "./firewall";
import { buildStack } from "./build-stack";
import { reduce } from "../firewall/reduce-bricks";
import { _and } from "../inner/and";
import { NavigateInObject } from "../inner/navigate-in-object";

export function goTo(path: string, ... bricks: Array<AsyncBrickFn>): AsyncBrickFn  {
    return async (arg: any) => {
        return await reduce(new NavigateInObject(arg).to(path), [_and(bricks)])
    }
}