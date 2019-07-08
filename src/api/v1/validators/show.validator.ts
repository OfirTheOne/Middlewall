

import * as xfw from './../../../../lib'

export class ShowValidator {

    static paginationValidator = xfw.buildStack(
        xfw.isNumber('page'),
        xfw.isPositive('page', parseInt),
        xfw.isNumber('itemsPerPage'),
        xfw.isBetween('itemsPerPage', 1, 100, parseInt)
    ).query()
    
}