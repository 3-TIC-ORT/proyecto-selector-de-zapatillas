connect2Server();

let menu_lateral = document.getElementById("menu");
let barras = document.getElementById("lateral");
const sesion = localStorage.getItem("usuarioSesion");
const nombreUsuario = localStorage.getItem("nombreusuario");

function cambiar() {
    barras.classList.toggle("visible"); 
}

menu_lateral.addEventListener("click", cambiar);
window.addEventListener('click', function(e) {
    if (barras.classList.contains('visible') && !barras.contains(e.target) && !menu_lateral.contains(e.target)) {
        barras.classList.remove('visible');
    }
});

let corazon = document.getElementById("fav");
if (corazon) {
    corazon.addEventListener("click", function () {
        const zapatillaSeleccionada = JSON.parse(localStorage.getItem("zapatillaSeleccionada")); 
        
        if (!zapatillaSeleccionada || !nombreUsuario) {
            console.error("Error: No se encontró la zapatilla o el nombre de usuario en localStorage");
            alert("Por favor inicia sesión para guardar favoritos");
            return;
        }

        corazon.classList.toggle("tocado");

        const idUnico = zapatillaSeleccionada.id || 
                       `${zapatillaSeleccionada.Nombre}_${zapatillaSeleccionada.Marca || ''}_${zapatillaSeleccionada.Precio}`.replace(/\s/g, '_');

        const datosFavorito = {
            NOMBRE: nombreUsuario,
            zapatilla: {
                id: idUnico,
                Nombre: zapatillaSeleccionada.Nombre,
                Precio: zapatillaSeleccionada.Precio,
                Imagen: zapatillaSeleccionada.Imagen,
                Marca: zapatillaSeleccionada.Marca,
                Color: zapatillaSeleccionada.Color
            }
        };

        postEvent("ToggleFavorito", datosFavorito, (respuesta) => {
            console.log("Respuesta del servidor:", respuesta);
            
            if (respuesta.success) {
                if (respuesta.action === 'added') {
                    console.log("Zapatilla agregada a favoritos");
                } else if (respuesta.action === 'removed') {
                    console.log("Zapatilla quitada de favoritos");
                }
            } else {
                corazon.classList.toggle("tocado");
                console.error("Error:", respuesta.error);
            }
        });
    });
}

// Cargar información de la zapatilla
window.addEventListener("DOMContentLoaded", () => {
    const zapatillaSeleccionada = JSON.parse(localStorage.getItem("zapatillaSeleccionada"));

    if (zapatillaSeleccionada) {
        const contenedor = document.querySelector(".zapatilla");
        contenedor.innerHTML = `
            <img src="${zapatillaSeleccionada.Imagen}" alt="${zapatillaSeleccionada.Nombre}" 
                 style="width:100%; height:auto; border-radius:1rem;">
        `;

        document.querySelector(".nombre-zapatilla").textContent = zapatillaSeleccionada.Nombre;
        document.querySelector(".precio-zapatilla").textContent = zapatillaSeleccionada.Precio;

    } else {
        document.querySelector(".zapatilla").innerHTML = "<p>No se seleccionó ninguna zapatilla.</p>";
    }
});

// Función para agregar comentario en pantalla
function agregarComentarioEnPantalla(autor, mensaje) {
    const div = document.createElement("div");
    div.className = "comentario";
    div.style.cssText = `
        background-color: #f0f0f0;
        padding: 10px;
        margin: 10px 0;
        border-radius: 8px;
        border-left: 4px solid #FFA500;
    `;
    div.innerHTML = `<p style="margin: 0;"><strong style="color: #FFA500;">${autor}:</strong> ${mensaje}</p>`;

    document.querySelector(".lista-comentarios").prepend(div);
}

// Prevenir que el formulario recargue la página
const formulario = document.querySelector("form");
if (formulario) {
    formulario.addEventListener("submit", function(e) {
        e.preventDefault();
    });
}

// Evento para enviar comentario
document.getElementById("comentar").addEventListener("click", function (e) {
    e.preventDefault();

    const texto = document.getElementById("comentario").value.trim();
    if (texto === "") {
        alert("Por favor escribe un comentario antes de enviar");
        return;
    }

    const usuario = localStorage.getItem("nombreusuario");

    if (!usuario) {
        alert("Por favor inicia sesión para comentar");
        return;
    }

    // Mostrar el comentario inmediatamente en pantalla
    agregarComentarioEnPantalla(usuario, texto);
    console.log("Comentario agregado en pantalla:", { autor: usuario, mensaje: texto });

    // Enviar al backend
    postEvent("Comentario", {
        Nombre: usuario,
        crearcomentario: texto
    }, (respuesta) => {
        console.log("✅ Respuesta del backend:", respuesta);
        
        if (respuesta.success) {
            console.log("✅ Comentario guardado exitosamente en el servidor");
        } else {
            console.error("❌ Error al guardar comentario:", respuesta.error);
            alert("Hubo un error al guardar tu comentario");
        }
    });

    // Limpiar el input
    document.getElementById("comentario").value = "";
});