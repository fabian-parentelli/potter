import { bottleModel } from '../models/bottle.model.js';

export default class Bottles {

    constructor() { };

    addRemove = async (bottle) => {
        return await bottleModel.create(bottle);
    };

    getByAdmin = async (admin) => {
        return await bottleModel.findOne({ admin: admin }).lean();
    };

    getAll = async () => {
        return await bottleModel.find().lean();
    };

    update = async (bottle) => {
        return await bottleModel.findOneAndUpdate(
            { admin: bottle.admin },
            { products: bottle.products },
        );
    };

    updateCredit = async (bottle) => {
        return await bottleModel.findOneAndUpdate(
            { admin: bottle.admin },
            { credit: bottle.credit },
        );
    };

    updateByAdmin = async (bottle) => {
        return await bottleModel.findOneAndUpdate(
            { admin: bottle.admin },
            { products: bottle.products },
            { credit: bottle.credit }
        );
    };
};