import UserRepository from '../repositories/users.repositories.js';
import ProductRepository from '../repositories/products.repositories.js';
import CustomerRepository from '../repositories/customers.repositories.js';
import CartRepository from '../repositories/carts.repositories.js'

export const userRepository = new UserRepository();
export const productRepository = new ProductRepository();
export const customerRepository = new CustomerRepository();
export const cartRepository = new CartRepository();