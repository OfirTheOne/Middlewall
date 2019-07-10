
export class BaseError extends Error {
    constructor(
        public massage: string, 
        public code: string, 
        public type: string) { 
        super(massage);
    }
}
