

import { buildWall, or, each, goTo } from './../../../../lib/core'
import * as ops from './../../../../lib/operations'
import * as cryptoUtils from '../../../utils';

const AuthHeaderSecret = 'secret_header_123'
console.log(cryptoUtils.saltHashPassword(AuthHeaderSecret));

export class ShowValidator {

    static paginationValidator = buildWall(
        ops.isIntegerString('page', (_, {query}) => query.page = parseInt(query.page)),
        ops.isPositive('page'),
        ops.isIntegerString('itemsPerPage', (_, {query}) => query.page = parseInt(query.page)),
        ops.isBetween('itemsPerPage', 1, 100 ),
    ).query();


    static dateValidator = buildWall(
        ops.isDateString('start', 'mm-dd-yyyy'),
        ops.isDateString('end', 'mm-dd-yyyy'),
    ).query();

    
    static showListValidator = buildWall(
        goTo('shows',
            each(
                ops.isAlpha('name'),
                ops.isDateString('showDate', 'mm-dd-yyyy'),
                ops.isBoolean('visible', undefined, undefined, { optional: true })
            )
        )
    ).body();
    
}