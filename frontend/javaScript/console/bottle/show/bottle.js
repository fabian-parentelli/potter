const modal = document.querySelector('.modalRegister');

export function showBottle() {
    consoleMain.innerHTML = '';
    consoleBody.innerHTML = '';
    consoleFooter.innerHTML = '';

    const div = document.createElement('div');
    div.className = 'inventary';
    div.innerHTML = `
        <h4>Botellas</h4>
        <div class='inventaryRadial'>
            <div>
                <label>Stock Botellas</label>
                <input type='radio' name='bottle' value='vewBottle' checked>
            </div>
            <div>
                <label>Agregar/Quitar</label=>
                <input type='radio' name='bottle' value='addBottle'>
            </div>
            <div>
                <label>Modificar</label=>
                <input type='radio' name='bottle' value='modBottle'>
            </div>
            <div>
                <label>Transferir</label=>
                <input type='radio' name='bottle' value='changeBottle'>
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
    watchTypeProduct('vewBottle');
};

function watchTypeProduct(selectedValue) {
    if (selectedValue === "vewBottle") {
        import('./vewBottle.js').then((module) => {
            const vewBottle = module.vewBottle;
            vewBottle(modal);
        });

    } else if( selectedValue ===  "addBottle") {
        import('./addBottle.js').then((module) => {
            const addBottle = module.addBottle;
            addBottle(modal);
        });
    } else if( selectedValue ===  "modBottle") {
        import('./modifyBottle.js').then((module) => {
            const modifyBottle = module.modifyBottle;
            modifyBottle(modal);
        });
    } else {
        import('./transferBottle.js').then((module) => {
            const transferBottle = module.transferBottle;
            transferBottle(modal);
        });
    };
};