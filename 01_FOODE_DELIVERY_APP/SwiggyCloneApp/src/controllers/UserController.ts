import { validationResult } from 'express-validator';
import User from "../models/User";

export class UserController {


    static signup(req, res, next) {
        const errors = validationResult(req);
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const type = req.body.type;
        const status = req.body.status;
        const phone = req.body.phone;
        if(!errors.isEmpty()) {
            next(new Error(errors.array()[0].msg));
        }

        const data = {
            name: name,
            email: email,
            password: password,
            type: type,
            status: status,
            phone: phone
        }

        let user = new User(data);

        user.save().then((user)=> {
            res.send(user);
        }).catch(err=> {
            next(err);
        });
    }
}