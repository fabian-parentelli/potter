import { newCustomerLogic } from '../logic/newCustomerLogic.js';

export async function newCustomer(modal) {
    consoleBody.innerHTML = '';

    const div = document.createElement('div');
    div.className = 'divClientes';
    div.innerHTML = `
        <h2>Nuevo Cliente</h2>
        <form id="formNewCustomer">
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
                    <input type='radio' name='type' value='big' checked>
                </div> 
                <div>
                    <label>Minorista</label>
                    <input type='radio' name='type' value='small'>
                </div>
            </div>
            <input class="btnRegister" type="submit" value="Agregar">
        </form>
    `;
    consoleBody.appendChild(div);
    const formNewCustomer = document.querySelector('#formNewCustomer');
    newCustomerLogic(formNewCustomer, modal);
}; 