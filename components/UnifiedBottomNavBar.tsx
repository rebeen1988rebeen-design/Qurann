'use client';

import React from 'react';
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
} from 'lucide-react';
import { Language, TRANSLATIONS, toLocalizedNumeral } from '@/data/translations';
import { ThemeMode, getThemeConfig } from '@/lib/themeUtils';

interface UnifiedBottomNavBarProps {
  activeView: 'reader' | 'contents' | 'settings' | 'khatmah' | 'bookmarks' | 'highlights' | 'search' | 'about' | 'dailyAzkar';
  setActiveView: (view: 'reader' | 'contents' | 'settings' | 'khatmah' | 'bookmarks' | 'highlights' | 'search' | 'about' | 'dailyAzkar') => void;
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
  const navLabelClass = "text-[10.5px] sm:text-[11.5px] font-bold mt-1.5 whitespace-nowrap";

  const getJuzPageLabel = () => {
    const juzNum = toLocalizedNumeral(currentJuz, appLanguage);
    const pageNum = toLocalizedNumeral(currentPage, appLanguage);
    
    if (appLanguage === 'ku') {
      return `لاپەڕە ${pageNum} بەشی ${juzNum}`;
    }
    if (appLanguage === 'ar') {
      return `الصفحة ${pageNum} الجزء ${juzNum}`;
    }
    return `Page ${pageNum} Juz ${juzNum}`;
  };

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 flex flex-col items-center pointer-events-none transition-all duration-500 px-2 pb-6 ${showBars ? 'translate-y-0' : 'translate-y-full'}`}>
      <div className={`mx-auto w-[98%] max-w-[750px] pointer-events-auto py-6 px-4 shadow-2xl rounded-2xl border-0 ${themeConfig.navGlass}`}>
        <div className="flex flex-col gap-y-7 sm:gap-y-8">
          
          {/* Row 1: Contents, Search, Bookmarks, Highlights */}
          <div className="grid grid-cols-4 gap-x-1">
            <button 
              onClick={() => { setActiveView('contents'); hideBarsDirectly(); }}
              className={`${navItemClass} ${activeView === 'contents' ? activeTabClass : inactiveTabClass}`}
            >
              <ListFilter className="w-6 h-6 sm:w-7 sm:h-7" />
              <span className="text-[10.5px] sm:text-[11.5px] font-bold mt-1.5 whitespace-nowrap">{t.contents}</span>
            </button>
            <button 
              onClick={() => { setActiveView('search'); hideBarsDirectly(); }}
              className={`${navItemClass} ${activeView === 'search' ? activeTabClass : inactiveTabClass}`}
            >
              <Search className="w-6 h-6 sm:w-7 sm:h-7" />
              <span className="text-[10.5px] sm:text-[11.5px] font-bold mt-1.5 whitespace-nowrap">{t.search}</span>
            </button>
            <button 
              onClick={() => { setActiveView('bookmarks'); hideBarsDirectly(); }}
              className={`${navItemClass} ${activeView === 'bookmarks' ? activeTabClass : inactiveTabClass}`}
            >
              <Bookmark className="w-6 h-6 sm:w-7 sm:h-7" />
              <span className="text-[10.5px] sm:text-[11.5px] font-bold mt-1.5 whitespace-nowrap">{t.bookmarks}</span>
            </button>
            <button 
              onClick={() => { setActiveView('highlights'); hideBarsDirectly(); }}
              className={`${navItemClass} ${activeView === 'highlights' ? activeTabClass : inactiveTabClass}`}
            >
              <Pencil className="w-6 h-6 sm:w-7 sm:h-7" />
              <span className="text-[10.5px] sm:text-[11.5px] font-bold mt-1.5 whitespace-nowrap">{t.highlights}</span>
            </button>
          </div>

          {/* Row 2: Quran, Athan, Daily Azkar, Display */}
          <div className="grid grid-cols-4 gap-x-1">
            <button 
              onClick={() => { setActiveView('reader'); hideBarsDirectly(); }}
              className={`${navItemClass} ${activeView === 'reader' ? activeTabClass : inactiveTabClass}`}
            >
              <BookOpen className="w-6 h-6 sm:w-7 sm:h-7" />
              <span className={navLabelClass}>{t.quran}</span>
            </button>
            
            <button 
              onClick={() => hideBarsDirectly()}
              className={`${navItemClass} ${inactiveTabClass}`}
            >
              <TowerControl className="w-6 h-6 sm:w-7 sm:h-7" />
              <span className={navLabelClass}>{t.athan}</span>
            </button>

            <button 
              onClick={() => { setActiveView('dailyAzkar'); hideBarsDirectly(); }}
              className={`${navItemClass} ${activeView === 'dailyAzkar' ? activeTabClass : inactiveTabClass}`}
            >
              <Sparkles className="w-6 h-6 sm:w-7 sm:h-7" />
              <span className={navLabelClass}>{t.dailyAzkar}</span>
            </button>

            <button 
              onClick={() => hideBarsDirectly()}
              className={`${navItemClass} ${inactiveTabClass}`}
            >
              <Compass className="w-6 h-6 sm:w-7 sm:h-7" />
              <span className={navLabelClass}>{t.qibla}</span>
            </button>
          </div>

          {/* Row 3: Recitation, Page Jump, Arabic, Kurdish */}
          <div className="grid grid-cols-4 gap-x-1">
            <button 
              onClick={() => hideBarsDirectly()}
              className={`${navItemClass} ${inactiveTabClass}`}
            >
              <Play className="w-6 h-6 sm:w-7 sm:h-7" />
              <span className={navLabelClass}>{t.recitation}</span>
            </button>
            <button 
              onClick={() => { openPageJump(); triggerHaptic(10); }}
              className={`${navItemClass} ${inactiveTabClass}`}
            >
              <LayoutGrid className="w-6 h-6 sm:w-7 sm:h-7" />
              <span className="text-[9px] sm:text-[10px] font-bold mt-1.5 leading-tight text-center max-w-[80px]">{getJuzPageLabel()}</span>
            </button>

            <button 
              onClick={() => { setTranslationMode('arabic'); triggerHaptic(10); }} 
              className={`${navItemClass} ${translationMode === 'arabic' ? activeTabClass : inactiveTabClass}`}
            >
              <div className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center font-bold text-[12px] sm:text-[14px] border-2 border-current rounded-md">
                {appLanguage === 'en' ? 'A' : 'ع'}
              </div>
              <span className={navLabelClass}>{appLanguage === 'ku' ? 'عەرەبی' : appLanguage === 'ar' ? 'العربية' : 'Arabic'}</span>
            </button>

            <button 
              onClick={() => { setTranslationMode('kurdish'); triggerHaptic(10); }} 
              className={`${navItemClass} ${translationMode === 'kurdish' ? activeTabClass : inactiveTabClass}`}
            >
              <div className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center font-bold text-[12px] sm:text-[14px] border-2 border-current rounded-md">
                {appLanguage === 'ku' ? 'ک' : appLanguage === 'ar' ? 'ك' : 'K'}
              </div>
              <span className={navLabelClass}>{appLanguage === 'ku' ? 'کوردی' : appLanguage === 'ar' ? 'الكردية' : 'Kurdish'}</span>
            </button>
          </div>

          {/* Row 4: Settings, Language, Themes, About */}
          <div className="grid grid-cols-4 gap-x-1">
            <button 
              onClick={() => { setActiveView('settings'); hideBarsDirectly(); }}
              className={`${navItemClass} ${activeView === 'settings' ? activeTabClass : inactiveTabClass}`}
            >
              <Settings className="w-6 h-6 sm:w-7 sm:h-7" />
              <span className={navLabelClass}>{t.settings}</span>
            </button>
            <button 
              onClick={cycleAppLanguage}
              className={`${navItemClass} ${inactiveTabClass}`}
            >
              <Globe className="w-6 h-6 sm:w-7 sm:h-7" />
              <span className={navLabelClass}>{t.language}</span>
            </button>
            <button 
              onClick={cycleTheme}
              className={`${navItemClass} ${inactiveTabClass}`}
            >
              <Palette className="w-6 h-6 sm:w-7 sm:h-7" />
              <span className={navLabelClass}>{t.themes}</span>
            </button>
            <button 
              onClick={() => { setActiveView('about'); hideBarsDirectly(); }}
              className={`${navItemClass} ${activeView === 'about' ? activeTabClass : inactiveTabClass}`}
            >
              <Info className="w-6 h-6 sm:w-7 sm:h-7" />
              <span className={navLabelClass}>{t.about}</span>
            </button>
          </div>

          {/* Row 5: Increase, Decrease, Empty, Empty */}
          <div className="grid grid-cols-4 gap-x-1">
            <button 
              onClick={() => { onZoomInFont(); triggerHaptic(5); }}
              className={`${navItemClass} ${inactiveTabClass}`}
            >
              <div className="flex items-center justify-center relative">
                <span className="text-xl sm:text-2xl font-bold">A</span>
                <Plus className="w-3 h-3 absolute -top-1 -right-2" />
              </div>
              <span className={navLabelClass}>{t.increase}</span>
            </button>

            <button 
              onClick={() => { onZoomOutFont(); triggerHaptic(5); }}
              className={`${navItemClass} ${inactiveTabClass}`}
            >
              <div className="flex items-center justify-center relative">
                <span className="text-base sm:text-lg font-bold">A</span>
                <Minus className="w-3 h-3 absolute -top-1 -right-2" />
              </div>
              <span className={navLabelClass}>{t.decrease}</span>
            </button>

            <div className="flex flex-col items-center justify-center min-w-[64px]" />
            <div className="flex flex-col items-center justify-center min-w-[64px]" />
          </div>

        </div>
      </div>
    </div>
  );
};
