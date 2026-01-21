
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_JOBS } from '../constants';

const JobDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const job = MOCK_JOBS.find(j => j.id === id);

  if (!job) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Không tìm thấy công việc</h2>
        <Link to="/" className="text-blue-600 mt-4 block">Quay lại trang chủ</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <Link to="/" className="inline-flex items-center text-gray-500 hover:text-blue-600 mb-8 transition-colors">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
        Quay lại danh sách
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center mb-8">
              <img src={job.logo} alt={job.company} className="w-20 h-20 rounded-2xl object-cover" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
                <p className="text-blue-600 font-semibold text-lg">{job.company}</p>
                <div className="flex flex-wrap gap-4 mt-2 text-gray-500 text-sm">
                  <span className="flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>{job.location}</span>
                  <span className="flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>Toàn thời gian</span>
                  <span className="text-emerald-600 font-bold">{job.salary}</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Mô tả công việc</h3>
                <p className="text-gray-600 leading-relaxed">{job.description}</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Yêu cầu ứng viên</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  {job.requirements.map((req, i) => <li key={i}>{req}</li>)}
                  <li>Khả năng làm việc nhóm tốt, ham học hỏi.</li>
                  <li>Sẵn sàng tiếp cận công nghệ mới.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 sticky top-24">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition-all mb-4">
              Ứng tuyển ngay
            </button>
            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-4 rounded-xl transition-all">
              Lưu công việc
            </button>
            <div className="mt-6 pt-6 border-t border-gray-100">
              <h4 className="font-bold mb-4">Chia sẻ công việc</h4>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 cursor-pointer hover:bg-blue-100">FB</div>
                <div className="w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center text-sky-500 cursor-pointer hover:bg-sky-100">TW</div>
                <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 cursor-pointer hover:bg-indigo-100">IN</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
