import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { getEnvVariables } from './environments/environment';
import UserRouter from './routers/UserRouter';
import BannerRouter from './routers/BannerRouter';
import CityRouter from './routers/CityRouter';
import RestaurantRouter from './routers/RestaurantRouter';
import CategoryRouter from './routers/CategoryRouter';
import ItemRouter from './routers/ItemRouter';
import AddressRouter from './routers/AddressRouter';
import { Utils } from './Utils/Utils';

export class Server {

    public app: express.Application = express();

    constructor() {
        this.setConfigs();
        this.setRoutes();
        this.error404Handler();
        this.handleErrors();
    }

    setConfigs() {
        this.dotenvConfigs();
        this.connnectMongoDB();
        this.allowCors();
        this.configureBodyParser();
    }

    dotenvConfigs() {
        Utils.dotenvConfigs()
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
        this.app.use('/src/uploads', express.static('src/uploads'));// Load image(banner) in browser
        this.app.use('/api/user', UserRouter);
        this.app.use('/api/banner', BannerRouter);
        this.app.use('/api/city', CityRouter);
        this.app.use('/api/restaurant', RestaurantRouter);
        this.app.use('/api/category', CategoryRouter);
        this.app.use('/api/item', ItemRouter);
        this.app.use('/api/address', AddressRouter);
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