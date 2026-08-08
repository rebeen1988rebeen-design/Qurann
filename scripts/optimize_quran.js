const fs = require('fs');

async function main() {
  console.log('Reading quranData.ts.bak...');
  const content = fs.readFileSync('./data/quranData.ts.bak', 'utf8');

  const surahsListMatch = content.match(/export const SURAHS_LIST: SurahMeta\[\] = (\[[\s\S]*?\]);/);
  const surahsListStr = surahsListMatch[0];

  const jsonStart = content.indexOf('export const SAMPLE_VERSES_DATA: Record<number, Verse[]> = ') + 'export const SAMPLE_VERSES_DATA: Record<number, Verse[]> = '.length;
  const jsonEnd = content.lastIndexOf('export function toArabicNumerals');
  let jsonStr = content.slice(jsonStart, jsonEnd).trim();
  if (jsonStr.endsWith(';')) jsonStr = jsonStr.slice(0, -1).trim();

  // Try parsing the json string
  // It contains ...VERSES_PART_X if it's the split version, but wait!
  // Did I save quranData.ts.bak BEFORE or AFTER I split it?
  // Let's check what's inside.
}
main();
