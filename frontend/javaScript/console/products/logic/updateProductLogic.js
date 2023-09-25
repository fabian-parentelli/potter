import modalWatch from '../../../utils/modal.js';

const token = localStorage.getItem('token');

// Buscar el producto.
export function updateProductLogic(searchProduct, modal) {

    searchProduct.addEventListener('submit', async (e) => {

        e.preventDefault();
        const name = document.querySelector('#searchProduct [name="name"]').value;

        const response = await fetch(`http://localhost:8080/api/product/${name}`, {
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
            import('../show/productUpdate.js').then((module) => {
                const showUpdateProduct = module.showUpdateProduct;
                showUpdateProduct(content.data, modal);
            });
        };
    });
};

// Llenar los campos del formulario
export function completeValues(formUpdateProduct, data) {
    formUpdateProduct.querySelector('[name="name"]').value = data.name;
    formUpdateProduct.querySelector('[name="size"]').value = data.size;
    formUpdateProduct.querySelector('[name="cost"]').value = data.cost;
    formUpdateProduct.querySelector('[name="bothPrice"]').value = data.bothPrice;
    formUpdateProduct.querySelector('[name="bigPrice"]').value = data.bigPrice;
    formUpdateProduct.querySelector('[name="smallPrice"]').value = data.smallPrice;
};

// Actualizar el producto
export function updateProductServer(formUpdateProduct, modal) {
    formUpdateProduct.addEventListener('submit', async (e) => {

        e.preventDefault();
        const formData = new FormData(formUpdateProduct);

        const response = await fetch('http://localhost:8080/api/product', {
            method: 'PUT',
            body: formData,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const content = await response.json();
        console.log(content);

        if (content.error) {
            modalWatch(`${content.error}`, 'error');
            modal.classList.add('modal--show');
            setTimeout(() => {
                modal.classList.remove('modal--show');
                window.location.reload();
            }, 3000);
        };

        if (content.data.status === 'success') {
            modalWatch('Producto agregado correctamente');
            modal.classList.add('modal--show');
            setTimeout(() => {
                modal.classList.remove('modal--show');
                window.location.replace('consola.html');
            }, 3000);
        };
    });
}