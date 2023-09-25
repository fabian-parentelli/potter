import { vewCartShow } from '../show/vewCartShow.js';

const cart = localStorage.getItem('cart');
const token = localStorage.getItem('token');

export function callCart(btn, consoleBody) {
    consoleBody.innerHTML = '';

    btn.addEventListener('click', async (e) => {
        e.preventDefault();

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

export async function getCustomer(id) {

    console.log(id);

    const respuesta = await fetch(`http://localhost:8080/api/customer/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    const content = await respuesta.json();
    console.log(content);
};