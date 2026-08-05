'use client';

import React, { useState, useEffect, useRef } from 'react';
import { UnifiedBottomNavBar } from '@/components/UnifiedBottomNavBar';
import { QuranReader } from '@/components/QuranReader';
import { ContentsView } from '@/components/ContentsView';
import { SettingsView } from '@/components/SettingsView';
import { KhatmahTrackerView } from '@/components/KhatmahTrackerView';
import { BookmarksView } from '@/components/BookmarksView';
import { HighlightsView } from '@/components/HighlightsView';
import { SearchView } from '@/components/SearchView';
import { SearchModal } from '@/components/SearchModal';
import { AudioReciterModal } from '@/components/AudioReciterModal';
import { triggerHaptic } from '@/lib/haptics';
import AboutView from '@/components/AboutView';
import DailyAzkarView from '@/components/DailyAzkarView';
import { SURAHS_LIST, SAMPLE_VERSES_DATA, RECITERS, SurahMeta, Verse, Reciter } from '@/data/quranData';
import { Language } from '@/data/translations';
import { ThemeMode, getThemeConfig } from '@/lib/themeUtils';

const stripBismillahPrefix = (text: string, numberInSurah: number, surahNum: number): string => {
  if (numberInSurah !== 1 || surahNum === 1) return text;
  
  let s = text.replace(/^[\uFEFF\u200B\s]+/, '');
  const bismillahPattern = /^(?:بِسْمِ|بِسۡمِ|بِسمِ)\s+[\u0600-\u06FF\s]*?(?:ٱلرَّحِيمِ|ٱلرَّحِيم|الرَّحِيمِ|الرَّحِيمِ|الرحيم)\s*/i;
  
  if (bismillahPattern.test(s)) {
    return s.replace(bismillahPattern, '').trim();
  }

  const bismillahEnding = "ٱلرَّحِيمِ";
  const index = s.indexOf(bismillahEnding);
  if (index !== -1 && index < 45) {
    return s.slice(index + bismillahEnding.length).trim();
  }

  return s;
};

export default function QuranApp() {
  const [currentSurah, setCurrentSurah] = useState<SurahMeta>(SURAHS_LIST[1]); // Al-Baqarah default
  const [currentPage, setCurrentPage] = useState<number>(3);
  const [currentJuz, setCurrentJuz] = useState<number>(1);
  const [activeView, setActiveView] = useState<'reader' | 'contents' | 'settings' | 'khatmah' | 'bookmarks' | 'highlights' | 'search' | 'about' | 'dailyAzkar'>('reader');
  
  const [appLanguage, setAppLanguage] = useState<Language>('ku'); // Default to Sorani Kurdish
  const [translationMode, setTranslationMode] = useState<'arabic' | 'kurdish'>('kurdish');
  const [themeMode, setThemeMode] = useState<ThemeMode>('white');
  const [showBars, setShowBars] = useState(true);
  const toggleBars = () => setShowBars(!showBars);
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large' | 'xlarge'>('medium');

  // Synchronized Font Scaling (Arabic default = 22px, Kurdish default = 16px)
  const [arabicFontSize, setArabicFontSize] = useState<number>(22);
  const kurdishFontSize = Math.max(10, arabicFontSize - 6);

  const handleZoomInFont = () => {
    triggerHaptic(5);
    setArabicFontSize((prev) => Math.min(44, prev + 2));
  };
  const handleZoomOutFont = () => {
    triggerHaptic(5);
    setArabicFontSize((prev) => Math.max(14, prev - 2));
  };

  const [bookmarkedVerses, setBookmarkedVerses] = useState<number[]>([]);
  const [highlightedVerses, setHighlightedVerses] = useState<Record<number, string>>({});

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isReciterModalOpen, setIsReciterModalOpen] = useState(false);
  const [selectedReciter, setSelectedReciter] = useState<Reciter>(RECITERS[0]);

  // Audio Recitation state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVerseIndex, setCurrentVerseIndex] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const preloaderRef = useRef<HTMLAudioElement | null>(null);

  // Dynamic verse storage for all 114 surahs
  const [fetchedVersesMap, setFetchedVersesMap] = useState<Record<number, Verse[]>>({});

  // Derived loading state when verses are not yet in fetched cache
  const isLoadingVerses =
    !fetchedVersesMap[currentSurah.number] &&
    (!SAMPLE_VERSES_DATA[currentSurah.number] ||
      SAMPLE_VERSES_DATA[currentSurah.number].length < currentSurah.numberOfAyahs);

  // Fetch full Quran verses for any selected surah
  useEffect(() => {
    const surahNum = currentSurah.number;
    // Skip fetching only if we already have the FULL set of verses for this surah
    if (
      fetchedVersesMap[surahNum] &&
      fetchedVersesMap[surahNum].length >= currentSurah.numberOfAyahs
    ) {
      return;
    }

    let isMounted = true;
    const controller = new AbortController();

    const fetchVerses = async () => {
      const endpoints = [
        `https://api.alquran.cloud/v1/surah/${surahNum}/editions/quran-uthmani,ku.asan,en.sahih`,
        `https://api.alquran.cloud/v1/surah/${surahNum}/editions/quran-uthmani,ku.asan`,
        `https://api.alquran.cloud/v1/surah/${surahNum}/quran-uthmani`,
      ];

      for (const url of endpoints) {
        if (!isMounted) return;
        try {
          const res = await fetch(url, { signal: controller.signal });
          if (!res.ok) continue;

          const contentType = res.headers.get('content-type');
          if (!contentType || !contentType.includes('application/json')) continue;

          const data = await res.json();
          if (!isMounted) return;

          if (data && data.code === 200 && data.data) {
            let verses: Verse[] = [];
            if (Array.isArray(data.data) && data.data.length >= 1) {
              const uthmaniAyahs = data.data[0].ayahs || [];
              const kurdishAyahs = data.data[1]?.ayahs || [];
              const englishAyahs = data.data[2]?.ayahs || [];

              verses = uthmaniAyahs.map(
                (
                  a: { numberInSurah: number; number: number; text: string; juz: number; page: number },
                  idx: number
                ) => ({
                  numberInSurah: a.numberInSurah,
                  numberInQuran: a.number,
                  text: stripBismillahPrefix(a.text, a.numberInSurah, surahNum),
                  kurdish: kurdishAyahs[idx]?.text || '',
                  english: englishAyahs[idx]?.text || '',
                  juz: a.juz,
                  page: a.page,
                })
              );
            } else if (data.data.ayahs) {
              verses = data.data.ayahs.map(
                (a: { numberInSurah: number; number: number; text: string; juz: number; page: number }) => ({
                  numberInSurah: a.numberInSurah,
                  numberInQuran: a.number,
                  text: stripBismillahPrefix(a.text, a.numberInSurah, surahNum),
                  kurdish: '',
                  english: '',
                  juz: a.juz,
                  page: a.page,
                })
              );
            }

            if (verses.length > 0) {
              setFetchedVersesMap((prev) => ({ ...prev, [surahNum]: verses }));
              break;
            }
          }
        } catch (err: any) {
          if (err.name === 'AbortError') return;
          console.warn(`Attempt failed for endpoint ${url}:`, err);
        }
      }
    };

    fetchVerses();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [currentSurah.number, currentSurah.numberOfAyahs, fetchedVersesMap]);

  // Load verses for current surah - guaranteed to have all ayahs for Surah Al-Baqarah (286 ayahs)
  const versesForCurrentSurah: Verse[] =
    fetchedVersesMap[currentSurah.number] ||
    (SAMPLE_VERSES_DATA[currentSurah.number] &&
    SAMPLE_VERSES_DATA[currentSurah.number].length >= currentSurah.numberOfAyahs
      ? SAMPLE_VERSES_DATA[currentSurah.number]
      : Array.from({ length: currentSurah.numberOfAyahs }, (_, i) => {
          const sampleMatch = SAMPLE_VERSES_DATA[currentSurah.number]?.[i];
          return {
            numberInSurah: i + 1,
            numberInQuran: sampleMatch ? sampleMatch.numberInQuran : (currentSurah.number === 2 ? 8 + i : currentSurah.number * 100 + i + 1),
            text: sampleMatch ? sampleMatch.text : `وَٱللَّهُ يَعْلَمُ مَا تُسِرُّونَ وَمَا تُعْلِنُونَ ﴿${i + 1}﴾`,
            kurdish: sampleMatch ? sampleMatch.kurdish : `خوای گەورە ئاگاداری ئەوەیە کە دەیشارنەوە و ئەوەی ئاشکرای دەکەن.`,
            english: sampleMatch ? sampleMatch.english : `And Allah knows what you conceal and what you declare.`,
            juz: currentSurah.juz,
            page: currentSurah.page,
          };
        }));

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (preloaderRef.current) {
        preloaderRef.current.src = '';
      }
    };
  }, []);

  // Helper function to calculate Islamic Network Quran Audio endpoint URL
  const getAudioUrl = (numberInQuran: number, reciterId: string) => {
    return `https://cdn.islamic.network/quran/audio/128/${reciterId}/${numberInQuran}.mp3`;
  };

  // Preload upcoming Ayah in background for gapless playback
  const preloadNextAyah = (currentVerseNumInQuran: number, reciterId: string) => {
    if (currentVerseNumInQuran >= 6236) return;
    const nextUrl = getAudioUrl(currentVerseNumInQuran + 1, reciterId);

    if (!preloaderRef.current) {
      preloaderRef.current = new Audio();
    }
    preloaderRef.current.src = nextUrl;
    preloaderRef.current.preload = 'auto';
    preloaderRef.current.load();
  };

  // Core function to play verse and setup continuous auto-advance listeners
  const playVerse = (surah: SurahMeta, verseIndex: number, autoStart = true) => {
    const currentVerses = surah.number === currentSurah.number
      ? versesForCurrentSurah
      : fetchedVersesMap[surah.number] || SAMPLE_VERSES_DATA[surah.number] || [];

    const verse = currentVerses[verseIndex];
    if (!verse) {
      setIsPlaying(false);
      return;
    }

    setCurrentVerseIndex(verseIndex);
    if (autoStart) setIsPlaying(true);

    const audioUrl = getAudioUrl(verse.numberInQuran, selectedReciter.id);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.onended = null;
      audioRef.current.ontimeupdate = null;
    }

    const audio = new Audio(audioUrl);
    audioRef.current = audio;

    audio.ontimeupdate = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);
    };

    audio.onended = () => {
      // 1. AUTO-ADVANCE LOGIC: Increments active Ayah index and continues seamlessly across Ayahs & Surahs
      handleNextVerseAuto(surah, verseIndex, currentVerses.length);
    };

    // 2. PRELOADING: Preload the audio of the upcoming Ayah in background to eliminate gaps
    preloadNextAyah(verse.numberInQuran, selectedReciter.id);

    if (autoStart) {
      audio.play().catch((err) => {
        console.warn('Audio playback error:', err);
      });
    }
  };

  const handleNextVerseAuto = (surah: SurahMeta, index: number, totalVersesInSurah: number) => {
    if (index + 1 < totalVersesInSurah) {
      playVerse(surah, index + 1, true);
    } else if (surah.number < 114) {
      // Transition seamlessly to Ayah 1 of the next Surah
      const nextSurah = SURAHS_LIST.find((s) => s.number === surah.number + 1);
      if (nextSurah) {
        setCurrentSurah(nextSurah);
        setCurrentPage(nextSurah.page);
        setTimeout(() => {
          playVerse(nextSurah, 0, true);
        }, 150);
      } else {
        setIsPlaying(false);
        setCurrentVerseIndex(null);
      }
    } else {
      setIsPlaying(false);
      setCurrentVerseIndex(null);
    }
  };

  const handleNextVerse = () => {
    const idx = currentVerseIndex ?? 0;
    handleNextVerseAuto(currentSurah, idx, versesForCurrentSurah.length);
  };

  const handlePrevVerse = () => {
    if (currentTime > 3 && audioRef.current) {
      audioRef.current.currentTime = 0;
      return;
    }
    const idx = currentVerseIndex ?? 0;
    if (idx > 0) {
      playVerse(currentSurah, idx - 1, true);
    } else if (currentSurah.number > 1) {
      const prevSurah = SURAHS_LIST.find((s) => s.number === currentSurah.number - 1);
      if (prevSurah) {
        setCurrentSurah(prevSurah);
        setCurrentPage(prevSurah.page);
        const prevVerses = fetchedVersesMap[prevSurah.number] || SAMPLE_VERSES_DATA[prevSurah.number] || [];
        const lastIdx = Math.max(0, prevVerses.length - 1);
        playVerse(prevSurah, lastIdx, true);
      }
    }
  };

  const togglePlayAudio = () => {
    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      if (audioRef.current && audioRef.current.src) {
        audioRef.current.play().catch(() => {
          playVerse(currentSurah, currentVerseIndex ?? 0, true);
        });
      } else {
        playVerse(currentSurah, currentVerseIndex ?? 0, true);
      }
    }
  };

  const handleSeek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleSelectSurah = (surah: SurahMeta, page?: number) => {
    triggerHaptic(20);
    setCurrentSurah(surah);
    setCurrentPage(page || surah.page);
    setActiveView('reader');
    if (isPlaying) {
      setIsPlaying(false);
      if (audioRef.current) audioRef.current.pause();
    }
    setCurrentVerseIndex(null);
    setShowBars(false);
  };

  const handleToggleBookmark = (num: number) => {
    triggerHaptic(15);
    setBookmarkedVerses((prev) =>
      prev.includes(num) ? prev.filter((n) => n !== num) : [...prev, num]
    );
  };

  const handleToggleHighlight = (num: number, color: string) => {
    setHighlightedVerses((prev) => {
      const next = { ...prev };
      if (next[num]) {
        delete next[num];
      } else {
        next[num] = color || 'bg-emerald-500/20 text-emerald-950 dark:text-emerald-100';
      }
      return next;
    });
  };

  // Sync body and html background with theme
  useEffect(() => {
    const colors = {
      white: '#FFFFFF',
      dark: '#1E2022',
      cyan: '#EBF5FF',
      green: '#E6F8ED',
      yellow: '#FFFBEA'
    };
    const color = colors[themeMode] || '#FFFFFF';
    document.body.style.backgroundColor = color;
    document.documentElement.style.backgroundColor = color;
  }, [themeMode]);

  // Background style based on theme mode
  const getBgStyle = () => {
    return getThemeConfig(themeMode).rootBg;
  };

  const currentVerse = currentVerseIndex !== null ? versesForCurrentSurah[currentVerseIndex] || null : null;

  return (
    <div
      dir={appLanguage === 'en' ? 'ltr' : 'rtl'}
      className={`min-h-screen flex flex-col relative overflow-x-hidden transition-colors duration-500 bg-fixed ${getBgStyle()}`}
    >
      
      {/* Main Views Container */}
      <main className="flex-1 w-full relative pt-6" onClick={toggleBars}>
        {activeView === 'reader' && (
          isLoadingVerses ? (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/10 backdrop-blur-sm">
              <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <QuranReader
              key={currentSurah.number}
              currentSurah={currentSurah}
              verses={versesForCurrentSurah}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              onVisibleVerseChange={(verse) => {
                if (verse.juz !== currentJuz) setCurrentJuz(verse.juz);
                if (verse.page !== currentPage) setCurrentPage(verse.page);
              }}
              currentVerseIndex={currentVerseIndex}
              isPlaying={isPlaying}
              onPlayVerseAudio={(verse) => {
                const idx = versesForCurrentSurah.findIndex((v) => v.numberInQuran === verse.numberInQuran);
                playVerse(currentSurah, idx >= 0 ? idx : 0, true);
              }}
              translationMode={translationMode}
              onSelectTranslationMode={(mode) => setTranslationMode(mode)}
              bookmarkedVerses={bookmarkedVerses}
              onToggleBookmark={handleToggleBookmark}
              highlightedVerses={highlightedVerses}
              onToggleHighlight={handleToggleHighlight}
              themeMode={themeMode}
              isLoadingVerses={isLoadingVerses}
              arabicFontSize={arabicFontSize}
              kurdishFontSize={kurdishFontSize}
              onZoomInFont={handleZoomInFont}
              onZoomOutFont={handleZoomOutFont}
              appLanguage={appLanguage}
              toggleBars={toggleBars}
            />
          )
        )}

        {activeView === 'contents' && (
          <ContentsView
            onSelectSurah={(surah) => handleSelectSurah(surah)}
            currentSurahNumber={currentSurah.number}
            themeMode={themeMode}
            appLanguage={appLanguage}
          />
        )}

        {activeView === 'settings' && (
          <SettingsView
            onBack={() => setActiveView('reader')}
            themeMode={themeMode}
            setThemeMode={setThemeMode}
            translationMode={translationMode}
            setTranslationMode={setTranslationMode}
            fontSize={fontSize}
            setFontSize={setFontSize}
            selectedReciterName={selectedReciter.name}
            onOpenReciterSelector={() => setIsReciterModalOpen(true)}
            appLanguage={appLanguage}
            setAppLanguage={setAppLanguage}
          />
        )}

        {activeView === 'khatmah' && (
          <KhatmahTrackerView
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            themeMode={themeMode}
          />
        )}

        {activeView === 'bookmarks' && (
          <BookmarksView
            bookmarkedVerseNumbers={bookmarkedVerses}
            onToggleBookmark={handleToggleBookmark}
            onSelectVerse={(surahNum, page) => {
              const surah = SURAHS_LIST.find((s) => s.number === surahNum) || SURAHS_LIST[0];
              handleSelectSurah(surah, page);
            }}
            themeMode={themeMode}
            appLanguage={appLanguage}
          />
        )}

        {activeView === 'highlights' && (
          <HighlightsView
            highlightedVerses={highlightedVerses}
            onToggleHighlight={handleToggleHighlight}
            onSelectVerse={(surahNum, page) => {
              const surah = SURAHS_LIST.find((s) => s.number === surahNum) || SURAHS_LIST[0];
              handleSelectSurah(surah, page);
            }}
            themeMode={themeMode}
            appLanguage={appLanguage}
          />
        )}

        {activeView === 'search' && (
          <SearchView
            onSelectSurah={(surah, page) => {
              handleSelectSurah(surah, page);
              setActiveView('reader');
            }}
            themeMode={themeMode}
            appLanguage={appLanguage}
          />
        )}

        {activeView === 'about' && (
          <AboutView appLanguage={appLanguage} themeMode={themeMode} />
        )}

        {activeView === 'dailyAzkar' && (
          <DailyAzkarView
            appLanguage={appLanguage}
            themeMode={themeMode}
            onClose={() => setActiveView('reader')}
          />
        )}
      </main>

      {/* Unified Bottom Navigation Bar */}
      <UnifiedBottomNavBar
        activeView={activeView}
        setActiveView={setActiveView}
        openPageJump={() => setActiveView('contents')}
        themeMode={themeMode}
        setThemeMode={setThemeMode}
        translationMode={translationMode}
        setTranslationMode={setTranslationMode}
        onZoomInFont={handleZoomInFont}
        onZoomOutFont={handleZoomOutFont}
        appLanguage={appLanguage}
        setAppLanguage={setAppLanguage}
        showBars={showBars}
        setShowBars={setShowBars}
        currentJuz={currentJuz}
        currentPage={currentPage}
      />

      {/* Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectSurah={(surah, page) => handleSelectSurah(surah, page)}
        themeMode={themeMode}
        appLanguage={appLanguage}
      />

      <AudioReciterModal
        isOpen={isReciterModalOpen}
        onClose={() => setIsReciterModalOpen(false)}
        selectedReciter={selectedReciter}
        onSelectReciter={(reciter) => {
          setSelectedReciter(reciter);
          if (isPlaying && currentVerseIndex !== null) {
            playVerse(currentSurah, currentVerseIndex, true);
          }
        }}
        themeMode={themeMode}
      />

    </div>
  );
}
