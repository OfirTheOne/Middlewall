import { BrickFn, AsyncBrickFn } from './../../models';
import { Middlewall } from './../middlewall'

export function compose( ... bricks: Array<AsyncBrickFn|Middlewall>) {
    return new Middlewall(bricks);
}
