import { InventoryNotFound } from "../utils/custom-exceptions.js";
import { inventoryRepository, productRepository } from '../repositories/index.repositories.js'
import * as inventoryDocService from './inventoryDoc.service.js';
import { inventoryEnum } from '../config/enums.config.js';
import { getByName } from './products.service.js';

const createInventary = async (product) => {
    const admin = await inventoryRepository.getAdmin('treasure');
    if (!admin) {
        await inventoryRepository.createInventary(product);
    } else {
        admin.products.push({ product: product, quantity: 0 });
        await inventoryRepository.updateInventari(admin);
    };
};

const newInventory = async (inv, user) => {
    const { productInv: name, quantity } = inv;

    const product = await productRepository.getByName(name);
    if (!product) throw new CartNotFound('El producto no es encontrado');

    const newStock = product.stock + +quantity;
    product.stock = newStock;
    await productRepository.update(product._id, product);

    const exists = await inventoryRepository.exisistProduct(product._id);
    if (!exists) throw new InventoryNotFound('No se encuentra el producto en el inventario');

    let ok
    const existingProduct = exists.products.find(prod => prod.product.toString() === product._id.toString());
    if (existingProduct) {
        existingProduct.quantity = existingProduct.quantity + +quantity;
        const inventory = await inventoryRepository.newInventory(existingProduct);
        if (!inventory) throw new InventoryNotFound('Inventario not found');
        ok = inventory;
    };

    const doc = {
        detail: inventoryEnum.NEWPRODUCTION,
        user: user._id,
        products: [{ product: product._id, quantity: quantity }]
    };
    await inventoryDocService.newDoc(doc);

    return { status: 'success', ok };
};

const sellInventory = async (product, user, customer) => {
    const admin = await inventoryRepository.getAdmin(user.name);
    const prodDoc = [];

    for (const prod of admin.products) {
        const exist = product.find((p) => p.product.toString() === prod.product.toString());
        if (exist) {
            prod.quantity -= exist.quantity;
            await inventoryRepository.updateInventari(admin);
            prodDoc.push(exist);
        };
    };
    const doc = {
        detail: inventoryEnum.SALE,
        user: user._id,
        products: prodDoc,
        customer
    };
    await inventoryDocService.newDoc(doc);
};

const getInventory = async () => {
    const result = await inventoryRepository.getInventory();
    if (!result) throw new InventoryNotFound('Invantarios no encontrados');
    return { status: 'success', result };
};

const getInvByName = async (name) => {
    const inventory = await inventoryRepository.getAdmin(name);
    if (!inventory) throw new InventoryNotFound('Invantario no encontrado');
    return inventory;
};

const transferInventory = async (modify, user) => {
    const productDB = await getByName(modify.productInv);
    const tesoro = modify.operation.split(' - ');

    for (let i = 0; i < tesoro.length; i++) {
        if (tesoro[i] === 'tesoro') {
            tesoro[i] = await inventoryRepository.getAdmin('treasure');
        } else {
            tesoro[i] = await inventoryRepository.getAdmin(tesoro[i]);
        };
    };
    const resultA = tesoro[0].products.find((prod) => { return prod.product.toString() === productDB._id.toString() });
    const resultB = tesoro[1].products.find((prod) => { return prod.product.toString() === productDB._id.toString() });
    if (+modify.quantity > resultA.quantity) throw new InventoryNotFound(`No hay suficiente stock en el invenbtario de ${tesoro[0].admin}`);

    resultA.quantity = resultA.quantity - +modify.quantity;
    resultB.quantity = resultB.quantity + +modify.quantity;

    const updateA = await inventoryRepository.updateTranfer(tesoro[0].admin, resultA);
    const updateB = await inventoryRepository.updateTranfer(tesoro[1].admin, resultB);

    const doc = {
        detail: inventoryEnum.TRANSFER,
        user: user._id,
        products: { product: resultA.product, quantity: modify.quantity },
        fromTo: modify.operation
    };
    await inventoryDocService.newDoc(doc);
    return { status: 'success', updateA, updateB };
};

const modifyInventory = async (user, products, admin) => {
    const adminDB = await inventoryRepository.getAdmin(admin);

    const resultArray = [];
    const discrepancia = [];
    for (const key in products) {
        if (products.hasOwnProperty(key)) {
            const newObj = {
                product: key,
                quantity: products[key]
            };
            resultArray.push(newObj);
        };
    };
    adminDB.products.forEach((prod) => {
        const exist = resultArray.find((arr) => arr.product === prod.product.toString());
        if(+prod.quantity != +exist.quantity) discrepancia.push(exist);
        if (exist) prod.quantity = exist.quantity;
    });
    const result = await inventoryRepository.updateInventari(adminDB);

    const doc = {
        detail: inventoryEnum.MODIFY,
        user: user._id,
        products: discrepancia,
        reason: admin
    };
    console.log(doc);
    await inventoryDocService.newDoc(doc);
    return { status: 'success', result };
};

export {
    newInventory, createInventary, sellInventory, getInventory, 
    transferInventory, getInvByName, modifyInventory
};