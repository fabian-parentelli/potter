const formRegister = document.getElementById('formRegister');
const modal = document.querySelector('.modalRegister');

formRegister.addEventListener('submit', (e) => {
    e.preventDefault();
    const userInfo = Object.fromEntries(new FormData(formRegister));

    fetch('http://localhost:8080/api/sessions/register', {
        method: 'POST',
        body: JSON.stringify(userInfo),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result => {
        if(result.status === 200) {
            modal.classList.add('modal--show');
            
            setInterval(() =>   {
                modal.classList.remove('modal--show');    
                window.location.replace('/front/pages/basePage.html');
            }, 3000);
        };
    });
}); 


const logoBase = document.querySelector('#logoBase');
logoBase.addEventListener('click', () => {
    window.location.href = 'basePage.html'
})