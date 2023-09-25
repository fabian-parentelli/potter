import { vewLogicProduct } from '../console/products/logic/vewProduct.js';

const productsVew = document.querySelector('#productsVew');
const token = localStorage.getItem('token');

export async function getAllProducts() {

    if (token) {
        const content = await vewLogicProduct(token);
        showProducts(content.data);
    } else {
        const response = await fetch('http://localhost:8080/api/product/public', {
            method: 'GET',
        });
        const content = await response.json();
        showProducts(content.data);
    };
};

function showProducts(products) {
    productsVew.innerHTML = '';

    products.forEach(product => {
        if (product.stock > 0) {
            const newPrice = precioShow(product);

            const div = document.createElement('div');
            div.className = 'showPrBasePag';
            div.innerHTML = `
                <p class='name'>${product.name}</p>
                <div>
                    <img src=${product.imgUrl}>
                    <p><span>Tamaño:</span> ${product.size}cc</p>
                    ${newPrice !== undefined ? `<p><span>Precio: </span>${newPrice}</p>` : ''}
                    <button id=${product._id}>Agregar al Carrito</button>
                </div>
            `;
            productsVew.appendChild(div);
        }
    });
};

function precioShow(product) {
    let newPrice;
    if(product.bothPrice && product.smallPrice && product.bigPrice) return newPrice = product.bothPrice;
    if(product.smallPrice) return newPrice = product.smallPrice;
    if(product.bigPrice) return newPrice = product.bigPrice;
};