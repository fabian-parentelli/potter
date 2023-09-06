import { userManager } from '../dao/manager/index.manager.js';

export default class UserRepository {

    save = async (user) => {
        const result = await userManager.save(user);
        return result;
    };

    getByEmail = async (email) => {
        const result = await userManager.getByEmail(email);
        return result;
    };

    updateIdPass = async (id, passId) => {
        const result = await userManager.updateIdPass(id, passId);
        return result
    };

    getByIdPass = async (id) => {
        const result = await userManager.getByIdPass(id);
        return result;
    };

    update = async (id, upd) => {
        const result = await userManager.updatePass(id, upd);
        return result;
    };
};