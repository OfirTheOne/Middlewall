export interface ValidationOptions {

    /** 
     * @description
     * ignore validation result if value is undefined or null,
     * validation action still run.
     * */
    optional?: boolean,

    /**
     * @description
     * overwrite the target value with the return value of is-pass callback.
     * */
    overwriteValue?: boolean,

    /**
     * @description
     * set the target to the provided value if 'optional' set to true 
     * and target value not exists.
     * */
    default?: any

}

export class ValidationOptionsParser implements ValidationOptions {

    optional?: boolean;
    overwriteValue?: boolean;
    default?: any;
    constructor(options: Partial<ValidationOptions> = {}) {
        this.optional =         options.optional == undefined ?         false : options.optional;
        this.overwriteValue =   options.overwriteValue == undefined ?   false : options.overwriteValue;
        this.default =          options.default;
    }
}