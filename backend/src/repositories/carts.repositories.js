import { cartManager } from '../dao/manager/index.manager.js';

export default class CartRepository {

    newCart = async (cart) => {
        const result = await cartManager.newCart(cart);
        return result;
    };

    getById = async (id) => {
        const result = await cartManager.getById(id);
        return result;
    };

    addToCart = async (id, cart) => {
        const result = await cartManager.addToCart(id, cart);
        return result;
    };

};