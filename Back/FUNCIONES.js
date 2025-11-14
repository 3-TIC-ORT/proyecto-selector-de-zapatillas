import fs from "fs";
import path from "path";


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


function Comentario(Data) {
    let usuario = Data.NOMBRE
    let comentario = Data.crearcomentario

    const DATA_FILE = path.resolve(process.cwd(), 'Comentarios.json');
  if (!Data || !Data.crearcomentario || !Data.NOMBRE) {
    return { success: false, error: 'Faltan campos: "crearcomentario" y "NOMBRE" son requeridos.' };
  }


  let comentarios = [];
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    comentarios = JSON.parse(raw);
    if (!Array.isArray(comentarios)) comentarios = [];
  } catch (err) {
    if (err.code !== 'ENOENT') {
      return { success: false, error: 'Error al leer el archivo: ' + err.message };
    }
  }

  const comentarioNuevo = {
    Mensaje: comentario,
    Autor: usuario
  };

  comentarios.push(comentarioNuevo);

  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(comentarios, null, 2), 'utf8');
  } catch (err) {
    return { success: false, error: 'Error al escribir el archivo: ' + err.message };
  }

  return { success: true, mensaje: 'Comentario guardado', comentario: comentarioNuevo };
}

export { Comentario };
