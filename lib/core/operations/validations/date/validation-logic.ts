

import { _isString } from './../types/validation-logic'

const _isUTCStringRegex = /[1-2][0-9]{3}-(([0][1-9])|([1][0-2]))-(([0-2][1-9])|([3][0-1]))T([0-5][0-9]):([0-5][0-9]):([0-5][0-9])Z/; 

export const _isUTCString = (target) =>  _isString(target) && _isUTCStringRegex.test(target);


export type SimpleDateFormat = 
    'yyyy/mm/dd' | 'mm/dd/yyyy' | 'dd/mm/yyyy' | 
    'yyyy-mm-dd' | 'mm-dd-yyyy' | 'dd-mm-yyyy'

export const _isDateString = (target: any, format: SimpleDateFormat) => {
    if(!_isString(target) ) {
        return false;
    }
    switch (format) {
        case 'yyyy/mm/dd' :
            return /^(19|20)\d{2}\/(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])$/.test(target);
        
        case 'mm/dd/yyyy':
            return /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/.test(target);
        
        case 'dd/mm/yyyy' :
            return /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/.test(target);

        case 'yyyy-mm-dd' :
            return /^(19|20)\d{2}-(0[1-9]|1\d|2\d|3[01])-(0[1-9]|1[0-2])$/.test(target);
   
        case 'mm-dd-yyyy':
            return  /^(0[1-9]|1\d|2\d|3[01])-(0[1-9]|1[0-2])-(19|20)\d{2}$/.test(target);

        case 'dd-mm-yyyy' :
            return  /^(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[01])-(19|20)\d{2}$/.test(target);

        default:
            break;
    }

}