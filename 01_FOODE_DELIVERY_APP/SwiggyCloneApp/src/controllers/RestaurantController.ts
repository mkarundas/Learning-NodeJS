import { Utils } from "../Utils/Utils";
import Category from "../models/Category";
import City from "../models/City";
import Restaurant from "../models/Restaurant";
import User from "../models/User";

export class RestaurantController {
    
    static async addRestaurant(req, res, next) {

        const restaurant = req.body;
        const path = req.file.path;
        const verification_token = Utils.generateverificationToken();

        try {
            const hash = await Utils.encryptPassword(restaurant.password);
            const data = {
                email: req.body.email,
                verification_token,
                verification_token_time: Date.now() + new Utils().MAX_TOKEN_TIME,
                password: hash,
                type: 'restaurant',
                status: 'active',
                phone: restaurant.phone,
            }

            const user = await new User(data).save();

            const categories_data = JSON.parse(restaurant.categories).map(x => {
                return ({name: x, user_id: user._id});
            });

            const categories = await Category.insertMany(categories_data);

            let restaurant_data: any = {
                name: restaurant.res_name,
                short_name: restaurant.short_name,
                location: JSON.parse(restaurant.location),
                address: restaurant.address,
                open_time: restaurant.open_time,
                close_time: restaurant.close_time,
                status: restaurant.status,
                cuisines: JSON.parse(restaurant.cuisines),
                price: parseInt(restaurant.price),
                delivery_time: parseInt(restaurant.delivery_time),
                city_id: restaurant.city_id,
                user: user._id,
                cover: path
            }

            if(restaurant.description) {
                restaurant_data = {...restaurant_data, description: restaurant.description}
            }
        } catch (e) {
            next(e);
        }
    }

    static async getRestaurants(req, res, next) {
        try {
            const cities = await Restaurant.find({status: 'active'});
            res.send(cities);
        } catch (e) {
            next(e);
        }
    }
}