import { subscribePOSTEvent, startServer } from "soquetic";
import fs from "fs";

// Leer zapatillas desde el JSON
const zapatillas = JSON.parse(fs.readFileSync("./zapatillas.json", "utf-8"));

// Escuchar evento desde el frontend
subscribePOSTEvent("filtrarZapatillas", (filtros) => {
  let resultado = zapatillas.filter((z) => {
    const coincideColor =
      filtros.color === "Cualquiera" || z.Color.toLowerCase() === filtros.color.toLowerCase();
    const coincideMarca =
      filtros.marca === "Cualquiera" || z.Marca.toLowerCase() === filtros.marca.toLowerCase();
    const coincideTipo =
      filtros.tipo === "Cualquiera" || z.Tipo?.toLowerCase() === filtros.tipo.toLowerCase();

    // Convertir "$128" → 128
    const precioNum = parseFloat(z.Precio.replace("$", ""));
    let coincidePrecio = true;
    switch (filtros.precio) {
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
});

startServer(3000);

import { subscribePOSTEvent, startServer } from "soquetic";
import fs from "fs";

// Escuchar pedidos del frontend
subscribePOSTEvent("buscarZapatilla", (data) => {
  const { nombre } = data; // viene desde el frontend

  // Leer el JSON con las zapatillas
  const jsonData = fs.readFileSync("./backend/zapatillas.json", "utf-8");
  const zapatillas = JSON.parse(jsonData);

  // Buscar coincidencias (nombre, marca, color o precio)
  const resultados = zapatillas.filter((z) => {
    const query = nombre.toLowerCase();
    return (
      z.nombre.toLowerCase().includes(query) ||
      z.marca.toLowerCase().includes(query) ||
      z.color.toLowerCase().includes(query) ||
      z.precio.toString().includes(query)
    );
  });

  return resultados; // esto vuelve al frontend
});

startServer(3000);
