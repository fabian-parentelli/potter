import { CartNotFound } from "../utils/custom-exceptions.js";
import { cartRepository, customerRepository, productRepository } from "../repositories/index.repositories.js";
import { sellInventory } from "./inventory.service.js";

const newCart = async () => {
    const cart = await cartRepository.newCart({ product: [] });
    if (!cart) throw new CartNotFound('Cart not found');
    return { status: 'success', cart };
};

const getById = async (id) => {
    const cart = await cartRepository.getById(id);
    if (!cart) throw new CartNotFound('Cart not found');
    return { status: 'success', cart };
};

const addToCart = async (cust) => {
    const customer = await customerRepository.getById(cust.uid);
    if (!customer) throw new CartNotFound('El cliente no es encontrado');
    const product = await productRepository.getById(cust.pid);
    if (!product) throw new CartNotFound('El producto no es encontrado');
    const cart = await getById(cust.cart);
    if (!cart) throw new CartNotFound('El carrito no es encontrado');

    const exist = cart.cart.products.findIndex(prod => prod.product._id.toString() === cust.pid.toString());

    if (exist !== -1) {
        cart.cart.products[exist].quantity += +cust.quantity;
    } else {
        cart.cart.products.push({ product: product._id, quantity: +cust.quantity });
    };

    const result = await cartRepository.addToCart(cust.cart, cart.cart);
    if (!result) throw new CartNotFound('No se pudo agregar el producto al carrito');

    if (!customer.cart || customer.cart !== cust.cart) {
        customer.cart = cust.cart;
        await customerRepository.update(customer);
    };
    return result;
};

const getTotal = async (cid, uid) => {

    const cart = await getById(cid);
    if (!cart) throw new CartNotFound('El carrito no es encontrado');

    const quantity = cart.cart.products.reduce((acc, prod) => acc + prod.quantity, 0);

    let result = 0;

    for (const prod of cart.cart.products) {
        const product = await productRepository.getById(prod.product);

        if (uid === 'big') {
            result += prod.quantity * product.bigPrice;
        } else if (uid === 'small') {
            result += prod.quantity * product.smallPrice;
        } else {
            result += prod.quantity * product.bothPrice;
        };
    };

    return { result, quantity };
};

const purchase = async (sale, user) => {

    const data = await getById(sale.cart);
    if (!data) throw new CartNotFound('El carrito no se encuentra');
    const products = await productRepository.getAll();
    if (!products || !products.length) throw new CartNotFound('No hay productos disponibles');
    const customer = await customerRepository.getById(sale.user);
    if (!customer) throw new CartNotFound('El cliente no se encuentra');

    let amount = 0;
    let inventory = [];

    for (const cartProd of data.cart.products) {
        const prodProduct = products.find(prod => cartProd.product.toString() === prod._id.toString());

        if (!prodProduct) {
            console.log('Producto no encontrado:', cartProd.product);
            continue;
        };

        if (prodProduct.stock < cartProd.quantity) {
            console.log('Producto sin stock:', prodProduct);
            continue;
        };

        let price;

        if (customer.type === 'big') {
            price = prodProduct.bigPrice;
        } else if (customer.type === 'small') {
            price = prodProduct.smallPrice;
        } else {
            price = prodProduct.bothPrice;
        };

        amount += price * cartProd.quantity;
        prodProduct.stock -= cartProd.quantity;
        await productRepository.update(prodProduct._id, prodProduct);
        inventory.push(cartProd);
    };

    await sellInventory(inventory, user, customer._id);
};


export { newCart, getById, addToCart, getTotal, purchase };