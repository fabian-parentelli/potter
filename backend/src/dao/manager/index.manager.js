import User from './users.manager.js';
import Product from './products.manager.js';
import Customer from './customers.manager.js';
import Cart from './carts.manager.js';
import Inventory from './inventory.manager.js';
import InventoryDoc from './inventoryDoc.manager.js';
import Bottles from './bottles.manager.js'; 

export const userManager = new User();
export const productManager = new Product()
export const customerManager = new Customer();
export const cartManager = new Cart();
export const inventoryManager = new Inventory();
export const inventoryDocManager = new InventoryDoc();
export const bottlesManager = new Bottles();