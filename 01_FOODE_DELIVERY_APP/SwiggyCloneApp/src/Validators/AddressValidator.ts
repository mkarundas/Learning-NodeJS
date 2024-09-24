import { body } from "express-validator";

export class AddressValidator {

    static addAddress()  {
        return [
            body('title', 'Title is required.').isString(),
            body('address', 'Address is required.').isString(),
            body('landmark', 'Landmark is required.').isString(),
            body('house', 'House is required.').isString(),
            body('lat', 'Lat is required.').isNumeric(),
            body('lng', 'Lng is required.').isNumeric(),
        ];
    }

    static editAddress()  {
        return [
            body('title', 'Title is required.').isString(),
            body('address', 'Address is required.').isString(),
            body('landmark', 'Landmark is required.').isString(),
            body('house', 'House is required.').isString(),
            body('lat', 'Lat is required.').isNumeric(),
            body('lng', 'Lng is required.').isNumeric(),
        ];
    }
}