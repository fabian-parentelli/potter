import { inventoryManager } from "../dao/manager/index.manager.js";

export default class InventoryRepository {

    getAdmin = async (admin) => {
        const result = await inventoryManager.getAdmin(admin);
        return result;
    };

    createInventary = async (product) => {
        await inventoryManager.createInventary(product.toString());
    };

    updateInventari = async (admin) => {
        await inventoryManager.updateInventari(admin);
    };

    newInventory = async (prod) => {
        const result = await inventoryManager.newInventory(prod);
        return result;
    };

    exisistProduct = async (id) => {
        const result = await inventoryManager.exisistProduct(id);
        return result;
    };

    getInventory = async () => {
        const result = await inventoryManager.getInventory();
        return result;
    };

    updateTranfer = async (admin, product) => {
        const result = await inventoryManager.updateTranfer(admin, product);
    };
};