
export async function endSell(bottle, cart, user, pay) {

    const token = localStorage.getItem('token');
    const sale = { bottle, user, cart, pay };

    const response = await fetch('http://localhost:8080/api/cart/purchase', {
        method: 'POST',
        body: JSON.stringify(sale),
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
};