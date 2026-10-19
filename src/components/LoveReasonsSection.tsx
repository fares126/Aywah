import React, { useState } from 'react';
import { Sparkles, Heart, Plus, Edit3, Trash2, X, Check, AlertTriangle, RotateCcw } from 'lucide-react';
import { LoveReason } from '../types';
import { DEFAULT_LOVE_REASONS, saveLoveReasons } from '../utils/storage';
import { audioEngine } from '../utils/audioEngine';

interface LoveReasonsSectionProps {
  reasons: LoveReason[];
  isAdmin: boolean;
  onUpdateReasons: (updated: LoveReason[]) => void;
}

const COMMON_EMOJIS = ['✨', '🌸', '💫', '👑', '💖', '🎀', '🌹', '🕊️', '🔥', '🌙', '🔮', '♾️', '💍', '🧸', '🍓', '💎'];

export const LoveReasonsSection: React.FC<LoveReasonsSectionProps> = ({
  reasons,
  isAdmin,
  onUpdateReasons
}) => {
  const [likedCards, setLikedCards] = useState<Record<string, boolean>>({});

  // Modals state
  const [editingReason, setEditingReason] = useState<LoveReason | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [reasonToDelete, setReasonToDelete] = useState<LoveReason | null>(null);

  // Form fields state
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formIcon, setFormIcon] = useState('✨');

  const toggleHeart = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    audioEngine.playHeartbeatThump();
    setLikedCards((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const openAddModal = () => {
    setFormTitle('');
    setFormDescription('');
    setFormIcon('✨');
    setIsAddingNew(true);
  };

  const openEditModal = (reason: LoveReason, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingReason(reason);
    setFormTitle(reason.title);
    setFormDescription(reason.description);
    setFormIcon(reason.icon || '✨');
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReason || !formTitle.trim()) return;

    const updated = reasons.map((r) =>
      r.id === editingReason.id
        ? {
            ...r,
            title: formTitle.trim(),
            description: formDescription.trim(),
            icon: formIcon.trim() || '✨'
          }
        : r
    );

    saveLoveReasons(updated);
    onUpdateReasons(updated);
    audioEngine.playCelebrationChime();
    setEditingReason(null);
  };

  const handleSaveAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const newReason: LoveReason = {
      id: `reason-${Date.now()}`,
      title: formTitle.trim(),
      description: formDescription.trim(),
      icon: formIcon.trim() || '✨'
    };

    const updated = [...reasons, newReason];
    saveLoveReasons(updated);
    onUpdateReasons(updated);
    audioEngine.playCelebrationChime();
    setIsAddingNew(false);
  };

  const confirmDelete = () => {
    if (!reasonToDelete) return;

    const updated = reasons.filter((r) => r.id !== reasonToDelete.id);
    saveLoveReasons(updated);
    onUpdateReasons(updated);
    audioEngine.playCelebrationChime();
    setReasonToDelete(null);
  };

  const handleRestoreDefaults = () => {
    if (window.confirm('هل تريد استرجاع جميع الأسباب الافتراضية؟')) {
      saveLoveReasons(DEFAULT_LOVE_REASONS);
      onUpdateReasons(DEFAULT_LOVE_REASONS);
      audioEngine.playCelebrationChime();
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 max-w-6xl mx-auto scroll-mt-24">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>اعترافات من القلب للقلب</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-cairo text-white mb-3">
          ليه بحبك يا أيويه؟ 💕
        </h2>
        <p className="text-sm sm:text-base text-rose-200/80 font-amiri leading-relaxed">
          لو قعدت أعد أسباب حبي ليكي هحتاج عمر تاني فوق عمري.. دي مجرد نقطة في بحر عشقي ليكي يا ست البنات.
        </p>

        {/* Admin Controls Toolbar */}
        {isAdmin && (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={openAddModal}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-rose-600/30 hover:scale-105 active:scale-95 transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة سبب حب جديد ➕</span>
            </button>

            {reasons.length < DEFAULT_LOVE_REASONS.length && (
              <button
                onClick={handleRestoreDefaults}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-rose-300 text-xs font-semibold border border-rose-500/30 transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>استرجاع الأسباب المحذوفة</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Empty State */}
      {reasons.length === 0 && (
        <div className="p-10 text-center rounded-3xl glass-panel border border-rose-500/20 max-w-md mx-auto">
          <Heart className="w-12 h-12 text-rose-500/50 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-1">تم مسح جميع الخانات</h3>
          <p className="text-xs text-rose-300/70 mb-4">
            تقدر كأدمن تضيف أسباب جديدة دلوقتي أو تسترجع الأسباب السابقة
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={openAddModal}
              className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold"
            >
              إضافة سبب جديد
            </button>
            <button
              onClick={() => {
                saveLoveReasons(DEFAULT_LOVE_REASONS);
                onUpdateReasons(DEFAULT_LOVE_REASONS);
              }}
              className="px-4 py-2 rounded-xl bg-white/10 text-rose-200 text-xs font-bold"
            >
              استرجاع الافتراضي
            </button>
          </div>
        </div>
      )}

      {/* Grid of Reason Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reasons.map((reason, index) => {
          const isLiked = likedCards[reason.id];

          return (
            <div
              key={reason.id}
              className="group relative p-6 sm:p-7 rounded-3xl glass-panel border border-rose-500/20 hover:border-rose-400/60 shadow-lg hover:shadow-[0_0_25px_rgba(225,29,72,0.25)] transition-all duration-300 flex flex-col justify-between text-right hover:-translate-y-1.5"
            >
              {/* Top Row: Icon badge + Admin controls + Heart */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-900/50 to-pink-900/40 border border-rose-500/40 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shadow-md">
                  {reason.icon}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-rose-400/80 font-bold">
                    #{index + 1}
                  </span>

                  {/* Admin Edit & Delete buttons */}
                  {isAdmin && (
                    <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-rose-500/30">
                      <button
                        onClick={(e) => openEditModal(reason, e)}
                        className="p-1.5 rounded-lg text-rose-300 hover:text-white hover:bg-rose-600/40 transition cursor-pointer"
                        title="تعديل هذا الكلام"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setReasonToDelete(reason);
                        }}
                        className="p-1.5 rounded-lg text-red-300 hover:text-white hover:bg-red-600/60 transition cursor-pointer"
                        title="مسح هذه الخانة"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {/* Interactive Heart Pulse */}
                  <button
                    onClick={(e) => toggleHeart(reason.id, e)}
                    className={`p-2 rounded-full border transition-all cursor-pointer ${
                      isLiked
                        ? 'bg-rose-600/30 border-rose-500 text-rose-400 scale-110'
                        : 'bg-white/5 border-white/10 text-rose-300/40 hover:text-rose-400 hover:border-rose-500/30'
                    }`}
                    title="نبضة حب لهذا السبب"
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        isLiked ? 'fill-rose-500 text-rose-500' : ''
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="font-cairo font-bold text-lg text-white group-hover:text-rose-300 transition-colors mb-2">
                  {reason.title}
                </h3>
                <p className="font-amiri text-base text-rose-100/85 leading-relaxed">
                  {reason.description}
                </p>
              </div>

              {/* Bottom delicate accent */}
              <div className="mt-5 pt-3 border-t border-rose-500/15 flex items-center justify-between text-[11px] text-rose-400/60">
                <span>عشق دائم ♾️</span>
                <span className="font-mono">فارس & أيويه</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* EDIT MODAL */}
      {editingReason && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl glass-panel-glow border-2 border-rose-500/40 text-right">
            <button
              onClick={() => setEditingReason(null)}
              className="absolute top-4 left-4 p-2 text-rose-300 hover:text-white rounded-full bg-white/5 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold font-cairo text-white mb-1">
              تعديل سبب الحب ✏️
            </h3>
            <p className="text-xs text-rose-200/70 mb-4 font-amiri">
              اكتب الكلام اللي حابب تقوله لقلب أيويه في هذه الخانة
            </p>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              {/* Emoji Picker */}
              <div>
                <label className="block text-xs font-semibold text-rose-300 mb-1.5">
                  اختر الرمز / الإيموجي:
                </label>
                <div className="flex flex-wrap gap-2 p-2 rounded-2xl bg-rose-950/40 border border-rose-500/30">
                  {COMMON_EMOJIS.map((emoji) => (
                    <button
                      type="button"
                      key={emoji}
                      onClick={() => setFormIcon(emoji)}
                      className={`w-8 h-8 rounded-xl text-lg flex items-center justify-center transition cursor-pointer ${
                        formIcon === emoji
                          ? 'bg-rose-600 scale-110 shadow-md'
                          : 'hover:bg-white/10'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-rose-300 mb-1">
                  عنوان السبب:
                </label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="مثال: ضحكتك، عيونك، حنيتك عليا..."
                  required
                  className="w-full px-3 py-2.5 rounded-xl bg-rose-950/60 border border-rose-500/30 text-white text-sm focus:outline-none focus:border-rose-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-rose-300 mb-1">
                  شرح وكلام الحب من قلبك:
                </label>
                <textarea
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="اكتب تفاصيل إحساسك..."
                  rows={4}
                  required
                  className="w-full px-3 py-2.5 rounded-xl bg-rose-950/60 border border-rose-500/30 text-white text-sm font-amiri leading-relaxed resize-none focus:outline-none focus:border-rose-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-sm shadow-lg shadow-rose-600/30 transition cursor-pointer flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>حفظ التعديلات</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ADD NEW REASON MODAL */}
      {isAddingNew && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl glass-panel-glow border-2 border-rose-500/40 text-right">
            <button
              onClick={() => setIsAddingNew(false)}
              className="absolute top-4 left-4 p-2 text-rose-300 hover:text-white rounded-full bg-white/5 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold font-cairo text-white mb-1">
              إضافة سبب حب جديد ➕
            </h3>
            <p className="text-xs text-rose-200/70 mb-4 font-amiri">
              ضيف خانة جديدة لأسباب عشقك لأيويه
            </p>

            <form onSubmit={handleSaveAdd} className="space-y-4">
              {/* Emoji Picker */}
              <div>
                <label className="block text-xs font-semibold text-rose-300 mb-1.5">
                  اختر الرمز / الإيموجي:
                </label>
                <div className="flex flex-wrap gap-2 p-2 rounded-2xl bg-rose-950/40 border border-rose-500/30">
                  {COMMON_EMOJIS.map((emoji) => (
                    <button
                      type="button"
                      key={emoji}
                      onClick={() => setFormIcon(emoji)}
                      className={`w-8 h-8 rounded-xl text-lg flex items-center justify-center transition cursor-pointer ${
                        formIcon === emoji
                          ? 'bg-rose-600 scale-110 shadow-md'
                          : 'hover:bg-white/10'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-rose-300 mb-1">
                  عنوان السبب:
                </label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="مثال: صوتك، غيرتك، حلمنا سوا..."
                  required
                  className="w-full px-3 py-2.5 rounded-xl bg-rose-950/60 border border-rose-500/30 text-white text-sm focus:outline-none focus:border-rose-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-rose-300 mb-1">
                  كلام من القلب:
                </label>
                <textarea
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="اكتب كلامك الرومانسي لأيويه..."
                  rows={4}
                  required
                  className="w-full px-3 py-2.5 rounded-xl bg-rose-950/60 border border-rose-500/30 text-white text-sm font-amiri leading-relaxed resize-none focus:outline-none focus:border-rose-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-sm shadow-lg shadow-rose-600/30 transition cursor-pointer flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة الخانة للألبوم 💕</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE MODAL */}
      {reasonToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-sm p-6 rounded-3xl glass-panel-glow border-2 border-red-500/50 text-center shadow-[0_0_40px_rgba(239,68,68,0.3)]">
            <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-600 flex items-center justify-center shadow-lg shadow-red-600/40">
              <AlertTriangle className="w-7 h-7 text-white" />
            </div>

            <h3 className="text-lg font-bold font-cairo text-white mb-2">
              مسح هذه الخانة؟ 🗑️
            </h3>
            <p className="text-sm text-rose-200/80 mb-2 font-cairo font-bold text-rose-300">
              "{reasonToDelete.title}"
            </p>
            <p className="text-xs text-rose-300/60 mb-6">
              هل أنت متأكد يا فارس من رغبتك في حذف هذه الخانة من قائمة أسباب حبي ليكي؟
            </p>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setReasonToDelete(null)}
                className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-rose-200 font-bold text-xs transition cursor-pointer"
              >
                إلغاء
              </button>

              <button
                onClick={confirmDelete}
                className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs shadow-lg transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>نعم، امسح الخانة</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
