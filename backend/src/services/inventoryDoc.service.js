import { inventoryDocRepository } from "../repositories/index.repositories.js";
import { InventoryDocNotFound } from '../utils/custom-exceptions.js';
import moment from 'moment';

const newDoc = async (doc) => {
    doc.date = new Date().toLocaleString();
    await inventoryDocRepository.newDoc(doc);
};

const getInventory = async () => {
    const inventory = await inventoryDocRepository.getInventory();
    if (!inventory) throw new InventoryDocNotFound('Inventario no encontrado');

    inventory.forEach((inv) => {
        inv.docs.sort((a, b) => moment(b.date, 'D/M/YYYY, HH:mm:ss').diff(moment(a.date, 'D/M/YYYY, HH:mm:ss')));
    });
    
    return inventory;
};


export { newDoc, getInventory };