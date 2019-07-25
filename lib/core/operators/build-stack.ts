import { BrickFn, AsyncBrickFn } from './../../models';
import { Firewall } from './../firewall'

export function buildStack( ... bricks: Array<AsyncBrickFn|Firewall>) {
    return new Firewall(bricks);
}
