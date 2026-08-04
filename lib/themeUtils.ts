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
        rootBg: 'bg-white text-slate-900',
        cardGlass: 'bg-white/90 backdrop-blur-[16px] border-0 shadow-md text-slate-900',
        navGlass: 'bg-white/90 backdrop-blur-[20px] border-0 text-slate-900 shadow-md',
        playerGlass: 'bg-white/92 backdrop-blur-[20px] border-0 text-slate-900 shadow-lg',
        modalGlass: 'bg-white/98 backdrop-blur-[20px] border-0 text-slate-900 shadow-xl',
        textPrimary: 'text-slate-900 font-bold',
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
        rootBg: 'bg-[#1E293B] text-white',
        cardGlass: 'bg-slate-800/80 backdrop-blur-[16px] border-0 shadow-lg text-white',
        navGlass: 'bg-slate-800/85 backdrop-blur-[20px] border-0 text-white shadow-md',
        playerGlass: 'bg-slate-800/90 backdrop-blur-[20px] border-0 text-white shadow-lg',
        modalGlass: 'bg-slate-800 text-white border-0 shadow-xl',
        textPrimary: 'text-white font-bold',
        textSecondary: 'text-white/95 font-medium',
        textAccent: 'text-white font-bold',
        arabicVerseText: 'text-white font-normal',
        kurdishText: 'text-white/95 font-medium',
        ayahBadge: 'bg-slate-700 text-white border border-slate-600 font-bold shadow-xs',
        surahBadgeActive: 'bg-white text-slate-950 font-bold shadow-sm',
        surahBadgeInactive: 'bg-slate-700/80 text-white font-bold border border-slate-600',
        activeTabBg: 'bg-slate-700/80 text-white border-0 shadow-xs font-extrabold',
        buttonAccent: 'bg-white text-slate-950 font-bold hover:bg-slate-100 shadow-md',
        accentBorder: 'border-white/20',
        isDark: true,
      };

    case 'cyan':
      return {
        rootBg: 'bg-gradient-to-br from-[#F0F9FF] via-[#F4FBFF] to-[#EBF8FF] text-cyan-950',
        cardGlass: 'bg-white/85 backdrop-blur-[20px] backdrop-saturate-200 border-0 shadow-md text-cyan-950',
        navGlass: 'bg-white/90 backdrop-blur-[20px] backdrop-saturate-200 border-0 text-cyan-950 shadow-md',
        playerGlass: 'bg-white/92 backdrop-blur-[20px] backdrop-saturate-200 border-0 text-cyan-950 shadow-lg',
        modalGlass: 'bg-white/98 backdrop-blur-[20px] backdrop-saturate-200 border-0 text-cyan-950 shadow-xl',
        textPrimary: 'text-cyan-950 font-bold',
        textSecondary: 'text-sky-950 font-semibold',
        textAccent: 'text-sky-700 font-bold',
        arabicVerseText: 'text-cyan-950 font-normal',
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
        rootBg: 'bg-gradient-to-br from-[#F0FDF4] via-[#F4FDF7] to-[#ECFDF5] text-emerald-950',
        cardGlass: 'bg-white/85 backdrop-blur-[20px] backdrop-saturate-200 border-0 shadow-md text-emerald-950',
        navGlass: 'bg-white/90 backdrop-blur-[20px] backdrop-saturate-200 border-0 text-emerald-950 shadow-md',
        playerGlass: 'bg-white/92 backdrop-blur-[20px] backdrop-saturate-200 border-0 text-emerald-950 shadow-lg',
        modalGlass: 'bg-white/98 backdrop-blur-[20px] backdrop-saturate-200 border-0 text-emerald-950 shadow-xl',
        textPrimary: 'text-emerald-950 font-bold',
        textSecondary: 'text-emerald-950 font-semibold',
        textAccent: 'text-emerald-700 font-bold',
        arabicVerseText: 'text-emerald-950 font-normal',
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
        rootBg: 'bg-gradient-to-br from-[#FEFCE8] via-[#FFFDF4] to-[#FEF9C3] text-amber-950',
        cardGlass: 'bg-white/85 backdrop-blur-[20px] backdrop-saturate-200 border-0 shadow-md text-amber-950',
        navGlass: 'bg-white/90 backdrop-blur-[20px] backdrop-saturate-200 border-0 text-amber-950 shadow-md',
        playerGlass: 'bg-white/92 backdrop-blur-[20px] backdrop-saturate-200 border-0 text-amber-950 shadow-lg',
        modalGlass: 'bg-white/98 backdrop-blur-[20px] backdrop-saturate-200 border-0 text-amber-950 shadow-xl',
        textPrimary: 'text-amber-950 font-bold',
        textSecondary: 'text-amber-950 font-semibold',
        textAccent: 'text-amber-700 font-bold',
        arabicVerseText: 'text-amber-950 font-normal',
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
