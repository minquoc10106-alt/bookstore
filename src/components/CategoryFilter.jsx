import React from 'react';
import { Search, Filter, Layers } from 'lucide-react';

const CATEGORIES = [
  'Tất cả',
  'Công nghệ',
  'Kinh tế',
  'Văn học',
  'Kỹ năng sống',
  'Thiếu nhi'
];

export const CategoryFilter = ({ 
  selectedCategory, 
  onSelectCategory, 
  searchQuery, 
  onSearchChange,
  totalResults
}) => {
  return (
    <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-slate-200/80 mb-8 space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Tìm kiếm sách theo tên sách hoặc tên tác giả..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-3 text-xs text-slate-400 hover:text-slate-600 font-semibold px-2 py-1 bg-slate-200 rounded-md"
            >
              Xóa
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 shrink-0">
          <Layers className="w-4 h-4 text-indigo-600" />
          <span>Tìm thấy <strong className="text-indigo-600 font-bold">{totalResults}</strong> kết quả</span>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5" /> Thể loại:
        </span>
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25 scale-105'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
};
