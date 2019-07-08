
export type BrickFn = (arg: any) => BrickResultCollection;
// export type AsyncBrickFn = (arg: any) => Promise<BrickResultCollection>;

export type IfPassFn = (target: any, origin: any) => any

export type BrickFactory = (path: any, ifPass?: IfPassFn, ...args: any[]) => BrickFn;




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

    toBrick(): BrickFn
}