import { Router } from 'express';
import { UserController } from '../controllers/UserController';

class UserRouter {

    public router: Router;

    constructor() {
        this.router = Router();

        this.getRoutes();
        this.postRoutes();
    }

    getRoutes() {
        this.router.post('/login', UserController.login);
    }

    postRoutes() {

    }
}

export default new UserRouter().router;