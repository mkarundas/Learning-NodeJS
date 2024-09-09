import {body, query} from 'express-validator';
import User from '../models/User';

export class UserValidators {
    static signup() {
        return [
            body('name', 'Name is required.').isString(),
            body('phone', 'Phone is required.').isString(),
            body('email', 'Email is required.').isEmail().custom((email)=> {
                return User.findOne({
                    email: email
                }).then(user=> {
                    if(user) {
                        throw new Error('User already exists.');
                    } else {
                        return true;
                    }
                })
                .catch(e => {
                    throw new Error(e);
                });;
            }),
            body('password', 'Password is required.')
            .isAlphanumeric()
            .isLength({min: 5, max: 25})
            .withMessage('Password must be between 8-25 characters.'),
            body('type', 'User role type is required.').isString(),
            body('status', 'User status is required.').isString(),
        ];
    }

    static verifyUser() {
        return [
            body('verification_token', 'Email verification token is required.').isNumeric()
        ];
    }

    static login() {
        return [
            query('email', 'Email is required.').isEmail().custom((email, {req})=> {
                return User.findOne({
                    email: email
                }).then(user=> {
                    if(user) {
                        req.user = user;
                        return true
                    } else {
                        throw new Error('User does not exists.');
                    }
                }).catch(e => {
                    throw new Error(e);
                });
            }),
            query('password', 'Password is required.')
            .isAlphanumeric()
        ];
    }

    static checkResetPasswordEmail() {
        return [
            query('email', 'Email is required.').isEmail().custom((email, {req})=> {
                return User.findOne({
                    email: email
                }).then(user=> {
                    if(user) {
                        return true
                    } else {
                        throw new Error('User does not exists.');
                    }
                }).catch(e => {
                    throw new Error(e);
                });
            }),
        ];
    }

    static testThis() {
        query('email', 'Email is required.').isEmail()
    }

    static verifyResetPasswordToken() {
        return [
            query('email', 'Email is required.').isEmail(),
            query('reset_password_token', 'Reset password token is required.').isNumeric()
            .custom((reset_password_token, {req})=> {
                return User.findOne({
                    email: req.query.email,
                    reset_password_token: reset_password_token,
                    reset_password_token_time: { $gt: Date.now()}
                }).then(user=> {
                    if(user) {
                        return true
                    } else {
                        throw new Error('Reset password token does not match.');
                    }
                }).catch(e => {
                    throw new Error(e);
                });
            }),
        ];
    }

    static resetPassword() {
        return [
            body('email', 'Email is required.').isEmail()
            .custom((email, {req})=> {
                return User.findOne({
                    email: email
                }).then(user=> {
                    if(user) {
                        req.user = user;
                        return true
                    } else {
                        throw new Error('No user is registered with this email');
                    }
                }).catch(e => {
                    throw new Error(e);
                });
            }),
            body('new_password', 'New password is required.').isAlphanumeric(),
            body('reset_password_token', 'Reset password token is required.').isNumeric()
            .custom((reset_password_token, {req})=> {
                if(req.user.reset_password_token === reset_password_token) {
                    return true;
                } else {
                    req.errorStatus = 422;
                    throw new Error('Reset password token is invalid.');
                }
            })
           ,
        ];
    }
}