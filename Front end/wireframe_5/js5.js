document.addEventListener("DOMContentLoaded", function() {
    let menu_lateral = document.getElementById("menu");
    let barras = document.getElementById("lateral");

    function cambiar() {
        barras.classList.toggle("visible"); 

        // 🔒 Bloquear o habilitar scroll según el estado del menú
        if (barras.classList.contains("visible")) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }

    menu_lateral.addEventListener("click", cambiar);

    window.addEventListener('click', function(e) {
        if (barras.classList.contains('visible') && !barras.contains(e.target) && !menu_lateral.contains(e.target)) {
            barras.classList.remove('visible');
            // 🔓 Volver a permitir scroll al cerrar el menú
            document.body.style.overflow = "";
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const filtroLink = document.getElementById("filtroLink");
    const filtroCuadro = document.getElementById("filtroCuadro");

    filtroLink.addEventListener("click", (e) => {
        e.preventDefault(); 
        if (filtroCuadro.style.display === "none" || filtroCuadro.style.display === "") {
            filtroCuadro.style.display = "block";
        } else {
            filtroCuadro.style.display = "none";
        }
    });

    document.addEventListener("click", (e) => {
        if (!filtroCuadro.contains(e.target) && !filtroLink.contains(e.target)) {
            filtroCuadro.style.display = "none";
        }
    });

    const limpiarBoton = document.getElementById("limpiar");
    limpiarBoton.addEventListener("click", () => {
        const selects = document.querySelectorAll("select"); 
        selects.forEach((select) => {
            select.selectedIndex = 0; 
        });
    });
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