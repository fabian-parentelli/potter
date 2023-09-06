const consoleMain = document.querySelector('#consoleMain');
const consoleBody = document.querySelector('#consoleBody');

export function productMenu() {
    consoleMain.innerHTML = '';

    const div = document.createElement('div');
    div.className = 'productMain';
    div.innerHTML = `
        <h4>Productos</h4>
        <div class='productRadial'>
            <div>
                <label>Crear producto</label>
                <input type='radio' name='productType' value='newProduct' checked>
            </div>
            <div>
                <label>Ver productos</label=>
                <input type='radio' name='productType' value='vewProduct'>
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
            const selectedValue = radioButton.value;
            watchTypeProduct(selectedValue);
        });
    });
    const defaultValue = 'newProducts';
    watchTypeProduct(defaultValue);
};

function watchTypeProduct(selectedValue) {
    if (selectedValue === "newProducts") {
        import('./productNew.js').then((module) => {
            const newProducto = module.newProducto;
            newProducto();
        });
    } else {
        console.log(selectedValue);
    };
};