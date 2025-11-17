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
  'nike-air-jordan-1-retro-high-og-university-blue',
  'nike-air-jordan-1-retro-high-og-chicago',
  'nike-air-jordan-1-retro-high-og-bred',
  'nike-air-jordan-1-low-black-toe',
  'nike-dunk-low-syracuse',
  'nike-dunk-low-university-blue',
  'nike-air-max-1-infrared',
  'nike-air-max-97-silver-bullet',
  'nike-air-force-1-07-white',
  'nike-foamposite-one-metallic',
  'adidas-yeezy-boost-350-v2-zebra',
  'adidas-yeezy-boost-350-v2-beluga',
  'adidas-yeezy-boost-700-wave-runner',
  'adidas-ultra-boost-1-0-core-black',
  'adidas-nmd-r1-triple-black',
  'new-balance-990v5-grey',
  'new-balance-550-white-navy',
  'new-balance-992-grey',
  'converse-chuck-taylor-all-star-70-hi',
  'vans-old-skool-black-white',
  'vans-slip-on-black-white',
  'off-white-nike-air-presto-the-ten',
  'off-white-nike-air-max-90',
  'sacai-nike-vaporwaffle-black-white',
  'asics-gel-lyte-iii',
  'asics-gel-kayano-14',
  'puma-suede-classic',
  'reebok-club-c-85-white',
  'reebok-question-mid',
  'air-jordan-4-retro-bred',
  'air-jordan-11-concord',
  'air-jordan-11-bred',
  'travis-scott-x-air-jordan-1-low',
  'sacai-nike-blazer-low',
  'under-armour-curry-1',
  'nike-air-jordan-4-retro-thunder',
  'nike-dunk-low-panda',
  'adidas-yeezy-450-cloud-white',
  'new-balance-2002r-protection-pack-rain-cloud',
  'adidas-superstar-core-black-white',
  'adidas-forum-low-white-red',
  'nike-air-max-270-react',
  'nike-zoom-fly-3',
  'off-white-x-air-jordan-5',
  'adidas-yeezy-boost-380-mist',
  'saucony-shadow-6000',
  'hoka-one-one-clifton-8',
  'nike-kobe-6-protro-grinch',
  'nike-lebron-18',
  'air-jordan-3-white-cement',
  'air-jordan-5-retro-fire-red',
  'nike-dunk-low-grey-fog'
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
