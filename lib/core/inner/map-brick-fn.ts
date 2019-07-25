




import { AsyncBrickFn } from "../../models";
import { Firewall } from "./../firewall";


export const mapBrickFn = (bricks: Array<AsyncBrickFn | Firewall>) => {
    const _bricks = bricks.map(brick =>
        typeof brick == 'function' ? brick : brick.toBrick()
    );
    return _bricks;
}