import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Calendar, Edit3, Send, Check } from 'lucide-react';
import { PublicLetter } from '../types';
import { audioEngine } from '../utils/audioEngine';
import { savePublicLetter } from '../utils/storage';

interface SpecialLoveLetterSectionProps {
  letter: PublicLetter;
  isAdmin: boolean;
  onEditRequest: () => void;
  onLetterUpdated: (updated: PublicLetter) => void;
}

export const SpecialLoveLetterSection: React.FC<SpecialLoveLetterSectionProps> = ({
  letter,
  isAdmin,
  onEditRequest,
  onLetterUpdated
}) => {
  const [pulseCount, setPulseCount] = useState(letter.heartbeatsSent || 19);
  const [isSendingPulse, setIsSendingPulse] = useState(false);
  const [justSent, setJustSent] = useState(false);

  const handleSendHeartbeat = () => {
    if (isSendingPulse) return;

    audioEngine.playHeartbeatThump();
    setIsSendingPulse(true);
    setJustSent(true);

    const newCount = pulseCount + 1;
    setPulseCount(newCount);

    const updated = { ...letter, heartbeatsSent: newCount };
    savePublicLetter(updated);
    onLetterUpdated(updated);

    // Heart particles confetti
    confetti({
      particleCount: 25,
      spread: 70,
      origin: { y: 0.85 },
      colors: ['#e11d48', '#fb7185', '#fda4af', '#f43f5e', '#ffffff']
    });

    setTimeout(() => {
      setIsSendingPulse(false);
    }, 400);

    setTimeout(() => {
      setJustSent(false);
    }, 2500);
  };

  return (
    <section className="py-20 px-4 sm:px-6 max-w-5xl mx-auto scroll-mt-24">
      {/* Container parchment */}
      <div className="relative p-8 sm:p-12 md:p-16 rounded-3xl glass-panel-glow border-2 border-rose-500/40 shadow-[0_0_60px_rgba(225,29,72,0.35)] text-right">
        
        {/* Subtle decorative background watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-5">
          <Heart className="w-96 h-96 text-rose-500 fill-rose-500" />
        </div>

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between pb-8 border-b border-rose-500/25 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-600 to-pink-600 flex items-center justify-center shadow-lg shadow-rose-600/40 shrink-0">
              <span className="text-2xl">👑</span>
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs text-rose-300 font-semibold mb-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>الجواب الثاني والمميز</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-cairo text-white">
                {letter.title}
              </h2>
              <p className="text-sm sm:text-base text-rose-200/80 font-amiri mt-1">
                {letter.subtitle}
              </p>
            </div>
          </div>

          {isAdmin && (
            <button
              onClick={onEditRequest}
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl bg-rose-600/20 hover:bg-rose-600/40 text-rose-200 border border-rose-500/40 transition cursor-pointer shrink-0"
            >
              <Edit3 className="w-4 h-4" />
              <span>تعديل هذا الجواب</span>
            </button>
          )}
        </div>

        {/* Meeting & Birthday Milestone Badges */}
        <div className="my-6 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-950/60 border border-rose-500/30 text-rose-200 text-xs sm:text-sm font-semibold">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>تاريخ التعارف واللقاء: 21 يوليو 2026 ♾️</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-pink-950/60 border border-pink-500/30 text-pink-200 text-xs sm:text-sm font-semibold">
            <span className="text-amber-300 font-bold">🎂 20 أكتوبر 2007:</span>
            <span>يوم ميلاد روح قلبي (الـ 19)</span>
          </div>
        </div>

        {/* Letter Paragraphs */}
        <div className="space-y-6 my-8 text-rose-100 font-amiri text-lg sm:text-2xl leading-relaxed sm:leading-[2.2] tracking-wide text-justify">
          {letter.paragraphs.map((p, idx) => (
            <p key={idx} className="relative pr-4 border-r-2 border-rose-500/40">
              {p}
            </p>
          ))}
        </div>

        {/* Signature & Heartbeat Interaction */}
        <div className="mt-12 pt-8 border-t border-rose-500/25 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Sender Signature */}
          <div className="text-center md:text-right">
            <p className="text-xs text-rose-300/80 font-cairo">بكل ما أوتيت من عشق،</p>
            <p className="text-2xl sm:text-3xl font-extrabold font-amiri text-amber-300 mt-1">
              {letter.signature}
            </p>
          </div>

          {/* Interactive Heartbeat Button */}
          <div className="flex flex-col items-center md:items-end gap-2">
            <button
              onClick={handleSendHeartbeat}
              disabled={isSendingPulse}
              className="group relative px-6 py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 hover:from-rose-500 hover:to-pink-600 text-white font-bold text-sm sm:text-base shadow-[0_0_25px_rgba(225,29,72,0.4)] hover:shadow-[0_0_35px_rgba(225,29,72,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3 cursor-pointer"
            >
              <Heart
                className={`w-5 h-5 text-white fill-white transition-transform ${
                  isSendingPulse ? 'scale-150' : 'group-hover:scale-110'
                }`}
              />
              <span>أرسلي نبضة حب لفارس 💓</span>
              <span className="px-2 py-0.5 rounded-full bg-white/20 text-xs font-mono">
                {pulseCount}
              </span>
            </button>

            {justSent && (
              <div className="flex items-center gap-1.5 text-xs text-emerald-300 font-medium animate-in fade-in">
                <Check className="w-3.5 h-3.5" />
                <span>وصلتني نبضتك يا روحي.. بحبك أكتر! 💕</span>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
