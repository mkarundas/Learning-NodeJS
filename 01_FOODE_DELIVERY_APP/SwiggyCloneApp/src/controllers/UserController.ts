import { query } from "express-validator";
import User from "../models/User";
import { NodeMailer } from "../Utils/NodeMailer";
import { Utils } from '../Utils/Utils';
import * as Bcrypt from 'bcrypt';

export class UserController {

    private static encryptPassword(req, res, next) {
        return new Promise((resolve, reject) => {
            Bcrypt.hash(req.body.password, 10, (err, hash)=> {
                if(err) {
                    console.log("Error is ", err);
                    reject(err);
                } else {
                    console.log("Hash is ", err);
                    resolve(hash);
                }
            })
        });
    }

    static async signup(req, res, next) {
        const name = req.body.name;
        const email = req.body.email;
        const type = req.body.type;
        const status = req.body.status;
        const phone = req.body.phone;
        const verification_token = Utils.generateverificationToken();
        
        try {
            const hash = await UserController.encryptPassword(req, res, next);
            const data = {
                name: name,
                email: email,
                password: hash,
                type: type,
                status: status,
                phone: phone,
                verification_token: verification_token,
                verification_token_time: Date.now() + new Utils().MAX_TOKEN_TIME
            }

            let user = await new User(data).save();
            /*
            await NodeMailer.sendMail({
                to: [user.email],
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

    static async resendVerificationEmail(req, res, next) {
        const verification_token = Utils.generateverificationToken();
        const email = req.query.email;
        try {
            const user = await User.findOneAndUpdate({
                email: email,
            },
        {
            verification_token: verification_token,
            verification_token_time: Date.now() + new Utils().MAX_TOKEN_TIME
        });

        if(user) {
            // send email from 3rd party - send grid
            res.json({success: true});
        } else {
            throw new Error('User does not exist.');
        }

        } catch (e) {
            next(e);
        }
    }
}