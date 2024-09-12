import * as mongoose from 'mongoose';
import { model } from 'mongoose';

const RestaurantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    user_id: { type: mongoose.Types.ObjectId, required: true },
    city_id: { type: mongoose.Types.ObjectId, required: true },
    short_name: { type: mongoose.Types.ObjectId, required: true },
    cover: { type: String },
    location: { type: Object, required: true },
    cuisines: { type: Array, required: true },
    open_time: { type: String, required: true },
    close_time: { type: String, required: true },
    description: { type: String},
    address: { type: String, required: true },
    status: { type: String, required: true },
    is_close: { type: Boolean, required: true, default: false },
    delivery_time: { type: Number, required: true },
    rating: { type: Number, required: true, default: 0 },
    total_rating: { type: Number, required: true, default: 0 },
    created_at: { type: Date, required: true, default: new Date()},
    updated_at: { type: Date, required: true, default: new Date()}
});

export default model('restaurants', RestaurantSchema);