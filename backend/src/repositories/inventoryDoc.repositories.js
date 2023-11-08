import { inventoryDocManager } from "../dao/manager/index.manager.js";

export default class InventoryDocRepository {

    newDoc = async (doc) => {
        const result = await inventoryDocManager.newDoc(doc);
        return result;
    };

    getInventory = async () => {
        const result = await inventoryDocManager.getInventory();
        return result;
    }
};