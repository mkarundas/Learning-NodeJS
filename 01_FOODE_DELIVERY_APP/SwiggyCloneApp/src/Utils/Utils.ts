import * as Bcrypt from 'bcrypt';
import * as JWT from 'jsonwebtoken';
import { getEnvVariables } from '../environments/environment';


export class Utils {

    public MAX_TOKEN_TIME = (5 * 60 * 100);

    static generateverificationToken(digit: number = 6) {
        const digits = '0123456789';
        let otp = '';
        for(let i=0; i < digit; i++) {
            otp += Math.floor(Math.random() * 10);
        }
        return parseInt(otp);
    }

    static encryptPassword(password) {
        return new Promise((resolve, reject) => {
            Bcrypt.hash(password, 10, (err, hash)=> {
                if(err) {
                    reject(err);
                } else {
                    resolve(hash);
                }
            })
        });
    }

    static comparePassword(data: {password: string, encrypt_password: string}): Promise<any> {
        return new Promise((resolve, reject) => {
            Bcrypt.compare(data.password, data.encrypt_password, (err, same)=> {
                if(err) {
                    reject(err);
                } else if(!same) {
                    reject(new Error('Password incorrect'));
                } else {
                    resolve(true);
                }
            })
        });
    }

     static jwtSignIn(payload, expires_in: string = '180d') {
        return  JWT.sign(
                payload,
                getEnvVariables().jwt_secret_ket,
                { expiresIn: expires_in}
            );
    }
}