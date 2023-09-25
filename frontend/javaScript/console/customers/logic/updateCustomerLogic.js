import modalWatch from '../../../utils/modal.js';

const token = localStorage.getItem('token');

// Buscar el Cliente.
export function updateCustomerLogic(searchCustomer, modal) {

    searchCustomer.addEventListener('submit', async (e) => {

        e.preventDefault();
        const name = document.querySelector('#searchCustomer [name="name"]').value;

        const response = await fetch(`http://localhost:8080/api/customer/${name}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const content = await response.json();

        if (content.error) {
            modalWatch(`${content.error}`, 'error');
            modal.classList.add('modal--show');
            setTimeout(() => {
                modal.classList.remove('modal--show');
                window.location.reload();
            }, 3000);
        };

        if (content.data) {
            import('../show/updateCustomer.js').then((module) => {
                const updateShowCustomer = module.updateShowCustomer;
                updateShowCustomer(content.data, modal);
            });
        };
    });
};

// Llenar los campo con el cliente.
export function completeUpdateCustomer(formUpdateCustomer, data) {
    formUpdateCustomer.querySelector('[name="name"]').value = data.name;
    formUpdateCustomer.querySelector('[name="address"]').value = data.address;
    formUpdateCustomer.querySelector('[name="phone"]').value = data.phone;
    formUpdateCustomer.querySelector('[name="email"]').value = data.email;
    if(data.type === 'big') return formUpdateCustomer.querySelector('[name="type"][value="big"]').checked = true;
    formUpdateCustomer.querySelector('[name="type"][value="small"]').checked = true;
};

export function updateCustomerNew(formUpdateCustomer, modal) {

    formUpdateCustomer.addEventListener('submit', async (e) => {

        e.preventDefault();
        const newCustomer = Object.fromEntries(new FormData(formUpdateCustomer));
        
        const response = await fetch('http://localhost:8080/api/customer', {
            method: 'PUT',
            body: JSON.stringify(newCustomer),
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type':'application/json'
            }
        });

        const content = await response.json();

        if (content.error) {
            modalWatch(`${content.error}`, 'error');
            modal.classList.add('modal--show');
            setTimeout(() => {
                modal.classList.remove('modal--show');
                window.location.reload();
            }, 3000);
        };

        if (content.data.status === 'success') {
            modalWatch('Producto modificado correctamente');
            modal.classList.add('modal--show');
            setTimeout(() => {
                modal.classList.remove('modal--show');
                window.location.replace('consola.html');
            }, 3000);
        };
    });
};