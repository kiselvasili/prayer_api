import * as express from 'express';

import AuthRoute from './Auth';
import UserRoute from './User';

class BaseRoute {
    public router: express.Router = express.Router();

    constructor() {
        this.router.use('/auth', AuthRoute);
        this.router.use('/user', UserRoute);
    }    
}

export default new BaseRoute().router;