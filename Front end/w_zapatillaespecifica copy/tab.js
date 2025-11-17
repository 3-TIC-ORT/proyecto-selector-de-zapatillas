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


document.getElementById("comentar").addEventListener("click", function (e) {
    e.preventDefault(); // ← evita recargar SI O SI

    const texto = document.getElementById("comentario").value.trim();
    if (texto === "") return;

    const usuario = localStorage.getItem("nombreusuario");

    // Mostrarlo inmediatamente en pantalla
    agregarComentarioEnPantalla(usuario, texto);

    // Enviar al backend
    postEvent("Comentario", {
        Nombre: usuario,
        crearcomentario: texto
    }, (respuesta) => {
        console.log("Respuesta del backend:", respuesta);
    });

    document.getElementById("comentario").value = "";
});

function agregarComentarioEnPantalla(autor, mensaje) {
    const div = document.createElement("div");
    div.className = "comentario";
    div.innerHTML = `<p><strong>${autor}:</strong> ${mensaje}</p>`;

    document.querySelector(".lista-comentarios").prepend(div);
}
