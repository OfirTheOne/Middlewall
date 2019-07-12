import { Router } from 'express';
import { ShowController } from './v1/controllers/show.controller'
import { UserController } from './v1/controllers/user.controller';


export const apiRoutes = Router()
    .use('/show', new ShowController().router)
    .use('/user', new UserController().router);