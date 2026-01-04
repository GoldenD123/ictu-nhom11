
import React, { useState, useRef } from 'react';
import { analyzeCV } from '../services/geminiService';
import { CVAnalysis, JobRecommendation } from '../types';

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<CVAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError("Vui lòng tải lên ảnh CV của bạn (JPG/PNG). Hiện tại hệ thống ưu tiên định dạng ảnh để phân tích tốt nhất.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64Data = (reader.result as string).split(',')[1];
        try {
          const result = await analyzeCV(base64Data, file.type);
          setAnalysis(result);
        } catch (err: any) {
          console.error(err);
          setError("Không thể phân tích CV. Vui lòng thử lại với hình ảnh rõ nét hơn.");
        } finally {
          setLoading(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setLoading(false);
      setError("Đã xảy ra lỗi không mong muốn.");
    }
  };

  const JobCard: React.FC<{ job: JobRecommendation }> = ({ job }) => (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 hover:shadow-2xl hover:border-indigo-300 transition-all group flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h4 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight mb-1">{job.title}</h4>
          <p className="text-slate-500 font-semibold text-sm">{job.company}</p>
        </div>
        <div className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-[10px] font-black border border-emerald-100 shadow-sm uppercase tracking-tighter shrink-0">
          {job.matchScore}% Phù hợp
        </div>
      </div>
      
      <div className="flex flex-wrap gap-4 mb-5 text-[11px] text-slate-500 font-medium">
        <span className="flex items-center"><i className="fas fa-map-marker-alt mr-1.5 text-indigo-500"></i> {job.location}</span>
        <span className="flex items-center"><i className="fas fa-money-bill-wave mr-1.5 text-green-500"></i> {job.salaryRange}</span>
      </div>

      <div className="bg-slate-50 rounded-2xl p-4 mb-5 flex-grow">
        <p className="text-xs text-slate-600 leading-relaxed italic line-clamp-3">
          <i className="fas fa-quote-left text-indigo-300 mr-2 opacity-50"></i>
          {job.whyMatch}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {job.requiredSkills.slice(0, 4).map(skill => (
          <span key={skill} className="bg-white border border-slate-100 text-slate-600 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider shadow-sm">
            {skill}
          </span>
        ))}
        {job.requiredSkills.length > 4 && <span className="text-[10px] text-slate-400 font-bold">+{job.requiredSkills.length - 4}</span>}
      </div>

      <button className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100 hover:shadow-indigo-200">
        Ứng tuyển ngay
      </button>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Bảng điều khiển</h2>
          <p className="text-slate-500 mt-2 font-medium">Tải CV lên để khám phá các công việc phù hợp nhất với bạn.</p>
        </div>
        {analysis && (
           <button 
            onClick={() => fileInputRef.current?.click()}
            className="bg-white border-2 border-slate-200 text-slate-700 px-6 py-2.5 rounded-xl font-bold hover:border-indigo-500 hover:text-indigo-600 transition-all flex items-center justify-center shadow-sm"
           >
             <i className="fas fa-redo mr-2 text-sm"></i> Tải lại CV khác
           </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Sidebar Column */}
        <div className="lg:col-span-4 space-y-8">
          {!analysis ? (
            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center mb-6 shadow-inner">
                  <i className="fas fa-cloud-upload-alt text-3xl text-indigo-600"></i>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-slate-900">Bắt đầu ngay</h3>
                <p className="text-sm text-slate-500 mb-8 leading-relaxed">Hệ thống AI sẽ phân tích CV của bạn để trích xuất thông tin và tìm kiếm công việc tốt nhất.</p>
                
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className={`w-full border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                    loading ? 'bg-slate-50 border-slate-200 pointer-events-none' : 'hover:border-indigo-400 hover:bg-indigo-50 border-slate-200'
                  }`}
                >
                  {loading ? (
                    <div className="space-y-4">
                      <div className="relative">
                        <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin mx-auto"></div>
                      </div>
                      <p className="text-sm font-bold text-slate-700">Đang phân tích hồ sơ...</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-sm font-bold text-slate-700">Chọn ảnh CV từ máy tính</p>
                      <p className="text-[10px] text-slate-400 font-medium">Định dạng hỗ trợ: JPG, PNG, WEBP</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-[2rem] overflow-hidden shadow-xl border border-slate-100 animate-in slide-in-from-left duration-500">
              <div className="bg-indigo-600 p-8 text-white relative">
                <div className="flex items-center space-x-5 relative z-10">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-3xl font-black shadow-lg">
                    {analysis.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black">{analysis.name}</h3>
                    <p className="text-indigo-100 text-sm font-bold uppercase tracking-widest">{analysis.experienceLevel}</p>
                  </div>
                </div>
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <i className="fas fa-user-tie text-9xl"></i>
                </div>
              </div>
              <div className="p-8">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Tóm tắt chuyên môn</h4>
                <p className="text-slate-600 text-sm leading-relaxed mb-8 font-medium">
                  {analysis.summary}
                </p>
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Kỹ năng nổi bật</h4>
                <div className="flex flex-wrap gap-2">
                  {analysis.skills.map(skill => (
                    <span key={skill} className="bg-slate-50 text-indigo-600 border border-indigo-50 px-3 py-1.5 rounded-xl text-xs font-bold shadow-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          <div className="bg-amber-50 rounded-3xl p-6 border border-amber-100">
            <div className="flex items-start space-x-4">
              <div className="bg-amber-100 p-3 rounded-2xl text-amber-600">
                <i className="fas fa-lightbulb"></i>
              </div>
              <div>
                <h4 className="font-bold text-amber-900 text-sm mb-1">Mẹo nhỏ</h4>
                <p className="text-xs text-amber-800 leading-relaxed opacity-80 font-medium">
                  Hãy đảm bảo CV của bạn có định dạng rõ ràng, văn bản không bị nhòe để AI có thể trích xuất thông tin chính xác nhất.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Column */}
        <div className="lg:col-span-8">
          {!analysis && !loading ? (
            <div className="h-full flex flex-col items-center justify-center bg-white border border-slate-100 rounded-[2rem] p-12 text-center shadow-sm">
              <div className="w-64 h-64 mb-8">
                <img 
                  src="https://cdni.iconscout.com/illustration/premium/thumb/job-search-illustration-download-in-svg-png-gif-file-formats--interview-hiring-online-resume-recruitment-finding-pack-business-illustrations-4720177.png" 
                  alt="Empty State" 
                  className="w-full h-full object-contain opacity-80"
                />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Đang chờ hồ sơ của bạn</h3>
              <p className="max-w-sm mx-auto text-slate-500 font-medium">Hãy tải CV lên để chúng tôi giúp bạn lọc ra những vị trí công việc phù hợp với năng lực nhất.</p>
            </div>
          ) : loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="bg-slate-100 h-[380px] rounded-[2rem] animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="space-y-8 animate-in fade-in duration-700">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-2xl font-black text-slate-900 flex items-center">
                  <span className="w-2 h-8 bg-indigo-600 rounded-full mr-4"></span>
                  Gợi ý việc làm dành riêng cho bạn
                </h3>
                <span className="bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-xs font-black shadow-sm">
                  {analysis?.recommendedJobs.length} KẾT QUẢ
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {analysis?.recommendedJobs.map(job => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <input 
        type="file" 
        className="hidden" 
        ref={fileInputRef} 
        onChange={handleFileUpload} 
        accept="image/*"
      />
      {error && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-10">
          <p className="text-sm font-bold text-white bg-red-500 px-8 py-4 rounded-2xl shadow-2xl flex items-center border border-red-400">
            <i className="fas fa-exclamation-triangle mr-3"></i> {error}
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
