import { vewLogicProduct } from '../../products/logic/vewProduct.js';
import { vewProductSell } from '../logic/vewProducts.js';
import { addproductToCart } from '../logic/addCart.js';

export async function vewCustomerCurr(user) {
    consoleBody.innerHTML = '';
    const response = await vewLogicProduct();

    const container = document.createElement('div');
    container.className = 'containerProdSell';

    response.data.forEach((prod) => {
        if (prod.stock > 0) {
            const div = document.createElement('div');
            div.innerHTML = `
                <div class='divSellProd' id=${prod._id}>
                    <img src=${prod.imgUrl}>
                    <p>${prod.name}</p>
                </div>
            `;
            container.appendChild(div);
            div.addEventListener('click', async () => await vewFormAddProduct(prod._id, user));
        };
    });
    consoleBody.appendChild(container);
};

let currentForm = null;

async function vewFormAddProduct(id, user) {

    if(currentForm) currentForm.remove();

    const product = await vewProductSell(id);

    const div = document.createElement('div');
    div.classList = 'sellForm';
    div.innerHTML = `
        <h4>Facturación</h4>
            
        <form id="formSellProduct">
            <div class='fnp'>
                <label>Producto</label>
                <input type="text" name="name" value="${product.name}" readonly>
            </div>

            <div class='quantity'>
                <button id="one">1</button>
                <button id="three">3</button>
                <button id="six">6</button>
                <input type="text" name="quantity" value="0">
            </div>    
            <input class="btnRegister uploader" type="submit" value="Agregar">
        </form>
    `;

    consoleBody.appendChild(div);
    qauntityFuntion(product);
    addproductToCart(id, user._id, formSellProduct, div);

    currentForm = div;
};

function qauntityFuntion(product) {
    const one = document.querySelector('#one');
    const three = document.querySelector('#three');
    const six = document.querySelector('#six');
    let container = document.querySelector('.quantity input');
    const btnRegister = document.querySelector('.btnRegister');

    function updateButtonState() {
        const currentValue = parseInt(container.value, 10);
        if (currentValue >= product.stock) {
            one.style.backgroundColor = 'gray';
            three.style.backgroundColor = 'gray';
            six.style.backgroundColor = 'gray';
            botonAgregar(container, btnRegister);
        } else {
            one.style.backgroundColor = '';
            three.style.backgroundColor = '';
            six.style.backgroundColor = '';
            botonAgregar(container, btnRegister);
        };
    };

    one.addEventListener('click', (e) => {
        e.preventDefault();
        let currentValue = parseInt(container.value, 10);
        if (currentValue < product.stock) {
            currentValue++;
            container.value = currentValue;
            updateButtonState();
        };
    });

    three.addEventListener('click', (e) => {
        e.preventDefault();
        let currentValue = parseInt(container.value, 10);
        if (currentValue < product.stock) {
            currentValue += 3;
            if (currentValue >= product.stock) {
                currentValue = product.stock;
            };
            container.value = currentValue;
            updateButtonState();
        };
    });

    six.addEventListener('click', (e) => {
        e.preventDefault();
        let currentValue = parseInt(container.value, 10);
        if (currentValue < product.stock) {
            currentValue += 6;
            if (currentValue >= product.stock) {
                currentValue = product.stock;
            };
            container.value = currentValue;
            updateButtonState();
        };
    });

    container.addEventListener('input', () => {
        let currentValue = parseInt(container.value, 10);
        if (currentValue >= product.stock) {
            container.value = product.stock;
        };
        if (currentValue < 0) container.value = 0;
        updateButtonState();
    });
    updateButtonState();
};

function botonAgregar(container, btnRegister) {
    if (container.value <= 0) {
        btnRegister.disabled = true;
        btnRegister.style.backgroundColor = 'gray'
    } else {
        btnRegister.disabled = false;
        btnRegister.style.backgroundColor = ''
    };
};