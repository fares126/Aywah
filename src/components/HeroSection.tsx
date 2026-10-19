import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Clock, Calendar, Flame, Hourglass } from 'lucide-react';

interface HeroSectionProps {
  meetingDateStr: string; // e.g., '2026-07-21'
  birthdayDateStr?: string; // e.g., '2007-10-20'
  onOpenSecretLetter: () => void;
}

interface TimeElapsed {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalHours: number;
}

interface BirthdayCountdown {
  totalHours: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isToday: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  meetingDateStr,
  birthdayDateStr = '2007-10-20',
  onOpenSecretLetter
}) => {
  const [elapsed, setElapsed] = useState<TimeElapsed>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalHours: 0
  });

  const [bdayCountdown, setBdayCountdown] = useState<BirthdayCountdown>({
    totalHours: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isToday: false
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const nowTime = now.getTime();

      // 1. Elapsed since Meeting Date (21 July 2026)
      const startDate = new Date(`${meetingDateStr}T00:00:00`).getTime();
      const diff = Math.max(0, nowTime - startDate);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      const totalHours = Math.floor(diff / (1000 * 60 * 60));

      setElapsed({ days, hours, minutes, seconds, totalHours });

      // 2. Birthday Countdown (Target: October 20)
      const [, bMonthRaw, bDayRaw] = birthdayDateStr.split('-').map(Number);
      const targetMonth = (bMonthRaw || 10) - 1; // 0-indexed: 9 is October
      const targetDay = bDayRaw || 20;

      const currentYear = now.getFullYear();
      let targetBday = new Date(currentYear, targetMonth, targetDay, 0, 0, 0, 0);

      // Check if today is her birthday
      const isToday = now.getMonth() === targetMonth && now.getDate() === targetDay;

      // If this year's birthday has completely ended (past 23:59:59 on the day)
      if (nowTime > targetBday.getTime() + 24 * 60 * 60 * 1000) {
        targetBday = new Date(currentYear + 1, targetMonth, targetDay, 0, 0, 0, 0);
      }

      const diffBday = Math.max(0, targetBday.getTime() - nowTime);
      const bTotalHours = Math.floor(diffBday / (1000 * 60 * 60));
      const bDays = Math.floor(diffBday / (1000 * 60 * 60 * 24));
      const bHours = Math.floor((diffBday / (1000 * 60 * 60)) % 24);
      const bMinutes = Math.floor((diffBday / (1000 * 60)) % 60);
      const bSeconds = Math.floor((diffBday / 1000) % 60);

      setBdayCountdown({
        totalHours: bTotalHours,
        days: bDays,
        hours: bHours,
        minutes: bMinutes,
        seconds: bSeconds,
        isToday
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [meetingDateStr, birthdayDateStr]);

  return (
    <section className="relative pt-6 pb-16 px-4 sm:px-6 max-w-6xl mx-auto text-center">
      
      {/* 1. TOP BIRTHDAY COUNTDOWN CARD (عدد الساعات والعد التنازلي لعيد ميلادها) */}
      <div className="max-w-xl mx-auto mb-8 p-5 sm:p-7 rounded-3xl glass-panel-glow border-2 border-rose-500/40 shadow-[0_0_40px_rgba(225,29,72,0.35)] relative overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-rose-500/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full bg-rose-500/20 border border-rose-500/40 text-amber-300 text-xs sm:text-sm font-bold shadow-sm">
            <Hourglass className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '8s' }} />
            <span>العد التنازلي لساعة الصفر لعيد ميلاد أيويه (20 أكتوبر) 🎂✨</span>
          </div>

          {bdayCountdown.isToday ? (
            /* Celebration when today is the birthday */
            <div className="py-3 text-center animate-in zoom-in-95 duration-500">
              <div className="text-2xl sm:text-4xl font-black font-cairo text-amber-300 animate-pulse drop-shadow">
                🎉 النهاردة عيد ميلاد روح قلبي أيويه! 👑
              </div>
              <p className="text-sm sm:text-base text-rose-100 mt-2 font-amiri">
                كل سنة وانتي سالمة وفي حضني ومنورة دنيتي وعمري كله يا ست البنات ❤️
              </p>
            </div>
          ) : (
            /* Countdown Grid: Total Hours + Minutes + Seconds */
            <div>
              <div className="grid grid-cols-3 gap-2.5 sm:gap-4 my-3">
                {/* Total Hours Remaining */}
                <div className="p-3 sm:p-4 rounded-2xl bg-gradient-to-b from-rose-900/60 to-[#220718] border-2 border-amber-500/40 flex flex-col items-center justify-center shadow-lg transition hover:scale-105">
                  <span className="text-3xl sm:text-5xl font-black font-cairo text-amber-300 drop-shadow">
                    {bdayCountdown.totalHours}
                  </span>
                  <span className="text-xs sm:text-sm text-amber-200 font-bold mt-1">
                    ساعة متبقية ⏳
                  </span>
                </div>

                {/* Minutes */}
                <div className="p-3 sm:p-4 rounded-2xl bg-rose-950/50 border border-rose-500/30 flex flex-col items-center justify-center shadow-md transition hover:scale-105">
                  <span className="text-3xl sm:text-5xl font-black font-cairo text-rose-100 drop-shadow">
                    {String(bdayCountdown.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-xs sm:text-sm text-rose-300 font-semibold mt-1">
                    دقيقة
                  </span>
                </div>

                {/* Seconds */}
                <div className="p-3 sm:p-4 rounded-2xl bg-rose-950/50 border border-rose-500/30 flex flex-col items-center justify-center shadow-md transition hover:scale-105">
                  <span className="text-3xl sm:text-5xl font-black font-cairo text-pink-300 drop-shadow animate-pulse">
                    {String(bdayCountdown.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-xs sm:text-sm text-pink-300/80 font-semibold mt-1">
                    ثانية
                  </span>
                </div>
              </div>

              <div className="text-xs sm:text-sm text-rose-200/90 font-amiri mt-3">
                باقي <span className="font-bold text-amber-300 font-mono text-base">{bdayCountdown.totalHours}</span> ساعة على قدوم أجمل يوم في السنة.. يوم ميلادك يا أيويه 💕
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Decorative badges */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs sm:text-sm font-semibold tracking-wide shadow-[0_0_20px_rgba(225,29,72,0.25)] animate-float-slow">
        <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
        <span>20 أكتوبر 2007 • عيد ميلاد روح قلبي الـ 19</span>
        <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
      </div>

      {/* Main Romantic Headline */}
      <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-cairo text-white tracking-tight leading-[1.2] mb-6 drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]">
        كل سنة وانتي روحي ودنيتي كلها يا{' '}
        <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-400 to-rose-200">
          أيويه
          <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-rose-500 to-transparent rounded-full" />
        </span>{' '}
        👑💕
      </h1>

      <p className="max-w-2xl mx-auto text-base sm:text-xl font-amiri text-rose-200/90 leading-relaxed mb-10">
        النهاردة مش مجرد عيد ميلاد عادي، النهاردة اتولدت البنوتة اللي نورت عتمة أيامي وخلت لحياتي طعم وفرحة وسند.. إهداء من قلب حبيبك <span className="font-bold text-amber-300">فارس</span>.
      </p>

      {/* Live Days Counter: Since 21 July 2026 */}
      <div className="max-w-3xl mx-auto p-6 sm:p-8 rounded-3xl glass-panel-glow border border-rose-500/30 shadow-[0_0_40px_rgba(225,29,72,0.25)] mb-10">
        <div className="flex flex-col sm:flex-row items-center justify-between pb-4 mb-6 border-b border-rose-500/20 gap-2">
          <div className="flex items-center gap-2 text-rose-300 font-semibold text-sm sm:text-base">
            <Clock className="w-4 h-4 text-rose-400 animate-pulse" />
            <span>عدد الأيام: مع بعض من يوم 21 يوليو 2026</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-rose-300/70 font-mono">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>أحلى صدفة في حياتي ♾️</span>
          </div>
        </div>

        {/* Counter Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {/* Days */}
          <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/30 flex flex-col items-center justify-center transition hover:border-rose-400/60 hover:scale-105">
            <span className="text-3xl sm:text-4xl md:text-5xl font-black font-cairo text-rose-100 drop-shadow">
              {elapsed.days}
            </span>
            <span className="text-xs sm:text-sm text-rose-300 font-semibold mt-1">
              يوم حب وعشق
            </span>
          </div>

          {/* Hours */}
          <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/30 flex flex-col items-center justify-center transition hover:border-rose-400/60 hover:scale-105">
            <span className="text-3xl sm:text-4xl md:text-5xl font-black font-cairo text-pink-200 drop-shadow">
              {String(elapsed.hours).padStart(2, '0')}
            </span>
            <span className="text-xs sm:text-sm text-rose-300 font-semibold mt-1">
              ساعة حنين
            </span>
          </div>

          {/* Minutes */}
          <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/30 flex flex-col items-center justify-center transition hover:border-rose-400/60 hover:scale-105">
            <span className="text-3xl sm:text-4xl md:text-5xl font-black font-cairo text-rose-300 drop-shadow">
              {String(elapsed.minutes).padStart(2, '0')}
            </span>
            <span className="text-xs sm:text-sm text-rose-300 font-semibold mt-1">
              دقيقة تفكير فيكي
            </span>
          </div>

          {/* Seconds */}
          <div className="p-4 rounded-2xl bg-gradient-to-b from-rose-900/40 to-rose-950/60 border border-rose-500/40 flex flex-col items-center justify-center transition hover:border-rose-400/80 hover:scale-105">
            <span className="text-3xl sm:text-4xl md:text-5xl font-black font-cairo text-amber-300 drop-shadow animate-pulse">
              {String(elapsed.seconds).padStart(2, '0')}
            </span>
            <span className="text-xs sm:text-sm text-amber-200/80 font-semibold mt-1 flex items-center gap-1">
              <Flame className="w-3 h-3 text-amber-400" />
              <span>ثانية نبض</span>
            </span>
          </div>
        </div>

        {/* Romantic milestone quote */}
        <div className="mt-6 pt-4 border-t border-rose-500/15 text-xs sm:text-sm text-rose-300/80 font-amiri italic">
          "من يوم 21 يوليو، وكل دقيقة بتعدي بتأكدلي إني اخترت صح، وإنك أجمل هدية ربنا بعتها لقلبي."
        </div>
      </div>

      {/* Action Button: Enormous, grand, glowing */}
      <div className="flex justify-center items-center mt-8">
        <button
          onClick={onOpenSecretLetter}
          className="group relative px-8 py-5 sm:px-14 sm:py-6 rounded-3xl bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 hover:from-rose-500 hover:via-pink-500 hover:to-rose-600 text-white font-black text-xl sm:text-2xl md:text-3xl shadow-[0_0_45px_rgba(225,29,72,0.65)] hover:shadow-[0_0_65px_rgba(225,29,72,0.95)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 sm:gap-4 cursor-pointer border-2 border-rose-400/50"
        >
          <span className="text-2xl sm:text-3xl animate-bounce">💌</span>
          <span className="font-cairo">افتحي الجواب السري ليكي</span>
          <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-white fill-white group-hover:scale-125 transition-transform animate-pulse" />
        </button>
      </div>
    </section>
  );
};
