const API_KEY = 'sd_8DR31QzESEApgfhgo0OaDKexNssRTbJf';

async function getProduct(slug) {
  const url = `https://api.kicks.dev/v3/stockx/products/${encodeURIComponent(slug)}`;
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Accept': 'application/json'
    }
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Error al obtener producto: ${response.status} ${errText}`);
  }

  const { data } = await response.json();
  
  console.log(`\n👟 ${data.title}`);
  console.log(`Marca: ${data.brand}`);
  console.log(`Precio: $${data.avg_price}`);
  console.log(`Imagen: ${data.image}`);
  console.log(`Color: ${data.goat_product.colorway}`);
  
}

(async () => {
  try {
    const slug = 'air-jordan-4-retro-red-thunder';
    await getProduct(slug);
  } catch (err) {
    console.error('❌ Error:', err.message);
  }
})();

(async () => {
    try {
      const slug = 'asics-gel-1130-black-pure-silver';
      await getProduct(slug);
    } catch (err) { 
      console.error('❌ Error:', err.message);
    }
  })();

  (async () => {
    try {
      const slug = 'adidas-yeezy-boost-350-v2-white-core-black-red';
      await getProduct(slug);
    } catch (err) {
      console.error('❌ Error:', err.message);
    }
  })();

