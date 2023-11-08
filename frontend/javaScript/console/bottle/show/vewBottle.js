import { vewBottleLogic } from '../logic/vewBottleLogic.js';

export async function vewBottle() {
    consoleBody.innerHTML = '';
    consoleFooter.innerHTML = '';

    const bottles = await vewBottleLogic();
    const divContBottle = document.createElement('div');
    divContBottle.className = 'divContBottle';
    consoleBody.appendChild(divContBottle);

    bottles.forEach((bot) => {
        const div = document.createElement('div');
        div.className = 'divBottle';
        div.innerText = bot.admin === 'treasure' ? 'tesoro' : bot.admin;
        divContBottle.appendChild(div);

        bot.products.forEach((prod) => {
            const divPro = document.createElement('div');
            divPro.className = 'divPro';
            divPro.innerHTML = `
                <p>En existencia</p>
                <p>Tipo: ${prod.product}</p>
                <p>Unid: ${prod.quantity}</p>
            `;
            div.appendChild(divPro);
        });

        bot.credit && bot.credit.forEach((cred) => {
            const divCre = document.createElement('div');
            divCre.className = 'divCre';
            divCre.innerHTML = `
                <p>En faltante</p>
                <p>Tipo: ${cred.product}</p>
                <p>Unid: ${cred.quantity}</p>
            `;
            div.appendChild(divCre);
        });
    }); 
};