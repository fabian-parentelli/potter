import { updateProductLogic, completeValues, updateProductServer } from "../logic/updateProductLogic.js";

export function updateProducto(modal) {
    consoleBody.innerHTML = '';

    const div = document.createElement('div');
    div.className = 'divSearchProduc';
    div.innerHTML = `
        <h2>Busca un Producto</h2>
        <form id="searchProduct">
            <div class='fnp'>
                <label>Nombre</label>
                <input type="text" name="name" required>
            </div>
            <input class="btnRegister" type="submit" value="Buscar">
        </form>
    `;
    consoleBody.appendChild(div);
    updateProductLogic(searchProduct, modal);
};

export function showUpdateProduct(data, modal) {
    consoleBody.innerHTML = '';

    const div = document.createElement('div');
    div.className = 'divProductosUpdate';
    div.innerHTML = `
        <h2>Agregar un Producto</h2>
        <form id="formUpdateProduct">
            <div class='fnp'>
                <label>Nombre</label>
                <input type="text" name="name" readonly>
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
                <input type="file" id="file" name="file" accept="image/*">
            </div>
            <input class="btnRegister uploader" type="submit" value="Actualizar">
        </form>
    `;
    consoleBody.appendChild(div);
    const formUpdateProduct = document.querySelector('#formUpdateProduct');
    completeValues(formUpdateProduct, data);
    updateProductServer(formUpdateProduct, modal);
};