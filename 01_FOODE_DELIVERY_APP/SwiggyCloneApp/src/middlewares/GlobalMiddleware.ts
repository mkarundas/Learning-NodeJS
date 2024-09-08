import { validationResult } from 'express-validator';

export class GlobalMiddlWare {

    static checkError(req, res, next) {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            next(new Error(errors.array()[0].msg));
        } else {
            next();
        }
    }
}