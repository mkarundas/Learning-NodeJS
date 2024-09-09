import User from "../models/User";
import { Jwt } from "../Utils/Jwt";
import { Utils } from '../Utils/Utils';

export class UserController {

    static async signup(req, res, next) {
        const name = req.body.name;
        const email = req.body.email;
        const type = req.body.type;
        const status = req.body.status;
        const phone = req.body.phone;
        const verification_token = Utils.generateverificationToken();
        const password = req.body.password;
        
        try {
            const hash = await Utils.encryptPassword(password);
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
            const payload = {
                aud: user._id,
                email: user.email
            }

            const token = Jwt.jwtSignIn(payload);

            res.json({
                token: token,
                user: user
            });

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

    static async verifyUserEmailToken(req, res, next) {
        const email = req.user.email;
        const verification_token = req.body.verification_token;

        console.log("email ", email)
        console.log("verification_token ", verification_token)

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

        console.log("user ", user)
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
        const email = req.user.email;
        try {
            const user = await User.findOneAndUpdate({
                email: email,
            },
        {
            updated_at: new Date(),
            verification_token: verification_token,
            verification_token_time: Date.now() + new Utils().MAX_TOKEN_TIME
        });

        if(user) {
            res.json({success: true});
            // send email from 3rd party - send grid
        } else {
            throw new Error('User does not exist.');
        }

        } catch (e) {
            next(e);
        }
    }

    static async login(req, res, next) {
        const user = req.user;
        const password = req.query.password;
        
        try {
            const data = {
                password,
                encrypt_password: user.password
            }
            await Utils.comparePassword(data);
            const payload = {
                aud: user._id,
                email: user.email
            }

            const token = Jwt.jwtSignIn(payload);  

            res.json({
                token: token,
                user: user
            });

        } catch (e) {
            next(e);
        }
    }

    static async sendResetPasswordOtp(req, res, next) {
        const reset_password_token = Utils.generateverificationToken();
        const email = req.query.email;
        try {
            const user = await User.findOneAndUpdate({
                email: email,
            },
        {
            updated_at: new Date(),
            reset_password_token: reset_password_token,
            reset_password_token_time: Date.now() + new Utils().MAX_TOKEN_TIME
        });

        if(user) {
            res.json({success: true});  
            // send email from 3rd party - send grid
            
        } else {
            throw new Error('User does not exist.');
        }

        } catch (e) {
            next(e);
        }
    }

    static verifyResetPasswordToken(req, res, next) {
        res.json({success: true});
    }

    static async resetPassword(req, res, next) {

        const user = req.user;
        const new_password = req.body.new_password;

        try {
            const encryptedPassword = await Utils.encryptPassword(new_password);

            const updatedUser = await User.findByIdAndUpdate(user._id,
        {
            password: encryptedPassword,
        }, {
            new: true
        });

        if(updatedUser) {
            res.send(updatedUser);  
        } else {
            throw new Error('User does not exist.');
        }

        } catch (e) {
            next(e);
        }
    }
}