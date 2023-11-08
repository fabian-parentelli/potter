import { addBottleLogic } from '../logic/addBottleLogic.js';

export function addBottle(modal) {
    consoleBody.innerHTML = '';
    consoleFooter.innerHTML = '';

    const divProduct = document.createElement('div');
    divProduct.className = 'addBottle';
    divProduct.innerHTML = `
        <h4>Seleccionar Administrador</h4>

        <form class="formBottle">
            <select name="admin" required>
                <option value="" disabled selected>Elegir Administrador...</option>
                <option value="treasure">Tesoro</option>
                <option value="fabian">Fabian</option>
                <option value="adrian">Adrian</option>
            </select>

            <div class="bottleQunatiyty">
                <label>Cantidad</label>
                <input type="text" name="quantity" required>
            </div>
            
            <div class="bottleQunatiyty">
                <label>Tipo</label>
                <input type="text" name="type" required>
            </div>

            <div class="radialBottle">   
                <div class="rad">
                    <label>Agregar</label>
                    <input type='radio' name='addRemove' value='add' checked>
                </div>
                <div class="rad">
                    <label>Quitar</label>
                    <input type='radio' name='addRemove' value='remove'>
                </div>
            </div>
            <input class="btnBottle" type="submit" value="Agregar">
        </form>
    `;
    consoleBody.appendChild(divProduct);
    const formBottle = document.querySelector('.formBottle');
    addBottleLogic(formBottle, modal);
};