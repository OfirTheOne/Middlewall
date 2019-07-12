

import * as xfw from './../../../../lib'
import * as cryptoUtils from '../../../utils';

const AuthHeaderSecret = 'secret_header_123'
console.log(cryptoUtils.saltHashPassword(AuthHeaderSecret));

export class ShowValidator {

    static paginationValidator = xfw.buildStack(
        xfw.isNumber('page'),
        xfw.isPositive('page', parseInt),
        xfw.isNumber('itemsPerPage'),
        xfw.isBetween('itemsPerPage', 1, 100, parseInt)
    ).query();


    static dateValidator = xfw.buildStack(
        xfw.isDateString('start', 'mm-dd-yyyy'),
        xfw.isDateString('end', 'mm-dd-yyyy'),
    ).query();
    
}