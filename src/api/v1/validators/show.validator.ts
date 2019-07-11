

import * as xfw from './../../../../lib'

export class ShowValidator {


    static authValidator = xfw.buildStack(
        xfw.run('x-auth', async (authHeader: string) => {
            
            return false;
        })
    ).headers();

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