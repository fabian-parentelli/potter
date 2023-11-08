import { searchCustomerSell } from "../logic/vewCustomerSell.js";

const consoleMain = document.querySelector('#consoleMain');
const consoleBody = document.querySelector('#consoleBody');
const modal = document.querySelector('.modalRegister');

export function showSell() {
    consoleMain.innerHTML = '';
    consoleBody.innerHTML = ''; 
    consoleFooter.innerHTML = '';

    const div = document.createElement('div');
    div.className = 'sellCustomer';
    div.innerHTML = `
        <h2>Realizar una Venta</h2>
        <form id="formGetCustomerSell">

            <div>
                <label for="name">Nombre</label>
                <input type="text" name="name">
            </div>

            <div class="watchTypeCliente">
                <select name="type">
                    <option value="" disabled selected>Volumen de consumo...</option>
                    <option value="small">Minorista</option>
                    <option value="big">Mayorista</option>
                </select>
            </div>
            <input class="btnCustomer" type="submit" value="Buscar">
        </form>
    `;
    consoleMain.appendChild(div);
    const formGetCustomerSell = document.querySelector('#formGetCustomerSell');
    searchCustomerSell(formGetCustomerSell, consoleMain, modal);
};