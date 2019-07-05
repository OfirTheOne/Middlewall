
import { Request, Response, NextFunction } from 'express'
import { BrickFn, IFirewall } from './../../models'
import {reduce} from './reduce-bricks';

export class Firewall implements IFirewall{

    private _bricks: Array<BrickFn>;
    constructor(private bricks: Array<BrickFn | Firewall>) {
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

    public toBrick(): BrickFn {
        return ( (arg: any) => reduce(arg, this._bricks) )   
    }

    private exMiddlewareFactory(transformCb: (a: any)=>any) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const target = transformCb(req);
                const result = reduce(target, this._bricks);

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
