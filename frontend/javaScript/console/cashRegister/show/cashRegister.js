const consoleMain = document.querySelector('#consoleMain');
const consoleBody = document.querySelector('#consoleBody');
const modal = document.querySelector('.modalRegister');

export function showCash() {
    consoleMain.innerHTML = '';

    const div = document.createElement('div');
    div.className = 'productMain';
    div.innerHTML = `
        <h4>Caja</h4>
        <div class='productRadial'>
            <div>
                <label>Ver caja</label>
                <input type='radio' name='caja' value='verCaja' checked>
            </div>
            <div>
                <label>Modoficar Caja</label=>
                <input type='radio' name='caja' value='modificarCaja'>
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
    watchTypeProduct('verCaja');
};

function watchTypeProduct(selectedValue) {

    if (selectedValue === "verCaja") {
        import('./vewCashRegister.js').then((module) => {
            const getCashShow = module.getCashShow;
            getCashShow();
        });
    } else {
        // import('./updateCustomer.js').then((module) => {
        //     const updateCustomer = module.updateCustomer;
        //     updateCustomer(modal);
        // });
        console.log('2', selectedValue);
    };
};