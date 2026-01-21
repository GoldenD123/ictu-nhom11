import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MOCK_JOBS } from "../constants";
import { useAuth } from "../context/AuthContext";
import { matchJobsWithCV, chatWithAI } from "../services/geminiService";
import { Job, MatchResult } from "../types";
import AIChatBot, { FormattedMessage } from "../components/AIChatBot";

const Home: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [isMatching, setIsMatching] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);

  const filteredJobs = MOCK_JOBS.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAIMatch = async () => {
    if (!user?.cvContent) {
      alert(
        "Vui lòng tải lên CV hoặc nhập nội dung CV trong trang Profile trước!"
      );
      return;
    }
    setIsMatching(true);
    const results = await matchJobsWithCV(user.cvContent, MOCK_JOBS);
    setMatches(results);
    setIsMatching(false);
  };

  const handleAISearch = async () => {
    if (!searchTerm.trim()) return;
    setIsMatching(true);
    const response = await chatWithAI(
      `Tôi đang tìm kiếm: "${searchTerm}". Hãy tóm tắt các công việc phù hợp nhất từ danh sách của bạn và giải thích tại sao.`,
      MOCK_JOBS,
      user?.cvContent
    );
    setAiAnalysis(response);
    setIsMatching(false);
  };

  const getMatchForJob = (jobId: string) =>
    matches.find((m) => m.jobId === jobId);

  return (
    <div className="min-h-screen pb-20 relative">
      <AIChatBot />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-700 to-indigo-900 text-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            Tìm Công Việc Trong Mơ Với AI
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Nền tảng kết nối ứng viên và nhà tuyển dụng thông qua sức mạnh của
            trí tuệ nhân tạo Gemini.
          </p>

          <div className="flex flex-col md:flex-row gap-4 max-w-3xl mx-auto bg-white p-2 rounded-2xl shadow-2xl">
            <div className="flex-1 flex items-center px-4 bg-gray-50 rounded-xl">
              <svg
                className="w-5 h-5 text-gray-400 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Tên công việc, kỹ năng, công ty..."
                className="w-full bg-transparent py-4 text-gray-800 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleAISearch}
                className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 px-6 py-4 rounded-xl font-bold transition-all flex items-center gap-2 whitespace-nowrap"
              >
                ✨ AI Search
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-[1.02]">
                Tìm ngay
              </button>
            </div>
          </div>

          {aiAnalysis && (
            <div className="max-w-3xl mx-auto mt-8 bg-white/10 backdrop-blur-md p-6 rounded-2xl text-left border border-white/20 animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="flex items-center gap-2 mb-4 text-yellow-300 font-bold">
                <span className="text-xl">✨</span> Phân tích từ AI Assistant:
              </div>
              <div className="bg-white/5 p-1 rounded-xl">
                <FormattedMessage text={aiAnalysis} isAI={true} />
              </div>
              <button
                onClick={() => setAiAnalysis(null)}
                className="mt-6 text-xs text-blue-300 hover:text-white underline font-medium"
              >
                Đóng phân tích
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="p-1 bg-yellow-100 text-yellow-700 rounded text-xs uppercase tracking-tighter">
                AI Match
              </span>
            </h3>
            {isAuthenticated ? (
              <div>
                <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                  AI sẽ đối soát kỹ năng trong CV với yêu cầu công việc để đưa
                  ra điểm số phù hợp.
                </p>
                <button
                  onClick={handleAIMatch}
                  disabled={isMatching}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-100"
                >
                  {isMatching ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    "🚀 Phân tích Hồ sơ"
                  )}
                </button>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-4">
                  Đăng nhập để sử dụng AI.
                </p>
                <Link
                  to="/login"
                  className="block w-full py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-700"
                >
                  Đăng nhập
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Job Listings */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              {filteredJobs.length} Việc làm hiện có
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => {
                const match = getMatchForJob(job.id);
                return (
                  <div
                    key={job.id}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-blue-400 hover:shadow-md transition-all group"
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      <img
                        src={job.logo}
                        alt={job.company}
                        className="w-16 h-16 rounded-xl object-cover shadow-sm"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                              <Link to={`/job/${job.id}`}>{job.title}</Link>
                            </h3>
                            <p className="text-blue-600 font-medium text-sm">
                              {job.company}
                            </p>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="text-emerald-600 font-bold">
                              {job.salary}
                            </span>
                            {match && (
                              <div className="mt-2 flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-full text-[10px] font-bold border border-green-200">
                                Match: {match.matchScore}%
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-4">
                          <span className="text-[11px] bg-gray-100 text-gray-600 px-3 py-1 rounded-lg flex items-center gap-1">
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                            {job.location}
                          </span>
                          {job.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[11px] bg-blue-50 text-blue-600 px-3 py-1 rounded-lg font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {match && (
                          <div className="mt-4 p-4 bg-indigo-50/50 rounded-xl text-xs text-indigo-700 border border-indigo-100 leading-relaxed italic">
                            <FormattedMessage
                              text={`"${match.reason}"`}
                              isAI={true}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="bg-white py-20 text-center rounded-3xl border border-dashed border-gray-300">
                <p className="text-gray-500">Không tìm thấy công việc nào.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
