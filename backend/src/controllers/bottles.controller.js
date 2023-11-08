import * as bottlesService from '../services/bottles.service.js';
import { BottlesNotFound } from '../utils/custom-exceptions.js';

const addRemove = async (req, res) => {
    const bottles = req.body;
    const { user } = req.user;
    try {
        const result = await bottlesService.addRemove(bottles, user);
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof BottlesNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const getAll = async (req, res) => {
    try {
        const result = await bottlesService.getAll();
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof BottlesNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const getByAdmin = async (req, res) => {
    const { admin } = req.params;
    try {
        const result = await bottlesService.getByAdmin(admin);
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof BottlesNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const updateByAdmin = async (req, res) => {
    const { admin } = req.params;
    try {
        const result = await bottlesService.updateByAdmin(admin, req.body);
        if (result) return res.sendSuccess(result);
    } catch (error) {


        console.log(error); //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

        if (error instanceof BottlesNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
}

export { addRemove, getAll, getByAdmin, updateByAdmin };