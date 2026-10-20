// Prefixes a public file with the deploy base, so paths work on a GitHub Pages project URL and on a custom domain.
export const asset = (path) => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path}`;

export const contact = {
  phone: '+91 83909 69155',
  office: "G-12 Ground Floor, Gera's Greenville, Viman Nagar, Pune 411014",
  legalName: 'Rottweiler Brew and Pub Private Limited',
  cin: 'U11031PN2026PTC259804',
};

// Google Analytics 4 measurement ID, for example 'G-ABC123XYZ'. Leave empty to switch analytics off.
export const gaId = '';

export const sections = [
  { id: 'story', label: 'Our story' },
  { id: 'finder', label: 'Pick your dog' },
  { id: 'pack', label: 'The pack' },
  { id: 'taste', label: 'Taste map' },
  { id: 'find', label: 'Find us' },
  { id: 'trade', label: 'Trade' },
];

// WhatsApp click-to-chat with a ready message, so each action is one tap.
export const wa = (text) => `https://wa.me/${contact.phone.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`;
export const joinLink = wa('Hi Rottweiler, please add me to the pack for launch news.');
export const localLink = wa('Hi Rottweiler, I would love to drink you at my local: ');
export const tradeLink = wa('Hi Rottweiler, I run a bar, store or canteen and would like your trade sheet and terms.');
export const pourLink = (name) => wa(`Hi Rottweiler, tell me when ${name} pours near me.`);
