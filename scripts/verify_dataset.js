const fs = require('fs');
try {
  const data = JSON.parse(fs.readFileSync('public/quranData.json', 'utf8'));
  const surahs = Object.keys(data);
  let totalVerses = 0;
  for (const s of surahs) {
    totalVerses += data[s].length;
  }
  const lastVerse = data['114'][data['114'].length - 1];
  console.log('SURAH_COUNT:' + surahs.length);
  console.log('TOTAL_VERSES:' + totalVerses);
  console.log('LAST_VERSE_NUMBER_IN_QURAN:' + lastVerse.numberInQuran);
  console.log('LAST_VERSE_NUMBER_IN_SURAH:' + lastVerse.numberInSurah);
  console.log('LAST_VERSE_TEXT:' + lastVerse.text);
  console.log('LAST_VERSE_KURDISH:' + lastVerse.kurdish);
  console.log('LAST_VERSE_JUZ:' + lastVerse.juz);
  console.log('LAST_VERSE_PAGE:' + lastVerse.page);
} catch (e) {
  console.error(e.stack);
  process.exit(1);
}
