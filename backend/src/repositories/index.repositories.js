import UserRepository from '../repositories/users.repositories.js';
import ProductRepository from '../repositories/products.repositories.js';

export const userRepository = new UserRepository();
export const productRepository = new ProductRepository();