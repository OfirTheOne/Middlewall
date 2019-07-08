
export class BaseError extends Error {
    constructor(
        massage: string, 
        public code: string, 
        public type: string) { 
        super(massage);
    }
}
