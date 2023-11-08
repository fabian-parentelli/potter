import { inventoryModel } from "../models/inventory.model.js";

export default class Inventory {

    constructor() { };

    getAdmin = async (admin) => {
        return await inventoryModel.findOne({ admin: admin }).lean();
    };

    createInventary = async (product) => {
        await inventoryModel.create({ products: [{ product: product }] });
    };

    updateInventari = async (admin) => {
        await inventoryModel.findByIdAndUpdate(admin._id, admin);
    };

    newInventory = async (prod) => {
        return await inventoryModel.findOneAndUpdate(
            { 'products.product': prod.product },
            { $set: { 'products.$.quantity': prod.quantity } },
            { new: true }
        ).lean();
    };

    exisistProduct = async (id) => {
        return await inventoryModel.findOne({ _id: '65199ae82e5c168862bcdee8' }, { products: { $elemMatch: { product: id } } });
    };

    getInventory = async () => {
        return await inventoryModel.find().lean();
    };

    updateTranfer = async (admin, product) => {
        return await inventoryModel.findOneAndUpdate(
            { admin: admin, 'products.product': product.product },
            { $set: { 'products.$.quantity': product.quantity } }
        );
    };
};