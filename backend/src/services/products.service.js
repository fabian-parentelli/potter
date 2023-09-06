import { productRepository } from "../repositories/index.repositories.js";
import { ProductNotFound } from "../utils/custom-exceptions.js";

const save = async (product, imgName, imgUrl) => {

    const beer = await productRepository.getByName(product.name);
    if(beer) throw new ProductNotFound('El producto ya existe');

    product.imgName = imgName;
    product.imgUrl = imgUrl;
    const result = await productRepository.save(product);
    return result;
};

export { save };