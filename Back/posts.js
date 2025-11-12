
import { subscribeGETEvent, subscribePOSTEvent, realTimeEvent, startServer} from "soquetic";

import {InicioSesion} from "./FUNCIONES.js";
import {Registro} from "./FUNCIONES.js";
import {Comentario} from "./FUNCIONES.js";


subscribePOSTEvent ("iniciarsesion", InicioSesion);
subscribePOSTEvent ("registro", Registro);
subscribePOSTEvent ("Comentario", Comentario)

startServer();