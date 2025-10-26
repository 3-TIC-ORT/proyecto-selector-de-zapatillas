document.addEventListener("DOMContentLoaded", function() {
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
});