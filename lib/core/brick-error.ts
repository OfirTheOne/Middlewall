import * as util from 'util';
import { BrickResult } from './../models'

export class BrickError {
    constructor(private errMessageTemplate: string, private validationMethod: string) { }

    createError(value: string, path: string): BrickResult {
        const errorMassage = util.format(this.errMessageTemplate, 'value');
        return { pass: false, error: errorMassage, value, path, validation: this.validationMethod };
    }
}