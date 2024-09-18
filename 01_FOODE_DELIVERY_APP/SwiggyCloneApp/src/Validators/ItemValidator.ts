import { body } from "express-validator";
import Restaurant from "../models/Restaurant";
import Category from "../models/Category";


export class ItemValidator {

    static addItem()  {
        return [
            body('item_image', 'Item image is required.').custom((item_image, {req})=> {
                console.log("T  ", req.file);
               if(req.file) {
                return true;
               } else {
                throw new Error('File not uploaded.');
               }
            }),
            body('name', 'Item name is required.').isString(),
            body('restaurant_id', 'Restaurant id is required.').isString().custom((restaurant_id)=> {
                return Restaurant.findById(restaurant_id).then(restaurant=> {
                    if(restaurant) {
                        return true;
                    } else {
                        throw new Error('Unknown restaurant.');
                    }
                })
                .catch(e => {
                    throw new Error(e);
                });;
            }),
            body('category_id', 'Category id is required.').isString().custom((category_id, {req})=> {
                return Category.findOne({
                    _id: category_id,
                    restaurant_id: req.body.restaurant_id
                }).then(category=> {
                    if(category) {
                        return true;
                    } else {
                        throw new Error('Unknown Category.');
                    }
                })
                .catch(e => {
                    throw new Error(e);
                });;
            }),
            body('status', 'Status is required.').isBoolean(),
            body('price', 'Price is required.').isNumeric(),
            body('veg', 'Veg status is required.').isBoolean(),
        ];
    }
}