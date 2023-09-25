import { CartNotFound } from "../utils/custom-exceptions.js";
import { cartRepository, customerRepository, productRepository } from "../repositories/index.repositories.js";

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

    console.log(customer);
    const result = await cartRepository.addToCart(cust.cart, cart.cart);
    if (!result) throw new CartNotFound('No se pudo agregar el producto al carrito');

    if (!customer.cart || customer.cart !== cust.cart) {
        customer.cart = cust.cart;
        await customerRepository.update(customer);
        console.log(customer);
    };
    return result;
};

export { newCart, getById, addToCart };