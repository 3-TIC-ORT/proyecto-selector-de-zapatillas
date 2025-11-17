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

connect2Server();

const contenedor = document.querySelector(".cuadrados");

document.addEventListener("DOMContentLoaded", cargarFavoritos);

function cargarFavoritos() {
    
    getEvent("obtenerZapatillasFavoritas", (zapatillas) => {
        
        if (!zapatillas || !Array.isArray(zapatillas) || zapatillas.length === 0) {
            contenedor.innerHTML = "<h1>No tienes ninguna zapatilla favorita salva aún.</h1>";
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
    
    const imagenSrc = zapatilla.imagenUrl || zapatilla.foto || '../imagenes/placeholder.png';

    caja.innerHTML = `
        <img class="cuadradito-img" src="${imagenSrc}" alt="${zapatilla.nombre || 'Zapatilla'}">
        <p>${zapatilla.nombre || 'Zapatilla Favorita'}</p>
        <img class="fav-icon" src="../imagenes/favorito.png" alt="Quitar favorito">
    `;

    const iconoCorazon = caja.querySelector(".fav-icon");
    iconoCorazon.addEventListener("click", quitarFavorito);

    return caja;
}

function quitarFavorito(event) {
    const icono = event.target;
    const cajaParaEliminar = icono.closest(".cuadradito");
    const idParaEliminar = cajaParaEliminar.dataset.id;

    cajaParaEliminar.classList.add("hiding");

    setTimeout(() => {
        cajaParaEliminar.remove();
    }, 300); 

    getEvent(`quitarFavorito?id=${idParaEliminar}`, (respuesta) => {
        console.log(`Zapatilla ${idParaEliminar} eliminada. Respuesta del servidor:`, respuesta);
    });
}
