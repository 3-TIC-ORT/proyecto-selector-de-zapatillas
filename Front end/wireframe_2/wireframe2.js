function login() {
    let usuario = document.getElementById("nombre").value;
    let clave = document.getElementById("contraseña").value;
    let usuarioCorrecto = "martin";
    let claveCorrecta = "1234";
  
    if (usuario === usuarioCorrecto && clave === claveCorrecta) {
      document.getElementById("mensaje").innerText = "¡bien ahi wacho!";
      window.location.href = "../wireframe_3/html3.html"
    } else {
      document.getElementById("mensaje").innerText = "Usuario o contraseña incorrectos.";
    }
  }
  
