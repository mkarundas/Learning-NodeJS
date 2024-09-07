import User from "../models/User";

export class UserController {


    static login(req, res, next) {
        // const data = [{name: 'arundas mk'}];
        // res.status(200).send(data);

        // const error = Error('This is a text error');
        // next(error);

        const email = req.body.email;
        const password = req.body.password;
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