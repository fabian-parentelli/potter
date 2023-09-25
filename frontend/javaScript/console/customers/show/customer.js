const consoleMain = document.querySelector('#consoleMain');
const consoleBody = document.querySelector('#consoleBody');
const modal = document.querySelector('.modalRegister');

export function showCustomer() {
    consoleMain.innerHTML = '';

    const div = document.createElement('div');
    div.className = 'productMain';
    div.innerHTML = `
        <h4>Clientes</h4>
        <div class='productRadial'>
            <div>
                <label>Nuevo Cliente</label>
                <input type='radio' name='Cliente' value='nuevoCliente' checked>
            </div>
            <div>
                <label>Ver Clientes</label=>
                <input type='radio' name='Cliente' value='VerClientes'>
            </div>
            <div>
                <label>Modificar Clientes</label=>
                <input type='radio' name='Cliente' value='modificarClientes'>
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
    watchTypeProduct('nuevoCliente');
};

function watchTypeProduct(selectedValue) {
    if (selectedValue === "nuevoCliente") {
        import('./newCustomer.js').then((module) => {
            const newCustomer = module.newCustomer;
            newCustomer(modal);
        });

    } else if( selectedValue ===  "VerClientes") {
        import('./getCustomers.js').then((module) => {
            const getCustomer = module.getCustomer;
            getCustomer(modal);
        });
    } else {
        import('./updateCustomer.js').then((module) => {
            const updateCustomer = module.updateCustomer;
            updateCustomer(modal);
        });
    };
};