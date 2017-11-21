import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as mongoose from 'mongoose';

import * as databaseConfig from '../config/database';
import * as api from '../app/routes';

class Server {
    public app: express.Application;

    constructor() {
        this.app = express();
        mongoose.connect(databaseConfig.url);
        this.initConfig();
        this.start();
    }

    private initConfig() {
        this.app.use(bodyParser.urlencoded({extended: false}));
        this.app.use(bodyParser.json());
        this.app.use(morgan('dev'));
        this.app.use(cors());

        this.app.use('/api', api);
    }

    private start() {
        this.app.listen(process.env.PORT || 8080);
        console.log('App listening on port 8080');
    }

}

export default new Server().app;