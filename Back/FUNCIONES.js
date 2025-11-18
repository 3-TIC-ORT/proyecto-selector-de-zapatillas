import fs from "fs";
import path from "path";

function Registro(Data) {
    let usuarios = [];
    const { nombre, contrasena } = Data
    usuarios = JSON.parse(fs.readFileSync("UsuariosRegistrados.json", "utf-8"))
    
    let usuarioexistente = false
    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].nombre === nombre) {
            usuarioexistente = true;
            break;
        }
        else {
            usuarioexistente = false;
        }
    }
    if (usuarioexistente === true) {
        return { success: false, message: " El usuario ya existe." }
    }
    else if (usuarioexistente === false) {
        usuarios.push({ Nombre: nombre, Contraseña: contrasena });
        fs.writeFileSync("UsuariosRegistrados.json", JSON.stringify(usuarios, null, 2));
        return { success: true, message: "Le damos la bienvenida a nuestro selector de zapatillas", usuarios };
    }
}
export { Registro }

function InicioSesion(Data) {
    let usuarios = []
    usuarios = JSON.parse(fs.readFileSync("UsuariosRegistrados.json", "utf-8"));
    let usuarioSesion = usuarios.find((usuario) => Data.Nombre === usuario.Nombre && Data.Contraseña === usuario.Contraseña)

    if(usuarioSesion !== undefined) {
        return { ok: true, info: "Login Exitoso"}
    }
    else {
        return { ok: false, info: "Login Fallido" }
    }
}
export { InicioSesion };

function Comentario(Data) {
    let usuario = Data.Nombre
    let comentario = Data.crearcomentario

    const DATA_FILE = path.resolve(process.cwd(), 'Comentarios.json');
    if (!Data || !comentario || !usuario) {
        return { success: false, error: 'Faltan campos: "crearcomentario" y "NOMBRE" son requeridos.' };
    }

    let comentarios = [];
    try {
        const raw = fs.readFileSync(DATA_FILE, 'utf8');
        comentarios = JSON.parse(raw);
        if (!Array.isArray(comentarios)) comentarios = [];
    } catch (err) {
        if (err.code !== 'ENOENT') {
            return { success: false, error: 'Error al leer el archivo: ' + err.message };
        }
    }

    const comentarioNuevo = {
        Mensaje: comentario,
        Autor: usuario
    };

    comentarios.push(comentarioNuevo);

    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(comentarios, null, 2), 'utf8');
    } catch (err) {
        return { success: false, error: 'Error al escribir el archivo: ' + err.message };
    }

    return { success: true, mensaje: 'Comentario guardado', comentario: comentarioNuevo };
}
export { Comentario };

function FiltrarZapatillas(Data) {
    let zapatillas = JSON.parse(fs.readFileSync("zapatillas.json", "utf-8"));

    let resultado = zapatillas.filter((z) => {
        let coincideColor =
            Data.color === "Cualquiera" ||
            z.Color.toLowerCase() === Data.color.toLowerCase();

        let coincideMarca =
            Data.marca === "Cualquiera" ||
            z.Marca.toLowerCase() === Data.marca.toLowerCase();

        let coincideTipo =
            Data.tipo === "Cualquiera" ||
            (z.Tipo && z.Tipo.toLowerCase() === Data.tipo.toLowerCase());

        let precioNum = parseFloat(z.Precio.replace("$", ""));
        let coincidePrecio = true;

        switch (Data.precio) {
            case "k": coincidePrecio = precioNum < 50; break;
            case "kk": coincidePrecio = precioNum >= 50 && precioNum < 100; break;
            case "kkk": coincidePrecio = precioNum >= 100 && precioNum < 150; break;
            case "kkkk": coincidePrecio = precioNum >= 150 && precioNum < 200; break;
            case "kkkkk": coincidePrecio = precioNum >= 200 && precioNum < 250; break;
            case "kkkkkk": coincidePrecio = precioNum >= 250; break;
        }

        return coincideColor && coincideMarca && coincideTipo && coincidePrecio;
    });

    return resultado;
}
export { FiltrarZapatillas };

function BuscarZapatilla(Data) {
    let zapatillas = JSON.parse(fs.readFileSync("zapatillas.json", "utf-8"));
    const query = (Data.nombre || "").toString().trim().toLowerCase();
    if (!query) return [];

    const resultados = zapatillas.filter((z) => {
        const nombre = (z.Nombre || "").toString().toLowerCase();
        const marca = (z.Marca || "").toString().toLowerCase();
        const color = (z.Color || "").toString().toLowerCase();

        return (
            (nombre && nombre.includes(query)) ||
            (marca && marca.includes(query)) ||
            (color && color.includes(query))
        );
    });

    return resultados;
}
export { BuscarZapatilla };

function CalcularRecomendaciones(Data) {
    let zapatillas = JSON.parse(fs.readFileSync("zapatillas.json", "utf-8"));

    console.log("Respuestas recibidas:", Data);

    let puntuaciones = {};
    zapatillas.forEach((zapatilla, index) => {
        puntuaciones[index] = 0;
    });
    
    if (Data.rp1 === "A") {

        zapatillas.forEach((z, i) => {
            if (z.Marca === "Nike" && z.Nombre.includes("Air Force")) puntuaciones[i] += 5;
            if (z.Marca === "Vans" && z.Nombre.includes("Old Skool")) puntuaciones[i] += 5;
            if (z.Marca === "Reebok" && z.Nombre.includes("Classic")) puntuaciones[i] += 4;
            if (z.Marca === "New Balance" && (z.Nombre.includes("990") || z.Nombre.includes("992"))) puntuaciones[i] += 4;
            if (z.Marca === "ASICS" && z.Nombre.includes("Gel-1130")) puntuaciones[i] += 4;
            if (z.Color === "Blanco" || z.Color === "Negro" || z.Color === "Gris") puntuaciones[i] += 3;
            let precio = parseFloat(z.Precio.replace("$", ""));
            if (precio < 200) puntuaciones[i] += 2;
        });
        
    } else if (Data.rp1 === "B") {
        zapatillas.forEach((z, i) => {
            if (z.Marca === "ASICS") puntuaciones[i] += 5;
            if (z.Marca === "Nike" && (z.Nombre.includes("Boost") || z.Nombre.includes("React"))) puntuaciones[i] += 4;
            if (z.Marca === "Adidas" && (z.Nombre.includes("Boost") || z.Nombre.includes("NMD") || z.Nombre.includes("Nite Jogger"))) puntuaciones[i] += 5;
            if (z.Marca === "New Balance") puntuaciones[i] += 4;
            if (z.Color === "Negro" || z.Color === "Gris") puntuaciones[i] += 2;
        });
        
    } else if (Data.rp1 === "C") {
        zapatillas.forEach((z, i) => {
            if (z.Marca === "Jordan") puntuaciones[i] += 6;
            if (z.Marca === "Adidas" && z.Nombre.includes("Yeezy")) puntuaciones[i] += 6;
            if (z.Marca === "Nike" && z.Nombre.includes("Dunk")) puntuaciones[i] += 5;
            if (z.Color === "Rojo" || z.Color === "Azul" || z.Color === "Verde" || z.Color === "Celeste") puntuaciones[i] += 3;
            let precio = parseFloat(z.Precio.replace("$", ""));
            if (precio > 200) puntuaciones[i] += 2;
        });
    }

    if (Data.rp2 === "B") {
        zapatillas.forEach((z, i) => {
            if (z.Marca === "ASICS") puntuaciones[i] += 4;
            if (z.Marca === "Adidas" && (z.Nombre.includes("Boost") || z.Nombre.includes("NMD") || z.Nombre.includes("Nite Jogger"))) puntuaciones[i] += 4;
            if (z.Marca === "New Balance") puntuaciones[i] += 3;
        });
        
    } else if (Data.rp2 === "C") {
        zapatillas.forEach((z, i) => {
            if (z.Marca === "Jordan") puntuaciones[i] += 5;
            if (z.Marca === "Adidas" && z.Nombre.includes("Yeezy")) puntuaciones[i] += 5;
            if (z.Marca === "Nike" && z.Nombre.includes("Dunk")) puntuaciones[i] += 4;
            if (z.Marca === "Vans") puntuaciones[i] += 3;
        });
        
    } else if (Data.rp2 === "D") {
        zapatillas.forEach((z, i) => {
            if (z.Nombre.includes("Air Force")) puntuaciones[i] += 4;
            if (z.Marca === "New Balance") puntuaciones[i] += 4;
            if (z.Marca === "Reebok") puntuaciones[i] += 3;
            if (z.Marca === "Vans") puntuaciones[i] += 3;
            if (z.Marca === "ASICS") puntuaciones[i] += 3;
            if (z.Nombre.includes("Slide")) puntuaciones[i] += 4;
        });
    }

    if (Data.rp3 === "A") {
        zapatillas.forEach((z, i) => {
            if (z.Marca === "Adidas" && z.Nombre.includes("Yeezy")) puntuaciones[i] += 4;
            if (z.Marca === "Jordan") puntuaciones[i] += 3;
            if (z.Marca === "Nike" && z.Nombre.includes("Dunk")) puntuaciones[i] += 3;
            if (z.Color !== "Negro" && z.Color !== "Blanco" && z.Color !== "Gris") puntuaciones[i] += 2;
        });
        
    } else if (Data.rp3 === "B") {
        zapatillas.forEach((z, i) => {
            if (z.Marca === "Nike" && z.Nombre.includes("Dunk")) puntuaciones[i] += 3;
            if (z.Marca === "Vans") puntuaciones[i] += 3;
            if (z.Marca === "New Balance") puntuaciones[i] += 2;
        });
        
    } else if (Data.rp3 === "C") {
        zapatillas.forEach((z, i) => {
            if (z.Nombre.includes("Air Force")) puntuaciones[i] += 4;
            if (z.Marca === "Vans" && z.Nombre.includes("Old Skool")) puntuaciones[i] += 4;
            if (z.Marca === "Reebok" && z.Nombre.includes("Classic")) puntuaciones[i] += 3;
            if (z.Color === "Blanco" || z.Color === "Negro") puntuaciones[i] += 3;
        });
    }

    if (Data.rp4 === "A") {
        zapatillas.forEach((z, i) => {
            if (z.Marca === "Vans") puntuaciones[i] += 4;
            if (z.Nombre.includes("Air Force")) puntuaciones[i] += 4;
            if (z.Marca === "Nike" && z.Nombre.includes("Dunk")) puntuaciones[i] += 3;
            if (z.Marca === "Adidas" && (z.Nombre.includes("NMD") || z.Nombre.includes("Yeezy Slide"))) puntuaciones[i] += 3;
        });
        
    } else if (Data.rp4 === "B") {
        zapatillas.forEach((z, i) => {
            if (z.Marca === "New Balance") puntuaciones[i] += 5;
            if (z.Marca === "ASICS") puntuaciones[i] += 5;
            if (z.Marca === "Reebok") puntuaciones[i] += 3;
            if (z.Nombre.includes("Air Force")) puntuaciones[i] += 4;
            if (z.Nombre.includes("Slide")) puntuaciones[i] += 3;
            if (z.Marca === "Adidas" && z.Nombre.includes("Boost")) puntuaciones[i] += 4;
        });
        
    } else if (Data.rp4 === "C") {
        zapatillas.forEach((z, i) => {
            if (z.Marca === "Jordan") puntuaciones[i] += 6;
            if (z.Marca === "Adidas" && z.Nombre.includes("Yeezy") && !z.Nombre.includes("Slide")) puntuaciones[i] += 5;
            let precio = parseFloat(z.Precio.replace("$", ""));
            if (precio > 250) puntuaciones[i] += 3;
            if (precio > 200) puntuaciones[i] += 2;
            if (z.Color === "Rojo" || z.Color === "Azul") puntuaciones[i] += 2;
        });
    }

    if (Data.rp5 === "A") {
        zapatillas.forEach((z, i) => {
            if (z.Color === "Blanco") puntuaciones[i] += 5;
            if (z.Color === "Negro") puntuaciones[i] += 5;
            if (z.Color === "Gris") puntuaciones[i] += 3;
            if (z.Nombre.includes("Air Force")) puntuaciones[i] += 3;
            if (z.Marca === "Vans" && z.Nombre.includes("Old Skool")) puntuaciones[i] += 3;
            if (z.Marca === "Reebok" && z.Nombre.includes("Classic")) puntuaciones[i] += 2;
            if (z.Color === "Rojo" || z.Color === "Verde") puntuaciones[i] -= 2;
        });
        
    } else if (Data.rp5 === "B") {
        zapatillas.forEach((z, i) => {
            if (z.Color === "Blanco" || z.Color === "Negro" || z.Color === "Gris") puntuaciones[i] += 3;
            if (z.Color === "Celeste" || z.Color === "Azul") puntuaciones[i] += 2;
        });
        
    } else if (Data.rp5 === "D") {
        zapatillas.forEach((z, i) => {
            if (z.Color === "Rojo") puntuaciones[i] += 4;
            if (z.Color === "Verde") puntuaciones[i] += 4;
            if (z.Color === "Azul") puntuaciones[i] += 3;
            if (z.Color === "Celeste") puntuaciones[i] += 3;
            if (z.Marca === "Jordan" && z.Nombre.includes("Thunder")) puntuaciones[i] += 3;
            if (z.Marca === "Adidas" && z.Nombre.includes("Yeezy") && z.Nombre.includes("Zebra")) puntuaciones[i] += 3;
        });
    }

    if (Data.rp10 === "A") {
        zapatillas.forEach((z, i) => {
            if (z.Marca === "New Balance") puntuaciones[i] += 6;
            if (z.Marca === "ASICS") puntuaciones[i] += 6;
            if (z.Marca === "Reebok") puntuaciones[i] += 4;
            if (z.Nombre.includes("990") || z.Nombre.includes("992")) puntuaciones[i] += 5;
            if (z.Nombre.includes("Gel")) puntuaciones[i] += 4;
            if (z.Nombre.includes("Boost")) puntuaciones[i] += 4;
            if (z.Nombre.includes("Slide")) puntuaciones[i] += 4;
            if (z.Nombre.includes("Air Force")) puntuaciones[i] += 4;
            if (z.Nombre.includes("Classic")) puntuaciones[i] += 3;
            let precio = parseFloat(z.Precio.replace("$", ""));
            if (precio < 200) puntuaciones[i] += 2;
        });
        
    } else if (Data.rp10 === "B") {
        zapatillas.forEach((z, i) => {
            if (z.Marca === "Jordan") puntuaciones[i] += 6;
            if (z.Marca === "Adidas" && z.Nombre.includes("Yeezy")) puntuaciones[i] += 6;
            if (z.Marca === "Nike" && z.Nombre.includes("Dunk")) puntuaciones[i] += 5;
            if (z.Nombre.includes("Retro")) puntuaciones[i] += 4;
            if (z.Nombre.includes("OG")) puntuaciones[i] += 3;
            if (z.Nombre.includes("Undefeated") || z.Nombre.includes("Zebra")) puntuaciones[i] += 4;
            let precio = parseFloat(z.Precio.replace("$", ""));
            if (precio > 250) puntuaciones[i] += 3;
        });
        
    } else if (Data.rp10 === "C") {
        zapatillas.forEach((z, i) => {
            if (z.Marca === "New Balance") puntuaciones[i] += 6;
            if (z.Marca === "ASICS") puntuaciones[i] += 5;
            if (z.Marca === "Reebok") puntuaciones[i] += 4;
            if (z.Marca === "Nike" && z.Nombre.includes("Air Force")) puntuaciones[i] += 5;
            if (z.Nombre.includes("990") || z.Nombre.includes("992")) puntuaciones[i] += 5;
            if (z.Nombre.includes("Classic")) puntuaciones[i] += 4;
            let precio = parseFloat(z.Precio.replace("$", ""));
            if (precio >= 150 && precio <= 300) puntuaciones[i] += 3;
        });
    }
    let resultado = zapatillas.map((z, i) => ({
        ...z,
        puntuacion: puntuaciones[i]
    }))
    .filter(z => z.puntuacion > 0)
    .sort((a, b) => b.puntuacion - a.puntuacion)
    .slice(0, 8);
    
    console.log("Top zapatillas recomendadas:");
    resultado.forEach((z, i) => {
        console.log(`${i + 1}. ${z.Nombre} (${z.Marca}) - Puntuación: ${z.puntuacion}`);
    });
    
    return { shoes: resultado };
}
export { CalcularRecomendaciones };

function ToggleFavorito(Data) {
    const { NOMBRE, zapatilla } = Data;
    
    if (!NOMBRE || !zapatilla) {
        return { success: false, error: 'Faltan datos: usuario y zapatilla son requeridos.' };
    }

    const idUnico = zapatilla.id || `${zapatilla.Nombre}_${zapatilla.Marca}_${zapatilla.Precio}`.replace(/\s/g, '_');

    let favoritos = [];
    try {
        const raw = fs.readFileSync("favoritos.json", "utf-8");
        favoritos = JSON.parse(raw);
        if (!Array.isArray(favoritos)) favoritos = [];
    } catch (err) {
        if (err.code !== 'ENOENT') {
            return { success: false, error: 'Error al leer favoritos: ' + err.message };
        }
    }

    const index = favoritos.findIndex(
        fav => fav.usuario === NOMBRE && 
               fav.nombre === zapatilla.Nombre && 
               fav.marca === (zapatilla.Marca || '')
    );

    if (index !== -1) {
        favoritos.splice(index, 1);
        
        try {
            fs.writeFileSync("favoritos.json", JSON.stringify(favoritos, null, 2), "utf-8");
            return { success: true, action: 'removed', message: 'Favorito eliminado' };
        } catch (err) {
            return { success: false, error: 'Error al escribir favoritos: ' + err.message };
        }
    } else {
        const nuevoFavorito = {
            usuario: NOMBRE,
            id: idUnico,
            nombre: zapatilla.Nombre,
            precio: zapatilla.Precio,
            imagenUrl: zapatilla.Imagen,
            marca: zapatilla.Marca || '',
            color: zapatilla.Color || '',
            fechaAgregado: new Date().toISOString()
        };

        favoritos.push(nuevoFavorito);

        try {
            fs.writeFileSync("favoritos.json", JSON.stringify(favoritos, null, 2), "utf-8");
            return { success: true, action: 'added', message: 'Favorito agregado' };
        } catch (err) {
            return { success: false, error: 'Error al escribir favoritos: ' + err.message };
        }
    }
}
export { ToggleFavorito };

function ObtenerFavoritos(queryParams) {
    const usuario = queryParams.usuario;
    
    if (!usuario) {
        return [];
    }

    let favoritos = [];
    try {
        const raw = fs.readFileSync("favoritos.json", "utf-8");
        favoritos = JSON.parse(raw);
        if (!Array.isArray(favoritos)) favoritos = [];
    } catch (err) {
        if (err.code === 'ENOENT') {
            return [];
        }
        console.error('Error al leer favoritos:', err);
        return [];
    }

    const favoritosUsuario = favoritos.filter(fav => fav.usuario === usuario);
    
    return favoritosUsuario;
}
export { ObtenerFavoritos };

function QuitarFavorito(queryParams) {
    const idZapatilla = queryParams.id;
    const usuario = queryParams.usuario;
    
    if (!idZapatilla || !usuario) {
        return { success: false, error: 'Faltan parámetros: id y usuario son requeridos.' };
    }

    let favoritos = [];
    try {
        const raw = fs.readFileSync("favoritos.json", "utf-8");
        favoritos = JSON.parse(raw);
        if (!Array.isArray(favoritos)) favoritos = [];
    } catch (err) {
        return { success: false, error: 'Error al leer favoritos.' };
    }

    const nuevosFavoritos = favoritos.filter(
        fav => !(fav.usuario === usuario && fav.id === idZapatilla)
    );

    try {
        fs.writeFileSync("favoritos.json", JSON.stringify(nuevosFavoritos, null, 2), "utf-8");
        return { success: true, message: 'Favorito eliminado correctamente' };
    } catch (err) {
        return { success: false, error: 'Error al escribir favoritos: ' + err.message };
    }
}
export { QuitarFavorito };

function VerificarFavorito(queryParams) {
    const usuario = queryParams.usuario;
    const idZapatilla = queryParams.id;
    
    if (!usuario || !idZapatilla) {
        return { esFavorito: false };
    }

    let favoritos = [];
    try {
        const raw = fs.readFileSync("favoritos.json", "utf-8");
        favoritos = JSON.parse(raw);
        if (!Array.isArray(favoritos)) favoritos = [];
    } catch (err) {
        return { esFavorito: false };
    }

    const existe = favoritos.some(
        fav => fav.usuario === usuario && fav.id === idZapatilla
    );

    return { esFavorito: existe };
}
export { VerificarFavorito };

