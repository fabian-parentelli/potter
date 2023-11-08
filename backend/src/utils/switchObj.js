
export function userPrice(type) {

    const typePrice = {
        'big': () => { return 'bigPrice' },
        'small': () => { return 'smallPrice' },
        'default': () => { return 'bothPrice' }
    };

    return (typePrice[type] || typePrice['default'])();
};