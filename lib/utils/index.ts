import {InvalidPathFormatError, FailedLocateTargetError} from './../errors';
/**
 * @example
 * dotProtocolPathRegex.test('user'); // --> true
 * dotProtocolPathRegex.test('user.street'); // --> true
 * dotProtocolPathRegex.test('user.street.'); // --> false
 * dotProtocolPathRegex.test('.street.'); // --> false
 * 
 */
const dotProtocolPathRegex = /^((\w|\$)+(-(\w|\$)+)*)+(\.(\w|\$)+(-(\w|\$)+)*)*$/; // /^(\w+(\.(\w+))?)+$/;

/** 
 * @description
 * return (multiple level) nested element from any object, 
 * using a 'path' string constructed from the parents names of the desired sub element, by there existing order.
 * 
 * @example
 * const path = 'user.address.street'
 * const otherPath = 'user.address.home'
 * const user = { address: { street: 'myStreetName', no: 10 } };
 * const street = getNestedElementsWithPath({ user }, path); 
 * console.log(street); // output : 'myStreetName'
 * const home = getNestedElementsWithPath({ user }, otherPath); 
 * console.log(home); // output : undefined
 * 
 * @param obj 
 * @param dotProtocolPath 
 */
export function getNestedElementByPath(obj: any, dotProtocolPath: string) {
    if(!dotProtocolPathRegex.test(dotProtocolPath)) {
        throw new InvalidPathFormatError(dotProtocolPath)
    }
    const slicedPath = dotProtocolPath.split('.');
    let curLvlElement = obj;
    let lvl = 0;
    const targetDepth = slicedPath.length;
    for(; lvl < targetDepth; lvl++) {
        try {
            if(curLvlElement == undefined) { break; }
            const elementName = slicedPath[lvl];
            curLvlElement = curLvlElement[elementName]
        } catch (error) {
            // handle maybe console.log
            curLvlElement = undefined
            break;
        }
    }

    if(lvl < slicedPath.length -1) {
        throw new FailedLocateTargetError(dotProtocolPath, obj);
    }

    return curLvlElement;
}

export function getNestedElementParentByPath(obj: any, dotProtocolPath: string) {
    if(!dotProtocolPathRegex.test(dotProtocolPath)) {
        throw  new Error(dotProtocolPath);//new InvalidSubElementPathFormatError(dotProtocolPath)
    }
    const slicedPath = dotProtocolPath.split('.');
    let curLvlElement = obj;
    let lvl = 0
    const targetDepth = slicedPath.length-1;
    for(; lvl < targetDepth; lvl++) {
        try {
            if(curLvlElement == undefined) { break; }
            const elementName = slicedPath[lvl];
            curLvlElement = curLvlElement[elementName]
        } catch (error) {
            // handle maybe console.log
            curLvlElement = undefined
            break;
        }
    }

    if(lvl < targetDepth) {
        throw new FailedLocateTargetError(dotProtocolPath, obj);
    }

    return { parent: curLvlElement, pathToChild: slicedPath[lvl]};
}



export const tryCatch = (cb: Function) => {
    
    try {
        return [undefined,cb()];
    } catch (error) {
        return [error,undefined];
    }
}


export const connectPathSegments = (a: string = "", b: string = "") => {
    return b == "" ? a : `${a != "" ? a + '.' : a}${b}`
}