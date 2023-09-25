
export async function vewLogicProduct() {

    const token = localStorage.getItem('token');

    const response = await fetch('http://localhost:8080/api/product', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const content = await response.json(); 
    return content;
};