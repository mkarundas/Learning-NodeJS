import { Router } from "express";
import { GlobalMiddlWare } from "../middlewares/GlobalMiddleware";
import { ItemController } from "../controllers/ItemController";
import { ItemValidator } from "../Validators/ItemValidator";
import { Utils } from "../Utils/Utils";

export class ItemRouter {

    public router: Router;

    constructor() {
        this.router = Router();

        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
    }

    getRoutes() {
        this.router.get('/items/:restaurant_id', GlobalMiddlWare.auth, ItemValidator.getItem(), GlobalMiddlWare.checkError, ItemController.getItems);
    }

    postRoutes() {
        this.router.post('/add', GlobalMiddlWare.auth, GlobalMiddlWare.adminRole, new Utils().multer.single('item_images'), ItemValidator.addItem(), GlobalMiddlWare.checkError, ItemController.addItem);
    }

    patchRoutes() {
        
    }
}

export default new ItemRouter().router;