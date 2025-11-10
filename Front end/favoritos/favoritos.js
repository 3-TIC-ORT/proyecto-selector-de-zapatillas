let menu_lateral = document.getElementById("menu");
let barras = document.getElementById("lateral");
let cuadrado1 = document.getElementById("cuadraditos1");
let cuadrado2 = document.getElementById("cuadraditos2");
let cuadrado3 = document.getElementById("cuadraditos3");
let cuadrado4 = document.getElementById("cuadraditos4");
let cuadrado5 = document.getElementById("cuadraditos5");
let cuadrado6 = document.getElementById("cuadraditos6");

let favorito1 = document.getElementById("favorito1");
let favorito2 = document.getElementById("favorito2");
let favorito3 = document.getElementById("favorito3");
let favorito4 = document.getElementById("favorito4");
let favorito5 = document.getElementById("favorito5");
let favorito6 = document.getElementById("favorito6");

function cambiar() {
    barras.classList.toggle("visible"); 
}

menu_lateral.addEventListener("click", cambiar);
window.addEventListener('click', function(e) {

    if (barras.classList.contains('visible') && !barras.contains(e.target) && !menu_lateral.contains(e.target)) {
        barras.classList.remove('visible');
    }
});

function desaparecer() {
    cuadrado1.classList.toggle("invisible"); 
}

favorito1.addEventListener("click", desaparecer);
function desaparecer2() {
    cuadrado2.classList.toggle("invisible"); 
}
favorito2.addEventListener("click", desaparecer2);

function desaparecer3() {
    cuadrado3.classList.toggle("invisible"); 
}
favorito3.addEventListener("click", desaparecer3);

function desaparecer4() {
    cuadrado4.classList.toggle("invisible"); 
}
favorito4.addEventListener("click", desaparecer4);

function desaparecer5() {
    cuadrado5.classList.toggle("invisible"); 
}
favorito5.addEventListener("click", desaparecer5);

function desaparecer6() {
    cuadrado6.classList.toggle("invisible"); 
}

favorito6.addEventListener("click", desaparecer6);
const cerrarImg = document.getElementById("cerrar"); 
const inputEscondido = document.getElementById("input_escondido");
const cancelButton = document.getElementById("cancel-button");


cerrarImg.addEventListener("click", () => {
    inputEscondido.classList.remove("hidden");
});


cancelButton.addEventListener("click", () => {
    inputEscondido.classList.add("hidden");
});