const token = localStorage.getItem('token');

export function productNewLogic(formNewProduct) {

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

        const contain = await response.json();
        console.log(contain);
    });
};