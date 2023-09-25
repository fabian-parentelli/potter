import User from './users.manager.js';
import Product from './products.manager.js';
import Customer from './customers.manager.js';
import Cart from './carts.manager.js';

export const userManager = new User();
export const productManager = new Product()
export const customerManager = new Customer();
export const cartManager = new Cart();