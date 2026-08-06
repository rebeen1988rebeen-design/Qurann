'use client';

import React from 'react';

export type IconBoxDomain = 
  | 'quran' 
  | 'dhikr' 
  | 'language' 
  | 'notifications' 
  | 'audio' 
  | 'themes' 
  | 'bookmarks' 
  | 'search' 
  | 'contents' 
  | 'settings' 
  | 'info' 
  | 'neutral';

interface IconBoxProps {
  children: React.ReactNode;
  domain?: IconBoxDomain;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  active?: boolean;
}

export const IconBox: React.FC<IconBoxProps> = ({
  children,
  domain = 'neutral',
  className = '',
  size = 'md',
  active = false,
}) => {
  let sizeClass = 'w-[62px] h-[62px] p-3.5 sm:w-[68px] sm:h-[68px] sm:p-4';
  if (size === 'sm') sizeClass = 'w-11 h-11 p-2.5';
  if (size === 'lg') sizeClass = 'w-20 h-20 p-5';

  let radialBg = 'radial-gradient(circle at center, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 50%, transparent 85%)';
  let textColor = 'text-slate-900 dark:text-white';

  switch (domain) {
    case 'quran':
    case 'contents':
      radialBg = 'radial-gradient(circle at center, rgba(16,185,129,0.18) 0%, rgba(16,185,129,0.04) 50%, transparent 85%)';
      textColor = 'text-emerald-600 dark:text-emerald-400';
      break;
    case 'dhikr':
      radialBg = 'radial-gradient(circle at center, rgba(139,92,246,0.18) 0%, rgba(139,92,246,0.04) 50%, transparent 85%)';
      textColor = 'text-violet-600 dark:text-violet-400';
      break;
    case 'language':
      radialBg = 'radial-gradient(circle at center, rgba(14,165,233,0.18) 0%, rgba(14,165,233,0.04) 50%, transparent 85%)';
      textColor = 'text-sky-600 dark:text-sky-400';
      break;
    case 'notifications':
      radialBg = 'radial-gradient(circle at center, rgba(99,102,241,0.18) 0%, rgba(99,102,241,0.04) 50%, transparent 85%)';
      textColor = 'text-indigo-600 dark:text-indigo-400';
      break;
    case 'audio':
      radialBg = 'radial-gradient(circle at center, rgba(20,184,166,0.18) 0%, rgba(20,184,166,0.04) 50%, transparent 85%)';
      textColor = 'text-teal-600 dark:text-teal-400';
      break;
    case 'themes':
      radialBg = 'radial-gradient(circle at center, rgba(245,158,11,0.18) 0%, rgba(245,158,11,0.04) 50%, transparent 85%)';
      textColor = 'text-amber-600 dark:text-amber-400';
      break;
    case 'bookmarks':
      radialBg = 'radial-gradient(circle at center, rgba(244,63,94,0.18) 0%, rgba(244,63,94,0.04) 50%, transparent 85%)';
      textColor = 'text-rose-600 dark:text-rose-400';
      break;
    case 'search':
      radialBg = 'radial-gradient(circle at center, rgba(6,182,212,0.18) 0%, rgba(6,182,212,0.04) 50%, transparent 85%)';
      textColor = 'text-cyan-600 dark:text-cyan-400';
      break;
    case 'settings':
      radialBg = 'radial-gradient(circle at center, rgba(100,116,139,0.18) 0%, rgba(100,116,139,0.04) 50%, transparent 85%)';
      textColor = 'text-slate-700 dark:text-slate-300';
      break;
    case 'info':
      radialBg = 'radial-gradient(circle at center, rgba(59,130,246,0.18) 0%, rgba(59,130,246,0.04) 50%, transparent 85%)';
      textColor = 'text-blue-600 dark:text-blue-400';
      break;
    case 'neutral':
    default:
      radialBg = 'radial-gradient(circle at center, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 50%, transparent 85%)';
      textColor = 'text-slate-900 dark:text-white';
      break;
  }

  return (
    <div
      style={{
        background: radialBg,
      }}
      className={`rounded-full flex items-center justify-center transition-all bg-white/35 dark:bg-black/45 backdrop-blur-md backdrop-saturate-150 border border-white/85 dark:border-white/40 shadow-[inset_0_2.5px_3px_0_rgba(255,255,255,0.95),_inset_0_-2px_2px_0_rgba(255,255,255,0.5),_0_10px_25px_rgba(0,0,0,0.18)] ${sizeClass} ${textColor} ${className}`}
    >
      <div className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.3)] flex items-center justify-center w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default IconBox;

