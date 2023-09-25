import { searchCustomer } from '../logic/getCustomerLogic.js';

// Buscar clientes.
export function getCustomer(modal) {
    consoleBody.innerHTML = '';

    const div = document.createElement('div');
    div.className = 'searchCustomer';
    div.innerHTML = `
        <h4>Ver clientes</h4>
        <form id="formGetCustomer">

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
            
            <div class="watchfromCliente">
                <select name="customerOf">
                    <option value="" disabled selected>Clientes de...</option>
                    <option value="fabian">Fabian</option>
                    <option value="adrian">Adrian</option>
                </select>
            </div>

            <input class="btnCustomer" type="submit" value="Buscar">
        </form>
    `;
    consoleBody.appendChild(div);
    const formGetCustomer = document.querySelector('#formGetCustomer');
    searchCustomer(formGetCustomer, modal);
};

// Mostrar clientes.
export function getShowCustomer(data, modal) {
    consoleBody.innerHTML = '';

    const tableHead = document.createElement('table');
    tableHead.className = 'tableHead';
    tableHead.innerHTML = `
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Dirección</th>
                <th>Teléfono</th>
                <th>email</th>
                <th>Tipo</th>
                <th>Vendedor</th>
            </tr>
        </thead>
    `;
    consoleBody.appendChild(tableHead);

    data.forEach(data => {

        let tipo;
        if(data.type === 'small') tipo = 'Minorista';
        else tipo = 'Mayorista';

        const table = document.createElement('table');
        table.className = 'tableCustomer';
        table.innerHTML = `
            <tbody>
                <tr>
                    <th>${data.name}</th>
                    <th>${data.address}</th>
                    <th>${data.phone}</th>
                    <th>${data.email}</th>
                    <th>${tipo}</th>
                    <th>${data.customerOf}</th>
                </tr>
            </tbody>
        `;
       tableHead.appendChild(table);
    });
};