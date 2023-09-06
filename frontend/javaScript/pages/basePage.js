import { sessionOnOff } from "../nav.js";
import { currentShow } from '../basePage/currentVew.js';

window.addEventListener('DOMContentLoaded', () => {
    sessionOnOff(); // Boton de iniciar o cerrar sesión.
    currentShow();  // Muestra Nobre del usuario conectado y Boton de terminal.
});