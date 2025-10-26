subscribePOSTEvent ("iniciarsesion", InicioSesion);
subscribePOSTEvent ("registro", Registro);
import {InicioSesion} from "./FUNCIONES.js";
import {Registro} from "./FUNCIONES.js";

import { subscribeGETEvent, subscribePOSTEvent, realTimeEvent, startServer } from "soquetic";