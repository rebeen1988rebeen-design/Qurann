const fs = require('fs');

async function main() {
  for (let c = 1; c <= 5; c++) {
    const tsFile = `./data/quranData${c}.ts`;
    const content = fs.readFileSync(tsFile, 'utf8');
    
    // Find the JSON string inside JSON.parse(`...`)
    const start = content.indexOf('JSON.parse(`') + 'JSON.parse(`'.length;
    const end = content.lastIndexOf('`)');
    let jsonStr = content.slice(start, end);
    
    // Unescape the stringified JSON
    jsonStr = jsonStr.replace(/\\\\/g, '\\').replace(/\\`/g, '`').replace(/\\\$/g, '$');
    
    // Write the JSON file
    fs.writeFileSync(`./data/quranData${c}.json`, jsonStr, 'utf8');
    
    // Rewrite the TS file to import the JSON file
    const newTsContent = `import { Verse } from './quranData';\nimport data from './quranData${c}.json';\n\nexport const VERSES_PART_${c}: Record<number, Verse[]> = data;\n`;
    fs.writeFileSync(tsFile, newTsContent, 'utf8');
  }
  console.log('Rewrote to use JSON imports successfully!');
}

main().catch(err => console.error(err));
