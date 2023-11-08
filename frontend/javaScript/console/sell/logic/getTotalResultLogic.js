
export async function getTotalResultLogic(cid, uid) {

    const token = localStorage.getItem('token');

    const response = await fetch(`http://localhost:8080/api/cart/${cid}/user/${uid}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const content = await response.json(); 
    return content.data;
};