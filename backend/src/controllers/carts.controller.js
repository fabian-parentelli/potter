import * as cartsService from '../services/carts.service.js';
import { CartNotFound } from '../utils/custom-exceptions.js';

const newCart = async (req, res) => {
    try {
        const result = await cartsService.newCart();
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof CartNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const getById = async (req, res) => {
    const { cid } = req.params;
    try {
        const result = await cartsService.getById(cid);
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof CartNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const addToCart = async (req, res) => {
    const customer = req.body;
    try {
        const result = await cartsService.addToCart(customer);
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof CartNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const getTotal = async (req, res) => {
    const { cid , uid } = req.params;
    try {
        const result = await cartsService.getTotal(cid, uid);
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof CartNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
}

const purchase = async (req, res) => {
    const sale = req.body;
    const { user } = req.user;
    try {
        const result = await cartsService.purchase(sale, user);
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof CartNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

export { newCart, getById, addToCart, getTotal, purchase };