
import { Router, Request, Response, NextFunction } from 'express';
import { ShowValidator } from './../validators/show.validator';

export class ShowController {
    router: Router = Router();
    constructor() {
        this.router.get('/show',
            ShowValidator.authValidator,
            ShowValidator.dateValidator,
            ShowValidator.paginationValidator,
            this.getShows.bind(this))
    }

    getShows(req: Request, res: Response, next: NextFunction) {

        res.send('pass validations');
    }
}