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
        cardGlass: 'bg-transparent shadow-none border-none rounded-2xl text-slate-900',
        navGlass: 'bg-white/[0.08] backdrop-blur-md backdrop-saturate-200 border border-white/40 shadow-[inset_0_2px_2px_0_rgba(255,255,255,0.85),inset_0_-2px_2px_0_rgba(255,255,255,0.4),0_20px_40px_rgba(0,0,0,0.18)] drop-shadow-[0_12px_28px_rgba(0,0,0,0.12)] text-slate-900 rounded-[36px]',
        playerGlass: 'bg-white/[0.08] backdrop-blur-md backdrop-saturate-200 border border-white/40 shadow-[inset_0_2px_2px_0_rgba(255,255,255,0.85),inset_0_-2px_2px_0_rgba(255,255,255,0.4),0_20px_40px_rgba(0,0,0,0.18)] drop-shadow-[0_12px_28px_rgba(0,0,0,0.12)] text-slate-900 rounded-[36px]',
        modalGlass: 'bg-white/75 backdrop-blur-2xl saturate-200 border border-white/80 shadow-2xl text-slate-900 rounded-3xl',
        textPrimary: 'text-[#000000] font-bold',
        textSecondary: 'text-emerald-800 font-semibold',
        textAccent: 'text-emerald-700 font-bold',
        arabicVerseText: 'text-[#000000] font-normal',
        kurdishText: 'text-emerald-900 font-medium',
        ayahBadge: 'bg-emerald-500/15 text-slate-950 border border-emerald-500/30 font-black shadow-xs',
        surahBadgeActive: 'bg-emerald-500/25 text-emerald-950 font-black border border-emerald-500/40 shadow-xs',
        surahBadgeInactive: 'bg-emerald-500/10 text-slate-900 font-extrabold border border-emerald-500/25',
        activeTabBg: 'bg-emerald-100/80 text-emerald-950 border-0 shadow-xs font-extrabold',
        buttonAccent: 'bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md shadow-emerald-600/20',
        accentBorder: 'border-emerald-500/20',
        isDark: false,
      };

    case 'dark':
      return {
        rootBg: 'bg-[#1E2022] text-white',
        cardGlass: 'bg-transparent shadow-none border-none text-[#F1F5F9] rounded-2xl',
        navGlass: 'bg-black/15 backdrop-blur-md backdrop-saturate-200 border border-white/25 shadow-[inset_0_2px_2px_0_rgba(255,255,255,0.6),inset_0_-2px_2px_0_rgba(255,255,255,0.2),0_20px_40px_rgba(0,0,0,0.35)] drop-shadow-[0_12px_28px_rgba(0,0,0,0.3)] text-white rounded-[36px]',
        playerGlass: 'bg-black/15 backdrop-blur-md backdrop-saturate-200 border border-white/25 shadow-[inset_0_2px_2px_0_rgba(255,255,255,0.6),inset_0_-2px_2px_0_rgba(255,255,255,0.2),0_20px_40px_rgba(0,0,0,0.35)] drop-shadow-[0_12px_28px_rgba(0,0,0,0.3)] text-white rounded-[36px]',
        modalGlass: 'bg-[#1E2022]/80 backdrop-blur-2xl saturate-200 text-white border border-white/20 shadow-2xl rounded-3xl',
        textPrimary: 'text-[#FFFFFF] font-bold',
        textSecondary: 'text-white/90 font-medium',
        textAccent: 'text-white font-bold',
        arabicVerseText: 'text-[#FFFFFF] font-normal',
        kurdishText: 'text-white/90 font-medium',
        ayahBadge: 'bg-emerald-300/80 text-slate-950 font-black border border-emerald-400/60 shadow-xs',
        surahBadgeActive: 'bg-emerald-400/35 text-slate-950 font-black border border-emerald-400/60 shadow-xs',
        surahBadgeInactive: 'bg-slate-300/80 text-slate-950 font-extrabold border border-slate-400/40',
        activeTabBg: 'bg-[#27272A] text-white border-0 shadow-xs font-extrabold',
        buttonAccent: 'bg-white text-black font-bold hover:bg-slate-100 shadow-md',
        accentBorder: 'border-white/10',
        isDark: true,
      };

    case 'cyan':
      return {
        rootBg: 'bg-[#EBF5FF]',
        cardGlass: 'bg-transparent shadow-none border-none text-[#0C4A6E] rounded-2xl',
        navGlass: 'bg-white/[0.08] backdrop-blur-md backdrop-saturate-200 border border-white/40 shadow-[inset_0_2px_2px_0_rgba(255,255,255,0.85),inset_0_-2px_2px_0_rgba(255,255,255,0.4),0_20px_40px_rgba(0,0,0,0.18)] drop-shadow-[0_12px_28px_rgba(0,0,0,0.12)] text-cyan-950 rounded-[36px]',
        playerGlass: 'bg-white/[0.08] backdrop-blur-md backdrop-saturate-200 border border-white/40 shadow-[inset_0_2px_2px_0_rgba(255,255,255,0.85),inset_0_-2px_2px_0_rgba(255,255,255,0.4),0_20px_40px_rgba(0,0,0,0.18)] drop-shadow-[0_12px_28px_rgba(0,0,0,0.12)] text-cyan-950 rounded-[36px]',
        modalGlass: 'bg-[#EBF5FF]/75 backdrop-blur-2xl saturate-200 border border-white/80 text-cyan-950 shadow-2xl rounded-3xl',
        textPrimary: 'text-[#0C4A6E] font-bold',
        textSecondary: 'text-sky-950 font-semibold',
        textAccent: 'text-sky-700 font-bold',
        arabicVerseText: 'text-[#0C4A6E] font-normal',
        kurdishText: 'text-cyan-900 font-medium',
        ayahBadge: 'bg-sky-500/15 text-slate-950 border border-sky-500/30 font-black shadow-xs',
        surahBadgeActive: 'bg-sky-500/25 text-sky-950 font-black border border-sky-500/40 shadow-xs',
        surahBadgeInactive: 'bg-sky-500/10 text-slate-900 font-extrabold border border-sky-500/25',
        activeTabBg: 'bg-sky-100/80 text-cyan-950 border-0 shadow-xs font-extrabold',
        buttonAccent: 'bg-sky-600 hover:bg-sky-700 text-white font-bold shadow-md shadow-sky-600/20',
        accentBorder: 'border-sky-300/40',
        isDark: false,
      };

    case 'green':
      return {
        rootBg: 'bg-[#E6F8ED]',
        cardGlass: 'bg-transparent shadow-none border-none text-[#064E3B] rounded-2xl',
        navGlass: 'bg-white/[0.08] backdrop-blur-md backdrop-saturate-200 border border-white/40 shadow-[inset_0_2px_2px_0_rgba(255,255,255,0.85),inset_0_-2px_2px_0_rgba(255,255,255,0.4),0_20px_40px_rgba(0,0,0,0.18)] drop-shadow-[0_12px_28px_rgba(0,0,0,0.12)] text-emerald-950 rounded-[36px]',
        playerGlass: 'bg-white/[0.08] backdrop-blur-md backdrop-saturate-200 border border-white/40 shadow-[inset_0_2px_2px_0_rgba(255,255,255,0.85),inset_0_-2px_2px_0_rgba(255,255,255,0.4),0_20px_40px_rgba(0,0,0,0.18)] drop-shadow-[0_12px_28px_rgba(0,0,0,0.12)] text-emerald-950 rounded-[36px]',
        modalGlass: 'bg-[#E6F8ED]/75 backdrop-blur-2xl saturate-200 border border-white/80 text-emerald-950 shadow-2xl rounded-3xl',
        textPrimary: 'text-[#064E3B] font-bold',
        textSecondary: 'text-emerald-950 font-semibold',
        textAccent: 'text-emerald-700 font-bold',
        arabicVerseText: 'text-[#064E3B] font-normal',
        kurdishText: 'text-emerald-900 font-medium',
        ayahBadge: 'bg-emerald-500/15 text-slate-950 border border-emerald-500/30 font-black shadow-xs',
        surahBadgeActive: 'bg-emerald-500/25 text-emerald-950 font-black border border-emerald-500/40 shadow-xs',
        surahBadgeInactive: 'bg-emerald-500/10 text-slate-900 font-extrabold border border-emerald-500/25',
        activeTabBg: 'bg-emerald-100/80 text-emerald-950 border-0 shadow-xs font-extrabold',
        buttonAccent: 'bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md shadow-emerald-600/20',
        accentBorder: 'border-emerald-300/40',
        isDark: false,
      };

    case 'yellow':
      return {
        rootBg: 'bg-[#FFFBEA]',
        cardGlass: 'bg-transparent shadow-none border-none text-[#451A03] rounded-2xl',
        navGlass: 'bg-white/[0.08] backdrop-blur-md backdrop-saturate-200 border border-white/40 shadow-[inset_0_2px_2px_0_rgba(255,255,255,0.85),inset_0_-2px_2px_0_rgba(255,255,255,0.4),0_20px_40px_rgba(0,0,0,0.18)] drop-shadow-[0_12px_28px_rgba(0,0,0,0.12)] text-amber-950 rounded-[36px]',
        playerGlass: 'bg-white/[0.08] backdrop-blur-md backdrop-saturate-200 border border-white/40 shadow-[inset_0_2px_2px_0_rgba(255,255,255,0.85),inset_0_-2px_2px_0_rgba(255,255,255,0.4),0_20px_40px_rgba(0,0,0,0.18)] drop-shadow-[0_12px_28px_rgba(0,0,0,0.12)] text-amber-950 rounded-[36px]',
        modalGlass: 'bg-[#FFFBEA]/75 backdrop-blur-2xl saturate-200 border border-white/80 text-amber-950 shadow-2xl rounded-3xl',
        textPrimary: 'text-[#451A03] font-bold',
        textSecondary: 'text-amber-950 font-semibold',
        textAccent: 'text-amber-700 font-bold',
        arabicVerseText: 'text-[#451A03] font-normal',
        kurdishText: 'text-amber-900 font-medium',
        ayahBadge: 'bg-amber-500/20 text-slate-950 border border-amber-500/35 font-black shadow-xs',
        surahBadgeActive: 'bg-amber-500/30 text-amber-950 font-black border border-amber-500/45 shadow-xs',
        surahBadgeInactive: 'bg-amber-500/10 text-slate-900 font-extrabold border border-amber-500/25',
        activeTabBg: 'bg-amber-100/80 text-amber-950 border-0 shadow-xs font-extrabold',
        buttonAccent: 'bg-amber-600 hover:bg-amber-700 text-white font-bold shadow-md shadow-amber-600/20',
        accentBorder: 'border-amber-300/40',
        isDark: false,
      };
  }
};
