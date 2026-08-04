'use client';

import React, { useState, useRef } from 'react';
import { Search, ChevronRight } from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState<'surahs' | 'quarters' | 'juzs'>('surahs');
  const [searchQuery, setSearchQuery] = useState('');
  const partRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const cardGlassClass = themeConfig.cardGlass;

  // Filter surahs based on search query
  const filteredSurahs = SURAHS_LIST.filter(
    (s) =>
      s.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.name.includes(searchQuery) ||
      s.kurdishName.includes(searchQuery) ||
      s.number.toString() === searchQuery
  );

  // Group surahs by Juz/Part
  const groupedByJuz = filteredSurahs.reduce<Record<number, SurahMeta[]>>((acc, surah) => {
    if (!acc[surah.juz]) {
      acc[surah.juz] = [];
    }
    acc[surah.juz].push(surah);
    return acc;
  }, {});

  const scrollToPart = (partNum: number) => {
    const el = partRefs.current[partNum];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-4 pb-36 min-h-screen relative flex">
      
      {/* Main Content Column */}
      <div className="flex-1">

        {/* Surah List */}
        <div className={`rounded-[32px] overflow-hidden ${themeConfig.cardGlass} border-0`}>
          {filteredSurahs.map((surah) => {
            const isSelected = surah.number === currentSurahNumber;

            const activeRowClass = themeMode === 'dark'
              ? 'bg-white/10'
              : themeMode === 'cyan'
              ? 'bg-sky-200/50'
              : themeMode === 'green'
              ? 'bg-emerald-200/50'
              : themeMode === 'yellow'
              ? 'bg-amber-200/50'
              : 'bg-emerald-200/50';

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
                onClick={() => onSelectSurah(surah)}
                className={`w-full p-4 flex items-center justify-between cursor-pointer transition-all duration-200 ${hoverRowClass} ${
                  isSelected ? activeRowClass : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Surah Index Badge */}
                  <div
                    className={`w-8 h-8 rounded-full font-bold text-sm flex items-center justify-center transition-all shadow-xs ${
                      isSelected
                        ? themeMode === 'dark' ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-200'
                    }`}
                  >
                    {toLocalizedNumeral(surah.number, appLanguage)}
                  </div>

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
