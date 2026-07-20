import React, { useState } from 'react';
import { Database, X, CheckCircle2, AlertTriangle, Key, Link as LinkIcon } from 'lucide-react';
import { isSupabaseConnected, updateSupabaseCredentials, clearSupabaseCredentials } from '../lib/supabase';

export const SupabaseConfigModal = ({ isOpen, onClose }) => {
  const isConnected = isSupabaseConnected();
  const [url, setUrl] = useState(localStorage.getItem('bv2_supabase_url') || '');
  const [key, setKey] = useState(localStorage.getItem('bv2_supabase_key') || '');

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    if (!url || !key) return;
    updateSupabaseCredentials(url, key);
  };

  const handleClear = () => {
    clearSupabaseCredentials();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className={`p-3 rounded-xl ${isConnected ? 'bg-emerald-100 text-emerald-600' : 'bg-indigo-100 text-indigo-600'}`}>
            <Database className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Cấu Hình Supabase (BookVerse)</h3>
            <p className="text-xs text-slate-500">
              Trạng thái: {isConnected ? (
                <span className="inline-flex items-center gap-1 font-semibold text-emerald-600">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Đã kết nối Supabase Backend
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 font-semibold text-amber-600">
                  <AlertTriangle className="w-3.5 h-3.5" /> Dùng Dữ liệu Thử nghiệm (Mock)
                </span>
              )}
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Supabase Project URL
            </label>
            <div className="relative">
              <LinkIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="https://xxxx.supabase.co"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Supabase Anon Key
            </label>
            <div className="relative">
              <Key className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6..."
                value={key}
                onChange={(e) => setKey(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl shadow-md shadow-indigo-600/20 transition-all text-sm"
            >
              {isConnected ? 'Cập Nhật Kết Nối' : 'Lưu & Kết Nối Backend'}
            </button>
            {isConnected && (
              <button
                type="button"
                onClick={handleClear}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl transition-all text-sm"
              >
                Gỡ Key
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
