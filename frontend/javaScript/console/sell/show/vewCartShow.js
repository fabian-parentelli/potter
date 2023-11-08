import { vewProductSell } from '../logic/vewProducts.js';
import { getCustomer } from '../logic/vewCartLogic.js';
import { getTotalResultLogic } from '../logic/getTotalResultLogic.js';
import { endSell } from '../logic/endSell.js';

export async function vewCartShow(cart, consoleBody) {

    consoleFooter.innerHTML = '';

    const user = await getCustomer();

    for (const prod of cart.products) {

        const getProduct = await vewProductSell(prod.product);

        const div = document.createElement('div');
        div.className = 'divCartPreVew';
        div.innerHTML = `
            <div class="cartOne">
                <input class="inputQuan" type="text" name="quantity" value="${prod.quantity}" readonly>
                <input class="inputProd" type="text" name="products" value="${getProduct.name}" readonly>
                <label>$ c/u</label>
                <input class="inputPric" type="text" name="price" value="${user.type === 'big' ? getProduct.bigPrice : getProduct.smallPrice}" readonly>
                <p id="result">sub-total: ${prod.quantity * (user.type === 'big' ? getProduct.bigPrice : getProduct.smallPrice)}</p>
            </div>
        `;

        const quantityInput = div.querySelector('input[name="quantity"]');
        const priceInput = div.querySelector('input[name="price"]');

        quantityInput.addEventListener('input', updateResult);
        priceInput.addEventListener('input', updateResult);

        consoleBody.appendChild(div);
    };
    resultTotal(cart._id, user.type);
    btnVewCart(cart, user);
};

function updateResult() {
    const quantity = parseFloat(this.form.querySelector('input[name="quantity"]').value);
    const price = parseFloat(this.form.querySelector('input[name="price"]').value);
    const resultP = this.form.querySelector('#result');

    if (!isNaN(quantity) && !isNaN(price)) {
        const result = quantity * price;
        resultP.textContent = result;
    } else {
        resultP.textContent = 'NaN';
    };
};

async function resultTotal(cid, uid) {
    const data = await getTotalResultLogic(cid, uid);

    const divResult = document.createElement('div');
    divResult.className = 'divResult';
    divResult.innerHTML = `
        <div class="cartTwo">
            <button class="min"> - </button>
            <label>Envases</label>
            <input id="bottle" type="text" name="price" value="${data.quantity}">
            <button class="max"> + </button>
        </div>
        <span></span>
        <p>Total de la compra: ${data.result}</p>
    `;
    consoleBody.appendChild(divResult);

    const max = document.querySelector('.max');
    const min = document.querySelector('.min');
    const bottle = document.querySelector('#bottle');

    modifyBottle(min, max, bottle, data.quantity);
};

function btnVewCart(cart, user) {

    const container = document.querySelector('.containerProdSell'); // Elimino las img de las botellas.
    consoleBody.removeChild(container);

    const div = document.createElement('div'); // Botones efectivo y Credito
    div.className = 'divBtnVewCart';
    div.innerHTML = `
        <button class="cash">Efcetivo</button>
        <button class="credit">Credito</button>
    `;
    consoleFooter.appendChild(div);

    const btn = document.createElement('button'); // Boton, para finalizar la compra
    btn.className = 'btnVewCart';
    btn.textContent = 'Terminar Compra';
    consoleFooter.appendChild(btn);
    btn.disabled = true;

    const cash = document.querySelector('.cash');
    const credit = document.querySelector('.credit');

    const pay = {}; // Configuro el pago
    cash.addEventListener('click', () => { pay.cash = true; pay.credit = false; btn.disabled = false });
    credit.addEventListener('click', () => { pay.cash = false; pay.credit = true; btn.disabled = false });

    btn.addEventListener('click', () => endSell(bottle.value, cart._id, user._id, pay)); // Logica endSell
};

function modifyBottle(min, max, bottle, data) {

    function updateButtons() { // Funcion que da estilo al contador de botellas.
        if (bottle.value >= data) {
            max.disabled = true;
            max.style.backgroundColor = 'gray';
        } else {
            max.disabled = false;
            max.style.backgroundColor = '';
        }

        if (bottle.value <= 0) {
            min.disabled = true;
            min.style.backgroundColor = 'gray';
        } else {
            min.disabled = false;
            min.style.backgroundColor = '';
        }
    }

    bottle.addEventListener('input', updateButtons);
    updateButtons();

    max.addEventListener('click', () => {
        bottle.value++;
        updateButtons();
    });

    min.addEventListener('click', () => {
        bottle.value--;
        updateButtons();
    });
};