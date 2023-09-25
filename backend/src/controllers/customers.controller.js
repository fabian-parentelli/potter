import * as customerService from '../services/customers.service.js';
import { CustomerNotFound } from '../utils/custom-exceptions.js';

const save = async (req, res) => {
    const customer = req.body;
    const { user } = req.user;
    try {
        const result = await customerService.save(customer, user);
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof CustomerNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const get = async (req, res) => {
    const { name, customerOf, type } = req.query;
    try {
        const result = await customerService.get(name, customerOf, type);
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof CustomerNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const getByName = async (req, res) => {
    const { name } = req.params;
    try {
        const result = await customerService.getByName(name.toLowerCase());
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof CustomerNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const getByCart = async (req, res) => {
    const { cid } = req.params;
    try {
        const result = await customerService.getByCart(cid);
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof CustomerNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const update = async (req, res) => {
    const customer = req.body;
    try {
        const result = await customerService.update(customer);
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof CustomerNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

export { save, get, getByName, update, getByCart };