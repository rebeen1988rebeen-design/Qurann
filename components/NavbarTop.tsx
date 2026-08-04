'use client';

import React from 'react';
import {
  ListFilter,
  Search,
  Settings,
  BookOpen,
  Sun,
  Moon,
  Sparkles,
  ChevronLeft,
} from 'lucide-react';
import { SurahMeta } from '@/data/quranData';
import { Language, TRANSLATIONS, toLocalizedNumeral } from '@/data/translations';

interface NavbarTopProps {
  currentSurah: SurahMeta;
  currentPage: number;
  currentJuz: number;
  activeView: 'reader' | 'contents' | 'settings' | 'khatmah' | 'bookmarks' | 'highlights';
  setActiveView: (view: 'reader' | 'contents' | 'settings' | 'khatmah' | 'bookmarks' | 'highlights') => void;
  openSearch: () => void;
  openPageJump: () => void;
  themeMode: 'light' | 'dark' | 'ice';
  setThemeMode: (mode: 'light' | 'dark' | 'ice') => void;
  translationMode: 'arabic' | 'kurdish' | 'both';
  setTranslationMode: (mode: 'arabic' | 'kurdish' | 'both') => void;
  appLanguage: Language;
  setAppLanguage: (lang: Language) => void;
}

export const NavbarTop: React.FC<NavbarTopProps> = ({
  currentSurah,
  currentPage,
  currentJuz,
  activeView,
  setActiveView,
  openSearch,
  openPageJump,
  themeMode,
  setThemeMode,
  appLanguage,
  setAppLanguage,
}) => {
  const t = TRANSLATIONS[appLanguage];

  const getGlassClass = () => {
    if (themeMode === 'dark') return 'liquid-glass-dark text-slate-100';
    if (themeMode === 'ice') return 'liquid-glass-ice text-slate-900';
    return 'liquid-glass-light text-slate-900';
  };

  const cycleTheme = () => {
    if (themeMode === 'light') setThemeMode('dark');
    else if (themeMode === 'dark') setThemeMode('ice');
    else setThemeMode('light');
  };

  const cycleAppLanguage = () => {
    if (appLanguage === 'ku') setAppLanguage('ar');
    else if (appLanguage === 'ar') setAppLanguage('en');
    else setAppLanguage('ku');
  };

  return (
    <header className="sticky top-0 z-40 w-full px-3 pt-3 pb-2 transition-all duration-300">
      <div className={`mx-auto max-w-4xl rounded-[22px] px-4 py-2.5 flex items-center justify-between transition-all duration-300 ${getGlassClass()}`}>
        
        {/* Left Section: Back / View Navigation */}
        <div className="flex items-center gap-2">
          {activeView !== 'reader' && (
            <button
              onClick={() => setActiveView('reader')}
              className="p-1.5 rounded-full hover:bg-white/20 dark:hover:bg-slate-800/40 transition-all text-slate-700 dark:text-slate-200"
              title={t.backToReader}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          <button
            onClick={() => setActiveView('contents')}
            className={`p-2 rounded-full transition-all ${
              activeView === 'contents'
                ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                : 'hover:bg-black/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300'
            }`}
            title={t.contents}
          >
            <ListFilter className="w-5 h-5" />
          </button>

          <button
            onClick={openSearch}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 transition-all"
            title={t.search}
          >
            <Search className="w-5 h-5" />
          </button>
        </div>

        {/* Center Title / Surah Name & Part */}
        <div className="flex flex-col items-center cursor-pointer select-none" onClick={() => setActiveView('reader')}>
          <div className="flex items-center gap-2">
            {appLanguage === 'en' ? (
              <span className="font-semibold text-base sm:text-lg tracking-tight font-sans">
                {currentSurah.englishName}
              </span>
            ) : appLanguage === 'ku' ? (
              <span className="font-semibold text-base sm:text-lg tracking-tight kurdish-text">
                {currentSurah.kurdishName}
              </span>
            ) : null}
            <span className="font-bold text-base text-emerald-700 dark:text-emerald-400 uthmani-text">
              {currentSurah.name}
            </span>
          </div>
          <span className="text-[11px] font-medium opacity-65 tracking-wide uppercase">
            {t.part} {toLocalizedNumeral(currentJuz, appLanguage)}
          </span>
        </div>

        {/* Right Controls: Page Badge, Language Switcher, Theme & Settings */}
        <div className="flex items-center gap-2">
          {/* Page Badge Button */}
          <button
            onClick={openPageJump}
            className="px-2.5 py-1 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-700 dark:text-emerald-400 font-bold text-xs border border-emerald-500/30 flex items-center gap-1 transition-all shadow-xs"
            title={`${t.pageBadge} ${toLocalizedNumeral(currentPage, appLanguage)}`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{toLocalizedNumeral(currentPage, appLanguage)}</span>
          </button>

          {/* Dynamic Language Toggle Button (ع / ك / E) */}
          <button
            onClick={cycleAppLanguage}
            className="w-8 h-8 rounded-full bg-emerald-500/20 hover:bg-emerald-500/35 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300 font-bold flex items-center justify-center transition-all shadow-xs active:scale-95 cursor-pointer"
            title={`Language: ${appLanguage.toUpperCase()} - Click to switch`}
          >
            {appLanguage === 'ar' && <span className="text-sm font-extrabold font-serif">ع</span>}
            {appLanguage === 'ku' && <span className="text-sm font-extrabold font-serif">ك</span>}
            {appLanguage === 'en' && <span className="text-xs font-extrabold font-sans">E</span>}
          </button>

          {/* Theme Quick Toggle */}
          <button
            onClick={cycleTheme}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 transition-all"
            title={t.theme}
          >
            {themeMode === 'light' && <Sun className="w-4 h-4 text-amber-500" />}
            {themeMode === 'dark' && <Moon className="w-4 h-4 text-indigo-400" />}
            {themeMode === 'ice' && <Sparkles className="w-4 h-4 text-sky-400" />}
          </button>

          {/* Settings Icon */}
          <button
            onClick={() => setActiveView('settings')}
            className={`p-2 rounded-full transition-all ${
              activeView === 'settings'
                ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                : 'hover:bg-black/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300'
            }`}
            title={t.settings}
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>

      </div>
    </header>
  );
};
