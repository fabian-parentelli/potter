import { productRepository } from "../repositories/index.repositories.js";
import { ProductNotFound } from "../utils/custom-exceptions.js";
import { getPublicId, deleteImg } from '../config/cloudinary.config.js';

const save = async (product, imgName, imgUrl) => {

    const beer = await productRepository.getByName(product.name);
    if (beer) {
        const publicID = getPublicId(imgUrl);
        await deleteImg(publicID);
        throw new ProductNotFound('El producto ya existe');
    };

    product.imgName = imgName;
    product.imgUrl = imgUrl;
    const result = await productRepository.save(product);
    if (!result) throw new ProductNotFound('El producto no se pudo agregar');
    return result;
};

const getAll = async (user) => {
    const products = await productRepository.getAll();
    if (!products) throw new ProductNotFound('No se pueden obtener los productos');

    let productsArray;

    if (user) {
        switch (user.type) {
            case 'small':
                productsArray = products.map(prod => {
                    return (({ cost, bothPrice, bigPrice, ...rest }) => rest)(prod);
                });
                break;
            case 'big':
                productsArray = products.map(prod => {
                    return (({ cost, bothPrice, smallPrice, ...rest }) => rest)(prod);
                });
                break;
            case 'public':
                productsArray = products.map(prod => {
                    return (({ cost, bothPrice, smallPrice, bigPrice, ...rest }) => rest)(prod);
                });
                break;
            default:
            return products;
        };
    };
    return productsArray || products;
};

const getByName = async (name) => {
    const product = await productRepository.getByName(name);
    if (product === null) throw new ProductNotFound('No se encuentra este producto');
    return product;
};

const getById = async (id) => {
    const product = await productRepository.getById(id);
    if (product === null) throw new ProductNotFound('No se encuentra este producto');
    return product;
};

const update = async (product, imgName, imgUrl) => {

    const productBd = await productRepository.getByName(product.name);
    if (productBd === null) throw new ProductNotFound('No se encuentra este producto');

    const newObj = { ...productBd, ...product };
    if (imgName) newObj.imgName = imgName;
    if (imgUrl) newObj.imgUrl = imgUrl;

    const result = await productRepository.update(productBd._id, newObj);
    if (!result) throw new ProductNotFound('No se puede guaradar ');

    return { status: 'success', newObj };
};

export { save, getAll, getByName, update, getById };