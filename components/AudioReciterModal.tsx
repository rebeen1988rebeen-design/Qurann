'use client';

import React from 'react';
import { Volume2, Check, X } from 'lucide-react';
import { RECITERS, Reciter } from '@/data/quranData';
import { ThemeMode, getThemeConfig } from '@/lib/themeUtils';

interface AudioReciterModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedReciter: Reciter;
  onSelectReciter: (reciter: Reciter) => void;
  themeMode: ThemeMode;
}

export const AudioReciterModal: React.FC<AudioReciterModalProps> = ({
  isOpen,
  onClose,
  selectedReciter,
  onSelectReciter,
  themeMode,
}) => {
  if (!isOpen) return null;

  const themeConfig = getThemeConfig(themeMode);

  const cardGlassClass = themeConfig.modalGlass;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-in fade-in duration-200">
      <div className={`w-full max-w-md rounded-[24px] p-6 shadow-2xl ${cardGlassClass} border border-white/40`}>
        
        <div className="flex items-center justify-between pb-3 border-b border-black/10 dark:border-white/10 mb-4">
          <div className="flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-emerald-500" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Select Reciter</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-slate-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {RECITERS.map((reciter) => {
            const isSelected = selectedReciter.id === reciter.id;

            return (
              <div
                key={reciter.id}
                onClick={() => {
                  onSelectReciter(reciter);
                  onClose();
                }}
                className={`p-4 rounded-[18px] border cursor-pointer transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-900 dark:text-emerald-100 font-bold shadow-sm'
                    : 'bg-white/40 dark:bg-slate-800/40 border-white/40 dark:border-white/10 hover:bg-emerald-500/10'
                }`}
              >
                <div>
                  <div className="text-base font-bold text-slate-900 dark:text-white">{reciter.name}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">{reciter.subtext}</div>
                </div>

                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                    <Check className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <button
          onClick={onClose}
          className="w-full mt-5 py-2.5 rounded-full bg-slate-200/80 dark:bg-slate-800 font-bold text-sm text-slate-700 dark:text-slate-200"
        >
          Cancel
        </button>

      </div>
    </div>
  );
};
