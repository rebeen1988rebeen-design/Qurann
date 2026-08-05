'use client';

import React, { useState, useEffect } from 'react';
import { Play, Bookmark, Share2, Volume2 } from 'lucide-react';
import { triggerHaptic } from '@/lib/haptics';
import { SurahMeta, Verse } from '@/data/quranData';
import { Language, TRANSLATIONS, toLocalizedNumeral } from '@/data/translations';
import { ThemeMode, getThemeConfig } from '@/lib/themeUtils';

interface QuranReaderProps {
  currentSurah: SurahMeta;
  verses: Verse[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  onVisibleVerseChange?: (verse: Verse) => void;
  currentVerseIndex: number | null;
  isPlaying?: boolean;
  onPlayVerseAudio: (verse: Verse) => void;
  translationMode: 'arabic' | 'kurdish';
  onSelectTranslationMode?: (mode: 'arabic' | 'kurdish') => void;
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
  toggleBars: () => void;
}

export const QuranReader: React.FC<QuranReaderProps> = ({
  currentSurah,
  verses,
  currentPage,
  setCurrentPage,
  onVisibleVerseChange,
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
  toggleBars,
}) => {
  const t = TRANSLATIONS[appLanguage];
  const themeConfig = getThemeConfig(themeMode);
  const [readingMode, setReadingMode] = useState<'page' | 'verses'>('page');
  const [selectedVerseForModal, setSelectedVerseForModal] = useState<Verse | null>(null);

  // Gesture handling state
  const touchStartTimeRef = React.useRef(0);
  const longPressTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  // Scroll tracking to update current visible verse
  useEffect(() => {
    if (readingMode !== 'page' || verses.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) {
          const verseId = visibleEntry.target.id;
          const numberInQuran = parseInt(verseId.replace('verse-', ''), 10);
          const verse = verses.find((v) => v.numberInQuran === numberInQuran);
          if (verse) {
            onVisibleVerseChange?.(verse);
            if (verse.page !== currentPage) {
              setCurrentPage(verse.page);
            }
          }
        }
      },
      { threshold: 0.5, rootMargin: '-10% 0px -10% 0px' }
    );

    verses.forEach((verse) => {
      const el = document.getElementById(`verse-${verse.numberInQuran}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [verses, readingMode, currentPage, setCurrentPage, onVisibleVerseChange]);

  const handleTouchStart = () => {
    touchStartTimeRef.current = Date.now();
    longPressTimerRef.current = setTimeout(() => {
      // Long press initiated
    }, 500);
  };

  const handleVerseTapOrLongPress = (verse: Verse, e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    if (longPressTimerRef.current) clearTimeout(longPressTimerRef.current);
    
    const currentTime = new Date().getTime();
    if (currentTime - touchStartTimeRef.current > 500) {
      // Long press: Select verse
      triggerHaptic([30, 20, 30]); // Distinctive pattern for long press
      setSelectedVerseForModal(verse);
    } else {
      triggerHaptic(10); // Standard tap
    }
  };

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
    <div className="w-full max-w-4xl mx-auto px-3 py-2 pb-44 flex flex-col items-center min-h-screen" onClick={toggleBars}>
      
      {/* Main Quran Frame Card */}
      <div className={`w-full p-4 sm:p-8 flex-1 relative overflow-hidden ${cardGlassClass}`}>
        


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
                        onMouseDown={handleTouchStart}
                        onMouseUp={(e) => handleVerseTapOrLongPress(verse, e)}
                        onTouchStart={handleTouchStart}
                        onTouchEnd={(e) => handleVerseTapOrLongPress(verse, e)}
                        className={`inline-flex items-center justify-center mx-1 font-extrabold text-center align-middle font-sans transition-colors shadow-xs active:scale-95 ${
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
                        onMouseDown={handleTouchStart}
                        onMouseUp={(e) => handleVerseTapOrLongPress(verse, e)}
                        onTouchStart={handleTouchStart}
                        onTouchEnd={(e) => handleVerseTapOrLongPress(verse, e)}
                        className={`inline-flex items-center justify-center mx-1 font-extrabold text-center align-middle font-sans transition-colors shadow-xs active:scale-95 ${
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
                  className={`w-full rounded-2xl p-4 sm:p-5 transition-colors duration-150 border ${
                    isCurrentPlaying
                      ? 'bg-emerald-500/25 border-emerald-500 ring-2 ring-emerald-500 shadow-xl scale-[1.01]'
                      : `${themeConfig.cardGlass} border-0`
                  }`}
                >
                  {/* Top Bar for Verse */}
                  <div className="flex items-center justify-between pb-3 border-b border-black/5 dark:border-white/10 mb-3">
                    <div className="flex items-center gap-2">
                      <span
                        onMouseDown={handleTouchStart}
                        onMouseUp={(e) => handleVerseTapOrLongPress(verse, e)}
                        onTouchStart={handleTouchStart}
                        onTouchEnd={(e) => handleVerseTapOrLongPress(verse, e)}
                        className={`w-8 h-8 rounded-full font-extrabold text-sm flex items-center justify-center transition-colors shadow-xs active:scale-95 ${
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
                        onClick={() => { onPlayVerseAudio(verse); triggerHaptic(15); }}
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
                        onClick={() => { onToggleBookmark(verse.numberInQuran); triggerHaptic(20); }}
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
                  {translationMode === 'arabic' && (
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

                  {/* Kurdish/English Translation based on appLanguage */}
                  {translationMode === 'kurdish' && (
                    <div
                      dir={appLanguage === 'en' ? 'ltr' : 'rtl'}
                      className={`w-full ${appLanguage === 'en' ? 'text-left font-sans text-sm' : 'text-right kurdish-text text-lg'} text-emerald-900 dark:text-emerald-200 mt-2 p-3 sm:p-4 rounded-[16px]`}
                      style={{
                        textAlign: appLanguage === 'en' ? 'left' : 'justify',
                        textAlignLast: appLanguage === 'en' ? 'left' : 'right',
                        textJustify: 'inter-word',
                        direction: appLanguage === 'en' ? 'ltr' : 'rtl',
                        width: '100%',
                        wordSpacing: 'normal',
                        overflowX: 'hidden',
                        fontSize: `${appLanguage === 'en' ? 14 : kurdishFontSize}px`,
                        lineHeight: appLanguage === 'en' ? '1.5' : '2.0',
                      }}
                    >
                      <span className={`text-[11px] font-bold text-emerald-600 dark:text-emerald-400 block mb-1 ${appLanguage === 'en' ? 'uppercase' : ''}`}>
                        {appLanguage === 'en' ? t.englishTranslation : t.kurdishTranslation} ﴿{toLocalizedNumeral(verse.numberInSurah, appLanguage)}﴾
                      </span>
                      {appLanguage === 'en' ? (verse.english || verse.kurdish) : (verse.kurdish || getCleanArabicText(verse))}
                    </div>
                  )}

                  {/* English Translation */}
                  {false && verse && (
                    <div className="w-full text-left text-sm text-slate-600 dark:text-slate-300 mt-2 p-3 rounded-[14px] font-sans">
                      <span className="text-[10px] uppercase font-bold text-slate-500 block mb-0.5">{t.englishTranslation}</span>
                      {verse?.english}
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        )}

        {/* Footer Page Number Badge removed per user request */}
      </div>

      {/* Verse Detail / Action Pop-up Modal when tapping verse in Page Mode */}
      {selectedVerseForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm animate-in fade-in duration-200">
          <div className={`w-full max-w-lg p-6 ${cardGlassClass}`}>
            
            <div className="flex items-center justify-between pb-3 border-b border-black/5 dark:border-white/10 mb-4">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/15 px-3 py-1 rounded-full">
                {t.surahHeader(
                  appLanguage === 'en' ? currentSurah.englishName : currentSurah.name,
                  toLocalizedNumeral(selectedVerseForModal.numberInSurah, appLanguage)
                )}
              </span>
              <button
                onClick={() => { setSelectedVerseForModal(null); triggerHaptic(5); }}
                className="text-xs font-bold px-2.5 py-1 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10"
              >
                {t.close} ✕
              </button>
            </div>

            {/* Arabic */}
            <div dir="rtl" className="text-2xl uthmani-text text-emerald-900 dark:text-emerald-200 mb-4 leading-relaxed">
              {selectedVerseForModal.text}
            </div>

            {/* Kurdish/English Translation based on appLanguage */}
            {translationMode === 'kurdish' && (
              <div dir={appLanguage === 'en' ? 'ltr' : 'rtl'} className={`${appLanguage === 'en' ? 'text-sm font-sans' : 'text-lg kurdish-text'} text-slate-800 dark:text-slate-200 bg-emerald-500/10 p-3 rounded-[16px] mb-3`}>
                <span className={`text-[11px] font-bold text-emerald-600 dark:text-emerald-400 block mb-1 ${appLanguage === 'en' ? 'uppercase' : ''}`}>
                  {appLanguage === 'en' ? t.englishTranslation : t.kurdishTranslation}
                </span>
                {appLanguage === 'en' ? selectedVerseForModal.english : selectedVerseForModal.kurdish}
              </div>
            )}

            {/* Action Bar */}
            <div className="flex items-center justify-around gap-2 pt-2 border-t border-black/10 dark:border-white/10">
              <button
                onClick={() => {
                  onPlayVerseAudio(selectedVerseForModal);
                  triggerHaptic(15);
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
                  triggerHaptic(20);
                }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/40 dark:bg-slate-800/60 font-semibold text-xs border border-white/50 text-slate-700 dark:text-slate-200 hover:bg-white/60"
              >
                <Bookmark className="w-3.5 h-3.5 text-amber-500" />
                <span>{t.bookmark}</span>
              </button>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(`${selectedVerseForModal.text}\n${selectedVerseForModal.kurdish}`);
                  triggerHaptic([10, 50, 10]);
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
