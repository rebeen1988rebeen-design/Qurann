'use client';

import React from 'react';
import { Volume2, Check, X } from 'lucide-react';
import { IconBox } from '@/components/IconBox';
import { triggerHaptic } from '@/lib/haptics';
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
      <div className={`w-full max-w-md rounded-2xl p-6 shadow-2xl ${cardGlassClass} border border-white/40`}>
        
        <div className="flex items-center justify-between pb-3 border-b border-black/10 dark:border-white/10 mb-4">
          <div className="flex items-center gap-3">
            <IconBox domain="audio" size="md">
              <Volume2 className="w-5 h-5" />
            </IconBox>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Select Reciter</h3>
          </div>
          <button
            onClick={() => { triggerHaptic(10); onClose(); }}
            className="w-8 h-8 rounded-xl bg-slate-200/50 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-300 transition-all"
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
                  triggerHaptic(15);
                  onSelectReciter(reciter);
                  onClose();
                }}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-teal-500/20 border-teal-500 text-teal-950 dark:text-teal-100 font-bold shadow-sm'
                    : 'bg-white/40 dark:bg-slate-800/40 border-white/40 dark:border-white/10 hover:bg-teal-500/10'
                }`}
              >
                <div>
                  <div className="text-base font-bold text-slate-900 dark:text-white">{reciter.name}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">{reciter.subtext}</div>
                </div>

                {isSelected && (
                  <div className="w-7 h-7 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold shadow-sm">
                    <Check className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <button
          onClick={() => { triggerHaptic(10); onClose(); }}
          className="w-full mt-5 py-2.5 rounded-xl bg-slate-200/80 dark:bg-slate-800 font-bold text-sm text-slate-700 dark:text-slate-200"
        >
          Cancel
        </button>

      </div>
    </div>
  );
};


