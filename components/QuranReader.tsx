'use client';

import React, { useState, useEffect } from 'react';
import { Play, Bookmark, Share2, Volume2 } from 'lucide-react';
import { SurahMeta, Verse } from '@/data/quranData';
import { Language, TRANSLATIONS, toLocalizedNumeral } from '@/data/translations';

interface QuranReaderProps {
  currentSurah: SurahMeta;
  verses: Verse[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  currentVerseIndex: number | null;
  isPlaying?: boolean;
  onPlayVerseAudio: (verse: Verse) => void;
  translationMode: 'arabic' | 'kurdish' | 'both';
  onSelectTranslationMode?: (mode: 'arabic' | 'kurdish' | 'both') => void;
  bookmarkedVerses: number[];
  onToggleBookmark: (verseNumberInQuran: number) => void;
  highlightedVerses: Record<number, string>;
  onToggleHighlight: (verseNumberInQuran: number, color: string) => void;
  themeMode: 'light' | 'dark' | 'ice';
  isLoadingVerses?: boolean;
  arabicFontSize: number;
  kurdishFontSize: number;
  onZoomInFont: () => void;
  onZoomOutFont: () => void;
  appLanguage: Language;
}

export const QuranReader: React.FC<QuranReaderProps> = ({
  currentSurah,
  verses,
  currentPage,
  setCurrentPage,
  currentVerseIndex,
  isPlaying = false,
  onPlayVerseAudio,
  translationMode,
  onSelectTranslationMode,
  bookmarkedVerses,
  onToggleBookmark,
  highlightedVerses,
  onToggleHighlight,
  themeMode,
  isLoadingVerses = false,
  arabicFontSize,
  kurdishFontSize,
  onZoomInFont,
  onZoomOutFont,
  appLanguage,
}) => {
  const t = TRANSLATIONS[appLanguage];
  const [readingMode, setReadingMode] = useState<'page' | 'verses'>('page');
  const [selectedVerseForModal, setSelectedVerseForModal] = useState<Verse | null>(null);

  const isDark = themeMode === 'dark';
  const isIce = themeMode === 'ice';

  const getCleanArabicText = (verse: Verse) => {
    if (verse.numberInSurah !== 1 || currentSurah.number === 1) {
      return verse.text;
    }
    let s = (verse.text || '').replace(/^[\uFEFF\u200B\s]+/, '');
    const bismillahPattern = /^(?:بِسْمِ|بِسۡمِ|بِسمِ)\s+[\u0600-\u06FF\s]*?(?:ٱلرَّحِيمِ|ٱلرَّحِيم|الرَّحِيمِ|الرَّحِيمِ|الرحيم)\s*/i;
    if (bismillahPattern.test(s)) {
      return s.replace(bismillahPattern, '').trim();
    }
    const bismillahEnding = "ٱلرَّحِيمِ";
    const index = s.indexOf(bismillahEnding);
    if (index !== -1 && index < 45) {
      return s.slice(index + bismillahEnding.length).trim();
    }
    return s;
  };

  const cardGlassClass = isDark
    ? 'liquid-glass-dark text-slate-100'
    : isIce
    ? 'liquid-glass-ice text-slate-900'
    : 'liquid-glass-light text-slate-900';

  // Automatically scroll to highlight and focus the currently playing Ayah in real-time
  useEffect(() => {
    if (currentVerseIndex !== null && currentVerseIndex >= 0 && currentVerseIndex < verses.length) {
      const activeVerse = verses[currentVerseIndex];
      if (activeVerse) {
        const verseEl = document.getElementById(`verse-${activeVerse.numberInQuran}`);
        if (verseEl) {
          verseEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    }
  }, [currentVerseIndex, verses]);

  return (
    <div className="w-full max-w-4xl mx-auto px-3 py-2 pb-44 flex flex-col items-center">
      
      {/* Main Quran Frame Card */}
      <div className={`w-full rounded-[24px] p-4 sm:p-8 min-h-[500px] shadow-xl transition-all relative overflow-hidden ${cardGlassClass}`}>
        
        {/* Synchronized Font Zoom Bar */}
        <div className="w-full mb-4 flex items-center justify-end">
          <div className="flex items-center gap-1.5 bg-black/5 dark:bg-white/10 px-2.5 py-1 rounded-full border border-white/20">
            <button
              onClick={onZoomOutFont}
              className="w-7 h-7 rounded-full bg-white/50 dark:bg-slate-700/60 hover:bg-emerald-500/30 text-slate-800 dark:text-slate-100 flex items-center justify-center font-bold text-base transition-all active:scale-95 shadow-xs"
              title="Zoom Out Font Sizes"
            >
              -
            </button>
            <div className="flex flex-col items-center px-1 select-none">
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                A:{toLocalizedNumeral(arabicFontSize, appLanguage)}px
              </span>
              <span className="text-[9px] font-semibold text-slate-500 opacity-85">
                K:{toLocalizedNumeral(kurdishFontSize, appLanguage)}px
              </span>
            </div>
            <button
              onClick={onZoomInFont}
              className="w-7 h-7 rounded-full bg-white/50 dark:bg-slate-700/60 hover:bg-emerald-500/30 text-slate-800 dark:text-slate-100 flex items-center justify-center font-bold text-base transition-all active:scale-95 shadow-xs"
              title="Zoom In Font Sizes"
            >
              +
            </button>
          </div>
        </div>

        {/* 2 Display Mode Boxes (عەرەبی / کوردی / Arabic / Kurdish) */}
        <div className="w-full mb-6 grid grid-cols-2 gap-3" dir={appLanguage === 'en' ? 'ltr' : 'rtl'}>
          {/* Box 1: Arabic */}
          <button
            onClick={() => onSelectTranslationMode?.('arabic')}
            className={`py-3 px-4 rounded-[16px] text-center transition-all flex items-center justify-center cursor-pointer border ${
              translationMode === 'arabic' || translationMode === 'both'
                ? 'bg-emerald-500/20 dark:bg-emerald-500/25 border-emerald-500 ring-2 ring-emerald-500/30 shadow-md scale-[1.01]'
                : 'bg-white/40 dark:bg-slate-800/40 border-white/60 dark:border-white/10 hover:bg-white/70 dark:hover:bg-slate-800/70'
            }`}
          >
            <span className="text-base font-bold text-emerald-800 dark:text-emerald-300">
              {t.arabicOnly}
            </span>
          </button>

          {/* Box 2: Kurdish */}
          <button
            onClick={() => onSelectTranslationMode?.('kurdish')}
            className={`py-3 px-4 rounded-[16px] text-center transition-all flex items-center justify-center cursor-pointer border ${
              translationMode === 'kurdish'
                ? 'bg-emerald-500/20 dark:bg-emerald-500/25 border-emerald-500 ring-2 ring-emerald-500/30 shadow-md scale-[1.01]'
                : 'bg-white/40 dark:bg-slate-800/40 border-white/60 dark:border-white/10 hover:bg-white/70 dark:hover:bg-slate-800/70'
            }`}
          >
            <span className="text-base font-bold text-emerald-800 dark:text-emerald-300">
              {t.kurdishOnly}
            </span>
          </button>
        </div>

        {isLoadingVerses && (
          <div className="w-full my-8 flex flex-col items-center justify-center gap-2 py-8 bg-emerald-500/5 rounded-2xl border border-emerald-500/10 animate-pulse">
            <div className="w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
              {t.loadingVerses}
            </span>
          </div>
        )}

        {/* PAGE UTHMANI OR KURDISH VIEW MODE */}
        {readingMode === 'page' && (
          <>
            {/* KURDISH ONLY DISPLAY MODE (MATCHING ARABIC LAYOUT) */}
            {translationMode === 'kurdish' ? (
              <div
                dir="rtl"
                className="w-full select-text pt-2 pb-6 kurdish-text"
                style={{
                  textAlign: 'justify',
                  textAlignLast: 'right',
                  textJustify: 'inter-word',
                  direction: 'rtl',
                  width: '100%',
                  wordSpacing: '-0.02em',
                  letterSpacing: '-0.01em',
                  overflowX: 'hidden',
                  fontSize: `${kurdishFontSize}px`,
                  lineHeight: '2.0',
                }}
              >
                {verses.map((verse, index) => {
                  const isCurrentPlaying = currentVerseIndex === index;
                  const highlightColor = highlightedVerses[verse.numberInQuran];

                  return (
                    <span
                      key={verse.numberInQuran}
                      id={`verse-${verse.numberInQuran}`}
                      onClick={() => setSelectedVerseForModal(verse)}
                      className={`cursor-pointer transition-all duration-300 rounded-lg px-1 inline relative ${
                        isCurrentPlaying
                          ? 'bg-emerald-500/35 text-emerald-950 dark:text-emerald-50 ring-2 ring-emerald-500 shadow-lg scale-[1.02]'
                          : highlightColor
                          ? `${highlightColor} px-1 rounded`
                          : 'hover:bg-emerald-500/10'
                      }`}
                      title={`ئایەتی ${verse.numberInSurah} - داگرە بۆ گوێگرتن یان نیشانکردن`}
                    >
                      {verse.kurdish || getCleanArabicText(verse)}
                      
                      {/* Ornamental Verse End Marker */}
                      <span
                        className={`inline-flex items-center justify-center mx-1.5 rounded-full font-semibold text-center align-middle font-sans transition-all ${
                          isCurrentPlaying
                            ? 'bg-emerald-600 text-white ring-2 ring-emerald-400 scale-110 shadow-md'
                            : 'bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30'
                        }`}
                        style={{
                          width: `${Math.max(26, kurdishFontSize + 4)}px`,
                          height: `${Math.max(26, kurdishFontSize + 4)}px`,
                          fontSize: `${Math.max(10, kurdishFontSize - 8)}px`,
                        }}
                      >
                        {toLocalizedNumeral(verse.numberInSurah, appLanguage)}
                      </span>
                    </span>
                  );
                })}
              </div>
            ) : (
              /* ARABIC OR BILINGUAL PAGE FLOW */
              <div
                dir="rtl"
                className="w-full text-justify leading-[2.1] uthmani-text select-text pt-2 pb-6"
                style={{
                  fontSize: `${arabicFontSize}px`,
                  wordSpacing: '-0.06em',
                  letterSpacing: '0.01em',
                  textJustify: 'inter-character',
                }}
              >
                {verses.map((verse, index) => {
                  const isCurrentPlaying = currentVerseIndex === index;
                  const highlightColor = highlightedVerses[verse.numberInQuran];

                  return (
                    <span
                      key={verse.numberInQuran}
                      id={`verse-${verse.numberInQuran}`}
                      onClick={() => setSelectedVerseForModal(verse)}
                      className={`cursor-pointer transition-all duration-300 rounded-lg px-1 inline relative ${
                        isCurrentPlaying
                          ? 'bg-emerald-500/35 text-emerald-950 dark:text-emerald-50 ring-2 ring-emerald-500 shadow-lg scale-[1.02]'
                          : highlightColor
                          ? `${highlightColor} px-1 rounded`
                          : 'hover:bg-emerald-500/10'
                      }`}
                      title={`${t.verses} ${toLocalizedNumeral(verse.numberInSurah, appLanguage)}`}
                    >
                      {getCleanArabicText(verse)}
                      
                      {/* Ornamental Verse End Marker */}
                      <span
                        className={`inline-flex items-center justify-center mx-1.5 rounded-full font-semibold text-center align-middle font-sans transition-all ${
                          isCurrentPlaying
                            ? 'bg-emerald-600 text-white ring-2 ring-emerald-400 scale-110 shadow-md'
                            : 'bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30'
                        }`}
                        style={{
                          width: `${Math.max(26, arabicFontSize + 4)}px`,
                          height: `${Math.max(26, arabicFontSize + 4)}px`,
                          fontSize: `${Math.max(10, arabicFontSize - 12)}px`,
                        }}
                      >
                        {toLocalizedNumeral(verse.numberInSurah, appLanguage)}
                      </span>
                    </span>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* VERSE LIST VIEW MODE */}
        {readingMode === 'verses' && (
          <div className="flex flex-col gap-6 py-2">
            {verses.map((verse, index) => {
              const isCurrentPlaying = currentVerseIndex === index;
              const isBookmarked = bookmarkedVerses.includes(verse.numberInQuran);

              return (
                <div
                  key={verse.numberInQuran}
                  id={`verse-${verse.numberInQuran}`}
                  className={`w-full rounded-[20px] p-4 sm:p-5 transition-all duration-300 border ${
                    isCurrentPlaying
                      ? 'bg-emerald-500/25 border-emerald-500 ring-2 ring-emerald-500 shadow-xl scale-[1.01]'
                      : 'bg-white/40 dark:bg-slate-800/40 border-white/50 dark:border-white/10 hover:border-emerald-500/30'
                  }`}
                >
                  {/* Top Bar for Verse */}
                  <div className="flex items-center justify-between pb-3 border-b border-black/5 dark:border-white/10 mb-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center border transition-all ${
                          isCurrentPlaying
                            ? 'bg-emerald-600 text-white border-emerald-400 animate-pulse'
                            : 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/30'
                        }`}
                      >
                        {toLocalizedNumeral(verse.numberInSurah, appLanguage)}
                      </span>
                      <span className="text-xs opacity-60 font-medium">
                        {t.pageBadge} {toLocalizedNumeral(verse.page, appLanguage)} • {t.part} {toLocalizedNumeral(verse.juz, appLanguage)}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onPlayVerseAudio(verse)}
                        className={`p-1.5 rounded-full transition-all ${
                          isCurrentPlaying
                            ? 'bg-emerald-500 text-white shadow-md'
                            : 'hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                        }`}
                        title={t.playAudio}
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onToggleBookmark(verse.numberInQuran)}
                        className={`p-1.5 rounded-full transition-all ${
                          isBookmarked ? 'text-amber-500 fill-amber-500' : 'text-slate-400 hover:text-amber-500'
                        }`}
                        title={t.bookmark}
                      >
                        <Bookmark className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Arabic Uthmani Verse Text */}
                  {(translationMode === 'arabic' || translationMode === 'both') && (
                    <div
                      dir="rtl"
                      className="w-full text-right uthmani-text text-slate-900 dark:text-slate-100 mb-3 leading-relaxed"
                      style={{ fontSize: `${arabicFontSize}px` }}
                    >
                      {getCleanArabicText(verse)}
                      <span className="inline-flex items-center justify-center w-7 h-7 mx-2 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 text-xs font-bold font-sans">
                        {toLocalizedNumeral(verse.numberInSurah, appLanguage)}
                      </span>
                    </div>
                  )}

                  {/* Kurdish Translation */}
                  {(translationMode === 'kurdish' || translationMode === 'both') && (
                    <div
                      dir="rtl"
                      className="w-full text-right kurdish-text text-emerald-900 dark:text-emerald-200 mt-2 bg-emerald-500/5 p-3 sm:p-4 rounded-[16px] border border-emerald-500/10"
                      style={{
                        textAlign: 'justify',
                        textAlignLast: 'right',
                        textJustify: 'inter-word',
                        direction: 'rtl',
                        width: '100%',
                        wordSpacing: 'normal',
                        overflowX: 'hidden',
                        fontSize: `${kurdishFontSize}px`,
                        lineHeight: '2.0',
                      }}
                    >
                      <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 block mb-1">
                        {t.kurdishTranslation} ﴿{toLocalizedNumeral(verse.numberInSurah, appLanguage)}﴾
                      </span>
                      {verse.kurdish || getCleanArabicText(verse)}
                    </div>
                  )}

                  {/* English Translation */}
                  {translationMode === 'both' && (
                    <div className="w-full text-left text-sm text-slate-600 dark:text-slate-300 mt-2 bg-slate-500/5 p-3 rounded-[14px] border border-slate-500/10 font-sans">
                      <span className="text-[10px] uppercase font-bold text-slate-500 block mb-0.5">{t.englishTranslation}</span>
                      {verse.english}
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        )}

        {/* Footer Page Number Badge */}
        <div className="w-full flex justify-center mt-6 pt-4 border-t border-emerald-500/15">
          <div className="px-5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 font-bold text-sm tracking-widest font-sans flex items-center gap-1.5 shadow-xs">
            <span>{toLocalizedNumeral(currentPage, appLanguage)}</span>
          </div>
        </div>

      </div>

      {/* Verse Detail / Action Pop-up Modal when tapping verse in Page Mode */}
      {selectedVerseForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-in fade-in duration-200">
          <div className={`w-full max-w-lg rounded-[24px] p-6 shadow-2xl ${cardGlassClass} border border-white/40 dark:border-white/20`}>
            
            <div className="flex items-center justify-between pb-3 border-b border-black/10 dark:border-white/10 mb-4">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/15 px-3 py-1 rounded-full">
                {t.surahHeader(
                  appLanguage === 'en' ? currentSurah.englishName : currentSurah.name,
                  toLocalizedNumeral(selectedVerseForModal.numberInSurah, appLanguage)
                )}
              </span>
              <button
                onClick={() => setSelectedVerseForModal(null)}
                className="text-xs font-bold px-2.5 py-1 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10"
              >
                {t.close} ✕
              </button>
            </div>

            {/* Arabic */}
            <div dir="rtl" className="text-2xl uthmani-text text-emerald-900 dark:text-emerald-200 mb-4 leading-relaxed">
              {selectedVerseForModal.text}
            </div>

            {/* Kurdish Translation */}
            {(translationMode === 'kurdish' || translationMode === 'both') && (
              <div dir="rtl" className="text-lg kurdish-text text-slate-800 dark:text-slate-200 bg-emerald-500/10 p-3 rounded-[16px] mb-3">
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 block mb-1">{t.kurdishTranslation}</span>
                {selectedVerseForModal.kurdish}
              </div>
            )}

            {/* English Translation */}
            {translationMode === 'both' && (
              <div className="text-sm text-slate-600 dark:text-slate-300 bg-slate-500/5 p-3 rounded-[16px] mb-5">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">{t.englishTranslation}</span>
                {selectedVerseForModal.english}
              </div>
            )}

            {/* Action Bar */}
            <div className="flex items-center justify-around gap-2 pt-2 border-t border-black/10 dark:border-white/10">
              <button
                onClick={() => {
                  onPlayVerseAudio(selectedVerseForModal);
                  setSelectedVerseForModal(null);
                }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-emerald-500 text-white font-semibold text-xs shadow-md hover:bg-emerald-600 transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>{t.playAudio}</span>
              </button>

              <button
                onClick={() => {
                  onToggleBookmark(selectedVerseForModal.numberInQuran);
                }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/40 dark:bg-slate-800/60 font-semibold text-xs border border-white/50 text-slate-700 dark:text-slate-200 hover:bg-white/60"
              >
                <Bookmark className="w-3.5 h-3.5 text-amber-500" />
                <span>{t.bookmark}</span>
              </button>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(`${selectedVerseForModal.text}\n${selectedVerseForModal.kurdish}`);
                }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/40 dark:bg-slate-800/60 font-semibold text-xs border border-white/50 text-slate-700 dark:text-slate-200 hover:bg-white/60"
              >
                <Share2 className="w-3.5 h-3.5 text-sky-500" />
                <span>{t.copy}</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
