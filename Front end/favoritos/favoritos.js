connect2Server();

let menu_lateral = document.getElementById("menu");
let barras = document.getElementById("lateral");

function cambiar() {
    barras.classList.toggle("visible"); 
}

menu_lateral.addEventListener("click", cambiar);
window.addEventListener('click', function(e) {
    if (barras.classList.contains('visible') && !barras.contains(e.target) && !menu_lateral.contains(e.target)) {
        barras.classList.remove('visible');
    }
});

const contenedor = document.querySelector(".cuadrados");
const nombreUsuario = localStorage.getItem("nombreusuario");

document.addEventListener("DOMContentLoaded", cargarFavoritos);

function cargarFavoritos() {
    if (!nombreUsuario) {
        contenedor.innerHTML = "<h1>Por favor inicia sesión para ver tus favoritos.</h1>";
        return;
    }
    
    getEvent(`ObtenerFavoritos?usuario=${encodeURIComponent(nombreUsuario)}`, (zapatillas) => {
        console.log("Favoritos recibidos:", zapatillas);
        
        if (!zapatillas || !Array.isArray(zapatillas) || zapatillas.length === 0) {
            contenedor.innerHTML = "<h1>No tienes ninguna zapatilla favorita guardada aún.</h1>";
            return;
        }

        contenedor.innerHTML = ""; 

        zapatillas.forEach(zapatilla => {
            const nuevaCaja = crearCajaHTML(zapatilla);
            contenedor.appendChild(nuevaCaja);
        });
    });
}

function crearCajaHTML(zapatilla) {
    const caja = document.createElement("div");
    caja.classList.add("cuadradito");
    caja.dataset.id = zapatilla.id; 
    caja.dataset.nombre = zapatilla.nombre;
    
    const imagenSrc = zapatilla.imagenUrl || '../imagenes/placeholder.png';

    caja.innerHTML = `
    <a href="../w_zapatillaespecifica copy/tab.html">
        <img class="cuadradito-img" src="${imagenSrc}" alt="${zapatilla.nombre || 'Zapatilla'}">

    </a>
        <img class="fav-icon" src="../imagenes/favorito.png" alt="Quitar favorito">
    
    `;

    const iconoCorazon = caja.querySelector(".fav-icon");
    iconoCorazon.addEventListener("click", (e) => quitarFavorito(e, zapatilla));

    return caja;
}

function quitarFavorito(event, zapatilla) {
    const icono = event.target;
    const cajaParaEliminar = icono.closest(".cuadradito");
    const idParaEliminar = cajaParaEliminar.dataset.id;

    cajaParaEliminar.classList.add("hiding");

    setTimeout(() => {
        cajaParaEliminar.remove();

        const cajas = document.querySelectorAll(".cuadradito");
        if (cajas.length === 0) {
            contenedor.innerHTML = "<h1>No tienes ninguna zapatilla favorita guardada aún.</h1>";
        }
    }, 300); 

    postEvent("ToggleFavorito", {
        NOMBRE: nombreUsuario,
        zapatilla: {
            id: zapatilla.id,
            Nombre: zapatilla.nombre,
            Precio: zapatilla.precio,
            Imagen: zapatilla.imagenUrl,
            Marca: zapatilla.marca || '',
            Color: zapatilla.color || ''
        }
    }, (respuesta) => {
        console.log(`Zapatilla ${idParaEliminar} eliminada. Respuesta del servidor:`, respuesta);
        if (respuesta.success) {
            console.log("✅ Favorito eliminado exitosamente");
        } else {
            console.error("❌ Error al eliminar favorito:", respuesta.error);
            cargarFavoritos();
        }
    });
}

const cerrarBtn = document.getElementById("cerrar");
const inputEscondido = document.getElementById("input_escondido");
const cancelBtn = document.getElementById("cancel-button");

if (cerrarBtn) {
    cerrarBtn.addEventListener("click", function(e) {
        e.preventDefault();
        inputEscondido.classList.remove("hidden");
    });
}

if (cancelBtn) {
    cancelBtn.addEventListener("click", function() {
        inputEscondido.classList.add("hidden");
    });
}