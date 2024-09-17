import { body, query } from "express-validator";
import User from "../models/User";


export class RestaurantValidator {

    static addRestaurant()  {
        return [
            body('name', 'Owner name is required.').isString(),
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
            body('phone', 'Phone is required.').isString(),
            body('password', 'Password is required.')
            .isAlphanumeric()
            .isLength({min: 5, max: 25}),
            body('restaurant_images', 'Cover photo is required.').custom((banner, {req})=> {
               if(req.file) {
                return true;
               } else {
                throw new Error('File not uploaded.');
               }
            }),
            body('res_name', 'Restaurant name is required.').isString(),
            body('short_name', 'Restaurant short name is required.').isString(),
            body('open_time', 'Open time is required.').isString(),
            body('close_time', 'Close time is required.').isString(),
            body('price', 'Price is required.').isString(),
            body('delivery_time', 'Delivery time is required.').isString(),
            body('address', 'Address is required.').isString(),
            body('status', 'Status is required.').isString(),
            body('location', 'Longitude is required.').isString(),
            body('cuisines', 'Cuisines are required.').isString(),
            body('city_id', 'City is required.').isString(),

        ];
    }

    static nearby() {
        return [
            query('lat', 'Latitude is required.').isNumeric(),
            query('lng', 'Longitude is required.').isNumeric(),
            query('radius', 'Radius is required.').isNumeric()
        ];
    }

    static search() {
        return [
            query('lat', 'Latitude is required.').isNumeric(),
            query('lng', 'Longitude is required.').isNumeric(),
            query('radius', 'Radius is required.').isNumeric(),
            query('name', 'Name is required.').isString()
        ];
    }
}