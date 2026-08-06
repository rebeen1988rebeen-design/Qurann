'use client';
import React from 'react';
import { ThemeMode } from '@/lib/themeUtils';

interface SurahCircleProps {
  number: string | number;
  themeMode: ThemeMode;
}

export const SurahCircle: React.FC<SurahCircleProps> = ({ number, themeMode }) => {
  // Define adaptive styles based on the theme
  const getStyles = () => {
    switch (themeMode) {
      case 'dark':
        return {
          container: 'bg-black/[0.08] border-white/20',
          text: 'text-white'
        };
      case 'cyan':
        return {
          container: 'bg-cyan-500/[0.15] border-cyan-500/30',
          text: 'text-cyan-700 dark:text-cyan-400'
        };
      case 'green':
        return {
          container: 'bg-emerald-500/[0.15] border-emerald-500/30',
          text: 'text-emerald-700 dark:text-emerald-400'
        };
      case 'yellow':
        return {
          container: 'bg-amber-500/[0.15] border-amber-500/30',
          text: 'text-amber-700 dark:text-amber-400'
        };
      case 'white':
      default:
        return {
          container: 'bg-white/[0.6] border-slate-200/50',
          text: 'text-emerald-600'
        };
    }
  };

  const styles = getStyles();

  return (
    <div className={`
      flex items-center justify-center w-10 h-10 rounded-full
      ${styles.container}
      backdrop-blur-xl backdrop-saturate-[1.8]
      border shadow-[0_4px_12px_rgba(0,0,0,0.05)]
    `}>
      <span className={`font-extrabold text-sm ${styles.text}`}>
        {number}
      </span>
    </div>
  );
};
