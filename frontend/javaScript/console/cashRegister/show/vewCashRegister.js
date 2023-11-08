export function getCashShow() {
    consoleBody.innerHTML = '';

    const div = document.createElement('div');
    div.className = 'vewCash';
    div.innerHTML = `
        <div id="cashVewShow" class="cashVewShow">

            <div>
                <label for="name">Caja Fabian</label>
                <input type="text" name="fabianCash">
            </div>
            
            <div>
                <label for="name">Tesoro</label>
                <input type="text" name="treasure">
            </div>
            
            <div>
                <label for="name">Caja Adrian</label>
                <input type="text" name="adrianCash">
            </div>

        </div>
    `;
    consoleBody.appendChild(div);
    // searchCustomer(formGetCustomer, modal);
};