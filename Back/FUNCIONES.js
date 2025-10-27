import fs from "fs";


let usuarioexistente = null


function Registro(Data) {
    usuarioexistente = false
    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].Nombre_del_usuario === Data.Nombre) {
            usuarioexistente = true;
            break;
        }
    }
    if (usuarioexistente === true) {
        return { success: false, message: " El usuario ya existe." }
    }
    else if (usuarioexistente === false) {
        usuarios.push({ "Nombre_del_usuario": Data.Nombre, "Contraseña": Data.contrasena });
        fs.writeFileSync("UsuariosRegistrados.json", JSON.stringify(usuarios, null, 2));
        return { success: true, message: "Le damos la bienvenida a nuestro selector de zapatillas" };
    }
}
export { Registro }

function InicioSesion(Data) {
    let usuarios = []
    usuarios = JSON.parse(fs.readFileSync("UsuariosRegistrados.json", "utf-8"));
    let usuarioSesion = null;
    usuarioSesion = usuarios.find((usuario) => Data.Nombre === usuario.Nombre && Data.Contraseña === usuario.Contraseña)

    if(usuarioSesion !== undefined) {
        return { ok: true, info: "Login Exitoso"}
    }
    else {
        return { ok: false, info: "Login Fallido" }
    }
}
export { InicioSesion };

class Zapatilla {
    constructor(marca, nombre, color, talle, precio, tipo, imagen) {
        this.marca = marca;
        this.nombre = nombre;
        this.color = color;
        this.talle = talle;
        this.precio = precio;
        this.tipo = tipo;
        this.imagen = imagen;
    }
}


let zapatillas = [
    new Zapatilla("Nike", "Air Max", "negro", 42, 75000, "deportivas", "../imagenes/zapatillas/airmax.jpg"),
    new Zapatilla("Adidas", "Superstar", "blanco", 39, 65000, "casual", "../imagenes/zapatillas/superstar.jpg"),
    // Faltan agregar zapatillas aca
];


function obtenerRangoPrecio(precio) {
    if (precio <= 50000) return "0-50K";
    if (precio <= 100000) return "50K-100K";
    if (precio <= 150000) return "100K-150K";
    if (precio <= 200000) return "150K-200K";
    if (precio <= 250000) return "200K-250K";
    return "250K+";
}

function filtrarZapatillas(filtros) {
    let zapatillasFiltradas = zapatillas.filter(zapatilla => {
        let cumpleFiltros = true;

        if (filtros.marca && filtros.marca !== 'Cualquiera') {
            cumpleFiltros = cumpleFiltros && zapatilla.marca.toLowerCase() === filtros.marca.toLowerCase();
        }

        if (filtros.color && filtros.color !== 'Cualquiera') {
            cumpleFiltros = cumpleFiltros && zapatilla.color.toLowerCase() === filtros.color.toLowerCase();
        }

        if (filtros.talle && filtros.talle !== 'Cualquiera') {
            cumpleFiltros = cumpleFiltros && zapatilla.talle === parseInt(filtros.talle);
        }

        if (filtros.rangoPrecio && filtros.rangoPrecio !== 'Cualquiera') {
            cumpleFiltros = cumpleFiltros && obtenerRangoPrecio(zapatilla.precio) === filtros.rangoPrecio;
        }

        if (filtros.tipo && filtros.tipo !== 'Cualquiera') {
            cumpleFiltros = cumpleFiltros && zapatilla.tipo.toLowerCase() === filtros.tipo.toLowerCase();
        }

        return cumpleFiltros;
    });

    return zapatillasFiltradas;
}

export { filtrarZapatillas };

