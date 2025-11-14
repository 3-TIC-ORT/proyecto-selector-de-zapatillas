import { subscribePOSTEvent, startServer } from "soquetic";
import fs from "fs";

const zapatillas = JSON.parse(fs.readFileSync("./zapatillas.json", "utf-8"));


subscribePOSTEvent("filtrarZapatillas", (filtros) => {
  let resultado = zapatillas.filter((z) => {
    const coincideColor =
      filtros.color === "Cualquiera" || z.Color.toLowerCase() === filtros.color.toLowerCase();
    const coincideMarca =
      filtros.marca === "Cualquiera" || z.Marca.toLowerCase() === filtros.marca.toLowerCase();
    const coincideTipo =
      filtros.tipo === "Cualquiera" || z.Tipo?.toLowerCase() === filtros.tipo.toLowerCase();


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

subscribePOSTEvent("buscarZapatilla", (data) => {
  const { nombre } = data;
  const query = nombre.toLowerCase();

  const resultados = zapatillas.filter((z) =>
    z.Nombre.toLowerCase().includes(query) ||
    z.Marca.toLowerCase().includes(query) ||
    z.Color.toLowerCase().includes(query)
  );

  return resultados;
});

startServer(3000);
