import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Wind, RotateCcw, Edit3 } from 'lucide-react';
import { BirthdayCakeData } from '../types';
import { audioEngine } from '../utils/audioEngine';

interface BirthdayCakeSectionProps {
  cakeData: BirthdayCakeData;
  isAdmin: boolean;
  onEditRequest?: () => void;
}

export const BirthdayCakeSection: React.FC<BirthdayCakeSectionProps> = ({
  cakeData,
  isAdmin,
  onEditRequest
}) => {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [wishesRevealed, setWishesRevealed] = useState(false);

  const handleBlowCandles = () => {
    if (candlesBlown) return;

    audioEngine.playCandleBlow();
    setCandlesBlown(true);

    // Multi-burst confetti
    const count = 200;
    const defaults = {
      origin: { y: 0.7 }
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#e11d48', '#fb7185', '#fda4af', '#f43f5e']
    });
    fire(0.2, {
      spread: 60,
      colors: ['#d946ef', '#c026d3', '#ffffff', '#fbbf24']
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
      colors: ['#f43f5e', '#ec4899', '#f59e0b']
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
      colors: ['#ffffff', '#f43f5e', '#ffd700']
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
      colors: ['#e11d48', '#fbcfe8']
    });

    setTimeout(() => {
      setWishesRevealed(true);
    }, 600);
  };

  const handleRelight = () => {
    audioEngine.playCelebrationChime();
    setCandlesBlown(false);
    setWishesRevealed(false);
  };

  return (
    <section id="birthday-cake-section" className="py-16 px-4 sm:px-6 max-w-4xl mx-auto text-center scroll-mt-24">
      {/* Title & Badge */}
      <div className="flex flex-col items-center justify-center gap-3 mb-4">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs sm:text-sm font-semibold">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>تورتة عيد ميلاد الملكة أيويه</span>
        </div>

        {isAdmin && onEditRequest && (
          <button
            onClick={onEditRequest}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-rose-600/20 hover:bg-rose-600/40 text-rose-200 border border-rose-500/40 text-xs font-bold transition cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>تعديل كتابات التورتة ✏️</span>
          </button>
        )}
      </div>

      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-cairo text-white mb-3">
        {cakeData.sectionTitle}
      </h2>
      <p className="text-sm sm:text-base text-rose-200/80 font-amiri max-w-xl mx-auto mb-10">
        {cakeData.sectionSubtitle}
      </p>

      {/* Interactive Birthday Cake Container */}
      <div className="relative max-w-md mx-auto p-8 rounded-3xl glass-panel-glow border border-rose-500/40 shadow-[0_0_50px_rgba(225,29,72,0.3)]">
        
        {/* Candles on top */}
        <div className="relative flex justify-center items-end gap-2 sm:gap-3 mb-2 h-20">
          {[1, 2, 3, 4, 5, 6, 7].map((candleIndex) => (
            <div key={candleIndex} className="flex flex-col items-center">
              {/* Flame */}
              {!candlesBlown ? (
                <div className="relative w-4 h-7 mb-1 candle-flame">
                  <div className="w-full h-full bg-gradient-to-t from-orange-500 via-amber-300 to-yellow-100 rounded-full blur-[0.5px]" />
                  <div className="absolute inset-0 bg-yellow-300/40 rounded-full animate-ping opacity-75" />
                </div>
              ) : (
                /* Smoke puff */
                <div className="w-3 h-6 mb-1 flex items-center justify-center animate-in fade-in zoom-in duration-300">
                  <div className="w-1.5 h-4 bg-gray-400/50 rounded-full blur-[1px] -translate-y-2 animate-bounce opacity-70" />
                </div>
              )}

              {/* Wick */}
              <div className="w-0.5 h-2 bg-neutral-900" />

              {/* Candle Body */}
              <div
                className={`w-3 sm:w-3.5 rounded-t-sm shadow-sm ${
                  candleIndex % 2 === 0
                    ? 'h-10 bg-gradient-to-b from-rose-400 to-rose-600'
                    : 'h-12 bg-gradient-to-b from-pink-300 to-pink-500'
                }`}
              >
                <div className="w-full h-full opacity-30 bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,#fff_2px,#fff_4px)]" />
              </div>
            </div>
          ))}
        </div>

        {/* Cake Tier 1 (Top Tier) */}
        <div className="relative mx-auto w-44 sm:w-52 h-16 rounded-t-2xl bg-gradient-to-r from-rose-400 via-pink-400 to-rose-400 border-2 border-rose-300/60 shadow-inner flex items-center justify-center px-2">
          <div className="absolute -top-2 left-0 right-0 flex justify-around px-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-4 h-4 rounded-full bg-white shadow-sm -mt-1 border border-pink-200" />
            ))}
          </div>
          <span className="font-amiri font-bold text-rose-950 text-base sm:text-lg tracking-wider text-center truncate">
            {cakeData.tier1Text}
          </span>
        </div>

        {/* Cake Tier 2 (Middle Tier) */}
        <div className="relative mx-auto w-64 sm:w-72 h-18 rounded-t-2xl bg-gradient-to-r from-[#991b1b] via-[#e11d48] to-[#991b1b] border-2 border-rose-400/40 shadow-inner flex items-center justify-center px-3">
          <div className="absolute -top-2 left-0 right-0 flex justify-around px-2">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-5 h-5 rounded-full bg-pink-100 shadow-sm -mt-1" />
            ))}
          </div>
          <div className="flex items-center gap-2 max-w-full">
            <Heart className="w-4 h-4 text-white fill-white animate-pulse shrink-0" />
            <span className="font-cairo font-bold text-white text-base sm:text-lg text-center truncate">
              {cakeData.tier2Text}
            </span>
            <Heart className="w-4 h-4 text-white fill-white animate-pulse shrink-0" />
          </div>
        </div>

        {/* Cake Tier 3 (Bottom Tier) */}
        <div className="relative mx-auto w-80 sm:w-92 h-20 rounded-t-2xl bg-gradient-to-r from-[#4c0519] via-[#881337] to-[#4c0519] border-2 border-rose-500/50 shadow-2xl flex items-center justify-center px-4">
          <div className="absolute -top-2.5 left-0 right-0 flex justify-around px-3">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="w-6 h-6 rounded-full bg-white shadow -mt-1 border border-rose-300" />
            ))}
          </div>
          <span className="font-cairo text-xs sm:text-sm font-semibold text-rose-200 text-center truncate">
            {cakeData.tier3Text}
          </span>
        </div>

        {/* Cake Plate Stand */}
        <div className="mx-auto w-92 sm:w-[390px] h-4 rounded-full bg-gradient-to-r from-amber-200 via-amber-100 to-amber-300 border border-amber-300/80 shadow-[0_10px_25px_rgba(0,0,0,0.6)]" />

        {/* Blow Action Button */}
        <div className="mt-8">
          {!candlesBlown ? (
            <button
              onClick={handleBlowCandles}
              className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-pink-600 hover:from-amber-400 hover:to-rose-500 text-white font-extrabold text-base sm:text-lg shadow-[0_0_30px_rgba(245,158,11,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 mx-auto cursor-pointer"
            >
              <Wind className="w-5 h-5 text-white group-hover:-translate-x-1 transition-transform" />
              <span>اضغطي هنا علشان تطفي الشموع 🎂💨</span>
            </button>
          ) : (
            <button
              onClick={handleRelight}
              className="px-6 py-3 rounded-2xl bg-rose-600/30 hover:bg-rose-600/50 text-rose-200 border border-rose-500/50 font-bold text-sm flex items-center justify-center gap-2 mx-auto cursor-pointer transition hover:scale-105"
            >
              <RotateCcw className="w-4 h-4" />
              <span>نولع الشموع ونتمنى أمنية تانية؟ 🕯️</span>
            </button>
          )}
        </div>

        {/* Revealed Secret Wish */}
        {wishesRevealed && (
          <div className="mt-6 p-6 rounded-2xl bg-gradient-to-br from-rose-950/80 to-[#220718] border-2 border-rose-400/60 shadow-[0_0_35px_rgba(225,29,72,0.4)] animate-in zoom-in-95 duration-500 text-right">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-sm mb-2">
              <Sparkles className="w-4 h-4" />
              <span>أمنية {cakeData.wishSender} ليكي في عيد ميلادك:</span>
            </div>
            <p className="font-amiri text-lg sm:text-xl text-rose-100 leading-relaxed">
              "{cakeData.wishText}"
            </p>
            <div className="mt-3 flex items-center justify-end gap-1.5 text-xs text-rose-300 font-mono">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>{cakeData.wishSender}</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
