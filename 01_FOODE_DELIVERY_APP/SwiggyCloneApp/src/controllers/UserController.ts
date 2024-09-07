import { validationResult } from 'express-validator';
import User from "../models/User";

export class UserController {


    static signup(req, res, next) {
        const errors = validationResult(req);

        const email = req.body.email;
        const password = req.body.password;
        if(!errors.isEmpty()) {
            return res.status(400).json({error: errors.array().map(x => x.msg)})
        }
        const user = new User({
            email,
            password
        });

        user.save().then((user)=> {
            res.send(user);
        }).catch(err=> {
            next(err);
        });
    }
}