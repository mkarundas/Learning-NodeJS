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
        
    }

    postRoutes() {
        this.router.post('/signup', UserValidators.signup(), UserController.signup);
    }
}

export default new UserRouter().router;