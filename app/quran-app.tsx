'use client';
import React, { useState, useEffect } from 'react';
import { UnifiedBottomNavBar } from '@/components/UnifiedBottomNavBar';
import { QuranReader } from '@/components/QuranReader';
import { ContentsView } from '@/components/ContentsView';
import { SettingsView } from '@/components/SettingsView';
import { KhatmahTrackerView } from '@/components/KhatmahTrackerView';
import { BookmarksView } from '@/components/BookmarksView';
import { HighlightsView } from '@/components/HighlightsView';
import { SearchView } from '@/components/SearchView';
import AboutView from '@/components/AboutView';
import { DailyAzkarView } from '@/components/DailyAzkarView';
import { HadithView } from '@/components/HadithView';
import { AthanView } from '@/components/AthanView';
import { AudioReciterModal } from '@/components/AudioReciterModal';
import { SURAHS_LIST, SurahMeta, loadQuranData, Verse, RECITERS, Reciter } from '@/data/quranData';
import { ThemeMode, getThemeConfig } from '@/lib/themeUtils';
import { Language } from '@/data/translations';

export default function QuranApp() {
  const [activeView, setActiveView] = useState<'reader' | 'contents' | 'settings' | 'khatmah' | 'bookmarks' | 'highlights' | 'search' | 'about' | 'dailyAzkar' | 'athan' | 'recitation' | 'qibla' | 'hadith'>('contents');
  const [currentSurah, setCurrentSurah] = useState<SurahMeta>(SURAHS_LIST[0]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentVerseIndex, setCurrentVerseIndex] = useState<number | null>(null);
  const [themeMode, setThemeMode] = useState<ThemeMode>('white');
  const [translationMode, setTranslationMode] = useState<'arabic' | 'kurdish'>('kurdish');
  const [appLanguage, setAppLanguage] = useState<Language>('ku');
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookmarkedVerses, setBookmarkedVerses] = useState<number[]>([]);
  const [highlightedVerses, setHighlightedVerses] = useState<Record<number, string>>({});
  const [arabicFontSize, setArabicFontSize] = useState<number>(36);
  const [kurdishFontSize, setKurdishFontSize] = useState<number>(20);
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large' | 'xlarge'>('medium');
  const [selectedReciter, setSelectedReciter] = useState<Reciter>(RECITERS[0]);
  const [isReciterModalOpen, setIsReciterModalOpen] = useState<boolean>(false);

  const [showBars, setShowBars] = useState<boolean>(true);

  const handleToggleBookmark = (verseNumber: number) => {
    setBookmarkedVerses(prev => 
      prev.includes(verseNumber) ? prev.filter(v => v !== verseNumber) : [...prev, verseNumber]
    );
  };

  const handleToggleHighlight = (verseNumber: number, color: string) => {
    setHighlightedVerses(prev => {
      const next = { ...prev };
      if (next[verseNumber] === color) {
        delete next[verseNumber];
      } else {
        next[verseNumber] = color;
      }
      return next;
    });
  };

  const handleZoomInFont = () => {
    setArabicFontSize(prev => Math.min(prev + 4, 72));
    setKurdishFontSize(prev => Math.min(prev + 2, 40));
  };

  const handleZoomOutFont = () => {
    setArabicFontSize(prev => Math.max(prev - 4, 20));
    setKurdishFontSize(prev => Math.max(prev - 2, 12));
  };
  
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const handlePlayVerseAudio = (verse: Verse) => {
    try {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (currentVerseIndex === verse.numberInSurah - 1) {
        setCurrentVerseIndex(null);
        return;
      }
      const audioUrl = `${selectedReciter.server}${verse.numberInQuran}.mp3`;
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      setCurrentVerseIndex(verse.numberInSurah - 1);

      audio.play().catch((err) => {
        console.warn('Audio play failed:', err);
        setCurrentVerseIndex(null);
      });

      audio.onended = () => {
        setCurrentVerseIndex(null);
      };
    } catch (e) {
      console.warn('Audio creation failed:', e);
      setCurrentVerseIndex(null);
    }
  };

  const handleSurahSelect = (surah: SurahMeta) => {
    setCurrentSurah(surah);
    setCurrentPage(surah.page);
    setActiveView('reader');
  };

  useEffect(() => {
    let isMounted = true;
    loadQuranData().then(data => {
      if (isMounted && data && data[currentSurah.number]) {
        setVerses(data[currentSurah.number]);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [currentSurah.number]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        {activeView === 'contents' && (
          <ContentsView 
            onSelectSurah={handleSurahSelect} 
            currentSurahNumber={currentSurah.number}
            themeMode={themeMode}
            appLanguage={appLanguage}
          />
        )}
        {activeView === 'reader' && (
          <QuranReader
            currentSurah={currentSurah}
            verses={verses}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            currentVerseIndex={currentVerseIndex}
            onPlayVerseAudio={handlePlayVerseAudio}
            translationMode={translationMode}
            onSelectTranslationMode={setTranslationMode}
            bookmarkedVerses={bookmarkedVerses}
            onToggleBookmark={handleToggleBookmark}
            highlightedVerses={highlightedVerses}
            onToggleHighlight={handleToggleHighlight}
            themeMode={themeMode}
            arabicFontSize={arabicFontSize}
            kurdishFontSize={kurdishFontSize}
            onZoomInFont={handleZoomInFont}
            onZoomOutFont={handleZoomOutFont}
            appLanguage={appLanguage}
            toggleBars={() => setShowBars(prev => !prev)}
          />
        )}
        {activeView === 'settings' && (
          <SettingsView
            onBack={() => setActiveView('contents')}
            themeMode={themeMode}
            setThemeMode={setThemeMode}
            appLanguage={appLanguage}
            setAppLanguage={setAppLanguage}
            translationMode={translationMode}
            setTranslationMode={setTranslationMode}
            fontSize={fontSize}
            setFontSize={setFontSize}
            selectedReciterName={selectedReciter.name}
            onOpenReciterSelector={() => setIsReciterModalOpen(true)}
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
            onSelectVerse={(_surahNum, page) => {
              setCurrentPage(page);
              setActiveView('reader');
            }}
            themeMode={themeMode}
            appLanguage={appLanguage}
          />
        )}
        {activeView === 'highlights' && (
          <HighlightsView
            highlightedVerses={highlightedVerses}
            onToggleHighlight={handleToggleHighlight}
            onSelectVerse={(_surahNum, page) => {
              setCurrentPage(page);
              setActiveView('reader');
            }}
            themeMode={themeMode}
            appLanguage={appLanguage}
          />
        )}
        {activeView === 'search' && (
          <SearchView
            onSelectSurah={(surah, page) => {
              setCurrentSurah(surah);
              setCurrentPage(page);
              setActiveView('reader');
            }}
            themeMode={themeMode}
            appLanguage={appLanguage}
          />
        )}
        {activeView === 'about' && <AboutView themeMode={themeMode} appLanguage={appLanguage} />}
        {activeView === 'dailyAzkar' && <DailyAzkarView themeMode={themeMode} appLanguage={appLanguage} />}
        {activeView === 'hadith' && <HadithView themeMode={themeMode} appLanguage={appLanguage} />}
        {activeView === 'athan' && <AthanView themeMode={themeMode} appLanguage={appLanguage} />}
        
        {/* Placeholder for remaining unbuilt sections */}
        {['recitation', 'qibla'].includes(activeView) && (
          <div className="p-8 text-center text-slate-500">Feature coming soon...</div>
        )}
      </div>
      
      <UnifiedBottomNavBar
        activeView={activeView}
        setActiveView={setActiveView}
        openPageJump={() => {}}
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
        currentJuz={currentSurah.juz || 1}
        currentPage={currentPage}
        currentSurah={currentSurah}
      />

      <AudioReciterModal
        isOpen={isReciterModalOpen}
        onClose={() => setIsReciterModalOpen(false)}
        selectedReciter={selectedReciter}
        onSelectReciter={setSelectedReciter}
        themeMode={themeMode}
      />
    </div>
  );
}
