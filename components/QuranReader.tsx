'use client';

import React, { useState, useEffect } from 'react';
import { Play, Bookmark, Share2, Volume2 } from 'lucide-react';
import { SurahMeta, Verse } from '@/data/quranData';
import { Language, TRANSLATIONS, toLocalizedNumeral } from '@/data/translations';
import { ThemeMode, getThemeConfig } from '@/lib/themeUtils';

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
  themeMode: ThemeMode;
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
  const themeConfig = getThemeConfig(themeMode);
  const [readingMode, setReadingMode] = useState<'page' | 'verses'>('page');
  const [selectedVerseForModal, setSelectedVerseForModal] = useState<Verse | null>(null);

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

  const cardGlassClass = themeConfig.cardGlass;

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
      <div className={`w-full p-4 sm:p-8 min-h-[500px] relative overflow-hidden ${cardGlassClass}`}>
        


        {/* Bismillah Header (Except Surah At-Tawbah - 9) */}
        {currentSurah.number !== 9 && (
          <div dir="rtl" className="w-full text-center py-4 mb-4">
            <span className={`text-xl sm:text-2xl font-bold uthmani-text ${themeConfig.textAccent}`}>
              بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
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
                  wordSpacing: '-0.08em',
                  letterSpacing: '-0.02em',
                  overflowX: 'hidden',
                  fontSize: `${kurdishFontSize}px`,
                  lineHeight: '1.9',
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
                      className={`cursor-pointer transition-colors duration-150 rounded-md px-0.5 inline relative ${
                        isCurrentPlaying
                          ? 'bg-emerald-500/35 text-emerald-950 dark:text-emerald-50 ring-2 ring-emerald-500 shadow-lg scale-[1.02]'
                          : highlightColor
                          ? `${highlightColor} px-0.5 rounded`
                          : 'hover:bg-emerald-500/10'
                      }`}
                      title={`ئایەتی ${verse.numberInSurah} - داگرە بۆ گوێگرتن یان نیشانکردن`}
                    >
                      {verse.kurdish || getCleanArabicText(verse)}
                      
                      {/* Perfect Round Circle Verse End Marker */}
                      <span
                        className={`inline-flex items-center justify-center mx-1 font-extrabold text-center align-middle font-sans transition-colors shadow-xs ${
                          isCurrentPlaying
                            ? 'bg-emerald-600 text-white ring-2 ring-emerald-400 shadow-md'
                            : themeConfig.ayahBadge
                        }`}
                        style={{
                          width: `${Math.max(26, kurdishFontSize + 6)}px`,
                          height: `${Math.max(26, kurdishFontSize + 6)}px`,
                          borderRadius: '50%',
                          fontSize: `${Math.max(12, kurdishFontSize - 4)}px`,
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
                className={`w-full text-justify leading-[2.0] uthmani-text select-text pt-2 pb-6 ${themeConfig.arabicVerseText}`}
                style={{
                  fontSize: `${arabicFontSize}px`,
                  wordSpacing: '-0.12em',
                  letterSpacing: '-0.02em',
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
                      className={`cursor-pointer transition-colors duration-150 rounded-md px-0.5 inline relative ${
                        isCurrentPlaying
                          ? 'bg-emerald-500/35 ring-2 ring-emerald-500 shadow-lg scale-[1.02]'
                          : highlightColor
                          ? `${highlightColor} px-0.5 rounded`
                          : 'hover:bg-emerald-500/10'
                      }`}
                      title={`${t.verses} ${toLocalizedNumeral(verse.numberInSurah, appLanguage)}`}
                    >
                      {getCleanArabicText(verse)}
                      
                      {/* Perfect Round Circle Verse End Marker */}
                      <span
                        className={`inline-flex items-center justify-center mx-1 font-extrabold text-center align-middle font-sans transition-colors shadow-xs ${
                          isCurrentPlaying
                            ? 'bg-emerald-600 text-white ring-2 ring-emerald-400 shadow-md'
                            : themeConfig.ayahBadge
                        }`}
                        style={{
                          width: `${Math.max(28, arabicFontSize + 4)}px`,
                          height: `${Math.max(28, arabicFontSize + 4)}px`,
                          borderRadius: '50%',
                          fontSize: `${Math.max(12, arabicFontSize - 8)}px`,
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
                  className={`w-full rounded-[20px] p-4 sm:p-5 transition-colors duration-150 border ${
                    isCurrentPlaying
                      ? 'bg-emerald-500/25 border-emerald-500 ring-2 ring-emerald-500 shadow-xl scale-[1.01]'
                      : 'bg-white/40 dark:bg-slate-800/40 border-white/50 dark:border-white/10 hover:border-emerald-500/30'
                  }`}
                >
                  {/* Top Bar for Verse */}
                  <div className="flex items-center justify-between pb-3 border-b border-black/5 dark:border-white/10 mb-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-8 h-8 rounded-full font-extrabold text-sm flex items-center justify-center transition-colors shadow-xs ${
                          isCurrentPlaying
                            ? 'bg-emerald-600 text-white ring-2 ring-emerald-400 animate-pulse'
                            : themeConfig.ayahBadge
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
                        className={`p-1.5 rounded-full transition-colors ${
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
                        className={`p-1.5 rounded-full transition-colors ${
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
                      <span className={`inline-flex items-center justify-center w-8 h-8 mx-2 rounded-full ${themeConfig.ayahBadge} text-xs font-extrabold font-sans shadow-xs`}>
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
        <div className="w-full flex justify-center mt-6 pt-4">
          <span className={`inline-flex items-center justify-center px-4 py-1.5 rounded-full ${themeConfig.ayahBadge} text-sm font-extrabold font-sans shadow-xs`}>
            {toLocalizedNumeral(currentPage, appLanguage)}
          </span>
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
