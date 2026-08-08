import { Coordinates, CalculationMethod, PrayerTimes, CalculationParameters, Madhab } from 'adhan';

export interface CityInfo {
  id: string;
  nameKu: string;
  nameAr: string;
  nameEn: string;
  lat: number;
  lon: number;
}

export type PrayerId = 'fajr' | 'sunrise' | 'dhuhr' | 'asr' | 'maghrib' | 'isha';

export type CalculationMethodKey = 'kurdistan_awqaf' | 'mwl' | 'umm_al_qura' | 'egyptian' | 'diyanet' | 'kuwait' | 'gulf';
export type MadhabKey = 'shafi' | 'hanafi';

export interface CalculationMethodOption {
  key: CalculationMethodKey;
  labelKu: string;
  labelAr: string;
  labelEn: string;
}

export const CALCULATION_METHODS: CalculationMethodOption[] = [
  {
    key: 'kurdistan_awqaf',
    labelKu: 'وەزارەتی ئەوقافی هەرێمی کوردستان (فەرمی - زۆر وورد)',
    labelAr: 'وزارة الأوقاف - إقليم كوردستان (رسمي)',
    labelEn: 'Kurdistan Ministry of Awqaf (Official)'
  },
  {
    key: 'mwl',
    labelKu: 'ڕابیتەی جیهانی ئیسلامی (MWL)',
    labelAr: 'رابطة العالم الإسلامي (MWL)',
    labelEn: 'Muslim World League (MWL)'
  },
  {
    key: 'umm_al_qura',
    labelKu: 'ئوم ئەلقورا (مەککە)',
    labelAr: 'أم القرى (مكة المكرمة)',
    labelEn: 'Umm al-Qura (Makkah)'
  },
  {
    key: 'diyanet',
    labelKu: 'سەرۆکایەتی کاروباری ئایینی تورکیا (دیانەت)',
    labelAr: 'رئاسة الشؤون الدينية التركية (ديانت)',
    labelEn: 'Turkey Diyanet'
  },
  {
    key: 'egyptian',
    labelKu: 'دەستەی رووپێوی میسری',
    labelAr: 'الهيئة المصرية العامة للمساحة',
    labelEn: 'Egyptian General Authority'
  },
  {
    key: 'kuwait',
    labelKu: 'کووەیت',
    labelAr: 'دولة الكويت',
    labelEn: 'Kuwait'
  },
  {
    key: 'gulf',
    labelKu: 'کەنداوی عەرەبی',
    labelAr: 'منطقة الخليج العربي',
    labelEn: 'Gulf Region'
  }
];

export const DEFAULT_CITIES: CityInfo[] = [
  { id: 'erbil', nameKu: 'هەولێر', nameAr: 'أربيل', nameEn: 'Erbil', lat: 36.1911, lon: 44.0091 },
  { id: 'sulaymaniyah', nameKu: 'سلێمانی', nameAr: 'السليمانية', nameEn: 'Sulaymaniyah', lat: 35.5560, lon: 45.4370 },
  { id: 'duhok', nameKu: 'دهۆک', nameAr: 'دهوك', nameEn: 'Duhok', lat: 36.8679, lon: 42.9886 },
  { id: 'halabja', nameKu: 'هەڵەبجە', nameAr: 'حلبجة', nameEn: 'Halabja', lat: 35.1780, lon: 45.9860 },
  { id: 'zakho', nameKu: 'زاخۆ', nameAr: 'زاخو', nameEn: 'Zakho', lat: 37.1492, lon: 42.6861 },
  { id: 'akre', nameKu: 'ئاکرێ', nameAr: 'عقرة', nameEn: 'Akre', lat: 36.7428, lon: 43.8933 },
  { id: 'koya', nameKu: 'کۆیە', nameAr: 'كويسنجق', nameEn: 'Koya', lat: 36.0833, lon: 44.6333 },
  { id: 'rania', nameKu: 'ڕانیە', nameAr: 'رانية', nameEn: 'Rania', lat: 36.2552, lon: 44.8824 },
  { id: 'rawanduz', nameKu: 'ڕواندز', nameAr: 'رواندوز', nameEn: 'Rawanduz', lat: 36.6117, lon: 44.5244 },
  { id: 'soran', nameKu: 'سۆران', nameAr: 'سوران', nameEn: 'Soran', lat: 36.6525, lon: 44.5422 },
  { id: 'shaqlawa', nameKu: 'شەقڵاوە', nameAr: 'شقلاوة', nameEn: 'Shaqlawa', lat: 36.4022, lon: 44.3236 },
  { id: 'chamchamal', nameKu: 'چەمچەماڵ', nameAr: 'جمجمال', nameEn: 'Chamchamal', lat: 35.5311, lon: 44.8322 },
  { id: 'kalar', nameKu: 'کەلار', nameAr: 'كلار', nameEn: 'Kalar', lat: 34.6247, lon: 45.3183 },
  { id: 'kirkuk', nameKu: 'کەرکووک', nameAr: 'كركوك', nameEn: 'Kirkuk', lat: 35.4681, lon: 44.3922 },
  { id: 'baghdad', nameKu: 'بەغدا', nameAr: 'بغداد', nameEn: 'Baghdad', lat: 33.3152, lon: 44.3661 },
  { id: 'mosul', nameKu: 'مووسڵ', nameAr: 'الموصل', nameEn: 'Mosul', lat: 36.3400, lon: 43.1300 }
];

export function getMethodParameters(methodKey: CalculationMethodKey): CalculationParameters {
  switch (methodKey) {
    case 'umm_al_qura':
      return CalculationMethod.UmmAlQura();
    case 'egyptian':
      return CalculationMethod.Egyptian();
    case 'diyanet':
      return CalculationMethod.Turkey();
    case 'kuwait':
      return CalculationMethod.Kuwait();
    case 'gulf':
      return CalculationMethod.Dubai();
    case 'mwl':
    default:
      return CalculationMethod.MuslimWorldLeague();
  }
}

export function calculateDynamicPrayerTimes(
  lat: number,
  lon: number,
  date: Date,
  methodKey: CalculationMethodKey = 'kurdistan_awqaf',
  manualOffsets: Record<string, number> = {},
  madhabKey: MadhabKey = 'shafi'
): Record<PrayerId, Date> {
  const coords = new Coordinates(lat, lon);

  const applyOffset = (baseDate: Date, offsetMinutes: number = 0): Date => {
    return new Date(baseDate.getTime() + offsetMinutes * 60000);
  };

  if (methodKey === 'kurdistan_awqaf') {
    // Official Kurdistan Ministry of Awqaf parameters with Ihtiyat (safety buffers)
    const params = CalculationMethod.MuslimWorldLeague();
    params.madhab = madhabKey === 'hanafi' ? Madhab.Hanafi : Madhab.Shafi;
    params.adjustments.fajr = 6;
    params.adjustments.sunrise = 9;
    params.adjustments.dhuhr = 9;
    params.adjustments.asr = 6;
    params.adjustments.maghrib = 4;

    const times = new PrayerTimes(coords, date, params);

    const maghribDate = applyOffset(times.maghrib, manualOffsets.maghrib || 0);
    const ishaDate = new Date(maghribDate.getTime() + 75 * 60000 + (manualOffsets.isha || 0) * 60000);

    return {
      fajr: applyOffset(times.fajr, manualOffsets.fajr || 0),
      sunrise: applyOffset(times.sunrise, manualOffsets.sunrise || 0),
      dhuhr: applyOffset(times.dhuhr, manualOffsets.dhuhr || 0),
      asr: applyOffset(times.asr, manualOffsets.asr || 0),
      maghrib: maghribDate,
      isha: ishaDate
    };
  }

  const params = getMethodParameters(methodKey);
  params.madhab = madhabKey === 'hanafi' ? Madhab.Hanafi : Madhab.Shafi;

  const times = new PrayerTimes(coords, date, params);

  return {
    fajr: applyOffset(times.fajr, manualOffsets.fajr || 0),
    sunrise: applyOffset(times.sunrise, manualOffsets.sunrise || 0),
    dhuhr: applyOffset(times.dhuhr, manualOffsets.dhuhr || 0),
    asr: applyOffset(times.asr, manualOffsets.asr || 0),
    maghrib: applyOffset(times.maghrib, manualOffsets.maghrib || 0),
    isha: applyOffset(times.isha, manualOffsets.isha || 0)
  };
}

export interface PrayerItemConfig {
  id: PrayerId;
  nameKu: string;
  nameAr: string;
  nameEn: string;
  isFard: boolean;
  audioKey: string;
}

export const PRAYERS_CONFIG: PrayerItemConfig[] = [
  { id: 'fajr', nameKu: 'بەیانی', nameAr: 'الفجر', nameEn: 'Fajr', isFard: true, audioKey: 'fajr' },
  { id: 'sunrise', nameKu: 'ڕۆژھەڵاتن', nameAr: 'الشروق', nameEn: 'Sunrise', isFard: false, audioKey: '' },
  { id: 'dhuhr', nameKu: 'نیوەڕۆ', nameAr: 'الظهر', nameEn: 'Dhuhr', isFard: true, audioKey: 'dhuhr' },
  { id: 'asr', nameKu: 'عەسر', nameAr: 'العصر', nameEn: 'Asr', isFard: true, audioKey: 'asr' },
  { id: 'maghrib', nameKu: 'ئێوارە', nameAr: 'المغرب', nameEn: 'Maghrib', isFard: true, audioKey: 'maghrib' },
  { id: 'isha', nameKu: 'عیشا', nameAr: 'العشاء', nameEn: 'Isha', isFard: true, audioKey: 'isha' }
];

export function formatTime12h(date: Date, lang: 'ku' | 'ar' | 'en' = 'ku'): string {
  if (!date || isNaN(date.getTime())) return '--:--';
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const isPM = hours >= 12;
  hours = hours % 12;
  if (hours === 0) hours = 12;

  const padMin = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const padHr = hours < 10 ? `0${hours}` : `${hours}`;

  if (lang === 'en') {
    return `${padHr}:${padMin} ${isPM ? 'PM' : 'AM'}`;
  } else if (lang === 'ar') {
    return `${padHr}:${padMin} ${isPM ? 'م' : 'ص'}`;
  } else {
    // Kurdish Sorani: ب.ن (بەرلە نێوەڕۆ = AM), پ.ن (پاش نێوەڕۆ = PM)
    return `${padHr}:${padMin} ${isPM ? 'پ.ن' : 'ب.ن'}`;
  }
}
