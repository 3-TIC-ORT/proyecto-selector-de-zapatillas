connect2Server(3000); 


const colorSelect = document.getElementById('color');
const precioSelect = document.getElementById('precio');
const tipoSelect = document.getElementById('tipo');
const marcaSelect = document.getElementById('marca');
const filtroCuadro = document.getElementById('filtroCuadro');
const filtroLink = document.getElementById('filtroLink');
const limpiarBoton = document.getElementById('limpiar');


filtroLink.addEventListener('click', (e) => {
    e.preventDefault();
    filtroCuadro.style.display = filtroCuadro.style.display === 'none' || filtroCuadro.style.display === ''
        ? 'block'
        : 'none';
});


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




function mostrarResultados(zapatillas) {
    const contenedor = document.querySelector('.octavos');
    if (!contenedor) {
        console.error("No se encontró el contenedor '.octavos' en el DOM.");
        return;
    }

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
            <p>${zapatilla.Precio}</p>`;
        
            card.addEventListener('click', () => {
            try {
                localStorage.setItem('zapatillaSeleccionada', JSON.stringify(zapatilla));
                window.location.href = "../w_zapatillaespecifica copy/tab.html";
            } catch (err) {
                console.error("Error al guardar y redirigir:", err);
            }
        });

        contenedor.appendChild(card);
});
}
[colorSelect, precioSelect, tipoSelect, marcaSelect].forEach(select => {
  select.addEventListener('change', aplicarFiltros);
});


limpiarBoton.addEventListener('click', () => {
  [colorSelect, precioSelect, tipoSelect, marcaSelect].forEach(select => (select.selectedIndex = 0));
  aplicarFiltros();
});


window.addEventListener('DOMContentLoaded', aplicarFiltros);

filtroLink.addEventListener('click', (e) => {
e.preventDefault();
console.log("Clic en el enlace de filtro");
filtroCuadro.style.display = filtroCuadro.style.display === 'none' ? 'block' : 'none';
console.log("Estado actual del filtro:", filtroCuadro.style.display);
});

window.addEventListener("DOMContentLoaded", () => {
    const inputBusqueda = document.getElementById("busqueda");
  
    if (!inputBusqueda) {
      console.error("No se encontró el input #busqueda");
      return;
    }
  
    inputBusqueda.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
  
        e.preventDefault();
        const texto = inputBusqueda.value.trim();
  
        if (texto === "") {
          aplicarFiltros(); 
          return;
        }
  
        console.log("Buscando:", texto);
  
        postEvent("buscarZapatilla", { nombre: texto }, (resultados) => {
          console.log("Resultados:", resultados);
  
          if (!resultados || resultados.length === 0) {
            document.querySelector(".octavos").innerHTML =
              `<p>No existe ninguna zapatilla llamada "${texto}".</p>`;
            return;
          }
  
          mostrarResultados(resultados);
        });
      }
    });
  });
  