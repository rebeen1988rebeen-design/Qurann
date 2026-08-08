const fs = require('fs');

async function main() {
  console.log('Reading quranData.ts...');
  const content = fs.readFileSync('./data/quranData.ts', 'utf8');

  // Extract SURAHS_LIST, RECITERS, and interfaces
  const surahsListMatch = content.match(/export const SURAHS_LIST: SurahMeta\[\] = (\[[\s\S]*?\]);/);
  if (!surahsListMatch) {
    throw new Error('Could not parse SURAHS_LIST');
  }
  const surahsListStr = surahsListMatch[0];

  const jsonStart = content.indexOf('export const SAMPLE_VERSES_DATA: Record<number, Verse[]> = ') + 'export const SAMPLE_VERSES_DATA: Record<number, Verse[]> = '.length;
  const jsonEnd = content.lastIndexOf('export function toArabicNumerals');
  let jsonStr = content.slice(jsonStart, jsonEnd).trim();
  if (jsonStr.endsWith(';')) jsonStr = jsonStr.slice(0, -1).trim();

  const data = new Function('return ' + jsonStr)();

  // Clear english translation
  let totalVersesCount = 0;
  for (let s in data) {
    for (let i = 0; i < data[s].length; i++) {
      data[s][i].english = '';
      totalVersesCount++;
    }
  }

  console.log('Total verses:', totalVersesCount);

  // Define interfaces header
  const header = `export interface SurahMeta {
  number: number;
  name: string; // Arabic name
  englishName: string;
  kurdishName: string;
  englishNameTranslation: string;
  revelationType: 'Meccan' | 'Medinan';
  numberOfAyahs: number;
  page: number;
  juz: number;
}

export interface Verse {
  numberInSurah: number;
  numberInQuran: number;
  text: string; // Madani Uthmani Script
  kurdish: string; // Kurdish Translation (Sorani)
  english: string; // English Translation
  juz: number;
  page: number;
}

export interface Reciter {
  id: string;
  name: string;
  subtext: string;
  serverUrl: string;
}

export const RECITERS: Reciter[] = [
  {
    id: 'ar.alafasy',
    name: 'Mishary Rashid Alafasy',
    subtext: 'Kuwait • High Quality Studio',
    serverUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy',
  },
  {
    id: 'ar.abdulbasitmurattal',
    name: 'Abdul Basit Abdul Samad',
    subtext: 'Egypt • Murattal Recitation',
    serverUrl: 'https://cdn.islamic.network/quran/audio/128/ar.abdulbasitmurattal',
  },
  {
    id: 'ar.husary',
    name: 'Mahmoud Khalil Al-Husary',
    subtext: 'Egypt • Classic Tajweed',
    serverUrl: 'https://cdn.islamic.network/quran/audio/128/ar.husary',
  },
  {
    id: 'ar.ghamadi',
    name: 'Saad Al-Ghamdi',
    subtext: 'Saudi Arabia • Emotional Recitation',
    serverUrl: 'https://cdn.islamic.network/quran/audio/128/ar.ghamadi',
  },
  {
    id: 'ar.mahermuaiqly',
    name: 'Maher Al-Muaiqly',
    subtext: 'Imam of Masjid al-Haram',
    serverUrl: 'https://cdn.islamic.network/quran/audio/128/ar.mahermuaiqly',
  },
];
`;

  const footer = `
export function toArabicNumerals(num: number): string {
  const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return num
    .toString()
    .split('')
    .map(d => arabicDigits[parseInt(d, 10)] || d)
    .join('');
}
`;

  // Split into chunks of ~23 surahs
  const chunks = 5;
  const surahKeys = Object.keys(data).map(Number).sort((a, b) => a - b);
  
  const chunkSizes = Math.ceil(surahKeys.length / chunks);
  
  let imports = '';
  let exportsMap = 'export const SAMPLE_VERSES_DATA: Record<number, Verse[]> = {\n';

  for (let c = 0; c < chunks; c++) {
    const start = c * chunkSizes;
    const end = Math.min((c + 1) * chunkSizes, surahKeys.length);
    const chunkKeys = surahKeys.slice(start, end);
    
    if (chunkKeys.length === 0) break;

    let chunkCode = `import { Verse } from './quranData';\n\nexport const VERSES_PART_${c+1}: Record<number, Verse[]> = {\n`;
    for (let i = 0; i < chunkKeys.length; i++) {
      const sNum = chunkKeys[i];
      const verses = data[sNum];
      chunkCode += `  ${sNum}: [\n`;
      for (let j = 0; j < verses.length; j++) {
        const v = verses[j];
        chunkCode += `    ${JSON.stringify(v)}${j < verses.length - 1 ? ',' : ''}\n`;
      }
      chunkCode += `  ]${i < chunkKeys.length - 1 ? ',' : ''}\n`;
      
      exportsMap += `  ...VERSES_PART_${c+1}${i === chunkKeys.length - 1 ? '' : ''}`;
      // Just spread it once per chunk
      if (i === 0) {
        // do nothing here, we'll spread the object at the end
      }
    }
    chunkCode += '};\n';
    
    fs.writeFileSync(`./data/quranData${c+1}.ts`, chunkCode, 'utf8');
    
    imports += `import { VERSES_PART_${c+1} } from './quranData${c+1}';\n`;
  }

  // Re-write exportsMap
  exportsMap = 'export const SAMPLE_VERSES_DATA: Record<number, Verse[]> = {\n';
  for (let c = 0; c < chunks; c++) {
    if (c * chunkSizes >= surahKeys.length) break;
    exportsMap += `  ...VERSES_PART_${c+1},\n`;
  }
  exportsMap += '};\n';

  const fullContent = header + '\n' + surahsListStr + '\n\n' + imports + '\n' + exportsMap + '\n' + footer;
  fs.writeFileSync('./data/quranData.ts', fullContent, 'utf8');

  console.log('Split into multiple files successfully!');
}

main().catch(err => console.error(err));
