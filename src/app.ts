import * as express from 'express';
import {Request, Response, NextFunction } from 'express';
 
import { apiRoutes } from './api/routes'
const app = express();

app.use('/api', apiRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    res.status(400).send(err);
});

app.listen(3100, () => {
    console.log('up on 3100');
});

export { app };