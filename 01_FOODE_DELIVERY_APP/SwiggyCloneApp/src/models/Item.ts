import * as mongoose from 'mongoose';
import { model } from 'mongoose';

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    restaurant_id: { type: mongoose.Types.ObjectId, ref: 'restaurants', required: true },
    category_id: { type: mongoose.Types.ObjectId, ref: 'categories', required: true },
    description: { type: String},
    cover: { type: String, required: true },
    price: { type: Number, required: true },
    veg: { type: Boolean, required: true },
    status: { type: Boolean, required: true },
    created_at: { type: Date, required: true, default: new Date()},
    updated_at: { type: Date, required: true, default: new Date()}
});

export default model('items', itemSchema);