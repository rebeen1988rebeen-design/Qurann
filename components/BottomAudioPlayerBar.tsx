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
  themeMode: 'light' | 'dark' | 'ice';
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
  const isDark = themeMode === 'dark';
  const isIce = themeMode === 'ice';

  const playerGlassClass = isDark
    ? 'bg-slate-900/85 backdrop-blur-2xl border-white/10 text-slate-100 shadow-2xl'
    : isIce
    ? 'bg-sky-50/85 backdrop-blur-2xl border-white/60 text-slate-900 shadow-xl'
    : 'bg-white/80 backdrop-blur-2xl border-white/70 text-slate-900 shadow-2xl';

  const navGlassClass = isDark
    ? 'glass-nav-dark text-slate-300'
    : 'glass-nav-light text-slate-600';

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
      
      {/* Floating Apple Liquid Glass Audio Player & Control Card */}
      <div className="w-full max-w-xl px-3 mb-2 pointer-events-auto">
        <div className={`w-full rounded-[24px] p-3 border shadow-2xl transition-all duration-300 flex flex-col gap-2 ${playerGlassClass}`}>
          
          {/* Top Bar: Active Surah, Ayah Info & Reciter Selection */}
          <div className="flex items-center justify-between text-xs font-semibold px-1">
            {/* Surah & Ayah Badge */}
            <div className="flex items-center gap-2 truncate">
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/25 text-emerald-700 dark:text-emerald-300 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{surahDisplayName}</span>
                <span className="opacity-60">•</span>
                <span>{verseLabel}</span>
                {verseCountProgress && (
                  <span className="text-[10px] opacity-70 ml-0.5">{verseCountProgress}</span>
                )}
              </span>
            </div>

            {/* Reciter Picker Trigger Button */}
            <button
              onClick={onOpenReciterModal}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/5 dark:bg-white/10 hover:bg-emerald-500/10 text-slate-700 dark:text-slate-200 transition-all text-xs"
              title={t.reciter}
            >
              <Volume2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="truncate max-w-[110px] sm:max-w-[140px]">
                {selectedReciter.name.split(' ')[0]}
              </span>
              <ChevronDown className="w-3 h-3 opacity-60" />
            </button>
          </div>

          {/* Continuous Ayah Progress Slider Track */}
          <div className="flex items-center gap-2 px-1">
            <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 w-9 text-right">
              {formatLocalizedTime(currentTime, appLanguage)}
            </span>

            <div className="relative flex-1 h-2 flex items-center group cursor-pointer">
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={currentTime || 0}
                onChange={(e) => onSeek(parseFloat(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer"
              />
              {/* Background Track */}
              <div className="w-full h-1.5 rounded-full bg-black/10 dark:bg-white/15 overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-100 relative"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 w-9">
              {formatLocalizedTime(duration, appLanguage)}
            </span>
          </div>

          {/* Bottom Control Buttons & Page Quick Jump */}
          <div className="flex items-center justify-between pt-0.5 px-1">
            {/* Page Navigation Controls */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 transition-all"
                title="Previous Page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-800 dark:text-amber-300 font-extrabold text-[11px]">
                {appLanguage === 'en' ? 'P ' : 'ل '}{toLocalizedNumeral(currentPage, appLanguage)}
              </span>
              <button
                onClick={() => setCurrentPage(Math.min(604, currentPage + 1))}
                className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 transition-all"
                title="Next Page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Playback Controls (Prev Ayah, Play/Pause, Next Ayah) */}
            <div className="flex items-center gap-2">
              <button
                onClick={onPrevVerse}
                className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200 active:scale-90 transition-all"
                title={t.prevVerse}
              >
                <SkipBack className="w-4 h-4 fill-current" />
              </button>

              <button
                onClick={onTogglePlay}
                className={`w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg hover:bg-emerald-600 active:scale-95 transition-all ${
                  isPlaying ? 'ring-4 ring-emerald-500/30 animate-pulse' : ''
                }`}
                title={isPlaying ? t.paused : t.startPlayback}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 fill-white" />
                ) : (
                  <Play className="w-4 h-4 fill-white ml-0.5" />
                )}
              </button>

              <button
                onClick={onNextVerse}
                className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200 active:scale-90 transition-all"
                title={t.nextVerse}
              >
                <SkipForward className="w-4 h-4 fill-current" />
              </button>
            </div>

            {/* Continuous Mode Indicator */}
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                {t.continuous}
              </span>
            </div>
          </div>

        </div>
      </div>

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
