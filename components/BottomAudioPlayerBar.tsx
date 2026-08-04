'use client';

import React from 'react';
import {
  Play,
  Pause,
  ChevronDown,
  ListFilter,
  Bookmark,
  Pencil,
  SkipBack,
  SkipForward,
  Volume2,
  ChevronLeft,
  ChevronRight,
  Search,
  BookOpen,
  Settings,
} from 'lucide-react';
import { Reciter, SurahMeta, Verse } from '@/data/quranData';
import { Language, TRANSLATIONS, toLocalizedNumeral, formatLocalizedTime } from '@/data/translations';
import { ThemeMode, getThemeConfig } from '@/lib/themeUtils';

interface BottomAudioPlayerBarProps {
  selectedReciter: Reciter;
  onOpenReciterModal: () => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  currentSurah: SurahMeta;
  currentVerse: Verse | null;
  currentVerseIndex: number | null;
  totalVerses: number;
  onNextVerse: () => void;
  onPrevVerse: () => void;
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  activeView: 'reader' | 'contents' | 'settings' | 'khatmah' | 'bookmarks' | 'highlights' | 'search';
  setActiveView: (view: 'reader' | 'contents' | 'settings' | 'khatmah' | 'bookmarks' | 'highlights' | 'search') => void;
  themeMode: ThemeMode;
  appLanguage: Language;
  showBars: boolean;
}

export const BottomAudioPlayerBar: React.FC<BottomAudioPlayerBarProps> = ({
  selectedReciter,
  onOpenReciterModal,
  isPlaying,
  onTogglePlay,
  currentSurah,
  currentVerse,
  currentVerseIndex,
  totalVerses,
  onNextVerse,
  onPrevVerse,
  currentTime,
  duration,
  onSeek,
  currentPage,
  setCurrentPage,
  activeView,
  setActiveView,
  themeMode,
  appLanguage,
  showBars,
}) => {
  const t = TRANSLATIONS[appLanguage];
  const themeConfig = getThemeConfig(themeMode);

  const playerGlassClass = themeConfig.playerGlass;
  const navGlassClass = themeConfig.navGlass;

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const verseLabel = currentVerse
    ? `${t.verses} ${toLocalizedNumeral(currentVerse.numberInSurah, appLanguage)}`
    : t.startPlayback;

  const verseCountProgress = totalVerses > 0
    ? `(${toLocalizedNumeral((currentVerseIndex ?? 0) + 1, appLanguage)}/${toLocalizedNumeral(totalVerses, appLanguage)})`
    : '';

  const surahDisplayName = appLanguage === 'en'
    ? currentSurah.englishName
    : appLanguage === 'ku'
    ? currentSurah.kurdishName
    : currentSurah.name;

  const activeTabClass = themeMode === 'dark'
    ? 'text-white font-extrabold scale-105'
    : themeMode === 'cyan'
    ? 'text-sky-800 font-extrabold scale-105'
    : themeMode === 'yellow'
    ? 'text-amber-800 font-extrabold scale-105'
    : 'text-emerald-800 font-extrabold scale-105';

  const inactiveTabClass = themeMode === 'dark'
    ? 'text-white/60 hover:text-white'
    : 'text-slate-500 hover:text-slate-900';

  return (
    <div className={`fixed bottom-4 left-0 right-0 z-40 flex flex-col items-center pointer-events-none transition-all duration-300 px-3 ${showBars ? 'translate-y-0' : 'translate-y-full'}`}>
      
      {/* Apple Bottom Navigation Tab Bar in a Box */}
      <div className={`mx-auto max-w-4xl w-full pointer-events-auto py-2.5 px-6 flex items-center justify-around shadow-2xl rounded-full ${navGlassClass}`}>
        
        {/* Tab 1: Contents */}
        <button
          onClick={() => setActiveView('contents')}
          className={`flex flex-col items-center gap-0.5 transition-all ${
            activeView === 'contents' ? activeTabClass : inactiveTabClass
          }`}
        >
          <ListFilter className="w-5 h-5" />
          <span className="text-[11px] font-medium">{t.contents}</span>
        </button>

        {/* Tab 2: Search */}
        <button
          onClick={() => setActiveView('search')}
          className={`flex flex-col items-center gap-0.5 transition-all ${
            activeView === 'search' ? activeTabClass : inactiveTabClass
          }`}
        >
          <Search className="w-5 h-5" />
          <span className="text-[11px] font-medium">{t.search}</span>
        </button>

        {/* Tab 3: Reader (Main Quran) */}
        <button
          onClick={() => setActiveView('reader')}
          className={`flex flex-col items-center gap-0.5 transition-all ${
            activeView === 'reader' ? activeTabClass : inactiveTabClass
          }`}
        >
          <BookOpen className="w-5 h-5" />
          <span className="text-[11px] font-medium">{t.quran}</span>
        </button>

        {/* Tab 4: Bookmarks */}
        <button
          onClick={() => setActiveView('bookmarks')}
          className={`flex flex-col items-center gap-0.5 transition-all ${
            activeView === 'bookmarks' ? activeTabClass : inactiveTabClass
          }`}
        >
          <Bookmark className="w-5 h-5" />
          <span className="text-[11px] font-medium">{t.bookmarks}</span>
        </button>

        {/* Tab 5: Highlights */}
        <button
          onClick={() => setActiveView('highlights')}
          className={`flex flex-col items-center gap-0.5 transition-all ${
            activeView === 'highlights' ? activeTabClass : inactiveTabClass
          }`}
        >
          <Pencil className="w-5 h-5" />
          <span className="text-[11px] font-medium">{t.highlights}</span>
        </button>

        {/* Tab 6: Settings */}
        <button
          onClick={() => setActiveView('settings')}
          className={`flex flex-col items-center gap-0.5 transition-all ${
            activeView === 'settings' ? activeTabClass : inactiveTabClass
          }`}
        >
          <Settings className="w-5 h-5" />
          <span className="text-[11px] font-medium">{t.settings}</span>
        </button>

      </div>

    </div>
  );
};
