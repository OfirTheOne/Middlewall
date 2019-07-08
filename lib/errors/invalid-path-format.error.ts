
import { BaseError } from './base-error';

export class InvalidPathFormatError extends BaseError {

    constructor(private path: string) {
        super(
            `Invalid path format on the provided path: ${path}`,
            '0011',
            'InvalidPathFormatError'
            ) 
    }

}