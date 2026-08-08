const fs = require('fs');

const header = fs.readFileSync('./data/quranData.ts.bak', 'utf8');
const importsEnd = header.indexOf('export const SAMPLE_VERSES_DATA');
let newFile = header.slice(0, importsEnd);

newFile += `
export const SAMPLE_VERSES_DATA: Record<number, Verse[]> = Object.assign(
  {},
  VERSES_PART_1,
  VERSES_PART_2,
  VERSES_PART_3,
  VERSES_PART_4,
  VERSES_PART_5
);
`;

const footerStart = header.indexOf('export function toArabicNumerals');
newFile += header.slice(footerStart);

fs.writeFileSync('./data/quranData.ts', newFile, 'utf8');
