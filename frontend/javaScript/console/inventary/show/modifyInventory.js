import { getModiofyInventory, putModifyInv } from '../logic/modifyInventoryLogic.js';
import { getProductById } from '../../products/logic/getProductByIdLogic.js';

// Buscar el inventario a modificar
export async function modifyInventory(modal) {
    consoleBody.innerHTML = '';
    consoleFooter.innerHTML = '';

    const divProduct = document.createElement('div');
    divProduct.className = 'modifyShow';
    divProduct.innerHTML = `
        <h4>Modificación del inventario</h4>
        <form class="formModifyInv" id="formModifyInv">
            <select name="name" id="operation" required>
                <option value="" disabled selected>Inventario</option>
                <option value="treasure">Tesoro</option>
                <option value="fabian">Fabian</option>
                <option value="adrian">Adrian</option>
            </select>
            <input id="modifyBtn" class="btnProduct-inv" type="submit" value="Modificar">
        </form>
    `;
    consoleBody.appendChild(divProduct);
    const form = document.querySelector('#formModifyInv');
    getModiofyInventory(form, modal);
};

// Mostrar el inventario a llenar
export async function showModifyInv(data, modal) {
    consoleFooter.innerHTML = '';

    const div = document.createElement('div');
    div.className = 'showModifyInv';
    div.innerText = data.admin === 'treasure' ? 'Tesoro' : data.admin;
    consoleFooter.appendChild(div);

    const form = document.createElement('form');
    form.className = 'formModifyOk';

    await Promise.all(data.products.map(async (prod) => {
        const prodName = await getProductById(prod.product);

        const divPro = document.createElement('div');
        divPro.className = 'divPro';
        divPro.innerHTML = `
            <div class='fnc'>
                <label>${prodName.name}</label>
                <input type="text" name="${prodName._id}" value="${prod.quantity}" required>
            </div>
        `;
        form.appendChild(divPro);
    }));

    div.appendChild(form);

    const submitButton = document.createElement('input');
    submitButton.type = 'submit';
    submitButton.className = 'btnProduct-inv';
    submitButton.value = 'Modificar';
    form.appendChild(submitButton);
    putModifyInv(data.admin, form, modal);
};



