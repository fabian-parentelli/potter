import { findAdminBottle, bottleModify } from '../logic/modifyBottleLogic.js';

export function modifyBottle(modal) {
    consoleBody.innerHTML = '';
    consoleFooter.innerHTML = '';

    const divBottle = document.createElement('div');
    divBottle.className = 'divBottleFind';
    divBottle.textContent = 'Modificar stock de Botellas'
    consoleBody.appendChild(divBottle);

    const div = document.createElement('div');
    div.innerHTML = `
        <form id="formBottleFind">
            <select name="admin" required>
                <option value="" disabled selected>Elegir Administrador...</option>
                <option value="treasure">Tesoro</option>
                <option value="fabian">Fabian</option>
                <option value="adrian">Adrian</option>
            </select>
            <input class="btnBottle" type="submit" value="Agregar">
        </form>
    `;
    divBottle.appendChild(div);
    const form = document.querySelector('#formBottleFind');
    findAdminBottle(form, modal);
};

export function vewBottleModify(data, modal) {

    const divForm = document.createElement('div');
    divForm.className = 'divModifyBottle';
    divForm.textContent = 'Datos a modificar';
    consoleFooter.appendChild(divForm);

    const admin = document.createElement('form');
    admin.id = 'formBottleModify';
    admin.className = 'formModifyBottle';
    admin.innerHTML = data.admin === 'treasure' ? 'tesoro' : data.admin;
    divForm.appendChild(admin);

    let i = 0;
    data.products.forEach((prod) => {
        i++;
        const divPro = document.createElement('div');
        divPro.innerHTML = `
            <div class="prodBottle">
                <label>Tamaño</label>
                <input type='text' name='prodProduct${i}' value='${prod.product}'>
                <label>Unid</label>
                <input type='text' name='prodQuantity${i}' value='${prod.quantity}'>
            </div>
        `;
        admin.appendChild(divPro);
    });

    if (data.credit) {
        const credito = document.createElement('p');
        credito.className = 'credito';
        credito.textContent = 'Botellas adeudadas';
        admin.appendChild(credito);

        let i = 0;
        data.credit.forEach((cred) => {
            i++
            const divCred = document.createElement('div');
            divCred.innerHTML = `
                <div class="credBottle">
                    <label>Tamaño</label>
                    <input type='text' name='credProduct${i}' value='${cred.product}'>
                    <label>Unid</label>
                    <input type='text' name='credQuantity${i}' value='${cred.quantity}'>
                </div>
            `;
            admin.appendChild(divCred);
        });
    };

    const button = document.createElement('input');
    button.className = 'buttonModifyButton';
    button.type = 'submit';
    button.value = 'Modificar';
    admin.appendChild(button);

    const form = document.querySelector('#formBottleModify');
    bottleModify(form, data.admin, modal);
};