import modalWatch from '../../../utils/modal.js';

const token = localStorage.getItem('token');

export function productNewLogic(formNewProduct, modal) {

    formNewProduct.addEventListener('submit', async (e) => {

        e.preventDefault();
        const formData = new FormData(formNewProduct);

        const response = await fetch('http://localhost:8080/api/product', {
            method: 'POST',
            body: formData,
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
            modalWatch('Producto agregado correctamente');
            modal.classList.add('modal--show');
            setTimeout(() => {
                modal.classList.remove('modal--show');
                window.location.replace('consola.html');
            }, 3000);
        };
    });
};