let iniciosesion=document.getElementById("iniciosesion");

iniciosesion.addEventListener("click", () => {
postEvent("iniciarsesion", {
  Nombre: document.getElementById("nombre").value,
  Contraseña: document.getElementById("contraseña").value
}, comprobaciondedatos);

});
function comprobaciondedatos(data) {
    let logueado = data[0];
    let encontrado = data[1];
    let contraseña = data[2];
    if (logueado === true && encontrado === true && contraseña === true) {
        alert("Has iniciado sesión correctamente");
    }
    else if (encontrado === true && contraseña === false && logueado === false) {
    alert("La contraseña es incorrecta");
  }
  else if (encontrado === false) {
    alert("No se ha encontrado una cuenta con ese nombre");
  }

}


function login() {
    let usuario = document.getElementById("nombre").value;
    let clave = document.getElementById("contraseña").value;
  
    if (usuario === usuarioCorrecto && clave === claveCorrecta) {
      document.getElementById("mensaje").innerText = "¡bien ahi wacho!";
      window.location.href = "../wireframe_3/html3.html"
    } else {
      document.getElementById("mensaje").innerText = "Usuario o contraseña incorrectos.";
    }
}