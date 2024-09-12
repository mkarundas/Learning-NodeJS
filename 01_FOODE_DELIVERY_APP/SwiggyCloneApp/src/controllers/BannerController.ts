import Banner from "../models/Banner";

export class BannerController {

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
    }
}