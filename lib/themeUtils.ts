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
        cardGlass: 'bg-slate-50/95 backdrop-blur-[16px] border border-emerald-500/25 shadow-lg shadow-emerald-950/5 text-slate-900',
        navGlass: 'bg-slate-50/95 backdrop-blur-[20px] border border-emerald-500/30 text-slate-900 shadow-md shadow-emerald-950/5',
        playerGlass: 'bg-slate-50/95 backdrop-blur-[20px] border border-emerald-500/30 text-slate-900 shadow-xl shadow-emerald-950/10',
        modalGlass: 'bg-white/98 backdrop-blur-[20px] border border-emerald-500/35 text-slate-900 shadow-2xl shadow-emerald-950/15',
        textPrimary: 'text-slate-900 font-bold',
        textSecondary: 'text-emerald-700 font-semibold',
        textAccent: 'text-emerald-600 font-bold',
        arabicVerseText: 'text-[#000000] font-extrabold',
        kurdishText: 'text-emerald-800 font-medium',
        ayahBadge: 'bg-[#DCFCE7] text-[#000000] border border-emerald-300 shadow-xs font-extrabold',
        surahBadgeActive: 'bg-emerald-600 text-white font-bold',
        surahBadgeInactive: 'bg-emerald-100 text-emerald-950 font-bold border border-emerald-300/80',
        activeTabBg: 'bg-emerald-500/15 text-emerald-800 border border-emerald-500/30 font-bold',
        buttonAccent: 'bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md shadow-emerald-600/20',
        accentBorder: 'border-emerald-500/30',
        isDark: false,
      };

    case 'dark':
      return {
        rootBg: 'bg-[#1E293B] text-white',
        cardGlass: 'bg-slate-800/80 backdrop-blur-[16px] border border-white/20 shadow-xl shadow-black/20 text-white',
        navGlass: 'bg-slate-800/85 backdrop-blur-[20px] border border-white/20 text-white shadow-lg shadow-black/25',
        playerGlass: 'bg-slate-800/90 backdrop-blur-[20px] border border-white/25 text-white shadow-2xl shadow-black/30',
        modalGlass: 'bg-slate-800/95 backdrop-blur-[20px] border border-white/25 text-white shadow-2xl shadow-black/40',
        textPrimary: 'text-white font-bold',
        textSecondary: 'text-white/90 font-medium',
        textAccent: 'text-white font-bold',
        arabicVerseText: 'text-white font-extrabold',
        kurdishText: 'text-white/90 font-medium',
        ayahBadge: 'bg-white/20 text-white border border-white/35 font-bold',
        surahBadgeActive: 'bg-white text-slate-950 font-bold shadow-md',
        surahBadgeInactive: 'bg-white/15 text-white font-bold border border-white/25',
        activeTabBg: 'bg-white/20 text-white border border-white/35 font-bold',
        buttonAccent: 'bg-white text-slate-950 font-bold hover:bg-slate-100 shadow-md',
        accentBorder: 'border-white/25',
        isDark: true,
      };

    case 'cyan':
      return {
        rootBg: 'bg-gradient-to-br from-[#E0F2FE] via-[#F0F9FF] to-[#DBEAFE] text-cyan-950',
        cardGlass: 'bg-white/75 backdrop-blur-[20px] backdrop-saturate-200 border border-sky-400/40 shadow-lg shadow-sky-900/5 text-cyan-950',
        navGlass: 'bg-white/80 backdrop-blur-[20px] backdrop-saturate-200 border border-sky-400/45 text-cyan-950 shadow-md shadow-sky-900/5',
        playerGlass: 'bg-white/85 backdrop-blur-[20px] backdrop-saturate-200 border border-sky-400/50 text-cyan-950 shadow-xl shadow-sky-900/10',
        modalGlass: 'bg-white/95 backdrop-blur-[20px] backdrop-saturate-200 border border-sky-400/50 text-cyan-950 shadow-2xl shadow-sky-900/15',
        textPrimary: 'text-cyan-950 font-bold',
        textSecondary: 'text-sky-900 font-semibold',
        textAccent: 'text-sky-600 font-bold',
        arabicVerseText: 'text-cyan-950 font-extrabold',
        kurdishText: 'text-cyan-900 font-medium',
        ayahBadge: 'bg-sky-200/95 text-cyan-950 border border-sky-400/60 font-bold',
        surahBadgeActive: 'bg-sky-600 text-white font-bold shadow-md shadow-sky-600/20',
        surahBadgeInactive: 'bg-sky-100/90 text-cyan-950 font-bold border border-sky-300/80',
        activeTabBg: 'bg-sky-500/20 text-cyan-950 border border-sky-500/35 font-bold',
        buttonAccent: 'bg-sky-600 hover:bg-sky-700 text-white font-bold shadow-md shadow-sky-600/20',
        accentBorder: 'border-sky-400/40',
        isDark: false,
      };

    case 'green':
      return {
        rootBg: 'bg-gradient-to-br from-[#DCFCE7] via-[#F0FDF4] to-[#E6F4EA] text-emerald-950',
        cardGlass: 'bg-white/75 backdrop-blur-[20px] backdrop-saturate-200 border border-emerald-400/40 shadow-lg shadow-emerald-900/5 text-emerald-950',
        navGlass: 'bg-white/80 backdrop-blur-[20px] backdrop-saturate-200 border border-emerald-400/45 text-emerald-950 shadow-md shadow-emerald-900/5',
        playerGlass: 'bg-white/85 backdrop-blur-[20px] backdrop-saturate-200 border border-emerald-400/50 text-emerald-950 shadow-xl shadow-emerald-900/10',
        modalGlass: 'bg-white/95 backdrop-blur-[20px] backdrop-saturate-200 border border-emerald-400/50 text-emerald-950 shadow-2xl shadow-emerald-900/15',
        textPrimary: 'text-emerald-950 font-bold',
        textSecondary: 'text-emerald-900 font-semibold',
        textAccent: 'text-emerald-700 font-bold',
        arabicVerseText: 'text-emerald-950 font-extrabold',
        kurdishText: 'text-emerald-900 font-medium',
        ayahBadge: 'bg-emerald-200/95 text-emerald-950 border border-emerald-400/60 font-bold',
        surahBadgeActive: 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-600/20',
        surahBadgeInactive: 'bg-emerald-100/90 text-emerald-950 font-bold border border-emerald-300/80',
        activeTabBg: 'bg-emerald-500/20 text-emerald-950 border border-emerald-500/35 font-bold',
        buttonAccent: 'bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md shadow-emerald-600/20',
        accentBorder: 'border-emerald-400/40',
        isDark: false,
      };

    case 'yellow':
    default:
      return {
        rootBg: 'bg-gradient-to-br from-[#FEF3C7] via-[#FEFCE8] to-[#FFFBEB] text-amber-950',
        cardGlass: 'bg-white/75 backdrop-blur-[20px] backdrop-saturate-200 border border-amber-400/40 shadow-lg shadow-amber-900/5 text-amber-950',
        navGlass: 'bg-white/80 backdrop-blur-[20px] backdrop-saturate-200 border border-amber-400/45 text-amber-950 shadow-md shadow-amber-900/5',
        playerGlass: 'bg-white/85 backdrop-blur-[20px] backdrop-saturate-200 border border-amber-400/50 text-amber-950 shadow-xl shadow-amber-900/10',
        modalGlass: 'bg-white/95 backdrop-blur-[20px] backdrop-saturate-200 border border-amber-400/50 text-amber-950 shadow-2xl shadow-amber-900/15',
        textPrimary: 'text-amber-950 font-bold',
        textSecondary: 'text-amber-900 font-semibold',
        textAccent: 'text-amber-700 font-bold',
        arabicVerseText: 'text-amber-950 font-extrabold',
        kurdishText: 'text-amber-900 font-medium',
        ayahBadge: 'bg-amber-200/95 text-amber-950 border border-amber-400/60 font-bold',
        surahBadgeActive: 'bg-amber-600 text-white font-bold shadow-md shadow-amber-600/20',
        surahBadgeInactive: 'bg-amber-100/90 text-amber-950 font-bold border border-amber-300/80',
        activeTabBg: 'bg-amber-500/20 text-amber-950 border border-amber-500/35 font-bold',
        buttonAccent: 'bg-amber-600 hover:bg-amber-700 text-white font-bold shadow-md shadow-amber-600/20',
        accentBorder: 'border-amber-400/40',
        isDark: false,
      };
  }
};
