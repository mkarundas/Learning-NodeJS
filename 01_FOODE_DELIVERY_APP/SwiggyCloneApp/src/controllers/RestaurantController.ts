import City from "../models/City";
import Restaurant from "../models/Restaurant";

export class RestaurantController {
    
    static async addRestaurant(req, res, next) {

        const name = req.body.name
        const status = req.body.status
        const lng = req.body.lng
        const lat = req.body.lat
        
        try {
            const data = {
                name, status, lng, lat
            }
            const restaurant = await new Restaurant(data).save();
            res.send(restaurant);
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