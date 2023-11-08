import { vewLogicProduct } from '../../products/logic/vewProduct.js';
import { inInventaryL } from '../logic/inInventaryL.js';

export async function inInventary(modal) {
    consoleBody.innerHTML = '';
    consoleFooter.innerHTML = '';

    const product = await vewLogicProduct();

    const divProduct = document.createElement('div');
    divProduct.className = 'divProduct-Inv';
    divProduct.innerHTML = `
        <h4>Selecciona el producto</h4>
        <form class="formProduct-inv">
            <select name="productInv" id="product_inv" required>
                <option value="" disabled selected>Elegir Producto...</option>
            </select>
            <div class="quantity-inv">
                <label>Cantidad</label>
                <input type="text" name="quantity" required>
            </div>
            <input class="btnProduct-inv" type="submit" value="Agregar">
        </form>
    `;
    consoleBody.appendChild(divProduct);
    const product_inv = document.querySelector('#product_inv');

    product.data.forEach((prod) => {
        const option = document.createElement('option');
        option.setAttribute('data_id', prod._id);
        option.value = prod.name;
        option.textContent = prod.name;
        product_inv.appendChild(option);
    });

    const form = document.querySelector('.formProduct-inv');
    inInventaryL(form, modal);
}; 
