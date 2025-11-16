
import { 
    subscribeGETEvent,
    subscribePOSTEvent,
    realTimeEvent,
    startServer
} from "soquetic";

import { InicioSesion } from "./FUNCIONES.js";
import { Registro } from "./FUNCIONES.js";
import { Comentario } from "./FUNCIONES.js";
import { FiltrarZapatillas } from "./FUNCIONES.js";   // ← tu nueva función importada


// === EVENTOS DE USUARIO ===
subscribePOSTEvent("iniciarsesion", InicioSesion);

subscribePOSTEvent("registro", Registro);

subscribePOSTEvent("Comentario", Comentario);


// === FILTRO DE ZAPATILLAS ===
// Igual que tu ejemplo: el nombre del evento y la función directamente
subscribePOSTEvent("filtrarZapatillas", FiltrarZapatillas);


// === Servidor ===
startServer(3000);
