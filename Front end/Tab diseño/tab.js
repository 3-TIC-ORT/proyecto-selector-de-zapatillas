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


const cerrarImg = document.getElementById("cerrar"); 
const inputEscondido = document.getElementById("input_escondido");
const cancelButton = document.getElementById("cancel-button");


cerrarImg.addEventListener("click", () => {
    inputEscondido.classList.remove("hidden");
});


cancelButton.addEventListener("click", () => {
    inputEscondido.classList.add("hidden");
});