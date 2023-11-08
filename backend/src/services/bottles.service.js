import { BottlesNotFound } from "../utils/custom-exceptions.js";
import { bottlesRepository } from '../repositories/index.repositories.js';

const addRemove = async (bottles, user) => {

    const bottleBD = await getByAdmin(bottles.admin);
    if (!bottleBD) {
        const newBottle = { admin: bottles.admin, products: [] };
        newBottle.products.push({ product: bottles.type, quantity: bottles.quantity });
        const result = await bottlesRepository.addRemove(newBottle);
        return { status: 'success', result };
    };
    const exist = bottleBD.products.find((prod) => prod.product === bottles.type);

    if (bottles.addRemove === 'add') {
        if (!exist) {
            bottleBD.products.push({ product: bottles.type, quantity: bottles.quantity });
            const result = await bottlesRepository.update(bottleBD);
            return { status: 'success', result };
        };
        bottleBD.products.forEach(async (prod) => {
            if (exist.product === prod.product) {
                if (bottleBD.credit) {
                    bottleBD.credit.forEach((cred) => {
                        if (cred.product === prod.product) {
                            if (bottles.quantity >= cred.quantity) {
                                cred.quantity = 0;
                                prod.quantity = +prod.quantity + +bottles.quantity;
                            };
                            if (bottles.quantity < cred.quantity) {
                                cred.quantity = +bottles.quantity - +cred.quantity;
                            };
                        };
                    });
                    await bottlesRepository.updateCredit(bottleBD);
                    await bottlesRepository.update(bottleBD);
                    return { status: 'success', bottleBD };
                };
                prod.quantity = +prod.quantity + +bottles.quantity;
                await bottlesRepository.update(bottleBD);
            };
        });
        return { status: 'success', bottleBD };
    };
    if (bottles.addRemove !== 'add') {
        if (!exist) throw new BottlesNotFound('No se puede crear un producto en negativo');

        bottleBD.products.forEach(async (prod) => {
            if (exist.product === prod.product) {
                if (+bottles.quantity < +prod.quantity) {
                    prod.quantity = +prod.quantity - +bottles.quantity;
                    await bottlesRepository.update(bottleBD);
                    return { status: 'success' };
                };
                if (+bottles.quantity > +prod.quantity) {
                    const dif = +bottles.quantity - +prod.quantity;
                    prod.quantity = 0
                    await bottlesRepository.update(bottleBD);

                    if (!bottleBD.credit) {
                        bottleBD.credit = {
                            product: exist.product,
                            quantity: dif
                        };
                    } else {
                        bottleBD.credit.forEach((cred) => {
                            if (exist.product === cred.product) {
                                cred.quantity = +cred.quantity + +bottles.quantity;
                            };
                        });
                    };
                    await bottlesRepository.updateCredit(bottleBD);
                };
            };
        });
        return { status: 'success', bottleBD };
    };
};

const getByAdmin = async (admin) => {
    const bottlesDB = bottlesRepository.getByAdmin(admin);
    if (!bottlesDB) throw new BottlesNotFound('Productos no encontrados');
    return bottlesDB;
};

const getAll = async () => {
    const bottles = await bottlesRepository.getAll();
    return { status: 'success', bottles };
};

const updateByAdmin = async (admin, body) => {

    const obj = {
        admin,
        products: body.products.map((prod) => {
            const product = {};
            for (const key in prod) {
                if (key.startsWith('prodProduct')) product.product = prod[key];
                if (key.startsWith('prodQuantity')) product.quantity = prod[key];
            };
            return product;
        }),
        credit: body.credit ? body.credit.map((cred) => {
            const credit = {};
            for (const key in cred) {
                if (key.startsWith('credProduct')) credit.product = cred[key];
                if (key.startsWith('credQuantity')) credit.quantity = cred[key];
            };
            return credit;
        }) : null
    };
    const result = await bottlesRepository.updateByAdmin(obj);
    if (!result) throw new BottlesNotFound('No se puede modificar el producto');
    return { status: 'success' };
};

export { addRemove, getByAdmin, getAll, updateByAdmin };