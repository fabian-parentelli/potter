const token = localStorage.getItem('token');

export async function getInventary() {

    const response = await fetch(`http://localhost:8080/api/inventory`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    const content = await response.json();
    if(content.data.status === 'success') return content.data.result;
};

export async function getInventaryDoc() {
    const token = localStorage.getItem('token');

    const response = await fetch(`http://localhost:8080/api/inventorydoc`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    const content = await response.json();
    return content.data;
};
