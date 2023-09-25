import { vewProductSell } from '../logic/vewProducts.js';
import { getCustomer } from '../logic/vewCartLogic.js';

export async function vewCartShow(cart, consoleBody) {

    const user = await getCustomer(cart._id);
    console.log(user);

    for (const prod of cart.products) {
        const getProduct = await vewProductSell(prod.product);

        console.log(getProduct);

        const div = document.createElement('div');
        div.className = 'divCartPreVew';
        div.innerHTML = `
            <p>${prod.quantity}</p>
            <p>${getProduct.name}</p>  
        `;
        consoleBody.appendChild(div);
    };
};

