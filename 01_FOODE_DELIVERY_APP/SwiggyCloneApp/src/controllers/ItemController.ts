import Item from "../models/Item";

export class ItemController {

    static async addItem(req, res, next) {
        const data = req.body;
        const path = req.file.path;
        try {
           let item_data: any = {
                name: data.name,
                restaurant_id: data.restaurant_id,
                category_id: data.category_id,
                cover: path,
                price: parseInt(data.price),
                veg: data.veg,
                status: data.status,
            }
            if(data.description) {
                item_data = {...item_data, description: data.description}
            }
            const item_doc = await new Item(item_data).save();
            res.send(item_doc);
        } catch (e) {
            next(e);
        }
    }

    static async getItems(req, res, next) {
        console.log("Hellooooo");
        const restaurant = req.restaurant;
        console.log("restaurant  ", restaurant);
        try {
            const items = await Item.find({restaurant_id: restaurant._id}, {__v: 0});
            res.send(items);
        } catch (e) {
            next(e);
        }
    }
}