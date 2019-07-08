
import { BaseError } from './base-error';

export class FailedLocateTargetError extends BaseError {

    constructor(private path: string, private value: any) {
        super(
            `Failed to locate target using the path: ${path}`,
            '0010',
            'FailedLocateTargetError'
            ) 
    }

}