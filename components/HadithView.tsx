'use client';

import React, { useState } from 'react';
import { BookOpen, Sparkles, Share2, Copy, Check } from 'lucide-react';
import { IconBox } from '@/components/IconBox';
import { triggerHaptic } from '@/lib/haptics';
import { Language, TRANSLATIONS, toLocalizedNumeral } from '@/data/translations';
import { ThemeMode, getThemeConfig } from '@/lib/themeUtils';

interface HadithItem {
  id: number;
  arabic: string;
  kurdish: string;
  english: string;
  source: string;
}

const HADITHS_DATA: HadithItem[] = [
  {
    id: 1,
    arabic: "إِنَّمَا الْأَعْمَالُ بِالنَّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى",
    kurdish: "کردەوەکان تەنها بە نیازن، و بۆ هەر کەسێک ئەوەیە کە نویویەتی.",
    english: "Actions are but by intention and every man shall have but that which he intended.",
    source: "صحيح البخاري ومسلم"
  },
  {
    id: 2,
    arabic: "الدِّينُ النَّصِيحَةُ",
    kurdish: "ئایین ئامۆژگارییە.",
    english: "Religion is sincerity (advice/good counsel).",
    source: "صحيح مسلم"
  },
  {
    id: 3,
    arabic: "لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ",
    kurdish: "هیچ یەکێک لە ئێوە باوەڕدار نابێت هەتا ئەوەی بۆ خۆی پێی خۆشە بۆ براکەی پێی خۆش نەبێت.",
    english: "None of you truly believes until he loves for his brother that which he loves for himself.",
    source: "صحيح البخاري ومسلم"
  },
  {
    id: 4,
    arabic: "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ",
    kurdish: "هەرکەسێک باوەڕی بە خودا و ڕۆژی دوایی هەیە، با قسەی خێر بكات یان بێدەنگ بێت.",
    english: "Whoever believes in Allah and the Last Day should speak what is good or keep silent.",
    source: "صحيح البخاري ومسلم"
  },
  {
    id: 5,
    arabic: "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ",
    kurdish: "باشترینی ئێوە ئەوەیە کە قورئان فێر دەبێت و فێری خەڵکی تری دەکات.",
    english: "The best among you are those who learn the Quran and teach it.",
    source: "صحيح البخاري"
  },
  {
    id: 6,
    arabic: "الطُّهُورُ شَطْرُ الْإِيمَانِ",
    kurdish: "پاکوخاوێنی نیوەی باوەڕە.",
    english: "Purity is half of faith.",
    source: "صحيح مسلم"
  },
  {
    id: 7,
    arabic: "اتَّقِ اللَّهَ حَيْثُمَا كُنْتَ، وَأَتْبِعِ السَّيِّئَةَ الْحَسَنَةَ تَمْحُهَا، وَخَالِقِ النَّاسَ بِخُلُقٍ حَسَنٍ",
    kurdish: "لە خودا بترسە لە هەرکوێیەک بایت، و کارە خراپە بە چاکە بەدوایدا بێنە تا بینمڕێنێت، و بە ڕەوشتێکی جوانەوە هەڵسوکەوت لەگەڵ خەڵکدا بکە.",
    english: "Fear Allah wherever you are, follow up a bad deed with a good deed so it wipes it out, and behave well towards people.",
    source: "جامع الترمذي"
  },
  {
    id: 8,
    arabic: "اكْمَلُ الْمُؤْمِنِينَ إِيمَانًا أَحْسَنُهُمْ خُلُقًا",
    kurdish: "تەواوترین باوەڕدار لەڕووی باوەڕەوە ئەوانەن کە ڕەوشتۆکەیان جوانترە.",
    english: "The most complete of believers in faith are those with the best character.",
    source: "سنن أبو داود والترمذي"
  }
];

interface HadithViewProps {
  appLanguage: Language;
  themeMode: ThemeMode;
}

export const HadithView: React.FC<HadithViewProps> = ({ appLanguage, themeMode }) => {
  const t = TRANSLATIONS[appLanguage];
  const themeConfig = getThemeConfig(themeMode);
  const cardGlassClass = themeConfig.cardGlass;

  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleCopy = (item: HadithItem) => {
    triggerHaptic(10);
    const text = `${item.arabic}\n\n${appLanguage === 'ku' ? item.kurdish : item.english}\n\n(${item.source})`;
    navigator.clipboard.writeText(text);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getHadithTitle = () => {
    if (appLanguage === 'ku') return 'فەرموودە پیرۆزەکانی پێغەمبەر ﷺ';
    if (appLanguage === 'ar') return 'الأحاديث النبوية الشريفة';
    return 'Prophetic Hadiths';
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-4 pb-36 min-h-screen">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-amber-500" />
          {getHadithTitle()}
        </h1>
      </div>

      {/* Hadith List */}
      <div className="space-y-4">
        {HADITHS_DATA.map((item, index) => {
          const mainText = appLanguage === 'ku' ? item.kurdish : appLanguage === 'ar' ? item.arabic : item.english;
          const secondaryText = appLanguage === 'ar' ? item.kurdish : item.arabic;

          return (
            <div
              key={item.id}
              className={`rounded-2xl p-5 sm:p-6 shadow-md transition-all ${cardGlassClass} border border-white/40 dark:border-white/20`}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-extrabold text-xs">
                  {toLocalizedNumeral(index + 1, appLanguage)}
                </span>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300">
                  {item.source}
                </span>
              </div>

              {/* Arabic text */}
              <p className="text-right font-serif text-lg sm:text-xl text-slate-900 dark:text-white leading-loose mb-3">
                {item.arabic}
              </p>

              {/* Translation text */}
              <p className={`text-sm sm:text-base ${appLanguage === 'ku' ? 'kurdish-text' : ''} text-slate-700 dark:text-slate-300 leading-relaxed mb-4 border-t border-slate-200/40 dark:border-white/10 pt-3`}>
                {appLanguage === 'ku' ? item.kurdish : appLanguage === 'ar' ? item.kurdish : item.english}
              </p>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => handleCopy(item)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/40 dark:bg-black/30 hover:bg-white/60 dark:hover:bg-black/50 text-xs font-bold text-slate-700 dark:text-slate-200 transition-all border border-white/40 dark:border-white/10"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>{appLanguage === 'ku' ? 'کۆپیکرا' : appLanguage === 'ar' ? 'تم النسخ' : 'Copied'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>{appLanguage === 'ku' ? 'کۆپیکردن' : appLanguage === 'ar' ? 'نسخ' : 'Copy'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HadithView;
