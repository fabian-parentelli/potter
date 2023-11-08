import { getInventary, getInventaryDoc } from "../logic/getInventary.js";
import { getByIdCustomer } from "../../customers/logic/getByIdCustomerLogic.js";
import { getProductById } from '../../products/logic/getProductByIdLogic.js';

export async function vewInventary() {
    consoleFooter.innerHTML = '';
    consoleBody.innerHTML = '';

    const inventory = await getInventary();

    const divFather = document.createElement('div');
    divFather.className = 'divFather';
    consoleBody.appendChild(divFather);

    inventory.forEach((inv) => {
        const div = document.createElement('div');
        div.className = 'vewInventary';
        div.innerHTML = ` <h3 id="title">${inv.admin === 'treasure' ? 'tesoro' : inv.admin}</h3> `;
        divFather.appendChild(div);

        inv.products.forEach((prod) => {
            const divPro = document.createElement('ul');
            divPro.className = 'divPro';
            divPro.innerHTML = ` <li>${prod.product.name} ${prod.quantity} </li> `;
            div.appendChild(divPro);
        });
    });

    vewInventoryDoc();
};

async function vewInventoryDoc() {
    consoleFooter.innerHTML = '';

    const divContent = document.createElement('div');
    divContent.className = 'divContent';
    consoleFooter.appendChild(divContent);

    const docs = await getInventaryDoc();

    docs.forEach((user) => {
        const div = document.createElement('div');
        div.className = 'divDocs'
        div.innerHTML = `
            <h4>${user._id === '64fe3060b7cd48e87a6532e9' ? 'Adrian' : 'Fabian'}</h4>
        `;
        divContent.appendChild(div);

        user.docs.forEach(async (doc) => {
            let user;
            if (doc.customer) { user = await getByIdCustomer(doc.customer) };

            const option = optionDet(doc.detail);

            const divTicket = document.createElement('div');
            divTicket.className = 'divTicket';
            divTicket.innerHTML = `
                <p class="operacion"><span>Operacion</span> ${option}</p>
                <p>${doc.customer ? `<span>Cliente</span> ${user.name}` : ''}</p>
                <p>${doc.fromTo ? `<span>Movimiento</span> ${doc.fromTo}` : ''}</p>
                <p>${doc.reason ? `<span>Inv. afectado</span> ${doc.reason}` : ''}</p>
                <p>${doc.date}</p>
            `;
            div.appendChild(divTicket);

            doc.products.forEach(async ({product, quantity}) => {
                const products = await getProductById(product);

                const prodQuantity = document.createElement('div');
                prodQuantity.className = 'prodQuantity';
                prodQuantity.innerHTML = `
                    <p class="qauntity">${quantity}</p>
                    <p>${products.name}</p>
                `;
                divTicket.appendChild(prodQuantity);
            });
        });
    });

    // Me faltaria la suma de tesoro  + fabian + adrian.
};

function optionDet(detail) {
    const typeDetail = {
        'sale': () => { return 'Venta' },
        'new production': () => { return 'Nueva producción' },
        'modify': () => { return 'Modificación' },
        'default': () => { return 'Transferencia' }
    };
    return (typeDetail[detail] || typeDetail['default'])();
};