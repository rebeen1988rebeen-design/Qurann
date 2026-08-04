'use client';

import React, { useState } from 'react';
import { CheckCircle2, Calendar, Target, Plus, Minus, Trophy, Flame } from 'lucide-react';
import { ThemeMode, getThemeConfig } from '@/lib/themeUtils';

interface KhatmahTrackerViewProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  themeMode: ThemeMode;
}

export const KhatmahTrackerView: React.FC<KhatmahTrackerViewProps> = ({
  currentPage,
  setCurrentPage,
  themeMode,
}) => {
  const [targetDays, setTargetDays] = useState(30);
  const totalPages = 604;
  const progressPercent = Math.min(100, Math.round((currentPage / totalPages) * 100));
  const pagesPerDay = Math.ceil((totalPages - currentPage) / Math.max(1, targetDays));

  const themeConfig = getThemeConfig(themeMode);
  const cardGlassClass = themeConfig.cardGlass;

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-4 pb-36 min-h-screen">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Khatmah Tracker
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Track your journey through the 604 pages of the Holy Quran
          </p>
        </div>
        
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-300 font-bold text-xs">
          <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
          <span>7 Day Streak</span>
        </div>
      </div>

      {/* Main Glass Progress Card */}
      <div className={`rounded-[24px] p-6 shadow-xl mb-6 relative overflow-hidden ${cardGlassClass}`}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Progress Circle Visual */}
          <div className="relative w-36 h-36 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="72"
                cy="72"
                r="60"
                stroke="currentColor"
                strokeWidth="12"
                className="text-slate-200 dark:text-slate-800"
                fill="transparent"
              />
              <circle
                cx="72"
                cy="72"
                r="60"
                stroke="currentColor"
                strokeWidth="12"
                strokeDasharray={377}
                strokeDashoffset={377 - (377 * progressPercent) / 100}
                strokeLinecap="round"
                className="text-emerald-500 transition-all duration-1000 ease-out"
                fill="transparent"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white">{progressPercent}%</span>
              <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Completed</span>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="flex-1 grid grid-cols-2 gap-3 w-full">
            <div className="bg-white/40 dark:bg-slate-800/40 p-3.5 rounded-[18px] border border-white/40 dark:border-white/10 flex flex-col">
              <span className="text-[10px] font-bold uppercase text-slate-400">Current Page</span>
              <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{currentPage} / 604</span>
            </div>

            <div className="bg-white/40 dark:bg-slate-800/40 p-3.5 rounded-[18px] border border-white/40 dark:border-white/10 flex flex-col">
              <span className="text-[10px] font-bold uppercase text-slate-400">Pages Left</span>
              <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">{totalPages - currentPage}</span>
            </div>

            <div className="bg-white/40 dark:bg-slate-800/40 p-3.5 rounded-[18px] border border-white/40 dark:border-white/10 flex flex-col">
              <span className="text-[10px] font-bold uppercase text-slate-400">Daily Goal</span>
              <span className="text-2xl font-bold text-sky-600 dark:text-sky-400">{pagesPerDay} Pgs/Day</span>
            </div>

            <div className="bg-white/40 dark:bg-slate-800/40 p-3.5 rounded-[18px] border border-white/40 dark:border-white/10 flex flex-col">
              <span className="text-[10px] font-bold uppercase text-slate-400">Target Days</span>
              <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">{targetDays} Days</span>
            </div>
          </div>

        </div>

        {/* Increment / Decrement Quick Logger */}
        <div className="mt-6 pt-4 border-t border-black/5 dark:border-white/10 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Quick Update Reading Log:</span>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              className="p-2 rounded-full bg-slate-200/80 dark:bg-slate-800 hover:bg-slate-300 transition-all"
            >
              <Minus className="w-4 h-4 text-slate-700 dark:text-slate-200" />
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(604, currentPage + 1))}
              className="px-4 py-1.5 rounded-full bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 shadow-md hover:bg-emerald-600 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>+1 Page Read</span>
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(604, currentPage + 20))}
              className="px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 font-bold text-xs hover:bg-emerald-500/30 transition-all"
            >
              +1 Juz (20 Pgs)
            </button>
          </div>
        </div>

      </div>

      {/* Target Planning Card */}
      <div className={`rounded-[24px] p-6 shadow-sm ${cardGlassClass}`}>
        <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
          <Target className="w-5 h-5 text-emerald-500" />
          <span>Khatmah Target Calculator</span>
        </h3>
        
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
          Select your desired completion timeframe to calculate your required daily page quota:
        </p>

        <div className="grid grid-cols-3 gap-3">
          {[15, 30, 60].map((days) => (
            <button
              key={days}
              onClick={() => setTargetDays(days)}
              className={`p-3.5 rounded-[18px] border text-center font-bold text-sm transition-all ${
                targetDays === days
                  ? 'bg-emerald-500 text-white border-emerald-500 shadow-md'
                  : 'bg-white/40 dark:bg-slate-800/40 border-white/40 text-slate-700 dark:text-slate-200 hover:bg-white/60'
              }`}
            >
              {days} Days
              <span className="block text-[10px] opacity-80 font-medium mt-0.5">
                {Math.ceil((totalPages - currentPage) / days)} pgs/day
              </span>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};
