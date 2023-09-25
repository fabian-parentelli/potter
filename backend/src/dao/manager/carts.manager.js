import { cartModel } from '../models/carts.model.js';

export default class Cart {

    constructor() { };

    newCart = async (cart) => {
        return await cartModel.create(cart);
    };

    getById = async (id) => {
        return await cartModel.findById(id);
    };

    addToCart = async (id, cart) => {
        return await cartModel.updateOne({ _id: id }, { $set: { products: cart.products } });
    };
};