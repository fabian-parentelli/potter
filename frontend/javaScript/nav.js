const inicialSesion = document.querySelector('#inicialSesion');
const closeSession = document.querySelector('#closeSession');

export function sessionOnOff() {

    const token = localStorage.getItem('token');

    // Abrir o cerrar sesión.
    if (!token) {
        closeSession.style.display = 'none';
        inicialSesion.style.display = 'block';
    } else {
        closeSession.style.display = 'flex';
        inicialSesion.style.display = 'none';
    };

    // Cerrar sesión.
    if (closeSession && getComputedStyle(closeSession).display === 'flex') closeBotton();
};

function closeBotton() {
    closeSession.addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location.reload();
    });
};