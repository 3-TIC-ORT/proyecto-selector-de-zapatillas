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
