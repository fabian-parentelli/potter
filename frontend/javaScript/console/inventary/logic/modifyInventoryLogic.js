import { showModifyInv } from '../show/modifyInventory.js'
import modalWatch from '../../../utils/modal.js';

const token = localStorage.getItem('token');

export async function getModiofyInventory(form, modal) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = Object.fromEntries(new FormData(form));
        const response = await fetch(`http://localhost:8080/api/inventory/${formData.name}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const content = await response.json();
        showModifyInv(content.data, modal);
    });
};

export async function putModifyInv(admin ,form, modal) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = Object.fromEntries(new FormData(form));

        const response = await fetch(`http://localhost:8080/api/inventory/${admin}`, {
            method: 'PUT',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const content = await response.json();

        if (content.data.status === 'success') {
            modalWatch('Modificación completada');
            modal.classList.add('modal--show');
            setTimeout(() => {
                modal.classList.remove('modal--show');
                window.location.replace('consola.html');
            }, 3000);
        };
    });
}