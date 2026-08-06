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
  let sizeClass = 'w-[50px] h-[50px] p-2.5 sm:w-[54px] sm:h-[54px] sm:p-3';
  if (size === 'sm') sizeClass = 'w-9 h-9 p-1.5';
  if (size === 'lg') sizeClass = 'w-16 h-16 p-3.5';

  let domainStyle = 'bg-white/10 text-current border-white/20';

  switch (domain) {
    case 'quran':
    case 'contents':
      domainStyle = 'bg-emerald-500/5 text-emerald-700 dark:text-emerald-300 border-emerald-500/35';
      break;
    case 'dhikr':
      domainStyle = 'bg-violet-500/5 text-violet-700 dark:text-violet-300 border-violet-500/35';
      break;
    case 'language':
      domainStyle = 'bg-sky-500/5 text-sky-700 dark:text-sky-300 border-sky-500/35';
      break;
    case 'notifications':
      domainStyle = 'bg-indigo-500/5 text-indigo-700 dark:text-indigo-300 border-indigo-500/35';
      break;
    case 'audio':
      domainStyle = 'bg-teal-500/5 text-teal-700 dark:text-teal-300 border-teal-500/35';
      break;
    case 'themes':
      domainStyle = 'bg-amber-500/5 text-amber-700 dark:text-amber-300 border-amber-500/35';
      break;
    case 'bookmarks':
      domainStyle = 'bg-rose-500/5 text-rose-700 dark:text-rose-300 border-rose-500/35';
      break;
    case 'search':
      domainStyle = 'bg-cyan-500/5 text-cyan-700 dark:text-cyan-300 border-cyan-500/35';
      break;
    case 'settings':
      domainStyle = 'bg-slate-500/5 text-slate-700 dark:text-slate-300 border-slate-500/35';
      break;
    case 'info':
      domainStyle = 'bg-blue-500/5 text-blue-700 dark:text-blue-300 border-blue-500/35';
      break;
    case 'neutral':
    default:
      domainStyle = 'bg-white/5 dark:bg-white/5 text-current border-white/25';
      break;
  }

  return (
    <div
      className={`rounded-xl border flex items-center justify-center transition-all ${sizeClass} ${domainStyle} ${className}`}
    >
      {children}
    </div>
  );
};
