import Category from "../models/Category";

export class CategoryController {

    static async getCategoriesByRestaurant(req, res, next) {

        try {
            const restaurant = req.params.restaurantId;
            const categories = await Category.find({restaurant_id: restaurant});
            res.send(categories);
        }catch (e) {
            next(e);
        }
    }

    /*
    static async addBanner(req, res, next) {
        const path = req.file.path;
        try {
            const data = {
                banner: path
            }
            const banner = await new Banner(data).save();
            res.send(banner);
        } catch (e) {
            next(e);
        }
    }

    static async getBanners(req, res, next) {
        try {
            const banners = await Banner.find({status: true});
            res.send(banners);
        } catch (e) {
            next(e);
        }
    }*/
}