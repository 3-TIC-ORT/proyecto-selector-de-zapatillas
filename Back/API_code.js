import fs from "fs";

const API_KEY = 'sd_8DR31QzESEApgfhgo0OaDKexNssRTbJf';
const JSON_FILE = 'zapatillas.json';
const DELAY_MS = 1000; 

const slugsToAdd = [
  'air-jordan-1-retro-high-og-black-toe-reimagined',
  'air-jordan-1-retro-high-og-chicago-reimagined',
  'air-jordan-1-retro-high-og-unc-reimagined',
  'air-jordan-1-retro-high-og-patent-bred',
  'air-jordan-1-retro-high-og-bred-toe',
  'air-jordan-1-retro-high-og-university-blue',
  'air-jordan-1-retro-high-og-hyper-royal',
  'air-jordan-1-retro-high-og-royal-toe',
  'air-jordan-1-retro-high-og-court-purple',
  'air-jordan-1-retro-high-og-smoke-grey',
  'air-jordan-1-retro-high-og-shadow-2-0',
  'air-jordan-1-retro-high-og-electro-orange',
  'air-jordan-1-retro-high-og-obsidian',
  'air-jordan-1-retro-high-og-pine-green',
  'air-jordan-1-retro-high-og-satin-snake-chicago',
  'air-jordan-1-retro-high-og-gym-red',
  'air-jordan-1-retro-high-og-turbo-green',
  'air-jordan-1-retro-high-og-crimson-tint',
  'air-jordan-1-retro-high-og-homage-to-home',
  'air-jordan-1-retro-high-og-rust-pink',
  'air-jordan-1-low-og-medium-olive',
  'air-jordan-1-low-og-shadow',
  'air-jordan-1-low-og-starfish',
  'air-jordan-1-low-og-neutral-grey',
  'air-jordan-1-low-og-obsidian',
  'air-jordan-1-low-og-ghost-green',
  'air-jordan-1-low-og-bred',
  'air-jordan-1-low-og-black-toe',
  'air-jordan-1-low-og-seafoam',
  'air-jordan-1-low-og-university-blue',
  'air-jordan-1-low-og-smoke-grey',
  'air-jordan-1-low-og-shattered-backboard',
  'air-jordan-1-low-golf-midnight-navy',
  'air-jordan-1-low-travis-scott',
  'air-jordan-1-low-travis-scott-black-phantom',
  'air-jordan-1-low-travis-scott-olive',
  'air-jordan-1-low-fragment-travis-scott',
  'air-jordan-1-retro-high-og-spider-man-origin-story',
  'air-jordan-1-retro-high-og-fearless-unc-chicago',
  'air-jordan-1-retro-high-og-satin-black-toe',
  'air-jordan-1-retro-high-og-metallic-red',
  'air-jordan-1-retro-high-og-metallic-gold',
  'air-jordan-1-retro-high-og-bloodline',
  'air-jordan-1-high-85-varsity-red',
  'air-jordan-1-high-85-neutral-grey',
  'air-jordan-1-high-85-georgetown',
  'air-jordan-3-retro-black-cat',
  'air-jordan-3-retro-white-cement',
  'air-jordan-3-retro-fire-red',
  'air-jordan-3-retro-cool-grey',
  'air-jordan-3-retro-true-blue',
  'air-jordan-3-retro-black-cement',
  'air-jordan-3-retro-tinker',
  'air-jordan-3-retro-mocha',
  'air-jordan-3-retro-unc',
  'air-jordan-3-retro-georgetown',
  'air-jordan-3-retro-pine-green',
  'air-jordan-4-retro-bred-reimagined',
  'air-jordan-4-retro-military-black',
  'air-jordan-4-retro-military-blue',
  'air-jordan-4-retro-white-cement',
  'air-jordan-4-retro-bred',
  'air-jordan-4-retro-thunder',
  'air-jordan-4-retro-cool-grey',
  'air-jordan-4-retro-fire-red',
  'air-jordan-4-retro-black-cat',
  'air-jordan-4-retro-og-sp-undefeated',
  'air-jordan-4-retro-sb-navy',
  'air-jordan-4-retro-craft-olive',
  'air-jordan-4-retro-canyon-purple',
  'air-jordan-4-retro-metallic-purple',
  'air-jordan-4-retro-oxidized-green',
  'air-jordan-4-retro-unc',
  'air-jordan-4-retro-university-blue',
  'air-jordan-5-retro-fire-red-black-tongue',
  'air-jordan-5-retro-grape',
  'air-jordan-5-retro-metallic',
  'air-jordan-5-retro-black-metallic',
  'air-jordan-5-retro-aqua',
  'air-jordan-5-retro-raging-bull',
  'air-jordan-5-retro-oregon',
  'air-jordan-6-retro-black-infrared',
  'air-jordan-6-retro-carmine',
  'air-jordan-6-retro-white-fire-red',
  'air-jordan-6-retro-university-blue',
  'air-jordan-6-retro-maroon',
  'air-jordan-11-retro-cherry',
  'air-jordan-11-retro-bred',
  'air-jordan-11-retro-space-jam',
  'air-jordan-11-retro-cool-grey',
  'air-jordan-11-retro-concord',
  'air-jordan-11-retro-72-10',
  'air-jordan-11-retro-win-like-82',
  'air-jordan-11-retro-win-like-96',
  'air-jordan-11-retro-gamma-blue',
  'air-jordan-11-retro-low-concord-bred',
  'air-jordan-12-retro-playoffs',
  'air-jordan-12-retro-flu-game',
  'air-jordan-12-retro-taxi',
  'air-jordan-12-retro-french-blue',
  'air-jordan-12-retro-cherry',
  'air-jordan-13-retro-black-flint',
  'air-jordan-13-retro-he-got-game',
  'air-jordan-13-retro-bred',
  'air-jordan-14-retro-ferrari',
  'air-jordan-14-retro-last-shot',
  'nike-dunk-low-retro-white-black-panda',
  'nike-dunk-low-retro-white-black',
  'nike-dunk-low-black-white',
  'nike-dunk-low-grey-fog',
  'nike-dunk-low-photon-dust',
  'nike-dunk-low-vintage-navy',
  'nike-dunk-low-michigan',
  'nike-dunk-low-championship-red',
  'nike-dunk-low-university-blue',
  'nike-dunk-low-veneer',
  'nike-dunk-low-varsity-green',
  'nike-dunk-low-coast',
  'nike-dunk-low-university-gold',
  'nike-dunk-low-apple-green',
  'nike-dunk-low-setsubun',
  'nike-dunk-low-polar-blue',
  'nike-dunk-low-orange-pearl',
  'nike-dunk-low-team-gold',
  'nike-dunk-low-ceramic',
  'nike-dunk-low-champ-colors',
  'nike-dunk-low-iowa',
  'nike-dunk-low-kentucky',
  'nike-dunk-low-syracuse',
  'nike-dunk-low-unlv',
  'nike-dunk-low-georgetown',
  'nike-dunk-low-court-purple',
  'nike-dunk-low-plum',
  'nike-dunk-low-brazil',
  'nike-dunk-low-medium-grey',
  'nike-dunk-low-goldenrod',
  'nike-dunk-low-harvest-moon',
  'nike-dunk-low-green-glow',
  'nike-dunk-low-dark-sulfur',
  'nike-dunk-low-valerian-blue',
  'nike-dunk-low-pink-velvet',
  'nike-dunk-low-free-99-black',
  'nike-dunk-low-laser-orange',
  'nike-dunk-low-multi-camo',
  'nike-dunk-low-cider',
  'nike-dunk-low-team-green',
  'nike-dunk-low-midnight-navy',
  'nike-dunk-low-bordeaux',
  'nike-dunk-low-crimson-tint',
  'nike-dunk-low-samba',
  'nike-dunk-low-argon',
  'nike-dunk-low-community-garden',
  'nike-dunk-low-next-nature-triple-white',
  'nike-dunk-low-next-nature-white-black',
  'nike-dunk-low-disrupt-2-pink-foam',
  'nike-sb-dunk-low-pro-why-so-sad',
  'nike-sb-dunk-low-travis-scott',
  'nike-sb-dunk-low-jarritos',
  'nike-sb-dunk-low-ben-jerrys-chunky-dunky',
  'nike-sb-dunk-low-street-hawker',
  'nike-sb-dunk-low-raygun-tie-dye-black',
  'nike-sb-dunk-low-grateful-dead-bears-orange',
  'nike-sb-dunk-low-grateful-dead-bears-yellow',
  'nike-sb-dunk-low-grateful-dead-bears-green',
  'nike-sb-dunk-low-orange-label-navy',
  'nike-sb-dunk-low-pro-iso-university-blue',
  'nike-sb-dunk-low-skate-like-a-girl',
  'nike-sb-dunk-low-chicago',
  'nike-sb-dunk-low-laser-orange',
  'nike-sb-dunk-low-parra-abstract-art',
  'nike-sb-dunk-low-strangelove-skateboards',
  'nike-sb-dunk-low-mummy',
  'nike-sb-dunk-low-civilist',
  'nike-sb-dunk-low-instant-skateboards',
  'nike-sb-dunk-low-atlas-lost-at-sea',
  'nike-sb-dunk-low-tiffany',
  'nike-sb-dunk-low-pigeon',
  'nike-sb-dunk-low-heineken',
  'nike-sb-dunk-low-lobster-red',
  'nike-sb-dunk-low-lobster-purple',
  'nike-sb-dunk-low-lobster-blue',
  'nike-sb-dunk-high-wu-tang',
  'nike-sb-dunk-high-paul-rodriguez-mexican-blanket',
  'nike-sb-dunk-high-de-la-soul',
  'nike-sb-dunk-high-dog-walker',
  'nike-sb-dunk-high-concepts-stained-glass',
  'nike-sb-dunk-low-supreme-rammellzee',
  'nike-sb-dunk-low-supreme-gold',
  'nike-sb-dunk-low-supreme-jewel-swoosh-navy',
  'nike-sb-dunk-low-supreme-jewel-swoosh-red',
  'nike-sb-dunk-low-medicom-toy-be-rbrick',
  'nike-air-force-1-low-white-07',
  'nike-air-force-1-07-white',
  'nike-air-force-1-low-triple-black',
  'nike-air-force-1-low-triple-white',
  'nike-air-force-1-low-wheat',
  'nike-air-force-1-low-off-white-mca',
  'nike-air-force-1-low-supreme-white',
  'nike-air-force-1-low-travis-scott',
  'nike-air-force-1-shadow-white',
  'nike-air-force-1-low-clot-blue-silk',
  'nike-air-force-1-07-craft-white',
  'nike-air-force-1-low-skeleton-black',
  'nike-air-force-1-low-have-a-nike-day',
  'nike-air-force-1-low-puerto-rico',
  'nike-air-force-1-low-swoosh-pack-sail',
  'nike-air-force-1-low-valentines-day',
  'nike-air-force-1-low-world-wide',
  'nike-air-force-1-low-billie-eilish',
  'nike-air-force-1-low-white-grey-fog',
  'nike-air-force-1-mid-white',
  'nike-air-force-1-mid-triple-black',
  'nike-air-force-1-high-white',
  'nike-air-force-1-high-triple-black',
  'nike-air-max-1-86-og-big-bubble',
  'nike-air-max-1-white-university-red',
  'nike-air-max-1-anniversary-white-university-red',
  'nike-air-max-90-white',
  'nike-air-max-90-triple-white',
  'nike-air-max-90-triple-black',
  'nike-air-max-90-bacon',
  'nike-air-max-90-infrared',
  'nike-air-max-95-neon',
  'nike-air-max-95-og-neon',
  'nike-air-max-97-silver-bullet',
  'nike-air-max-plus-tn-hyper-blue',
  'nike-air-max-plus-og-white',
  'nike-vomero-5-light-orewood-brown',
  'nike-air-max-1-patta-waves',
  'nike-air-max-1-crepe',
  'nike-air-max-97-sean-wotherspoon',
  'nike-air-max-98-gundam',
  'adidas-yeezy-boost-350-v2-zebra',
  'adidas-yeezy-boost-350-v2-onyx',
  'adidas-yeezy-boost-350-v2-bone',
  'adidas-yeezy-boost-350-v2-beluga-reflective',
  'adidas-yeezy-boost-350-v2-beluga-2-0',
  'adidas-yeezy-boost-350-v2-bred',
  'adidas-yeezy-boost-350-v2-triple-white',
  'adidas-yeezy-boost-350-v2-cream-white',
  'adidas-yeezy-boost-350-v2-black-static',
  'adidas-yeezy-boost-350-v2-butter',
  'adidas-yeezy-boost-350-v2-sesame',
  'adidas-yeezy-boost-350-v2-clay',
  'adidas-yeezy-boost-350-v2-cloud-white',
  'adidas-yeezy-boost-350-v2-carbon',
  'adidas-yeezy-boost-350-v2-sand-taupe',
  'adidas-yeezy-boost-350-v2-tail-light',
  'adidas-yeezy-boost-350-v2-cinder',
  'adidas-yeezy-boost-350-v2-sulfur',
  'adidas-yeezy-boost-350-v2-linen',
  'adidas-yeezy-boost-350-v2-natural',
  'adidas-yeezy-boost-350-v2-ash-stone',
  'adidas-yeezy-boost-350-v2-ash-pearl',
  'adidas-yeezy-boost-350-v2-light',
  'adidas-yeezy-boost-350-v2-mono-ice',
  'adidas-yeezy-boost-350-v2-mono-mist',
  'adidas-yeezy-boost-350-v2-mono-clay',
  'adidas-yeezy-boost-350-v2-blue-tint',
  'adidas-yeezy-boost-350-v2-semi-frozen-yellow',
  'adidas-yeezy-boost-350-v2-yeezreel',
  'adidas-yeezy-boost-350-v2-yecheil',
  'adidas-yeezy-boost-350-v2-flax',
  'adidas-yeezy-boost-350-v2-desert-sage',
  'adidas-yeezy-boost-350-v2-earth',
  'adidas-yeezy-boost-350-v2-israfil',
  'adidas-yeezy-boost-350-v2-zyon',
  'adidas-yeezy-boost-350-v2-asriel',
  'adidas-yeezy-boost-350-v2-fade',
  'adidas-yeezy-boost-350-v2-slate',
  'adidas-yeezy-boost-350-v2-mx-oat',
  'adidas-yeezy-boost-350-v2-mx-rock',
  'adidas-yeezy-boost-700-wave-runner',
  'adidas-yeezy-boost-700-v2-static',
  'adidas-yeezy-boost-700-v2-vanta',
  'adidas-yeezy-boost-700-v2-geode',
  'adidas-yeezy-boost-700-v2-tephra',
  'adidas-yeezy-boost-700-v2-hospital-blue',
  'adidas-yeezy-boost-700-v2-cream',
  'adidas-yeezy-boost-700-mnvn-orange',
  'adidas-yeezy-boost-700-mnvn-triple-black',
  'adidas-yeezy-boost-700-mnvn-blue-tint',
  'adidas-yeezy-boost-700-mauve',
  'adidas-yeezy-boost-700-salt',
  'adidas-yeezy-boost-700-analog',
  'adidas-yeezy-boost-700-inertia',
  'adidas-yeezy-boost-700-utility-black',
  'adidas-yeezy-boost-700-magnet',
  'adidas-yeezy-boost-700-teal-blue',
  'adidas-yeezy-boost-700-sun',
  'adidas-yeezy-boost-700-bright-blue',
  'adidas-yeezy-boost-700-wash-orange',
  'adidas-yeezy-boost-700-v3-azael',
  'adidas-yeezy-boost-700-v3-alvah',
  'adidas-yeezy-boost-700-v3-kyanite',
  'adidas-yeezy-boost-700-v3-arzareth',
  'adidas-yeezy-boost-700-v3-safflower',
  'adidas-yeezy-boost-380-mist',
  'adidas-yeezy-boost-380-alien',
  'adidas-yeezy-boost-380-alien-blue',
  'adidas-yeezy-boost-380-calcite-glow',
  'adidas-yeezy-boost-380-pepper',
  'adidas-yeezy-450-cloud-white',
  'adidas-yeezy-450-dark-slate',
  'adidas-yeezy-500-utility-black',
  'adidas-yeezy-500-blush',
  'adidas-yeezy-500-salt',
  'adidas-yeezy-500-bone-white',
  'adidas-yeezy-500-soft-vision',
  'adidas-yeezy-500-taupe-light',
  'adidas-yeezy-500-enflame',
  'adidas-yeezy-slide-bone',
  'adidas-yeezy-slide-onyx',
  'adidas-yeezy-slide-pure',
  'adidas-yeezy-slide-granite',
  'adidas-yeezy-slide-glow-green',
  'adidas-yeezy-slide-slate-grey',
  'adidas-yeezy-slide-slate-marine',
  'adidas-yeezy-slide-resin',
  'adidas-yeezy-slide-core',
  'adidas-yeezy-slide-soot',
  'adidas-yeezy-slide-earth-brown',
  'adidas-yeezy-slide-azure',
  'adidas-yeezy-foam-runner-onyx',
  'adidas-yeezy-foam-runner-sand',
  'adidas-yeezy-foam-runner-mineral-blue',
  'adidas-yeezy-foam-runner-ararat',
  'adidas-yeezy-foam-runner-mist',
  'adidas-yeezy-foam-runner-stone-sage',
  'adidas-yeezy-foam-runner-vermillion',
  'adidas-yeezy-foam-runner-mx-cream-clay',
  'adidas-yeezy-foam-runner-mx-moon-grey',
  'adidas-yeezy-foam-runner-mx-carbon',
  'adidas-yeezy-foam-runner-ochre',
  'adidas-campus-00s-core-black',
  'adidas-campus-00s-grey',
  'adidas-campus-00s-cloud-white',
  'adidas-samba-og-white-black',
  'adidas-samba-og-cloud-white-core-black',
  'adidas-samba-classic-black-white',
  'adidas-gazelle-indoor-black',
  'adidas-gazelle-bold-pink',
  'adidas-superstar-white-black',
  'adidas-stan-smith-white-green',
  'adidas-stan-smith-triple-white',
  'adidas-forum-low-white',
  'adidas-forum-84-high-white',
  'new-balance-990v1-grey',
  'new-balance-990v2-grey',
  'new-balance-990v3-grey',
  'new-balance-990v3-navy',
  'new-balance-990v3-black',
  'new-balance-990v4-grey',
  'new-balance-990v4-navy',
  'new-balance-990v5-grey',
  'new-balance-990v5-navy',
  'new-balance-990v5-black',
  'new-balance-990v6-grey',
  'new-balance-990v6-navy',
  'new-balance-991-grey',
  'new-balance-991-made-in-uk-grey',
  'new-balance-992-grey',
  'new-balance-992-tan',
  'new-balance-992-navy',
  'new-balance-993-grey',
  'new-balance-993-black',
  'new-balance-993-navy',
  'new-balance-997-grey',
  'new-balance-997h-grey',
  'new-balance-998-grey',
  'new-balance-999-grey',
  'new-balance-550-white-grey',
  'new-balance-550-white-green',
  'new-balance-550-shadow',
  'new-balance-550-white-navy',
  'new-balance-550-team-red',
  'new-balance-550-white-team-red',
  'new-balance-2002r-protection-pack-rain-cloud',
  'new-balance-2002r-protection-pack-sea-salt',
  'new-balance-2002r-sea-salt',
  'new-balance-2002r-phantom',
  'new-balance-2002r-grey',
  'new-balance-2002r-navy',
  'new-balance-2002r-black',
  'new-balance-1906r-white-silver',
  'new-balance-1906r-steel-blue',
  'new-balance-327-grey-white',
  'new-balance-327-black-white',
  'new-balance-327-navy-white',
  'new-balance-327-green-white',
  'new-balance-574-grey',
  'new-balance-574-navy',
  'new-balance-574-black',
  'new-balance-574-maroon',
  'new-balance-9060-grey',
  'new-balance-9060-white',
  'new-balance-9060-black',
  'new-balance-530-white',
  'new-balance-530-grey',
  'asics-gel-1130-white-pure-silver',
  'asics-gel-1130-black-pure-silver',
  'asics-gel-1130-cream-pure-silver',
  'asics-gel-1130-white-black',
  'asics-gel-1130-cream-oyster-grey',
  'asics-gel-1130-birch-moonrock',
  'asics-gel-1130-navy-silver',
  'asics-gel-kayano-14-cream',
  'asics-gel-kayano-14-white-pure-silver',
  'asics-gel-kayano-14-black',
  'asics-gel-kayano-14-tarmac-birch',
  'asics-gel-kayano-14-silver-blue',
  'asics-gel-kayano-14-pink',
  'asics-gel-lyte-iii-og-white',
  'asics-gel-lyte-iii-og-cream',
  'asics-gel-lyte-iii-og-black',
  'asics-gel-lyte-v-black',
  'asics-gel-lyte-v-white',
  'asics-gt-2160-white-pure-silver',
  'asics-gt-2160-cream',
  'asics-gt-2160-oyster-grey',
  'asics-gt-2160-black',
  'asics-gel-nyc-cream',
  'asics-gel-nyc-white',
  'asics-gel-quantum-360-white',
  'asics-gel-quantum-360-black',
  'asics-gel-nimbus-9-cream',
  'asics-gel-nimbus-9-white',
  'asics-japan-s-white',
  'asics-japan-s-black',
  'vans-old-skool-black-white',
  'vans-old-skool-true-white',
  'vans-old-skool-navy-white',
  'vans-old-skool-platform-black-white',
  'vans-sk8-hi-black-white',
  'vans-sk8-hi-true-white',
  'vans-sk8-hi-navy-white',
  'vans-authentic-black-white',
  'vans-authentic-true-white',
  'vans-era-black-white',
  'vans-era-navy-white',
  'vans-slip-on-checkerboard',
  'vans-slip-on-black-white',
  'vans-slip-on-true-white',
  'vans-slip-on-platform-black',
  'vans-style-36-black-white',
  'vans-half-cab-black-white',
  'reebok-classic-leather-white',
  'reebok-classic-leather-black',
  'reebok-classic-leather-grey',
  'reebok-classic-leather-legacy',
  'reebok-club-c-85-white-green',
  'reebok-club-c-85-white-navy',
  'reebok-club-c-revenge-vintage',
  'reebok-club-c-double-white',
  'reebok-club-c-85-black',
  'reebok-pump-omni-zone-ii-white',
  'reebok-pump-omni-zone-ii-black'
];

function loadExistingShoes() {
  try {
    const data = fs.readFileSync(JSON_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log('⚠️  No se encontró zapatillas.json, se creará uno nuevo.');
      return [];
    }
    throw err;
  }
}

function saveShoes(shoes) {
  fs.writeFileSync(JSON_FILE, JSON.stringify(shoes, null, 4), 'utf-8');
}

function shoeExists(shoes, name, brand) {
  return shoes.some(shoe => 
    shoe.Nombre === name && shoe.Marca === brand
  );
}

async function fetchShoeFromAPI(slug) {
  const url = `https://api.kicks.dev/v3/stockx/products/${encodeURIComponent(slug)}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errText}`);
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error al obtener "${slug}": ${error.message}`);
  }
}

function formatShoeData(apiData) {
  return {
    Nombre: apiData.title || apiData.name || 'Sin nombre',
    Marca: apiData.brand || 'Sin marca',
    Precio: formatPrice(apiData.avg_price || apiData.price || 0),
    Imagen: apiData.image || apiData.images?.[0] || apiData.imageUrl || '',
    Color: null 
  };
}

function formatPrice(price) {
  if (typeof price === 'string') {
    return price.startsWith('$') ? price : `$${price}`;
  }
  return `$${price}`;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  console.log('🚀 Iniciando importación de zapatillas...\n');

  if (slugsToAdd.length === 0) {
    console.log('⚠️  No hay slugs en la lista. Agrega slugs al array "slugsToAdd".');
    return;
  }

  let shoes = loadExistingShoes();
  console.log(`📦 Zapatillas actuales en el JSON: ${shoes.length}\n`);

  let added = 0;
  let skipped = 0;
  let errors = 0;
  const needsColorFix = [];

  for (let i = 0; i < slugsToAdd.length; i++) {
    const slug = slugsToAdd[i];
    console.log(`[${i + 1}/${slugsToAdd.length}] Procesando: ${slug}`);

    try {
      const apiData = await fetchShoeFromAPI(slug);
      

      const newShoe = formatShoeData(apiData);

      if (shoeExists(shoes, newShoe.Nombre, newShoe.Marca)) {
        console.log(`   ⏭️  Ya existe: ${newShoe.Nombre}`);
        skipped++;
      } else {
      
        shoes.push(newShoe);
        console.log(`   ✅ Agregada: ${newShoe.Nombre} - ${newShoe.Precio}`);
        added++;
        
        if (newShoe.Color === null) {
          needsColorFix.push(newShoe.Nombre);
        }
      }

      if (i < slugsToAdd.length - 1) {
        await sleep(DELAY_MS);
      }

    } catch (error) {
      console.log(`   ❌ Error: ${error.message}`);
      errors++;
    }
  }

  if (added > 0) {
    saveShoes(shoes);
    console.log(`\n💾 Archivo guardado con ${added} zapatilla(s) nueva(s).`);
  }

  console.log('\n' + '='.repeat(50));
  console.log('📊 RESUMEN DE IMPORTACIÓN');
  console.log('='.repeat(50));
  console.log(`✅ Agregadas: ${added}`);
  console.log(`⏭️  Omitidas (ya existían): ${skipped}`);
  console.log(`❌ Errores: ${errors}`);
  console.log(`📝 Total en JSON: ${shoes.length}`);

  if (needsColorFix.length > 0) {
    console.log('\n⚠️  Las siguientes zapatillas necesitan que agregues el color manualmente:');
    needsColorFix.forEach(name => console.log(`   - ${name}`));
  }
  
  console.log('\n✨ Proceso completado!');
}

main().catch(err => {
  console.error('\n💥 Error fatal:', err);
  process.exit(1);
});