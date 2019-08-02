
export type ValidationCb = SyncValidationCb | AsyncValidationCb;
export type SyncValidationCb = (...args: any[]) => boolean;
export type AsyncValidationCb = (...args: any[]) => Promise<boolean>;

export type BrickFn = (arg: any) => BrickResultCollection;
export type AsyncBrickFn = (pathToArg: string, arg: any, root: any) => Promise<BrickResultCollection>;



/**
 * @description
 * @param root top level argument. 
 * @param target  value to validate  
 * */
export type IfPassFn = (target: any, root: any) => any


export type BrickFactory = (path: any, ifPass?: IfPassFn, ...args: any[]) => BrickFn;
export type AsyncBrickFactory = (path: any, ifPass?: IfPassFn, ...args: any[]) => AsyncBrickFn;




export interface BrickResult {
    pass: boolean;
    error: string | Array<string>;
    path?: string;
    value?: string;
    validation?: string
};

export interface BrickResultCollection {
    pass: boolean;
    errors: Array<BrickResult>;
};




export interface IFirewall {

    toBrick(): AsyncBrickFn
}

export * from './validation-options';