import { vewCartShow } from '../show/vewCartShow.js';

const token = localStorage.getItem('token');

export function callCart(btn, consoleBody) {
    consoleBody.innerHTML = '';

    btn.addEventListener('click', async (e) => {
        e.preventDefault();

        const cart = localStorage.getItem('cart');

        const response = await fetch(`http://localhost:8080/api/cart/${cart}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        const content = await response.json();

        if (content.data.status === 'success') {
            vewCartShow(content.data.cart, consoleBody);
        };
    });
};

export async function getCustomer() {

    const id = localStorage.getItem('cart')

    const respuesta = await fetch(`http://localhost:8080/api/customer/cart/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    const content = await respuesta.json();
    return content.data;
};