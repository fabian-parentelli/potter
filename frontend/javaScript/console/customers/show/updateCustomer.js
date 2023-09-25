import { updateCustomerLogic, completeUpdateCustomer, updateCustomerNew } from '../logic/updateCustomerLogic.js';

export function updateCustomer(modal) {
    consoleBody.innerHTML = '';

    const div = document.createElement('div');
    div.className = 'divSearchProduc';
    div.innerHTML = `
        <h2>Busca un Cliente</h2>
        <form id="searchCustomer">
            <div class='fnp'>
                <label>Nombre</label>
                <input type="text" name="name" required>
            </div>
            <input class="btnRegister" type="submit" value="Buscar">
        </form>
    `;
    consoleBody.appendChild(div);
    updateCustomerLogic(searchCustomer, modal);
};

export function updateShowCustomer(data, modal) {
    consoleBody.innerHTML = '';

    const div = document.createElement('div');
    div.className = 'divClientes';
    div.innerHTML = `
        <h2>Modificar Clientes</h2>
        <form id="formUpdateCustomer">
            <div class='fnc'>
                <label>Nombre</label>
                <input type="text" name="name" required>
            </div>
            <div class='fnc'>
                <label>Dirección</label>
                <input type="text" name="address">
            </div>
            <div class='fnc'>
                <label>Teléfono</label>
                <input type="text" name="phone" required>
                
                <label>Email</label>
                <input type="text" name="email">
            </div>
            <div class='fnRadial'>
                <div>
                    <label>Mayorista</label>
                    <input type='radio' name='type' value='big'>
                </div> 
                <div>
                    <label>Minorista</label>
                    <input type='radio' name='type' value='small'>
                </div>
            </div>
            <input class="btnRegister" type="submit" value="Modificar">
        </form>
    `;
    consoleBody.appendChild(div);
    const formUpdateCustomer = document.querySelector('#formUpdateCustomer');
    completeUpdateCustomer(formUpdateCustomer,data, modal);
    updateCustomerNew(formUpdateCustomer, modal);
};