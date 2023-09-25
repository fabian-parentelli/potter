async function newCustomer(customer) {

    let rolUser 
    if(customer.type == 'small') {
        rolUser = 'Minorista'
    } else {
        rolUser = 'Mayorista'
    };

    const emailRegister = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Registro Exitoso</title>
            <style>
                /* Estilos aquí */
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Registro Exitoso</h1>
                </div>
                <div class="content">
                    <p>¡Hola <strong>${customer.name}</strong>!</p>
                    <p>Tu registro en nuestro sitio ha sido exitoso. Aquí están los detalles de tu cuenta:</p>
                    <ul>
                        <li><strong>Nombre:</strong> ${customer.name}</li>
                        ${customer.address !== undefined ? `<li>Dirección: ${customer.address}</li>` : ''}
                        <li><strong>Teléfono:</strong> ${customer.phone}</li>
                        <li><strong>Tipo:</strong> ${rolUser}</li>
                        <li><strong>Correo Electrónico:</strong> ${customer.email}</li>
                    </ul>
                    <p>¡Gracias por unirte a nosotros!</p>
                </div>
                <div class="footer">
                    <p>No responda a este correo electrónico. Este es un mensaje automático.</p>
                </div>
            </div>
        </body>
        </html>
    `;
    return emailRegister;
};

export { newCustomer };