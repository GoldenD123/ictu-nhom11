
import React, { useState } from 'react';
import { MOCK_JOBS, CATEGORIES } from '../constants';
import { Job } from '../types';

const Jobs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(MOCK_JOBS);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filtered = MOCK_JOBS.filter(job => 
      (job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
       job.company.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === 'Tất cả' || job.category === selectedCategory)
    );
    setFilteredJobs(filtered);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Tìm kiếm việc làm</h1>
          <p className="text-slate-500 mt-1">Khám phá cơ hội nghề nghiệp tốt nhất cho bạn</p>
        </div>
        
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 w-full md:max-w-2xl">
          <div className="relative flex-1">
            <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input 
              type="text"
              placeholder="Vị trí, công ty hoặc từ khóa..."
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button type="submit" className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition">
            Tìm kiếm
          </button>
        </form>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="space-y-8">
          <div>
            <h3 className="font-bold text-slate-900 mb-4 uppercase text-xs tracking-wider">Danh mục</h3>
            <div className="space-y-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition ${
                    selectedCategory === cat ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 mb-4 uppercase text-xs tracking-wider">Hình thức làm việc</h3>
            <div className="space-y-2">
              {['Full-time', 'Part-time', 'Remote', 'Freelance'].map(type => (
                <label key={type} className="flex items-center space-x-2 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500" />
                  <span className="text-sm text-slate-600 group-hover:text-slate-900">{type}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Job List */}
        <div className="lg:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <p className="text-slate-500 text-sm">Hiển thị <span className="font-bold text-slate-900">{filteredJobs.length}</span> việc làm</p>
            <select className="bg-transparent text-sm font-medium text-slate-600 border-none focus:ring-0">
              <option>Mới nhất</option>
              <option>Lương cao nhất</option>
              <option>Phù hợp nhất</option>
            </select>
          </div>

          <div className="space-y-4">
            {filteredJobs.map(job => (
              <div key={job.id} className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-300 transition group cursor-pointer">
                <div className="flex flex-col sm:flex-row gap-6">
                  <img src={job.logo} alt={job.company} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition">{job.title}</h3>
                        <p className="text-blue-600 font-semibold">{job.company}</p>
                      </div>
                      <span className="text-lg font-bold text-slate-900">{job.salary}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                      <span><i className="fas fa-map-marker-alt mr-2"></i>{job.location}</span>
                      <span><i className="fas fa-briefcase mr-2"></i>{job.type}</span>
                      <span><i className="fas fa-clock mr-2"></i>{job.postedAt}</span>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {job.requirements.slice(0, 3).map(req => (
                        <span key={req} className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-md">{req}</span>
                      ))}
                      {job.requirements.length > 3 && <span className="text-slate-400 text-xs py-1">+{job.requirements.length - 3} khác</span>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {filteredJobs.length === 0 && (
              <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
                <i className="fas fa-search text-4xl text-slate-200 mb-4"></i>
                <p className="text-slate-500">Không tìm thấy công việc nào phù hợp với tìm kiếm của bạn.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
