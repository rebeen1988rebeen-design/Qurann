'use client';

import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Book,
  Cloud,
  Bell,
  Globe,
  Moon,
  Sun,
  Sparkles,
  Smartphone,
  HelpCircle,
  Info,
  Check,
  Volume2,
} from 'lucide-react';
import { Language, TRANSLATIONS } from '@/data/translations';

interface SettingsViewProps {
  onBack: () => void;
  themeMode: 'light' | 'dark' | 'ice';
  setThemeMode: (mode: 'light' | 'dark' | 'ice') => void;
  translationMode: 'arabic' | 'kurdish' | 'both';
  setTranslationMode: (mode: 'arabic' | 'kurdish' | 'both') => void;
  fontSize: 'small' | 'medium' | 'large' | 'xlarge';
  setFontSize: (size: 'small' | 'medium' | 'large' | 'xlarge') => void;
  selectedReciterName: string;
  onOpenReciterSelector: () => void;
  appLanguage: Language;
  setAppLanguage: (lang: Language) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  onBack,
  themeMode,
  setThemeMode,
  translationMode,
  setTranslationMode,
  fontSize,
  setFontSize,
  selectedReciterName,
  onOpenReciterSelector,
  appLanguage,
  setAppLanguage,
}) => {
  const t = TRANSLATIONS[appLanguage];
  const [remindersEnabled, setRemindersEnabled] = useState(true);
  const [syncEnabled, setSyncEnabled] = useState(true);
  const [activeSubModal, setActiveSubModal] = useState<string | null>(null);

  const isDark = themeMode === 'dark';
  const isIce = themeMode === 'ice';

  const cardGlassClass = isDark
    ? 'liquid-glass-dark text-slate-100'
    : isIce
    ? 'liquid-glass-ice text-slate-900'
    : 'liquid-glass-light text-slate-900';

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-4 pb-36 min-h-screen">
      
      {/* Top Header Navigation matching Screenshot 4 */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-slate-200/70 dark:bg-slate-800/70 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-emerald-500/20 transition-all border border-white/40"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {t.settingsTitle}
        </h1>
      </div>

      <div className="flex flex-col gap-5">
        
        {/* CARD BLOCK 1: Membership matching Screenshot 4 */}
        <div className={`rounded-[22px] overflow-hidden shadow-sm ${cardGlassClass}`}>
          <div
            onClick={() => setActiveSubModal('membership')}
            className="w-full p-4 flex items-center justify-between cursor-pointer hover:bg-emerald-500/10 transition-all"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-[12px] bg-rose-500/15 text-rose-500 flex items-center justify-center border border-rose-500/20">
                <Heart className="w-5 h-5 fill-rose-500/20" />
              </div>
              <span className="font-semibold text-base text-slate-900 dark:text-white">
                {t.ayahMembership}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-rose-500 bg-rose-500/10 px-2.5 py-1 rounded-full border border-rose-500/20">{t.pro}</span>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>
          </div>
        </div>

        {/* CARD BLOCK 2: Quran, Sync, Reminders, Storage matching Screenshot 4 */}
        <div className={`rounded-[22px] overflow-hidden shadow-sm divide-y divide-black/5 dark:divide-white/10 ${cardGlassClass}`}>
          
          {/* Quran Settings */}
          <div
            onClick={() => setActiveSubModal('quran')}
            className="w-full p-4 flex items-center justify-between cursor-pointer hover:bg-emerald-500/10 transition-all"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-[12px] bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-500/20">
                <Book className="w-5 h-5" />
              </div>
              <span className="font-semibold text-base text-slate-900 dark:text-white">
                {t.quranSettings}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium capitalize">{fontSize} Font</span>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>
          </div>

          {/* Sync */}
          <div
            onClick={() => setSyncEnabled(!syncEnabled)}
            className="w-full p-4 flex items-center justify-between cursor-pointer hover:bg-emerald-500/10 transition-all"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-[12px] bg-sky-500/15 text-sky-500 flex items-center justify-center border border-sky-500/20">
                <Cloud className="w-5 h-5" />
              </div>
              <span className="font-semibold text-base text-slate-900 dark:text-white">
                {t.sync}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${syncEnabled ? 'bg-emerald-500/20 text-emerald-600' : 'bg-slate-200 text-slate-500'}`}>
                {syncEnabled ? t.icloudActive : t.disabled}
              </span>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>
          </div>

          {/* Reminders */}
          <div
            onClick={() => setRemindersEnabled(!remindersEnabled)}
            className="w-full p-4 flex items-center justify-between cursor-pointer hover:bg-emerald-500/10 transition-all"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-[12px] bg-indigo-500/15 text-indigo-500 flex items-center justify-center border border-indigo-500/20">
                <Bell className="w-5 h-5" />
              </div>
              <span className="font-semibold text-base text-slate-900 dark:text-white">
                {t.reminders}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">{t.dailyReminder}</span>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>
          </div>

          {/* Reciter Audio / Storage */}
          <div
            onClick={onOpenReciterSelector}
            className="w-full p-4 flex items-center justify-between cursor-pointer hover:bg-emerald-500/10 transition-all"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-[12px] bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                <Volume2 className="w-5 h-5" />
              </div>
              <span className="font-semibold text-base text-slate-900 dark:text-white">
                {t.audioReciter}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">{selectedReciterName.split(' ')[0]}</span>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>
          </div>

        </div>

        {/* CARD BLOCK 3: Language, Appearance, App Icon matching Screenshot 4 */}
        <div className={`rounded-[22px] overflow-hidden shadow-sm divide-y divide-black/5 dark:divide-white/10 ${cardGlassClass}`}>
          
          {/* Language Toggle */}
          <div
            onClick={() => setActiveSubModal('language')}
            className="w-full p-4 flex items-center justify-between cursor-pointer hover:bg-emerald-500/10 transition-all"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-[12px] bg-teal-500/15 text-teal-600 dark:text-teal-400 flex items-center justify-center border border-teal-500/20">
                <Globe className="w-5 h-5" />
              </div>
              <span className="font-semibold text-base text-slate-900 dark:text-white">
                {t.language}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium capitalize">
                {appLanguage === 'ku' ? 'کوردی (ك)' : appLanguage === 'ar' ? 'العربية (ع)' : 'English (E)'}
              </span>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>
          </div>

          {/* Appearance (Light / Dark / Ice) */}
          <div
            onClick={() => setActiveSubModal('appearance')}
            className="w-full p-4 flex items-center justify-between cursor-pointer hover:bg-emerald-500/10 transition-all"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-[12px] bg-purple-500/15 text-purple-500 flex items-center justify-center border border-purple-500/20">
                <Moon className="w-5 h-5" />
              </div>
              <span className="font-semibold text-base text-slate-900 dark:text-white">
                {t.appearance}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium capitalize">{themeMode} Glass</span>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>
          </div>

          {/* App Icon */}
          <div
            onClick={() => setActiveSubModal('appicon')}
            className="w-full p-4 flex items-center justify-between cursor-pointer hover:bg-emerald-500/10 transition-all"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-[12px] bg-slate-500/15 text-slate-600 dark:text-slate-300 flex items-center justify-center border border-slate-500/20">
                <Smartphone className="w-5 h-5" />
              </div>
              <span className="font-semibold text-base text-slate-900 dark:text-white">
                {t.appIcon}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">{t.defaultGold}</span>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>
          </div>

        </div>

        {/* CARD BLOCK 4: Help */}
        <div className={`rounded-[22px] overflow-hidden shadow-sm ${cardGlassClass}`}>
          <div
            onClick={() => setActiveSubModal('help')}
            className="w-full p-4 flex items-center justify-between cursor-pointer hover:bg-emerald-500/10 transition-all"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-[12px] bg-amber-500/15 text-amber-500 flex items-center justify-center border border-amber-500/20">
                <HelpCircle className="w-5 h-5" />
              </div>
              <span className="font-semibold text-base text-slate-900 dark:text-white">
                {t.helpFaq}
              </span>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </div>
        </div>

        {/* CARD BLOCK 5: About */}
        <div className={`rounded-[22px] overflow-hidden shadow-sm ${cardGlassClass}`}>
          <div
            onClick={() => setActiveSubModal('about')}
            className="w-full p-4 flex items-center justify-between cursor-pointer hover:bg-emerald-500/10 transition-all"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-[12px] bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                <Info className="w-5 h-5" />
              </div>
              <span className="font-semibold text-base text-slate-900 dark:text-white">
                {t.aboutApp}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">v3.4.0</span>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>
          </div>
        </div>

        {/* OUR OTHER APP Section matching Screenshot 4 */}
        <div className="mt-4">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 px-1">
            {t.ourOtherApp}
          </div>

          <div className={`rounded-[22px] overflow-hidden shadow-sm p-4 flex items-center justify-between cursor-pointer hover:bg-emerald-500/10 transition-all ${cardGlassClass}`}>
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-[14px] bg-sky-500 text-white flex items-center justify-center font-bold text-xl shadow-md">
                <span>ﷺ</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-base text-slate-900 dark:text-white">
                  Hisn
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {t.hisnSub}
                </span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </div>
        </div>

      </div>

      {/* Sub Modals for Settings */}
      {activeSubModal === 'appearance' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
          <div className={`w-full max-w-md rounded-[24px] p-6 shadow-2xl ${cardGlassClass}`}>
            <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">{t.appearance}</h3>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => { setThemeMode('light'); setActiveSubModal(null); }}
                className="p-3.5 rounded-[16px] bg-white/60 dark:bg-slate-800/60 border border-white/60 flex items-center justify-between font-semibold"
              >
                <div className="flex items-center gap-3">
                  <Sun className="w-5 h-5 text-amber-500" />
                  <span>Light Liquid Glass</span>
                </div>
                {themeMode === 'light' && <Check className="w-5 h-5 text-emerald-500" />}
              </button>

              <button
                onClick={() => { setThemeMode('dark'); setActiveSubModal(null); }}
                className="p-3.5 rounded-[16px] bg-slate-900/80 text-white border border-white/10 flex items-center justify-between font-semibold"
              >
                <div className="flex items-center gap-3">
                  <Moon className="w-5 h-5 text-indigo-400" />
                  <span>Dark Liquid Glass</span>
                </div>
                {themeMode === 'dark' && <Check className="w-5 h-5 text-emerald-500" />}
              </button>

              <button
                onClick={() => { setThemeMode('ice'); setActiveSubModal(null); }}
                className="p-3.5 rounded-[16px] bg-sky-100/70 text-sky-900 border border-sky-300 flex items-center justify-between font-semibold"
              >
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-sky-500" />
                  <span>Ice Cyan Glass</span>
                </div>
                {themeMode === 'ice' && <Check className="w-5 h-5 text-emerald-500" />}
              </button>
            </div>
            <button
              onClick={() => setActiveSubModal(null)}
              className="w-full mt-5 py-2.5 rounded-full bg-slate-200/80 dark:bg-slate-800 font-bold text-sm"
            >
              {t.close}
            </button>
          </div>
        </div>
      )}

      {activeSubModal === 'language' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
          <div className={`w-full max-w-md rounded-[24px] p-6 shadow-2xl ${cardGlassClass}`}>
            <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">{t.language}</h3>
            
            <div className="flex flex-col gap-3">
              <button
                onClick={() => { setAppLanguage('ku'); setActiveSubModal(null); }}
                className="p-3.5 rounded-[16px] bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between font-semibold text-emerald-900 dark:text-emerald-100"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-emerald-500 text-white font-bold text-xs flex items-center justify-center">ك</span>
                  <span>کوردی (Sorani Kurdish)</span>
                </div>
                {appLanguage === 'ku' && <Check className="w-5 h-5 text-emerald-500" />}
              </button>

              <button
                onClick={() => { setAppLanguage('ar'); setActiveSubModal(null); }}
                className="p-3.5 rounded-[16px] bg-white/60 dark:bg-slate-800/60 border border-white/60 flex items-center justify-between font-semibold"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">ع</span>
                  <span>العربية (Arabic)</span>
                </div>
                {appLanguage === 'ar' && <Check className="w-5 h-5 text-emerald-500" />}
              </button>

              <button
                onClick={() => { setAppLanguage('en'); setActiveSubModal(null); }}
                className="p-3.5 rounded-[16px] bg-white/60 dark:bg-slate-800/60 border border-white/60 flex items-center justify-between font-semibold"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-emerald-700 text-white font-bold text-xs flex items-center justify-center">E</span>
                  <span>English</span>
                </div>
                {appLanguage === 'en' && <Check className="w-5 h-5 text-emerald-500" />}
              </button>
            </div>

            <button
              onClick={() => setActiveSubModal(null)}
              className="w-full mt-5 py-2.5 rounded-full bg-slate-200/80 dark:bg-slate-800 font-bold text-sm"
            >
              {t.close}
            </button>
          </div>
        </div>
      )}

      {activeSubModal === 'about' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
          <div className={`w-full max-w-md rounded-[24px] p-6 shadow-2xl text-center ${cardGlassClass}`}>
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-600 mx-auto flex items-center justify-center mb-3">
              <Book className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{t.aboutApp}</h3>
            <p className="text-xs text-emerald-600 font-bold mt-1">Madani Quran & Liquid Glass</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">
              Featuring Madani Uthmani Script, Sorani Kurdish Translation, English Translation, complete Recitation audio player, and dynamic tri-lingual localization.
            </p>
            <button
              onClick={() => setActiveSubModal(null)}
              className="w-full mt-6 py-2.5 rounded-full bg-emerald-500 text-white font-bold text-sm shadow-md"
            >
              {t.close}
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
