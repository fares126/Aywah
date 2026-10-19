import React, { useState } from 'react';
import { X, Heart, Sparkles, Edit3 } from 'lucide-react';
import { SecretLetter } from '../types';
import { audioEngine } from '../utils/audioEngine';

interface SealedEnvelopeModalProps {
  isOpen: boolean;
  onClose: () => void;
  letter: SecretLetter;
  isAdmin: boolean;
  onEditRequest?: () => void;
}

export const SealedEnvelopeModal: React.FC<SealedEnvelopeModalProps> = ({
  isOpen,
  onClose,
  letter,
  isAdmin,
  onEditRequest
}) => {
  const [isOpened, setIsOpened] = useState(false);

  if (!isOpen) return null;

  const handleOpenEnvelope = () => {
    audioEngine.playWaxSealChime();
    setIsOpened(true);
  };

  const handleReset = () => {
    setIsOpened(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-300 overflow-y-auto">
      {/* Background ambient lighting */}
      <div className="absolute w-80 h-80 bg-rose-600/25 rounded-full blur-3xl pointer-events-none -top-10 -right-10 animate-pulse-glow" />
      <div className="absolute w-80 h-80 bg-fuchsia-600/20 rounded-full blur-3xl pointer-events-none -bottom-10 -left-10 animate-pulse-glow" />

      <div className="relative w-full max-w-2xl my-auto">
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute -top-12 left-2 z-50 p-2 text-rose-300 hover:text-white bg-white/10 hover:bg-rose-600/40 rounded-full backdrop-blur-md transition-all cursor-pointer"
          title="إغلاق"
        >
          <X className="w-6 h-6" />
        </button>

        {!isOpened ? (
          /* CLOSED ENVELOPE VIEW */
          <div className="relative mx-auto max-w-lg aspect-[1.45/1] rounded-2xl bg-gradient-to-br from-[#4a0e1f] via-[#2d0a15] to-[#16050b] p-6 sm:p-8 flex flex-col justify-between items-center border-2 border-rose-500/40 shadow-[0_20px_50px_rgba(225,29,72,0.35)] cursor-pointer group hover:scale-[1.01] transition-transform duration-300"
               onClick={handleOpenEnvelope}>
            
            {/* Envelope flap aesthetic */}
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-[#69112a] to-[#3a0917] [clip-path:polygon(0_0,100%_0,50%_100%)] border-b border-rose-400/40 shadow-md group-hover:brightness-110 transition-all pointer-events-none" />

            {/* Corner ornamental stamp */}
            <div className="w-full flex justify-between items-start z-10">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 border border-rose-500/30 text-rose-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>خاص وسري للغاية</span>
              </div>
              <div className="w-12 h-14 border border-rose-400/50 rounded-sm bg-rose-950/60 p-1 flex flex-col items-center justify-center text-[10px] text-rose-300">
                <span>بريد العشق</span>
                <span className="font-bold text-amber-300">20.10</span>
              </div>
            </div>

            {/* WAX SEAL IN CENTER */}
            <div className="relative z-20 flex flex-col items-center my-auto">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenEnvelope();
                }}
                className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-[#991b1b] via-[#dc2626] to-[#b91c1c] border-4 border-amber-500/50 flex flex-col items-center justify-center shadow-[0_0_25px_rgba(220,38,38,0.7)] group-hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer animate-pulse-glow"
              >
                <div className="absolute inset-1 rounded-full border border-dashed border-amber-300/40 pointer-events-none" />
                <span className="font-amiri font-bold text-amber-200 text-lg sm:text-xl tracking-widest drop-shadow">
                  {letter.waxInitials || 'A & F'}
                </span>
                <Heart className="w-4 h-4 text-amber-300 fill-amber-300 mt-0.5" />
              </button>
              <div className="mt-4 px-4 py-1.5 rounded-full bg-black/60 border border-rose-500/40 text-xs sm:text-sm font-semibold text-rose-200 animate-bounce">
                اضغطي على الختم الشمعي لفتح الجواب 💌
              </div>
            </div>

            {/* Bottom address */}
            <div className="w-full text-center z-10">
              <p className="font-amiri text-lg text-rose-100 font-bold">
                {letter.recipient}
              </p>
              <p className="text-xs text-rose-300/60 mt-0.5">
                من: {letter.sender}
              </p>
            </div>
          </div>
        ) : (
          /* OPENED LETTER PARCHMENT VIEW */
          <div className="relative max-h-[85vh] overflow-y-auto rounded-3xl bg-gradient-to-b from-[#1c0d1e] via-[#230f25] to-[#17081a] p-6 sm:p-10 border-2 border-rose-500/50 shadow-[0_0_60px_rgba(225,29,72,0.4)] animate-in zoom-in-95 duration-500">
            
            {/* Top Header & Stamp */}
            <div className="flex flex-wrap items-center justify-between pb-6 border-b border-rose-500/20 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-600 to-pink-600 flex items-center justify-center shadow-lg shadow-rose-600/30">
                  <Heart className="w-6 h-6 text-white fill-white" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-cairo text-white">
                    {letter.title}
                  </h3>
                  <p className="text-xs text-rose-300/70">
                    كتب بحب في ليلة هادئة مخصوص لعيون أيويه
                  </p>
                </div>
              </div>

              {isAdmin && onEditRequest && (
                <button
                  onClick={onEditRequest}
                  className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-xl bg-rose-600/20 hover:bg-rose-600/40 text-rose-200 border border-rose-500/40 transition cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>تعديل هذا الجواب</span>
                </button>
              )}
            </div>

            {/* Recipient Greeting */}
            <div className="my-6">
              <p className="text-lg font-amiri font-bold text-rose-300">
                {letter.salutation}
              </p>
            </div>

            {/* Letter Paragraphs */}
            <div className="space-y-4 text-rose-100 font-amiri text-lg sm:text-xl leading-relaxed tracking-wide text-justify">
              {letter.paragraphs.map((p, index) => (
                <p key={index} className="relative pr-4 border-r-2 border-rose-500/30">
                  {p}
                </p>
              ))}
            </div>

            {/* Special Note Box */}
            {letter.specialNote && (
              <div className="my-6 p-4 rounded-2xl bg-rose-950/40 border border-rose-500/30 text-rose-200 text-sm sm:text-base font-amiri italic flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
                <span>{letter.specialNote}</span>
              </div>
            )}

            {/* Signature & Closing */}
            <div className="mt-8 pt-6 border-t border-rose-500/20 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-center sm:text-right">
                <p className="text-sm text-rose-300/80 font-cairo">{letter.closing}</p>
                <p className="text-2xl font-bold font-amiri text-white mt-1">
                  {letter.sender}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#991b1b] to-[#dc2626] border-2 border-amber-400/60 flex flex-col items-center justify-center shadow-md">
                  <span className="font-amiri text-amber-200 text-xs font-bold">
                    {letter.waxInitials || 'A & F'}
                  </span>
                  <Heart className="w-3 h-3 text-amber-300 fill-amber-300" />
                </div>
                <div className="text-xs text-rose-300/60 font-mono">
                  ختم العشق الأبدي<br />20 أكتوبر 2026
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-8 text-center">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-rose-200 text-sm font-semibold transition cursor-pointer"
              >
                إغلاق الجواب وحفظه في القلب 💖
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
