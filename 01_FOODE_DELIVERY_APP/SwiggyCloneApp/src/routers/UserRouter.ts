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
        this.router.get('/send/verification/email',GlobalMiddlWare.auth, UserController.resendVerificationEmail);
        this.router.get('/login', UserValidators.login(), GlobalMiddlWare.checkError, UserController.login);
    }

    postRoutes() {
        this.router.post('/signup', UserValidators.signup(), GlobalMiddlWare.checkError, UserController.signup);
    }

    patchRoutes() {
        this.router.patch('/verify', UserValidators.verifyUser(), GlobalMiddlWare.checkError, GlobalMiddlWare.auth, UserController.verify);
    }
}

export default new UserRouter().router;