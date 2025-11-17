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

    const respuestasCompletas = {
        rp1: sessionStorage.getItem("RP1"),
        rp2: sessionStorage.getItem("RP2"),
        rp3: sessionStorage.getItem("RP3"),
        rp4: sessionStorage.getItem("RP4"),
        rp5: sessionStorage.getItem("RP5"),
        rp10: sessionStorage.getItem("RP10")
    };

    console.log("Enviando al backend:", respuestasCompletas);


    postEvent("calcularRecomendaciones", respuestasCompletas, (data) => {
        
        console.log("Respuesta recibida del backend:", data);
      
        if (data && data.shoes) {
            displayShoes(data.shoes);
        } else {
            console.error("El backend no devolvió un objeto { shoes: [...] }");
        }
    },);

    function displayShoes(shoes) {
        const container = document.querySelector('.resultados');
        container.innerHTML = '<h2>Tus zapatillas recomendadas</h2>';

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

