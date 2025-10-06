let menu_lateral = document.getElementById("menu");
let barras = document.getElementById("lateral");

function cambiar() {
    barras.classList.toggle("visible"); 
}

menu_lateral.addEventListener("click", cambiar);