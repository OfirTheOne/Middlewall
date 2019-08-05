




import { AsyncBrickFn } from "../../models";
import { Middlewall } from "./../middlewall";


export const mapBrickFn = (bricks: Array<AsyncBrickFn | Middlewall>) => {
    const _bricks = bricks.map(brick =>
        typeof brick == 'function' ? brick : brick.toBrick()
    );
    return _bricks;
}