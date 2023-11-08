export async function getByIdCustomer(id) {

    const token = localStorage.getItem('token');

    const respuesta = await fetch(`http://localhost:8080/api/customer/id/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    const content = await respuesta.json();
    return content.data;
};