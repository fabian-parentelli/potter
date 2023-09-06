import { productmanager } from '../dao/manager/index.manager.js';

export default class ProductRepository {
    
    getByName = async (name) => {
        const result = await productmanager.getByName(name);
        return result;
    };

    save = async (product) => {
        const result = await productmanager.save(product);
        return result;
    };
};