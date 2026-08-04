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

        {/* Search Bar Input */}
        <div className="relative mb-6">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className={`w-full pl-10 pr-4 py-2.5 rounded-[16px] text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all bg-white/60 dark:bg-slate-800/60 border border-emerald-500/20 shadow-xs`}
          />
        </div>

        {/* Surah List Grouped by Parts / Juzs */}
        <div className="flex flex-col gap-6">
          {Object.entries(groupedByJuz).map(([juzNum, surahs]) => (
            <div
              key={juzNum}
              ref={(el) => {
                partRefs.current[Number(juzNum)] = el;
              }}
              className="flex flex-col"
            >
              {/* Part / Juz Header */}
              <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3 pt-2">
                {t.juzHeader(toLocalizedNumeral(juzNum, appLanguage))}
              </div>

              {/* Surah Items inside a single shared container box per Juz */}
              <div className={`rounded-[22px] overflow-hidden shadow-xs border border-emerald-500/20 bg-white/50 dark:bg-slate-800/50 divide-y divide-black/5 dark:divide-white/10`}>
                {surahs.map((surah) => {
                  const isSelected = surah.number === currentSurahNumber;
                  const revType = surah.revelationType === 'Meccan' ? t.meccan : t.medinan;

                  const activeRowClass = themeMode === 'dark'
                    ? 'bg-slate-700/80 ring-1 ring-white/20'
                    : themeMode === 'cyan'
                    ? 'bg-sky-500/25 ring-1 ring-sky-400'
                    : themeMode === 'yellow'
                    ? 'bg-amber-500/25 ring-1 ring-amber-400'
                    : 'bg-emerald-500/25 ring-1 ring-emerald-400';

                  const hoverRowClass = themeMode === 'dark'
                    ? 'hover:bg-slate-700/40'
                    : themeMode === 'cyan'
                    ? 'hover:bg-sky-500/10'
                    : themeMode === 'yellow'
                    ? 'hover:bg-amber-500/10'
                    : 'hover:bg-emerald-500/10';

                  return (
                    <div
                      key={surah.number}
                      onClick={() => onSelectSurah(surah)}
                      className={`w-full p-4 flex items-center justify-between cursor-pointer transition-all duration-200 ${hoverRowClass} ${
                        isSelected ? activeRowClass : ''
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        {/* Surah Index Badge (Vertical Oval: w-8 h-10 rounded-[50%]) */}
                        <div
                          className={`w-8 h-10 rounded-[50%] font-bold text-sm flex items-center justify-center transition-all shadow-xs ${
                            isSelected
                              ? themeConfig.surahBadgeActive
                              : themeConfig.surahBadgeInactive
                          }`}
                        >
                          {toLocalizedNumeral(surah.number, appLanguage)}
                        </div>

                        {/* Surah Meta */}
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            {appLanguage === 'en' ? (
                              <span className="font-bold text-base text-slate-900 dark:text-white">
                                {surah.englishName}
                              </span>
                            ) : appLanguage === 'ku' ? (
                              <span className="font-bold text-base text-slate-900 dark:text-white kurdish-text">
                                {surah.kurdishName}
                              </span>
                            ) : (
                              <span className="font-bold text-base text-slate-900 dark:text-white">
                                {surah.name}
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
                            {t.surahSubtitle(
                              toLocalizedNumeral(surah.page, appLanguage),
                              toLocalizedNumeral(surah.numberOfAyahs, appLanguage),
                              revType
                            )}
                          </span>
                        </div>
                      </div>

                      <ChevronRight className="w-5 h-5 text-slate-400" />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
