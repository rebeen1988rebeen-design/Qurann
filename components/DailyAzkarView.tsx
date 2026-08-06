'use client';

import React from 'react';
import { Sparkles, TowerControl, Play, Compass } from 'lucide-react';
import { IconBox, IconBoxDomain } from '@/components/IconBox';
import { Language, TRANSLATIONS } from '@/data/translations';
import { ThemeMode, getThemeConfig } from '@/lib/themeUtils';

interface DailyAzkarViewProps {
  appLanguage: Language;
  themeMode: ThemeMode;
  onClose?: () => void;
  titleOverride?: string;
  domainOverride?: IconBoxDomain;
  iconType?: 'dhikr' | 'athan' | 'recitation' | 'qibla';
}

export const DailyAzkarView: React.FC<DailyAzkarViewProps> = ({ 
  appLanguage, 
  themeMode, 
  titleOverride,
  domainOverride = "dhikr",
  iconType = 'dhikr'
}) => {
  const t = TRANSLATIONS[appLanguage];
  const themeConfig = getThemeConfig(themeMode);
  const cardGlassClass = themeConfig.cardGlass;

  const renderIcon = () => {
    switch (iconType) {
      case 'athan':
        return <TowerControl className="w-6 h-6" />;
      case 'recitation':
        return <Play className="w-6 h-6" />;
      case 'qibla':
        return <Compass className="w-6 h-6" />;
      case 'dhikr':
      default:
        return <Sparkles className="w-6 h-6" />;
    }
  };

  const getTitle = () => {
    if (titleOverride) return titleOverride;
    switch (iconType) {
      case 'athan':
        return t.athan;
      case 'recitation':
        return t.recitation;
      case 'qibla':
        return t.qibla;
      case 'dhikr':
      default:
        return t.dailyAzkar;
    }
  };

  const currentTitle = getTitle();

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-4 pb-36 min-h-screen">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-base font-bold text-slate-900 dark:text-white">
          {currentTitle}
        </h1>
      </div>

      {/* View Card */}
      <div className={`rounded-2xl p-8 text-center min-h-[350px] flex items-center justify-center ${cardGlassClass}`}>
        <div className="flex flex-col items-center justify-center gap-3">
          <IconBox domain={domainOverride} size="lg">
            {renderIcon()}
          </IconBox>
          <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200">
            {currentTitle}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default DailyAzkarView;
