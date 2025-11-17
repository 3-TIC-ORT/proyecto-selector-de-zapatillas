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
    let usuarioSesion = usuarios.find((usuario) => Data.Nombre === usuario.Nombre && Data.Contraseña === usuario.Contraseña)

    if(usuarioSesion !== undefined) {
        return { ok: true, info: "Login Exitoso"}
    }
    else {
        return { ok: false, info: "Login Fallido" }
    }
}
export { InicioSesion };


function Comentario(Data) {
    let usuario = Data.Nombre
    let comentario = Data.crearcomentario

    const DATA_FILE = path.resolve(process.cwd(), 'Comentarios.json');
  if (!Data || !comentario || !usuario) {
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


function FiltrarZapatillas(Data) {

    let zapatillas = JSON.parse(fs.readFileSync("zapatillas.json", "utf-8"));

    let resultado = zapatillas.filter((z) => {

        let coincideColor =
            Data.color === "Cualquiera" ||
            z.Color.toLowerCase() === Data.color.toLowerCase();

        let coincideMarca =
            Data.marca === "Cualquiera" ||
            z.Marca.toLowerCase() === Data.marca.toLowerCase();

        let coincideTipo =
            Data.tipo === "Cualquiera" ||
            (z.Tipo && z.Tipo.toLowerCase() === Data.tipo.toLowerCase());

        let precioNum = parseFloat(z.Precio.replace("$", ""));
        let coincidePrecio = true;

        switch (Data.precio) {
            case "k": coincidePrecio = precioNum < 50; break;
            case "kk": coincidePrecio = precioNum >= 50 && precioNum < 100; break;
            case "kkk": coincidePrecio = precioNum >= 100 && precioNum < 150; break;
            case "kkkk": coincidePrecio = precioNum >= 150 && precioNum < 200; break;
            case "kkkkk": coincidePrecio = precioNum >= 200 && precioNum < 250; break;
            case "kkkkkk": coincidePrecio = precioNum >= 250; break;
        }

        return coincideColor && coincideMarca && coincideTipo && coincidePrecio;
    });

    return resultado;
}

export { FiltrarZapatillas };


function BuscarZapatilla(Data) {
  
  let zapatillas = JSON.parse(fs.readFileSync("zapatillas.json", "utf-8"));

  const query = (Data.nombre || "").toString().trim().toLowerCase();
  if (!query) return [];

  const resultados = zapatillas.filter((z) => {
      const nombre = (z.Nombre || "").toString().toLowerCase();
      const marca = (z.Marca || "").toString().toLowerCase();
      const color = (z.Color || "").toString().toLowerCase();

      return (
          (nombre && nombre.includes(query)) ||
          (marca && marca.includes(query)) ||
          (color && color.includes(query))
      );
  });

  return resultados;
}

export { BuscarZapatilla };