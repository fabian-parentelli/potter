import * as inventoryDocService from '../services/inventoryDoc.service.js';
import { InventoryDocNotFound } from '../utils/custom-exceptions.js';

const getInventory = async (req, res) => {
    try {
        const result = await inventoryDocService.getInventory();
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof InventoryDocNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

export { getInventory };