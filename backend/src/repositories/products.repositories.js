import { productManager } from '../dao/manager/index.manager.js';

export default class ProductRepository {

    getByName = async (name) => {
        const result = await productManager.getByName(name);
        return result;
    };

    getById = async (id) => {
        const result = await productManager.getById(id);
        return result;
    }

    save = async (product) => {
        const result = await productManager.save(product);
        return result;
    };

    getAll = async () => {
        const result = await productManager.getall();
        return result;
    };

    update = async (id, product) => {
        const result = await productManager.update(id, product);
        return result;
    };
};