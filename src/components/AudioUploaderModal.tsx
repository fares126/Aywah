import React, { useState } from 'react';
import { X, Upload, Music, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';
import { saveCustomSong, deleteCustomSong } from '../utils/storage';
import { audioEngine } from '../utils/audioEngine';

interface AudioUploaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSongChanged: () => void;
  currentSongName?: string;
  hasCustomSong: boolean;
}

export const AudioUploaderModal: React.FC<AudioUploaderModalProps> = ({
  isOpen,
  onClose,
  onSongChanged,
  currentSongName,
  hasCustomSong
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.includes('audio') && !file.name.match(/\.(mp3|m4a|wav|ogg|aac)$/i)) {
      setErrorMsg('من فضلك اختاري ملف صوتي بصيغة MP3 أو M4A أو WAV');
      return;
    }

    try {
      setIsUploading(true);
      setErrorMsg('');
      setSuccessMsg('');

      // Save to IndexedDB
      await saveCustomSong(file);

      // Load into audio engine
      audioEngine.setCustomSong(file, file.name);
      audioEngine.play();

      setSuccessMsg(`تم تحميل الأغنية بنجاح: "${file.name}" وتشتغل تلقائياً من ذاكرة الجهاز! 🎶`);
      onSongChanged();
    } catch {
      setErrorMsg('حدث خطأ أثناء حفظ الملف الصوتي. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveSong = async () => {
    try {
      await deleteCustomSong();
      audioEngine.removeCustomSong();
      audioEngine.play(); // switches to romantic piano fallback
      setSuccessMsg('تم الرجوع إلى أغنية حبنا: عامر منيب - حب العمر (بينا نعيش) 🎶');
      onSongChanged();
    } catch {
      setErrorMsg('فشل حذف الأغنية');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl glass-panel-glow border border-rose-500/40 text-center">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 text-rose-300 hover:text-white rounded-full bg-white/5 hover:bg-rose-600/30 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-rose-600 to-pink-500 flex items-center justify-center shadow-lg shadow-rose-600/30">
          <Music className="w-8 h-8 text-white" />
        </div>

        <h3 className="text-xl sm:text-2xl font-bold font-cairo text-white mb-2">
          إدارة أغنية الإهداء 🎵
        </h3>
        <p className="text-xs sm:text-sm text-rose-200/80 mb-6 leading-relaxed">
          الأغنية الأساسية هي <span className="font-bold text-amber-300">عامر منيب - حب العمر (بينا نعيش)</span>، وتقدري كمان ترفعي أي أغنية من موبايلك في أي وقت!
        </p>

        {/* Current status */}
        <div className="p-4 mb-6 rounded-2xl bg-rose-950/40 border border-rose-500/30 text-right">
          <p className="text-xs text-rose-400 font-semibold mb-1">الأغنية الحالية:</p>
          <p className="text-sm font-bold text-white truncate">
            {hasCustomSong && currentSongName
              ? `📱 ${currentSongName}`
              : '🎶 عامر منيب - حب العمر (بينا نعيش)'}
          </p>
        </div>

        {/* Upload Button */}
        <label className="block w-full cursor-pointer group">
          <input
            type="file"
            accept="audio/*,.mp3,.m4a,.wav,.aac"
            onChange={handleFileUpload}
            disabled={isUploading}
            className="hidden"
          />
          <div className="py-4 px-6 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold flex items-center justify-center gap-3 shadow-lg shadow-rose-600/30 group-hover:scale-[1.02] transition">
            <Upload className="w-5 h-5" />
            <span>{isUploading ? 'جاري التحميل...' : 'رفع أغنية من الموبايل (MP3 / M4A)'}</span>
          </div>
        </label>

        {hasCustomSong && (
          <button
            onClick={handleRemoveSong}
            className="mt-3 w-full py-2.5 px-4 rounded-xl bg-red-950/40 hover:bg-red-900/50 text-red-300 border border-red-500/30 text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>حذف الأغنية المرفوعة والرجوع لعزف البيانو</span>
          </button>
        )}

        {successMsg && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2 text-right">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div className="mt-4 p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2 text-right">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="mt-6 text-xs text-rose-300/50">
          الموسيقى بتتحفظ محلياً على جهازك ومفيش أي حاجة بتضيع 💕
        </div>
      </div>
    </div>
  );
};
