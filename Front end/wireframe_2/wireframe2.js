connect2Server()

let iniciosesion=document.getElementById("iniciosesion");

iniciosesion.addEventListener("click", () => {
const usuarioLoguearse = {
  Nombre: document.getElementById("nombre").value,
  Contraseña: document.getElementById("contrasena").value
}
postEvent("iniciarsesion", usuarioLoguearse , (res) => {
  if (res && res.ok) {
    alert("Login Exitoso")
    localStorage.setItem('nombreusuario', document.getElementById("nombre").value,);
    localStorage.setItem('contrausuario', document.getElementById("contrasena").value)
    window.location.href = "/Front end/wireframe_3/html3.html"
  }
  else {
    alert("Credenciales Incorrectas")
  }
});

});

