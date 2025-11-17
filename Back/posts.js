
import { subscribeGETEvent,subscribePOSTEvent,realTimeEvent,startServer } from "soquetic";

import { InicioSesion } from "./FUNCIONES.js";
import { Registro } from "./FUNCIONES.js";
import { Comentario } from "./FUNCIONES.js";
import { FiltrarZapatillas } from "./FUNCIONES.js"; 
import { BuscarZapatilla } from "./FUNCIONES.js"; 
import { CalcularRecomendaciones } from "./FUNCIONES.js";


subscribePOSTEvent("iniciarsesion", InicioSesion);
subscribePOSTEvent("registro", Registro);
subscribePOSTEvent("Comentario", Comentario);
subscribePOSTEvent("filtrarZapatillas", FiltrarZapatillas);
subscribePOSTEvent("buscarZapatilla", BuscarZapatilla);
subscribePOSTEvent("calcularRecomendaciones", CalcularRecomendaciones)

startServer(3000);
