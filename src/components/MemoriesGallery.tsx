import React, { useState } from 'react';
import { Camera, Plus, Trash2, Calendar, Heart, ChevronLeft, ChevronRight, X, Sparkles, AlertTriangle, CheckCircle2, Loader2 } from 'lucide-react';
import { MemoryPhoto } from '../types';
import { saveCustomPhoto, deleteMemoryPhoto } from '../utils/storage';
import { audioEngine } from '../utils/audioEngine';
import { compressImage } from '../utils/imageCompressor';

interface MemoriesGalleryProps {
  memories: MemoryPhoto[];
  isAdmin: boolean;
  onMemoriesUpdated: () => void;
}

export const MemoriesGallery: React.FC<MemoriesGalleryProps> = ({
  memories,
  isAdmin,
  onMemoriesUpdated
}) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [photoToDelete, setPhotoToDelete] = useState<MemoryPhoto | null>(null);
  const [toastMessage, setToastMessage] = useState<string>('');

  // New photo form state
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [newImagePreview, setNewImagePreview] = useState<string | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setFormError('من فضلك اختر ملف صورة صالح (JPEG, PNG, WEBP)');
      return;
    }

    try {
      setIsCompressing(true);
      setFormError('');
      // Compress any phone image (even 10MB+) to high-def crisp lightweight WebP/JPEG
      const optimizedDataUrl = await compressImage(file, {
        maxWidth: 1400,
        maxHeight: 1400,
        quality: 0.85
      });
      setNewImagePreview(optimizedDataUrl);
    } catch (err: any) {
      console.error('Image compression error:', err);
      setFormError('حدث خطأ أثناء معالجة الصورة، يرجى اختيار صورة أخرى');
    } finally {
      setIsCompressing(false);
    }
  };

  const handleAddMemory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImagePreview || !newTitle.trim()) {
      setFormError('من فضلك اختر صورة واكتب عنوان الذكرى');
      return;
    }

    try {
      setIsSaving(true);
      const newMemory: MemoryPhoto = {
        id: `custom-mem-${Date.now()}`,
        title: newTitle.trim(),
        date: newDate.trim() || new Date().toLocaleDateString('ar-EG'),
        caption: newCaption.trim(),
        imageUrl: newImagePreview,
        isCustom: true
      };

      await saveCustomPhoto(newMemory);
      audioEngine.playCelebrationChime();
      await onMemoriesUpdated();
      showToast('تم حفظ الصورة بنجاح وبشكل دائم في الألبوم! 📸✨');

      // Reset
      setNewTitle('');
      setNewDate('');
      setNewCaption('');
      setNewImagePreview(null);
      setFormError('');
      setIsAddModalOpen(false);
    } catch (err) {
      console.error('Failed to save memory:', err);
      setFormError('فشل حفظ الصورة، يرجى المحاولة مرة أخرى');
    } finally {
      setIsSaving(false);
    }
  };

  // Open in-app delete confirmation dialog
  const promptDeletePhoto = (photo: MemoryPhoto, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setPhotoToDelete(photo);
  };

  // Confirm delete execution
  const executeDeletePhoto = async () => {
    if (!photoToDelete) return;

    await deleteMemoryPhoto(photoToDelete.id);
    audioEngine.playCelebrationChime();
    onMemoriesUpdated();
    showToast('تم حذف الصورة من ألبوم الذكريات بنجاح 🗑️');

    // If deleting the photo currently shown in lightbox, close or shift index
    if (selectedPhotoIndex !== null) {
      if (memories.length <= 1) {
        setSelectedPhotoIndex(null);
      } else {
        setSelectedPhotoIndex((prev) => (prev! > 0 ? prev! - 1 : 0));
      }
    }

    setPhotoToDelete(null);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) => (prev! > 0 ? prev! - 1 : memories.length - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) => (prev! < memories.length - 1 ? prev! + 1 : 0));
  };

  const currentPhoto = selectedPhotoIndex !== null ? memories[selectedPhotoIndex] : null;

  return (
    <section className="py-16 px-4 sm:px-6 max-w-6xl mx-auto scroll-mt-24">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl bg-emerald-950/90 border border-emerald-500/50 text-emerald-200 text-sm font-bold shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-4 border-b border-rose-500/20 text-center sm:text-right">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-2 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-semibold">
            <Camera className="w-3.5 h-3.5 text-rose-400" />
            <span>ألبوم الذكريات السعيدة</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-cairo text-white">
            لحظات وذكريات محفورة في القلب 📸💕
          </h2>
          <p className="text-sm text-rose-200/70 font-amiri mt-1">
            كل لحظة قضيناها سوا من 21 يوليو هي كنز غالي مستحيل أنساه
          </p>
        </div>

        {/* Admin Add Button */}
        {isAdmin && (
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-sm shadow-lg shadow-rose-600/30 hover:scale-105 transition cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة صورة ذكرى جديدة</span>
          </button>
        )}
      </div>

      {/* Empty State */}
      {memories.length === 0 && (
        <div className="p-12 text-center rounded-3xl glass-panel border border-rose-500/20 max-w-lg mx-auto">
          <Camera className="w-12 h-12 text-rose-400/50 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-1">لا توجد صور حالياً في الألبوم</h3>
          <p className="text-xs text-rose-300/70 mb-4">
            يمكنك كأدمن إضافة صور ذكريات جديدة في أي وقت بالضغط على الزر أعلاه.
          </p>
          {isAdmin && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition cursor-pointer inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة أول صورة</span>
            </button>
          )}
        </div>
      )}

      {/* Grid of Memories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {memories.map((photo, index) => (
          <div
            key={photo.id}
            onClick={() => setSelectedPhotoIndex(index)}
            className="group relative rounded-3xl overflow-hidden glass-panel border border-rose-500/25 hover:border-rose-400/60 shadow-lg hover:shadow-[0_0_30px_rgba(225,29,72,0.3)] transition-all duration-300 cursor-pointer flex flex-col"
          >
            {/* Image Thumbnail */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-rose-950/40">
              <img
                src={photo.imageUrl}
                alt={photo.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0612] via-transparent to-black/30 opacity-70 group-hover:opacity-40 transition-opacity" />

              {/* Date badge */}
              <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-rose-500/30 text-rose-200 text-[11px] font-mono">
                <Calendar className="w-3 h-3 text-amber-400" />
                <span>{photo.date}</span>
              </div>

              {/* Admin delete button: clearly visible on hover or mobile */}
              {isAdmin && (
                <button
                  onClick={(e) => promptDeletePhoto(photo, e)}
                  className="absolute top-3 left-3 p-2 rounded-xl bg-red-950/90 hover:bg-red-600 text-red-200 hover:text-white border border-red-500/50 shadow-lg transition-all duration-200 cursor-pointer hover:scale-110 z-10"
                  title="حذف هذه الصورة"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Content info */}
            <div className="p-4 flex flex-col flex-1 text-right">
              <h3 className="font-cairo font-bold text-white text-base group-hover:text-rose-300 transition-colors line-clamp-1">
                {photo.title}
              </h3>
              <p className="font-amiri text-sm text-rose-200/80 mt-1 line-clamp-2 leading-relaxed">
                {photo.caption}
              </p>
              <div className="mt-auto pt-3 flex items-center justify-between text-[11px] text-rose-400 font-semibold border-t border-rose-500/10">
                <span>اضغطي للتكبير ✨</span>
                <Heart className="w-3.5 h-3.5 text-rose-500 group-hover:fill-rose-500 transition-colors" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* LIGHTBOX MODAL */}
      {currentPhoto && (
        <div
          onClick={() => setSelectedPhotoIndex(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in"
        >
          {/* Close button */}
          <button
            onClick={() => setSelectedPhotoIndex(null)}
            className="absolute top-4 left-4 z-50 p-2.5 text-rose-200 hover:text-white bg-white/10 hover:bg-rose-600 rounded-full transition cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev button */}
          <button
            onClick={handlePrev}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-50 p-3 text-white bg-black/50 hover:bg-rose-600/60 rounded-full border border-rose-500/30 transition cursor-pointer"
            title="السابق"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Next button */}
          <button
            onClick={handleNext}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-50 p-3 text-white bg-black/50 hover:bg-rose-600/60 rounded-full border border-rose-500/30 transition cursor-pointer"
            title="التالي"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Lightbox content card */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full rounded-3xl overflow-hidden glass-panel-glow border-2 border-rose-500/50 shadow-2xl flex flex-col max-h-[90vh]"
          >
            <div className="relative bg-black flex items-center justify-center max-h-[60vh] overflow-hidden">
              <img
                src={currentPhoto.imageUrl}
                alt={currentPhoto.title}
                className="max-h-[60vh] w-auto max-w-full object-contain"
              />
            </div>

            <div className="p-6 text-right bg-gradient-to-b from-[#190823] to-[#0f0416]">
              <div className="flex items-center justify-between gap-2 mb-2">
                <h3 className="text-xl sm:text-2xl font-bold font-cairo text-white">
                  {currentPhoto.title}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-rose-300 font-mono px-3 py-1 rounded-full bg-rose-950/60 border border-rose-500/30">
                    {currentPhoto.date}
                  </span>

                  {/* Admin delete button inside lightbox */}
                  {isAdmin && (
                    <button
                      onClick={() => promptDeletePhoto(currentPhoto)}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-red-950/80 hover:bg-red-600 text-red-200 hover:text-white border border-red-500/40 text-xs font-bold transition cursor-pointer"
                      title="حذف هذه الصورة"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>حذف الصورة</span>
                    </button>
                  )}
                </div>
              </div>
              <p className="font-amiri text-base sm:text-lg text-rose-100/90 leading-relaxed">
                {currentPhoto.caption}
              </p>
              <div className="mt-4 pt-3 border-t border-rose-500/20 flex items-center justify-between text-xs text-rose-400">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  ذكرى {selectedPhotoIndex! + 1} من {memories.length}
                </span>
                <span className="font-amiri italic">حبي ليكي للأبد يا أيويه</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE DIALOG (Custom Modal instead of window.confirm) */}
      {photoToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl glass-panel-glow border-2 border-red-500/50 text-center shadow-[0_0_50px_rgba(239,68,68,0.3)]">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-600 flex items-center justify-center shadow-lg shadow-red-600/40">
              <AlertTriangle className="w-8 h-8 text-white" />
            </div>

            <h3 className="text-xl font-bold font-cairo text-white mb-2">
              تأكيد حذف الصورة 🗑️
            </h3>
            <p className="text-sm text-rose-200/80 mb-4 leading-relaxed">
              هل أنت متأكد يا فارس من رغبتك في حذف هذه الصورة نهائياً من ألبوم الذكريات؟
            </p>

            {/* Thumbnail Preview */}
            <div className="relative w-full h-32 rounded-2xl overflow-hidden border border-rose-500/30 mb-6 bg-black">
              <img
                src={photoToDelete.imageUrl}
                alt={photoToDelete.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 bg-black/70 p-1.5 text-xs text-white truncate font-cairo">
                {photoToDelete.title}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setPhotoToDelete(null)}
                className="py-3 px-4 rounded-2xl bg-white/10 hover:bg-white/20 text-rose-200 font-bold text-sm transition cursor-pointer"
              >
                إلغاء والتراجع
              </button>

              <button
                onClick={executeDeletePhoto}
                className="py-3 px-4 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-sm shadow-lg shadow-red-600/40 hover:scale-105 active:scale-95 transition cursor-pointer flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>نعم، احذفها</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADMIN ADD PHOTO MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl glass-panel-glow border border-rose-500/40 text-right">
            <button
              onClick={() => {
                setIsAddModalOpen(false);
                setFormError('');
              }}
              className="absolute top-4 left-4 p-2 text-rose-300 hover:text-white rounded-full bg-white/5 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold font-cairo text-white mb-2">
              إضافة ذكرى وصورة جديدة 📷
            </h3>
            <p className="text-xs text-rose-200/70 mb-4">
              ارفع صورة من جهازك واكتبي عنوان وتعليق رومانسي يفضل محفوظ.
            </p>

            {formError && (
              <div className="mb-4 p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs">
                {formError}
              </div>
            )}

            <form onSubmit={handleAddMemory} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-rose-300 mb-1">
                  اختر الصورة من الهاتف / الكمبيوتر:
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  disabled={isCompressing || isSaving}
                  required={!newImagePreview}
                  className="w-full text-xs text-rose-200 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-rose-600 file:text-white file:font-semibold hover:file:bg-rose-500 cursor-pointer"
                />
                {isCompressing && (
                  <p className="mt-2 text-xs text-amber-300 flex items-center gap-1.5 animate-pulse">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>جاري معالجة وضغط جودة الصورة لتكون فائقة الوضوح...</span>
                  </p>
                )}
              </div>

              {newImagePreview && (
                <div className="relative w-full h-40 rounded-xl overflow-hidden border border-rose-500/30 group">
                  <img src={newImagePreview} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-500/50 text-[10px] text-emerald-300 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>الصورة جاهزة للحفظ الدائم</span>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-rose-300 mb-1">
                  عنوان الذكرى:
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="مثال: خروجة البحر، ضحكتك الحلوة..."
                  required
                  className="w-full px-3 py-2 rounded-xl bg-rose-950/40 border border-rose-500/30 text-white placeholder-rose-400/40 focus:outline-none focus:border-rose-400 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-rose-300 mb-1">
                  تاريخ الذكرى:
                </label>
                <input
                  type="text"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  placeholder="مثال: 21 يوليو 2026 أو سبتمبر 2026"
                  className="w-full px-3 py-2 rounded-xl bg-rose-950/40 border border-rose-500/30 text-white placeholder-rose-400/40 focus:outline-none focus:border-rose-400 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-rose-300 mb-1">
                  كلام رومانسي وتعليق على الصورة:
                </label>
                <textarea
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  placeholder="اكتب كلامك من القلب لأيويه..."
                  rows={3}
                  className="w-full px-3 py-2 rounded-xl bg-rose-950/40 border border-rose-500/30 text-white placeholder-rose-400/40 focus:outline-none focus:border-rose-400 text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSaving || isCompressing || !newImagePreview}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-sm shadow-lg shadow-rose-600/30 transition cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>جاري الحفظ الدائم على السيرفر...</span>
                  </>
                ) : (
                  <>
                    <Heart className="w-4 h-4 fill-white text-white" />
                    <span>حفظ الذكرى بشكل دائم في الألبوم 💖</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
