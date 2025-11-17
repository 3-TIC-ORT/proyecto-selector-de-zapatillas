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

        sessionStorage.setItem("RP10", seleccionada.value);

        const respuestasCompletas = {
            rp1: sessionStorage.getItem("RP1"),
            rp2: sessionStorage.getItem("RP2"),
            rp3: sessionStorage.getItem("RP3"),
            rp4: sessionStorage.getItem("RP4"),
            rp5: sessionStorage.getItem("RP5"),
            rp6: sessionStorage.getItem("RP6"),
            rp7: sessionStorage.getItem("RP7"),
            rp8: sessionStorage.getItem("RP8"),
            rp9: sessionStorage.getItem("RP9"),
            rp10: sessionStorage.getItem("RP10")
        };
        
       postEvent("calcularRecomendaciones", respuestasCompletas);

        window.location.href = "../resultado/resultado.html";
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