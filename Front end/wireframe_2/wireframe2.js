import { subscribeGETEvent, subscribePOSTEvent, realTimeEvent, startServer, connect2server} from "soquetic";
connect2server()

let iniciosesion=document.getElementById("iniciosesion");

iniciosesion.addEventListener("click", () => {
postEvent("iniciarsesion", {
  Nombre: document.getElementById("nombre").value,
  Contraseña: document.getElementById("contrasena").value
}, comprobardatos);

});
function comprobardatos(data) {
    let logueado = data[0];
    let encontrado = data[1];
    let contrasena = data[2];
    if (logueado === true && encontrado === true && contrasena === true) {
        alert("Has iniciado sesión correctamente");
        window.location.href = "../wireframe_3/html3.html";
    }
    else if (encontrado === true && contrasena === false && logueado === false) {
    alert("La contraseña es incorrecta");
  }
  else if (encontrado === false) {
    alert("No se ha encontrado una cuenta con ese nombre");
  }

}
