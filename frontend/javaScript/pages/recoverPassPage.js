import modalWatch from "../utils/modal.js";

const logoBase = document.querySelector('#logoBase');
logoBase.addEventListener('click', () => window.location.href = 'basePage.html');

const url = window.location.href;
const urlParams = new URLSearchParams(new URL(url).search);
const token = urlParams.get('token');

const modal = document.querySelector('.modalRegister');
const formRecPass = document.querySelector('#formRecPass');

formRecPass.addEventListener('submit', async (e) => {

    e.preventDefault();
    const userPass = Object.fromEntries(new FormData(formRecPass));

    if (userPass.password === userPass.passConfirmation) {

        const response = await fetch('http://localhost:8080/api/user/new_password', {
            method: 'PUT',
            body: JSON.stringify(userPass),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
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
            modalWatch('Cambio de contraseña exitoso');
            modal.classList.add('modal--show');
            setTimeout(() => {
                modal.classList.remove('modal--show');
                window.location.replace('loginPage.html');
            }, 3000);
        };

    } else {

        modalWatch('La contraseña ingresada en ambos campos no son iguales', 'error');
        modal.classList.add('modal--show');
        setTimeout(() => {
            modal.classList.remove('modal--show');
            window.location.reload();
        }, 3000);
    };
});