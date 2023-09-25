
export default async function createNewCart() {

    const response = await fetch('http://localhost:8080/api/cart', {
        method: 'POST',
    });
    const content = await response.json();
    localStorage.setItem('cart', content.data.cart._id); 
};