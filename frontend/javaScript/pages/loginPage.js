import modalWatch from "../utils/modal.js";

const logoBase = document.querySelector('#logoBase');
logoBase.addEventListener('click', () => window.location.href = 'basePage.html');

const modal = document.querySelector('.modalRegister');
const formLogin = document.querySelector('#formLogin');

// **** Inicio de sesión **** // 
formLogin.addEventListener('submit', async (e) => {

    e.preventDefault();
    const user = Object.fromEntries(new FormData(formLogin));

    const response = await fetch('http://localhost:8080/api/user/login', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Accept': 'application/json',
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
        localStorage.setItem('token', content.data.accesToken);

        modalWatch('El login fué exitoso');
        modal.classList.add('modal--show');
        setTimeout(() => {
            modal.classList.remove('modal--show');
            window.location.replace('basePage.html');
        }, 3000);
    };
});

// **** Recover password **** // 
const recPass = document.querySelector('#recPass');

recPass.addEventListener('submit', async (e) => {
    e.preventDefault();
    const user = Object.fromEntries(new FormData(recPass));

    const response = await fetch('http://localhost:8080/api/user/recover_password', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Accept': 'application/json',
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

        modalWatch('Dirígete a tu casilla de email');
        modal.classList.add('modal--show');
        setTimeout(() => {
            modal.classList.remove('modal--show');
            window.location.reload();
        }, 3000);
    };
});