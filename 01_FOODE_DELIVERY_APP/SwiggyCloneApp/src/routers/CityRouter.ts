import { Router } from "express";
import { GlobalMiddlWare } from "../middlewares/GlobalMiddleware";
import { CityValidator } from "../Validators/CityValidators";
import { CityController } from "../controllers/CityController";

export class CityRouter {

    public router: Router;

    constructor() {
        this.router = Router();

        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
    }

    getRoutes() {
        this.router.get('/cities', CityController.getCities);
    }

    postRoutes() {
        this.router.post('/add', CityValidator.addCity(), GlobalMiddlWare.checkError, CityController.addCity);

    }

    patchRoutes() {
        
    }
}

export default new CityRouter().router;