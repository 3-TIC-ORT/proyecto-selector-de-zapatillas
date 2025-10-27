connect2Server();

const colorelegido = document.getElementById('color');
const precioelegido = document.getElementById('precio');
const tipoelegido = document.getElementById('tipo');
const talleelegido = document.getElementById('talle');
const marcaelegida = document.getElementById('marca');
const filtroCuadro = document.getElementById('filtroCuadro');
const filtroLink = document.getElementById('filtroLink');

filtroLink.addEventListener('click', (e) => {
    e.preventDefault();
    filtroCuadro.style.display = filtroCuadro.style.display === 'none' ? 'block' : 'none';
});


function aplicarFiltros() {
    const filtros = {
        color: colorelegido.value,
        rangoPrecio: precioelegido.value,
        tipo: tipoelegido.value,
        talle: talleelegido.value,
        marca: marcaelegida.value
    };

    
    postEvent('filtrarZapatillas', filtros, (zapatillasFiltradas) => {
        mostrarResultados(zapatillasFiltradas);
    });
}

function mostrarResultados(zapatillas) {
    const contenedor = document.querySelector('resultados');
    contenedor.innerHTML = '';

    if (zapatillas.length === 0) {
        contenedor.innerHTML = '<p>No se encontraron zapatillas con esos filtros</p>';
        return;
    }

    zapatillas.forEach(zapatilla => {
        const card = document.createElement('div');
        card.className = 'zapatilla-card';
        card.innerHTML = `
            <img src="${zapatilla.imagen}" alt="${zapatilla.marca} ${zapatilla.modelo}">
            <h3>${zapatilla.marca} ${zapatilla.modelo}</h3>
            <p>Color: ${zapatilla.color}</p>
            <p>Talle: ${zapatilla.talle}</p>
            <p>Precio: $${zapatilla.precio}</p>
            <p>Tipo: ${zapatilla.tipo}</p>
        `;
        contenedor.appendChild(card);
    });
}


[colorelegido, precioelegido, tipoelegido, talleelegido, marcaelegida].forEach(select => {
    select.addEventListener('change', aplicarFiltros);
});
