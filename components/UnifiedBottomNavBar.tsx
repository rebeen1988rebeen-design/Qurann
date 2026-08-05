'use client';

import React from 'react';
import {
  ListFilter,
  Search,
  BookOpen,
  Bookmark,
  Pencil,
  Globe,
  Palette,
  Settings,
  Plus,
  Minus,
  LayoutGrid,
} from 'lucide-react';
import { Language, TRANSLATIONS, toLocalizedNumeral } from '@/data/translations';
import { ThemeMode, getThemeConfig } from '@/lib/themeUtils';

interface UnifiedBottomNavBarProps {
  activeView: 'reader' | 'contents' | 'settings' | 'khatmah' | 'bookmarks' | 'highlights' | 'search';
  setActiveView: (view: 'reader' | 'contents' | 'settings' | 'khatmah' | 'bookmarks' | 'highlights' | 'search') => void;
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
  currentJuz: number;
  currentPage: number;
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
  currentJuz,
  currentPage,
}) => {
  const t = TRANSLATIONS[appLanguage];
  const themeConfig = getThemeConfig(themeMode);

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

  const activeTabClass = themeMode === 'dark'
    ? 'text-white font-extrabold'
    : themeMode === 'cyan'
    ? 'text-sky-800 font-extrabold'
    : themeMode === 'yellow'
    ? 'text-amber-800 font-extrabold'
    : 'text-emerald-800 font-extrabold';

  const inactiveTabClass = themeMode === 'dark'
    ? 'text-white/60 hover:text-white'
    : 'text-slate-500 hover:text-slate-900';

  const navItemClass = "flex flex-col items-center justify-center gap-1 min-w-[64px] transition-all cursor-pointer outline-none";
  const navLabelClass = "text-[10px] font-bold whitespace-nowrap";

  const getJuzPageLabel = () => {
    const juzNum = toLocalizedNumeral(currentJuz, appLanguage);
    const pageNum = toLocalizedNumeral(currentPage, appLanguage);
    
    if (appLanguage === 'ku') {
      return `لاپەڕە ${pageNum} • بەشی ${juzNum}`;
    }
    if (appLanguage === 'ar') {
      return `الصفحة ${pageNum} • الجزء ${juzNum}`;
    }
    return `Page ${pageNum} • Juz ${juzNum}`;
  };

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 flex flex-col items-center pointer-events-none transition-all duration-500 px-2 pb-8 ${showBars ? 'translate-y-0' : 'translate-y-full'}`}>
      <div className={`mx-auto w-[98%] max-w-[750px] pointer-events-auto py-7 px-4 shadow-2xl rounded-2xl border-0 ${themeConfig.navGlass}`}>
        <div className="flex flex-col gap-y-7">
          
          {/* Row 1: Contents, Search, Bookmarks, Highlights */}
          <div className="grid grid-cols-4 gap-x-1">
            <button 
              onClick={() => setActiveView('contents')}
              className={`${navItemClass} ${activeView === 'contents' ? activeTabClass : inactiveTabClass}`}
            >
              <ListFilter className="w-7 h-7 sm:w-8 sm:h-8" />
              <span className="text-[11.5px] sm:text-[12.5px] font-bold mt-1.5 whitespace-nowrap">{t.contents}</span>
            </button>
            <button 
              onClick={() => setActiveView('search')}
              className={`${navItemClass} ${activeView === 'search' ? activeTabClass : inactiveTabClass}`}
            >
              <Search className="w-7 h-7 sm:w-8 sm:h-8" />
              <span className="text-[11.5px] sm:text-[12.5px] font-bold mt-1.5 whitespace-nowrap">{t.search}</span>
            </button>
            <button 
              onClick={() => setActiveView('bookmarks')}
              className={`${navItemClass} ${activeView === 'bookmarks' ? activeTabClass : inactiveTabClass}`}
            >
              <Bookmark className="w-7 h-7 sm:w-8 sm:h-8" />
              <span className="text-[11.5px] sm:text-[12.5px] font-bold mt-1.5 whitespace-nowrap">{t.bookmarks}</span>
            </button>
            <button 
              onClick={() => setActiveView('highlights')}
              className={`${navItemClass} ${activeView === 'highlights' ? activeTabClass : inactiveTabClass}`}
            >
              <Pencil className="w-7 h-7 sm:w-8 sm:h-8" />
              <span className="text-[11.5px] sm:text-[12.5px] font-bold mt-1.5 whitespace-nowrap">{t.highlights}</span>
            </button>
          </div>

          {/* Row 2: Quran, Page Info, +A, -A */}
          <div className="grid grid-cols-4 gap-x-1">
            <button 
              onClick={() => setActiveView('reader')}
              className={`${navItemClass} ${activeView === 'reader' ? activeTabClass : inactiveTabClass}`}
            >
              <BookOpen className="w-7 h-7 sm:w-8 sm:h-8" />
              <span className="text-[11.5px] sm:text-[12.5px] font-bold mt-1.5 whitespace-nowrap">{t.quran}</span>
            </button>
            
            <button 
              onClick={openPageJump}
              className={`${navItemClass} ${inactiveTabClass}`}
            >
              <LayoutGrid className="w-7 h-7 sm:w-8 sm:h-8" />
              <span className="text-[10px] sm:text-[11px] font-bold mt-1.5 leading-tight text-center max-w-[80px]">{getJuzPageLabel()}</span>
            </button>

            <button 
              onClick={onZoomInFont}
              className={`${navItemClass} ${inactiveTabClass}`}
            >
              <div className="flex items-center justify-center relative">
                <span className="text-xl sm:text-2xl font-bold">A</span>
                <Plus className="w-3 h-3 absolute -top-1 -right-2" />
              </div>
              <span className="text-[11.5px] sm:text-[12.5px] font-bold mt-1.5">+A</span>
            </button>

            <button 
              onClick={onZoomOutFont}
              className={`${navItemClass} ${inactiveTabClass}`}
            >
              <div className="flex items-center justify-center relative">
                <span className="text-base sm:text-lg font-bold">A</span>
                <Minus className="w-3 h-3 absolute -top-1 -right-2" />
              </div>
              <span className="text-[11.5px] sm:text-[12.5px] font-bold mt-1.5">-A</span>
            </button>
          </div>

          {/* Row 3: Settings, Language, Themes (Centered) */}
          <div className="grid grid-cols-3 max-w-[90%] mx-auto w-full gap-x-1">
            <button 
              onClick={() => setActiveView('settings')}
              className={`${navItemClass} ${activeView === 'settings' ? activeTabClass : inactiveTabClass}`}
            >
              <Settings className="w-7 h-7 sm:w-8 sm:h-8" />
              <span className="text-[11.5px] sm:text-[12.5px] font-bold mt-1.5 whitespace-nowrap">{t.settings}</span>
            </button>
            <button 
              onClick={cycleAppLanguage}
              className={`${navItemClass} ${inactiveTabClass}`}
            >
              <Globe className="w-7 h-7 sm:w-8 sm:h-8" />
              <span className="text-[11.5px] sm:text-[12.5px] font-bold mt-1.5 whitespace-nowrap">{t.language}</span>
            </button>
            <button 
              onClick={cycleTheme}
              className={`${navItemClass} ${inactiveTabClass}`}
            >
              <Palette className="w-7 h-7 sm:w-8 sm:h-8" />
              <span className="text-[11.5px] sm:text-[12.5px] font-bold mt-1.5 whitespace-nowrap">{t.themes}</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
