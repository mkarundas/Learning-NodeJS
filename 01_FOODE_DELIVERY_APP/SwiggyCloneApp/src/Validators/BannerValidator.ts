import { body } from "express-validator";

export class BannerValidator {

    static addBanner()  {
        return [
            body('banner_images', 'Banner is required.').custom((banner, {req})=> {
               if(req.file) {
                return true;
               } else {
                throw new Error('File not uploaded.');
               }
            })
        ];
    }
}