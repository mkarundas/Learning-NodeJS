import { Router } from "express";
import { GlobalMiddlWare } from "../middlewares/GlobalMiddleware";
import { RestaurantController } from "../controllers/RestaurantController";
import { RestaurantValidator } from "../Validators/RestaurantValidators";
import { Utils } from "../Utils/Utils";

export class CityRouter {

    public router: Router;

    constructor() {
        this.router = Router();

        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
    }

    getRoutes() {
        this.router.get('/nearby', GlobalMiddlWare.auth, RestaurantValidator.nearby(),GlobalMiddlWare.checkError,  RestaurantController.nearby);
    }

    postRoutes() {
        this.router.post('/add', GlobalMiddlWare.auth, GlobalMiddlWare.adminRole, new Utils().multer.single('restaurant_images'), RestaurantValidator.addRestaurant(), GlobalMiddlWare.checkError, RestaurantController.addRestaurant);

    }

    patchRoutes() {
        
    }
}

export default new CityRouter().router;