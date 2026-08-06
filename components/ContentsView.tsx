'use client';

import React, { useState } from 'react';
import { Search, ChevronRight } from 'lucide-react';
import { SurahCircle } from '@/components/SurahCircle';
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
  const [searchQuery, setSearchQuery] = useState('');

  // Filter surahs based on search query
  const filteredSurahs = SURAHS_LIST.filter(
    (s) =>
      s.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.name.includes(searchQuery) ||
      s.kurdishName.includes(searchQuery) ||
      s.number.toString() === searchQuery
  );

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-4 pb-36 min-h-screen relative flex">
      
      {/* Main Content Column */}
      <div className="flex-1">

        {/* Surah List */}
        <div className="flex flex-col">
          {filteredSurahs.map((surah) => {
            const revelationType = surah.revelationType === 'Meccan' ? t.meccan : t.medinan;
            const subtext = `${t.page} ${toLocalizedNumeral(surah.page, appLanguage)} • ${t.part} ${toLocalizedNumeral(surah.juz, appLanguage)} • ${revelationType}`;

            return (
              <div
                key={surah.number}
                onClick={(e) => {
                  e.stopPropagation();
                  triggerHaptic(10);
                  onSelectSurah(surah);
                }}
                className="w-full p-4 flex items-center justify-between cursor-pointer transition-all duration-200 active:opacity-70"
              >
                <div className="flex items-center gap-4">
                  {/* Surah Index Badge - Using SurahCircle */}
                  <SurahCircle number={toLocalizedNumeral(surah.number, appLanguage)} themeMode={themeMode} />

                  {/* Surah Name & Info */}
                  <div className="flex flex-col gap-0.5">
                    <span className={`font-bold text-base ${themeMode === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      {appLanguage === 'en' ? surah.englishName : appLanguage === 'ku' ? surah.kurdishName : surah.name}
                    </span>
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400 opacity-70">
                      {subtext}
                    </span>
                  </div>
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
