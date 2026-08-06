'use client';

import React, { useState } from 'react';
import { Search, ChevronRight } from 'lucide-react';
import { IconBox } from '@/components/IconBox';
import { triggerHaptic } from '@/lib/haptics';
import { SURAHS_LIST, SurahMeta } from '@/data/quranData';
import { Language, TRANSLATIONS, toLocalizedNumeral } from '@/data/translations';
import { ThemeMode, getThemeConfig } from '@/lib/themeUtils';

interface ContentsViewProps {
  onSelectSurah: (surah: SurahMeta) => void;
  currentSurahNumber: number;
  themeMode: ThemeMode;
  appLanguage: Language;
}

export const ContentsView: React.FC<ContentsViewProps> = ({
  onSelectSurah,
  currentSurahNumber,
  themeMode,
  appLanguage,
}) => {
  const t = TRANSLATIONS[appLanguage];
  const themeConfig = getThemeConfig(themeMode);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter surahs based on search query
  const filteredSurahs = SURAHS_LIST.filter(
    (s) =>
      s.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.name.includes(searchQuery) ||
      s.kurdishName.includes(searchQuery) ||
      s.number.toString() === searchQuery
  );

  const getBadgeColorClass = () => {
    if (themeMode === 'dark') return 'text-white dark:text-white';
    if (themeMode === 'cyan') return 'text-cyan-600 dark:text-cyan-400';
    if (themeMode === 'green') return 'text-emerald-600 dark:text-emerald-400';
    if (themeMode === 'yellow') return 'text-amber-600 dark:text-amber-400';
    return 'text-emerald-600 dark:text-emerald-400'; // white/default theme
  };

  const getDomainForTheme = () => {
    if (themeMode === 'dark') return 'neutral';
    if (themeMode === 'cyan') return 'search';
    if (themeMode === 'green') return 'contents';
    if (themeMode === 'yellow') return 'themes';
    return 'contents';
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-4 pb-36 min-h-screen relative flex">
      
      {/* Main Content Column */}
      <div className="flex-1">

        {/* Surah List */}
        <div className={`rounded-2xl overflow-hidden ${themeConfig.cardGlass} border-0`}>
          {filteredSurahs.map((surah) => {
            const hoverRowClass = themeMode === 'dark'
              ? 'hover:bg-white/5'
              : themeMode === 'cyan'
              ? 'hover:bg-sky-100/50'
              : themeMode === 'green'
              ? 'hover:bg-emerald-100/50'
              : themeMode === 'yellow'
              ? 'hover:bg-amber-100/50'
              : 'hover:bg-emerald-100/50';

            return (
              <div
                key={surah.number}
                onClick={() => {
                  triggerHaptic(10);
                  onSelectSurah(surah);
                }}
                className={`w-full p-4 flex items-center justify-between cursor-pointer transition-all duration-200 ${hoverRowClass}`}
              >
                <div className="flex items-center gap-4">
                  {/* Surah Index Badge */}
                  <IconBox domain={getDomainForTheme()} size="sm">
                    <span className={`font-extrabold text-sm ${getBadgeColorClass()}`}>
                      {toLocalizedNumeral(surah.number, appLanguage)}
                    </span>
                  </IconBox>

                  {/* Surah Name Only */}
                  <span className={`font-bold text-base kurdish-text ${themeMode === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    {appLanguage === 'en' ? surah.englishName : appLanguage === 'ku' ? surah.kurdishName : surah.name}
                  </span>
                </div>

                <ChevronRight className="w-5 h-5 text-slate-400 dark:text-slate-500" />
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
