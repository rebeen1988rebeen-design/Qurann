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
  Palette,
  Smartphone,
  HelpCircle,
  Info,
  Check,
  Volume2,
} from 'lucide-react';
import { Language, TRANSLATIONS } from '@/data/translations';
import { ThemeMode, getThemeConfig } from '@/lib/themeUtils';

interface SettingsViewProps {
  onBack: () => void;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  translationMode: 'arabic' | 'kurdish';
  setTranslationMode: (mode: 'arabic' | 'kurdish') => void;
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
  const themeConfig = getThemeConfig(themeMode);
  const [remindersEnabled, setRemindersEnabled] = useState(true);
  const [syncEnabled, setSyncEnabled] = useState(true);
  const [activeSubModal, setActiveSubModal] = useState<string | null>(null);

  const cardGlassClass = themeConfig.cardGlass;

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
        <div className={`rounded-2xl overflow-hidden shadow-sm ${cardGlassClass}`}>
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
        <div className={`rounded-2xl overflow-hidden shadow-sm divide-y divide-black/5 dark:divide-white/10 ${cardGlassClass}`}>
          
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
        <div className={`rounded-2xl overflow-hidden shadow-sm divide-y divide-black/5 dark:divide-white/10 ${cardGlassClass}`}>
          
          {/* Language Toggle with Direct Rounded Rectangular Buttons */}
          <div className="w-full p-4 flex flex-col gap-3">
            <div
              onClick={() => {
                const langs: ('ku' | 'ar' | 'en')[] = ['ku', 'ar', 'en'];
                const nextLang = langs[(langs.indexOf(appLanguage) + 1) % langs.length];
                setAppLanguage(nextLang);
              }}
              className="w-full flex items-center justify-between cursor-pointer hover:opacity-85 transition-all"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-teal-500/15 text-teal-600 dark:text-teal-400 flex items-center justify-center border border-teal-500/20">
                  <Globe className="w-5 h-5" />
                </div>
                <span className="font-semibold text-base text-slate-900 dark:text-white">
                  {t.language}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-teal-700 dark:text-teal-400 bg-teal-500/15 px-3 py-1 rounded-xl border border-teal-500/20">
                  {appLanguage === 'ku' ? 'کوردی' : appLanguage === 'ar' ? 'العربية' : 'English'}
                </span>
              </div>
            </div>

            {/* Direct 1-Click Language Buttons (Rounded Rectangles) */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              {[
                { id: 'ku' as const, badge: 'ك', label: 'کوردی' },
                { id: 'ar' as const, badge: 'ع', label: 'العربية' },
                { id: 'en' as const, badge: 'E', label: 'English' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setAppLanguage(item.id);
                  }}
                  className={`py-2 px-2 rounded-xl border flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    appLanguage === item.id
                      ? 'bg-emerald-500/20 border-emerald-500 ring-2 ring-emerald-500/30 text-emerald-950 dark:text-emerald-100 font-bold shadow-xs'
                      : 'bg-white/40 dark:bg-slate-800/40 border-black/10 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-white/70 dark:hover:bg-slate-800/70'
                  }`}
                >
                  <span className="w-5 h-5 rounded-lg bg-emerald-600 text-white font-extrabold text-[11px] flex items-center justify-center">
                    {item.badge}
                  </span>
                  <span className="text-xs font-bold truncate">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Appearance (5 Themes - Direct Single-Click Selection with Rounded Rectangular Buttons) */}
          <div className="w-full p-4 flex flex-col gap-3">
            <div
              onClick={() => {
                const modes: ThemeMode[] = ['white', 'dark', 'cyan', 'green', 'yellow'];
                const nextMode = modes[(modes.indexOf(themeMode) + 1) % modes.length];
                setThemeMode(nextMode);
              }}
              className="w-full flex items-center justify-between cursor-pointer hover:opacity-85 transition-all"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-purple-500/15 text-purple-500 flex items-center justify-center border border-purple-500/20">
                  <Moon className="w-5 h-5" />
                </div>
                <span className="font-semibold text-base text-slate-900 dark:text-white">
                  {t.appearance}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-emerald-700 dark:text-emerald-400 bg-emerald-500/15 px-3 py-1 rounded-xl border border-emerald-500/20">
                  {themeMode === 'white'
                    ? t.themeWhite
                    : themeMode === 'dark'
                    ? t.themeDark
                    : themeMode === 'cyan'
                    ? t.themeCyan
                    : themeMode === 'green'
                    ? t.themeGreen
                    : t.themeYellow}
                </span>
              </div>
            </div>

            {/* Direct Single-Click Theme Selection Buttons (Rounded Rectangular Shapes) */}
            <div className="grid grid-cols-5 gap-1.5 pt-1">
              {[
                { id: 'white' as ThemeMode, icon: <Sun className="w-4 h-4 text-emerald-700" />, label: 'سپی', bg: 'bg-white text-emerald-950 border-emerald-300' },
                { id: 'dark' as ThemeMode, icon: <Moon className="w-4 h-4 text-indigo-400" />, label: 'تاریک', bg: 'bg-slate-900 text-white border-slate-700' },
                { id: 'cyan' as ThemeMode, icon: <Sparkles className="w-4 h-4 text-sky-600" />, label: 'شین', bg: 'bg-[#E0F2FE] text-cyan-950 border-sky-300' },
                { id: 'green' as ThemeMode, icon: <Palette className="w-4 h-4 text-emerald-700" />, label: 'سەوز', bg: 'bg-[#DCFCE7] text-emerald-950 border-emerald-300' },
                { id: 'yellow' as ThemeMode, icon: <Sun className="w-4 h-4 text-amber-600" />, label: 'زەرد', bg: 'bg-[#FEF08A] text-amber-950 border-amber-300' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setThemeMode(item.id);
                  }}
                  className={`py-2 px-1 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${item.bg} ${
                    themeMode === item.id
                      ? 'ring-2 ring-emerald-500 shadow-md scale-105 font-bold'
                      : 'opacity-70 hover:opacity-100 hover:scale-100'
                  }`}
                  title={item.label}
                >
                  {item.icon}
                  <span className="text-[10px] font-extrabold truncate max-w-full">
                    {item.label}
                  </span>
                </button>
              ))}
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
        <div className={`rounded-2xl overflow-hidden shadow-sm ${cardGlassClass}`}>
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
        <div className={`rounded-2xl overflow-hidden shadow-sm ${cardGlassClass}`}>
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

          <div className={`rounded-2xl overflow-hidden shadow-sm p-4 flex items-center justify-between cursor-pointer hover:bg-emerald-500/10 transition-all ${cardGlassClass}`}>
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
          <div className={`w-full max-w-md rounded-2xl p-6 shadow-2xl ${cardGlassClass}`}>
            <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">{t.appearance}</h3>
            <div className="flex flex-col gap-2.5">
              
              {/* 1. White Theme */}
              <button
                onClick={() => { setThemeMode('white'); setActiveSubModal(null); }}
                className={`p-3.5 rounded-[16px] border flex items-center justify-between font-bold transition-all ${
                  themeMode === 'white'
                    ? 'bg-white text-emerald-900 border-emerald-500 ring-2 ring-emerald-500/30 shadow-md'
                    : 'bg-white/70 text-slate-800 border-emerald-500/20 hover:bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Sun className="w-5 h-5 text-emerald-600" />
                  <span>{t.themeWhite}</span>
                </div>
                {themeMode === 'white' && <Check className="w-5 h-5 text-emerald-600" />}
              </button>

              {/* 2. Dark Theme */}
              <button
                onClick={() => { setThemeMode('dark'); setActiveSubModal(null); }}
                className={`p-3.5 rounded-[16px] border flex items-center justify-between font-bold transition-all ${
                  themeMode === 'dark'
                    ? 'bg-slate-900 text-white border-emerald-400 ring-2 ring-emerald-400/30 shadow-md'
                    : 'bg-slate-900/80 text-white border-white/10 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Moon className="w-5 h-5 text-indigo-400" />
                  <span>{t.themeDark}</span>
                </div>
                {themeMode === 'dark' && <Check className="w-5 h-5 text-emerald-400" />}
              </button>

              {/* 3. Light Cyan Glass */}
              <button
                onClick={() => { setThemeMode('cyan'); setActiveSubModal(null); }}
                className={`p-3.5 rounded-[16px] border flex items-center justify-between font-bold transition-all ${
                  themeMode === 'cyan'
                    ? 'bg-[#BAE6FD]/80 text-cyan-950 border-cyan-500 ring-2 ring-cyan-500/30 shadow-md'
                    : 'bg-[#BAE6FD]/40 text-cyan-950 border-white/60 hover:bg-[#BAE6FD]/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-sky-600" />
                  <span>{t.themeCyan}</span>
                </div>
                {themeMode === 'cyan' && <Check className="w-5 h-5 text-cyan-700" />}
              </button>

              {/* 4. Light Green Glass */}
              <button
                onClick={() => { setThemeMode('green'); setActiveSubModal(null); }}
                className={`p-3.5 rounded-[16px] border flex items-center justify-between font-bold transition-all ${
                  themeMode === 'green'
                    ? 'bg-[#A7F3D0]/80 text-emerald-950 border-emerald-500 ring-2 ring-emerald-500/30 shadow-md'
                    : 'bg-[#A7F3D0]/40 text-emerald-950 border-white/60 hover:bg-[#A7F3D0]/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Palette className="w-5 h-5 text-emerald-700" />
                  <span>{t.themeGreen}</span>
                </div>
                {themeMode === 'green' && <Check className="w-5 h-5 text-emerald-700" />}
              </button>

              {/* 5. Light Yellow Glass */}
              <button
                onClick={() => { setThemeMode('yellow'); setActiveSubModal(null); }}
                className={`p-3.5 rounded-[16px] border flex items-center justify-between font-bold transition-all ${
                  themeMode === 'yellow'
                    ? 'bg-[#FDE68A]/80 text-amber-950 border-amber-500 ring-2 ring-amber-500/30 shadow-md'
                    : 'bg-[#FDE68A]/40 text-amber-950 border-white/60 hover:bg-[#FDE68A]/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Sun className="w-5 h-5 text-amber-600" />
                  <span>{t.themeYellow}</span>
                </div>
                {themeMode === 'yellow' && <Check className="w-5 h-5 text-amber-700" />}
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
          <div className={`w-full max-w-md rounded-2xl p-6 shadow-2xl ${cardGlassClass}`}>
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
          <div className={`w-full max-w-md rounded-2xl p-6 shadow-2xl text-center ${cardGlassClass}`}>
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
