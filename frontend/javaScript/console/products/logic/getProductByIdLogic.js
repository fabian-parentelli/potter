export async function getProductById(id) {

    const token = localStorage.getItem('token');

    const response = await fetch(`http://localhost:8080/api/product/id/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    });

    const content = await response.json(); 
    return content.data;
};