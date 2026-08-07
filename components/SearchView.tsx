'use client';

import React, { useState } from 'react';
import { Search, BookOpen } from 'lucide-react';
import { IconBox } from '@/components/IconBox';
import { triggerHaptic } from '@/lib/haptics';
import { SURAHS_LIST, SAMPLE_VERSES_DATA, SurahMeta, Verse } from '@/data/quranData';
import { Language, TRANSLATIONS, toLocalizedNumeral } from '@/data/translations';
import { ThemeMode, getThemeConfig } from '@/lib/themeUtils';

interface SearchViewProps {
  onSelectSurah: (surah: SurahMeta, page: number) => void;
  themeMode: ThemeMode;
  appLanguage: Language;
  fetchedVersesMap?: Record<number, Verse[]>;
}

export const SearchView: React.FC<SearchViewProps> = ({
  onSelectSurah,
  themeMode,
  appLanguage,
  fetchedVersesMap,
}) => {
  const [query, setQuery] = useState('');
  const t = TRANSLATIONS[appLanguage];
  const themeConfig = getThemeConfig(themeMode);

  const normalize = (text: string) => {
    if (!text) return '';
    return text
      .toLowerCase()
      .normalize('NFD')
      // Convert Alef Wasla (\u0671) and other Alef variants to standard Alef ('ا') FIRST
      .replace(/[أإآٱ]/g, 'ا')
      // Convert Dagger Alef (\u0670) to standard Alef ('ا')
      .replace(/\u0670/g, 'ا')
      // Remove diacritics / vowel signs (Tashkeel)
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[\u064b-\u065f\u065c-\u065e\u06d6-\u06ed]/g, '')
      // Normalize Ta Marbuta 'ة' to 'ه'
      .replace(/ة/g, 'ه')
      // Normalize Ya / Alef Maksura 'ى' to 'ي'
      .replace(/ى/g, 'ي')
      // Normalize common spelling variation 'رحمان' -> 'رحمن' so both match
      .replace(/رحمان/g, 'رحمن')
      // Normalize extra spaces
      .replace(/\s+/g, ' ')
      .trim();
  };

  const cardGlassClass = themeConfig.cardGlass;

  const normalizedQuery = normalize(query);
  const searchWords = normalizedQuery.split(' ').filter(w => w.length > 0);

  // Search Surahs
  const matchingSurahs = React.useMemo(() => {
    if (!query.trim()) return [];
    return SURAHS_LIST.filter(
      (s) =>
        normalize(s.englishName).includes(normalizedQuery) ||
        normalize(s.name).includes(normalizedQuery) ||
        normalize(s.kurdishName).includes(normalizedQuery) ||
        String(s.number).includes(normalizedQuery)
    );
  }, [query, normalizedQuery]);

  // Combined search dataset across sample verses and any fetched surahs
  const allVerses = React.useMemo(() => {
    const combinedMap: Record<number, Verse[]> = {
      ...SAMPLE_VERSES_DATA,
      ...(fetchedVersesMap || {}),
    };
    return Object.values(combinedMap).flat();
  }, [fetchedVersesMap]);

  const matchingVerses = React.useMemo(() => {
    if (!query.trim() || searchWords.length === 0) return [];
    return allVerses.filter((v) => {
      const nText = normalize(v.text);
      const nKurdish = normalize(v.kurdish);
      const nEnglish = normalize(v.english);
      return searchWords.every(w => nText.includes(w) || nKurdish.includes(w) || nEnglish.includes(w));
    });
  }, [query, allVerses, searchWords]);

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-4 pb-36 min-h-screen">
      
      {/* Top Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-base font-bold text-slate-900 dark:text-white">
          {t.searchTitle}
        </h1>
      </div>

      {/* Search Input Bar */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-sky-500" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.searchPlaceholder}
          autoFocus
          dir={appLanguage === 'en' ? 'ltr' : 'rtl'}
          className="w-full pl-4 pr-12 py-3.5 rounded-2xl bg-white/60 dark:bg-slate-800/60 border border-sky-500/30 text-base font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm text-slate-900 dark:text-white"
        />
      </div>

      {/* Results Container */}
      <div className="space-y-6">
        {!query.trim() && (
          <div className={`rounded-2xl p-8 text-center ${cardGlassClass}`}>
            <IconBox domain="search" size="lg" className="mx-auto mb-3">
              <Search className="w-6 h-6" />
            </IconBox>
            <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200">{t.searchTitle}</h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1">
              {t.searchPlaceholder}
            </p>
          </div>
        )}

        {query.trim() && matchingSurahs.length === 0 && matchingVerses.length === 0 && (
          <div className={`rounded-2xl p-8 text-center ${cardGlassClass}`}>
            <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200">{t.noResults}</h3>
          </div>
        )}

        {/* Surah Matches */}
        {matchingSurahs.length > 0 && (
          <div>
            <div className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-3">
              {t.tabSurahs} ({toLocalizedNumeral(matchingSurahs.length, appLanguage)})
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {matchingSurahs.map((surah) => (
                <div
                  key={surah.number}
                  onClick={() => {
                    triggerHaptic(10);
                    onSelectSurah(surah, surah.page);
                  }}
                  className="p-4 rounded-xl bg-white/50 dark:bg-slate-800/50 hover:bg-sky-500/15 cursor-pointer flex items-center justify-between transition-all border border-sky-500/20 shadow-xs"
                >
                  <div className="flex items-center gap-3">
                    <IconBox domain="search" size="sm">
                      <span className="font-extrabold text-xs">{toLocalizedNumeral(surah.number, appLanguage)}</span>
                    </IconBox>
                    <div>
                      <div className="font-bold text-base text-slate-900 dark:text-white">
                        {appLanguage === 'en' ? surah.englishName : surah.name}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {surah.kurdishName} • {t.pageBadge} {toLocalizedNumeral(surah.page, appLanguage)} • {surah.numberOfAyahs} {t.verses}
                      </div>
                    </div>
                  </div>
                  <span className="font-bold uthmani-text text-xl text-sky-600 dark:text-sky-400">{surah.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Verse Matches */}
        {matchingVerses.length > 0 && (
          <div>
            <div className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-3">
              {t.verses} ({toLocalizedNumeral(matchingVerses.length, appLanguage)})
            </div>
            <div className="flex flex-col gap-3">
              {matchingVerses.map((verse) => (
                <div
                  key={verse.numberInQuran}
                  onClick={() => {
                    triggerHaptic(10);
                    const surah = SURAHS_LIST.find((s) => s.page <= verse.page) || SURAHS_LIST[0];
                    onSelectSurah(surah, verse.page);
                  }}
                  className="p-4 rounded-xl bg-white/50 dark:bg-slate-800/50 hover:bg-sky-500/15 cursor-pointer transition-all border border-sky-500/20 shadow-xs"
                >
                  <div className="flex items-center justify-between text-xs text-sky-600 dark:text-sky-400 font-bold mb-2">
                    <div className="flex items-center gap-2">
                      <IconBox domain="search" size="sm">
                        <span className="font-extrabold text-xs">{toLocalizedNumeral(verse.numberInSurah, appLanguage)}</span>
                      </IconBox>
                      <span>{t.verses} • {t.pageBadge} {toLocalizedNumeral(verse.page, appLanguage)}</span>
                    </div>
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div dir="rtl" className="text-lg uthmani-text mb-2 text-slate-900 dark:text-white">
                    {verse.text}
                  </div>
                  <div dir="rtl" className="text-sm kurdish-text text-slate-600 dark:text-slate-300">
                    {verse.kurdish}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default SearchView;
