const logoBase = document.querySelector('#logoBase');
const modal = document.querySelector('.modalRegister');

const formLogin = document.querySelector('#formLogin');
formLogin.addEventListener('submit', (e) => {
    e.preventDefault();
    const userInfo = Object.fromEntries(new FormData(formLogin));

    fetch('http://localhost:8080/api/sessions/login', {
        method: 'POST',
        body: JSON.stringify(userInfo),
        headers: { 'Content-Type':'application/json' },
        credentials: 'include',

    }).then(result => {
        if(result.status === 200) {
            modal.classList.add('modal--show');
            console.log(result);
            
            setInterval(() =>   {
                modal.classList.remove('modal--show');    
                // window.location.replace('/front/pages/basePage.html');
            }, 3000);
        };
    });
});

logoBase.addEventListener('click', () => {
    window.location.href = 'basePage.html'
});