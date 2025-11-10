connect2Server(3000); // 🔗 conexión con backend SoqueTIC

// Referencias a los selects
const colorSelect = document.getElementById('color');
const precioSelect = document.getElementById('precio');
const tipoSelect = document.getElementById('tipo');
const marcaSelect = document.getElementById('marca');
const filtroCuadro = document.getElementById('filtroCuadro');
const filtroLink = document.getElementById('filtroLink');
const limpiarBoton = document.getElementById('limpiar');

// Mostrar/ocultar el cuadro de filtro
filtroLink.addEventListener('click', (e) => {
    e.preventDefault();
    filtroCuadro.style.display = filtroCuadro.style.display === 'none' || filtroCuadro.style.display === ''
        ? 'block'
        : 'none';
});

// Aplicar filtros → se comunica con el backend
function aplicarFiltros() {
    const filtros = {
        color: colorSelect.value,
        precio: precioSelect.value,
        tipo: tipoSelect.value,
        marca: marcaSelect.value
    };

    postEvent('filtrarZapatillas', filtros, (zapatillasFiltradas) => {
        mostrarResultados(zapatillasFiltradas);
    });
}

// Mostrar resultados en las tarjetas
function mostrarResultados(zapatillas) {
    const contenedor = document.querySelector('.octavos');
    contenedor.innerHTML = '';

    if (!zapatillas || zapatillas.length === 0) {
        contenedor.innerHTML = '<p>No se encontraron zapatillas con esos filtros.</p>';
        return;
    }

    zapatillas.forEach(zapatilla => {
        const card = document.createElement('div');
        card.className = 'ejemplos';
        card.innerHTML = `
            <img src="${zapatilla.Imagen}" alt="${zapatilla.Nombre}" style="width:100%;border-radius:1rem;">
            <h4>${zapatilla.Nombre}</h4>
            <p>${zapatilla.Marca} - ${zapatilla.Color}</p>
            <p>${zapatilla.Precio}</p>
        `;
        contenedor.appendChild(card);
    });
}

// Escucha cambios en los filtros
[colorSelect, precioSelect, tipoSelect, marcaSelect].forEach(select => {
    select.addEventListener('change', aplicarFiltros);
});

// Botón limpiar filtros
limpiarBoton.addEventListener('click', () => {
    [colorSelect, precioSelect, tipoSelect, marcaSelect].forEach(select => (select.selectedIndex = 0));
    aplicarFiltros();
});

// Mostrar todas al inicio
window.addEventListener('DOMContentLoaded', aplicarFiltros);

filtroLink.addEventListener('click', (e) => {
    e.preventDefault();
    console.log("  Clic en filtroLink");
    filtroCuadro.style.display = filtroCuadro.style.display === 'none' ? 'block' : 'none';
    console.log("Estado actual del filtro:", filtroCuadro.style.display);
  });