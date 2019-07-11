
import { AsyncBrickFn,  IfPassFn } from './../../../../models';
import { generateBrick } from './../../generate-brick';
import { BrickError } from '../../../brick-error';
import { _isDateString,  SimpleDateFormat } from './validation-logic';

export function isDateString(path: string, format: SimpleDateFormat, ifPass?: IfPassFn, error?: ErrorConstructor | string): AsyncBrickFn {
    const _error = new BrickError(`%s is not as a date ${format} format`, 'isDateString');
    return generateBrick( _isDateString, [format], path, _error, ifPass );
}
