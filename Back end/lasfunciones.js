import fs from "fs";

let iniciado
let encontrado
let contraseña

function InicioSesión(Data)
{
    
  for (let i =0; i<registro.length;i++)
  {
      if (data.NOMBRE === registro[i].NOMBRE && data.APELLIDO === registro[i].APELLIDO && data.CONTRASENA === registro[i].CONTRASENA)
      {
          console.log ("Has iniciado sesión correctamente")
          encontrado = true
          logueado = true
          contra=true 
          UsuarioR = registro[i] 
      } else if (data.NOMBRE === registro[i].NOMBRE && data.APELLIDO === registro[i].APELLIDO && data.CONTRASENA != registro[i].CONTRASENA)
      {
          console.log ("La contraseña es incorrecta")
          encontrado = true
          logueado = false
          contra=false
      } else if (data.NOMBRE != registro[i].NOMBRE || data.APELLIDO != registro[i].APELLIDO)
      {
          encontrado = false
          logueado = false
          console.log ("No existe un usuario con esos datos")
          contra=false
      }

  }
}