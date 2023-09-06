import { currentFind } from "../utils/current.js";

const current = document.querySelector('#current');
const terminalBtn = document.querySelector('#current button');

export async function currentShow() {

    const user = await currentFind();

    if(user) {
        const newP = document.createElement('p');
        newP.textContent = `Hola ${user.name} bienvenido/a.`;
        current.insertBefore(newP, current.firstChild);

        if(user.role === 'admin') terminalBtn.style.display = 'block';
    };
};