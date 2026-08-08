const fs = require('fs');

const data = JSON.parse(fs.readFileSync('public/quranData.json', 'utf8'));
const surahs = Object.keys(data);

if (surahs.length !== 114) {
  console.error('FAILED: Surah count is ' + surahs.length);
  process.exit(1);
}

let verseCount = 0;
let errors = [];

for (let s = 1; s <= 114; s++) {
  const verses = data[s.toString()];
  if (!verses || !Array.isArray(verses)) {
    errors.push(`Surah ${s} is missing or not an array`);
    continue;
  }
  verses.forEach((v, idx) => {
    verseCount++;
    if (typeof v.numberInSurah !== 'number') errors.push(`[Surah ${s}, Ayah ${idx+1}] numberInSurah is not a number`);
    if (typeof v.numberInQuran !== 'number') errors.push(`[Surah ${s}, Ayah ${idx+1}] numberInQuran is not a number`);
    if (typeof v.text !== 'string' || v.text.trim() === '') errors.push(`[Surah ${s}, Ayah ${idx+1}] text is empty`);
    if (typeof v.kurdish !== 'string' || v.kurdish.trim() === '') errors.push(`[Surah ${s}, Ayah ${idx+1}] kurdish is empty`);
    if (typeof v.juz !== 'number') errors.push(`[Surah ${s}, Ayah ${idx+1}] juz is not a number`);
    if (typeof v.page !== 'number') errors.push(`[Surah ${s}, Ayah ${idx+1}] page is not a number`);
  });
}

if (verseCount !== 6236) {
  errors.push(`Total verse count expected 6236, got ${verseCount}`);
}

const lastVerse = data['114'][data['114'].length - 1];
if (lastVerse.numberInQuran !== 6236) errors.push(`Last verse numberInQuran expected 6236, got ${lastVerse.numberInQuran}`);
if (lastVerse.numberInSurah !== 6) errors.push(`Last verse numberInSurah expected 6, got ${lastVerse.numberInSurah}`);

if (errors.length > 0) {
  console.error('Validation failed with errors:\n' + errors.join('\n'));
  process.exit(1);
}

console.log('SUCCESS: All 114 surahs and 6236 verses validated with 0 errors.');
