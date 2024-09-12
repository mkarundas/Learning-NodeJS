import * as mongoose from 'mongoose';
import { model } from 'mongoose';

const citySchema = new mongoose.Schema({
    name: { type: String, required: true },
    status: { type: String, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    created_at: { type: Date, required: true, default: new Date()},
    updated_at: { type: Date, required: true, default: new Date()}
});

export default model('cities', citySchema);