
import { BrickFn, IfPassFn, AsyncBrickFn, ValidationOptions } from "../../../models";
import { BrickError } from "../../../core/brick-error";
import { generateBrick } from "../../../core/generate-brick";
import { _isDateString,  SimpleDateFormat, _isDate } from './validation-logic';

export const isDateString = (path: string, format: SimpleDateFormat, ifPass?: IfPassFn, error?: string, options?: ValidationOptions): AsyncBrickFn => {
    const _error = new BrickError(error || `%s is not as a date ${format} format`, 'isDateString');
    return generateBrick( _isDateString, [format], path, _error, ifPass, options);
}


export const isDate = (path: string, ifPass?: IfPassFn, error?: string, options?: ValidationOptions): AsyncBrickFn => {
    const _error = new BrickError(error || `%s is not as a valid date `, 'isDate');
    return generateBrick( _isDateString, undefined, path, _error, ifPass, options);
}


