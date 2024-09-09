import { validationResult } from 'express-validator';
import { Jwt } from '../Utils/Jwt';

export class GlobalMiddlWare {

    static checkError(req, res, next) {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            next(new Error(errors.array()[0].msg));
        } else {
            next();
        }
    }

    static async auth(req, res, next) {
        const header_auth = req.headers.authorization;
        const token = header_auth ? header_auth.slice(7, header_auth.length) : null;
        // const authHeader = header_auth.split(' ');
        // const token = authHeader[1]''

        try {
            if(!token) {
                req.errorStatus = 401;
                next(new Error('User doem\'t exist.'))
            }
            const decoded = await Jwt.jwtVerify(token);
            req.user = decoded;
            next();
        } catch (e) {
            req.errorStatus = 401;
            next(new Error('User doem\'t exist.'));
        }

    }
}