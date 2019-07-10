

import { _isString } from './../types/validation-logic'

const _isUTCStringRegex = /[1-2][0-9]{3}-(([0][1-9])|([1][0-2]))-(([0-2][1-9])|([3][0-1]))T([0-5][0-9]):([0-5][0-9]):([0-5][0-9])Z/; 

export const _isUTCString = (target) =>  _isString(target) && _isUTCStringRegex.test(target);