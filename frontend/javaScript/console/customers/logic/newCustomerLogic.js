import modalWatch from '../../../utils/modal.js';

const token = localStorage.getItem('token');

export function newCustomerLogic(formNewCustomer, modal) {
    
    formNewCustomer.addEventListener('submit', async (e) => {

        e.preventDefault();
        
        const formData = Object.fromEntries(new FormData(formNewCustomer));

        const response = await fetch('http://localhost:8080/api/customer', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
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

        if (content.data.status === 'success') {
            modalWatch('Cliente Creado correctamente');
            modal.classList.add('modal--show');
            setTimeout(() => {
                modal.classList.remove('modal--show');
                window.location.replace('consola.html');
            }, 3000);
        };
    });
};