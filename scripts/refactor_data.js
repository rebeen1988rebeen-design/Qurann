const fs = require('fs');

let content = fs.readFileSync('data/quranData.ts', 'utf8');

// Replace the imports and SAMPLE_VERSES_DATA
content = content.replace(/import \{ VERSES_PART_1 \}[^;]+;\n/g, '');
content = content.replace(/import \{ VERSES_PART_2 \}[^;]+;\n/g, '');
content = content.replace(/import \{ VERSES_PART_3 \}[^;]+;\n/g, '');
content = content.replace(/import \{ VERSES_PART_4 \}[^;]+;\n/g, '');
content = content.replace(/import \{ VERSES_PART_5 \}[^;]+;\n/g, '');

content = content.replace(/export const SAMPLE_VERSES_DATA: Record<number, Verse\[\]> = \{[\s\S]*?\};/, `
export let SAMPLE_VERSES_DATA: Record<number, Verse[]> = {};

export async function loadQuranData() {
  if (Object.keys(SAMPLE_VERSES_DATA).length > 0) return SAMPLE_VERSES_DATA;
  const p1 = (await import('./quranData1.json')).default;
  const p2 = (await import('./quranData2.json')).default;
  const p3 = (await import('./quranData3.json')).default;
  const p4 = (await import('./quranData4.json')).default;
  const p5 = (await import('./quranData5.json')).default;
  SAMPLE_VERSES_DATA = { ...p1, ...p2, ...p3, ...p4, ...p5 };
  return SAMPLE_VERSES_DATA;
}
`);

fs.writeFileSync('data/quranData.ts', content);
