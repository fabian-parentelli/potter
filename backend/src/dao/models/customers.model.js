import mongoose from "mongoose";

const customerCollection = 'customers';

const customerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String },
    phone: { type: String },
    email: { type: String },
    type: { type: String },
    customerOf: { type: String },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carts'
    },
    last_shop: { type: String }
});

export const customerModel = mongoose.model(customerCollection, customerSchema);