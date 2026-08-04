'use client';

import React, { useState, useRef } from 'react';
import { Search, ChevronRight, BookOpen } from 'lucide-react';
import { SURAHS_LIST, SurahMeta } from '@/data/quranData';

interface ContentsViewProps {
  onSelectSurah: (surah: SurahMeta) => void;
  currentSurahNumber: number;
  themeMode: 'light' | 'dark' | 'ice';
}

export const ContentsView: React.FC<ContentsViewProps> = ({
  onSelectSurah,
  currentSurahNumber,
  themeMode,
}) => {
  const [activeTab, setActiveTab] = useState<'surahs' | 'quarters' | 'juzs'>('surahs');
  const [searchQuery, setSearchQuery] = useState('');
  const partRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const isDark = themeMode === 'dark';
  const isIce = themeMode === 'ice';

  const cardGlassClass = isDark
    ? 'liquid-glass-dark text-slate-100'
    : isIce
    ? 'liquid-glass-ice text-slate-900'
    : 'liquid-glass-light text-slate-900';

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
      <div className="flex-1 pr-6">
        
        {/* Top Segmented Control Switch matching Screenshot 3 */}
        <div className="w-full flex items-center justify-between mb-6">
          <div className="inline-flex p-1 rounded-full bg-slate-200/60 dark:bg-slate-800/60 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-inner">
            <button
              onClick={() => setActiveTab('surahs')}
              className={`px-6 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTab === 'surahs'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Sūrahs
            </button>
            <button
              onClick={() => setActiveTab('quarters')}
              className={`px-6 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTab === 'quarters'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Quarters
            </button>
            <button
              onClick={() => setActiveTab('juzs')}
              className={`px-6 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTab === 'juzs'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Juzs
            </button>
          </div>

          <button
            onClick={() => setActiveTab('surahs')}
            className="w-9 h-9 rounded-full bg-slate-200/60 dark:bg-slate-800/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 transition-all border border-white/40"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Large Header Title "Contents" */}
        <div className="mb-6">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Contents
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
            114 Surahs • 30 Juzs (Parts) • Madani Mushaf Index
          </p>
        </div>

        {/* Search Bar Input */}
        <div className="relative mb-6">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search surah name, number, or Kurdish..."
            className={`w-full pl-10 pr-4 py-2.5 rounded-[16px] text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all ${cardGlassClass}`}
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
              {/* Part / Juz Header matching Screenshot 3 */}
              <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3 pt-2">
                PART {juzNum}
              </div>

              {/* Surah Items inside continuous glass container */}
              <div className={`rounded-[22px] overflow-hidden shadow-sm divide-y divide-black/5 dark:divide-white/10 ${cardGlassClass}`}>
                {surahs.map((surah) => {
                  const isSelected = surah.number === currentSurahNumber;

                  return (
                    <div
                      key={surah.number}
                      onClick={() => onSelectSurah(surah)}
                      className={`w-full p-4 flex items-center justify-between cursor-pointer transition-all duration-200 hover:bg-emerald-500/10 ${
                        isSelected ? 'bg-emerald-500/15' : ''
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        {/* Surah Index Badge (Green solid circle if active, light grey circle if normal matching screenshot 3) */}
                        <div
                          className={`w-10 h-10 rounded-full font-bold text-sm flex items-center justify-center transition-all ${
                            isSelected
                              ? 'bg-emerald-600 text-white shadow-md'
                              : 'bg-slate-200/80 dark:bg-slate-700/80 text-slate-700 dark:text-slate-200'
                          }`}
                        >
                          {surah.number}
                        </div>

                        {/* Surah Meta */}
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-base text-slate-900 dark:text-white">
                              {surah.englishName}
                            </span>
                            <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 uthmani-text">
                              {surah.name}
                            </span>
                          </div>
                          <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
                            Page {surah.page} - {surah.numberOfAyahs} verses - {surah.revelationType}
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

      {/* Right Edge Vertical Quick-Scroll Index (1 to 30) matching Screenshot 3 */}
      <div className="fixed right-2 top-24 bottom-24 z-30 flex flex-col items-center justify-between py-2 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 select-none bg-white/20 dark:bg-slate-900/40 backdrop-blur-md rounded-full px-1 border border-white/30 shadow-xs">
        {Array.from({ length: 30 }, (_, i) => i + 1).map((partNum) => (
          <button
            key={partNum}
            onClick={() => scrollToPart(partNum)}
            className="w-5 h-5 rounded-full flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all text-[10px]"
            title={`Jump to Part ${partNum}`}
          >
            {partNum}
          </button>
        ))}
      </div>

    </div>
  );
};
