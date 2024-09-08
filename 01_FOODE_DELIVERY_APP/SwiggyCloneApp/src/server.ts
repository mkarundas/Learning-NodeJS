import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { getEnvVariables } from './environments/environment';
import UserRouter from './routers/UserRouter';

export class Server {

    public app: express.Application = express();

    constructor() {
        this.setConfigs();
        this.setRoutes();
        this.error404Handler();
        this.handleErrors();
    }

    setConfigs() {
        this.connnectMongoDB();
        this.allowCors();
        this.configureBodyParser();
    }

    connnectMongoDB() {
        mongoose.connect(getEnvVariables().db_uri).then(()=> {
            console.log('Connected mongo db');
        });
    }

    configureBodyParser() {
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
    }

    setRoutes() {
        this.app.use('/api/user', UserRouter);
    }

    error404Handler() {
        this.app.use((req, res)=> {
            res.status(404).json({
                message: 'Not found',
                status_code: 404
            });
        });
    }

    handleErrors() {
        this.app.use((err, req, res, next)=> {
            const errorStatus = err.errorStatus || 500;
            res.status(errorStatus).json({
                message: err.message ||'Something went wrong',
                status_code: errorStatus
            });
        });
    }

    allowCors() {
        this.app.use(cors());
    }

}