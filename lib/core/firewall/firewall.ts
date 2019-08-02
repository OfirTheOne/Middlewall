
import { Request, Response, NextFunction } from 'express'
import { BrickFn, IFirewall, AsyncBrickFn } from './../../models'
import {reduce} from './reduce-bricks';

export class Firewall implements IFirewall{

    private _bricks: Array<AsyncBrickFn>;
    constructor(private bricks: Array<AsyncBrickFn | Firewall>) {
        this._bricks = bricks.map(brick => 
            typeof brick == 'function' ? 
                brick : brick.toBrick()
        );
    }

    public req() {
        return this.exMiddlewareFactory((req)=>req);
    }
    public query() {
        return this.exMiddlewareFactory((req)=>({target: req.query, path: 'query'}));
    }
    public params() {
        return this.exMiddlewareFactory((req)=>({target: req.params, path: 'params'}));
    }
    public body() {
        return this.exMiddlewareFactory((req)=>({target: req.body, path: 'body'}));
    }
    public headers() {
        return this.exMiddlewareFactory((req)=>({target: req.headers, path: 'headers'}));
    }
    public locals() {
        return this.exMiddlewareFactory((req)=>({target: req.locals, path: 'locals'}));
    }

    public toBrick(): AsyncBrickFn {
        return ( (pathToArg: string, arg: any, root: any) => reduce(undefined, arg, root, this._bricks) )   
    }

    private exMiddlewareFactory(transformCb: (a: any)=>any) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const {target, path} = transformCb(req);
                const result = await reduce(path, target, req, this._bricks);

                if (result.pass) {
                    return next();
                } else {
                    return next(result);
                }
            } catch (error) {
                return next(error);
            }
        }
    }

}
