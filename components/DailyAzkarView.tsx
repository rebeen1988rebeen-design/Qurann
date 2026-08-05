'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { IconBox } from '@/components/IconBox';
import { triggerHaptic } from '@/lib/haptics';
import { Language } from '@/data/translations';
import { ThemeMode, getThemeConfig } from '@/lib/themeUtils';

interface DailyAzkarViewProps {
  appLanguage: Language;
  themeMode: ThemeMode;
  onClose: () => void;
}

const DailyAzkarView: React.FC<DailyAzkarViewProps> = ({ appLanguage, themeMode, onClose }) => {
  const themeConfig = getThemeConfig(themeMode);

  return (
    <div className="h-full w-full flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className={`w-full max-w-md min-h-[500px] flex flex-col rounded-2xl overflow-hidden shadow-2xl border-0 ${themeConfig.navGlass}`}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <IconBox domain="dhikr" size="md">
              <Sparkles className="w-5 h-5" />
            </IconBox>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {appLanguage === 'ku' ? 'ویردی ڕۆژانە' : appLanguage === 'ar' ? 'أذكار اليوم' : 'Daily Dhikr'}
            </h2>
          </div>
          <button 
            onClick={() => { triggerHaptic(5); onClose(); }}
            className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-slate-600 dark:text-white/70 hover:text-white transition-all flex items-center justify-center font-bold"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 flex items-center justify-center">
          <p className="text-slate-400 dark:text-white/30 italic text-sm">
            {appLanguage === 'ku' ? 'هیچ زانیارییەک بەردەست نییە' : appLanguage === 'ar' ? 'لا توجد بيانات متاحة' : 'No data available'}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default DailyAzkarView;

