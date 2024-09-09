import * as jwt from 'jsonwebtoken';
import { getEnvVariables } from '../environments/environment';

export class Jwt {

    static jwtSignIn(payload, expires_in: string = '180d') {
        return  jwt.sign(
                payload,
                getEnvVariables().jwt_secret_ket,
                { expiresIn: expires_in}
            );
    }

    static jwtVerify(token: string): Promise<any> {
        return new Promise((resolve, reject)=> {
            jwt.verify(token, getEnvVariables().jwt_secret_ket, (err, decoded)=> {
                if(err) reject(err);
                else if(!decoded) reject(new Error('User is not authorized.'));
                else resolve(decoded);

            });
        });
    }
}