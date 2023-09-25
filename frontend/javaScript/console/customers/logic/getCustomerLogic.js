import { getShowCustomer } from '../show/getCustomers.js';

const token = localStorage.getItem('token');

export function searchCustomer(formGetCustomer, modal) {

    formGetCustomer.addEventListener('submit', async (e) => {
        e.preventDefault();

        const customerInfo = Object.fromEntries(new FormData(formGetCustomer));
        const respuesta = await fetch(`http://localhost:8080/api/customer?name=${customerInfo.name}&customerOf=${customerInfo.customerOf}&type=${customerInfo.type}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const content = await respuesta.json();

        if (content.error) {
            modalWatch(`${content.error}`, 'error');
            modal.classList.add('modal--show');
            setTimeout(() => {
                modal.classList.remove('modal--show');
                window.location.reload();
            }, 3000);
        };

        if (content.data) {
            getShowCustomer(content.data, modal);
        };
    });
};