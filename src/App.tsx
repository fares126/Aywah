import React, { useState, useEffect, useRef } from 'react';
import { FloatingHeartsCanvas } from './components/FloatingHeartsCanvas';
import { Navbar } from './components/Navbar';
import { LoginPortalModal } from './components/LoginPortalModal';
import { HeroSection } from './components/HeroSection';
import { SealedEnvelopeModal } from './components/SealedEnvelopeModal';
import { LoveReasonsSection } from './components/LoveReasonsSection';
import { MemoriesGallery } from './components/MemoriesGallery';
import { SpecialLoveLetterSection } from './components/SpecialLoveLetterSection';
import { AudioUploaderModal } from './components/AudioUploaderModal';
import { BirthdayCakeSection } from './components/BirthdayCakeSection';
import { AdminBar } from './components/AdminBar';
import { AdminEditModal } from './components/AdminEditModal';
import {
  UserRole,
  SecretLetter,
  PublicLetter,
  LoveReason,
  MemoryPhoto,
  BirthdayCakeData
} from './types';
import {
  getSavedSecretLetter,
  getSavedPublicLetter,
  getSavedLoveReasons,
  getSavedCakeData,
  DEFAULT_SAMPLE_MEMORIES,
  getCustomPhotos,
  getAllMemories,
  getCustomSong,
  getStoredUserRole,
  setStoredUserRole
} from './utils/storage';
import { audioEngine, DEFAULT_OFFICIAL_SONG_NAME } from './utils/audioEngine';
import { Heart, Sparkles, Volume2 } from 'lucide-react';

export default function App() {
  // Authentication & RBAC state
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [userName, setUserName] = useState<string>('');
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false);
  const [isLoginPortalOpen, setIsLoginPortalOpen] = useState<boolean>(true);

  // Letters & Content state
  const [secretLetter, setSecretLetter] = useState<SecretLetter>(getSavedSecretLetter);
  const [publicLetter, setPublicLetter] = useState<PublicLetter>(getSavedPublicLetter);
  const [cakeData, setCakeData] = useState<BirthdayCakeData>(getSavedCakeData);
  const [loveReasons, setLoveReasons] = useState<LoveReason[]>(getSavedLoveReasons);
  const [memories, setMemories] = useState<MemoryPhoto[]>(DEFAULT_SAMPLE_MEMORIES);

  // Modals state
  const [isSecretEnvelopeOpen, setIsSecretEnvelopeOpen] = useState<boolean>(false);
  const [isMusicModalOpen, setIsMusicModalOpen] = useState<boolean>(false);
  const [isAdminEditModalOpen, setIsAdminEditModalOpen] = useState<boolean>(false);
  const [adminEditInitialTab, setAdminEditInitialTab] = useState<'secret' | 'public' | 'dates' | 'cake'>('secret');

  // Audio playback state
  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(false);
  const [isCustomSong, setIsCustomSong] = useState<boolean>(false);
  const [currentSongTitle, setCurrentSongTitle] = useState<string>(DEFAULT_OFFICIAL_SONG_NAME);

  // Initial load
  useEffect(() => {
    // Check stored user role
    const { role, name } = getStoredUserRole();
    if (role) {
      setUserRole(role);
      setUserName(name);
      setIsLoginPortalOpen(false);
    } else {
      setIsLoginPortalOpen(true);
    }

    // Load custom memories from IndexedDB
    loadMemories();

    // Check custom song in IndexedDB
    loadSong();

    // 1. Attempt to play Amer Muneeb's song immediately when site opens
    audioEngine.play().then((started) => {
      if (started) {
        setIsPlayingMusic(true);
      }
    });

    // 2. Browser autoplay fallback: starts music immediately on the very first touch/click
    const handleFirstGesture = async () => {
      const started = await audioEngine.play();
      if (started) {
        setIsPlayingMusic(true);
      }
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
    };

    window.addEventListener('click', handleFirstGesture, { passive: true });
    window.addEventListener('touchstart', handleFirstGesture, { passive: true });
    window.addEventListener('keydown', handleFirstGesture, { passive: true });

    return () => {
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
    };
  }, []);

  const loadMemories = async () => {
    const all = await getAllMemories();
    setMemories(all);
  };

  const loadSong = async () => {
    const songData = await getCustomSong();
    if (songData) {
      audioEngine.setCustomSong(songData.blob, songData.name);
      setIsCustomSong(true);
      setCurrentSongTitle(`📱 ${songData.name}`);
    } else {
      setIsCustomSong(false);
      setCurrentSongTitle(DEFAULT_OFFICIAL_SONG_NAME);
    }
  };

  // Login handler
  const handleLogin = async (role: 'viewer' | 'admin', name: string) => {
    setUserRole(role);
    setUserName(name);
    setStoredUserRole(role, name);
    setIsLoginPortalOpen(false);

    // Auto-start music smoothly upon user login interaction
    const started = await audioEngine.play();
    if (started) {
      setIsPlayingMusic(true);
    }
  };

  // Logout handler
  const handleLogout = () => {
    setUserRole(null);
    setUserName('');
    setIsPreviewMode(false);
    setStoredUserRole(null, '');
    audioEngine.pause();
    setIsPlayingMusic(false);
    setIsLoginPortalOpen(true);
  };

  // Toggle music playback
  const handleToggleMusic = () => {
    const playing = audioEngine.togglePlay();
    setIsPlayingMusic(playing);
  };

  const handleSongChanged = async () => {
    await loadSong();
    setIsPlayingMusic(audioEngine.isPlaying());
  };

  // Effective Admin status (disabled if Faris is previewing as Ayoweh)
  const isEffectiveAdmin = userRole === 'admin' && !isPreviewMode;

  return (
    <div className="relative min-h-screen font-cairo bg-[#0b0612] text-rose-50 selection:bg-rose-500 selection:text-white">
      {/* Dynamic Canvas Background */}
      <FloatingHeartsCanvas />

      {/* Secret Surprise Gatekeeper Modal */}
      <LoginPortalModal
        isOpen={isLoginPortalOpen}
        onLogin={handleLogin}
      />

      {/* Top Navbar */}
      <Navbar
        onOpenSecretLetter={() => setIsSecretEnvelopeOpen(true)}
        isPlayingMusic={isPlayingMusic}
        onToggleMusic={handleToggleMusic}
        onOpenMusicModal={() => setIsMusicModalOpen(true)}
        currentSongTitle={currentSongTitle}
        isCustomSong={isCustomSong}
        userRole={userRole}
        isPreviewMode={isPreviewMode}
        onTogglePreviewMode={() => setIsPreviewMode(!isPreviewMode)}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="relative z-10 pb-28">
        {/* Preview Banner Indicator when Faris is testing Ayoweh view */}
        {userRole === 'admin' && isPreviewMode && (
          <div className="bg-gradient-to-r from-amber-600 to-rose-600 text-white text-xs sm:text-sm py-2 px-4 text-center font-bold sticky top-[61px] z-30 shadow-md flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-200" />
            <span>أنت تشاهد الموقع حالياً كما تراه أيويه بالضبط (جميع أزرار التعديل والحذف مخفية)</span>
            <button
              onClick={() => setIsPreviewMode(false)}
              className="px-2 py-0.5 rounded-md bg-black/30 hover:bg-black/50 text-amber-200 underline text-xs cursor-pointer ml-2"
            >
              العودة للوضع الإداري
            </button>
          </div>
        )}

        {/* 1. Hero Section + Birthday Countdown + Love Counter */}
        <HeroSection
          meetingDateStr={publicLetter.meetingDate || '2026-07-21'}
          birthdayDateStr={publicLetter.birthdayDate || '2007-10-20'}
          onOpenSecretLetter={() => setIsSecretEnvelopeOpen(true)}
        />

        {/* 2. Memories Photo Gallery */}
        <MemoriesGallery
          memories={memories}
          isAdmin={isEffectiveAdmin}
          onMemoriesUpdated={loadMemories}
        />

        {/* 3. Birthday Cake Section */}
        <BirthdayCakeSection
          cakeData={cakeData}
          isAdmin={isEffectiveAdmin}
          onEditRequest={() => {
            setAdminEditInitialTab('cake');
            setIsAdminEditModalOpen(true);
          }}
        />

        {/* 4. Reasons Why I Love You */}
        <LoveReasonsSection
          reasons={loveReasons}
          isAdmin={isEffectiveAdmin}
          onUpdateReasons={(updated) => setLoveReasons(updated)}
        />

        {/* 4. Second Distinct Letter: Special Section for "ست البنات" */}
        <SpecialLoveLetterSection
          letter={publicLetter}
          isAdmin={isEffectiveAdmin}
          onEditRequest={() => {
            setAdminEditInitialTab('public');
            setIsAdminEditModalOpen(true);
          }}
          onLetterUpdated={(updated) => setPublicLetter(updated)}
        />
      </main>

      {/* Sealed Secret Envelope Modal (Letter 1) */}
      <SealedEnvelopeModal
        isOpen={isSecretEnvelopeOpen}
        onClose={() => setIsSecretEnvelopeOpen(false)}
        letter={secretLetter}
        isAdmin={isEffectiveAdmin}
        onEditRequest={() => {
          setIsSecretEnvelopeOpen(false);
          setAdminEditInitialTab('secret');
          setIsAdminEditModalOpen(true);
        }}
      />

      {/* Audio Uploader Modal */}
      <AudioUploaderModal
        isOpen={isMusicModalOpen}
        onClose={() => setIsMusicModalOpen(false)}
        onSongChanged={handleSongChanged}
        currentSongName={currentSongTitle}
        hasCustomSong={isCustomSong}
      />

      {/* Floating Audio Play Prompt if sound was paused/awaiting user gesture */}
      {!isPlayingMusic && (
        <button
          onClick={handleToggleMusic}
          className="fixed bottom-6 right-6 z-40 px-4 py-2.5 sm:px-5 sm:py-3 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs sm:text-sm font-bold shadow-[0_0_25px_rgba(225,29,72,0.6)] flex items-center gap-2 cursor-pointer animate-bounce hover:scale-105 transition-transform border border-rose-400/50"
        >
          <Volume2 className="w-4 h-4 text-white animate-pulse" />
          <span>تشغيل أغنية حبنا (عامر منيب - حب العمر) 🎵</span>
        </button>
      )}

      {/* Admin Floating Control Bar (Only for Faris) */}
      {userRole === 'admin' && (
        <AdminBar
          isPreviewMode={isPreviewMode}
          onTogglePreview={() => setIsPreviewMode(!isPreviewMode)}
          onOpenEditModal={() => {
            setAdminEditInitialTab('secret');
            setIsAdminEditModalOpen(true);
          }}
          onOpenMusicModal={() => setIsMusicModalOpen(true)}
          onLogout={handleLogout}
        />
      )}

      {/* Admin Full Edit Modal */}
      {isAdminEditModalOpen && (
        <AdminEditModal
          isOpen={isAdminEditModalOpen}
          onClose={() => setIsAdminEditModalOpen(false)}
          secretLetter={secretLetter}
          publicLetter={publicLetter}
          cakeData={cakeData}
          onSaveSecretLetter={(updated) => setSecretLetter(updated)}
          onSavePublicLetter={(updated) => setPublicLetter(updated)}
          onSaveCakeData={(updated) => setCakeData(updated)}
          initialTab={adminEditInitialTab}
        />
      )}

      {/* Romantic Footer */}
      <footer className="relative z-10 border-t border-rose-500/20 py-8 px-4 text-center text-xs text-rose-300/70">
        <div className="flex items-center justify-center gap-1.5 mb-2 text-sm text-rose-200">
          <span>صُنع بكل ذرة حب من</span>
          <span className="font-bold text-amber-300">فارس</span>
          <span>لأغلى</span>
          <span className="font-bold text-rose-400">أيويه</span>
          <span>في الكون كله</span>
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500 inline" />
        </div>
        <p className="font-mono text-[11px] text-rose-300/40">
          20 أكتوبر 2007 🎂 • 21 يوليو 2026 ♾️ • حب لا ينتهي أبداً
        </p>
      </footer>
    </div>
  );
}
