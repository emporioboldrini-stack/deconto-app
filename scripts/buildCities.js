const fs = require('fs');
const path = require('path');

// Leggi il JSON scaricato direttamente
const content = fs.readFileSync(
  path.join(__dirname, 'comuni.json'),
  'utf8'
);

// Parse e estrai nomi
const comuni = JSON.parse(content);
const names = comuni.map(c => c.nome).sort((a, b) => a.localeCompare(b, 'it'));

console.log(`Totale comuni: ${names.length}`);

// Genera il file JS
const output = `// Elenco completo dei comuni italiani - Fonte: ISTAT via github.com/matteocontrini/comuni-json
// Totale: ${names.length} comuni - aggiornato automaticamente
// Usato per il campo città nei form clienti (datalist autocomplete)

export const ITALIAN_CITIES = ${JSON.stringify(names, null, 2)};

export default ITALIAN_CITIES;
`;

const outPath = path.join(__dirname, '..', 'src', 'data', 'italianCities.js');
fs.writeFileSync(outPath, output, 'utf8');
console.log(`Scritto: ${outPath}`);
console.log(`Prime 5 città: ${names.slice(0, 5).join(', ')}`);
console.log(`Ultime 5 città: ${names.slice(-5).join(', ')}`);
