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

    // Conectar a SoqueTIC
    connect2Server();

    // Escuchar recomendaciones
    subscribeRealTimeEvent("recomendaciones", (data) => {
        displayShoes(data.shoes);
    });

    function displayShoes(shoes) {
        const container = document.querySelector('.resultados');
        container.innerHTML = '<h2>Recomendaciones</h2>';
        shoes.forEach(shoe => {
            const shoeDiv = document.createElement('div');
            shoeDiv.className = 'shoe';
            shoeDiv.innerHTML = `
                <img src="${shoe.Imagen}" alt="${shoe.Nombre}">
                <h3>${shoe.Nombre}</h3>
                <p>Marca: ${shoe.Marca}</p>
                <p>Precio: ${shoe.Precio}</p>
                <p>Color: ${shoe.Color}</p>
            `;
            container.appendChild(shoeDiv);
        });
    }
});
