connect2Server();

let menu_lateral = document.getElementById("menu");
let barras = document.getElementById("lateral");
const sesion = localStorage.getItem("usuarioSesion");
const nombreUsuario = localStorage.getItem("nombreusuario");
// ASUMIR: Declaración de los contenedores de comentarios (Ajusta los IDs si son diferentes)
const ulcomentarios = document.getElementById("ulcomentarios"); 
const ulcomentariosusuario = document.getElementById("ulcomentariosusuario"); 


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
            corazon.classList.toggle("tocado");

            const zapatillaSeleccionada = JSON.parse(localStorage.getItem("zapatillaSeleccionada")); 
            if (!zapatillaSeleccionada || !nombreUsuario) {
                console.error("Error: No se encontró la zapatilla o el nombre de usuario en localStorage");
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

window.addEventListener("DOMContentLoaded", () => {
    const zapatilla = JSON.parse(localStorage.getItem("zapatillaSeleccionada"));

    if (zapatilla) {
        const contenedor = document.querySelector(".zapatilla");

        
        contenedor.innerHTML = `
            <img src="${zapatilla.Imagen}" alt="${zapatilla.Nombre}" 
                 style="width:100%; height:auto; border-radius:1rem;">
        `;
    } else {
        
        document.querySelector(".zapatilla").innerHTML = "<p>No se seleccionó ninguna zapatilla.</p>";
    }
});

 
window.addEventListener('DOMContentLoaded', () => {
    const zapatillaSeleccionada = JSON.parse(localStorage.getItem('zapatillaSeleccionada'))

    if (!zapatillaSeleccionada) {
        console.warn("No hay zapatilla seleccionada.");
        return;
    }

   
    const divZapatilla = document.querySelector('.zapatilla');
    if (divZapatilla) {
        divZapatilla.innerHTML = `
            <img src="${zapatillaSeleccionada.Imagen}" 
                 alt="${zapatillaSeleccionada.Nombre}" 
                 style="width:100%; height:100%; object-fit:contain; border-radius:1rem;">
        `;
    }

    
});

window.addEventListener("DOMContentLoaded", () => {
    const zapatilla = JSON.parse(localStorage.getItem("zapatillaSeleccionada"));
    if (!zapatilla) return;
  
    document.querySelector(".zapatilla").innerHTML = `<img src="${zapatilla.Imagen}" alt="${zapatilla.Nombre}" style="width:100%;border-radius:1rem;">`;
    document.querySelector(".nombre-zapatilla").textContent = zapatilla.Nombre;
    document.querySelector(".precio-zapatilla").textContent = zapatilla.Precio;
});


document.getElementById("comentar").addEventListener("click", function () {
    console.log("Comentario enviado");
    postEvent("Comentario", {
        Nombre: nombreUsuario,
        crearcomentario: document.getElementById("comentario").value
    }, postearcomentario);
    // Limpia el input de comentario inmediatamente para mejor UX
    document.getElementById("comentario").value = "";
});

// FUNCIÓN PARA PROCESAR LA RESPUESTA DEL COMENTARIO PUBLICADO
function postearcomentario(Data) {
    if (Data.success && Data.comentario) {
        const comentario = Data.comentario; // { Mensaje: '...', Autor: '...' }
        const mensajes = comentario.Mensaje;
        const nombre = comentario.Autor;
        
        // Compara el autor del mensaje con el nombre guardado localmente
        if(nombre == nombreUsuario){
            // Si el autor es el usuario actual, lo muestra en el contenedor 'ulcomentariosusuario'
            const li = document.createElement("p");
            li.textContent = mensajes;
            li.className="tipocomentario"
            if(ulcomentariosusuario) ulcomentariosusuario.appendChild(li);
            
            // Y añade un espacio en blanco/simulador en el otro contenedor
            const li2 = document.createElement("p");
            li2.textContent = ""; // No necesita el mensaje, solo el espacio
            li2.className="tipocomentarioblanco"
            if(ulcomentarios) ulcomentarios.appendChild(li2);
            
            // Si el comentario se añadió correctamente, no necesitamos limpiar el input aquí
            // (Ya se limpió al enviar el evento)
        }
    } else {
        console.error("Error al publicar el comentario:", Data.error || Data.mensaje || "Error desconocido");
        alert(`Error al publicar: ${Data.error || Data.mensaje || "Error desconocido"}`);
    }
}

// FUNCIÓN PARA CARGAR LOS COMENTARIOS AL INICIO
function cargarComentario() {
    getEvent('fetchComentarios', (res) => {
        // Asegúrate de que res es un array
        if (!Array.isArray(res)) return;

        // Limpia los contenedores (esto es crucial si no se hizo antes)
        if (ulcomentarios) ulcomentarios.innerHTML = '';
        if (ulcomentariosusuario) ulcomentariosusuario.innerHTML = '';
        
        // Define el nombre del usuario actual (solo nombre, como lo usa el resto del código)
        const usuarioActual = nombreUsuario;

        res.forEach(comentario => {
            const mensajes = comentario.Mensaje;
            const nombre = comentario.Autor;

            // 4. Determina si el comentario es del usuario actual o de otro
            if (nombre === usuarioActual) {
                // Comentario del usuario actual (lado derecho)
                const li = document.createElement("p");
                li.textContent = mensajes;
                li.className = "tipocomentario"; // Clase para el comentario real
                if(ulcomentariosusuario) ulcomentariosusuario.appendChild(li);

                const li2 = document.createElement("p");
                li2.textContent = ""; // Solo para mantener la alineación
                li2.className = "tipocomentarioblanco"; // Clase para simular el espacio en el lado opuesto
                if(ulcomentarios) ulcomentarios.appendChild(li2);
            } else {
                // Comentario de otro usuario (lado izquierdo)
                const li = document.createElement("p");
                li.textContent = mensajes;
                li.className = "tipocomentariootro"; // Clase para el comentario real
                if(ulcomentarios) ulcomentarios.appendChild(li);

                const li2 = document.createElement("p");
                li2.textContent = ""; // Solo para mantener la alineación
                li2.className = "tipocomentarioblanco"; // Clase para simular el espacio en el lado opuesto
                if(ulcomentariosusuario) ulcomentariosusuario.appendChild(li2);
            }
        });
    })
}

// Llama a la función de carga al iniciar la página (Asegúrate de que 'ulcomentarios' y 'ulcomentariosusuario' ya existan en el DOM)
window.addEventListener("DOMContentLoaded", cargarComentario);