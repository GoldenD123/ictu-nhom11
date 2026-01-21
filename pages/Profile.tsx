
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Profile: React.FC = () => {
  const { user, updateCV } = useAuth();
  const [cvInput, setCvInput] = useState(user?.cvContent || '');
  const [isSaving, setIsSaving] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Sync state if user changes
  useEffect(() => {
    if (user?.cvContent) {
      setCvInput(user.cvContent);
    }
  }, [user]);

  const handleSaveCV = () => {
    setIsSaving(true);
    // Giả lập độ trễ mạng để tạo cảm giác chuyên nghiệp
    setTimeout(() => {
      updateCV(cvInput);
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 600);
  };

  const extractTextFromPDF = async (arrayBuffer: ArrayBuffer): Promise<string> => {
    const pdfjsLib = (window as any).pdfjsLib;
    if (!pdfjsLib) throw new Error("Thư viện PDF.js chưa được tải.");

    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    let fullText = "";
    
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item: any) => item.str).join(" ");
      fullText += pageText + "\n\n";
    }
    return fullText.trim();
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setIsReading(true);

    try {
      const fileType = file.name.split('.').pop()?.toLowerCase();
      if (fileType === "docx") {
        const mammoth = (window as any).mammoth;
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        setCvInput(result.value);
      } else if (fileType === "pdf") {
        const arrayBuffer = await file.arrayBuffer();
        const text = await extractTextFromPDF(arrayBuffer);
        setCvInput(text);
      } else if (fileType === "txt") {
        const text = await file.text();
        setCvInput(text);
      } else {
        alert("Định dạng file không hỗ trợ.");
      }
    } catch (error) {
      console.error(error);
      alert("Lỗi khi đọc file.");
    } finally {
      setIsReading(false);
      e.target.value = "";
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {showSuccess && (
        <div className="fixed top-20 right-4 z-50 bg-emerald-500 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-right-10">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
          <span className="font-bold">Đã lưu hồ sơ thành công! AI đã được cập nhật.</span>
        </div>
      )}

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 h-32 relative">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        </div>
        
        <div className="px-8 pb-8">
          <div className="relative -mt-12 mb-6 flex items-end gap-4">
            <img 
              src={`https://ui-avatars.com/api/?name=${user?.fullName}&background=4F46E5&color=fff&size=128`} 
              alt="Avatar" 
              className="w-24 h-24 rounded-2xl border-4 border-white shadow-lg bg-white"
            />
            <div className="mb-2">
              <h2 className="text-2xl font-bold text-gray-900">{user?.fullName}</h2>
              <p className="text-gray-500">{user?.email}</p>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-8 space-y-8">
            <section>
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900">Bước 1: Tải lên CV (Word/PDF)</h3>
              </div>
              
              <div className={`border-2 border-dashed rounded-2xl p-8 transition-all text-center relative ${isReading ? 'bg-blue-50 border-blue-400' : 'bg-gray-50 border-gray-200 hover:border-blue-400 hover:bg-white'}`}>
                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer z-10" onChange={handleFileUpload} accept=".pdf,.docx,.txt" disabled={isReading} />
                {isReading ? (
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-3"></div>
                    <p className="text-blue-600 font-bold">Đang trích xuất nội dung...</p>
                  </div>
                ) : (
                  <>
                    <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" stroke="currentColor" fill="none" viewBox="0 0 48 48"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    <p className="text-blue-600 font-bold">Nhấp để chọn file hoặc kéo thả</p>
                    <p className="text-xs text-gray-400 mt-1">PDF, DOCX, TXT (Tối đa 10MB)</p>
                    {fileName && <p className="mt-4 text-emerald-600 font-bold text-sm bg-emerald-50 px-4 py-2 rounded-full inline-block">✓ Đã tải: {fileName}</p>}
                  </>
                )}
              </div>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900">Bước 2: Kiểm tra & Lưu văn bản trích xuất</h3>
              </div>
              <textarea 
                rows={10}
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none font-mono text-sm leading-relaxed bg-gray-50/50 transition-all"
                placeholder="Nội dung CV của bạn sẽ hiện ở đây..."
                value={cvInput}
                onChange={(e) => setCvInput(e.target.value)}
              ></textarea>
              
              <div className="mt-6 flex justify-end">
                <button 
                  onClick={handleSaveCV}
                  disabled={isSaving || isReading || !cvInput}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 rounded-2xl font-bold transition-all disabled:bg-gray-200 shadow-xl shadow-blue-100 flex items-center gap-2"
                >
                  {isSaving ? "Đang xử lý..." : "Lưu & Cập nhật AI"}
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
