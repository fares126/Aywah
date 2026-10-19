import React, { useState } from 'react';
import { X, Save, Mail, FileText, Calendar, CheckCircle2, Sparkles } from 'lucide-react';
import { SecretLetter, PublicLetter, BirthdayCakeData } from '../types';
import { saveSecretLetter, savePublicLetter, saveCakeData } from '../utils/storage';
import { audioEngine } from '../utils/audioEngine';

interface AdminEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  secretLetter: SecretLetter;
  publicLetter: PublicLetter;
  cakeData: BirthdayCakeData;
  onSaveSecretLetter: (updated: SecretLetter) => void;
  onSavePublicLetter: (updated: PublicLetter) => void;
  onSaveCakeData: (updated: BirthdayCakeData) => void;
  initialTab?: 'secret' | 'public' | 'dates' | 'cake';
}

export const AdminEditModal: React.FC<AdminEditModalProps> = ({
  isOpen,
  onClose,
  secretLetter,
  publicLetter,
  cakeData,
  onSaveSecretLetter,
  onSavePublicLetter,
  onSaveCakeData,
  initialTab = 'secret'
}) => {
  const [activeTab, setActiveTab] = useState<'secret' | 'public' | 'dates' | 'cake'>(initialTab);
  const [successNotice, setSuccessNotice] = useState('');

  // Secret letter local edit state
  const [secTitle, setSecTitle] = useState(secretLetter.title);
  const [secRecipient, setSecRecipient] = useState(secretLetter.recipient);
  const [secSalutation, setSecSalutation] = useState(secretLetter.salutation);
  const [secParagraphs, setSecParagraphs] = useState(secretLetter.paragraphs.join('\n\n'));
  const [secClosing, setSecClosing] = useState(secretLetter.closing);
  const [secSender, setSecSender] = useState(secretLetter.sender);
  const [secSpecialNote, setSecSpecialNote] = useState(secretLetter.specialNote);
  const [secWaxInitials, setSecWaxInitials] = useState(secretLetter.waxInitials);

  // Public letter local edit state
  const [pubTitle, setPubTitle] = useState(publicLetter.title);
  const [pubSubtitle, setPubSubtitle] = useState(publicLetter.subtitle);
  const [pubParagraphs, setPubParagraphs] = useState(publicLetter.paragraphs.join('\n\n'));
  const [pubSignature, setPubSignature] = useState(publicLetter.signature);
  const [meetingDate, setMeetingDate] = useState(publicLetter.meetingDate || '2026-07-21');
  const [birthdayDate, setBirthdayDate] = useState(publicLetter.birthdayDate || '2007-10-20');

  // Cake data local edit state
  const [cakeTitle, setCakeTitle] = useState(cakeData.sectionTitle);
  const [cakeSubtitle, setCakeSubtitle] = useState(cakeData.sectionSubtitle);
  const [tier1, setTier1] = useState(cakeData.tier1Text);
  const [tier2, setTier2] = useState(cakeData.tier2Text);
  const [tier3, setTier3] = useState(cakeData.tier3Text);
  const [wishText, setWishText] = useState(cakeData.wishText);
  const [wishSender, setWishSender] = useState(cakeData.wishSender);

  if (!isOpen) return null;

  const handleSaveSecret = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: SecretLetter = {
      ...secretLetter,
      title: secTitle.trim(),
      recipient: secRecipient.trim(),
      salutation: secSalutation.trim(),
      paragraphs: secParagraphs
        .split('\n\n')
        .map((p) => p.trim())
        .filter(Boolean),
      closing: secClosing.trim(),
      sender: secSender.trim(),
      specialNote: secSpecialNote.trim(),
      waxInitials: secWaxInitials.trim()
    };

    saveSecretLetter(updated);
    onSaveSecretLetter(updated);
    audioEngine.playCelebrationChime();
    setSuccessNotice('تم حفظ الجواب السري بنجاح! 💌');
    setTimeout(() => setSuccessNotice(''), 3000);
  };

  const handleSavePublic = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: PublicLetter = {
      ...publicLetter,
      title: pubTitle.trim(),
      subtitle: pubSubtitle.trim(),
      paragraphs: pubParagraphs
        .split('\n\n')
        .map((p) => p.trim())
        .filter(Boolean),
      signature: pubSignature.trim(),
      meetingDate,
      birthdayDate
    };

    savePublicLetter(updated);
    onSavePublicLetter(updated);
    audioEngine.playCelebrationChime();
    setSuccessNotice('تم حفظ جواب ست البنات بنجاح! 👑');
    setTimeout(() => setSuccessNotice(''), 3000);
  };

  const handleSaveCake = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: BirthdayCakeData = {
      sectionTitle: cakeTitle,
      sectionSubtitle: cakeSubtitle,
      tier1Text: tier1,
      tier2Text: tier2,
      tier3Text: tier3,
      wishText,
      wishSender
    };

    saveCakeData(updated);
    onSaveCakeData(updated);
    audioEngine.playCelebrationChime();
    setSuccessNotice('تم حفظ بيانات التورتة بنجاح! 🎂');
    setTimeout(() => setSuccessNotice(''), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in overflow-y-auto">
      <div className="relative w-full max-w-3xl my-auto p-6 sm:p-8 rounded-3xl glass-panel-glow border-2 border-rose-500/40 text-right max-h-[92vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 text-rose-300 hover:text-white rounded-full bg-white/5 hover:bg-rose-600/40 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold font-cairo text-white">
            تعديل محتوى الموقع والبيانات ✏️
          </h2>
          <p className="text-xs sm:text-sm text-rose-200/70 font-amiri mt-1">
            جميع نصوص الجوابين وتواريخ العداد قابلة للتعديل والتحكم الكامل
          </p>
        </div>

        {/* Success Notice */}
        {successNotice && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-200 text-xs sm:text-sm flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{successNotice}</span>
          </div>
        )}

        {/* Tabs */}
        <div className="flex border-b border-rose-500/20 mb-6 gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('secret')}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold flex items-center gap-2 transition cursor-pointer border-b-2 whitespace-nowrap ${
              activeTab === 'secret'
                ? 'border-rose-500 text-rose-300'
                : 'border-transparent text-rose-300/50 hover:text-rose-200'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>الجواب الأول (الظرف المقفول) 💌</span>
          </button>

          <button
            onClick={() => setActiveTab('public')}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold flex items-center gap-2 transition cursor-pointer border-b-2 whitespace-nowrap ${
              activeTab === 'public'
                ? 'border-rose-500 text-rose-300'
                : 'border-transparent text-rose-300/50 hover:text-rose-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>الجواب الثاني (قسم ست البنات) 👑</span>
          </button>

          <button
            onClick={() => setActiveTab('dates')}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold flex items-center gap-2 transition cursor-pointer border-b-2 whitespace-nowrap ${
              activeTab === 'dates'
                ? 'border-rose-500 text-rose-300'
                : 'border-transparent text-rose-300/50 hover:text-rose-200'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>تواريخ الحب والعداد ⏳</span>
          </button>

          <button
            onClick={() => setActiveTab('cake')}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold flex items-center gap-2 transition cursor-pointer border-b-2 whitespace-nowrap ${
              activeTab === 'cake'
                ? 'border-rose-500 text-rose-300'
                : 'border-transparent text-rose-300/50 hover:text-rose-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>تعديل التورتة 🎂</span>
          </button>
        </div>

        {/* TAB: SECRET LETTER */}
        {activeTab === 'secret' && (
          <form onSubmit={handleSaveSecret} className="space-y-4 overflow-y-auto pr-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-rose-300 mb-1">
                  عنوان الجواب:
                </label>
                <input
                  type="text"
                  value={secTitle}
                  onChange={(e) => setSecTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-rose-950/40 border border-rose-500/30 text-white text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-rose-300 mb-1">
                  المستلم (الظرف الخارجي):
                </label>
                <input
                  type="text"
                  value={secRecipient}
                  onChange={(e) => setSecRecipient(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-rose-950/40 border border-rose-500/30 text-white text-sm"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-rose-300 mb-1">
                  الافتتاحية والتحية:
                </label>
                <input
                  type="text"
                  value={secSalutation}
                  onChange={(e) => setSecSalutation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-rose-950/40 border border-rose-500/30 text-white text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-rose-300 mb-1">
                  الحروف على الختم الشمعي:
                </label>
                <input
                  type="text"
                  value={secWaxInitials}
                  onChange={(e) => setSecWaxInitials(e.target.value)}
                  placeholder="A & F"
                  className="w-full px-3 py-2 rounded-xl bg-rose-950/40 border border-rose-500/30 text-white text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-rose-300 mb-1">
                نص الجواب السري (افصل بين الفقرات بسطرين فارغين):
              </label>
              <textarea
                value={secParagraphs}
                onChange={(e) => setSecParagraphs(e.target.value)}
                rows={6}
                className="w-full px-3 py-2 rounded-xl bg-rose-950/40 border border-rose-500/30 text-white text-sm font-amiri leading-relaxed"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-rose-300 mb-1">
                ملحوظة سرية في أسفل الجواب:
              </label>
              <input
                type="text"
                value={secSpecialNote}
                onChange={(e) => setSecSpecialNote(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-rose-950/40 border border-rose-500/30 text-white text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-rose-300 mb-1">
                  الخاتمة:
                </label>
                <input
                  type="text"
                  value={secClosing}
                  onChange={(e) => setSecClosing(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-rose-950/40 border border-rose-500/30 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-rose-300 mb-1">
                  اسم الراسل:
                </label>
                <input
                  type="text"
                  value={secSender}
                  onChange={(e) => setSecSender(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-rose-950/40 border border-rose-500/30 text-white text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-rose-600/30"
            >
              <Save className="w-4 h-4" />
              <span>حفظ الجواب السري</span>
            </button>
          </form>
        )}

        {/* TAB: PUBLIC LETTER */}
        {activeTab === 'public' && (
          <form onSubmit={handleSavePublic} className="space-y-4 overflow-y-auto pr-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-rose-300 mb-1">
                  عنوان القسم:
                </label>
                <input
                  type="text"
                  value={pubTitle}
                  onChange={(e) => setPubTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-rose-950/40 border border-rose-500/30 text-white text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-rose-300 mb-1">
                  العنوان الفرعي:
                </label>
                <input
                  type="text"
                  value={pubSubtitle}
                  onChange={(e) => setPubSubtitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-rose-950/40 border border-rose-500/30 text-white text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-rose-300 mb-1">
                نص الرسالة لست البنات (افصل بين الفقرات بسطرين):
              </label>
              <textarea
                value={pubParagraphs}
                onChange={(e) => setPubParagraphs(e.target.value)}
                rows={7}
                className="w-full px-3 py-2 rounded-xl bg-rose-950/40 border border-rose-500/30 text-white text-sm font-amiri leading-relaxed"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-rose-300 mb-1">
                التوقيع:
              </label>
              <input
                type="text"
                value={pubSignature}
                onChange={(e) => setPubSignature(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-rose-950/40 border border-rose-500/30 text-white text-sm"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-rose-600/30"
            >
              <Save className="w-4 h-4" />
              <span>حفظ جواب ست البنات</span>
            </button>
          </form>
        )}

        {/* TAB: DATES */}
        {activeTab === 'dates' && (
          <form onSubmit={handleSavePublic} className="space-y-6">
            <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/30">
              <label className="block text-sm font-bold text-white mb-2">
                تاريخ التعارف واللقاء (لعداد الحب):
              </label>
              <input
                type="date"
                value={meetingDate}
                onChange={(e) => setMeetingDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-white text-base"
                required
              />
              <p className="text-xs text-rose-300/60 mt-1.5">
                القيمة المحددة: 21 يوليو 2026
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/30">
              <label className="block text-sm font-bold text-white mb-2">
                تاريخ ميلاد أيويه:
              </label>
              <input
                type="date"
                value={birthdayDate}
                onChange={(e) => setBirthdayDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-white text-base"
                required
              />
              <p className="text-xs text-rose-300/60 mt-1.5">
                القيمة المحددة: 20 أكتوبر 2007 (إتمام 19 سنة)
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-rose-600/30"
            >
              <Save className="w-4 h-4" />
              <span>تحديث التواريخ وحفظ</span>
            </button>
          </form>
        )}
        {/* TAB: CAKE */}
        {activeTab === 'cake' && (
          <form onSubmit={handleSaveCake} className="space-y-4 overflow-y-auto pr-1">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-xs font-semibold text-rose-300 mb-1">عنوان القسم:</label>
                <input type="text" value={cakeTitle} onChange={(e) => setCakeTitle(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-rose-950/40 border border-rose-500/30 text-white text-sm" required />
              </div>
              <div>
                <label className="block text-xs font-semibold text-rose-300 mb-1">العنوان الفرعي:</label>
                <input type="text" value={cakeSubtitle} onChange={(e) => setCakeSubtitle(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-rose-950/40 border border-rose-500/30 text-white text-sm" required />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-rose-300 mb-1">نص الطبقة 1:</label>
                  <input type="text" value={tier1} onChange={(e) => setTier1(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-rose-950/40 border border-rose-500/30 text-white text-sm" required />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-rose-300 mb-1">نص الطبقة 2:</label>
                  <input type="text" value={tier2} onChange={(e) => setTier2(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-rose-950/40 border border-rose-500/30 text-white text-sm" required />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-rose-300 mb-1">نص الطبقة 3:</label>
                  <input type="text" value={tier3} onChange={(e) => setTier3(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-rose-950/40 border border-rose-500/30 text-white text-sm" required />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-rose-300 mb-1">نص الأمنية:</label>
                <textarea value={wishText} onChange={(e) => setWishText(e.target.value)} rows={3} className="w-full px-3 py-2 rounded-xl bg-rose-950/40 border border-rose-500/30 text-white text-sm" required />
              </div>
              <div>
                <label className="block text-xs font-semibold text-rose-300 mb-1">الراسل:</label>
                <input type="text" value={wishSender} onChange={(e) => setWishSender(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-rose-950/40 border border-rose-500/30 text-white text-sm" required />
              </div>
            </div>
            <button type="submit" className="w-full py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg">
              <Save className="w-4 h-4" />
              <span>حفظ بيانات التورتة</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
