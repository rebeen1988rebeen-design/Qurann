'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Info, Heart, ShieldCheck, Github } from 'lucide-react';
import { Language } from '@/data/translations';
import { ThemeMode, getThemeConfig } from '@/lib/themeUtils';

interface AboutViewProps {
  appLanguage: Language;
  themeMode: ThemeMode;
}

const AboutView: React.FC<AboutViewProps> = ({ appLanguage, themeMode }) => {
  const themeConfig = getThemeConfig(themeMode);

  return (
    <div className="h-full w-full flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className={`w-full max-w-md min-h-[400px] rounded-2xl p-8 shadow-2xl border-0 ${themeConfig.navGlass}`}
      >
        {/* Empty as requested */}
      </motion.div>
    </div>
  );
};

export default AboutView;
