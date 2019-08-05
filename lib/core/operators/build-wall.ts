import { BrickFn, AsyncBrickFn } from './../../models';
import { Middlewall } from './../middlewall'

export function buildWall( ... bricks: Array<AsyncBrickFn|Middlewall>) {
    return new Middlewall(bricks);
}
