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

export { save };