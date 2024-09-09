import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { UserValidators } from '../Validators/UserValidator';
import { GlobalMiddlWare } from '../middlewares/GlobalMiddleware';

class UserRouter {

    public router: Router;

    constructor() {
        this.router = Router();

        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
    }

    getRoutes() {
        this.router.get('/send/verification/email', UserValidators.verifyUserForverifyEmail(), UserController.resendVerificationEmail);
    }

    postRoutes() {
        this.router.post('/signup', UserValidators.signup(), GlobalMiddlWare.checkError, UserController.signup);
    }

    patchRoutes() {
        this.router.patch('/verify', UserValidators.verifyUserEmail(), GlobalMiddlWare.checkError, UserController.verify);
    }
}

export default new UserRouter().router;