'use client';

import React from 'react';
import { Pencil, Trash2, BookOpen } from 'lucide-react';
import { Verse, SAMPLE_VERSES_DATA } from '@/data/quranData';

interface HighlightsViewProps {
  highlightedVerses: Record<number, string>;
  onToggleHighlight: (num: number, color: string) => void;
  onSelectVerse: (surahNumber: number, page: number) => void;
  themeMode: 'light' | 'dark' | 'ice';
}

export const HighlightsView: React.FC<HighlightsViewProps> = ({
  highlightedVerses,
  onToggleHighlight,
  onSelectVerse,
  themeMode,
}) => {
  const isDark = themeMode === 'dark';
  const isIce = themeMode === 'ice';

  const cardGlassClass = isDark
    ? 'liquid-glass-dark text-slate-100'
    : isIce
    ? 'liquid-glass-ice text-slate-900'
    : 'liquid-glass-light text-slate-900';

  const allVerses: Verse[] = Object.values(SAMPLE_VERSES_DATA).flat();
  const highlightKeys = Object.keys(highlightedVerses).map(Number);
  const activeHighlights = allVerses.filter((v) => highlightKeys.includes(v.numberInQuran));

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-4 pb-36 min-h-screen">
      
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Highlights
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Color-coded Ayahs & Study Notes
          </p>
        </div>
        <div className="w-10 h-10 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center border border-emerald-500/30">
          <Pencil className="w-5 h-5" />
        </div>
      </div>

      {activeHighlights.length === 0 ? (
        <div className={`rounded-[24px] p-8 text-center ${cardGlassClass}`}>
          <Pencil className="w-12 h-12 text-slate-400 mx-auto mb-3 opacity-50" />
          <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200">No Highlights Yet</h3>
          <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1">
            Highlight meaningful verses in gold, emerald, or ice blue to organize your Quran study reflections.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {activeHighlights.map((verse) => (
            <div
              key={verse.numberInQuran}
              className={`rounded-[22px] p-4 sm:p-5 shadow-sm transition-all border border-white/40 ${cardGlassClass}`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-black/5 dark:border-white/10 mb-3">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/15 px-3 py-1 rounded-full">
                  Ayah {verse.numberInSurah} • Page {verse.page}
                </span>

                <button
                  onClick={() => onToggleHighlight(verse.numberInQuran, '')}
                  className="p-1.5 rounded-full hover:bg-rose-500/20 text-rose-500 transition-all"
                  title="Remove Highlight"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Arabic */}
              <div dir="rtl" className="text-xl sm:text-2xl uthmani-text text-slate-900 dark:text-slate-100 mb-2">
                {verse.text}
              </div>

              {/* Kurdish */}
              <div dir="rtl" className="text-base kurdish-text text-emerald-800 dark:text-emerald-300 mt-1">
                {verse.kurdish}
              </div>

              {/* Jump Button */}
              <button
                onClick={() => onSelectVerse(1, verse.page)}
                className="mt-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold text-xs border border-emerald-500/30 hover:bg-emerald-500/30 transition-all"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Jump to Page {verse.page}</span>
              </button>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
