import { productNewLogic } from '../logic/productLogic.js';

export function newProducto() {
    consoleBody.innerHTML = '';

    const div = document.createElement('div');
    div.className = 'divProductos';
    div.innerHTML = `
        <h2>Agregar un Producto</h2>
        <form id="formNewProduct">
            <div class='fnp'>
                <label>Nombre</label>
                <input type="text" name="name" required>
            </div>
            <div class='fnp'>
                <label>Medida</label>
                <input type="text" name="size" required>
            </div>
            <div class='fnp'>
                <label>Costo</label>
                <input type="text" name="cost" required>
                
                <label>Interno</label>
                <input type="text" name="bothPrice" required>
            </div>
            <div class='fnp'>
                <label>Mayoria</label>
                <input type="text" name="bigPrice" required>
                
                <label>Minorista</label>
                <input type="text" name="smallPrice" required>
            </div>

            <div class='fnp'>
                <label>Archivo</label>
                <input type="file" id="file" name="file" accept="image/*" required>
            </div>
            <input class="btnRegister" type="submit" value="Guardar">
        </form>
    `;
    consoleBody.appendChild(div);
    const formNewProduct = document.querySelector('#formNewProduct');
    productNewLogic(formNewProduct);
};