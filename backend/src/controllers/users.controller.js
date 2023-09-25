import * as userService from '../services/users.service.js';
import { UserNotFound } from '../utils/custom-exceptions.js';

const registerUser = async (req, res) => {
    try {
        const result = await userService.save({ ...req.body });
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof UserNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const loginUser = async (req, res) => {
    try {
        const result = await userService.loginUser({ ...req.body });
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof UserNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const current = async (req, res) => {
    const { user } = req.user;
    try {
        res.sendSuccess(user);
    } catch (error) {
        res.sendServerError(error.message);
    };
};

const recoverPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const result = await userService.recoverPassword(email);
        res.sendSuccess(result);
    } catch (error) {
        if (error instanceof UserNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const inetr_pass = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await userService.inetr_pass(id);
        res.redirect(result);
    } catch (error) {
        if (error instanceof UserNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const newPassword = async (req, res) => {
    const { user } = req.user;
    const { password } = req.body;
    try {
        const result = await userService.newPassword(user, password);
        res.sendSuccess(result);
    } catch (error) {
        if (error instanceof UserNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

export { registerUser, loginUser, current, recoverPassword, inetr_pass, newPassword };