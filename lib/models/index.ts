
export type ValidationCb = SyncValidationCb | AsyncValidationCb;
export type SyncValidationCb = (...args: any[]) => boolean;
export type AsyncValidationCb = (...args: any[]) => Promise<boolean>;

export type BrickFn = (arg: any) => BrickResultCollection;
export type AsyncBrickFn = (arg: any) => Promise<BrickResultCollection>;

export type IfPassFn = (target: any, origin: any) => any


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