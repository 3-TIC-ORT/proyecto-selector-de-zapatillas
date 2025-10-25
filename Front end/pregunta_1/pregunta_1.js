let menu_lateral = document.getElementById("menu");
let barras = document.getElementById("lateral");

function cambiar() {
    barras.classList.toggle("visible"); 
}

if (menu_lateral) menu_lateral.addEventListener("click", cambiar);
window.addEventListener('click', function(e) {
    if (barras && barras.classList.contains('visible') && !barras.contains(e.target) && !menu_lateral.contains(e.target)) {
        barras.classList.remove('visible');
    }
});


