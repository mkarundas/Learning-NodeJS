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
            const response_address = {
                title: address.title,
                address: address.address,
                landmark: address.landmark,
                house: address.house,
                lat: address.lat,
                lng: address.lng,
                created_at: address.created_at,
                updated_at: address.updated_at,
            }
            res.send(response_address);
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
            }, {
                projection: {user_id: 0, __v:0}
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
                new: true,
                projection: {user_id: 0, __v:0}
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