const fs = require('fs');
const https = require('https');

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Node.js' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function buildQuranData() {
  console.log('Downloading Arabic Uthmani text...');
  const arabicRes = await fetchJson('https://api.alquran.cloud/v1/quran/quran-uthmani');
  
  console.log('Downloading Kurdish translation...');
  const kurdishRes = await fetchJson('https://api.alquran.cloud/v1/quran/ku.asan');

  console.log('Building JSON dataset...');
  
  const arabicSurahs = arabicRes.data.surahs;
  const kurdishSurahs = kurdishRes.data.surahs;
  
  const quranData = {};
  let totalVerses = 0;

  for (let i = 0; i < 114; i++) {
    const arabicSurah = arabicSurahs[i];
    const kurdishSurah = kurdishSurahs[i];
    const surahNum = arabicSurah.number;
    
    quranData[surahNum] = [];
    
    for (let j = 0; j < arabicSurah.ayahs.length; j++) {
      const arabicAyah = arabicSurahs[i].ayahs[j];
      const kurdishAyah = kurdishSurahs[i].ayahs[j];
      
      let kurdishText = kurdishAyah.text ? kurdishAyah.text.trim() : '';
      if (!kurdishText && surahNum === 108 && arabicAyah.numberInSurah === 3) {
        kurdishText = 'بێگومان ڕقاوبه‌ر و دژمنه‌که‌ت، هه‌ر ئه‌و بڕاوه‌و بێ پاشهاته‌.';
      }

      const verse = {
        numberInSurah: arabicAyah.numberInSurah,
        numberInQuran: arabicAyah.number,
        text: arabicAyah.text,
        kurdish: kurdishText,
        juz: arabicAyah.juz,
        page: arabicAyah.page
      };
      
      quranData[surahNum].push(verse);
      totalVerses++;
    }
  }

  fs.writeFileSync('public/quranData.json', JSON.stringify(quranData));
  console.log('Successfully saved to public/quranData.json');
}

buildQuranData().catch(console.error);
