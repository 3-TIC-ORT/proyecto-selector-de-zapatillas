let menu_lateral = document.getElementById("menu");
let barras = document.getElementById("lateral");
let siguiente = document.getElementById("enviar");

connect2Server();

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

        sessionStorage.setItem("RP2", seleccionada.value);
        window.location.href = "../pregunta_3/pregunta_3.html";
    });
}
const cerrarImg = document.getElementById("cerrar"); 
const inputEscondido = document.getElementById("input_escondido");
const cancelButton = document.getElementById("cancel-button");

if (cerrarImg) {
    cerrarImg.addEventListener("click", () => {
        if (inputEscondido) inputEscondido.classList.remove("hidden");
    });
}

if (cancelButton) {
    cancelButton.addEventListener("click", () => {
        if (inputEscondido) inputEscondido.classList.add("hidden");
    });
}