const fs = require('fs');
try {
  for (let i = 1; i <= 5; i++) {
    const tsContent = fs.readFileSync(`./data/quranData${i}.ts`, 'utf8');
    const start = tsContent.indexOf('{');
    const end = tsContent.lastIndexOf('}');
    const objStr = tsContent.slice(start, end + 1);
    
    // Evaluate it
    const obj = new Function('return ' + objStr)();
    const jsonStr = JSON.stringify(obj);
    
    const newTsContent = `import { Verse } from './quranData';\n\nexport const VERSES_PART_${i}: Record<number, Verse[]> = JSON.parse(${JSON.stringify(jsonStr)});\n`;
    fs.writeFileSync(`./data/quranData${i}.ts`, newTsContent);
    console.log('Processed chunk ' + i);
  }
} catch (e) {
  console.error(e);
}
