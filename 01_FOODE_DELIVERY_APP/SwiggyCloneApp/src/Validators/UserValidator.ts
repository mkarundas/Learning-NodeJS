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
                }).catch (e => new Error(e));
            }),
            body('password', 'Password is required.')
            .isAlphanumeric()
            .isLength({min: 5, max: 25})
            .withMessage('Password must be between 8-25 characters.'),
            body('type', 'User role type is required.').isString(),
            body('status', 'User status is required.').isString(),
        ];
    }

    static verifyUserEmail() {
        return [
            body('verification_token', 'Email verification token is required.').isNumeric(),
            body('email', 'Email is required.').isEmail(),
        ];
    }

    static verifyUserForverifyEmail() {
        return [
            query('email', 'Email is required.').isEmail()
        ]
    }
}