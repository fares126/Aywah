import React, { useState } from 'react';
import { Sparkles, Heart, Lock, KeyRound, ArrowLeft } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

interface LoginPortalModalProps {
  isOpen: boolean;
  onLogin: (role: 'viewer' | 'admin', name: string) => void;
}

export const LoginPortalModal: React.FC<LoginPortalModalProps> = ({ isOpen, onLogin }) => {
  const [nameInput, setNameInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = nameInput.trim().toLowerCase();

    if (!trimmed) {
      setErrorMessage('من فضلك اكتبي اسمك يا قمري 💕');
      return;
    }

    setIsSubmitting(true);

    // Normalize Arabic letters (remove alef hamza differences, etc.)
    const normalized = trimmed
      .replace(/[أإآ]/g, 'ا')
      .replace(/ة/g, 'ه')
      .replace(/ى/g, 'ي')
      .replace(/[\u064B-\u065F]/g, ''); // strip diacritics

    // Check Viewer (Ayoweh)
    const isViewer = [
      'ايويه',
      'ايه',
      'ايا',
      'ايوتي',
      'ايوش',
      'ايوشه',
      'ايوه',
      'aya',
      'ayoweh',
      'ayota',
      'ayote'
    ].some((alias) => normalized.includes(alias) || alias.includes(normalized));

    // Check Admin (Faress)
    const isAdmin = [
      'فارس',
      'faress',
      'fares',
      'faris',
      'faresss'
    ].some((alias) => normalized.includes(alias) || alias.includes(normalized));

    setTimeout(() => {
      if (isAdmin) {
        audioEngine.playCelebrationChime();
        onLogin('admin', nameInput.trim());
      } else if (isViewer) {
        audioEngine.playCelebrationChime();
        onLogin('viewer', nameInput.trim());
      } else {
        setErrorMessage('الاسم دا مش مسجل في قلبي يا جميل.. اتأكدي من كتابة الاسم صح يا روحي 💕');
        setIsSubmitting(false);
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300">
      {/* Decorative ambient glow */}
      <div className="absolute w-96 h-96 bg-rose-600/20 rounded-full blur-3xl pointer-events-none -top-10 -right-10 animate-pulse-glow" />
      <div className="absolute w-96 h-96 bg-fuchsia-600/20 rounded-full blur-3xl pointer-events-none -bottom-10 -left-10 animate-pulse-glow" />

      <div className="relative w-full max-w-md p-8 sm:p-10 text-center glass-panel-glow rounded-3xl border border-rose-500/30 shadow-[0_0_50px_rgba(225,29,72,0.25)]">
        {/* Animated Royal Lock Badge */}
        <div className="relative mx-auto mb-6 w-20 h-20 rounded-2xl bg-gradient-to-tr from-rose-600 via-pink-600 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-rose-600/40">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-rose-400 to-pink-500 blur-sm opacity-60 animate-pulse" />
          <Lock className="w-10 h-10 text-white relative z-10" />
          <div className="absolute -bottom-2 -right-2 bg-[#0b0612] p-1.5 rounded-full border border-rose-500/50">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
          </div>
        </div>

        {/* Title */}
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 text-xs tracking-wider uppercase rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/30">
          <Sparkles className="w-3.5 h-3.5 text-rose-400" />
          <span>مفاجأة سرية خاصة جداً</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold font-cairo text-white mb-2 leading-tight">
          اكتبي اسمك يا روح قلبي: 💕
        </h2>

        <p className="text-sm text-rose-200/80 mb-6 leading-relaxed">
          هذا المكان محمي بحب كبير.. اكتبي اسمك عشان تفتحي بوابتك لعالم مخصص ليكي وحدك في يوم ميلادك.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={nameInput}
              onFocus={() => {
                audioEngine.play();
              }}
              onChange={(e) => {
                setNameInput(e.target.value);
                setErrorMessage('');
                audioEngine.play();
              }}
              placeholder="اكتبي اسمك يا حتة السكر... 🌸"
              autoFocus
              className="w-full px-5 py-4 text-center rounded-2xl bg-rose-950/40 text-white placeholder-rose-300/40 border border-rose-500/40 focus:border-rose-400 focus:outline-none focus:ring-4 focus:ring-rose-500/20 text-lg transition-all shadow-inner"
            />
            <KeyRound className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-rose-400/60 pointer-events-none" />
          </div>

          {errorMessage && (
            <div className="p-3 text-xs sm:text-sm font-medium text-rose-200 bg-rose-950/70 border border-rose-500/40 rounded-xl animate-in fade-in slide-in-from-top-1">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 hover:from-rose-500 hover:to-pink-600 text-white font-bold text-lg shadow-lg shadow-rose-600/30 hover:shadow-rose-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50"
          >
            <span>افتحي المفاجأة</span>
            <ArrowLeft className="w-5 h-5" />
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-rose-500/20 text-xs text-rose-300/60">
          إهداء مليان عشق من حبيبك وعمري كله.. 👑
        </div>
      </div>
    </div>
  );
};
