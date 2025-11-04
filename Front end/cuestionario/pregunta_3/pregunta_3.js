let menu_lateral = document.getElementById("menu");
let barras = document.getElementById("lateral");
let siguiente = document.getElementById("enviar");
const A = document.getElementById('A');
const B = document.getElementById('B');
const C = document.getElementById('C');
const D = document.getElementById('D');


function cambiar() {
    barras.classList.toggle("visible");
}

if (menu_lateral) menu_lateral.addEventListener("click", cambiar);
window.addEventListener('click', function(e) {
    if (barras && barras.classList.contains('visible') && !barras.contains(e.target) && !menu_lateral.contains(e.target)) {
        barras.classList.remove('visible');
    }
});


if (siguiente) {
    siguiente.addEventListener("click", () => {

        const seleccionada = document.querySelector('input[name="respuesta"]:checked');

        if (!seleccionada) {
            alert("Por favor, seleccione una respuesta antes de continuar.");
            return;
        }
        if (seleccionada.value === "A") {
            window.location.href = "../pregunta_2/pregunta_2.html"; 
            postEvent("respuestaPregunta3", { opcion: "A" })
        }
        if (seleccionada.value === "B") {
            window.location.href = "../pregunta_2/pregunta_2.html"; 
            postEvent("respuestaPregunta3", { opcion: "B" })
        }
        if (seleccionada.value === "C") {
            window.location.href = "../pregunta_2/pregunta_2.html"; 
            postEvent("respuestaPregunta3", { opcion: "C" })
        }

        if (seleccionada.value === "D") {
            window.location.href = "../pregunta_2/pregunta_2.html"; 
            postEvent("respuestaPregunta3", { opcion: "D" })
        }
    


    });
}
