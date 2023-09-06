const modalRegister = document.querySelector('.modalRegister');

export default function modalWatch(mesagge, asset) {

    let logo
    if (!asset) {
        logo = "https://res.cloudinary.com/do1chpjor/image/upload/v1692302883/asset/ec1rzz3kslwwzqfynjwt.png";
    } else {
        logo = "https://res.cloudinary.com/do1chpjor/image/upload/v1692302892/asset/hm7eduvla5lsjawgguwe.png";
    };

    const modal = document.createElement('div');
    modal.className = 'modal_container';
    modal.innerHTML = `
        <h3>${mesagge}...</h3>
        <img src=${logo}>
        <div class="spinnerRegister">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
            </div>
        <p>Volvemos a la página...</p>
    `;
    modalRegister.appendChild(modal);
};