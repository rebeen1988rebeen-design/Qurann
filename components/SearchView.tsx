'use client';

import React, { useState } from 'react';
import { Search, BookOpen } from 'lucide-react';
import { SURAHS_LIST, SAMPLE_VERSES_DATA, SurahMeta, Verse } from '@/data/quranData';
import { Language, TRANSLATIONS, toLocalizedNumeral } from '@/data/translations';
import { ThemeMode, getThemeConfig } from '@/lib/themeUtils';

interface SearchViewProps {
  onSelectSurah: (surah: SurahMeta, page: number) => void;
  themeMode: ThemeMode;
  appLanguage: Language;
}

export const SearchView: React.FC<SearchViewProps> = ({
  onSelectSurah,
  themeMode,
  appLanguage,
}) => {
  const [query, setQuery] = useState('');
  const t = TRANSLATIONS[appLanguage];
  const themeConfig = getThemeConfig(themeMode);

  const cardGlassClass = themeConfig.cardGlass;

  // Search Surahs
  const matchingSurahs = query.trim()
    ? SURAHS_LIST.filter(
        (s) =>
          s.englishName.toLowerCase().includes(query.toLowerCase()) ||
          s.name.includes(query) ||
          s.kurdishName.includes(query) ||
          String(s.number).includes(query)
      )
    : [];

  // Search Verses across available sample/fetched verses
  const allVerses: Verse[] = Object.values(SAMPLE_VERSES_DATA).flat();
  const matchingVerses = query.trim()
    ? allVerses.filter(
        (v) =>
          v.text.includes(query) ||
          v.kurdish.includes(query) ||
          v.english.toLowerCase().includes(query.toLowerCase()) ||
          String(v.numberInSurah).includes(query)
      )
    : [];

  return (
    <div className="w-full max-w-4xl mx-auto px-3 py-4 pb-44 flex flex-col items-center">
      <div className={`w-full rounded-[24px] p-6 shadow-xl ${cardGlassClass} flex flex-col min-h-[500px]`}>
        
        {/* Header Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold tracking-tight mb-1">
            {appLanguage === 'ku' ? 'گەڕان لە قورئانی پیرۆزدا' : appLanguage === 'ar' ? 'البحث في القرآن الكريم' : 'Search Holy Quran'}
          </h1>
          <p className="text-sm opacity-80">
            {appLanguage === 'ku' ? 'بەدوای سورەت، ئایەت، یان وشەکاندا بە زمانی کوردی و عەرەبی بگەرێ' : appLanguage === 'ar' ? 'ابحث عن السور والآيات والكلمات باللغتين العربية والكردية' : 'Search for surahs, ayahs, and keywords in Kurdish and Arabic'}
          </p>
        </div>

        {/* Search Input Bar */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-emerald-600">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            autoFocus
            dir={appLanguage === 'en' ? 'ltr' : 'rtl'}
            className="w-full pl-4 pr-12 py-3.5 rounded-2xl bg-white/60 dark:bg-slate-800/60 border border-emerald-500/30 text-base font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
          />
        </div>

        {/* Results Container */}
        <div className="flex-1 space-y-6">
          {!query.trim() && (
            <div className="text-center py-16 opacity-60 text-base flex flex-col items-center justify-center gap-3">
              <Search className="w-12 h-12 stroke-[1.5] text-emerald-500/50" />
              <span>{t.searchPlaceholder}</span>
            </div>
          )}

          {query.trim() && matchingSurahs.length === 0 && matchingVerses.length === 0 && (
            <div className="text-center py-16 opacity-70 text-base">
              {t.noResults}
            </div>
          )}

          {/* Surah Matches */}
          {matchingSurahs.length > 0 && (
            <div>
              <div className="text-xs font-extrabold opacity-70 uppercase tracking-wider mb-3">
                {t.tabSurahs} ({toLocalizedNumeral(matchingSurahs.length, appLanguage)})
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {matchingSurahs.map((surah) => (
                  <div
                    key={surah.number}
                    onClick={() => onSelectSurah(surah, surah.page)}
                    className="p-4 rounded-[18px] bg-white/50 dark:bg-slate-800/50 hover:bg-emerald-500/20 cursor-pointer flex items-center justify-between transition-all border border-emerald-500/20 shadow-xs"
                  >
                    <div>
                      <div className="font-bold text-base">
                        {toLocalizedNumeral(surah.number, appLanguage)}. {appLanguage === 'en' ? surah.englishName : surah.name}
                      </div>
                      <div className="text-xs opacity-75 mt-0.5">
                        {surah.kurdishName} • {t.pageBadge} {toLocalizedNumeral(surah.page, appLanguage)} • {surah.numberOfAyahs} {t.verses}
                      </div>
                    </div>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 uthmani-text text-xl">{surah.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Verse Matches */}
          {matchingVerses.length > 0 && (
            <div>
              <div className="text-xs font-extrabold opacity-70 uppercase tracking-wider mb-3">
                {t.verses} ({toLocalizedNumeral(matchingVerses.length, appLanguage)})
              </div>
              <div className="flex flex-col gap-3">
                {matchingVerses.map((verse) => (
                  <div
                    key={verse.numberInQuran}
                    onClick={() => {
                      const surah = SURAHS_LIST.find((s) => s.page <= verse.page) || SURAHS_LIST[0];
                      onSelectSurah(surah, verse.page);
                    }}
                    className="p-4 rounded-[18px] bg-white/50 dark:bg-slate-800/50 hover:bg-emerald-500/20 cursor-pointer transition-all border border-emerald-500/20 shadow-xs"
                  >
                    <div className="flex items-center justify-between text-xs text-emerald-600 font-bold mb-2">
                      <span>{t.verses} {toLocalizedNumeral(verse.numberInSurah, appLanguage)} • {t.pageBadge} {toLocalizedNumeral(verse.page, appLanguage)}</span>
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div dir="rtl" className="text-lg uthmani-text mb-2">
                      {verse.text}
                    </div>
                    <div dir="rtl" className="text-sm kurdish-text opacity-90">
                      {verse.kurdish}
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
