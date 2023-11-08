import UserRepository from '../repositories/users.repositories.js';
import ProductRepository from '../repositories/products.repositories.js';
import CustomerRepository from '../repositories/customers.repositories.js';
import CartRepository from '../repositories/carts.repositories.js'
import InventoryRepository from './inventory.repositories.js';
import InventoryDocRepository from './inventoryDoc.repositories.js';
import BottlesRepository from './bottles.repositories.js';

export const userRepository = new UserRepository();
export const productRepository = new ProductRepository();
export const customerRepository = new CustomerRepository();
export const cartRepository = new CartRepository();
export const inventoryRepository = new InventoryRepository();
export const inventoryDocRepository = new InventoryDocRepository();
export const bottlesRepository = new BottlesRepository();