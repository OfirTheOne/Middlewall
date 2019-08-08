export interface ValidationOptions {

    /**
     * ignore validation result if value is undefined or null,
     * validation action still run.
     * */
    optional: boolean,

    overwriteValue?: boolean,

}

export class ValidationOptionsParser implements ValidationOptions {

    optional: boolean;
    overwriteValue?: boolean;
    constructor(options: Partial<ValidationOptions> = {}) {
        this.optional =         options.optional == undefined ?         false : options.optional;
        this.overwriteValue =   options.overwriteValue == undefined ?   false : options.overwriteValue;
    }
}