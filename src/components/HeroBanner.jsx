import React from 'react';
import { BookOpen, Sparkles, ShieldCheck, Truck } from 'lucide-react';

export const HeroBanner = ({ onExploreClick }) => {
  return (
    <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-950 via-indigo-900 to-slate-900 text-white shadow-2xl p-6 md:p-12 mb-8 border border-indigo-800/40">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Bookstore
          </div>

          <h1 className="text-3xl md:text-5xl font-black leading-tight tracking-tight text-white">
            Nhà Sách Trực Tuyến <span className="bg-gradient-to-r from-indigo-300 via-blue-200 to-white bg-clip-text text-transparent">BookVerse</span>
          </h1>


          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onExploreClick}
              className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl shadow-lg shadow-indigo-600/30 hover:scale-105 active:scale-95 transition-all text-sm flex items-center gap-2"
            >
              <BookOpen className="w-5 h-5" />
              Khám Phá Sách Ngay
            </button>

            <div className="flex items-center gap-4 text-xs text-slate-300 font-medium px-2">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Sách chính hãng
              </span>
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-blue-400" /> Ship 24h
              </span>
            </div>
          </div>
        </div>
                <div className="lg:col-span-5 relative hidden lg:block">
          <div className="glass-panel-dark rounded-2xl p-6 border border-indigo-500/30 shadow-2xl relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600/30 flex items-center justify-center text-indigo-400 border border-indigo-400/20">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Sách Nổi Bật Tuần Này</h4>
                  <p className="text-xs text-slate-400">Giảm giá lên tới 35%</p>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 text-[11px] font-bold rounded-full border border-amber-400/30">
                HOT SALE
              </span>
            </div>

            <div className="p-3 bg-indigo-950/60 rounded-xl border border-indigo-800/40 flex gap-3 items-center">
              <img
                src="/images/clean-code.jpg"
                alt="Clean Code"
                className="w-14 h-18 object-cover rounded-lg shadow-md"
              />
              <div className="flex-1">
                <h5 className="font-bold text-xs text-white">Clean Code: A Handbook of Agile Craftsmanship</h5>
                <p className="text-[11px] text-slate-400 mt-0.5">Robert C. Martin</p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-extrabold text-indigo-300 text-sm">385.000 đ</span>
                  <span className="text-[11px] text-slate-500 line-through">450.000 đ</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
