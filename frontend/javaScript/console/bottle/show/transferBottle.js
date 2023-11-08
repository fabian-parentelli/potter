import { currentFind } from '../../../utils/current.js';
import { vewBottleLogic } from '../logic/vewBottleLogic.js';

export async function transferBottle(modal) {
    consoleBody.innerHTML = '';
    consoleFooter.innerHTML = '';

    const user = await currentFind();
    const bottle = await vewBottleLogic();

    const divProduct = document.createElement('div');
    divProduct.className = 'modifyShow';
    divProduct.innerHTML = `
        <h4>Transferencia de botellas</h4>
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

    const operation = document.querySelector('#operation');
    userOptions(user.name, operation);
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