

import * as regex from './../../regex';

import { _isString } from './../types/validation-logic'


export const _isUTCString = (target: any) => _isString(target) && regex.UTCString.test(target);


export type SimpleDateFormat =
    'yyyy/mm/dd' | 'mm/dd/yyyy' | 'dd/mm/yyyy' |
    'yyyy-mm-dd' | 'mm-dd-yyyy' | 'dd-mm-yyyy'

export const _isDateString = (target: any, format: SimpleDateFormat) => {
    if (!_isString(target)) {
        return false;
    }
    switch (format) {
        case 'yyyy/mm/dd':
            return regex.yyyy_mm_dd_slash_delimiter.test(target);

        case 'mm/dd/yyyy':
            return regex.mm_dd_yyyy_slash_delimiter.test(target);

        case 'dd/mm/yyyy':
            return regex.dd_mm_yyyy_slash_delimiter.test(target);

        case 'yyyy-mm-dd':
            return regex.yyyy_mm_dd_hyphen_delimiter.test(target);

        case 'mm-dd-yyyy':
            return regex.mm_dd_yyyy_hyphen_delimiter.test(target);

        case 'dd-mm-yyyy':
            return regex.dd_mm_yyyy_hyphen_delimiter.test(target);

        default:
            break;
    }

}

export const _isDate = (arg: any) => {
    const timestamp = Date.parse(arg);
    return isNaN(timestamp) == false && isFinite(new Date(timestamp).valueOf())
}