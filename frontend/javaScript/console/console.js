import { productMenu } from './products/show/productShow.js';
import { showCustomer } from './customers/show/Customer.js';
import { showCash } from './cashRegister/show/cashRegister.js';
import { showSell } from './sell/show/sell.js';

const sell = document.querySelector('#sell');
const cash = document.querySelector('#cash');
const customer = document.querySelector('#customer');
const product = document.querySelector('#product');

// Logo. 
const logoBase = document.querySelector('#logoBase');
logoBase.addEventListener('click', () => window.location.href = 'basePage.html');

document.addEventListener('DOMContentLoaded', () => {

    sell.addEventListener('click', showSell); // Ventas
    cash.addEventListener('click', showCash); // Caja registradora.
    customer.addEventListener('click', showCustomer); // Clientes.
    product.addEventListener('click', productMenu); // Productos.
});