import { url } from '../../../utils/variables.js';
import modalWatch from '../../../utils/modal.js';

export function addBottleLogic(formBottle, modal) {

    const token = localStorage.getItem('token');

    formBottle.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(formBottle));
        
        const response = await fetch(`${url}/api/bottle`, {
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
            modalWatch('Acción creada correctamente');
            modal.classList.add('modal--show');
            setTimeout(() => {
                modal.classList.remove('modal--show');
                window.location.reload();
            }, 3000);
        };
    });
};