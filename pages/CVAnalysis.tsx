
import React, { useState } from 'react';
import { analyzeCV } from '../services/geminiService';
import { CVAnalysisResult } from '../types';

const CVAnalysis: React.FC = () => {
  const [cvText, setCvText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<CVAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!cvText.trim()) return;
    
    setIsAnalyzing(true);
    setError(null);
    try {
      const analysis = await analyzeCV(cvText);
      setResult(analysis);
    } catch (err) {
      setError("Có lỗi xảy ra trong quá trình phân tích. Vui lòng thử lại.");
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Phân tích CV bằng AI</h1>
        <p className="text-slate-600">Dán nội dung CV của bạn vào đây để nhận đánh giá và gợi ý nghề nghiệp từ Gemini AI.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 space-y-6">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Nội dung CV của bạn</label>
          <textarea
            className="w-full h-64 p-4 bg-slate-50 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
            placeholder="Dán thông tin học vấn, kinh nghiệm làm việc và kỹ năng của bạn..."
            value={cvText}
            onChange={(e) => setCvText(e.target.value)}
          ></textarea>
        </div>

        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing || !cvText.trim()}
          className={`w-full py-4 rounded-2xl font-bold text-white transition flex items-center justify-center space-x-3 ${
            isAnalyzing ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200'
          }`}
        >
          {isAnalyzing ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
              <span>Đang phân tích...</span>
            </>
          ) : (
            <>
              <i className="fas fa-magic"></i>
              <span>Bắt đầu phân tích ngay</span>
            </>
          )}
        </button>

        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
            {error}
          </div>
        )}
      </div>

      {result && (
        <div className="mt-12 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-blue-50 text-blue-600 mb-4">
                <span className="text-4xl font-extrabold">{result.score}</span>
              </div>
              <h3 className="font-bold text-slate-900">Điểm đánh giá</h3>
              <p className="text-slate-500 text-sm mt-1">Dựa trên nội dung cung cấp</p>
            </div>

            <div className="md:col-span-2 bg-white p-8 rounded-3xl border border-slate-200">
              <h3 className="font-bold text-slate-900 text-lg mb-4 flex items-center">
                <i className="fas fa-file-alt text-blue-600 mr-2"></i> Tóm tắt hồ sơ
              </h3>
              <p className="text-slate-600 leading-relaxed italic">"{result.summary}"</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-200">
              <h3 className="font-bold text-slate-900 text-lg mb-4 flex items-center">
                <i className="fas fa-brain text-purple-600 mr-2"></i> Kỹ năng hàng đầu
              </h3>
              <div className="flex flex-wrap gap-2">
                {result.topSkills.map((skill, idx) => (
                  <span key={idx} className="bg-purple-50 text-purple-700 px-3 py-1.5 rounded-lg text-sm font-bold">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200">
              <h3 className="font-bold text-slate-900 text-lg mb-4 flex items-center">
                <i className="fas fa-briefcase text-green-600 mr-2"></i> Vị trí gợi ý
              </h3>
              <div className="space-y-2">
                {result.suggestedRoles.map((role, idx) => (
                  <div key={idx} className="flex items-center text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <i className="fas fa-check-circle text-green-500 mr-3"></i>
                    <span className="font-medium">{role}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CVAnalysis;
