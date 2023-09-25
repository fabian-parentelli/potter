import { vewCustomerCurr } from './searchProducts.js';
import { callCart } from '../logic/vewCartLogic.js';
import createNewCart from '../logic/createCartLogic.js';

const consoleFooter = document.querySelector('#consoleFooter');
const consoleBody = document.querySelector('#consoleBody');


export function vewCustomer(data) {

    consoleMain.innerHTML = '';

    data.forEach((prod) => {
        const div = document.createElement('div');
        div.className = 'vewCustomerSelled';
        div.innerHTML = `
            <div>
                <h3><span>Cliente:</span> ${prod.name}</h3>
                <button id=${prod._id} class="select-button">Seleccionar</button>
            </div>
        `;

        const selectButton = div.querySelector('.select-button');
        selectButton.addEventListener('click', () => {
            const customerDivs = document.querySelectorAll('.vewCustomerSelled');
            customerDivs.forEach((customerDiv) => {
                if (customerDiv !== div) customerDiv.remove();
            });
            selectButton.remove(); // Borro el boton
            createNewCart(); // Creo un uevo Carro
            vewCustomerCurr(prod); // Muestro los productos
        });
        consoleMain.appendChild(div);
    });

    btnVewCart();
};

function btnVewCart() {
    const btn = document.createElement('button');
    btn.className = 'btnVewCart';
    btn.textContent = 'Ver compra';
    consoleFooter.appendChild(btn);
    callCart(btn, consoleBody);
};