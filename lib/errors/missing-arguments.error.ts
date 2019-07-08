
import { BaseError } from './base-error';

export class MissingArgumentError extends BaseError {

    constructor(
        private fnName: string, 
        private expectedArgs: string[], 
        private missingArgs: string[], 
        private value: string
    ) {
        super(
                `Missing argument was provided for the function ${fnName}.\n` +
                `Expected args : ${JSON.stringify(expectedArgs)}\n` + 
                `Missing args : ${JSON.stringify(missingArgs)}`,
            '0011',
            'MissingArgumentError'
            ) 
    }

}