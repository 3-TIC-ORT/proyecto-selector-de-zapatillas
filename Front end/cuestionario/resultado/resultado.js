document.addEventListener("DOMContentLoaded", function() {
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

    connect2Server();

    getEvent("recomendaciones", (data) => {
        displayShoes(data.shoes);
    });

    function displayShoes(shoes) {
        const container = document.querySelector('.resultados');
        
        // --- TÍTULO CAMBIADO AQUÍ ---
        container.innerHTML = '<h2>Tus zapatillas recomendadas</h2>';
        // --- FIN DEL CAMBIO ---

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