import { Router } from 'express';
import { GlobalMiddlWare } from '../middlewares/GlobalMiddleware';
import { Utils } from '../Utils/Utils';
import { CategoryController } from '../controllers/CategoryController';

export class CategoryRouter {
    public router: Router;

    constructor() {
        this.router = Router();

        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
    }

    getRoutes() {
        this.router.get('/categories/:restaurantId',GlobalMiddlWare.auth, CategoryController.getCategoriesByRestaurant);
    }

    postRoutes() {
    }

    patchRoutes() {
        
    }

}

export default new CategoryRouter().router;