'use client';

import React, { useState } from 'react';
import {
  ListFilter,
  Search,
  Settings,
  BookOpen,
  Sun,
  Moon,
  Sparkles,
  Palette,
  ChevronLeft,
  Check,
} from 'lucide-react';
import { SurahMeta } from '@/data/quranData';
import { Language, TRANSLATIONS, toLocalizedNumeral } from '@/data/translations';
import { ThemeMode, getThemeConfig } from '@/lib/themeUtils';

interface NavbarTopProps {
  currentSurah: SurahMeta;
  currentPage: number;
  currentJuz: number;
  activeView: 'reader' | 'contents' | 'settings' | 'khatmah' | 'bookmarks' | 'highlights';
  setActiveView: (view: 'reader' | 'contents' | 'settings' | 'khatmah' | 'bookmarks' | 'highlights') => void;
  openSearch: () => void;
  openPageJump: () => void;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
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
  const themeConfig = getThemeConfig(themeMode);
  const [showThemePopover, setShowThemePopover] = useState(false);

  const cycleTheme = () => {
    const modes: ThemeMode[] = ['white', 'dark', 'cyan', 'green', 'yellow'];
    const currentIndex = modes.indexOf(themeMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setThemeMode(modes[nextIndex]);
  };

  const cycleAppLanguage = () => {
    if (appLanguage === 'ku') setAppLanguage('ar');
    else if (appLanguage === 'ar') setAppLanguage('en');
    else setAppLanguage('ku');
  };

  const themesList: { id: ThemeMode; label: string; bgBadge: string; icon: React.ReactNode }[] = [
    { id: 'white', label: t.themeWhite, bgBadge: 'bg-white text-emerald-800 border-emerald-300', icon: <Sun className="w-4 h-4 text-emerald-600" /> },
    { id: 'dark', label: t.themeDark, bgBadge: 'bg-slate-900 text-white border-slate-700', icon: <Moon className="w-4 h-4 text-indigo-400" /> },
    { id: 'cyan', label: t.themeCyan, bgBadge: 'bg-sky-200 text-cyan-950 border-sky-300', icon: <Sparkles className="w-4 h-4 text-sky-600" /> },
    { id: 'green', label: t.themeGreen, bgBadge: 'bg-emerald-200 text-emerald-950 border-emerald-300', icon: <Palette className="w-4 h-4 text-emerald-700" /> },
    { id: 'yellow', label: t.themeYellow, bgBadge: 'bg-amber-200 text-amber-950 border-amber-300', icon: <Sun className="w-4 h-4 text-amber-600" /> },
  ];

  return (
    <header className="sticky top-0 z-40 w-full px-3 pt-3 pb-2 transition-all duration-300">
      <div className={`mx-auto max-w-4xl rounded-[22px] px-4 py-2.5 flex items-center justify-between transition-all duration-300 ${themeConfig.navGlass}`}>
        
        {/* Left Section: Back / View Navigation */}
        <div className="flex items-center gap-2">
          {activeView !== 'reader' && (
            <button
              onClick={() => setActiveView('reader')}
              className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-all opacity-85 hover:opacity-100"
              title={t.backToReader}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          <button
            onClick={() => setActiveView('contents')}
            className={`p-2 rounded-full transition-all ${
              activeView === 'contents'
                ? themeConfig.activeTabBg
                : 'hover:bg-black/5 dark:hover:bg-white/10'
            }`}
            title={t.contents}
          >
            <ListFilter className="w-5 h-5" />
          </button>

          <button
            onClick={openSearch}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-all"
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
            <span className={`font-bold text-base uthmani-text ${themeConfig.textAccent}`}>
              {currentSurah.name}
            </span>
          </div>
          <span className="text-[11px] font-medium opacity-75 tracking-wide uppercase">
            {t.part} {toLocalizedNumeral(currentJuz, appLanguage)}
          </span>
        </div>

        {/* Right Controls: Page Badge (Vertical Oval), Language Switcher, Theme & Settings */}
        <div className="flex items-center gap-2 relative">
          {/* Page Badge Button (Vertical Oval) */}
          <button
            onClick={openPageJump}
            className={`px-3 py-1 rounded-[18px] ${themeConfig.activeTabBg} font-bold text-xs flex items-center gap-1 transition-all shadow-xs`}
            title={`${t.pageBadge} ${toLocalizedNumeral(currentPage, appLanguage)}`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{toLocalizedNumeral(currentPage, appLanguage)}</span>
          </button>

          {/* Dynamic Language Toggle Button (Vertical Oval: w-7 h-9) */}
          <button
            onClick={cycleAppLanguage}
            className={`w-7 h-9 rounded-[50%] ${themeConfig.activeTabBg} font-bold flex items-center justify-center transition-all shadow-xs active:scale-95 cursor-pointer`}
            title={`Language: ${appLanguage.toUpperCase()} - Click to switch`}
          >
            {appLanguage === 'ar' && <span className="text-xs font-extrabold font-serif">ع</span>}
            {appLanguage === 'ku' && <span className="text-xs font-extrabold font-serif">ك</span>}
            {appLanguage === 'en' && <span className="text-[10px] font-extrabold font-sans">E</span>}
          </button>

          {/* Theme Switcher Button with Popover */}
          <div className="relative">
            <button
              onClick={() => setShowThemePopover(!showThemePopover)}
              className={`w-7 h-9 rounded-[50%] ${themeConfig.activeTabBg} flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95`}
              title={`${t.theme} - Choose Theme`}
            >
              {themeMode === 'white' && <Sun className="w-4 h-4 text-emerald-700" />}
              {themeMode === 'dark' && <Moon className="w-4 h-4 text-indigo-400" />}
              {themeMode === 'cyan' && <Sparkles className="w-4 h-4 text-sky-600" />}
              {themeMode === 'green' && <Palette className="w-4 h-4 text-emerald-700" />}
              {themeMode === 'yellow' && <Sun className="w-4 h-4 text-amber-600" />}
            </button>

            {/* Popover Dropdown */}
            {showThemePopover && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowThemePopover(false)}
                />
                <div className={`absolute top-11 ltr:right-0 rtl:left-0 z-50 w-56 rounded-[20px] p-2 ${themeConfig.modalGlass} shadow-2xl border flex flex-col gap-1.5 animate-in fade-in zoom-in-95 duration-150`}>
                  <div className="px-3 py-1 text-xs font-bold opacity-75 border-b border-black/10 dark:border-white/10 mb-1 flex items-center justify-between">
                    <span>{t.appearance}</span>
                    <span className="text-[10px] opacity-60">5 Themes</span>
                  </div>
                  {themesList.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setThemeMode(item.id);
                        setShowThemePopover(false);
                      }}
                      className={`w-full text-left rtl:text-right px-2.5 py-2 rounded-[14px] text-xs font-bold flex items-center justify-between transition-all ${
                        themeMode === item.id
                          ? themeConfig.activeTabBg
                          : 'hover:bg-black/5 dark:hover:bg-white/10 opacity-90'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className={`w-6 h-7 rounded-[50%] flex items-center justify-center ${item.bgBadge}`}>
                          {item.icon}
                        </span>
                        <span className="truncate">{item.label}</span>
                      </div>
                      {themeMode === item.id && <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Settings Icon */}
          <button
            onClick={() => setActiveView('settings')}
            className={`p-2 rounded-full transition-all ${
              activeView === 'settings'
                ? themeConfig.activeTabBg
                : 'hover:bg-black/5 dark:hover:bg-white/10'
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
