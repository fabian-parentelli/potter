import { bottlesManager } from '../dao/manager/index.manager.js';

export default class BottlesRepository {

    addRemove = async (bottles) => {
        const result = await bottlesManager.addRemove(bottles);
        return result;
    };

    getByAdmin = async (admin) => {
        const result = await bottlesManager.getByAdmin(admin);
        return result;
    };

    getAll = async () => {
        const result = await bottlesManager.getAll();
        return result;
    };

    update = async (bottle) => {
        const result = await bottlesManager.update(bottle);
        return result;
    };
    
    updateCredit = async (bottle) => {
        const result = await bottlesManager.updateCredit(bottle);
        return result;
    };

    updateByAdmin = async (bottles) => {
        const result = await bottlesManager.updateByAdmin(bottles);
        return result;
    };
};