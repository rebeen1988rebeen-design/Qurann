'use client';

import React from 'react';
import {
  ListFilter,
  Search,
  Settings,
  BookOpen,
  Languages,
  Sun,
  Moon,
  Sparkles,
  ChevronLeft,
} from 'lucide-react';
import { SurahMeta } from '@/data/quranData';

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
  translationMode,
  setTranslationMode,
}) => {
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

  const cycleTranslation = () => {
    if (translationMode === 'both') setTranslationMode('kurdish');
    else if (translationMode === 'kurdish') setTranslationMode('arabic');
    else setTranslationMode('both');
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
              title="Back to Quran Reader"
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
            title="Contents / Surah Index"
          >
            <ListFilter className="w-5 h-5" />
          </button>

          <button
            onClick={openSearch}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 transition-all"
            title="Search Quran"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>

        {/* Center Title / Surah Name & Part */}
        <div className="flex flex-col items-center cursor-pointer select-none" onClick={() => setActiveView('reader')}>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-base sm:text-lg tracking-tight font-sans">
              {currentSurah.englishName}
            </span>
            <span className="font-bold text-base text-emerald-700 dark:text-emerald-400 uthmani-text">
              {currentSurah.name}
            </span>
          </div>
          <span className="text-[11px] font-medium opacity-65 tracking-wide uppercase">
            Part {currentJuz}
          </span>
        </div>

        {/* Right Controls: Page Badge & Settings */}
        <div className="flex items-center gap-2">
          {/* Page Badge Button (e.g. green glass pill like screenshot 2) */}
          <button
            onClick={openPageJump}
            className="px-2.5 py-1 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-700 dark:text-emerald-400 font-bold text-xs border border-emerald-500/30 flex items-center gap-1 transition-all shadow-xs"
            title="Current Page - Tap to Jump"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{currentPage}</span>
          </button>

          {/* Translation Mode Switcher */}
          <button
            onClick={cycleTranslation}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 transition-all flex items-center gap-1 text-xs font-semibold"
            title={`Translation Mode: ${translationMode.toUpperCase()}`}
          >
            <Languages className="w-4 h-4" />
            <span className="hidden sm:inline uppercase text-[10px] opacity-80">{translationMode}</span>
          </button>

          {/* Theme Quick Toggle */}
          <button
            onClick={cycleTheme}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 transition-all"
            title="Toggle Liquid Glass Theme"
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
            title="App Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>

      </div>
    </header>
  );
};
