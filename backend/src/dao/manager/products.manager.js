import { productModel } from '../models/products.model.js';

export default class Product {

    getByName = async (name) => {
        return await productModel.findOne({ name }).lean();
    };

    getById = async (id) => {
        return await productModel.findOne({ _id: id }).lean();
    }

    save = async (product) => {
        return await productModel.create(product);
    };

    getall = async () => {
        return await productModel.find().lean();
    };

    update = async (id, product) => {
        return await productModel.findByIdAndUpdate(id, product)
    };
};
