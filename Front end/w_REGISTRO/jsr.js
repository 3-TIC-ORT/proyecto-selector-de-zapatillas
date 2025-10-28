let usuario = document.getElementById ("usuario")

connect2Server();

function registro(){
    let Nombre = document.getElementById ('nombre').value
    let Contraseña = document.getElementById ('contrasena').value
     if (!Nombre || ! Contraseña) {
        alert ("Por favor complete con todos sus datos");
        return;
     }
     if (Contraseña.length < 6) {
        alert ("La contraseña debe tener al menos 6 caracteres");
        return;
     }
     if (Nombre.length < 4) {
        alert ("El nombre debe tener al menos 4 caracteres");
        return;
     }
     if (Contraseña === Nombre) {
        alert ("La contraseña y el nombre no pueden ser iguales")
     }
     postEvent ("registro", { "Nombre": Nombre, "Contraseña": Contraseña }, Registro)
     }

     function Registro (data) {
        if (data.success === true) {
            alert("Se ha registrado correctamente el usurio")
            window.location.href = "wireframe_3/html3.html"
        } else if (data.success === false) {
            alert ("No se ha podido registrar el usuari" + data.message) 
        }
    }
    
     usuario.addEventListener ("click", Registro);