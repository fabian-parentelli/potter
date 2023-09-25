import { customerModel } from '../models/customers.model.js';

export default class Customer {

    getByPhone = async (phone) => {
        return await customerModel.findOne({ phone }).lean();
    };

    save = async (customer) => {
        return await customerModel.create(customer);
    };

    get = async (query) => {
        return await customerModel.find(query).lean();
    };

    getById = async (id) => {
        return await customerModel.findById(id).lean();
    };

    getByName = async (name) => {
        return await customerModel.findOne({ name: name }).lean();
    };

    getByCart = async (cart) => {
        return await customerModel.findOne({ cart: cart }).lean();
    }

    update = async (customer) => {
        return await customerModel.findByIdAndUpdate(customer._id, customer);
    };
};