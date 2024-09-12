import City from "../models/City";

export class CityController {
    
    static async addCity(req, res, next) {

        const name = req.body.name
        const status = req.body.status
        const lng = req.body.lng
        const lat = req.body.lat
        
        try {
            const data = {
                name, status, lng, lat
            }
            const city = await new City(data).save();
            res.send(city);
        } catch (e) {
            next(e);
        }
    }

    static async getCities(req, res, next) {
        try {
            const cities = await City.find({status: 'active'});
            res.send(cities);
        } catch (e) {
            next(e);
        }
    }
}