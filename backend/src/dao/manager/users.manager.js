import { userModel } from '../models/users.model.js';

export default class User {

    getByEmail = async (email) => {
        return await userModel.findOne({ email }).lean();
    };

    save = async (user) => {
        return await userModel.create(user);
    };

    updateIdPass = async (id, passId) => {
        return await userModel.findByIdAndUpdate(id, { $set: { passId } }, { upsert: true, new: true });
    };

    getByIdPass = async (id) => {
        return await userModel.findOne({ passId: id });
    };

    updatePass = async (id, upd) => {
        await userModel.findByIdAndUpdate(id, { $unset: { passId: 1 } });
        return await userModel.findByIdAndUpdate(id, { $set: { password: upd } });
    };
};
