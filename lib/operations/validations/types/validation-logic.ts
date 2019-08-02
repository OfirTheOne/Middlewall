
export const _isString = (arg: any) => typeof arg == 'string';
export const  _isArray = (arg: any) => Array.isArray(arg); 
export const _isObject = (arg: any) => typeof arg == 'object' && typeof arg != 'function' && arg != null;
export const _isNumber = (arg: any) => ( typeof arg == 'number');
export const _isBoolean = (arg: any) => typeof arg == 'boolean';