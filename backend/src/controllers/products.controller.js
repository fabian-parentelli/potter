import * as productsService from '../services/products.service.js';
import { ProductNotFound } from "../utils/custom-exceptions.js";

const save = async (req, res) => {
    const product = req.body;
    const imgName = req.file.originalname;
    const imgUrl = req.cloudinaryUrl;
    try {
        const result = await productsService.save(product, imgName, imgUrl);
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof ProductNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const getAll = async (req, res) => {
    const { user } = req.user;
    try {
        const result = await productsService.getAll(user);
        if (result) return res.sendSuccess(result);
    } catch (error) {
        console.log(error);
        if (error instanceof ProductNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const getAllPublic = async (req, res) => {
    const user = { type: 'public' };
    try {
        const result = await productsService.getAll(user);
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof ProductNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const getByName = async (req, res) => {
    const { name } = req.params;
    try {
        const result = await productsService.getByName(name);
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof ProductNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const getById = async (req, res) => {
    const { pid } = req.params;
    try {
        const result = await productsService.getById(pid);
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof ProductNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const update = async (req, res) => {
    const product = req.body;
    let imgName = null;
    let imgUrl;
    if (req.file) {
        imgName = req.file.originalname;
        imgUrl = req.cloudinaryUrl
    };
    try {
        const result = await productsService.update(product, imgName, imgUrl);
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof ProductNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

export { save, getAll, getAllPublic, getByName, update, getById };