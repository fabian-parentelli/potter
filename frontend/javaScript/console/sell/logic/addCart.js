const token = localStorage.getItem('token');

export function addproductToCart(pid, uid, formSellProduct, div) {
    
    formSellProduct.addEventListener('submit', async (e) => {
        
        e.preventDefault();
        const customerInfo = Object.fromEntries(new FormData(formSellProduct));
        const cart = localStorage.getItem('cart');
        
        customerInfo.cart = cart;
        customerInfo.pid = pid;
        customerInfo.uid = uid;

        const response = await fetch('http://localhost:8080/api/cart/add', {
            method: 'POST',
            body: JSON.stringify(customerInfo),
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        const content = await response.json();
        if(content.data.acknowledged === true) {
            div.remove();
        };
    });  
};