import React, { useState, useEffect, useMemo } from 'react';
import { SURAHS_LIST, SAMPLE_VERSES_DATA, SurahMeta, Verse } from '@/data/quranData';

export interface IndexedVerse {
  verse: Verse;
  surahNumber: number;
  surahName: string;
  surahKurdishName: string;
  surahEnglishName: string;
  normText: string;
  normKurdish: string;
}

export const normalizeSearchText = (text: string): string => {
  if (!text) return '';
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/\u0670/g, 'ا')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[\u064b-\u065f\u065c-\u065e\u06d6-\u06ed]/g, '')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .replace(/رحمان/g, 'رحمن')
    .replace(/\s+/g, ' ')
    .trim();
};

// Build search index once for fast runtime lookup across all 6,236 verses
let cachedIndex: IndexedVerse[] | null = null;

export const getSearchIndex = (): IndexedVerse[] => {
  if (cachedIndex && cachedIndex.length > 0) return cachedIndex;

  const surahMap = new Map<number, SurahMeta>();
  SURAHS_LIST.forEach((s) => surahMap.set(s.number, s));

  const index: IndexedVerse[] = [];

  Object.entries(SAMPLE_VERSES_DATA).forEach(([surahNumStr, verses]) => {
    const surahNumber = Number(surahNumStr);
    const surah = surahMap.get(surahNumber);
    const surahName = surah?.name || '';
    const surahKurdishName = surah?.kurdishName || '';
    const surahEnglishName = surah?.englishName || '';

    verses.forEach((v) => {
      index.push({
        verse: v,
        surahNumber,
        surahName,
        surahKurdishName,
        surahEnglishName,
        normText: normalizeSearchText(v.text),
        normKurdish: normalizeSearchText(v.kurdish),
      });
    });
  });

  if (index.length > 0) {
    cachedIndex = index;
  }
  return index;
};

interface HighlightedTextProps {
  text: string;
  searchWords: string[];
  isArabic?: boolean;
  className?: string;
}

// React component to highlight search terms in text
export const HighlightedText: React.FC<HighlightedTextProps> = ({
  text,
  searchWords,
  isArabic,
  className,
}) => {
  if (!text || !searchWords || searchWords.length === 0) {
    return <span className={className}>{text}</span>;
  }

  const diacritics = '[\\u064b-\\u065f\\u0670\\u0671\\u065c-\\u065e\\u06d6-\\u06ed]*';

  const charMap: Record<string, string> = {
    'ا': '[اأإآٱ\\u0670]',
    'أ': '[اأإآٱ\\u0670]',
    'إ': '[اأإآٱ\\u0670]',
    'آ': '[اأإآٱ\\u0670]',
    'ٱ': '[اأإآٱ\\u0670]',
    'ه': '[هة]',
    'ة': '[هة]',
    'ي': '[يى]',
    'ى': '[يى]',
  };

  const patterns = searchWords
    .map((word) => {
      let pattern = '';
      for (let i = 0; i < word.length; i++) {
        const ch = word[i];
        const matchGroup = charMap[ch] || ch.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        pattern += matchGroup + (isArabic ? diacritics : '');
      }
      return pattern;
    })
    .filter(p => typeof p === 'string' && p.trim().length > 0);

  if (patterns.length === 0) {
    return <span className={className}>{text}</span>;
  }

  let parts: string[] = [];
  let testRegex: RegExp | null = null;
  let hasError = false;

  const patternStr = patterns.join('|');
  if (!patternStr) {
    return <span className={className}>{text}</span>;
  }

  try {
    const combinedRegex = new RegExp(`(${patternStr})`, 'gi');
    parts = text.split(combinedRegex);
    testRegex = new RegExp(`^(${patternStr})$`, 'i');
  } catch {
    hasError = true;
  }

  if (hasError || parts.length === 0) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className}>
      {parts.map((part, i) => {
        if (!part) return null;
        const isMatch = testRegex ? testRegex.test(part) : false;

        if (isMatch) {
          return (
            <mark
              key={i}
              className="bg-amber-300/40 text-amber-900 dark:bg-sky-500/30 dark:text-sky-100 rounded px-0.5 font-bold"
            >
              {part}
            </mark>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
};

export interface UseQuranSearchResult {
  matchingSurahs: SurahMeta[];
  matchingVerses: IndexedVerse[];
  searchWords: string[];
  isSearching: boolean;
  debouncedQuery: string;
}

export function useQuranSearch(query: string, limit: number = 200): UseQuranSearchResult {
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 120);

    return () => clearTimeout(timer);
  }, [query]);

  const isSearching = query !== debouncedQuery;

  const normalizedQuery = useMemo(() => normalizeSearchText(debouncedQuery), [debouncedQuery]);
  const searchWords = useMemo(
    () => normalizedQuery.split(' ').filter((w) => w.length > 0),
    [normalizedQuery]
  );

  const searchIndex = useMemo(() => {
    if (typeof window === 'undefined') return [];
    return getSearchIndex();
  }, []);

  const matchingSurahs = useMemo(() => {
    if (!normalizedQuery.trim()) return [];
    return SURAHS_LIST.filter(
      (s) =>
        normalizeSearchText(s.englishName).includes(normalizedQuery) ||
        normalizeSearchText(s.name).includes(normalizedQuery) ||
        normalizeSearchText(s.kurdishName).includes(normalizedQuery) ||
        String(s.number).includes(normalizedQuery)
    );
  }, [normalizedQuery]);

  const matchingVerses = useMemo(() => {
    if (!normalizedQuery.trim() || searchWords.length === 0) return [];

    const matches: IndexedVerse[] = [];
    for (let i = 0; i < searchIndex.length; i++) {
      const item = searchIndex[i];
      const matchInArabic = searchWords.every((w) => item.normText.includes(w));
      const matchInKurdish = searchWords.every((w) => item.normKurdish.includes(w));

      if (matchInArabic || matchInKurdish) {
        matches.push(item);
        if (matches.length >= limit) break;
      }
    }
    return matches;
  }, [normalizedQuery, searchWords, searchIndex, limit]);

  return {
    matchingSurahs,
    matchingVerses,
    searchWords,
    isSearching,
    debouncedQuery,
  };
}
