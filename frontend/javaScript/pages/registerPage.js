import modalWatch from "../utils/modal.js";

const logoBase = document.querySelector('#logoBase');
const formRegister = document.querySelector('#formRegister');
const modal = document.querySelector('.modalRegister');

formRegister.addEventListener('submit', async (e) => {

    e.preventDefault();
    const user = Object.fromEntries(new FormData(formRegister));

    const response = await fetch('http://localhost:8080/api/user/register', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    const content = await response.json();

    if(content.error) {
        modalWatch(content.error, 'asset');
        modal.classList.add('modal--show');
        setTimeout(() => {
            modal.classList.remove('modal--show');
            window.location.reload();
        }, 3000);
    };

    if (content.data.status === 'success') {
        modalWatch('El registro fué exitoso');
        modal.classList.add('modal--show');
        setTimeout(() => {
            modal.classList.remove('modal--show');
            window.location.replace('basePage.html');
        }, 3000);
    };
});

logoBase.addEventListener('click', () =>  window.location.href = 'basePage.html');