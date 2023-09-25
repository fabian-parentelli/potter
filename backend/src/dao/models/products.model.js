import mongoose from "mongoose";

const productCollection = 'products';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    size: { type: Number },
    cost: { type: Number },
    bothPrice: { type: Number },
    bigPrice: { type: Number },
    smallPrice: { type: Number },
    imgName: { type: String },
    imgUrl: { type: String },
    stock: { type: Number, default: 0 },
    asset: { type: Boolean, default: true }
});

export const productModel = mongoose.model(productCollection, productSchema);