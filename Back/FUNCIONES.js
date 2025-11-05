import fs from "fs";

function Registro(Data) {
    let usuarios = [];
    const { nombre, contrasena } = Data
    usuarios = JSON.parse(fs.readFileSync("UsuariosRegistrados.json", "utf-8"))
    
    let usuarioexistente = false
    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].nombre === nombre) {
            usuarioexistente = true;
            break;
        }
        else {
            usuarioexistente = false;
            
        }
    }
    if (usuarioexistente === true) {
        return { success: false, message: " El usuario ya existe." }
    }

    else if (usuarioexistente === false) {
        usuarios.push({ Nombre: nombre, Contraseña: contrasena });
        fs.writeFileSync("UsuariosRegistrados.json", JSON.stringify(usuarios, null, 2));
        return { success: true, message: "Le damos la bienvenida a nuestro selector de zapatillas", usuarios };
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

function Filtradozapatillas(Data) {
    
}
export { Filtradozapatillas }
