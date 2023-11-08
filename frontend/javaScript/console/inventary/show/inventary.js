const consoleMain = document.querySelector('#consoleMain');
const consoleBody = document.querySelector('#consoleBody');
const consoleFooter = document.querySelector('#consoleFooter');
const modal = document.querySelector('.modalRegister');

export function showInventary() {
    consoleMain.innerHTML = '';
    consoleBody.innerHTML = '';
    consoleFooter.innerHTML = '';

    const div = document.createElement('div');
    div.className = 'inventary';
    div.innerHTML = `
        <h4>Inventario</h4>
        <div class='inventaryRadial'>
            <div>
                <label>Ver Stock</label>
                <input type='radio' name='inventary' value='vewInventary' checked>
            </div>
            <div>
                <label>Nueva Producción</label=>
                <input type='radio' name='inventary' value='inInventary'>
            </div>
            <div>
                <label>Modificar</label=>
                <input type='radio' name='inventary' value='modInventary'>
            </div>
            <div>
                <label>Transferir</label=>
                <input type='radio' name='inventary' value='changeInventary'>
            </div>
        </div>
    `;
    consoleMain.appendChild(div);
    const radioButtons = div.querySelectorAll('input[type="radio"]');
    valueRadial(radioButtons);
};

function valueRadial(radioButtons) {
    radioButtons.forEach(radioButton => {
        radioButton.addEventListener('change', () => {
            watchTypeProduct(radioButton.value);
        });
    });
    watchTypeProduct('vewInventary');
};

function watchTypeProduct(selectedValue) {
    if (selectedValue === "vewInventary") {
        import('./vewInventary.js').then((module) => {
            const vewInventary = module.vewInventary;
            vewInventary(modal);
        });

    } else if( selectedValue ===  "inInventary") {
        import('./inInventary.js').then((module) => {
            const inInventary = module.inInventary;
            inInventary(modal);
        });
    } else if( selectedValue ===  "modInventary") {
        import('./modifyInventory.js').then((module) => {
            const modifyInventory = module.modifyInventory;
            modifyInventory(modal);
        });
    } else {
        import('./transferInventary.js').then((module) => {
            const transferInventary = module.transferInventary;
            transferInventary(modal);
        });
    };
};