
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
        return this.exMiddlewareFactory((req)=>req.query);
    }
    public params() {
        return this.exMiddlewareFactory((req)=>req.params);
    }
    public body() {
        return this.exMiddlewareFactory((req)=>req.body);
    }
    public headers() {
        return this.exMiddlewareFactory((req)=>req.headers);
    }

    public toBrick(): AsyncBrickFn {
        return ( (arg: any) => reduce(arg, this._bricks) )   
    }

    private exMiddlewareFactory(transformCb: (a: any)=>any) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const target = transformCb(req);
                const result = await reduce(target, this._bricks);

                if (result.pass) {
                    return next();
                } else {
                    return next(result);
                }
            } catch (error) {
                return next();
            }
        }
    }

}
