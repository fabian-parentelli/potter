import * as inventoryService from '../services/inventory.service.js';
import { InventoryNotFound } from '../utils/custom-exceptions.js';

const newInventory = async (req, res) => {
    const inv = req.body;
    const { user } = req.user;
    try {
        const result = await inventoryService.newInventory(inv, user);
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof InventoryNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const getInventory = async (req, res) => {
    try {
        const result = await inventoryService.getInventory();
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof InventoryNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const getInvByName = async (req, res) => {
    const { name } = req.params;
    try {
        const result = await inventoryService.getInvByName(name);
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof InventoryNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const transferInventory = async (req, res) => {
    const { user } = req.user;
    try {
        const result = await inventoryService.transferInventory(req.body, user);
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof InventoryNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const modifyInventory = async (req, res) => {
    const { user } = req.user;
    const products = req.body;
    const { name } = req.params;
    try {
        const result = await inventoryService.modifyInventory(user, products, name);
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof InventoryNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
}

export { newInventory, getInventory, transferInventory, getInvByName, modifyInventory };