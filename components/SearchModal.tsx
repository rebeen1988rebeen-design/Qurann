'use client';

import React, { useState } from 'react';
import { Search, X, BookOpen } from 'lucide-react';
import { SURAHS_LIST, SAMPLE_VERSES_DATA, SurahMeta, Verse } from '@/data/quranData';
import { Language, TRANSLATIONS, toLocalizedNumeral } from '@/data/translations';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSurah: (surah: SurahMeta, page: number) => void;
  themeMode: 'light' | 'dark' | 'ice';
  appLanguage: Language;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectSurah,
  themeMode,
  appLanguage,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const t = TRANSLATIONS[appLanguage];
  const isDark = themeMode === 'dark';
  const isIce = themeMode === 'ice';

  const cardGlassClass = isDark
    ? 'liquid-glass-dark text-slate-100'
    : isIce
    ? 'liquid-glass-ice text-slate-900'
    : 'liquid-glass-light text-slate-900';

  // Search Surahs
  const matchingSurahs = query.trim()
    ? SURAHS_LIST.filter(
        (s) =>
          s.englishName.toLowerCase().includes(query.toLowerCase()) ||
          s.name.includes(query) ||
          s.kurdishName.includes(query)
      )
    : [];

  // Search Verses
  const allVerses: Verse[] = Object.values(SAMPLE_VERSES_DATA).flat();
  const matchingVerses = query.trim()
    ? allVerses.filter(
        (v) =>
          v.text.includes(query) ||
          v.kurdish.includes(query) ||
          v.english.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/40 backdrop-blur-md animate-in fade-in duration-200">
      <div className={`w-full max-w-2xl rounded-[24px] p-6 shadow-2xl ${cardGlassClass} border border-white/40 max-h-[80vh] flex flex-col`}>
        
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 pb-4 border-b border-black/10 dark:border-white/10">
          <Search className="w-5 h-5 text-emerald-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            autoFocus
            className="w-full bg-transparent text-base font-medium focus:outline-none text-slate-900 dark:text-white placeholder:text-slate-400"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-slate-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="flex-1 overflow-y-auto pt-4 space-y-4">
          {!query.trim() && (
            <div className="text-center py-8 text-slate-400 text-sm">
              {t.searchPlaceholder}
            </div>
          )}

          {/* Surah Matches */}
          {matchingSurahs.length > 0 && (
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                {t.tabSurahs} ({toLocalizedNumeral(matchingSurahs.length, appLanguage)})
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {matchingSurahs.map((surah) => (
                  <div
                    key={surah.number}
                    onClick={() => {
                      onSelectSurah(surah, surah.page);
                      onClose();
                    }}
                    className="p-3 rounded-[16px] bg-white/40 dark:bg-slate-800/40 border border-white/40 dark:border-white/10 hover:bg-emerald-500/15 cursor-pointer flex items-center justify-between transition-all"
                  >
                    <div>
                      <div className="font-bold text-sm text-slate-900 dark:text-white">
                        {appLanguage === 'en' ? surah.englishName : surah.name}
                      </div>
                      <div className="text-xs text-slate-500">
                        {surah.kurdishName} • {t.pageBadge} {toLocalizedNumeral(surah.page, appLanguage)}
                      </div>
                    </div>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 uthmani-text text-base">{surah.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Verse Matches */}
          {matchingVerses.length > 0 && (
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                {t.verses} ({toLocalizedNumeral(matchingVerses.length, appLanguage)})
              </div>
              <div className="flex flex-col gap-3">
                {matchingVerses.map((verse) => (
                  <div
                    key={verse.numberInQuran}
                    onClick={() => {
                      const surah = SURAHS_LIST.find((s) => s.page <= verse.page) || SURAHS_LIST[0];
                      onSelectSurah(surah, verse.page);
                      onClose();
                    }}
                    className="p-4 rounded-[18px] bg-white/40 dark:bg-slate-800/40 border border-white/40 dark:border-white/10 hover:bg-emerald-500/15 cursor-pointer transition-all"
                  >
                    <div className="flex items-center justify-between text-xs text-emerald-600 font-bold mb-1">
                      <span>{t.verses} {toLocalizedNumeral(verse.numberInSurah, appLanguage)} • {t.pageBadge} {toLocalizedNumeral(verse.page, appLanguage)}</span>
                      <BookOpen className="w-3.5 h-3.5" />
                    </div>
                    <div dir="rtl" className="text-lg uthmani-text text-slate-900 dark:text-slate-100 mb-1">
                      {verse.text}
                    </div>
                    <div dir={appLanguage === 'en' ? 'ltr' : 'rtl'} className="text-sm kurdish-text text-slate-600 dark:text-slate-300">
                      {appLanguage === 'en' ? verse.english : verse.kurdish}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
