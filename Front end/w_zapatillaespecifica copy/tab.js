connect2Server();

let menu_lateral = document.getElementById("menu");
let barras = document.getElementById("lateral");
const sesion = localStorage.getItem("usuarioSesion");
const nombreUsuario = localStorage.getItem("nombreusuario");
const input = document.getElementById("comentar");
const error = document.getElementById("error");
const maxPalabras = 5;


function cambiar() {
    barras.classList.toggle("visible"); 
}

menu_lateral.addEventListener("click", cambiar);
window.addEventListener('click', function(e) {
    if (barras.classList.contains('visible') && !barras.contains(e.target) && !menu_lateral.contains(e.target)) {
        barras.classList.remove('visible');
    }
});

// Verificar si la zapatilla está en favoritos al cargar la página
function verificarSiEsFavorito() {
    const zapatillaSeleccionada = JSON.parse(localStorage.getItem("zapatillaSeleccionada"));
    
    if (!zapatillaSeleccionada || !nombreUsuario) {
        return;
    }

    const idUnico = zapatillaSeleccionada.id || 
                   `${zapatillaSeleccionada.Nombre}_${zapatillaSeleccionada.Marca || ''}_${zapatillaSeleccionada.Precio}`.replace(/\s/g, '_');

    postEvent("VerificarFavorito", {
        usuario: nombreUsuario,
        id: idUnico
    }, (respuesta) => {
        console.log("Verificación de favorito:", respuesta);
        
        if (respuesta.esFavorito) {
            const corazon = document.getElementById("fav");
            if (corazon) {
                corazon.classList.add("tocado");
            }
        }
    });
}

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

// Función para cargar comentarios guardados en localStorage de esta zapatilla
function cargarComentariosGuardados() {
    const zapatillaSeleccionada = JSON.parse(localStorage.getItem("zapatillaSeleccionada"));
    
    if (!zapatillaSeleccionada) {
        return;
    }

    // Crear ID único para esta zapatilla
    const idZapatilla = `${zapatillaSeleccionada.Nombre}_${zapatillaSeleccionada.Marca || ''}`.replace(/\s/g, '_');
    
    // Obtener comentarios de esta zapatilla específica desde localStorage
    const comentariosGuardados = JSON.parse(localStorage.getItem(`comentarios_${idZapatilla}`)) || [];
    
    console.log(`📝 Cargando ${comentariosGuardados.length} comentarios para ${zapatillaSeleccionada.Nombre}`);
    
    // Mostrar cada comentario guardado
    comentariosGuardados.forEach(comentario => {
        agregarComentarioEnPantalla(comentario.autor, comentario.mensaje);
    });
}

// Función para guardar comentario en localStorage específico de esta zapatilla
function guardarComentarioLocal(autor, mensaje) {
    const zapatillaSeleccionada = JSON.parse(localStorage.getItem("zapatillaSeleccionada"));
    
    if (!zapatillaSeleccionada) {
        return;
    }

    // Crear ID único para esta zapatilla
    const idZapatilla = `${zapatillaSeleccionada.Nombre}_${zapatillaSeleccionada.Marca || ''}`.replace(/\s/g, '_');
    
    // Obtener comentarios existentes de esta zapatilla
    const comentariosGuardados = JSON.parse(localStorage.getItem(`comentarios_${idZapatilla}`)) || [];
    
    // Agregar el nuevo comentario al principio
    comentariosGuardados.unshift({
        autor: autor,
        mensaje: mensaje,
        fecha: new Date().toISOString()
    });
    
    // Guardar de vuelta en localStorage
    localStorage.setItem(`comentarios_${idZapatilla}`, JSON.stringify(comentariosGuardados));
    
    console.log(`💾 Comentario guardado localmente para ${zapatillaSeleccionada.Nombre}:`, { autor, mensaje });
}

// Cargar información de la zapatilla y sus comentarios
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

        // Verificar si está en favoritos
        verificarSiEsFavorito();
        
        // ✨ CARGAR COMENTARIOS GUARDADOS DE ESTA ZAPATILLA
        cargarComentariosGuardados();

    } else {
        document.querySelector(".zapatilla").innerHTML = "<p>No se seleccionó ninguna zapatilla.</p>";
    }
});

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
    
    // ✨ GUARDAR COMENTARIO EN LOCALSTORAGE ESPECÍFICO DE ESTA ZAPATILLA
    guardarComentarioLocal(usuario, texto);
    
    console.log("✅ Comentario agregado en pantalla y guardado localmente:", { autor: usuario, mensaje: texto });

    // Enviar al backend (opcional, sigue guardándose en Comentarios.json)
    postEvent("Comentario", {
        Nombre: usuario,
        crearcomentario: texto
    }, (respuesta) => {
        console.log("📡 Respuesta del backend:", respuesta);
        
        if (respuesta.success) {
            console.log("✅ Comentario guardado exitosamente en el servidor");
        } else {
            console.error("❌ Error al guardar comentario en servidor:", respuesta.error);
        }
    });

    // Limpiar el input
    document.getElementById("comentario").value = "";
});
function cambiar() {
    barras.classList.toggle("visible");

    if (barras.classList.contains("visible")) {
        document.body.classList.add("noscroll");   // bloquear scroll
    } else{
        document.body.classList.remove("noscroll"); // permitir scroll
    }
}input.addEventListener("input", () => {
    let palabras = input.value.trim().split(/\s+/); // divide por espacios

    if (palabras.length > maxPalabras) {
        error.style.display = "block";
        palabras = palabras.slice(0, maxPalabras); // recorta al máximo permitido
        input.value = palabras.join(" "); // vuelve a colocar el texto permitido
    } else {
        error.style.display = "none";
    }
});
