import React from 'react';
import { Volume2, VolumeX, Mail, Music, Sparkles, Eye, LogOut, Heart } from 'lucide-react';

interface NavbarProps {
  onOpenSecretLetter: () => void;
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
  onOpenMusicModal: () => void;
  currentSongTitle: string;
  isCustomSong: boolean;
  userRole: 'viewer' | 'admin' | null;
  isPreviewMode: boolean;
  onTogglePreviewMode: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSecretLetter,
  isPlayingMusic,
  onToggleMusic,
  onOpenMusicModal,
  currentSongTitle,
  isCustomSong,
  userRole,
  isPreviewMode,
  onTogglePreviewMode,
  onLogout
}) => {
  return (
    <header className="sticky top-0 z-40 w-full px-3 sm:px-6 py-3 bg-[#0b0612]/75 backdrop-blur-xl border-b border-rose-500/20 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        
        {/* Brand / Monogram */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-rose-600 via-pink-600 to-rose-700 p-0.5 shadow-[0_0_15px_rgba(225,29,72,0.4)]">
            <div className="w-full h-full bg-[#0b0612] rounded-[14px] flex items-center justify-center">
              <span className="font-amiri font-bold text-amber-300 text-base sm:text-lg tracking-wider">
                A & F
              </span>
            </div>
            <div className="absolute -top-1 -right-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
            </div>
          </div>

          <div className="hidden xs:block text-right">
            <div className="flex items-center gap-1.5">
              <h1 className="font-cairo font-bold text-sm sm:text-base text-white">
                أيويه & فارس
              </h1>
              <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline" />
            </div>
            <p className="text-[10px] text-rose-300/70 font-mono">
              20 أكتوبر 🎂 21 يوليو ♾️
            </p>
          </div>
        </div>

        {/* Action Center: Sealed Letter Button (Prominent) */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenSecretLetter}
            className="group relative px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 hover:from-rose-500 hover:to-pink-600 text-white font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(225,29,72,0.45)] hover:shadow-[0_0_30px_rgba(225,29,72,0.7)] transition-all duration-300 flex items-center gap-2 cursor-pointer animate-pulse-glow"
          >
            <Mail className="w-4 h-4 text-rose-100 group-hover:rotate-12 transition-transform" />
            <span className="font-cairo">افتحي الجواب بتاعي ليكي 💌</span>
          </button>
        </div>

        {/* Music Controls & RBAC Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Music player capsule */}
          <div className="flex items-center gap-1.5 p-1 sm:p-1.5 rounded-full bg-rose-950/40 border border-rose-500/30">
            <button
              onClick={onToggleMusic}
              className={`p-2 rounded-full transition-all cursor-pointer ${
                isPlayingMusic
                  ? 'bg-rose-600 text-white shadow-[0_0_12px_rgba(225,29,72,0.6)] animate-pulse'
                  : 'bg-white/5 text-rose-300 hover:bg-rose-600/30 hover:text-white'
              }`}
              title={isPlayingMusic ? 'إيقاف الموسيقى' : 'تشغيل الموسيقى'}
            >
              {isPlayingMusic ? (
                <Volume2 className="w-4 h-4" />
              ) : (
                <VolumeX className="w-4 h-4 text-rose-400/60" />
              )}
            </button>

            {/* Song title preview & upload modal trigger */}
            <button
              onClick={onOpenMusicModal}
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1 text-xs text-rose-200 hover:text-white transition cursor-pointer max-w-[150px]"
              title="إدارة وتغيير الأغنية"
            >
              <Music className={`w-3.5 h-3.5 ${isCustomSong ? 'text-amber-400' : 'text-rose-400'} shrink-0`} />
              <span className="truncate text-[11px] font-medium">
                {currentSongTitle}
              </span>
            </button>
          </div>

          {/* Admin Controls (Only when logged in as admin) */}
          {userRole === 'admin' && (
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={onTogglePreviewMode}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs font-semibold rounded-xl border transition cursor-pointer ${
                  isPreviewMode
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-rose-600/20 text-rose-200 border-rose-500/40 hover:bg-rose-600/30'
                }`}
                title={isPreviewMode ? 'العودة للوضع الإداري' : 'معاينة الموقع كما تراه أيويه'}
              >
                <Eye className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">
                  {isPreviewMode ? 'إنهاء المعاينة' : 'معاينة كـ أيويه'}
                </span>
              </button>

              <button
                onClick={onLogout}
                className="p-2 text-rose-300 hover:text-white bg-white/5 hover:bg-rose-900/50 rounded-xl border border-rose-500/20 transition cursor-pointer"
                title="تسجيل الخروج وإغلاق البوابة"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}

          {userRole === 'viewer' && (
            <button
              onClick={onLogout}
              className="p-2 text-rose-300/60 hover:text-rose-200 hover:bg-white/5 rounded-xl transition cursor-pointer"
              title="تسجيل الخروج"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
