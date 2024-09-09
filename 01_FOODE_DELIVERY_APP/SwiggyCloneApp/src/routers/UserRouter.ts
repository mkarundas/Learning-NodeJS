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
        this.router.get('/send/reset/password/token', UserValidators.checkResetPasswordEmail(), GlobalMiddlWare.checkError, UserController.sendResetPasswordOtp);
        this.router.get('/verify/reset/password/token', UserValidators.verifyResetPasswordToken(), GlobalMiddlWare.checkError, UserController.verifyResetPasswordToken);
    }

    postRoutes() {
        this.router.post('/signup', UserValidators.signup(), GlobalMiddlWare.checkError, UserController.signup);
    }

    patchRoutes() {
        this.router.patch('/verify/email-token', GlobalMiddlWare.auth, UserValidators.verifyUserEmailToken(), GlobalMiddlWare.checkError, UserController.verifyUserEmailToken);
        this.router.patch('/reset/password', UserValidators.resetPassword(), GlobalMiddlWare.checkError, UserController.resetPassword);
    }
}

export default new UserRouter().router;