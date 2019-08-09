

import { compose, or, each, goTo } from './../../../../lib/core'
import * as ops from './../../../../lib/operations'
import * as cryptoUtils from '../../../utils';
import * as moment from 'moment';

const AuthHeaderSecret = 'secret_header_123'
console.log(cryptoUtils.saltHashPassword(AuthHeaderSecret));

export class ShowValidator {

    static paginationValidator = compose(
        ops.isIntegerString('page', 
            (page, req) => parseInt(page), 
            undefined, 
            { overwriteValue: true, optional: true, default: 1 }
        ),
        ops.isPositive('page'),
        ops.isIntegerString('pageSize', 
            (pageSize, req) => parseInt(pageSize), 
            undefined, 
            { overwriteValue: true, optional: true, default: 20 }
        ),
        ops.isBetween('pageSize', 1, 100 ),
    ).query();


    static dateValidator = compose(
        ops.isDateString('start', 'mm-dd-yyyy',    
            (start, req) => moment(start, 'mm-dd-yyyy'),        
            undefined, 
            { overwriteValue: true, optional: true, default: moment().year(1970) }),
        ops.isDateString('end', 'mm-dd-yyyy',
            (end, req) => moment(end, 'mm-dd-yyyy'),        
            undefined, 
            { overwriteValue: true, optional: true, default: moment().year(2100) }),
    ).query();

    
    static showListValidator = compose(
        goTo('shows',
            each(
                ops.isAlpha('name'),
                ops.isDateString('showDate', 'mm-dd-yyyy'),
                ops.isBoolean('visible', undefined, undefined, { optional: true })
            )
        )
    ).body();
    
}