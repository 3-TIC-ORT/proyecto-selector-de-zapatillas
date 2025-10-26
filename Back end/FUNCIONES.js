import fs from "fs";

let registro = JSON.parse(fs.readFileSync("UsuariosRegistrados.json", "utf-8"));
let usuarios = JSON.parse(fs.readFileSync("UsuariosRegistrados.json", "utf-8"));

let iniciado = null
let encontrado = null
let contraseña = null
let usuarioregistrado = null
let usuarioexistente = null

function Registro(Data) 
{
    for (let i = 0; i < usuarios.length; i++) {
      if (usuarios[i].Nombre_del_usuario === Data.Nombre) {
        usuarioexistente = true;
        break;
      }
    }
    if (usuarioexistente === true) {
       return { success: false, message: " El usuario ya existe."}
    }
    else if (usuarioexistente === false)  {
      usuarios.push({ "Nombre_del_usuario": Data.Nombre, "Contraseña": Data.Contraseña });
    fs.writeFileSync("UsuariosRegistrados.json", JSON.stringify(usuarios, null, 2));
    return { success: true, message: "Le damos la bienvenida a nuestro selector de zapatillas" };
    }
  }
export {Registro}

function InicioSesion(Data)
{
  for (let i =0; i<registro.length;i++)
  {
      if (Data.Nombre === registro[i].Nombre && Data.Contraseña === registro[i].Contraseña)
      {
          console.log ("Has iniciado sesión correctamente")
          encontrado = true
          iniciado = true
          contraseña=true
          usuarioregistrado = registro[i]
      } else if (Data.Nombre === registro[i].Nombre && Data.Contraseña != registro[i].Contraseña)
      {
          console.log ("La contraseña es incorrecta")
          encontrado = true
          iniciado = false
          contraseña=false
      } else if (Data.Nombre != registro[i].Nombre)
      {
          console.log ("No existe un usuario con ese nombre")
          encontrado = false
          iniciado = false
          contraseña=false
      }
  } 
    return [iniciado,encontrado,contraseña,usuarioregistrado]
}
export {InicioSesion};

