import { sessionOnOff } from "../nav.js";
import { currentShow } from '../basePage/currentVew.js';
import { getAllProducts } from '../basePage/getProducts.js';

window.addEventListener('DOMContentLoaded', () => {
    sessionOnOff(); // Boton de iniciar o cerrar sesión.
    currentShow();  // Muestra Nobre del usuario conectado y Boton de terminal.
    getAllProducts(); // Obtiene los productos.
});