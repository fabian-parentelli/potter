import { inventoryDocModel } from "../models/inventoryDoc.model.js";

export default class InventoryDoc {

    constructor() { };

    newDoc = async (doc) => {
        return await inventoryDocModel.create(doc);
    };

    getInventory = async () => {
        const aggregationPipeline = [
            { $sort: { date: -1 } },
            { $group: { _id: '$user', docs: { $push: '$$ROOT' } } },
            { $project: { _id: 1, docs: { $slice: ['$docs', 5] } } }
        ];
        const results = await inventoryDocModel.aggregate(aggregationPipeline);
        return results;
    };
};