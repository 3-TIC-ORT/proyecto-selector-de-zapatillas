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


let corazon = document.getElementById("fav");
if (corazon) {
  corazon.addEventListener("click", function () {
    corazon.classList.toggle("tocado");
    
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
window.addEventListener("beforeunload", () => {
    localStorage.removeItem("zapatillaSeleccionada");
});
 
window.addEventListener('DOMContentLoaded', () => {
    const zapatillaSeleccionada = JSON.parse(localStorage.getItem('zapatillaSeleccionada'));

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
        Nombre: localStorage.getItem("Nombre"),
        crearcomentario: document.getElementById("comentario").value
    }, postearcomentario);
});

function postearcomentario(Data) {
    console.log("Respuesta del backend:");
    console.log(Data);
}
