'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Clock, 
  Bell, 
  Sparkles, 
  MapPin, 
  Navigation, 
  SlidersHorizontal, 
  Volume2, 
  VolumeX, 
  RotateCw, 
  ChevronDown, 
  Check, 
  Settings, 
  X, 
  Sun, 
  Sunrise as SunriseIcon, 
  Sunset, 
  Moon, 
  CloudSun,
  LocateFixed,
  AlertCircle
} from 'lucide-react';
import { IconBox } from '@/components/IconBox';
import { Language, TRANSLATIONS, toLocalizedNumeral } from '@/data/translations';
import { ThemeMode, getThemeConfig } from '@/lib/themeUtils';
import { 
  CityInfo, 
  DEFAULT_CITIES, 
  CALCULATION_METHODS, 
  CalculationMethodKey, 
  MadhabKey, 
  PRAYERS_CONFIG, 
  PrayerId, 
  calculateDynamicPrayerTimes, 
  formatTime12h 
} from '@/lib/prayerTimes';

interface AthanViewProps {
  appLanguage: Language;
  themeMode: ThemeMode;
}

export const AthanView: React.FC<AthanViewProps> = ({ appLanguage, themeMode }) => {
  const t = TRANSLATIONS[appLanguage] || TRANSLATIONS['ku'];
  const themeConfig = getThemeConfig(themeMode);
  const cardGlassClass = themeConfig.cardGlass;

  // Selected City or Custom GPS
  const [selectedCityId, setSelectedCityId] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('athan_city_id') || 'erbil';
    }
    return 'erbil';
  });

  const [customCoords, setCustomCoords] = useState<{ lat: number; lon: number; name: string } | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('athan_custom_coords');
      if (saved) {
        try { return JSON.parse(saved); } catch { return null; }
      }
    }
    return null;
  });

  // GPS loading state & error
  const [isGpsLoading, setIsGpsLoading] = useState<boolean>(false);
  const [gpsError, setGpsError] = useState<string | null>(null);

  // Settings: Calculation Method & Madhab
  const [calcMethod, setCalcMethod] = useState<CalculationMethodKey>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('athan_calc_method') as CalculationMethodKey;
      if (saved && ['kurdistan_awqaf', 'mwl', 'umm_al_qura', 'egyptian', 'diyanet', 'kuwait', 'gulf'].includes(saved)) {
        return saved;
      }
    }
    return 'kurdistan_awqaf';
  });

  const [madhab, setMadhab] = useState<MadhabKey>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('athan_madhab') as MadhabKey) || 'shafi';
    }
    return 'shafi';
  });

  // Manual minute offsets
  const [offsets, setOffsets] = useState<Record<string, number>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('athan_offsets');
      if (saved) {
        try { return JSON.parse(saved); } catch { /* ignore */ }
      }
    }
    return { fajr: 0, sunrise: 0, dhuhr: 0, asr: 0, maghrib: 0, isha: 0 };
  });

  // UI Modals & Dropdowns
  const [isCitySelectorOpen, setIsCitySelectorOpen] = useState<boolean>(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState<boolean>(false);

  // Audio Playback State
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [activeAudioPrayer, setActiveAudioPrayer] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Real-time ticking clock
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Save state choices to LocalStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('athan_city_id', selectedCityId);
      localStorage.setItem('athan_calc_method', calcMethod);
      localStorage.setItem('athan_madhab', madhab);
      localStorage.setItem('athan_offsets', JSON.stringify(offsets));
      if (customCoords) {
        localStorage.setItem('athan_custom_coords', JSON.stringify(customCoords));
      } else {
        localStorage.removeItem('athan_custom_coords');
      }
    }
  }, [selectedCityId, calcMethod, madhab, offsets, customCoords]);

  // Active City details
  const activeCity = useMemo(() => {
    if (customCoords) {
      return {
        id: 'gps',
        nameKu: customCoords.name,
        nameAr: 'الموقع الحالي (GPS)',
        nameEn: 'Current Location (GPS)',
        lat: customCoords.lat,
        lon: customCoords.lon
      };
    }
    return DEFAULT_CITIES.find(c => c.id === selectedCityId) || DEFAULT_CITIES[0];
  }, [selectedCityId, customCoords]);

  // Handle Geolocation Fetching
  const handleRequestGps = () => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      setGpsError('سیستەمی GPS لەگەڕۆکەکەتدا پشتگیری نەکراوە.');
      return;
    }

    setIsGpsLoading(true);
    setGpsError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setCustomCoords({
          lat: latitude,
          lon: longitude,
          name: 'شوێنی ڕاستەقینە (GPS)'
        });
        setIsGpsLoading(false);
      },
      (err) => {
        setIsGpsLoading(false);
        if (err.code === err.PERMISSION_DENIED) {
          setGpsError('تکایە شوێنی خۆت هەڵبژێرە بۆ نیشاندانی کاتە دروستەکانی بانگدان.');
        } else {
          setGpsError('نەتوانرا شوێنی جوگرافی بۆدۆزرێتەوە. تکایە شارەکەت بە دەستی هەڵبژێرە.');
        }
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 }
    );
  };

  // Compute Today's Prayer Times
  const computedPrayerTimes = useMemo(() => {
    return calculateDynamicPrayerTimes(
      activeCity.lat,
      activeCity.lon,
      now,
      calcMethod,
      offsets,
      madhab
    );
  }, [activeCity, now, calcMethod, offsets, madhab]);

  // Compute Tomorrow's Prayer Times (for overnight countdown to Fajr)
  const tomorrowPrayerTimes = useMemo(() => {
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return calculateDynamicPrayerTimes(
      activeCity.lat,
      activeCity.lon,
      tomorrow,
      calcMethod,
      offsets,
      madhab
    );
  }, [activeCity, now, calcMethod, offsets, madhab]);

  // Next Prayer & Countdown Calculations
  const { nextPrayerConfig, nextPrayerTime, secondsRemaining, intervalProgress, isTomorrow } = useMemo(() => {
    const currentMs = now.getTime();
    
    // Check main fard prayers in order: Fajr, Dhuhr, Asr, Maghrib, Isha
    const fardPrayers = PRAYERS_CONFIG.filter(p => p.isFard);
    
    let foundNext: { config: typeof fardPrayers[0]; time: Date; prevTime: Date; isTomorrow: boolean } | null = null;

    // Yesterday's Isha / previous interval reference
    let prevPrayerTime = new Date(computedPrayerTimes.fajr.getTime() - 4 * 3600 * 1000);

    for (let i = 0; i < fardPrayers.length; i++) {
      const p = fardPrayers[i];
      const pTime = computedPrayerTimes[p.id];
      
      if (pTime.getTime() > currentMs) {
        foundNext = {
          config: p,
          time: pTime,
          prevTime: prevPrayerTime,
          isTomorrow: false
        };
        break;
      }
      prevPrayerTime = pTime;
    }

    // If past today's Isha, next prayer is Tomorrow's Fajr!
    if (!foundNext) {
      foundNext = {
        config: fardPrayers[0], // Fajr
        time: tomorrowPrayerTimes.fajr,
        prevTime: computedPrayerTimes.isha,
        isTomorrow: true
      };
    }

    const diffSec = Math.max(0, Math.floor((foundNext.time.getTime() - currentMs) / 1000));
    
    // Interval progress percentage
    const totalIntervalSec = Math.max(1, Math.floor((foundNext.time.getTime() - foundNext.prevTime.getTime()) / 1000));
    const elapsedSec = totalIntervalSec - diffSec;
    const progressPct = Math.min(100, Math.max(0, Math.floor((elapsedSec / totalIntervalSec) * 100)));

    return {
      nextPrayerConfig: foundNext.config,
      nextPrayerTime: foundNext.time,
      secondsRemaining: diffSec,
      intervalProgress: progressPct,
      isTomorrow: foundNext.isTomorrow
    };
  }, [now, computedPrayerTimes, tomorrowPrayerTimes]);

  // Format Countdown String
  const countdownFormatted = useMemo(() => {
    const hrs = Math.floor(secondsRemaining / 3600);
    const mins = Math.floor((secondsRemaining % 3600) / 60);
    const secs = secondsRemaining % 60;

    const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
    const timeStr = `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
    return toLocalizedNumeral(timeStr, appLanguage);
  }, [secondsRemaining, appLanguage]);

  // Toggle Audio Playback
  const handleToggleAudio = (prayerName: string) => {
    if (isPlayingAudio) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      setIsPlayingAudio(false);
      setActiveAudioPrayer(null);
      return;
    }

    // High quality Athan audio stream
    const athanAudioUrl = 'https://cdn.islamicfinder.org/athan/makkah.mp3';
    const audio = new Audio(athanAudioUrl);
    audioRef.current = audio;

    setIsPlayingAudio(true);
    setActiveAudioPrayer(prayerName);

    audio.play().catch(() => {
      setIsPlayingAudio(false);
      setActiveAudioPrayer(null);
    });

    audio.onended = () => {
      setIsPlayingAudio(false);
      setActiveAudioPrayer(null);
    };
  };

  const getPrayerIcon = (id: PrayerId) => {
    switch (id) {
      case 'fajr': return CloudSun;
      case 'sunrise': return SunriseIcon;
      case 'dhuhr': return Sun;
      case 'asr': return Sun;
      case 'maghrib': return Sunset;
      case 'isha': return Moon;
      default: return Clock;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 rtl dir-rtl select-none" dir="rtl">
      {/* Top Header & Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <IconBox domain="quran" size="lg">
            <Clock className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </IconBox>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              {t.athan ? `${t.athan} و کاتەکانی نوێژ` : 'بانگدان و کاتەکانی نوێژ'}
              <Sparkles className="w-5 h-5 text-emerald-500 animate-pulse" />
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              ئاگادارکەرەوەی ڕاستەقینەی بانگدان بۆ شارەکانی هەرێمی کوردستان
            </p>
          </div>
        </div>

        {/* Location & Settings Action Buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          {/* GPS Quick Fetch Button */}
          <button
            onClick={handleRequestGps}
            disabled={isGpsLoading}
            title="دیاریکردنی شوێنی خۆکار بە GPS"
            className={`p-2.5 rounded-2xl ${cardGlassClass} border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 transition-all flex items-center gap-1.5 text-xs font-semibold shadow-sm active:scale-95`}
          >
            {isGpsLoading ? (
              <RotateCw className="w-4 h-4 animate-spin text-emerald-500" />
            ) : (
              <LocateFixed className="w-4 h-4 text-emerald-500" />
            )}
            <span className="hidden md:inline">
              {isGpsLoading ? 'گەڕان بۆ GPS...' : 'GPS-ی ڕاستەقینە'}
            </span>
          </button>

          {/* City Selector Button */}
          <div className="relative">
            <button
              onClick={() => setIsCitySelectorOpen(!isCitySelectorOpen)}
              className={`px-4 py-2.5 rounded-2xl ${cardGlassClass} border border-emerald-500/20 text-slate-700 dark:text-slate-200 hover:border-emerald-500/40 transition-all flex items-center gap-2 text-xs sm:text-sm font-bold shadow-sm`}
            >
              <MapPin className="w-4 h-4 text-emerald-500" />
              <span>{activeCity.nameKu}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isCitySelectorOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* City Dropdown Menu */}
            {isCitySelectorOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-2xl z-50 p-2 overflow-hidden animate-in fade-in zoom-in-95">
                <div className="text-[11px] font-bold text-slate-400 px-3 py-1.5 border-b border-slate-100 dark:border-slate-800">
                  شارەکەت هەڵبژێرە:
                </div>
                <div className="max-h-64 overflow-y-auto space-y-1 py-1">
                  {DEFAULT_CITIES.map(city => (
                    <button
                      key={city.id}
                      onClick={() => {
                        setCustomCoords(null);
                        setSelectedCityId(city.id);
                        setIsCitySelectorOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                        !customCoords && selectedCityId === city.id
                          ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                      }`}
                    >
                      <span>{city.nameKu} ({city.nameAr})</span>
                      {!customCoords && selectedCityId === city.id && <Check className="w-4 h-4 text-emerald-500" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Adhan Settings Trigger */}
          <button
            onClick={() => setIsSettingsModalOpen(true)}
            title="ڕێکخستنەکانی هەژمارکردنی بانگدان"
            className={`p-2.5 rounded-2xl ${cardGlassClass} border border-emerald-500/20 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-500/10 transition-all shadow-sm active:scale-95`}
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* GPS Error or Permission Request Notice */}
      {gpsError && (
        <div className="p-4 rounded-2xl mb-6 bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 flex items-center justify-between gap-3 text-xs sm:text-sm animate-in fade-in">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
            <span>{gpsError}</span>
          </div>
          <button
            onClick={() => setGpsError(null)}
            className="p-1 rounded-lg hover:bg-amber-500/20 text-amber-600 dark:text-amber-400"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Hero Card: Next Prayer & Real-Time Countdown */}
      <div className={`relative overflow-hidden p-6 sm:p-8 rounded-3xl ${cardGlassClass} border border-emerald-500/20 shadow-xl mb-8`}>
        {/* Background Decorative Ripples */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Active Location Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold mb-4 border border-emerald-500/20">
            <Navigation className="w-3.5 h-3.5" />
            <span>
              نوێژی داهاتوو ({activeCity.nameKu})
            </span>
          </div>

          {/* Next Prayer Title */}
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-slate-100 mb-2 flex items-center justify-center gap-2">
            <span>نوێژی {nextPrayerConfig.nameKu}</span>
            {isTomorrow && (
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 text-xs font-bold border border-amber-500/20">
                (سبەی)
              </span>
            )}
          </h2>

          <div className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-6">
            کاتی بانگدان: <span className="font-bold text-slate-700 dark:text-slate-200">{toLocalizedNumeral(formatTime12h(nextPrayerTime, appLanguage), appLanguage)}</span>
          </div>

          {/* Live Countdown Container */}
          <div className="w-full max-w-sm p-4 sm:p-6 rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800/50 shadow-inner mb-6">
            <div className="flex items-center justify-center gap-1 text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">
              <Clock className="w-3.5 h-3.5 text-emerald-500" />
              <span>کاتی ماوە بۆ بانگدان</span>
            </div>

            <div className="text-3xl sm:text-4xl font-black tracking-wider text-emerald-600 dark:text-emerald-400 font-mono dir-ltr" dir="ltr">
              {countdownFormatted}
            </div>

            <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-2">
              سەعات : خولەک : چرکه
            </div>
          </div>

          {/* Progress Bar for Current Interval */}
          <div className="w-full max-w-md">
            <div className="flex justify-between items-center text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 px-1">
              <span>تێپەڕیوە: {toLocalizedNumeral(`${intervalProgress}%`, appLanguage)}</span>
              <span>کاتی ئێستا: {toLocalizedNumeral(formatTime12h(now, appLanguage), appLanguage)}</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden p-0.5">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-1000 ease-linear shadow-sm"
                style={{ width: `${intervalProgress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Audio Playback Controls Banner (if active) */}
      {isPlayingAudio && (
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg flex items-center justify-between gap-4 animate-in fade-in">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white/20 animate-pulse">
              <Volume2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-xs font-medium text-emerald-100">پەخشکردنی دەنگی بانگدان</div>
              <div className="text-sm font-bold">بانگی مەککەی پیرۆز ({activeAudioPrayer})</div>
            </div>
          </div>

          <button
            onClick={() => handleToggleAudio('')}
            className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <VolumeX className="w-4 h-4" />
            <span>ڕاگرتن</span>
          </button>
        </div>
      )}

      {/* Today's 5 Prayers List */}
      <div className="space-y-3 mb-8">
        <div className="flex items-center justify-between mb-4 px-1">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            کاتەکانی فەرزەکان ({activeCity.nameKu})
          </h3>
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
            {calcMethod === 'kurdistan_awqaf' ? 'وەزارەتی ئەوقاف (فەرمی)' : CALCULATION_METHODS.find(m => m.key === calcMethod)?.labelKu.split('(')[0] || 'MWL'}
          </span>
        </div>

        {PRAYERS_CONFIG.map(pConfig => {
          const pDate = computedPrayerTimes[pConfig.id];
          const isNext = pConfig.id === nextPrayerConfig.id;
          const IconComp = getPrayerIcon(pConfig.id);
          const formattedTime = formatTime12h(pDate, appLanguage);

          return (
            <div
              key={pConfig.id}
              className={`p-4 rounded-2xl transition-all flex items-center justify-between gap-4 border ${
                isNext
                  ? 'bg-emerald-500/10 border-emerald-500/40 shadow-md ring-2 ring-emerald-500/20'
                  : `${cardGlassClass} border-slate-200/60 dark:border-slate-800/60 hover:border-emerald-500/20`
              }`}
            >
              {/* Prayer Name & Icon */}
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${
                  isNext 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}>
                  <IconComp className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-base font-bold ${
                      isNext ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-800 dark:text-slate-100'
                    }`}>
                      {pConfig.nameKu}
                    </span>
                    <span className="text-xs text-slate-400">({pConfig.nameAr})</span>
                    {isNext && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-bold">
                        نوێژی داهاتوو
                      </span>
                    )}
                  </div>
                  {!pConfig.isFard && (
                    <span className="text-[11px] text-amber-500 font-medium">کاتژمێری ڕۆژھەڵاتن</span>
                  )}
                </div>
              </div>

              {/* Time & Audio Play Button */}
              <div className="flex items-center gap-3">
                <span className={`text-lg font-extrabold dir-ltr ${
                  isNext ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-200'
                }`}>
                  {toLocalizedNumeral(formattedTime, appLanguage)}
                </span>

                {pConfig.isFard && (
                  <button
                    onClick={() => handleToggleAudio(pConfig.nameKu)}
                    title="گوێگرتن لە دەنگی بانگدان"
                    className={`p-2 rounded-xl transition-colors ${
                      isPlayingAudio && activeAudioPrayer === pConfig.nameKu
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 hover:text-emerald-500'
                    }`}
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Adhan Settings Modal */}
      {isSettingsModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl relative space-y-6">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-emerald-500" />
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                  ڕێکخستنەکانی کاتەکانی بانگدان
                </h3>
              </div>
              <button
                onClick={() => setIsSettingsModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Calculation Method Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block">
                مێتۆدی هەژمارکردن (Calculation Method):
              </label>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {CALCULATION_METHODS.map(method => (
                  <button
                    key={method.key}
                    onClick={() => setCalcMethod(method.key)}
                    className={`w-full flex items-center justify-between p-3 rounded-2xl border text-xs font-bold transition-all text-right ${
                      calcMethod === method.key
                        ? 'bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400'
                        : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    <span>{method.labelKu}</span>
                    {calcMethod === method.key && <Check className="w-4 h-4 text-emerald-500 shrink-0" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Madhab Selection (Asr Calculation) */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block">
                مەزهەبی هەژمارکردنی کاتی عەسر (Asr Calculation):
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setMadhab('shafi')}
                  className={`p-3 rounded-2xl border text-xs font-bold text-center transition-all ${
                    madhab === 'shafi'
                      ? 'bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400'
                      : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  شافعی / باو (Standard)
                </button>
                <button
                  onClick={() => setMadhab('hanafi')}
                  className={`p-3 rounded-2xl border text-xs font-bold text-center transition-all ${
                    madhab === 'hanafi'
                      ? 'bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400'
                      : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  حەنەفی (Hanafi)
                </button>
              </div>
            </div>

            {/* Minute Offsets Fine-Tuning */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block">
                دەستکاریکردنی خولەکەکان (Minute Fine-Tuning):
              </label>
              <div className="grid grid-cols-2 gap-2">
                {PRAYERS_CONFIG.map(p => (
                  <div key={p.id} className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{p.nameKu}</span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setOffsets(prev => ({ ...prev, [p.id]: (prev[p.id] || 0) - 1 }))}
                        className="w-6 h-6 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center font-bold text-xs"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold w-6 text-center text-slate-800 dark:text-slate-100">
                        {offsets[p.id] || 0}m
                      </span>
                      <button
                        onClick={() => setOffsets(prev => ({ ...prev, [p.id]: (prev[p.id] || 0) + 1 }))}
                        className="w-6 h-6 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center font-bold text-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Done / Save Button */}
            <button
              onClick={() => setIsSettingsModalOpen(false)}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm font-bold shadow-lg hover:shadow-emerald-500/20 transition-all"
            >
              پاشەکەوتکردن و داخستن
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
