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
  console.log(`Slug: ${slug}`);
  console.log(`Marca: ${data.brand}`);
  console.log(`Precio: $${data.avg_price}`);
  console.log(`Imagen: ${data.image}`);
}

const slugs = [
  
];

slugs.forEach(slug => {
  (async () => {
    try {
      await getProduct(slug);
    } catch (err) {
      console.error('❌ Error:', err.message);
    }
  })();
});
