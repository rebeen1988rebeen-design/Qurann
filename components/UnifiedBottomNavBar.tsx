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
    <div className={`fixed bottom-0 left-0 right-0 z-50 flex flex-col items-center pointer-events-none transition-all duration-500 px-4 pb-10 ${showBars ? 'translate-y-0' : 'translate-y-full'}`}>
      <div className={`mx-auto w-[92%] max-w-[520px] pointer-events-auto py-8 px-6 shadow-2xl rounded-2xl border-0 ${themeConfig.navGlass}`}>
        <div className="grid grid-cols-4 gap-y-8 gap-x-2">
          
          {/* Row 1 */}
          <button onClick={() => setActiveView('search')} className={`${navItemClass} ${activeView === 'search' ? activeTabClass : inactiveTabClass}`}>
            <Search className="w-6 h-6" />
            <span className={navLabelClass}>{t.search}</span>
          </button>

          <button onClick={() => setActiveView('contents')} className={`${navItemClass} ${activeView === 'contents' ? activeTabClass : inactiveTabClass}`}>
            <ListFilter className="w-6 h-6" />
            <span className={navLabelClass}>{t.contents}</span>
          </button>

          <button 
            onClick={() => setTranslationMode('kurdish')} 
            className={`${navItemClass} ${translationMode === 'kurdish' ? activeTabClass : inactiveTabClass}`}
          >
            <div className="w-6 h-6 flex items-center justify-center font-bold text-[11px] border-2 border-current rounded-md">
              {appLanguage === 'ku' ? 'ک' : appLanguage === 'ar' ? 'ك' : 'K'}
            </div>
            <span className={navLabelClass}>{t.kurdishOnly}</span>
          </button>

          <button 
            onClick={() => setTranslationMode('arabic')} 
            className={`${navItemClass} ${translationMode === 'arabic' ? activeTabClass : inactiveTabClass}`}
          >
            <div className="w-6 h-6 flex items-center justify-center font-bold text-[11px] border-2 border-current rounded-md">
              {appLanguage === 'en' ? 'A' : 'ع'}
            </div>
            <span className={navLabelClass}>{t.arabicOnly}</span>
          </button>

          {/* Row 2 */}
          <button onClick={() => setActiveView('highlights')} className={`${navItemClass} ${activeView === 'highlights' ? activeTabClass : inactiveTabClass}`}>
            <Pencil className="w-6 h-6" />
            <span className={navLabelClass}>{t.highlights}</span>
          </button>

          <button onClick={() => setActiveView('bookmarks')} className={`${navItemClass} ${activeView === 'bookmarks' ? activeTabClass : inactiveTabClass}`}>
            <Bookmark className="w-6 h-6" />
            <span className={navLabelClass}>{t.bookmarks}</span>
          </button>

          <button onClick={() => setActiveView('reader')} className={`${navItemClass} ${activeView === 'reader' ? activeTabClass : inactiveTabClass} col-span-2`}>
            <BookOpen className="w-6 h-6" />
            <span className={navLabelClass}>{t.quran}</span>
          </button>

          {/* Row 3 */}
          <button onClick={onZoomOutFont} className={`${navItemClass} ${inactiveTabClass}`}>
            <Minus className="w-6 h-6" />
            <span className={navLabelClass}>A-</span>
          </button>

          <button onClick={cycleAppLanguage} className={`${navItemClass} ${inactiveTabClass}`}>
            <Globe className="w-6 h-6" />
            <span className={navLabelClass}>{t.language}</span>
          </button>

          <button onClick={openPageJump} className={`${navItemClass} ${inactiveTabClass} col-span-2`}>
            <LayoutGrid className="w-6 h-6" />
            <span className={navLabelClass}>{getJuzPageLabel()}</span>
          </button>

          {/* Row 4 */}
          <button onClick={() => setActiveView('settings')} className={`${navItemClass} ${activeView === 'settings' ? activeTabClass : inactiveTabClass} col-span-2`}>
            <Settings className="w-6 h-6" />
            <span className={navLabelClass}>{t.settings}</span>
          </button>

          <button onClick={cycleTheme} className={`${navItemClass} ${inactiveTabClass}`}>
            <Palette className="w-6 h-6" />
            <span className={navLabelClass}>{t.themes}</span>
          </button>

          <button onClick={onZoomInFont} className={`${navItemClass} ${inactiveTabClass}`}>
            <Plus className="w-6 h-6" />
            <span className={navLabelClass}>A+</span>
          </button>

        </div>
      </div>
    </div>
  );
};
