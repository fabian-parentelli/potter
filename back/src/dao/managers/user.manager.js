import { userModel } from "../models/user.model.js";

export default class UserManager {

    register = async (userInfo) => {
        try {
            const result = await userModel.create(userInfo);
            return result;
        } catch (error) {
            return { error: error.message };
        };
    };

    login = async (phone, password) => {
        try {
            const user = await this.getUser(phone);
            if(!user) return res.status(400).send({status: 'error', error: 'Incorrect credentials'});
            if (user?.error) throw new Error(`Wrong user or password`);
            if (user.password !== password) throw new Error(`Wrong user or password`);
            delete user.password;
            return {status: 'success', payload: user};
        } catch (error) {
            return { error: error.message };
        };
    };

    getUser = async (phone) => {
        try {
            const user = userModel.findOne({ phone });
            if (!user) throw new Error(`User not exist`);
            return user;
        } catch (error) {
            return { error: error.message };
        };
    };
};