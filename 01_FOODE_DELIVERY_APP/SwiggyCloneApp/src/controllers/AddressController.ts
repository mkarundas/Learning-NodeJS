import Address from "../models/Address";

export class AddressController {

    static async addAddress(req, res, next) {

        const user_id = req.user.aud;
        const body = req.body;
        try {
            const addressData = {
                user_id,
                title: body.title,
                address: body.address,
                landmark: body.landmark,
                house: body.house,
                lat: body.lat,
                lng: body.lng,
            }
            const address = await new Address(addressData).save();
            res.send(address);
        } catch (e) {
            next(e);
        }
        
    }

    static async getAddresses(req, res, next) {
        const user_id = req.user.aud;
        try {
            const addresses = await Address.find({user_id});
            res.send(addresses);
        } catch (e) {
            next(e);
        }
    }

    static async deleteAddress(req, res, next) {
        const user_id = req.user.aud;
        const id = req.params.id;
        try {
            const addresses = await Address.findOneAndDelete({
                user_id,
                _id: id
            });
            res.json({
                success: true
            });
        } catch (e) {
            next(e);
        }
    }

    static async getAddressesById(req, res, next) {
        const user_id = req.user.aud;
        const id = req.params.id;
        try {
            const address = await Address.findOne({
                user_id,
                _id: id
            });
            res.send(address);
        } catch (e) {
            next(e);
        }
    }

    static async editAddress(req, res, next) {
        const user_id = req.user.aud;
        const id = req.params.id;
        const body = req.body;
        try {
            const address = await Address.findOneAndUpdate({
                user_id,
                _id: id
            }, {
                title: body.title,
                address: body.address,
                landmark: body.landmark,
                house: body.house,
                lat: body.lat,
                lng: body.lng,
                updated_at: new Date()
            }, {
                new: true
            });
            if(address) {
                res.send(address);
            } else {
                throw new Error('Address does not exist.');
            }
            
        } catch (e) {
            next(e);
        }
    }
    
}