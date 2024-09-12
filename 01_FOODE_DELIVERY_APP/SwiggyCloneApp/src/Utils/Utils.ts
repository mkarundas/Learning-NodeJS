import * as Bcrypt from 'bcrypt';
import * as Multer from 'multer';

const storageOptions = Multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './src/uploads');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + file.originalname);
    }
});

const fileFilter = (req, file, cb) =>{
    if( file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

export class Utils {

    public MAX_TOKEN_TIME = (5 * 60 * 1000);
    public multer = Multer({
        storage: storageOptions,
        fileFilter: fileFilter
    });

    static generateverificationToken(digit: number = 6) {
        const digits = '0123456789';
        let otp = '';
        for(let i=0; i < digit; i++) {
            otp += Math.floor(Math.random() * 10);
        }
        return otp;
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
}