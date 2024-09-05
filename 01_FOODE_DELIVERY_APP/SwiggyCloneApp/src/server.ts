import * as express from 'express';
import * as mongoose from 'mongoose';
import { getEnvVariables } from './environments/environment';
import UserRouter from './routers/UserRouter';

export class Server {

    public app: express.Application = express();

    constructor() {
        this.setConfigs();
        this.setRoutes();
    }

    setConfigs() {
        this.connnectMongoDB();
    }

    connnectMongoDB() {
        mongoose.connect(getEnvVariables().db_uri).then(()=> {
            console.log('Connected mongo db');
        });
    }

    setRoutes() {
        this.app.use('/api/user', UserRouter);
    }

}