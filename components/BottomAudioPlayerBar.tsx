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
  activeView: 'reader' | 'contents' | 'settings' | 'khatmah' | 'bookmarks' | 'highlights';
  setActiveView: (view: 'reader' | 'contents' | 'settings' | 'khatmah' | 'bookmarks' | 'highlights') => void;
  themeMode: ThemeMode;
  appLanguage: Language;
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

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex flex-col items-center pointer-events-none transition-all duration-300">
      
      {/* Apple Bottom Navigation Tab Bar */}
      <div className={`w-full pointer-events-auto py-2 px-6 flex items-center justify-around shadow-2xl ${navGlassClass}`}>
        
        {/* Tab 1: Contents */}
        <button
          onClick={() => setActiveView('contents')}
          className={`flex flex-col items-center gap-0.5 transition-all ${
            activeView === 'contents'
              ? 'text-emerald-600 dark:text-emerald-400 font-bold scale-105'
              : 'hover:text-emerald-600 opacity-70'
          }`}
        >
          <ListFilter className="w-5 h-5" />
          <span className="text-[11px] font-medium">{t.contents}</span>
        </button>

        {/* Tab 2: Reader (Main Quran) */}
        <button
          onClick={() => setActiveView('reader')}
          className={`flex flex-col items-center gap-0.5 transition-all ${
            activeView === 'reader'
              ? 'text-emerald-600 dark:text-emerald-400 font-bold scale-105'
              : 'hover:text-emerald-600 opacity-70'
          }`}
        >
          <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-600 flex items-center justify-center font-bold text-xs border border-emerald-500/30">
            📖
          </div>
          <span className="text-[11px] font-medium">{t.appTitle}</span>
        </button>

        {/* Tab 3: Bookmarks */}
        <button
          onClick={() => setActiveView('bookmarks')}
          className={`flex flex-col items-center gap-0.5 transition-all ${
            activeView === 'bookmarks'
              ? 'text-emerald-600 dark:text-emerald-400 font-bold scale-105'
              : 'hover:text-emerald-600 opacity-70'
          }`}
        >
          <Bookmark className="w-5 h-5" />
          <span className="text-[11px] font-medium">{t.bookmarks}</span>
        </button>

        {/* Tab 4: Highlights */}
        <button
          onClick={() => setActiveView('highlights')}
          className={`flex flex-col items-center gap-0.5 transition-all ${
            activeView === 'highlights'
              ? 'text-emerald-600 dark:text-emerald-400 font-bold scale-105'
              : 'hover:text-emerald-600 opacity-70'
          }`}
        >
          <Pencil className="w-5 h-5" />
          <span className="text-[11px] font-medium">{t.highlights}</span>
        </button>

      </div>

    </div>
  );
};
