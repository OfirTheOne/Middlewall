import { _and } from './../inner/and';
import { AsyncBrickFn } from '../../models';
import { Middlewall } from '../middlewall';

export function and(...bricks: Array<AsyncBrickFn | Middlewall>) {
    return _and(bricks);
} 