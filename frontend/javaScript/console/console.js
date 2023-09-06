import { productMenu } from './show/productShow.js';

const product = document.querySelector('#product');

// Logo. 
const logoBase = document.querySelector('#logoBase');
logoBase.addEventListener('click', () => window.location.href = 'basePage.html');

document.addEventListener('DOMContentLoaded', () => {

    product.addEventListener('click', () => productMenu()); // Productos.
});