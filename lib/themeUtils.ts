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
        navGlass: 'bg-[#FFFFFF]/[0.05] [backdrop-filter:blur(10px)_saturate(180%)] border border-transparent text-slate-900 shadow-none rounded-2xl',
        playerGlass: 'bg-[#FFFFFF]/[0.05] [backdrop-filter:blur(10px)_saturate(180%)] border border-transparent text-slate-900 shadow-none rounded-2xl',
        modalGlass: 'bg-[#FFFFFF]/[0.05] [backdrop-filter:blur(10px)_saturate(180%)] border border-transparent text-slate-900 shadow-none rounded-2xl',
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
        navGlass: 'bg-[#262A2E]/[0.05] [backdrop-filter:blur(10px)_saturate(180%)] border border-transparent text-white shadow-none rounded-2xl',
        playerGlass: 'bg-[#262A2E]/[0.05] [backdrop-filter:blur(10px)_saturate(180%)] border border-transparent text-white shadow-none rounded-2xl',
        modalGlass: 'bg-[#262A2E]/[0.05] [backdrop-filter:blur(10px)_saturate(180%)] text-white border border-transparent shadow-none rounded-2xl',
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
        navGlass: 'bg-[#EBF5FF]/[0.05] [backdrop-filter:blur(10px)_saturate(180%)] border border-transparent text-cyan-950 shadow-none rounded-2xl',
        playerGlass: 'bg-[#EBF5FF]/[0.05] [backdrop-filter:blur(10px)_saturate(180%)] border border-transparent text-cyan-950 shadow-none rounded-2xl',
        modalGlass: 'bg-[#EBF5FF]/[0.05] [backdrop-filter:blur(10px)_saturate(180%)] border border-transparent text-cyan-950 shadow-none rounded-2xl',
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
        navGlass: 'bg-[#E6F8ED]/[0.05] [backdrop-filter:blur(10px)_saturate(180%)] border border-transparent text-emerald-950 shadow-none rounded-2xl',
        playerGlass: 'bg-[#E6F8ED]/[0.05] [backdrop-filter:blur(10px)_saturate(180%)] border border-transparent text-emerald-950 shadow-none rounded-2xl',
        modalGlass: 'bg-[#E6F8ED]/[0.05] [backdrop-filter:blur(10px)_saturate(180%)] border border-transparent text-emerald-950 shadow-none rounded-2xl',
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
        navGlass: 'bg-[#FFFBEA]/[0.05] [backdrop-filter:blur(10px)_saturate(180%)] border border-transparent text-amber-950 shadow-none rounded-2xl',
        playerGlass: 'bg-[#FFFBEA]/[0.05] [backdrop-filter:blur(10px)_saturate(180%)] border border-transparent text-amber-950 shadow-none rounded-2xl',
        modalGlass: 'bg-[#FFFBEA]/[0.05] [backdrop-filter:blur(10px)_saturate(180%)] border border-transparent text-amber-950 shadow-none rounded-2xl',
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
