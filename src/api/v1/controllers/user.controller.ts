
import { Router, Request, Response, NextFunction } from 'express';
import {AuthValidator} from '../shared/validators/auth.validator';
export class UserController {
    router: Router = Router();
    constructor() {
        this.router.post('/',
            AuthValidator.authHeaderValidator,
            AuthValidator.userCredentialsValidator,
            this.createUser.bind(this))
    }

    createUser(req: Request, res: Response, next: NextFunction) {

        res.send('pass validations');
    }
}