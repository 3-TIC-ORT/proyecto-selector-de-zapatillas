import { subscribePOSTEvent, realTimeEvent, startServer } from "soquetic";
import fs from "fs";

// Leer zapatillas desde el JSON
const zapatillas = JSON.parse(fs.readFileSync("./zapatillas.json", "utf-8"));

let respuestas = {};

subscribePOSTEvent("respuestaPregunta1", (data) => {
  respuestas.p1 = data.opcion;
});

subscribePOSTEvent("respuestaPregunta2", (data) => {
  respuestas.p2 = data.opcion;
});

subscribePOSTEvent("respuestaPregunta3", (data) => {
  respuestas.p3 = data.opcion;
});

subscribePOSTEvent("respuestaPregunta4", (data) => {
  respuestas.p4 = data.opcion;
});

subscribePOSTEvent("respuestaPregunta5", (data) => {
  respuestas.p5 = data.opcion;
});

subscribePOSTEvent("respuestaPregunta6", (data) => {
  respuestas.p6 = data.opcion;
});

subscribePOSTEvent("respuestaPregunta7", (data) => {
  respuestas.p7 = data.opcion;
});

subscribePOSTEvent("respuestaPregunta8", (data) => {
  respuestas.p8 = data.opcion;
});

subscribePOSTEvent("respuestaPregunta9", (data) => {
  respuestas.p9 = data.opcion;
});

subscribePOSTEvent("respuestaPregunta10", (data) => {
  respuestas.p10 = data.opcion;
  // Procesar recomendaciones
  let filtered = filterShoes(respuestas);
  realTimeEvent("recomendaciones", { shoes: filtered });
});

function filterShoes(respuestas) {
  let colorMap = { A: "Negro", B: "Blanco", C: "Rojo", D: "Azul" };
  let marcaMap = { A: "Nike", B: "Adidas", C: "Jordan", D: "ASICS" };
  let precioMap = { A: "<50", B: "50-100", C: "100-150", D: ">150" };

  let color = colorMap[respuestas.p5];
  let marca = marcaMap[respuestas.p6];
  let precio = precioMap[respuestas.p4];

  let filtered = zapatillas.filter((z) => {
    let coincideColor = !color || z.Color === color;
    let coincideMarca = !marca || z.Marca === marca;
    let precioNum = parseFloat(z.Precio.replace("$", ""));
    let coincidePrecio = true;
    if (precio === "<50") coincidePrecio = precioNum < 50;
    else if (precio === "50-100") coincidePrecio = precioNum >= 50 && precioNum < 100;
    else if (precio === "100-150") coincidePrecio = precioNum >= 100 && precioNum < 150;
    else if (precio === ">150") coincidePrecio = precioNum > 150;
    return coincideColor && coincideMarca && coincidePrecio;
  });

  return filtered;
}

startServer(3000);
