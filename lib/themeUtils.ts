export type ThemeMode = 'white' | 'dark' | 'cyan' | 'green' | 'yellow';

export interface ThemeStyleConfig {
  rootBg: string;
  cardGlass: string;
  navGlass: string;
  playerGlass: string;
  modalGlass: string;
  textPrimary: string;
  textSecondary: string;
  textAccent: string;
  arabicVerseText: string;
  kurdishText: string;
  ayahBadge: string;
  surahBadgeActive: string;
  surahBadgeInactive: string;
  activeTabBg: string;
  buttonAccent: string;
  accentBorder: string;
  isDark: boolean;
}

export const getThemeConfig = (theme: ThemeMode): ThemeStyleConfig => {
  switch (theme) {
    case 'white':
      return {
        rootBg: 'bg-[#FFFFFF] text-slate-900',
        cardGlass: 'bg-white border border-slate-200/50 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.08),0_8px_10px_-6px_rgba(0,0,0,0.04)] text-slate-900 rounded-[32px]',
        navGlass: 'bg-white border border-slate-200/50 text-slate-900 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.08),0_8px_10px_-6px_rgba(0,0,0,0.04)] rounded-[32px]',
        playerGlass: 'bg-white border border-slate-200/50 text-slate-900 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.08),0_8px_10px_-6px_rgba(0,0,0,0.04)] rounded-[32px]',
        modalGlass: 'bg-white border border-slate-200/50 text-slate-900 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.08),0_8px_10px_-6px_rgba(0,0,0,0.04)] rounded-[32px]',
        textPrimary: 'text-[#000000] font-bold',
        textSecondary: 'text-emerald-800 font-semibold',
        textAccent: 'text-emerald-700 font-bold',
        arabicVerseText: 'text-[#000000] font-normal',
        kurdishText: 'text-emerald-900 font-medium',
        ayahBadge: 'bg-emerald-100 text-emerald-950 border border-emerald-300 shadow-xs font-extrabold',
        surahBadgeActive: 'bg-emerald-600 text-white font-bold shadow-sm',
        surahBadgeInactive: 'bg-emerald-100/80 text-emerald-950 font-bold border border-emerald-200',
        activeTabBg: 'bg-emerald-100/80 text-emerald-950 border-0 shadow-xs font-extrabold',
        buttonAccent: 'bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md shadow-emerald-600/20',
        accentBorder: 'border-emerald-500/20',
        isDark: false,
      };

    case 'dark':
      return {
        rootBg: 'bg-[#0F172A] text-white',
        cardGlass: 'bg-[#1E293B] border border-white/10 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3),0_8px_10px_-6px_rgba(0,0,0,0.2)] text-[#F1F5F9] rounded-[32px]',
        navGlass: 'bg-[#1E293B] border border-white/10 text-white shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3),0_8px_10px_-6px_rgba(0,0,0,0.2)] rounded-[32px]',
        playerGlass: 'bg-[#1E293B] border border-white/10 text-white shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3),0_8px_10px_-6px_rgba(0,0,0,0.2)] rounded-[32px]',
        modalGlass: 'bg-[#1E293B] text-white border border-white/10 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3),0_8px_10px_-6px_rgba(0,0,0,0.2)] rounded-[32px]',
        textPrimary: 'text-[#F1F5F9] font-bold',
        textSecondary: 'text-white/90 font-medium',
        textAccent: 'text-white font-bold',
        arabicVerseText: 'text-[#F1F5F9] font-normal',
        kurdishText: 'text-white/90 font-medium',
        ayahBadge: 'bg-slate-800 text-white border border-slate-700 font-bold shadow-xs',
        surahBadgeActive: 'bg-white text-slate-950 font-bold shadow-sm',
        surahBadgeInactive: 'bg-slate-800/80 text-white font-bold border border-slate-700',
        activeTabBg: 'bg-slate-800/80 text-white border-0 shadow-xs font-extrabold',
        buttonAccent: 'bg-white text-slate-950 font-bold hover:bg-slate-100 shadow-md',
        accentBorder: 'border-white/10',
        isDark: true,
      };

    case 'cyan':
      return {
        rootBg: 'bg-[#FFFFFF] text-cyan-950',
        cardGlass: 'bg-[#FFFFFF] border border-sky-100/50 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.08),0_8px_10px_-6px_rgba(0,0,0,0.04)] text-[#0C4A6E] rounded-[32px]',
        navGlass: 'bg-[#FFFFFF] border border-sky-100/50 text-cyan-950 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.08),0_8px_10px_-6px_rgba(0,0,0,0.04)] rounded-[32px]',
        playerGlass: 'bg-[#FFFFFF] border border-sky-100/50 text-cyan-950 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.08),0_8px_10px_-6px_rgba(0,0,0,0.04)] rounded-[32px]',
        modalGlass: 'bg-[#FFFFFF] border border-sky-100/50 text-cyan-950 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.08),0_8px_10px_-6px_rgba(0,0,0,0.04)] rounded-[32px]',
        textPrimary: 'text-[#0C4A6E] font-bold',
        textSecondary: 'text-sky-950 font-semibold',
        textAccent: 'text-sky-700 font-bold',
        arabicVerseText: 'text-[#0C4A6E] font-normal',
        kurdishText: 'text-cyan-900 font-medium',
        ayahBadge: 'bg-sky-100 text-cyan-950 border border-sky-300 font-extrabold shadow-xs',
        surahBadgeActive: 'bg-sky-600 text-white font-bold shadow-sm',
        surahBadgeInactive: 'bg-sky-100/80 text-cyan-950 font-bold border border-sky-200',
        activeTabBg: 'bg-sky-100/80 text-cyan-950 border-0 shadow-xs font-extrabold',
        buttonAccent: 'bg-sky-600 hover:bg-sky-700 text-white font-bold shadow-md shadow-sky-600/20',
        accentBorder: 'border-sky-300/40',
        isDark: false,
      };

    case 'green':
      return {
        rootBg: 'bg-[#FFFFFF] text-emerald-950',
        cardGlass: 'bg-[#FFFFFF] border border-emerald-100/50 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.08),0_8px_10px_-6px_rgba(0,0,0,0.04)] text-[#064E3B] rounded-[32px]',
        navGlass: 'bg-[#FFFFFF] border border-emerald-100/50 text-emerald-950 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.08),0_8px_10px_-6px_rgba(0,0,0,0.04)] rounded-[32px]',
        playerGlass: 'bg-[#FFFFFF] border border-emerald-100/50 text-emerald-950 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.08),0_8px_10px_-6px_rgba(0,0,0,0.04)] rounded-[32px]',
        modalGlass: 'bg-[#FFFFFF] border border-emerald-100/50 text-emerald-950 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.08),0_8px_10px_-6px_rgba(0,0,0,0.04)] rounded-[32px]',
        textPrimary: 'text-[#064E3B] font-bold',
        textSecondary: 'text-emerald-950 font-semibold',
        textAccent: 'text-emerald-700 font-bold',
        arabicVerseText: 'text-[#064E3B] font-normal',
        kurdishText: 'text-emerald-900 font-medium',
        ayahBadge: 'bg-emerald-100 text-emerald-950 border border-emerald-300 font-extrabold shadow-xs',
        surahBadgeActive: 'bg-emerald-600 text-white font-bold shadow-sm',
        surahBadgeInactive: 'bg-emerald-100/80 text-emerald-950 font-bold border border-emerald-200',
        activeTabBg: 'bg-emerald-100/80 text-emerald-950 border-0 shadow-xs font-extrabold',
        buttonAccent: 'bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md shadow-emerald-600/20',
        accentBorder: 'border-emerald-300/40',
        isDark: false,
      };

    case 'yellow':
      return {
        rootBg: 'bg-[#FFFFFF] text-amber-950',
        cardGlass: 'bg-[#FFFFFF] border border-amber-100/50 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.08),0_8px_10px_-6px_rgba(0,0,0,0.04)] text-[#451A03] rounded-[32px]',
        navGlass: 'bg-[#FFFFFF] border border-amber-100/50 text-amber-950 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.08),0_8px_10px_-6px_rgba(0,0,0,0.04)] rounded-[32px]',
        playerGlass: 'bg-[#FFFFFF] border border-amber-100/50 text-amber-950 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.08),0_8px_10px_-6px_rgba(0,0,0,0.04)] rounded-[32px]',
        modalGlass: 'bg-[#FFFFFF] border border-amber-100/50 text-amber-950 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.08),0_8px_10px_-6px_rgba(0,0,0,0.04)] rounded-[32px]',
        textPrimary: 'text-[#451A03] font-bold',
        textSecondary: 'text-amber-950 font-semibold',
        textAccent: 'text-amber-700 font-bold',
        arabicVerseText: 'text-[#451A03] font-normal',
        kurdishText: 'text-amber-900 font-medium',
        ayahBadge: 'bg-amber-100 text-amber-950 border border-amber-300 font-extrabold shadow-xs',
        surahBadgeActive: 'bg-amber-600 text-white font-bold shadow-sm',
        surahBadgeInactive: 'bg-amber-100/80 text-amber-950 font-bold border border-amber-200',
        activeTabBg: 'bg-amber-100/80 text-amber-950 border-0 shadow-xs font-extrabold',
        buttonAccent: 'bg-amber-600 hover:bg-amber-700 text-white font-bold shadow-md shadow-amber-600/20',
        accentBorder: 'border-amber-300/40',
        isDark: false,
      };
  }
};
