import { vewLogicProduct } from '../logic/vewProduct.js';

export async function vewProduct(modal) {
    
    consoleBody.innerHTML = '';

    const products = await vewLogicProduct();

    products.data.forEach((product) => {

        const stockColor = colorStock(product.stock);
        const assetColor = (product.asset === false) ? '#9c0720' : '#00bfa5';
        
        const div = document.createElement('div');
        div.className = 'vewProducts';
        div.innerHTML = `
            <div class='vewProducts_vew'>
                <p class='name'>${product.name}</p>
                <div>
                    <img src=${product.imgUrl}>
                    <p><span>Tamaño:</span> ${product.size}cc</p>
                    <p><span>Costo:</span> $${product.cost}</p>
                    <p><span>Both:</span> $${product.bothPrice}</p>
                    <p><span>Mayorista:</span> $${product.bigPrice}</p>
                    <p><span>Minorista:</span> $${product.smallPrice}</p>
                    <p id='stock' style='background-color: ${stockColor}'><span>Stock:</span> $${product.stock}</p>
                    <button class='asset' id=${product._id} style='background-color: ${assetColor}'>
                        ${product.asset}
                    </button>
                </div>
            </div>
        `;
        consoleBody.appendChild(div);
    });
};

function colorStock (stock) {
    
    if(stock < 12 && stock > 6) {
        return '#bea74b';
    } else if(stock <= 6 && stock > 0){
        return 'orange'
    } else if(stock === 0) {
        return '#ff6c3e'
    } else {
        return '';
    };
};