import { url } from '../../../utils/variables.js';
import { vewBottleModify } from '../show/modifyBottle.js';
import modalWatch from '../../../utils/modal.js';

const token = localStorage.getItem('token');

export function findAdminBottle(form, modal) {

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        consoleFooter.innerHTML = '';
        const formData = Object.fromEntries(new FormData(form));

        const response = await fetch(`${url}/api/bottle/${formData.admin}`, {
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

        content.data && vewBottleModify(content.data, modal);
    });
};

export function bottleModify(form, admin, modal) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(form));

        const result = { products: [], credit: [] };

        for (const key in formData) {
            if (key.startsWith("credProduct") || key.startsWith("credQuantity")) {
                const index = key.match(/\d+/)[0];
                if (!result.credit[index]) {
                    result.credit[index] = {};
                }
                result.credit[index][key] = formData[key];
            } else if (key.startsWith("prodProduct") || key.startsWith("prodQuantity")) {
                const index = key.match(/\d+/)[0];
                if (!result.products[index]) {
                    result.products[index] = {};
                }
                result.products[index][key] = formData[key];
            }
        }
        result.products = result.products.filter(item => item);
        result.credit = result.credit.filter(item => item);

        const response = await fetch(`${url}/api/bottle/${admin}`, {
            method: 'PUT',
            body: JSON.stringify(result),
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
            modalWatch('Acción creada correctamente');
            modal.classList.add('modal--show');
            setTimeout(() => {
                modal.classList.remove('modal--show');
                window.location.reload();
            }, 3000);
        };
    });
};
