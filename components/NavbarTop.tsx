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
  Globe,
} from 'lucide-react';
import { SurahMeta } from '@/data/quranData';
import { Language, TRANSLATIONS, toLocalizedNumeral } from '@/data/translations';
import { ThemeMode, getThemeConfig } from '@/lib/themeUtils';

interface NavbarTopProps {
  currentSurah: SurahMeta;
  currentPage: number;
  currentJuz: number;
  activeView: 'reader' | 'contents' | 'settings' | 'khatmah' | 'bookmarks' | 'highlights' | 'search';
  setActiveView: (view: 'reader' | 'contents' | 'settings' | 'khatmah' | 'bookmarks' | 'highlights' | 'search') => void;
  openSearch: () => void;
  openPageJump: () => void;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  translationMode: 'arabic' | 'kurdish' | 'both';
  setTranslationMode: (mode: 'arabic' | 'kurdish' | 'both') => void;
  arabicFontSize: number;
  kurdishFontSize: number;
  onZoomInFont: () => void;
  onZoomOutFont: () => void;
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
  translationMode,
  setTranslationMode,
  arabicFontSize,
  kurdishFontSize,
  onZoomInFont,
  onZoomOutFont,
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
    <header className="fixed top-0 left-0 right-0 z-40 w-full px-3 pt-3 pb-2 transition-all duration-300">
      <div className={`mx-auto max-w-4xl px-4 py-2.5 flex items-center justify-center gap-2 transition-all duration-300 ${themeConfig.navGlass}`}>
        
        {/* Right Controls: Page Badge, Language Switcher, Theme & Settings */}
        <div className="flex items-center gap-1.5 relative overflow-x-auto no-scrollbar justify-center">
          {/* Page Badge Button (Rounded Rectangle Box) */}
          <button
            onClick={openPageJump}
            className={`px-3 py-1 h-9 rounded-full ${themeConfig.activeTabBg} font-extrabold text-xs flex items-center gap-1.5 transition-all shadow-xs border border-transparent cursor-pointer active:scale-95 shrink-0`}
            title={`${t.pageBadge} ${toLocalizedNumeral(currentPage, appLanguage)}`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{toLocalizedNumeral(currentPage, appLanguage)}</span>
          </button>

          {/* Arabic Translation Mode Button */}
          <button
            onClick={() => setTranslationMode('arabic')}
            className={`px-3 h-9 rounded-full font-bold text-xs flex items-center justify-center transition-all shadow-xs active:scale-95 cursor-pointer border shrink-0 ${
              translationMode === 'arabic' || translationMode === 'both'
                ? themeConfig.activeTabBg
                : 'bg-white/50 dark:bg-slate-800/50 border-black/5 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/10 opacity-90'
            }`}
            title="عەرەبی (Arabic Only)"
          >
            عەرەبی
          </button>

          {/* Kurdish Translation Mode Button */}
          <button
            onClick={() => setTranslationMode('kurdish')}
            className={`px-3 h-9 rounded-full font-bold text-xs flex items-center justify-center transition-all shadow-xs active:scale-95 cursor-pointer border shrink-0 ${
              translationMode === 'kurdish'
                ? themeConfig.activeTabBg
                : 'bg-white/50 dark:bg-slate-800/50 border-black/5 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/10 opacity-90'
            }`}
            title="کوردی (Kurdish Translation)"
          >
            کوردی
          </button>

          {/* Font Zoom Control Box */}
          <div className={`h-9 px-2 rounded-full ${themeConfig.activeTabBg} border border-transparent flex items-center gap-1 shadow-xs shrink-0`}>
            <button
              onClick={onZoomOutFont}
              className="w-7 h-7 rounded-full bg-white/50 dark:bg-slate-700/50 hover:bg-black/10 dark:hover:bg-white/20 flex items-center justify-center font-bold text-xs transition-all active:scale-95 cursor-pointer text-slate-900 dark:text-white"
              title="Zoom Out Font"
            >
              -
            </button>
            <span className="text-[10px] font-bold select-none px-0.5 text-slate-900 dark:text-white" title={`Arabic: ${arabicFontSize}px | Kurdish: ${kurdishFontSize}px`}>
              {toLocalizedNumeral(arabicFontSize, appLanguage)}
            </span>
            <button
              onClick={onZoomInFont}
              className="w-7 h-7 rounded-full bg-white/50 dark:bg-slate-700/50 hover:bg-black/10 dark:hover:bg-white/20 flex items-center justify-center font-bold text-xs transition-all active:scale-95 cursor-pointer text-slate-900 dark:text-white"
              title="Zoom In Font"
            >
              +
            </button>
          </div>

          {/* Dynamic Language Toggle Button (Rounded Rectangular Box: w-9 h-9) */}
          <button
            onClick={cycleAppLanguage}
            className={`w-9 h-9 rounded-full ${themeConfig.activeTabBg} font-bold flex items-center justify-center transition-all shadow-xs active:scale-95 cursor-pointer border border-transparent shrink-0`}
            title={`Language: ${appLanguage.toUpperCase()} - Click to switch`}
          >
            <Globe className="w-4 h-4" />
          </button>

          {/* Direct Single-Click Theme Switcher Button (Rounded Rectangular Box: w-9 h-9) */}
          <div className="relative shrink-0">
            <button
              onClick={cycleTheme}
              onContextMenu={(e) => {
                e.preventDefault();
                setShowThemePopover(!showThemePopover);
              }}
              className={`w-9 h-9 rounded-full ${themeConfig.activeTabBg} flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95 border border-transparent`}
              title={`${t.theme} - Click to switch automatically`}
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
        </div>

      </div>
    </header>
  );
};
