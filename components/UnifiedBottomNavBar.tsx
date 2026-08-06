'use client';

import React from 'react';
import { motion } from 'motion/react';
import { triggerHaptic } from '@/lib/haptics';
import {
  ListFilter,
  Search,
  BookOpen,
  Bookmark,
  Pencil,
  Globe,
  Palette,
  Settings,
  Play,
  TowerControl,
  Plus,
  Minus,
  LayoutGrid,
  Info,
  Sparkles,
  Compass,
  BookText,
  Scroll,
} from 'lucide-react';
import { Language, TRANSLATIONS, toLocalizedNumeral } from '@/data/translations';
import { ThemeMode, getThemeConfig } from '@/lib/themeUtils';
import { SurahMeta } from '@/data/quranData';

interface UnifiedBottomNavBarProps {
  activeView: 'reader' | 'contents' | 'settings' | 'khatmah' | 'bookmarks' | 'highlights' | 'search' | 'about' | 'dailyAzkar' | 'athan' | 'recitation' | 'qibla' | 'hadith';
  setActiveView: (view: 'reader' | 'contents' | 'settings' | 'khatmah' | 'bookmarks' | 'highlights' | 'search' | 'about' | 'dailyAzkar' | 'athan' | 'recitation' | 'qibla' | 'hadith') => void;
  openPageJump: () => void;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  translationMode: 'arabic' | 'kurdish';
  setTranslationMode: (mode: 'arabic' | 'kurdish') => void;
  onZoomInFont: () => void;
  onZoomOutFont: () => void;
  appLanguage: Language;
  setAppLanguage: (lang: Language) => void;
  showBars: boolean;
  setShowBars: (show: boolean) => void;
  currentJuz: number;
  currentPage: number;
  currentSurah: SurahMeta;
}

export const UnifiedBottomNavBar: React.FC<UnifiedBottomNavBarProps> = ({
  activeView,
  setActiveView,
  openPageJump,
  themeMode,
  setThemeMode,
  translationMode,
  setTranslationMode,
  onZoomInFont,
  onZoomOutFont,
  appLanguage,
  setAppLanguage,
  showBars,
  setShowBars,
  currentJuz,
  currentPage,
  currentSurah,
}) => {
  const t = TRANSLATIONS[appLanguage];
  const themeConfig = getThemeConfig(themeMode);

  const hideBarsDirectly = () => {
    triggerHaptic(10);
    setShowBars(false);
  };

  const cycleTheme = () => {
    triggerHaptic(15);
    const modes: ThemeMode[] = ['white', 'dark', 'cyan', 'green', 'yellow'];
    const currentIndex = modes.indexOf(themeMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setThemeMode(modes[nextIndex]);
  };

  const cycleAppLanguage = () => {
    triggerHaptic(15);
    if (appLanguage === 'ku') setAppLanguage('ar');
    else if (appLanguage === 'ar') setAppLanguage('en');
    else setAppLanguage('ku');
  };

  const getSurahPageLabel = () => {
    let surahName = appLanguage === 'en' ? currentSurah.englishName : appLanguage === 'ku' ? currentSurah.kurdishName : currentSurah.name;
    if (appLanguage === 'ku') {
      surahName = surahName.replace(/^سورەتی\s*/, '');
    }
    const pageNum = toLocalizedNumeral(currentPage, appLanguage);
    return `${surahName} ${pageNum}`;
  };

  const capsuleClass = `
    flex flex-row items-center justify-center gap-3 px-3.5 py-3 rounded-full transition-all cursor-pointer outline-none
    bg-white/20 dark:bg-black/30 backdrop-blur-md backdrop-saturate-150
    border border-white/40 dark:border-white/20
    shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.7),_0_4px_14px_rgba(0,0,0,0.12)]
    hover:bg-white/35 dark:hover:bg-black/45
  `;

  return (
    <>
      {/* Invisible Top Drag Area */}
      {!showBars && (
        <motion.div
          drag="y"
          dragConstraints={{ top: 0, bottom: 100 }}
          onDragEnd={(event, info) => {
            if (info.offset.y > 60 || info.velocity.y > 300) {
              setShowBars(true);
              triggerHaptic(10);
            }
          }}
          className="fixed top-0 left-0 right-0 h-16 z-40 touch-none flex justify-center items-start pt-2"
        >
          <div className="w-12 h-1.5 bg-white/20 rounded-full" />
        </motion.div>
      )}

      {/* Main Menu */}
      <motion.div
        drag="y"
        dragConstraints={{ top: -300, bottom: 0 }}
        dragElastic={0.2}
        onDragEnd={(event, info) => {
          if (info.offset.y < -60 || info.velocity.y < -300) {
            hideBarsDirectly();
          }
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`fixed bottom-0 left-0 right-0 z-50 flex flex-col items-center pointer-events-none transition-all duration-500 px-3 pb-6 ${showBars ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <div className={`mx-auto w-[98%] max-w-[1024px] pointer-events-auto py-2 px-4 sm:px-6 ${themeConfig.navGlass} rounded-[28px] max-h-[85vh] overflow-y-auto shadow-2xl border border-white/40 dark:border-white/20 flex flex-col items-center`}>
          {/* Apple-style Drag Handle */}
          <div className="w-12 h-1.5 bg-white/40 rounded-full my-3" />
          
          <div className="grid grid-cols-2 gap-3 w-full">
            
            {/* Row 1: Contents & Search */}
            <button
              onClick={() => { setActiveView('contents'); hideBarsDirectly(); }}
              className={capsuleClass}
            >
              <ListFilter className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate">{t.contents}</span>
            </button>

            <button
              onClick={() => { setActiveView('search'); hideBarsDirectly(); }}
              className={capsuleClass}
            >
              <Search className="w-6 h-6 text-cyan-600 dark:text-cyan-400 shrink-0" />
              <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate">{t.search}</span>
            </button>

            {/* Row 2: Bookmarks & Highlights */}
            <button
              onClick={() => { setActiveView('bookmarks'); hideBarsDirectly(); }}
              className={capsuleClass}
            >
              <Bookmark className="w-6 h-6 text-rose-600 dark:text-rose-400 shrink-0" />
              <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate">{t.bookmarks}</span>
            </button>

            <button
              onClick={() => { setActiveView('highlights'); hideBarsDirectly(); }}
              className={capsuleClass}
            >
              <Pencil className="w-6 h-6 text-rose-600 dark:text-rose-400 shrink-0" />
              <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate">{t.highlights}</span>
            </button>

            {/* Row 3: Quran Reader & Hadith */}
            <button
              onClick={() => { setActiveView('reader'); hideBarsDirectly(); }}
              className={capsuleClass}
            >
              <BookOpen className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate">{t.quran}</span>
            </button>

            <button
              onClick={() => { setActiveView('hadith'); hideBarsDirectly(); }}
              className={capsuleClass}
            >
              <Scroll className="w-6 h-6 text-amber-600 dark:text-amber-400 shrink-0" />
              <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate">{t.hadith}</span>
            </button>

            {/* Row 4: Athan & Daily Azkar */}
            <button
              onClick={() => { setActiveView('athan'); hideBarsDirectly(); }}
              className={capsuleClass}
            >
              <TowerControl className="w-6 h-6 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate">{t.athan}</span>
            </button>

            <button
              onClick={() => { setActiveView('dailyAzkar'); hideBarsDirectly(); }}
              className={capsuleClass}
            >
              <Sparkles className="w-6 h-6 text-violet-600 dark:text-violet-400 shrink-0" />
              <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate">{t.dailyAzkar}</span>
            </button>

            {/* Row 5: Recitation & Page Jump */}
            <button
              onClick={() => { setActiveView('recitation'); hideBarsDirectly(); }}
              className={capsuleClass}
            >
              <Play className="w-6 h-6 text-teal-600 dark:text-teal-400 shrink-0" />
              <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate">{t.recitation}</span>
            </button>

            <button
              onClick={() => { openPageJump(); triggerHaptic(10); }}
              className={capsuleClass}
            >
              <LayoutGrid className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate">{getSurahPageLabel()}</span>
            </button>

            {/* Row 6: Arabic Translation & Kurdish Translation */}
            <button
              onClick={() => { setTranslationMode('arabic'); triggerHaptic(10); }}
              className={capsuleClass}
            >
              <BookText className="w-6 h-6 text-sky-600 dark:text-sky-400 shrink-0" />
              <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate">{t.arabicOnly}</span>
            </button>

            <button
              onClick={() => { setTranslationMode('kurdish'); triggerHaptic(10); }}
              className={capsuleClass}
            >
              <BookText className="w-6 h-6 text-sky-600 dark:text-sky-400 shrink-0" />
              <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate">{t.kurdishOnly}</span>
            </button>

            {/* Row 7: Qibla & Themes */}
            <button
              onClick={() => { setActiveView('qibla'); hideBarsDirectly(); }}
              className={capsuleClass}
            >
              <Compass className="w-6 h-6 text-amber-600 dark:text-amber-400 shrink-0" />
              <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate">{t.qibla}</span>
            </button>

            <button
              onClick={cycleTheme}
              className={capsuleClass}
            >
              <Palette className="w-6 h-6 text-amber-600 dark:text-amber-400 shrink-0" />
              <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate">{t.themes}</span>
            </button>

            {/* Row 8: Settings & Font Size */}
            <button
              onClick={() => { setActiveView('settings'); hideBarsDirectly(); }}
              className={capsuleClass}
            >
              <Settings className="w-6 h-6 text-slate-700 dark:text-slate-300 shrink-0" />
              <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate">{t.settings}</span>
            </button>

            <div className={`${capsuleClass} !px-2 !py-2 overflow-hidden flex items-center justify-between`}>
              <button
                onClick={() => { onZoomInFont(); triggerHaptic(5); }}
                className="py-1.5 px-2 flex items-center justify-center hover:bg-white/30 dark:hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                title={t.increase}
              >
                <Plus className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </button>

              <div className="px-1 py-1 flex items-center justify-center">
                <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate">{t.font}</span>
              </div>

              <button
                onClick={() => { onZoomOutFont(); triggerHaptic(5); }}
                className="py-1.5 px-2 flex items-center justify-center hover:bg-white/30 dark:hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                title={t.decrease}
              >
                <Minus className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </button>
            </div>

            {/* Row 9: Language & About */}
            <button
              onClick={cycleAppLanguage}
              className={capsuleClass}
            >
              <Globe className="w-6 h-6 text-sky-600 dark:text-sky-400 shrink-0" />
              <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate">{t.language}</span>
            </button>

            <button
              onClick={() => { setActiveView('about'); hideBarsDirectly(); }}
              className={capsuleClass}
            >
              <Info className="w-6 h-6 text-blue-600 dark:text-blue-400 shrink-0" />
              <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate">{t.about}</span>
            </button>

          </div>
        </div>
      </motion.div>
    </>
  );
};

export default UnifiedBottomNavBar;
