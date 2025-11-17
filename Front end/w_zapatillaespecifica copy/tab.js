connect2Server();

let menu_lateral = document.getElementById("menu");
let barras = document.getElementById("lateral");
const sesion = localStorage.getItem("usuarioSesion");
const nombreUsuario = localStorage.getItem("nombreusuario");

function cambiar() {
    barras.classList.toggle("visible");
}

menu_lateral.addEventListener("click", cambiar);
window.addEventListener('click', function (e) {
    if (barras.classList.contains('visible') && 
        !barras.contains(e.target) && 
        !menu_lateral.contains(e.target)) {
        barras.classList.remove('visible');
    }
});

// ❤️ FAVORITOS
let corazon = document.getElementById("fav");
if (corazon) {
    corazon.addEventListener("click", function () {
        corazon.classList.toggle("tocado");

        const zapatillaSeleccionada = JSON.parse(localStorage.getItem("zapatillaSeleccionada"));
        if (!zapatillaSeleccionada || !nombreUsuario) {
            console.error("Error: No se encontró la zapatilla o el nombre de usuario");
            return;
        }

        const datosFavorito = {
            NOMBRE: nombreUsuario,
            zapatilla: zapatillaSeleccionada
        };

        postEvent("ToggleFavorito", datosFavorito, (respuesta) => {
            console.log("Respuesta del servidor:", respuesta);
        });
    });
}

// 🔄 CARGAR ZAPATILLA SELECCIONADA
window.addEventListener("DOMContentLoaded", () => {
    const zapatilla = JSON.parse(localStorage.getItem("zapatillaSeleccionada"));
    if (!zapatilla) return;

    document.querySelector(".zapatilla").innerHTML = `
        <img src="${zapatilla.Imagen}" 
             alt="${zapatilla.Nombre}" 
             style="width:100%; height:auto; border-radius:1rem;">
    `;

    document.querySelector(".nombre-zapatilla").textContent = zapatilla.Nombre;
    document.querySelector(".precio-zapatilla").textContent = zapatilla.Precio;
});


// ⭐⭐⭐ FUNCIÓN PARA MOSTRAR COMENTARIOS EN PANTALLA ⭐⭐⭐
function mostrarComentarioEnPantalla(data) {
    if (!data || !data.comentario) return;

    const lista = document.querySelector(".lista-comentarios");
    if (!lista) return;

    const nuevoComentario = document.createElement("div");
    nuevoComentario.classList.add("comentario-item");

    nuevoComentario.innerHTML = `
        <h3 class="autor">${data.comentario.Autor}</h3>
        <p class="mensaje">${data.comentario.Mensaje}</p>
    `;

    lista.prepend(nuevoComentario);
}



document.getElementById("comentar").addEventListener("click", function (e) {
    e.preventDefault();

   
    const texto = document.getElementById("comentario").value.trim();
    const usuario = localStorage.getItem("nombreusuario");

    if (!usuario) {
       
        alert("Debes iniciar sesión para publicar un comentario.");
        return;

    }

    if (texto === "") {
        alert("Escribí algo antes de comentar.");
        return;
    }

    const payload = {
        Nombre: usuario,          
        crearcomentario: texto    
    };

    console.log("Enviando comentario al backend:", payload);

    postEvent("Comentario", payload, (respuesta) => {
        console.log("Respuesta del backend:", respuesta);

        if (respuesta && respuesta.success) {
          
            mostrarComentarioEnPantalla(respuesta);
        } else {
           
            const msg = (respuesta && respuesta.error) ? respuesta.error : "Error guardando comentario";
            alert("No se pudo guardar el comentario: " + msg);
        }
    });

    document.getElementById("comentario").value = "";
});

