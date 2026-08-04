export interface SurahMeta {
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

// COMPLETE LIST OF ALL 114 SURAHS OF THE HOLY QURAN
export const SURAHS_LIST: SurahMeta[] = [
  { number: 1, name: 'الفَاتِحَة', englishName: 'Al-Fātiḥah', kurdishName: 'سورەتی فاتیحە', englishNameTranslation: 'The Opening', revelationType: 'Meccan', numberOfAyahs: 7, page: 1, juz: 1 },
  { number: 2, name: 'البَقَرَة', englishName: 'Al-Baqarah', kurdishName: 'سورەتی بەقەرە', englishNameTranslation: 'The Cow', revelationType: 'Medinan', numberOfAyahs: 286, page: 2, juz: 1 },
  { number: 3, name: 'آلِ عِمْرَان', englishName: 'Āli ‘Imrān', kurdishName: 'سورەتی ئالی عیمران', englishNameTranslation: 'Family of Imran', revelationType: 'Medinan', numberOfAyahs: 200, page: 50, juz: 3 },
  { number: 4, name: 'النِّسَاء', englishName: 'An-Nisā’', kurdishName: 'سورەتی نیساء', englishNameTranslation: 'The Women', revelationType: 'Medinan', numberOfAyahs: 176, page: 77, juz: 4 },
  { number: 5, name: 'المَائِدَة', englishName: 'Al-Mā’idah', kurdishName: 'سورەتی مائیدە', englishNameTranslation: 'The Table Spread', revelationType: 'Medinan', numberOfAyahs: 120, page: 106, juz: 6 },
  { number: 6, name: 'الأَنْعَام', englishName: 'Al-An‘ām', kurdishName: 'سورەتی ئەنعام', englishNameTranslation: 'The Cattle', revelationType: 'Meccan', numberOfAyahs: 165, page: 128, juz: 7 },
  { number: 7, name: 'الأَعْرَاف', englishName: 'Al-A‘rāf', kurdishName: 'سورەتی ئەعراف', englishNameTranslation: 'The Heights', revelationType: 'Meccan', numberOfAyahs: 206, page: 151, juz: 8 },
  { number: 8, name: 'الأَنْفَال', englishName: 'Al-Anfāl', kurdishName: 'سورەتی ئەنفال', englishNameTranslation: 'The Spoils of War', revelationType: 'Medinan', numberOfAyahs: 75, page: 177, juz: 9 },
  { number: 9, name: 'التَّوْبَة', englishName: 'At-Tawbah', kurdishName: 'سورەتی تەوبە', englishNameTranslation: 'The Repentance', revelationType: 'Medinan', numberOfAyahs: 129, page: 187, juz: 10 },
  { number: 10, name: 'يُونُس', englishName: 'Yūnus', kurdishName: 'سورەتی یونس', englishNameTranslation: 'Jonah', revelationType: 'Meccan', numberOfAyahs: 109, page: 208, juz: 11 },
  { number: 11, name: 'هُود', englishName: 'Hūd', kurdishName: 'سورەتی هود', englishNameTranslation: 'Hud', revelationType: 'Meccan', numberOfAyahs: 123, page: 221, juz: 11 },
  { number: 12, name: 'يُوسُف', englishName: 'Yūsuf', kurdishName: 'سورەتی یوسف', englishNameTranslation: 'Joseph', revelationType: 'Meccan', numberOfAyahs: 111, page: 235, juz: 12 },
  { number: 13, name: 'الرَّعْد', englishName: 'Ar-Ra‘d', kurdishName: 'سورەتی ڕەعد', englishNameTranslation: 'The Thunder', revelationType: 'Medinan', numberOfAyahs: 43, page: 249, juz: 13 },
  { number: 14, name: 'إِبْرَاهِيم', englishName: 'Ibrāhīm', kurdishName: 'سورەتی ئیبراهیم', englishNameTranslation: 'Abraham', revelationType: 'Meccan', numberOfAyahs: 52, page: 255, juz: 13 },
  { number: 15, name: 'الحِجْر', englishName: 'Al-Hijr', kurdishName: 'سورەتی حیجر', englishNameTranslation: 'The Rocky Tract', revelationType: 'Meccan', numberOfAyahs: 99, page: 262, juz: 14 },
  { number: 16, name: 'النَّحْل', englishName: 'An-Nahl', kurdishName: 'سورەتی نەحل', englishNameTranslation: 'The Bee', revelationType: 'Meccan', numberOfAyahs: 128, page: 267, juz: 14 },
  { number: 17, name: 'الإِسْرَاء', englishName: 'Al-Isrā’', kurdishName: 'سورەتی ئیسراء', englishNameTranslation: 'The Night Journey', revelationType: 'Meccan', numberOfAyahs: 111, page: 282, juz: 15 },
  { number: 18, name: 'الكَهْف', englishName: 'Al-Kahf', kurdishName: 'سورەتی کەهف', englishNameTranslation: 'The Cave', revelationType: 'Meccan', numberOfAyahs: 110, page: 293, juz: 15 },
  { number: 19, name: 'مَرْيَم', englishName: 'Maryam', kurdishName: 'سورەتی مەریەم', englishNameTranslation: 'Mary', revelationType: 'Meccan', numberOfAyahs: 98, page: 305, juz: 16 },
  { number: 20, name: 'طه', englishName: 'Ṭā-Hā', kurdishName: 'سورەتی تاها', englishNameTranslation: 'Ta-Ha', revelationType: 'Meccan', numberOfAyahs: 135, page: 312, juz: 16 },
  { number: 21, name: 'الأَنْبِيَاء', englishName: 'Al-Anbiyā’', kurdishName: 'سورەتی ئەنبیاء', englishNameTranslation: 'The Prophets', revelationType: 'Meccan', numberOfAyahs: 112, page: 322, juz: 17 },
  { number: 22, name: 'الحَجّ', englishName: 'Al-Hajj', kurdishName: 'سورەتی حەج', englishNameTranslation: 'The Pilgrimage', revelationType: 'Medinan', numberOfAyahs: 78, page: 332, juz: 17 },
  { number: 23, name: 'المُؤْمِنُون', englishName: 'Al-Mu’minūn', kurdishName: 'سورەتی موئمینون', englishNameTranslation: 'The Believers', revelationType: 'Meccan', numberOfAyahs: 118, page: 342, juz: 18 },
  { number: 24, name: 'النُّور', englishName: 'An-Nūr', kurdishName: 'سورەتی نور', englishNameTranslation: 'The Light', revelationType: 'Medinan', numberOfAyahs: 64, page: 350, juz: 18 },
  { number: 25, name: 'الفُرْقَان', englishName: 'Al-Furqān', kurdishName: 'سورەتی فورقان', englishNameTranslation: 'The Criterion', revelationType: 'Meccan', numberOfAyahs: 77, page: 359, juz: 18 },
  { number: 26, name: 'الشُّعَرَاء', englishName: 'Ash-Shu‘arā’', kurdishName: 'سورەتی شوئەراء', englishNameTranslation: 'The Poets', revelationType: 'Meccan', numberOfAyahs: 227, page: 367, juz: 19 },
  { number: 27, name: 'النَّمْل', englishName: 'An-Naml', kurdishName: 'سورەتی نەمل', englishNameTranslation: 'The Ant', revelationType: 'Meccan', numberOfAyahs: 93, page: 377, juz: 19 },
  { number: 28, name: 'القَصَص', englishName: 'Al-Qaṣaṣ', kurdishName: 'سورەتی قەسەس', englishNameTranslation: 'The Stories', revelationType: 'Meccan', numberOfAyahs: 88, page: 385, juz: 20 },
  { number: 29, name: 'العَنْكَبُوت', englishName: 'Al-‘Ankabūt', kurdishName: 'سورەتی عەنکەبوت', englishNameTranslation: 'The Spider', revelationType: 'Meccan', numberOfAyahs: 69, page: 396, juz: 20 },
  { number: 30, name: 'الرُّوم', englishName: 'Ar-Rūm', kurdishName: 'سورەتی ڕوم', englishNameTranslation: 'The Romans', revelationType: 'Meccan', numberOfAyahs: 60, page: 404, juz: 21 },
  { number: 31, name: 'لُقْمَان', englishName: 'Luqmān', kurdishName: 'سورەتی لوقمان', englishNameTranslation: 'Luqman', revelationType: 'Meccan', numberOfAyahs: 34, page: 411, juz: 21 },
  { number: 32, name: 'السَّجْدَة', englishName: 'As-Sajdah', kurdishName: 'سورەتی سەجدە', englishNameTranslation: 'The Prostration', revelationType: 'Meccan', numberOfAyahs: 30, page: 415, juz: 21 },
  { number: 33, name: 'الأَحْزَاب', englishName: 'Al-Aḥzāb', kurdishName: 'سورەتی ئەحزاب', englishNameTranslation: 'The Combined Forces', revelationType: 'Medinan', numberOfAyahs: 73, page: 418, juz: 21 },
  { number: 34, name: 'سَبَأ', englishName: 'Saba’', kurdishName: 'سورەتی سەبەء', englishNameTranslation: 'Sheba', revelationType: 'Meccan', numberOfAyahs: 54, page: 428, juz: 22 },
  { number: 35, name: 'فَاطِر', englishName: 'Fāṭir', kurdishName: 'سورەتی فاطر', englishNameTranslation: 'Originator', revelationType: 'Meccan', numberOfAyahs: 45, page: 434, juz: 22 },
  { number: 36, name: 'يس', englishName: 'Yā-Sīn', kurdishName: 'سورەتی یاسین', englishNameTranslation: 'Ya Sin', revelationType: 'Meccan', numberOfAyahs: 83, page: 440, juz: 22 },
  { number: 37, name: 'الصَّافَّات', englishName: 'Aṣ-Ṣāffāt', kurdishName: 'سورەتی صافات', englishNameTranslation: 'Those set in Ranks', revelationType: 'Meccan', numberOfAyahs: 182, page: 446, juz: 23 },
  { number: 38, name: 'ص', englishName: 'Ṣād', kurdishName: 'سورەتی ص', englishNameTranslation: 'The Letter Sad', revelationType: 'Meccan', numberOfAyahs: 88, page: 453, juz: 23 },
  { number: 39, name: 'الزُّمَر', englishName: 'Az-Zumar', kurdishName: 'سورەتی زومەر', englishNameTranslation: 'The Troops', revelationType: 'Meccan', numberOfAyahs: 75, page: 458, juz: 23 },
  { number: 40, name: 'غَافِر', englishName: 'Ghāfir', kurdishName: 'سورەتی غافیر', englishNameTranslation: 'The Forgiver', revelationType: 'Meccan', numberOfAyahs: 85, page: 467, juz: 24 },
  { number: 41, name: 'فُصِّلَت', englishName: 'Fuṣṣilat', kurdishName: 'سورەتی فوسسیلەت', englishNameTranslation: 'Explained in Detail', revelationType: 'Meccan', numberOfAyahs: 54, page: 477, juz: 24 },
  { number: 42, name: 'الشُّورَى', englishName: 'Ash-Shūrā', kurdishName: 'سورەتی شوورا', englishNameTranslation: 'The Consultation', revelationType: 'Meccan', numberOfAyahs: 53, page: 483, juz: 25 },
  { number: 43, name: 'الزُّخْرُف', englishName: 'Az-Zukhruf', kurdishName: 'سورەتی زوخروف', englishNameTranslation: 'The Ornaments of Gold', revelationType: 'Meccan', numberOfAyahs: 89, page: 489, juz: 25 },
  { number: 44, name: 'الدُّخَان', englishName: 'Ad-Dukhān', kurdishName: 'سورەتی دوخان', englishNameTranslation: 'The Smoke', revelationType: 'Meccan', numberOfAyahs: 59, page: 496, juz: 25 },
  { number: 45, name: 'الجَاثِيَة', englishName: 'Al-Jāthiyah', kurdishName: 'سورەتی جاثیە', englishNameTranslation: 'The Crouching', revelationType: 'Meccan', numberOfAyahs: 37, page: 499, juz: 25 },
  { number: 46, name: 'الأَحْقَاف', englishName: 'Al-Aḥqāf', kurdishName: 'سورەتی ئەحقاف', englishNameTranslation: 'The Wind-Curved Sandhills', revelationType: 'Meccan', numberOfAyahs: 35, page: 502, juz: 26 },
  { number: 47, name: 'مُحَمَّد', englishName: 'Muḥammad', kurdishName: 'سورەتی محەمەد', englishNameTranslation: 'Muhammad', revelationType: 'Medinan', numberOfAyahs: 38, page: 507, juz: 26 },
  { number: 48, name: 'الفَتْح', englishName: 'Al-Fatḥ', kurdishName: 'سورەتی فەتح', englishNameTranslation: 'The Victory', revelationType: 'Medinan', numberOfAyahs: 29, page: 511, juz: 26 },
  { number: 49, name: 'الحُجُرَات', englishName: 'Al-Ḥujurāt', kurdishName: 'سورەتی حوجورات', englishNameTranslation: 'The Dwellings', revelationType: 'Medinan', numberOfAyahs: 18, page: 515, juz: 26 },
  { number: 50, name: 'ق', englishName: 'Qāf', kurdishName: 'سورەتی ق', englishNameTranslation: 'The Letter Qaf', revelationType: 'Meccan', numberOfAyahs: 45, page: 518, juz: 26 },
  { number: 51, name: 'الذَّارِيَات', englishName: 'Adh-Dhāriyāt', kurdishName: 'سورەتی زاریات', englishNameTranslation: 'The Winnowing Winds', revelationType: 'Meccan', numberOfAyahs: 60, page: 520, juz: 26 },
  { number: 52, name: 'الطُّور', englishName: 'Aṭ-Ṭūr', kurdishName: 'سورەتی طور', englishNameTranslation: 'The Mount', revelationType: 'Meccan', numberOfAyahs: 49, page: 523, juz: 27 },
  { number: 53, name: 'النَّجْم', englishName: 'An-Najm', kurdishName: 'سورەتی نەجم', englishNameTranslation: 'The Star', revelationType: 'Meccan', numberOfAyahs: 62, page: 526, juz: 27 },
  { number: 54, name: 'القَمَر', englishName: 'Al-Qamar', kurdishName: 'سورەتی قەمەر', englishNameTranslation: 'The Moon', revelationType: 'Meccan', numberOfAyahs: 55, page: 528, juz: 27 },
  { number: 55, name: 'الرَّحْمَٰن', englishName: 'Ar-Raḥmān', kurdishName: 'سورەتی ڕەحمان', englishNameTranslation: 'The Beneficent', revelationType: 'Medinan', numberOfAyahs: 78, page: 531, juz: 27 },
  { number: 56, name: 'الوَاكِعَة', englishName: 'Al-Wāqi‘ah', kurdishName: 'سورەتی واقیئە', englishNameTranslation: 'The Inevitable', revelationType: 'Meccan', numberOfAyahs: 96, page: 534, juz: 27 },
  { number: 57, name: 'الحَدِيد', englishName: 'Al-Ḥadīd', kurdishName: 'سورەتی حدید', englishNameTranslation: 'The Iron', revelationType: 'Medinan', numberOfAyahs: 29, page: 537, juz: 27 },
  { number: 58, name: 'المُجَادَلَة', englishName: 'Al-Mujādilah', kurdishName: 'سورەتی مجادلة', englishNameTranslation: 'The Pleading Woman', revelationType: 'Medinan', numberOfAyahs: 22, page: 542, juz: 28 },
  { number: 59, name: 'الحَشْر', englishName: 'Al-Ḥashr', kurdishName: 'سورەتی حەشر', englishNameTranslation: 'The Exile', revelationType: 'Medinan', numberOfAyahs: 24, page: 545, juz: 28 },
  { number: 60, name: 'المُمْتَحَنَة', englishName: 'Al-Mumtaḥanah', kurdishName: 'سورەتی ممتحنة', englishNameTranslation: 'She that is to be examined', revelationType: 'Medinan', numberOfAyahs: 13, page: 549, juz: 28 },
  { number: 61, name: 'الصَّفّ', englishName: 'Aṣ-Ṣaff', kurdishName: 'سورەتی صف', englishNameTranslation: 'The Ranks', revelationType: 'Medinan', numberOfAyahs: 14, page: 551, juz: 28 },
  { number: 62, name: 'الجُمُعَة', englishName: 'Al-Jumu‘ah', kurdishName: 'سورەتی جمعة', englishNameTranslation: 'The Congregation', revelationType: 'Medinan', numberOfAyahs: 11, page: 553, juz: 28 },
  { number: 63, name: 'المُنَافِقُون', englishName: 'Al-Munāfiqūn', kurdishName: 'سورەتی منافقون', englishNameTranslation: 'The Hypocrites', revelationType: 'Medinan', numberOfAyahs: 11, page: 554, juz: 28 },
  { number: 64, name: 'التَّغَابُن', englishName: 'At-Taghābun', kurdishName: 'سورەتی تغابن', englishNameTranslation: 'The Mutual Disillusion', revelationType: 'Medinan', numberOfAyahs: 18, page: 556, juz: 28 },
  { number: 65, name: 'الطَّلَاق', englishName: 'Aṭ-Ṭalāq', kurdishName: 'سورەتی طلاق', englishNameTranslation: 'The Divorce', revelationType: 'Medinan', numberOfAyahs: 12, page: 558, juz: 28 },
  { number: 66, name: 'التَّحْرِيم', englishName: 'At-Taḥrīm', kurdishName: 'سورەتی تحریم', englishNameTranslation: 'The Prohibition', revelationType: 'Medinan', numberOfAyahs: 12, page: 560, juz: 28 },
  { number: 67, name: 'المُلْك', englishName: 'Al-Mulk', kurdishName: 'سورەتی مولک', englishNameTranslation: 'The Sovereignty', revelationType: 'Meccan', numberOfAyahs: 30, page: 562, juz: 29 },
  { number: 68, name: 'القَلَم', englishName: 'Al-Qalam', kurdishName: 'سورەتی قەڵەم', englishNameTranslation: 'The Pen', revelationType: 'Meccan', numberOfAyahs: 52, page: 564, juz: 29 },
  { number: 69, name: 'الحَاقَّة', englishName: 'Al-Ḥāqqah', kurdishName: 'سورەتی حاقة', englishNameTranslation: 'The Reality', revelationType: 'Meccan', numberOfAyahs: 52, page: 566, juz: 29 },
  { number: 70, name: 'المَعَارِج', englishName: 'Al-Ma‘ārij', kurdishName: 'سورەتی معارج', englishNameTranslation: 'The Ascending Stairways', revelationType: 'Meccan', numberOfAyahs: 44, page: 568, juz: 29 },
  { number: 71, name: 'نُوح', englishName: 'Nūḥ', kurdishName: 'سورەتی نووح', englishNameTranslation: 'Noah', revelationType: 'Meccan', numberOfAyahs: 28, page: 570, juz: 29 },
  { number: 72, name: 'الجِنّ', englishName: 'Al-Jinn', kurdishName: 'سورەتی جن', englishNameTranslation: 'The Jinn', revelationType: 'Meccan', numberOfAyahs: 28, page: 572, juz: 29 },
  { number: 73, name: 'المُزَّمِّل', englishName: 'Al-Muzzammil', kurdishName: 'سورەتی مزمل', englishNameTranslation: 'The Enshrouded One', revelationType: 'Meccan', numberOfAyahs: 20, page: 574, juz: 29 },
  { number: 74, name: 'المُدَّثِّر', englishName: 'Al-Muddaththir', kurdishName: 'سورەتی مدثر', englishNameTranslation: 'The Cloaked One', revelationType: 'Meccan', numberOfAyahs: 56, page: 575, juz: 29 },
  { number: 75, name: 'القِيَامَة', englishName: 'Al-Qiyāmah', kurdishName: 'سورەتی قيامة', englishNameTranslation: 'The Resurrection', revelationType: 'Meccan', numberOfAyahs: 40, page: 577, juz: 29 },
  { number: 76, name: 'الإِنْسَان', englishName: 'Al-Insān', kurdishName: 'سورەتی إنسان', englishNameTranslation: 'The Man', revelationType: 'Medinan', numberOfAyahs: 31, page: 578, juz: 29 },
  { number: 77, name: 'المُرْسَلَات', englishName: 'Al-Mursalāt', kurdishName: 'سورەتی مرسلات', englishNameTranslation: 'The Emissaries', revelationType: 'Meccan', numberOfAyahs: 50, page: 580, juz: 29 },
  { number: 78, name: 'النَّبَأ', englishName: 'An-Naba’', kurdishName: 'سورەتی نەبەء', englishNameTranslation: 'The Tidings', revelationType: 'Meccan', numberOfAyahs: 40, page: 582, juz: 30 },
  { number: 79, name: 'النَّازِعَات', englishName: 'An-Nāzi‘āt', kurdishName: 'سورەتی نازعات', englishNameTranslation: 'Those who drag forth', revelationType: 'Meccan', numberOfAyahs: 46, page: 583, juz: 30 },
  { number: 80, name: 'عَبَسَ', englishName: '‘Abasa', kurdishName: 'سورەتی عەبەسا', englishNameTranslation: 'He Frowned', revelationType: 'Meccan', numberOfAyahs: 42, page: 585, juz: 30 },
  { number: 81, name: 'التَّكْوِير', englishName: 'At-Takwīr', kurdishName: 'سورەتی تکویر', englishNameTranslation: 'The Overthrowing', revelationType: 'Meccan', numberOfAyahs: 29, page: 586, juz: 30 },
  { number: 82, name: 'الإِنْفِطَار', englishName: 'Al-Infiṭār', kurdishName: 'سورەتی انفطار', englishNameTranslation: 'The Cleaving', revelationType: 'Meccan', numberOfAyahs: 19, page: 587, juz: 30 },
  { number: 83, name: 'المُطَفِّفِين', englishName: 'Al-Muṭaffifīn', kurdishName: 'سورەتی مطففین', englishNameTranslation: 'The Defrauding', revelationType: 'Meccan', numberOfAyahs: 36, page: 587, juz: 30 },
  { number: 84, name: 'الإِنْشِقَاق', englishName: 'Al-Inshiqāq', kurdishName: 'سورەتی انشقاق', englishNameTranslation: 'The Sundering', revelationType: 'Meccan', numberOfAyahs: 25, page: 589, juz: 30 },
  { number: 85, name: 'البُرُوج', englishName: 'Al-Burūj', kurdishName: 'سورەتی بروج', englishNameTranslation: 'The Mansions of the Stars', revelationType: 'Meccan', numberOfAyahs: 22, page: 590, juz: 30 },
  { number: 86, name: 'الطَّارِق', englishName: 'Aṭ-Ṭāriq', kurdishName: 'سورەتی طارق', englishNameTranslation: 'The Nightcomer', revelationType: 'Meccan', numberOfAyahs: 17, page: 591, juz: 30 },
  { number: 87, name: 'الأَعْلَى', englishName: 'Al-A‘lā', kurdishName: 'سورەتی ئەعلا', englishNameTranslation: 'The Most High', revelationType: 'Meccan', numberOfAyahs: 19, page: 591, juz: 30 },
  { number: 88, name: 'الغَاشِيَة', englishName: 'Al-Ghāshiyah', kurdishName: 'سورەتی غاشیة', englishNameTranslation: 'The Overwhelming', revelationType: 'Meccan', numberOfAyahs: 26, page: 592, juz: 30 },
  { number: 89, name: 'الفَجْر', englishName: 'Al-Fajr', kurdishName: 'سورەتی فەجر', englishNameTranslation: 'The Dawn', revelationType: 'Meccan', numberOfAyahs: 30, page: 593, juz: 30 },
  { number: 90, name: 'البَلَد', englishName: 'Al-Balad', kurdishName: 'سورەتی بەلەد', englishNameTranslation: 'The City', revelationType: 'Meccan', numberOfAyahs: 20, page: 594, juz: 30 },
  { number: 91, name: 'الشَّمْس', englishName: 'Ash-Shams', kurdishName: 'سورەتی شەمس', englishNameTranslation: 'The Sun', revelationType: 'Meccan', numberOfAyahs: 15, page: 595, juz: 30 },
  { number: 92, name: 'اللَّيْل', englishName: 'Al-Lail', kurdishName: 'سورەتی لەیل', englishNameTranslation: 'The Night', revelationType: 'Meccan', numberOfAyahs: 21, page: 595, juz: 30 },
  { number: 93, name: 'الضُّحَى', englishName: 'Aḍ-Ḍuḥā', kurdishName: 'سورەتی ضحى', englishNameTranslation: 'The Morning Hours', revelationType: 'Meccan', numberOfAyahs: 11, page: 596, juz: 30 },
  { number: 94, name: 'الشَّرْح', englishName: 'Ash-Sharḥ', kurdishName: 'سورەتی شەرح', englishNameTranslation: 'The Relief', revelationType: 'Meccan', numberOfAyahs: 8, page: 596, juz: 30 },
  { number: 95, name: 'التِّين', englishName: 'At-Tīn', kurdishName: 'سورەتی تین', englishNameTranslation: 'The Fig', revelationType: 'Meccan', numberOfAyahs: 8, page: 597, juz: 30 },
  { number: 96, name: 'العَلَق', englishName: 'Al-‘Alaq', kurdishName: 'سورەتی عەلەق', englishNameTranslation: 'The Clot', revelationType: 'Meccan', numberOfAyahs: 19, page: 597, juz: 30 },
  { number: 97, name: 'القَدْر', englishName: 'Al-Qadr', kurdishName: 'سورەتی قەدر', englishNameTranslation: 'The Power', revelationType: 'Meccan', numberOfAyahs: 5, page: 598, juz: 30 },
  { number: 98, name: 'البَيِّنَة', englishName: 'Al-Bayyinah', kurdishName: 'سورەتی بینة', englishNameTranslation: 'The Clear Proof', revelationType: 'Medinan', numberOfAyahs: 8, page: 598, juz: 30 },
  { number: 99, name: 'الزَّلْزَلَة', englishName: 'Az-Zalzalah', kurdishName: 'سورەتی زەلزەلە', englishNameTranslation: 'The Earthquake', revelationType: 'Medinan', numberOfAyahs: 8, page: 599, juz: 30 },
  { number: 100, name: 'العَادِيَات', englishName: 'Al-‘Ādiyāt', kurdishName: 'سورەتی عادیات', englishNameTranslation: 'The Courser', revelationType: 'Meccan', numberOfAyahs: 11, page: 599, juz: 30 },
  { number: 101, name: 'القَارِعَة', englishName: 'Al-Qāri‘ah', kurdishName: 'سورەتی قارعة', englishNameTranslation: 'The Calamity', revelationType: 'Meccan', numberOfAyahs: 11, page: 600, juz: 30 },
  { number: 102, name: 'التَّكَاثُر', englishName: 'At-Takāthur', kurdishName: 'سورەتی تکاثر', englishNameTranslation: 'The Rivalry in world increase', revelationType: 'Meccan', numberOfAyahs: 8, page: 600, juz: 30 },
  { number: 103, name: 'العَصْر', englishName: 'Al-‘Aṣr', kurdishName: 'سورەتی عەسر', englishNameTranslation: 'The Declining Day', revelationType: 'Meccan', numberOfAyahs: 3, page: 601, juz: 30 },
  { number: 104, name: 'الهُمَزَة', englishName: 'Al-Humazah', kurdishName: 'سورەتی همزة', englishNameTranslation: 'The Traducer', revelationType: 'Meccan', numberOfAyahs: 9, page: 601, juz: 30 },
  { number: 105, name: 'الفِيل', englishName: 'Al-Fīl', kurdishName: 'سورەتی فیل', englishNameTranslation: 'The Elephant', revelationType: 'Meccan', numberOfAyahs: 5, page: 601, juz: 30 },
  { number: 106, name: 'قُرَيْش', englishName: 'Quraysh', kurdishName: 'سورەتی قورەیش', englishNameTranslation: 'Quraysh', revelationType: 'Meccan', numberOfAyahs: 4, page: 602, juz: 30 },
  { number: 107, name: 'المَاعُون', englishName: 'Al-Mā‘ūn', kurdishName: 'سورەتی ماعون', englishNameTranslation: 'The Small Kindness', revelationType: 'Meccan', numberOfAyahs: 7, page: 602, juz: 30 },
  { number: 108, name: 'الكَوْثَر', englishName: 'Al-Kawthar', kurdishName: 'سورەتی کەوثەر', englishNameTranslation: 'The Abundance', revelationType: 'Meccan', numberOfAyahs: 3, page: 602, juz: 30 },
  { number: 109, name: 'الكَافِرُون', englishName: 'Al-Kāfirūn', kurdishName: 'سورەتی کافرون', englishNameTranslation: 'The Disbelievers', revelationType: 'Meccan', numberOfAyahs: 6, page: 603, juz: 30 },
  { number: 110, name: 'النَّصْر', englishName: 'An-Naṣr', kurdishName: 'سورەتی نەسر', englishNameTranslation: 'The Divine Support', revelationType: 'Medinan', numberOfAyahs: 3, page: 603, juz: 30 },
  { number: 111, name: 'المَسَد', englishName: 'Al-Masad', kurdishName: 'سورەتی مەسەد', englishNameTranslation: 'The Palm Fiber', revelationType: 'Meccan', numberOfAyahs: 5, page: 603, juz: 30 },
  { number: 112, name: 'الإِخْلَاص', englishName: 'Al-Ikhlāṣ', kurdishName: 'سورەتی ئیخلاس', englishNameTranslation: 'The Sincerity', revelationType: 'Meccan', numberOfAyahs: 4, page: 604, juz: 30 },
  { number: 113, name: 'الفَلَق', englishName: 'Al-Falaq', kurdishName: 'سورەتی فەلەق', englishNameTranslation: 'The Daybreak', revelationType: 'Meccan', numberOfAyahs: 5, page: 604, juz: 30 },
  { number: 114, name: 'النَّاس', englishName: 'An-Nās', kurdishName: 'سورەتی ناس', englishNameTranslation: 'Mankind', revelationType: 'Meccan', numberOfAyahs: 6, page: 604, juz: 30 },
];

// Offline sample verse dataset
export const SAMPLE_VERSES_DATA: Record<number, Verse[]> = {
  1: [
    {
      numberInSurah: 1,
      numberInQuran: 1,
      text: 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ',
      kurdish: 'بەناوی خوای بەخشندەی میهرەبان',
      english: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.',
      juz: 1,
      page: 1,
    },
    {
      numberInSurah: 2,
      numberInQuran: 2,
      text: 'ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ',
      kurdish: 'سوپاس و ستایش بۆ پەروەردگاری جیهانییان',
      english: '[All] praise is [due] to Allah, Lord of the worlds -',
      juz: 1,
      page: 1,
    },
    {
      numberInSurah: 3,
      numberInQuran: 3,
      text: 'ٱلرَّحْمَٰنِ ٱلرَّحِيمِ',
      kurdish: 'بەخشندە و میهرەبان',
      english: 'The Entirely Merciful, the Especially Merciful,',
      juz: 1,
      page: 1,
    },
    {
      numberInSurah: 4,
      numberInQuran: 4,
      text: 'مَٰلِكِ يَوْمِ ٱلدِّينِ',
      kurdish: 'خاوەنی ڕۆژی پاداشت و سزایە',
      english: 'Sovereign of the Day of Recompense.',
      juz: 1,
      page: 1,
    },
    {
      numberInSurah: 5,
      numberInQuran: 5,
      text: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
      kurdish: 'تەنها تۆ دەپەرستین و تەنها لەتۆ داوای یارمەتی دەکەین',
      english: 'It is You we worship and You we ask for help.',
      juz: 1,
      page: 1,
    },
    {
      numberInSurah: 6,
      numberInQuran: 6,
      text: 'ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ',
      kurdish: 'ڕێنموییمان بکە بۆ ڕێگای ڕاست',
      english: 'Guide us to the straight path -',
      juz: 1,
      page: 1,
    },
    {
      numberInSurah: 7,
      numberInQuran: 7,
      text: 'صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ',
      kurdish: 'ڕێگای ئەوانەی چاکەت بەسەردا ڕژاندوون، نە ئەوانەی خەزەبیان لێگیراوە و نە سەرلێشێواوان.',
      english: 'The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.',
      juz: 1,
      page: 1,
    },
  ],

  2: [
    {
      numberInSurah: 1,
      numberInQuran: 8,
      text: 'الم',
      kurdish: 'ئەلیف، لام، میم (ڕازی ئەم پیتانە لای خوایە)',
      english: 'Alif, Lam, Meem.',
      juz: 1,
      page: 2,
    },
    {
      numberInSurah: 2,
      numberInQuran: 9,
      text: 'ذَٰلِكَ ٱلْكِتَٰبُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ',
      kurdish: 'ئەم کتێبە بەرێزە چ جای گومان و سڵەمێنەوە نییە تێیدا، هیدایەت و ڕێنماییە بۆ لەخوا ترسان.',
      english: 'This is the Book about which there is no doubt, a guidance for those conscious of Allah -',
      juz: 1,
      page: 2,
    },
    {
      numberInSurah: 3,
      numberInQuran: 10,
      text: 'ٱلَّذِينَ يُؤْمِنُونَ بِٱلْغَيْبِ وَيُقِيمُونَ ٱلصَّلَوٰةَ وَمِمَّا رَزَقْنَٰهُمْ يُنفِقُونَ',
      kurdish: 'ئەوانەی باوەڕ بە نادیار (غەیب) دێنن و نوێژ بەڕێکی ئەنجام دەدەن و لەوەی پێمان بەخشیوون دەبەخشن.',
      english: 'Who believe in the unseen, establish prayer, and spend out of what We have provided for them,',
      juz: 1,
      page: 2,
    },
    {
      numberInSurah: 4,
      numberInQuran: 11,
      text: 'وَٱلَّذِينَ يُؤْمِنُونَ بِمَآ أُنزِلَ إِلَيْكَ وَمَآ أُنزِلَ مِن قَبْلِكَ وَبِٱلْآخِرَةِ هُمْ يُوقِنُونَ',
      kurdish: 'وە ئەوانەی باوەڕ دێنن بەوەی بۆ تۆ دابەزیوە و بەوەی پێش تۆش دابەزیوە و بە ڕۆژی دوایی دڵنیان.',
      english: 'And who believe in what has been revealed to you, [O Muhammad], and what was revealed before you, and of the Hereafter they are certain [in faith].',
      juz: 1,
      page: 2,
    },
    {
      numberInSurah: 5,
      numberInQuran: 12,
      text: 'أُو۟لَٰٓئِكَ عَلَىٰ هُدًى مِّن رَّبِّهِمْ ۖ وَأُو۟لَٰٓئِكَ هُمُ ٱلْمُفْلِحُونَ',
      kurdish: 'ئەوانە لەسەر ڕێنمایی پەروەردگاریانن وە هەر ئەوانەن ڕزگاربووان.',
      english: 'Those are upon [right] guidance from their Lord, and it is those who are the successful.',
      juz: 1,
      page: 2,
    },
    {
      numberInSurah: 6,
      numberInQuran: 13,
      text: 'إِنَّ ٱلَّذِينَ كَفَرُوا۟ سَوَآءٌ عَلَيْهِمْ أَءَنذَرْتَهُمْ أَمْ لَمْ تُنذِرْهُمْ لَا يُؤْمِنُونَ',
      kurdish: 'بەڕاستی ئەوانەی بێباوڕ بوون، بۆیان یەکسانە چ ئاگاداریان بکەیتەوە یان ئاگاداریان نەکەیتەوە، باوەڕ ناهێنن.',
      english: 'Indeed, those who disbelieve - it is all the same for them whether you warn them or do not warn them - they will not believe.',
      juz: 1,
      page: 3,
    },
    {
      numberInSurah: 7,
      numberInQuran: 14,
      text: 'خَتَمَ ٱللَّهُ عَلَىٰ قُلُوبِهِمْ وَعَلَىٰ سَمْعِهِمْ ۖ وَعَلَىٰٓ أَبْصَٰرِهِمْ غِشَٰوَةٌ ۖ وَلَهُمْ عَذَابٌ عَظِيمٌ',
      kurdish: 'خوا مۆری نا بەسەر دڵەکانیان و گوێچکەکانیاندا، وە لەسەر چاوەکانیان پەردەیەک هەیە وە سزایەکی گەورەیان بۆ هەیە.',
      english: 'Allah has set a seal upon their hearts and upon their hearing, and over their vision is a veil. And for them is a great punishment.',
      juz: 1,
      page: 3,
    },
  ],

  112: [
    { numberInSurah: 1, numberInQuran: 6222, text: 'قُلْ هُوَ ٱللَّهُ أَحَدٌ', kurdish: 'بڵێ: ئه‌و خوایه‌ تاقانه‌و بێ هاوتایه‌.', english: 'Say, "He is Allah, [who is] One,', juz: 30, page: 604 },
    { numberInSurah: 2, numberInQuran: 6223, text: 'ٱللَّهُ ٱلصَّمَدُ', kurdish: 'خوایه‌که‌ بێ پێویسته‌ له‌هاوه‌ڵ و منداڵ و هه‌موو دروستکراوان پێویستیان پێیه‌تی.', english: 'Allah, the Eternal Refuge.', juz: 30, page: 604 },
    { numberInSurah: 3, numberInQuran: 6224, text: 'لَمْ يَلِدْ وَلَمْ يُولَدْ', kurdish: 'نه‌ که‌سی لێ بووه‌و نه‌ له‌ که‌سیش بووه‌.', english: 'He neither begets nor is born,', juz: 30, page: 604 },
    { numberInSurah: 4, numberInQuran: 6225, text: 'وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۭ', kurdish: 'وە هیچ کەسێک هاوتا و هاوشێوەی ئەو نییە.', english: 'Nor is there to Him any equivalent."', juz: 30, page: 604 },
  ],
};

// Helper function to convert Western numbers to Arabic Eastern numerals (١, ٢, ٣...)
export function toArabicNumerals(num: number): string {
  const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return num
    .toString()
    .split('')
    .map(d => arabicDigits[parseInt(d, 10)] || d)
    .join('');
}
