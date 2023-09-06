import { productModel } from '../models/products.model.js';

export default class Product {

    getByName = async (name) => {
        return await productModel.findOne({ name });
    };

    save = async (product) => {
        return await productModel.create(product);
    };
};
