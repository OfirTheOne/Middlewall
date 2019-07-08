
import './app';
/*

import * as fw from './../lib';
import {mixin, or, buildStack } from './../lib';


const query = {
    page: 1,
    itemsPerPage: 20,
}

const paginationValidator = buildStack(
    or(
        mixin(fw.isDefine, fw.isNumber, fw.isPositive)('page'),
        fw.isNotDefine('page'),
    ),
    or(
        mixin(fw.isDefine, fw.isNumber, fw.isPositive)('itemsPerPage'),
        fw.isNotDefine('itemsPerPage'),
        fw.isNaN('itemsPerPage')
    )
).query();



const res = { query } as any;
const req = {} as any;
const next =  (res) => {
    console.log(res);
}


paginationValidator(res, req, next)

*/
