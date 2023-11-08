import { vewLogicProduct } from '../../products/logic/vewProduct.js';
import { currentFind } from '../../../utils/current.js';
import { transferInvLogic } from '../logic/transferInventary.js';

export async function transferInventary(modal) {
    consoleBody.innerHTML = '';
    consoleFooter.innerHTML = '';

    const product = await vewLogicProduct();
    const user = await currentFind();

    const divProduct = document.createElement('div');
    divProduct.className = 'modifyShow';
    divProduct.innerHTML = `
        <h4>Transferencia de inventario</h4>
        <form class="formModifyInv">
            <select name="operation" id="operation" required>
                <option value="" disabled selected>Operación...</option>
            </select>
            <select name="productInv" id="product_inv" required>
                <option value="" disabled selected>Elegir Producto...</option>
            </select>
            <div class="divInventory">
                <label>Cantidad</label>
                <input type="text" name="quantity" required>
            </div>
            <input class="btnProduct-inv" type="submit" value="Modificar">
        </form>
    `;
    consoleBody.appendChild(divProduct);

    const product_inv = document.querySelector('#product_inv');
    const operation = document.querySelector('#operation');

    userOptions(user.name, operation)

    product.data.forEach((prod) => {
        const option = document.createElement('option');
        option.setAttribute('data_id', prod._id);
        option.value = prod.name;
        option.textContent = prod.name;
        product_inv.appendChild(option);
    });

    const form = document.querySelector('.formModifyInv');
    transferInvLogic(modal, form);
};

function userOptions(user, operation) {
    const array = [`tesoro - ${user}`, `${user} - tesoro`, `${user === 'fabian' ? 'fabian - adrian' : 'adrian - fabian'}`];
    array.forEach((user) => {
        const option = document.createElement('option');
        option.value = user;
        option.textContent = user;
        operation.appendChild(option);
    });
};