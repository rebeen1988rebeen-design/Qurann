export type Verse = {
  numberInSurah: number;
  numberInQuran: number;
  text: string;
  kurdish: string;
  english: string;
  juz: number;
  page: number;
};

export type SurahMeta = {
  number: number;
  name: string;
  englishName: string;
  kurdishName: string;
  englishNameTranslation: string;
  revelationType: string;
  numberOfAyahs: number;
  page: number;
  juz: number;
};

export type Reciter = {
  subtext?: string;
  id: string;
  name: string;
  server: string;
};

export const RECITERS: Reciter[] = [
  { id: 'ar.alafasy', name: 'Mishary Rashid Alafasy', server: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/' },
  { id: 'ar.abdulbasitmurattal', name: 'Abdul Basit (Murattal)', server: 'https://cdn.islamic.network/quran/audio/128/ar.abdulbasitmurattal/' },
  { id: 'ar.husary', name: 'Mahmoud Khalil Al-Husary', server: 'https://cdn.islamic.network/quran/audio/128/ar.husary/' },
  { id: 'ar.minshawi', name: 'Mohamed Siddiq al-Minshawi', server: 'https://cdn.islamic.network/quran/audio/128/ar.minshawi/' },
];

export const SURAHS_LIST: SurahMeta[] = [
  { number: 1, name: 'الفَاتِحَة', englishName: 'Al-Fātiḥah', kurdishName: 'سورەتی فاتیحە', englishNameTranslation: 'The Opening', revelationType: 'Meccan', numberOfAyahs: 7, page: 1, juz: 1 },
  { number: 2, name: 'البَقَرَة', englishName: 'Al-Baqarah', kurdishName: 'سورەتی بەقەرە', englishNameTranslation: 'The Cow', revelationType: 'Medinan', numberOfAyahs: 286, page: 2, juz: 1 },
  { number: 3, name: 'آل عِمْرَان', englishName: 'Āl-‘Imrān', kurdishName: 'سورەتی ئالی عیمران', englishNameTranslation: 'Family of Imran', revelationType: 'Medinan', numberOfAyahs: 200, page: 50, juz: 3 },
  { number: 4, name: 'النِّسَاء', englishName: 'An-Nisā’', kurdishName: 'سورەتی نیسا', englishNameTranslation: 'The Women', revelationType: 'Medinan', numberOfAyahs: 176, page: 77, juz: 4 },
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
  { number: 15, name: 'الحِجْر', englishName: 'Al-Ḥijr', kurdishName: 'سورەتی حیجر', englishNameTranslation: 'The Rocky Tract', revelationType: 'Meccan', numberOfAyahs: 99, page: 262, juz: 14 },
  { number: 16, name: 'النَّحْل', englishName: 'An-Naḥl', kurdishName: 'سورەتی نەحل', englishNameTranslation: 'The Bee', revelationType: 'Meccan', numberOfAyahs: 128, page: 267, juz: 14 },
  { number: 17, name: 'الإِسْرَاء', englishName: 'Al-Isrā’', kurdishName: 'سورەتی ئیسرا', englishNameTranslation: 'The Night Journey', revelationType: 'Meccan', numberOfAyahs: 111, page: 282, juz: 15 },
  { number: 18, name: 'الكَهْف', englishName: 'Al-Kahf', kurdishName: 'سورەتی کەهف', englishNameTranslation: 'The Cave', revelationType: 'Meccan', numberOfAyahs: 110, page: 293, juz: 15 },
  { number: 19, name: 'مَرْيَم', englishName: 'Maryam', kurdishName: 'سورەتی مەریەم', englishNameTranslation: 'Mary', revelationType: 'Meccan', numberOfAyahs: 98, page: 305, juz: 16 },
  { number: 20, name: 'طه', englishName: 'Ṭā-Hā', kurdishName: 'سورەتی تاها', englishNameTranslation: 'Ta-Ha', revelationType: 'Meccan', numberOfAyahs: 135, page: 312, juz: 16 },
  { number: 21, name: 'الأَنْبِيَاء', englishName: 'Al-Anbiyā’', kurdishName: 'سورەتی ئەنبیا', englishNameTranslation: 'The Prophets', revelationType: 'Meccan', numberOfAyahs: 112, page: 322, juz: 17 },
  { number: 22, name: 'الحَجّ', englishName: 'Al-Ḥajj', kurdishName: 'سورەتی حەج', englishNameTranslation: 'The Pilgrimage', revelationType: 'Medinan', numberOfAyahs: 78, page: 332, juz: 17 },
  { number: 23, name: 'المُؤْمِنُون', englishName: 'Al-Mu’minūn', kurdishName: 'سورەتی موئمینون', englishNameTranslation: 'The Believers', revelationType: 'Meccan', numberOfAyahs: 118, page: 342, juz: 18 },
  { number: 24, name: 'النُّور', englishName: 'An-Nūr', kurdishName: 'سورەتی نور', englishNameTranslation: 'The Light', revelationType: 'Medinan', numberOfAyahs: 64, page: 350, juz: 18 },
  { number: 25, name: 'الفُرْقَان', englishName: 'Al-Furqān', kurdishName: 'سورەتی فورقان', englishNameTranslation: 'The Criterion', revelationType: 'Meccan', numberOfAyahs: 77, page: 359, juz: 18 },
  { number: 26, name: 'الشُّعَرَاء', englishName: 'Ash-Shu‘arā’', kurdishName: 'سورەتی شوعەرا', englishNameTranslation: 'The Poets', revelationType: 'Meccan', numberOfAyahs: 227, page: 367, juz: 19 },
  { number: 27, name: 'النَّمْل', englishName: 'An-Naml', kurdishName: 'سورەتی نەمل', englishNameTranslation: 'The Ant', revelationType: 'Meccan', numberOfAyahs: 93, page: 377, juz: 19 },
  { number: 28, name: 'القَصَص', englishName: 'Al-Qaṣaṣ', kurdishName: 'سورەتی قەسەس', englishNameTranslation: 'The Stories', revelationType: 'Meccan', numberOfAyahs: 88, page: 385, juz: 20 },
  { number: 29, name: 'العَنْكَبُوت', englishName: 'Al-‘Ankabūt', kurdishName: 'سورەتی عەنکەبوت', englishNameTranslation: 'The Spider', revelationType: 'Meccan', numberOfAyahs: 69, page: 396, juz: 20 },
  { number: 30, name: 'الرُّوم', englishName: 'Ar-Rūm', kurdishName: 'سورەتی ڕوم', englishNameTranslation: 'The Romans', revelationType: 'Meccan', numberOfAyahs: 60, page: 404, juz: 21 },
  { number: 31, name: 'لُقْمَان', englishName: 'Luqmān', kurdishName: 'سورەتی لوقمان', englishNameTranslation: 'Luqman', revelationType: 'Meccan', numberOfAyahs: 34, page: 411, juz: 21 },
  { number: 32, name: 'السَّجْدَة', englishName: 'As-Sajdah', kurdishName: 'سورەتی سەجدە', englishNameTranslation: 'The Prostration', revelationType: 'Meccan', numberOfAyahs: 30, page: 415, juz: 21 },
  { number: 33, name: 'الأَحْزَاب', englishName: 'Al-Aḥzāb', kurdishName: 'سورەتی ئەحزاب', englishNameTranslation: 'The Combined Forces', revelationType: 'Medinan', numberOfAyahs: 73, page: 418, juz: 21 },
  { number: 34, name: 'سَبَأ', englishName: 'Saba’', kurdishName: 'سورەتی سەبەء', englishNameTranslation: 'Sheba', revelationType: 'Meccan', numberOfAyahs: 54, page: 428, juz: 22 },
  { number: 35, name: 'فَاطِر', englishName: 'Fāṭir', kurdishName: 'سورەتی فاتر', englishNameTranslation: 'Originator', revelationType: 'Meccan', numberOfAyahs: 45, page: 434, juz: 22 },
  { number: 36, name: 'يس', englishName: 'Yā-Sīn', kurdishName: 'سورەتی یاسین', englishNameTranslation: 'Ya Sin', revelationType: 'Meccan', numberOfAyahs: 83, page: 440, juz: 22 },
  { number: 37, name: 'الصَّافَّات', englishName: 'Aṣ-Ṣāffāt', kurdishName: 'سورەتی سافات', englishNameTranslation: 'Those who set the Ranks', revelationType: 'Meccan', numberOfAyahs: 182, page: 446, juz: 23 },
  { number: 38, name: 'ص', englishName: 'Ṣād', kurdishName: 'سورەتی ساد', englishNameTranslation: 'The Letter "Saad"', revelationType: 'Meccan', numberOfAyahs: 88, page: 453, juz: 23 },
  { number: 39, name: 'الزُّمَر', englishName: 'Az-Zumar', kurdishName: 'سورەتی زومەر', englishNameTranslation: 'The Troops', revelationType: 'Meccan', numberOfAyahs: 75, page: 458, juz: 23 },
  { number: 40, name: 'غَافِر', englishName: 'Ghāfir', kurdishName: 'سورەتی غافر', englishNameTranslation: 'The Forgiver', revelationType: 'Meccan', numberOfAyahs: 85, page: 467, juz: 24 },
  { number: 41, name: 'فُصِّلَت', englishName: 'Fuṣṣilat', kurdishName: 'سورەتی فوسیلەت', englishNameTranslation: 'Explained in Detail', revelationType: 'Meccan', numberOfAyahs: 54, page: 477, juz: 24 },
  { number: 42, name: 'الشُّورَى', englishName: 'Ash-Shūrā', kurdishName: 'سورەتی شورا', englishNameTranslation: 'The Consultation', revelationType: 'Meccan', numberOfAyahs: 53, page: 483, juz: 25 },
  { number: 43, name: 'الزُّخْرُف', englishName: 'Az-Zukhruf', kurdishName: 'سورەتی زوخروف', englishNameTranslation: 'The Ornaments of Gold', revelationType: 'Meccan', numberOfAyahs: 89, page: 489, juz: 25 },
  { number: 44, name: 'الدُّخَان', englishName: 'Ad-Dukhān', kurdishName: 'سورەتی دوخان', englishNameTranslation: 'The Smoke', revelationType: 'Meccan', numberOfAyahs: 59, page: 496, juz: 25 },
  { number: 45, name: 'الجَاثِيَة', englishName: 'Al-Jāthiyah', kurdishName: 'سورەتی جاثیة', englishNameTranslation: 'The Crouching', revelationType: 'Meccan', numberOfAyahs: 37, page: 499, juz: 25 },
  { number: 46, name: 'الأَحْقَاف', englishName: 'Al-Aḥqāf', kurdishName: 'سورەتی ئەحقاف', englishNameTranslation: 'The Wind-Curved Sandhills', revelationType: 'Meccan', numberOfAyahs: 35, page: 502, juz: 26 },
  { number: 47, name: 'مُحَمَّد', englishName: 'Muḥammad', kurdishName: 'سورەتی موحەممەد', englishNameTranslation: 'Muhammad', revelationType: 'Medinan', numberOfAyahs: 38, page: 507, juz: 26 },
  { number: 48, name: 'الفَتْح', englishName: 'Al-Fatḥ', kurdishName: 'سورەتی فەتح', englishNameTranslation: 'The Victory', revelationType: 'Medinan', numberOfAyahs: 29, page: 511, juz: 26 },
  { number: 49, name: 'الحُجُرَات', englishName: 'Al-Ḥujurāt', kurdishName: 'سورەتی حوجورات', englishNameTranslation: 'The Rooms', revelationType: 'Medinan', numberOfAyahs: 18, page: 515, juz: 26 },
  { number: 50, name: 'ق', englishName: 'Qāf', kurdishName: 'سورەتی قاف', englishNameTranslation: 'The Letter "Qaf"', revelationType: 'Meccan', numberOfAyahs: 45, page: 518, juz: 26 },
  { number: 51, name: 'الذَّارِيَات', englishName: 'Adh-Dhāriyāt', kurdishName: 'سورەتی ذاریات', englishNameTranslation: 'The Winnowing Winds', revelationType: 'Meccan', numberOfAyahs: 60, page: 520, juz: 26 },
  { number: 52, name: 'الطُّور', englishName: 'Aṭ-Ṭūr', kurdishName: 'سورەتی تور', englishNameTranslation: 'The Mount', revelationType: 'Meccan', numberOfAyahs: 49, page: 523, juz: 27 },
  { number: 53, name: 'النَّجْم', englishName: 'An-Najm', kurdishName: 'سورەتی نەجم', englishNameTranslation: 'The Star', revelationType: 'Meccan', numberOfAyahs: 62, page: 526, juz: 27 },
  { number: 54, name: 'القَمَر', englishName: 'Al-Qamar', kurdishName: 'سورەتی قەمەر', englishNameTranslation: 'The Moon', revelationType: 'Meccan', numberOfAyahs: 55, page: 528, juz: 27 },
  { number: 55, name: 'الرَّحْمَٰن', englishName: 'Ar-Raḥmān', kurdishName: 'سورەتی ڕەحمان', englishNameTranslation: 'The Beneficent', revelationType: 'Medinan', numberOfAyahs: 78, page: 531, juz: 27 },
  { number: 56, name: 'الوَاقِعَة', englishName: 'Al-Wāqi‘ah', kurdishName: 'سورەتی واقیعە', englishNameTranslation: 'The Inevitable', revelationType: 'Meccan', numberOfAyahs: 96, page: 534, juz: 27 },
  { number: 57, name: 'الحَدِيد', englishName: 'Al-Ḥadīd', kurdishName: 'سورەتی حەدید', englishNameTranslation: 'The Iron', revelationType: 'Medinan', numberOfAyahs: 29, page: 537, juz: 27 },
  { number: 58, name: 'المُجَادِلَة', englishName: 'Al-Mujādilah', kurdishName: 'سورەتی موجادەلە', englishNameTranslation: 'The Pleading Woman', revelationType: 'Medinan', numberOfAyahs: 22, page: 542, juz: 28 },
  { number: 59, name: 'الحَشْر', englishName: 'Al-Ḥashr', kurdishName: 'سورەتی حەشر', englishNameTranslation: 'The Exile', revelationType: 'Medinan', numberOfAyahs: 24, page: 545, juz: 28 },
  { number: 60, name: 'المُمْتَحِنَة', englishName: 'Al-Mumtaḥinah', kurdishName: 'سورەتی مومتاحینە', englishNameTranslation: 'She that is to be examined', revelationType: 'Medinan', numberOfAyahs: 13, page: 549, juz: 28 },
  { number: 61, name: 'الصَّفّ', englishName: 'Aṣ-Ṣaff', kurdishName: 'سورەتی سەف', englishNameTranslation: 'The Ranks', revelationType: 'Medinan', numberOfAyahs: 14, page: 551, juz: 28 },
  { number: 62, name: 'الجُمُعَة', englishName: 'Al-Jumu‘ah', kurdishName: 'سورەتی جومعە', englishNameTranslation: 'The Congregation, Friday', revelationType: 'Medinan', numberOfAyahs: 11, page: 553, juz: 28 },
  { number: 63, name: 'المُنَافِقُون', englishName: 'Al-Munāfiqūn', kurdishName: 'سورەتی مونافیقون', englishNameTranslation: 'The Hypocrites', revelationType: 'Medinan', numberOfAyahs: 11, page: 554, juz: 28 },
  { number: 64, name: 'التَّغَابُن', englishName: 'At-Taghābun', kurdishName: 'سورەتی تەغابون', englishNameTranslation: 'The Mutual Disillusion', revelationType: 'Medinan', numberOfAyahs: 18, page: 556, juz: 28 },
  { number: 65, name: 'الطَّلَاق', englishName: 'Aṭ-Ṭalāq', kurdishName: 'سورەتی تەڵاق', englishNameTranslation: 'The Divorce', revelationType: 'Medinan', numberOfAyahs: 12, page: 558, juz: 28 },
  { number: 66, name: 'التَّحْرِيم', englishName: 'At-Taḥrīم', kurdishName: 'سورەتی تەحریم', englishNameTranslation: 'The Prohibition', revelationType: 'Medinan', numberOfAyahs: 12, page: 560, juz: 28 },
  { number: 67, name: 'المُلْك', englishName: 'Al-Mulk', kurdishName: 'سورەتی مولک', englishNameTranslation: 'The Sovereignty', revelationType: 'Meccan', numberOfAyahs: 30, page: 562, juz: 29 },
  { number: 68, name: 'القَلَم', englishName: 'Al-Qalam', kurdishName: 'سورەتی قەڵەم', englishNameTranslation: 'The Pen', revelationType: 'Meccan', numberOfAyahs: 52, page: 564, juz: 29 },
  { number: 69, name: 'الحَاقَّة', englishName: 'Al-Ḥāqqah', kurdishName: 'سورەتی حاققە', englishNameTranslation: 'The Reality', revelationType: 'Meccan', numberOfAyahs: 52, page: 566, juz: 29 },
  { number: 70, name: 'المَعَارِج', englishName: 'Al-Ma‘ārij', kurdishName: 'سورەتی مەعاریج', englishNameTranslation: 'The Ascending Stairways', revelationType: 'Meccan', numberOfAyahs: 44, page: 568, juz: 29 },
  { number: 71, name: 'نُوح', englishName: 'Nūḥ', kurdishName: 'سورەتی نوح', englishNameTranslation: 'Noah', revelationType: 'Meccan', numberOfAyahs: 28, page: 570, juz: 29 },
  { number: 72, name: 'الجِنّ', englishName: 'Al-Jinn', kurdishName: 'سورەتی جن', englishNameTranslation: 'The Jinn', revelationType: 'Meccan', numberOfAyahs: 28, page: 572, juz: 29 },
  { number: 73, name: 'المُزَّمِّل', englishName: 'Al-Muzzammil', kurdishName: 'سورەتی موزەممیل', englishNameTranslation: 'The Enshrouded One', revelationType: 'Meccan', numberOfAyahs: 20, page: 574, juz: 29 },
  { number: 74, name: 'المُدَّثِّر', englishName: 'Al-Muddaththir', kurdishName: 'سورەتی موددەسیر', englishNameTranslation: 'The Cloaked One', revelationType: 'Meccan', numberOfAyahs: 56, page: 575, juz: 29 },
  { number: 75, name: 'القِيَامَة', englishName: 'Al-Qiyāmah', kurdishName: 'سورەتی قیامە', englishNameTranslation: 'The Resurrection', revelationType: 'Meccan', numberOfAyahs: 40, page: 577, juz: 29 },
  { number: 76, name: 'الإِنْسَان', englishName: 'Al-Insān', kurdishName: 'سورەتی ئینسان', englishNameTranslation: 'The Man', revelationType: 'Medinan', numberOfAyahs: 31, page: 578, juz: 29 },
  { number: 77, name: 'المُرْسَلَات', englishName: 'Al-Mursalāt', kurdishName: 'سورەتی مورسەلات', englishNameTranslation: 'The Emissaries', revelationType: 'Meccan', numberOfAyahs: 50, page: 580, juz: 29 },
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

export let SAMPLE_VERSES_DATA: Record<number, Verse[]> = {};

export async function loadQuranData() {
  if (Object.keys(SAMPLE_VERSES_DATA).length > 0) return SAMPLE_VERSES_DATA;
  const res = await fetch('/quranData.json');
  const data = await res.json();
  SAMPLE_VERSES_DATA = data;
  return SAMPLE_VERSES_DATA;
}

export function toArabicNumerals(num: number): string {
  const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return num
    .toString()
    .split('')
    .map(d => arabicDigits[parseInt(d, 10)] || d)
    .join('');
}
