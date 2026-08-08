const fs = require('fs');

async function main() {
  const chunks = 5;

  for (let c = 1; c <= chunks; c++) {
    const filePath = `./data/quranData${c}.ts`;
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Find the start of the object: export const VERSES_PART_1: Record<number, Verse[]> = {
    const jsonStart = content.indexOf(`export const VERSES_PART_${c}: Record<number, Verse[]> = `) + `export const VERSES_PART_${c}: Record<number, Verse[]> = `.length;
    const jsonEnd = content.lastIndexOf('};\n') + 1;
    let jsonStr = content.slice(jsonStart, jsonEnd).trim();
    if (jsonStr.endsWith(';')) jsonStr = jsonStr.slice(0, -1);
    
    // Evaluate it safely
    const chunkData = new Function('return ' + jsonStr)();

    // Stringify and escape
    const stringified = JSON.stringify(chunkData).replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');

    let chunkCode = `import { Verse } from './quranData';\n\nexport const VERSES_PART_${c}: Record<number, Verse[]> = JSON.parse(\`${stringified}\`);\n`;
    
    fs.writeFileSync(filePath, chunkCode, 'utf8');
  }

  console.log('Rewritten to JSON.parse format successfully!');
}

main().catch(err => console.error(err));
