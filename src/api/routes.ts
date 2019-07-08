import { Router } from 'express';
import { ShowController } from './v1/controllers/show.controller'


export const apiRoutes = Router()
    .use('/', new ShowController().router);