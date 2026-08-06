'use client';

import React from 'react';
import { triggerHaptic } from '@/lib/haptics';
import { IconBox } from '@/components/IconBox';
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
  BookOpenCheck,
} from 'lucide-react';
import { Language, TRANSLATIONS, toLocalizedNumeral } from '@/data/translations';
import { ThemeMode, getThemeConfig } from '@/lib/themeUtils';

interface UnifiedBottomNavBarProps {
  activeView: 'reader' | 'contents' | 'settings' | 'khatmah' | 'bookmarks' | 'highlights' | 'search' | 'about' | 'dailyAzkar' | 'athan' | 'recitation' | 'qibla';
  setActiveView: (view: 'reader' | 'contents' | 'settings' | 'khatmah' | 'bookmarks' | 'highlights' | 'search' | 'about' | 'dailyAzkar' | 'athan' | 'recitation' | 'qibla') => void;
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

  const navItemClass = "flex flex-col items-center justify-center gap-1 min-w-[64px] transition-all cursor-pointer outline-none group";
  const navLabelClass = "text-[12px] sm:text-[13px] font-bold mt-1.5 whitespace-nowrap";

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
      <div className={`mx-auto w-[98%] max-w-[750px] pointer-events-auto py-4 sm:py-5 px-4 ${themeConfig.navGlass}`}>
        <div className="flex flex-col gap-y-3.5 sm:gap-y-4">
          
          {/* Row 1: Contents, Search, Bookmarks, Highlights */}
          <div className="grid grid-cols-4 gap-x-1">
            <button 
              onClick={() => { setActiveView('contents'); hideBarsDirectly(); }}
              className={`${navItemClass} ${activeView === 'contents' ? activeTabClass : inactiveTabClass}`}
            >
              <IconBox domain="contents" size="md" active={activeView === 'contents'}>
                <ListFilter className="w-[26px] h-[26px]" />
              </IconBox>
              <span className={navLabelClass}>{t.contents}</span>
            </button>

            <button 
              onClick={() => { setActiveView('search'); hideBarsDirectly(); }}
              className={`${navItemClass} ${activeView === 'search' ? activeTabClass : inactiveTabClass}`}
            >
              <IconBox domain="search" size="md" active={activeView === 'search'}>
                <Search className="w-[26px] h-[26px]" />
              </IconBox>
              <span className={navLabelClass}>{t.search}</span>
            </button>

            <button 
              onClick={() => { setActiveView('bookmarks'); hideBarsDirectly(); }}
              className={`${navItemClass} ${activeView === 'bookmarks' ? activeTabClass : inactiveTabClass}`}
            >
              <IconBox domain="bookmarks" size="md" active={activeView === 'bookmarks'}>
                <Bookmark className="w-[26px] h-[26px]" />
              </IconBox>
              <span className={navLabelClass}>{t.bookmarks}</span>
            </button>

            <button 
              onClick={() => { setActiveView('highlights'); hideBarsDirectly(); }}
              className={`${navItemClass} ${activeView === 'highlights' ? activeTabClass : inactiveTabClass}`}
            >
              <IconBox domain="bookmarks" size="md" active={activeView === 'highlights'}>
                <Pencil className="w-[26px] h-[26px]" />
              </IconBox>
              <span className={navLabelClass}>{t.highlights}</span>
            </button>
          </div>

          {/* Row 2: Quran, Athan, Daily Azkar, Qibla */}
          <div className="grid grid-cols-4 gap-x-1">
            <button 
              onClick={() => { setActiveView('reader'); hideBarsDirectly(); }}
              className={`${navItemClass} ${activeView === 'reader' ? activeTabClass : inactiveTabClass}`}
            >
              <IconBox domain="quran" size="md" active={activeView === 'reader'}>
                <BookOpen className="w-[26px] h-[26px]" />
              </IconBox>
              <span className={navLabelClass}>{t.quran}</span>
            </button>
            
            <button 
              onClick={() => { setActiveView('athan'); hideBarsDirectly(); }}
              className={`${navItemClass} ${activeView === 'athan' ? activeTabClass : inactiveTabClass}`}
            >
              <IconBox domain="notifications" size="md">
                <TowerControl className="w-[26px] h-[26px]" />
              </IconBox>
              <span className={navLabelClass}>{t.athan}</span>
            </button>

            <button 
              onClick={() => { setActiveView('dailyAzkar'); hideBarsDirectly(); }}
              className={`${navItemClass} ${activeView === 'dailyAzkar' ? activeTabClass : inactiveTabClass}`}
            >
              <IconBox domain="dhikr" size="md" active={activeView === 'dailyAzkar'}>
                <Sparkles className="w-[26px] h-[26px]" />
              </IconBox>
              <span className={navLabelClass}>{t.dailyAzkar}</span>
            </button>

            <button 
              onClick={() => { setActiveView('qibla'); hideBarsDirectly(); }}
              className={`${navItemClass} ${activeView === 'qibla' ? activeTabClass : inactiveTabClass}`}
            >
              <IconBox domain="themes" size="md" active={activeView === 'qibla'}>
                <Compass className="w-[26px] h-[26px]" />
              </IconBox>
              <span className={navLabelClass}>{t.qibla}</span>
            </button>
          </div>

          {/* Row 3: Recitation, Page Jump, Arabic, Kurdish */}
          <div className="grid grid-cols-4 gap-x-1">
            <button 
              onClick={() => { setActiveView('recitation'); hideBarsDirectly(); }}
              className={`${navItemClass} ${activeView === 'recitation' ? activeTabClass : inactiveTabClass}`}
            >
              <IconBox domain="audio" size="md">
                <Play className="w-[26px] h-[26px]" />
              </IconBox>
              <span className={navLabelClass}>{t.recitation}</span>
            </button>

            <button 
              onClick={() => { openPageJump(); triggerHaptic(10); }}
              className={`${navItemClass} ${inactiveTabClass}`}
            >
              <IconBox domain="contents" size="md">
                <LayoutGrid className="w-[26px] h-[26px]" />
              </IconBox>
              <span className="text-[10px] sm:text-[11px] font-bold mt-1 leading-tight text-center max-w-[80px]">{getJuzPageLabel()}</span>
            </button>

            <button 
              onClick={() => { setTranslationMode('arabic'); triggerHaptic(10); }} 
              className={`${navItemClass} ${translationMode === 'arabic' ? activeTabClass : inactiveTabClass}`}
            >
              <IconBox domain="language" size="md">
                <BookText className="w-[26px] h-[26px]" />
              </IconBox>
              <span className={navLabelClass}>{appLanguage === 'ku' ? 'عەرەبی' : appLanguage === 'ar' ? 'العربية' : 'Arabic'}</span>
            </button>

            <button 
              onClick={() => { setTranslationMode('kurdish'); triggerHaptic(10); }} 
              className={`${navItemClass} ${translationMode === 'kurdish' ? activeTabClass : inactiveTabClass}`}
            >
              <IconBox domain="language" size="md">
                <BookText className="w-[26px] h-[26px]" />
              </IconBox>
              <span className={navLabelClass}>{appLanguage === 'ku' ? 'کوردی' : appLanguage === 'ar' ? 'الكردية' : 'Kurdish'}</span>
            </button>
          </div>

          {/* Row 4: Settings, Language, Themes, About */}
          <div className="grid grid-cols-4 gap-x-1">
            <button 
              onClick={() => { setActiveView('settings'); hideBarsDirectly(); }}
              className={`${navItemClass} ${activeView === 'settings' ? activeTabClass : inactiveTabClass}`}
            >
              <IconBox domain="settings" size="md" active={activeView === 'settings'}>
                <Settings className="w-[26px] h-[26px]" />
              </IconBox>
              <span className={navLabelClass}>{t.settings}</span>
            </button>

            <button 
              onClick={cycleAppLanguage}
              className={`${navItemClass} ${inactiveTabClass}`}
            >
              <IconBox domain="language" size="md">
                <Globe className="w-[26px] h-[26px]" />
              </IconBox>
              <span className={navLabelClass}>{t.language}</span>
            </button>

            <button 
              onClick={cycleTheme}
              className={`${navItemClass} ${inactiveTabClass}`}
            >
              <IconBox domain="themes" size="md">
                <Palette className="w-[26px] h-[26px]" />
              </IconBox>
              <span className={navLabelClass}>{t.themes}</span>
            </button>

            <button 
              onClick={() => { setActiveView('about'); hideBarsDirectly(); }}
              className={`${navItemClass} ${activeView === 'about' ? activeTabClass : inactiveTabClass}`}
            >
              <IconBox domain="info" size="md" active={activeView === 'about'}>
                <Info className="w-[26px] h-[26px]" />
              </IconBox>
              <span className={navLabelClass}>{t.about}</span>
            </button>
          </div>

          {/* Row 5: Increase, Decrease, Empty, Empty */}
          <div className="grid grid-cols-4 gap-x-1">
            <button 
              onClick={() => { onZoomInFont(); triggerHaptic(5); }}
              className={`${navItemClass} ${inactiveTabClass}`}
            >
              <IconBox domain="themes" size="md">
                <div className="flex items-center justify-center relative">
                  <span className="text-lg font-bold">A</span>
                  <Plus className="w-2.5 h-2.5 absolute -top-1 -right-2" />
                </div>
              </IconBox>
              <span className={navLabelClass}>{t.increase}</span>
            </button>

            <button 
              onClick={() => { onZoomOutFont(); triggerHaptic(5); }}
              className={`${navItemClass} ${inactiveTabClass}`}
            >
              <IconBox domain="themes" size="md">
                <div className="flex items-center justify-center relative">
                  <span className="text-sm font-bold">A</span>
                  <Minus className="w-2.5 h-2.5 absolute -top-1 -right-2" />
                </div>
              </IconBox>
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

