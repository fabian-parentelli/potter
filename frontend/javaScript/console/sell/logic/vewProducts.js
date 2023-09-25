
const token = localStorage.getItem('token');

export async function vewProductSell(pid) {

    const response = await fetch(`http://localhost:8080/api/product/id/${pid}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

    const content = await response.json();
    return content.data;
};