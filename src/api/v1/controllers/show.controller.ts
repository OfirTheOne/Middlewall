
import { Router, Request, Response, NextFunction } from 'express';
import { ShowValidator } from './../validators/show.validator';
import {AuthValidator} from '../shared/validators/auth.validator';
export class ShowController {
    router: Router = Router();
    constructor() {
        this.router.get('/',
            // AuthValidator.authHeaderValidator,
            ShowValidator.dateValidator,
            ShowValidator.paginationValidator,
            this.getShows.bind(this)
        );

        this.router.post('/',
            ShowValidator.showListValidator,
            this.getShows.bind(this)
        );
    }

    getShows(req: Request, res: Response, next: NextFunction) {
        res.send('pass validations');
    }
}