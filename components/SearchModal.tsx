'use client';

import React, { useState } from 'react';
import { Search, X, BookOpen, Loader2 } from 'lucide-react';
import { IconBox } from '@/components/IconBox';
import { triggerHaptic } from '@/lib/haptics';
import { SURAHS_LIST, SurahMeta, Verse } from '@/data/quranData';
import { Language, TRANSLATIONS, toLocalizedNumeral } from '@/data/translations';
import { ThemeMode, getThemeConfig } from '@/lib/themeUtils';
import { useQuranSearch, HighlightedText } from '@/lib/searchIndex';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSurah: (surah: SurahMeta, page: number) => void;
  themeMode: ThemeMode;
  appLanguage: Language;
  fetchedVersesMap?: Record<number, Verse[]>;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectSurah,
  themeMode,
  appLanguage,
}) => {
  const [query, setQuery] = useState('');

  const t = TRANSLATIONS[appLanguage];
  const themeConfig = getThemeConfig(themeMode);
  const cardGlassClass = themeConfig.modalGlass;

  const {
    matchingSurahs,
    matchingVerses,
    searchWords,
    isSearching,
    debouncedQuery,
  } = useQuranSearch(query);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/40 backdrop-blur-md animate-in fade-in duration-200">
      <div className={`w-full max-w-2xl rounded-2xl p-6 shadow-2xl ${cardGlassClass} border border-white/40 max-h-[80vh] flex flex-col`}>
        
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 pb-4 border-b border-black/10 dark:border-white/10">
          <IconBox domain="search" size="md">
            {isSearching ? (
              <Loader2 className="w-5 h-5 text-sky-500 animate-spin" />
            ) : (
              <Search className="w-5 h-5 text-sky-500" />
            )}
          </IconBox>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            autoFocus
            dir={appLanguage === 'en' ? 'ltr' : 'rtl'}
            className="w-full bg-transparent text-base font-medium focus:outline-none text-slate-900 dark:text-white placeholder:text-slate-400"
          />
          <button
            onClick={() => { triggerHaptic(10); onClose(); }}
            className="w-8 h-8 rounded-xl bg-slate-200/50 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-300 transition-all font-bold"
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

          {debouncedQuery.trim() && !isSearching && matchingSurahs.length === 0 && matchingVerses.length === 0 && (
            <div className="text-center py-8 text-slate-400 text-sm">
              {t.noResults}
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
                      triggerHaptic(10);
                      onSelectSurah(surah, surah.page);
                      onClose();
                    }}
                    className="p-3 rounded-xl bg-white/40 dark:bg-slate-800/40 border border-white/40 dark:border-white/10 hover:bg-cyan-500/15 cursor-pointer flex items-center justify-between transition-all"
                  >
                    <div className="flex items-center gap-2.5">
                      <IconBox domain="search" size="sm">
                        <span className="font-extrabold text-xs">{toLocalizedNumeral(surah.number, appLanguage)}</span>
                      </IconBox>
                      <div>
                        <div className="font-bold text-sm text-slate-900 dark:text-white">
                          {appLanguage === 'en' ? surah.englishName : (appLanguage === 'ku' ? surah.kurdishName : surah.name)}
                        </div>
                        <div className="text-xs text-slate-500">
                          {surah.name} • {t.pageBadge} {toLocalizedNumeral(surah.page, appLanguage)}
                        </div>
                      </div>
                    </div>
                    <span className="font-bold text-cyan-600 dark:text-cyan-400 uthmani-text text-base">{surah.name}</span>
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
                {matchingVerses.map((item) => {
                  const { verse, surahNumber } = item;
                  const surah = SURAHS_LIST.find((s) => s.number === surahNumber) || SURAHS_LIST[0];

                  return (
                    <div
                      key={verse.numberInQuran}
                      onClick={() => {
                        triggerHaptic(10);
                        onSelectSurah(surah, verse.page);
                        onClose();
                      }}
                      className="p-4 rounded-xl bg-white/40 dark:bg-slate-800/40 border border-white/40 dark:border-white/10 hover:bg-cyan-500/15 cursor-pointer transition-all"
                    >
                      <div className="flex items-center justify-between text-xs text-cyan-600 dark:text-cyan-400 font-bold mb-1">
                        <div className="flex items-center gap-2">
                          <IconBox domain="search" size="sm">
                            <span className="font-extrabold text-xs">{toLocalizedNumeral(verse.numberInSurah, appLanguage)}</span>
                          </IconBox>
                          <span className="font-bold text-sm">
                            {appLanguage === 'ku' ? item.surahKurdishName : (appLanguage === 'en' ? item.surahEnglishName : item.surahName)}
                            {' • '}{t.verses} {toLocalizedNumeral(verse.numberInSurah, appLanguage)}
                            {' • '}{t.pageBadge} {toLocalizedNumeral(verse.page, appLanguage)}
                          </span>
                        </div>
                        <BookOpen className="w-3.5 h-3.5" />
                      </div>
                      <div dir="rtl" className="text-lg uthmani-text text-slate-900 dark:text-slate-100 mb-1 leading-relaxed">
                        <HighlightedText text={verse.text} searchWords={searchWords} isArabic={true} />
                      </div>
                      <div dir="rtl" className="text-sm kurdish-text text-slate-600 dark:text-slate-300 leading-relaxed">
                        <HighlightedText text={verse.kurdish} searchWords={searchWords} isArabic={false} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
