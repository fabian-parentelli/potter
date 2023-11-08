import modalWatch from "../../../utils/modal.js";

export function transferInvLogic(modal, form) {

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = Object.fromEntries(new FormData(form));
        const token = localStorage.getItem('token');
        
        const response = await fetch('http://localhost:8080/api/inventory', {
            method: 'PUT',
            body: JSON.stringify(formData),
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
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
            modalWatch('Transferencia exitosa');
            modal.classList.add('modal--show');
            setTimeout(() => {
                modal.classList.remove('modal--show');
                window.location.reload();
            }, 3000);
        };
    });
};