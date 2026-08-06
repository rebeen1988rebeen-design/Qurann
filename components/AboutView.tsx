'use client';

import React from 'react';
import { Info } from 'lucide-react';
import { IconBox } from '@/components/IconBox';
import { Language, TRANSLATIONS } from '@/data/translations';
import { ThemeMode, getThemeConfig } from '@/lib/themeUtils';

interface AboutViewProps {
  appLanguage: Language;
  themeMode: ThemeMode;
}

const AboutView: React.FC<AboutViewProps> = ({ appLanguage, themeMode }) => {
  const t = TRANSLATIONS[appLanguage];
  const themeConfig = getThemeConfig(themeMode);
  const cardGlassClass = themeConfig.cardGlass;

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-4 pb-36 min-h-screen">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-base font-bold text-slate-900 dark:text-white">
          {t.about}
        </h1>
      </div>

      <div className={`rounded-2xl p-8 text-center min-h-[350px] flex items-center justify-center ${cardGlassClass}`}>
        <div className="flex flex-col items-center justify-center gap-3">
          <IconBox domain="info" size="lg">
            <Info className="w-6 h-6" />
          </IconBox>
          <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200">
            {t.about}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default AboutView;
