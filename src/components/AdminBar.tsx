import React, { useRef } from 'react';
import { Eye, Edit3, Music, LogOut, ShieldCheck, Sparkles, Download, Upload } from 'lucide-react';
import { exportAppDataJson, importAppDataJson } from '../utils/storage';

interface AdminBarProps {
  isPreviewMode: boolean;
  onTogglePreview: () => void;
  onOpenEditModal: () => void;
  onOpenMusicModal: () => void;
  onLogout: () => void;
}

export const AdminBar: React.FC<AdminBarProps> = ({
  isPreviewMode,
  onTogglePreview,
  onOpenEditModal,
  onOpenMusicModal,
  onLogout
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = async () => {
    try {
      const jsonStr = await exportAppDataJson();
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ayoweh_birthday_backup_${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Export failed:', err);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      const content = event.target?.result as string;
      if (content) {
        const success = await importAppDataJson(content);
        if (success) {
          alert('تم استعادة النسخة الاحتياطية بنجاح! سيتم إعادة تحميل الصفحة 💖');
          window.location.reload();
        } else {
          alert('فشل في قراءة ملف النسخة الاحتياطية.');
        }
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-3xl">
      <div className="p-3 sm:p-4 rounded-3xl glass-panel-glow border-2 border-amber-500/40 shadow-[0_10px_40px_rgba(0,0,0,0.8)] flex flex-wrap items-center justify-between gap-3 bg-[#13071c]/90">
        
        {/* Admin Badge */}
        <div className="flex items-center gap-2 text-right">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-600 flex items-center justify-center shadow-md">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>لوحة تحكم فارس 👑</span>
            </div>
            <p className="text-[10px] text-emerald-300/90 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{isPreviewMode ? 'وضع المعاينة كـ أيويه مفعل' : 'مزامنة سحابية تلقائية: أي صورة أو تعديل يظهر فوراً لأي شخص من أي تلفون 🌍'}</span>
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Preview Toggle */}
          <button
            onClick={onTogglePreview}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer border ${
              isPreviewMode
                ? 'bg-amber-500 text-black border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.5)]'
                : 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border-amber-500/40'
            }`}
            title="معاينة الموقع بدون أزرار التعديل كما تراه أيويه"
          >
            <Eye className="w-4 h-4" />
            <span>{isPreviewMode ? 'إنهاء المعاينة' : '👁️ معاينة'}</span>
          </button>

          {/* Edit Letters */}
          <button
            onClick={onOpenEditModal}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-rose-600/30 hover:bg-rose-600/50 text-rose-100 border border-rose-500/40 transition cursor-pointer"
          >
            <Edit3 className="w-4 h-4" />
            <span className="hidden xs:inline">تعديل</span>
          </button>

          {/* Music Upload */}
          <button
            onClick={onOpenMusicModal}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-pink-600/30 hover:bg-pink-600/50 text-pink-100 border border-pink-500/40 transition cursor-pointer"
            title="إدارة أغنية الإهداء"
          >
            <Music className="w-4 h-4" />
            <span className="hidden sm:inline">الأغنية</span>
          </button>

          {/* Export Backup */}
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-amber-600/30 hover:bg-amber-600/50 text-amber-100 border border-amber-500/40 transition cursor-pointer"
            title="تحميل نسخة احتياطية من الصور والتعديلات (للنقل بين الروابط)"
          >
            <Download className="w-4 h-4" />
            <span className="hidden md:inline">تصدير نسخة</span>
          </button>

          {/* Import Backup */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-100 border border-emerald-500/40 transition cursor-pointer"
            title="استعادة نسخة احتياطية (لنقل البيانات لرابط آخر)"
          >
            <Upload className="w-4 h-4" />
            <span className="hidden md:inline">استعادة</span>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".json"
            className="hidden"
          />

          {/* Logout */}
          <button
            onClick={onLogout}
            className="p-2 rounded-xl text-rose-300 hover:text-white bg-white/5 hover:bg-rose-900/60 border border-rose-500/20 transition cursor-pointer"
            title="تسجيل الخروج"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
