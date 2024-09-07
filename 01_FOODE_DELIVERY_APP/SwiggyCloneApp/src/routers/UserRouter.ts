import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { UserValidators } from '../Validators/UserValidator';

class UserRouter {

    public router: Router;

    constructor() {
        this.router = Router();

        this.getRoutes();
        this.postRoutes();
    }

    getRoutes() {
        this.router.post('/signup', UserValidators.signup(), UserController.signup);
    }

    postRoutes() {

    }
}

export default new UserRouter().router;