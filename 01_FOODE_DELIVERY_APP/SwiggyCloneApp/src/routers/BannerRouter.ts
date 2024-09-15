import { Router } from 'express';
import { GlobalMiddlWare } from '../middlewares/GlobalMiddleware';
import { BannerValidator } from '../Validators/BannerValidator';
import { BannerController } from '../controllers/BannerController';
import { Utils } from '../Utils/Utils';

export class BannerRouter {
    public router: Router;

    constructor() {
        this.router = Router();

        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
    }

    getRoutes() {
        this.router.get('/banners',GlobalMiddlWare.auth, BannerController.getBanners);
    }

    postRoutes() {
        this.router.post('/add', GlobalMiddlWare.auth, GlobalMiddlWare.adminRole, new Utils().multer.single('banner_images'), BannerValidator.addBanner(), GlobalMiddlWare.checkError, BannerController.addBanner);

    }

    patchRoutes() {
        
    }

}

export default new BannerRouter().router;