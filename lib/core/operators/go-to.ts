import { AsyncBrickFn } from "../../models";

import { reduce } from "../middlewall/reduce-bricks";
import { _and } from "../inner/and";
import { NavigateInObject } from "../inner/navigate-in-object";
import { connectPathSegments } from "../../utils";
import { Middlewall } from "../middlewall/middlewall";

export function goTo(path: string, ...bricks: Array<AsyncBrickFn | Middlewall>): AsyncBrickFn  {
    return async (pathToArg: string, arg: any, root: any) => {
        return await reduce(connectPathSegments(pathToArg, path), new NavigateInObject(arg).to(path), root, [_and(bricks)])
    }
}