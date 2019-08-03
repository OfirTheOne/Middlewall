

import * as xfw from './../../../../lib'
import * as cryptoUtils from '../../../utils';

const AuthHeaderSecret = 'secret_header_123'
console.log(cryptoUtils.saltHashPassword(AuthHeaderSecret));

export class ShowValidator {

    static paginationValidator = xfw.buildStack(
        xfw.or(
            xfw.isNumber('page'),
            xfw.isIntegerString('page', parseInt),
        ),
        xfw.isPositive('page'),
        xfw.or(
            xfw.isNumber('itemsPerPage'),
            xfw.isIntegerString('itemsPerPage', parseInt),
        ),
        xfw.isBetween('itemsPerPage', 1, 100 ),
    ).query();

    static asyncLinearOperationsValidator = xfw.buildStack(
        xfw.run('', async (body) => {
            console.log('no 1')
            return true;
        }, (_, req) => { console.log(req.query)}),
        xfw.run('', async (body) => {
            console.log('no 2')
            return true;
        }),
        xfw.run('', async (body) => {
            console.log('no 3')
            return true;
        }),
        xfw.run('', async (body) => {
            console.log('no 4')
            return true;
        }),
    ).body();


    static dateValidator = xfw.buildStack(
        xfw.isDateString('start', 'mm-dd-yyyy'),
        xfw.isDateString('end', 'mm-dd-yyyy'),
    ).query();

    
    static showListValidator = xfw.buildStack(
        xfw.goTo( 'shows',
            xfw.each(
                xfw.isAlpha('name'),
                xfw.isDateString('showDate', 'mm-dd-yyyy'),
                xfw.isBoolean('visible', undefined, undefined, { optional: true })
            )
        )
    ).body();
    
}