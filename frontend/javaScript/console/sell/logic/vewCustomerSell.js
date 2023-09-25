import { currentFind } from '../../../utils/current.js';
import modalWatch from '../../../utils/modal.js';
import { vewCustomer } from '../show/vewCustomer.js';

const token = localStorage.getItem('token');

export function searchCustomerSell(formGetCustomerSell, consoleMain, modal) {

    formGetCustomerSell.addEventListener('submit', async (e) => {

        e.preventDefault();
        const customerInfo = Object.fromEntries(new FormData(formGetCustomerSell));

        const admin = await currentFind();

        const response = await fetch(`http://localhost:8080/api/customer?name=${customerInfo.name}&customerOf=${admin.name}&type=${customerInfo.type}`, {
            method: 'GET',
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

        vewCustomer(content.data);
    });
};