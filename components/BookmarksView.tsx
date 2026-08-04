'use client';

import React from 'react';
import { Bookmark, Trash2, BookOpen } from 'lucide-react';
import { Verse, SAMPLE_VERSES_DATA } from '@/data/quranData';
import { Language, TRANSLATIONS, toLocalizedNumeral } from '@/data/translations';

interface BookmarksViewProps {
  bookmarkedVerseNumbers: number[];
  onToggleBookmark: (num: number) => void;
  onSelectVerse: (surahNumber: number, page: number) => void;
  themeMode: 'light' | 'dark' | 'ice';
  appLanguage: Language;
}

export const BookmarksView: React.FC<BookmarksViewProps> = ({
  bookmarkedVerseNumbers,
  onToggleBookmark,
  onSelectVerse,
  themeMode,
  appLanguage,
}) => {
  const t = TRANSLATIONS[appLanguage];
  const isDark = themeMode === 'dark';
  const isIce = themeMode === 'ice';

  const cardGlassClass = isDark
    ? 'liquid-glass-dark text-slate-100'
    : isIce
    ? 'liquid-glass-ice text-slate-900'
    : 'liquid-glass-light text-slate-900';

  // Gather saved verses from sample database
  const allVerses: Verse[] = Object.values(SAMPLE_VERSES_DATA).flat();
  const savedVerses = allVerses.filter((v) => bookmarkedVerseNumbers.includes(v.numberInQuran));

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-4 pb-36 min-h-screen">
      
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {t.bookmarksTitle}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {t.savedVersesCount(toLocalizedNumeral(savedVerses.length, appLanguage))}
          </p>
        </div>
        <div className="w-10 h-10 rounded-full bg-amber-500/15 text-amber-500 flex items-center justify-center border border-amber-500/30">
          <Bookmark className="w-5 h-5 fill-amber-500" />
        </div>
      </div>

      {savedVerses.length === 0 ? (
        <div className={`rounded-[24px] p-8 text-center ${cardGlassClass}`}>
          <Bookmark className="w-12 h-12 text-slate-400 mx-auto mb-3 opacity-50" />
          <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200">{t.noBookmarksTitle}</h3>
          <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1">
            {t.noBookmarksDesc}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {savedVerses.map((verse) => (
            <div
              key={verse.numberInQuran}
              className={`rounded-[22px] p-4 sm:p-5 shadow-sm transition-all border border-white/40 ${cardGlassClass}`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-black/5 dark:border-white/10 mb-3">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/15 px-3 py-1 rounded-full">
                  {t.verses} {toLocalizedNumeral(verse.numberInSurah, appLanguage)} • {t.pageBadge} {toLocalizedNumeral(verse.page, appLanguage)}
                </span>

                <button
                  onClick={() => onToggleBookmark(verse.numberInQuran)}
                  className="p-1.5 rounded-full hover:bg-rose-500/20 text-rose-500 transition-all"
                  title={t.removeBookmark}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Arabic */}
              <div dir="rtl" className="text-xl sm:text-2xl uthmani-text text-slate-900 dark:text-slate-100 mb-2">
                {verse.text}
              </div>

              {/* Kurdish / English depending on language */}
              <div dir={appLanguage === 'en' ? 'ltr' : 'rtl'} className="text-base kurdish-text text-emerald-800 dark:text-emerald-300 mt-1">
                {appLanguage === 'en' ? verse.english : verse.kurdish}
              </div>

              {/* Jump Button */}
              <button
                onClick={() => onSelectVerse(1, verse.page)}
                className="mt-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold text-xs border border-emerald-500/30 hover:bg-emerald-500/30 transition-all"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>{t.jumpToPage(toLocalizedNumeral(verse.page, appLanguage))}</span>
              </button>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
