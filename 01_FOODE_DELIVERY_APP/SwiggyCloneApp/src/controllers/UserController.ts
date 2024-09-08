import User from "../models/User";
import { NodeMailer } from "../Utils/NodeMailer";
import { Utils } from '../Utils/Utils';

export class UserController {


    static async signup(req, res, next) {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const type = req.body.type;
        const status = req.body.status;
        const phone = req.body.phone;
        const verification_token = Utils.generateverificationToken(5);
        const data = {
            name: name,
            email: email,
            password: password,
            type: type,
            status: status,
            phone: phone,
            verification_token: verification_token,
            verification_token_time: Date.now() + new Utils().MAX_TOKEN_TIME
        }
        
        try {
            let user = await new User(data).save();
            /*
            await NodeMailer.sendMail({
                to: [email],
                subject: 'test',
                html: `<h1> Your Otp is ${verification_token}</h1>`
            });*/
            res.send(user);
        } catch(e) {
            next(e);
        }
    }

    static async verify(req, res, next) {
        const email = req.body.email;
        const verification_token = req.body.verification_token;
        try {
            const user = await User.findOneAndUpdate( {
                email: email,
                verification_token: verification_token,
                verification_token_time: {$gt: Date.now()}
            },
            {
                email_verified: true
            },
            {
                new: true
            }
        );

            if(user) {
                res.send(user);
            } else {
                throw new Error('Email verification token expired. Please try again later.')
            }
        } catch(e) {
            next(e);
        }

    }
}